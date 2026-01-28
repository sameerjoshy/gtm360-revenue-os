from typing import TypedDict, List, Dict, Any, Literal
from datetime import datetime
import json
import logging

from langgraph.graph import StateGraph, END

from app.contracts.schemas import AccountDossier, EvidenceItem, Signal, ResearchConfig
from app.providers.adapters import GeminiAdapter, TavilyAdapter, HubSpotAdapter

# --- State Definition ---
class AgentState(TypedDict):
    domain: str
    record_id: str
    config: ResearchConfig
    status: str
    workspace_id: str  # Added for multi-tenancy
    account_id: str  # Added for account tracking
    
    # Internal working memory
    sources: List[EvidenceItem]
    raw_content: Dict[str, str]  # url -> text
    extracted_signals: List[Signal]
    
    # Final Output
    dossier: AccountDossier
    error: str

# --- Nodes ---

class ResearcherNodes:
    def __init__(self):
        self.llm = GeminiAdapter()
        self.search = TavilyAdapter()
        self.crm = HubSpotAdapter()

    async def check_existing_lock(self, state: AgentState) -> Dict:
        """Check if we already have a recent run or lock."""
        # TODO: Implement actual DB lock check. For now, pass.
        return {"status": "COLLECTING"}

    async def collect_sources(self, state: AgentState) -> Dict:
        """Gather data from Homepage + Search."""
        domain = state["domain"]
        evidence_list = []
        
        # 1. Search for key pages
        queries = [
            f"site:{domain} careers",
            f"site:{domain} customers case studies",
            f"site:{domain} news blog",
            f"{domain} series funding crunchbase",
            f"{domain} tech stack"
        ]
        
        raw_results = []
        for q in queries:
            results = await self.search.search(q, max_results=2)
            raw_results.extend(results)
            
        # Dedupe and format as EvidenceItem
        seen_urls = set()
        for res in raw_results:
            url = res.get("url")
            if url in seen_urls: continue
            seen_urls.add(url)
            
            evidence_list.append(EvidenceItem(
                evidence_id=f"ev_{hash(url)}", # Simple hash for v1
                domain=domain,
                source_type="OTHER", # TODO: Heuristic to classify
                url=url,
                retrieved_at=datetime.utcnow(),
                extract_method="requests",
                excerpt=res.get("content", "")[:500],
                excerpt_hash=str(hash(res.get("content", ""))),
                reliability="MED"
            ))
            
        return {"sources": evidence_list, "status": "EXTRACTING"}

    async def extract_signals(self, state: AgentState) -> Dict:
        """Use LLM to extract signals from collected evidence."""
        # Prepare context for LLM
        context_str = ""
        for item in state["sources"]:
            context_str += f"Source: {item.url}\nContent: {item.excerpt}\n---\n"
            
        prompt = f"""
        Analyze the following text from {state['domain']} and extract structured signals 
        according to the Signal schema.
        
        Look for:
        - Executive Hires (Sales, Marketing, Product)
        - Funding Events (Series A, B, C)
        - Tech Stack (CRM, Marketing Automation)
        - GTM Tooling
        
        Input Context:
        {context_str}
        """
        
        # We need a list of signals. 
        # For simplicity in v1, we ask for a wrapping object.
        schema = {
            "type": "object",
            "properties": {
                "signals": {
                    "type": "array",
                    "items": Signal.model_json_schema()
                }
            }
        }
        
        try:
            response = await self.llm.generate_json(prompt, schema)
            signals_data = response.get("signals", [])
            # Convert back to Pydantic models to validate
            valid_signals = []
            for s in signals_data:
                # Ensure evidence_ids exist in our source list
                # Logic to map back is complex without vector store, 
                # for v1 we naively map to the first source if not specified
                if not s.get("evidence_ids"):
                    if state["sources"]:
                        s["evidence_ids"] = [state["sources"][0].evidence_id]
                valid_signals.append(Signal(**s))
                
            return {"extracted_signals": valid_signals, "status": "SCORING"}
            
        except Exception as e:
            logging.error(f"Extraction failed: {e}")
            return {"error": str(e), "status": "FAILED"}

    async def fit_scoring(self, state: AgentState) -> Dict:
        """Apply rules to determine Fit Tier."""
        signals = state["extracted_signals"]
        tier = "Tier 3" # Default
        drivers = []
        
        # Simple Rule Engine
        has_funding = any(s.signal_type == "FUNDING" for s in signals)
        has_hiring = any(s.signal_type == "EXEC_HIRE" for s in signals)
        
        if has_funding and has_hiring:
            tier = "Tier 1"
            drivers = ["Recent Funding", "Executive Hiring"]
        elif has_funding:
            tier = "Tier 2"
            drivers = ["Recent Funding"]
        elif has_hiring:
            tier = "Tier 2"
            drivers = ["Executive Hiring"]
            
        # Construct Partial Dossier
        diagnosis = {
            "fit_tier": tier,
            "diagnosis_label": f"Automated Scoring: {tier}",
            "key_drivers": drivers,
            "evidence_ids": [] # TODO: specific evidence for tier
        }
        
        dossier = AccountDossier(
            dossier_id=f"dos_{state['domain']}_{datetime.utcnow().timestamp()}",
            domain=state["domain"],
            record_id=state["record_id"],
            config_id=state["config"].config_id,
            signals=signals,
            gtm_diagnosis=diagnosis,
            created_at=datetime.utcnow()
        )
        
        return {"dossier": dossier, "status": "VALIDATING"}

    async def validate_and_veto(self, state: AgentState) -> Dict:
        """Ensure no hallucinations / required fields."""
        dossier = state["dossier"]
        # Schema validation happened on Pydantic init.
        # Add custom logic here, e.g. check for at least 3 sources.
        if len(dossier.signals) == 0:
             # Soft fail or retry? For v1, mark as Low Signal
             pass
             
        return {"status": "SAVING"}

    async def save_results(self, state: AgentState) -> Dict:
        """Save the final dossier to Supabase with workspace support."""
        from app.providers.adapters import SupabaseAdapter
        
        # Initialize adapter with workspace context
        workspace_id = state.get("workspace_id")
        account_id = state.get("account_id")
        
        db = SupabaseAdapter(workspace_id=workspace_id)
        
        # Convert Pydantic to Dict
        dossier_dict = state["dossier"].model_dump()
        
        # Save with account_id
        success = await db.save_dossier(dossier_dict, account_id)
        if success:
            logging.info(f"Saved dossier for {state['domain']} to workspace {workspace_id}")
            return {"status": "DONE"}
        else:
            return {"status": "FAILED", "error": "Database Save Failed"}

# --- Graph Construction ---

def create_researcher_graph():
    nodes = ResearcherNodes()
    workflow = StateGraph(AgentState)
    
    workflow.add_node("check_existing_lock", nodes.check_existing_lock)
    workflow.add_node("collect_sources", nodes.collect_sources)
    workflow.add_node("extract_signals", nodes.extract_signals)
    workflow.add_node("fit_scoring", nodes.fit_scoring)
    workflow.add_node("validate_and_veto", nodes.validate_and_veto)
    workflow.add_node("save_results", nodes.save_results)
    
    workflow.set_entry_point("check_existing_lock")
    
    workflow.add_edge("check_existing_lock", "collect_sources")
    workflow.add_edge("collect_sources", "extract_signals")
    workflow.add_edge("extract_signals", "fit_scoring")
    workflow.add_edge("fit_scoring", "validate_and_veto")
    workflow.add_edge("validate_and_veto", "save_results")
    workflow.add_edge("save_results", END)
    
    return workflow.compile()
