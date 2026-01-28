from typing import TypedDict, List, Dict, Any, Literal
from datetime import datetime
import json
import logging

from langgraph.graph import StateGraph, END

from app.contracts.schemas import AccountDossier, DraftEmail, Hook, Claim, ResearchConfig
from app.providers.adapters import GeminiAdapter
from app.contracts.schemas import EvidenceItem # Needed for context

# --- State Definition ---
class SniperState(TypedDict):
    run_id: str
    domain: str
    dossier: AccountDossier
    config: ResearchConfig
    
    # Working Memory
    hooks: List[Hook]
    draft: DraftEmail
    critique: Dict[str, Any] # Score, Feedback
    attempt_count: int
    
    status: str
    error: str

# --- Nodes ---

class SniperNodes:
    def __init__(self):
        self.llm = GeminiAdapter()

    async def load_dossier(self, state: SniperState) -> Dict:
        """Load the dossier from DB (Real Supabase)."""
        from app.providers.adapters import SupabaseAdapter
        db = SupabaseAdapter()
        
        dossier_json = await db.fetch_dossier(state["domain"])
        
        if not dossier_json:
             return {"error": f"Dossier not found for {state['domain']}", "status": "FAILED"}
             
        # Convert JSON back to Object
        try:
            dossier = AccountDossier(**dossier_json)
            return {"dossier": dossier, "status": "SELECTING_HOOKS"}
        except Exception as e:
            return {"error": f"Dossier parse failed: {e}", "status": "FAILED"}

    async def select_hooks(self, state: SniperState) -> Dict:
        """Select the best 2 hooks from the Dossier signals."""
        dossier = state["dossier"]
        signals = dossier.signals
        
        # Simple Deterministic Ranking (v1)
        # Priority: EXEC_HIRE > FUNDING > NEWS > TECH_STACK
        
        ranked_hooks = []
        for sig in signals:
            score = 0
            if sig.signal_type == "EXEC_HIRE": score = 10
            elif sig.signal_type == "FUNDING": score = 8
            elif sig.signal_type == "NEWS": score = 6
            elif sig.signal_type == "TECH_STACK": score = 4
            
            ranked_hooks.append({
                "signal": sig,
                "score": score
            })
            
        ranked_hooks.sort(key=lambda x: x["score"], reverse=True)
        top_picks = ranked_hooks[:2]
        
        # Convert to Hook objects
        hooks = []
        for item in top_picks:
            sig = item["signal"]
            hooks.append(Hook(
                hook_id=f"hook_{datetime.utcnow().timestamp()}",
                hook_type=sig.signal_type,
                hook_text=f"Observed: {sig.label} ({sig.value})",
                evidence_ids=sig.evidence_ids,
                confidence=sig.confidence
            ))
            
        return {"hooks": hooks, "status": "DRAFTING"}

    async def draft_email(self, state: SniperState) -> Dict:
        """Draft the email using the selected hooks."""
        hooks = state["hooks"]
        dossier = state["dossier"]
        
        hook_context = "\n".join([f"- {h.hook_type}: {h.hook_text}" for h in hooks])
        
        
        # Prompt Template Construction:
        config = state["config"]
        overrides = config.context_overrides
        
        # Build Override String
        custom_instructions = ""
        if overrides:
            if overrides.tone_guide:
                custom_instructions += f"\n- CUSTOM TONE: {overrides.tone_guide}"
            if overrides.reference_url:
                custom_instructions += f"\n- REFERENCE MATERIAL: {overrides.reference_url} (Emulate this style/content)"

        prompt = f"""
        You are an elite SDR executing a 'Sniper' campaign.
        
        Target: {dossier.domain}
        Diagnosis: {dossier.gtm_diagnosis.diagnosis_label}
        
        Hooks:
        {hook_context}
        
        User Instructions (HIGHEST PRIORITY):
        {custom_instructions if custom_instructions else "- None. Use default best practices."}
        
        Goal: Write a COLD_OUTBOUND email.
        - Subject: Short, lowercase, internal-sounding.
        - Opening: References the Hook immediately.
        - Pitch: Connect the Hook to our value prop.
        - CTA: Soft ask (Interest based).
        - Tone: {overrides.tone_guide if overrides and overrides.tone_guide else "Professional, Direct, No Fluff"}
        
        Constraints:
        - Max 100 words.
        - No 'I hope this finds you well'.
        - No 'Unlock', 'Synergy', 'Game-changer'.
        """
        
        schema = DraftEmail.model_json_schema()
        # Remove nested checks for v1 simplicity in prompting
        
        try:
            # We urge the LLM to fill the DraftEmail schema
            # Note: The LLM needs to invent 'draft_id', 'run_id' etc.
            # We can override those.
            
            result = await self.llm.generate_json(prompt, schema)
            
            # Post-process / Override system fields
            result["draft_id"] = f"draft_{state['run_id']}_{state['attempt_count']}"
            result["run_id"] = state["run_id"]
            result["domain"] = state["domain"]
            result["sequence_type"] = "COLD_OUTBOUND" # Forcing v1
            result["created_at"] = datetime.utcnow().isoformat()
            
            # Ensure hooks_used maps correctly
            result["hooks_used"] = [h.model_dump() for h in hooks]
            
            draft = DraftEmail(**result)
            return {"draft": draft, "status": "CRITIQUING", "attempt_count": state.get("attempt_count", 0) + 1}
            
        except Exception as e:
            return {"error": str(e), "status": "FAILED"}

    async def critic(self, state: SniperState) -> Dict:
         """Critique the draft for banned phrases and flow."""
         draft = state["draft"]
         
         # 1. Rule Check (Banned Phrases)
         banned = ["unlock", "synergy", "game-changer", "hope this finds you"]
         violations = [w for w in banned if w in draft.body_text.lower()]
         
         if violations:
             return {
                 "critique": {"passed": False, "violations": violations, "feedback": f"Remove banned words: {violations}"},
                 "status": "REFINING"
             }
         
         # 2. LLM Vibe Check (Optional for v1, let's pass if rules pass)
         return {
             "critique": {"passed": True, "feedback": "Good to go."},
             "status": "DONE" 
         }

    async def refine(self, state: SniperState) -> Dict:
        """Rewrite based on critique."""
        if state["attempt_count"] > 2:
            # Give up after 2 tries, mark for human review anyway
            return {"status": "DONE", "error": "Max retries reached"}
            
        current_draft = state["draft"]
        feedback = state["critique"]["feedback"]
        
        # Re-prompt logic would go here. 
        # For this async implementations, I will just loop back to 'draft_email' 
        # but normally we would pass the 'feedback' into the prompt.
        
        # To simulate loop, we just return to DRAFTING status, 
        # and the `draft_email` node should ideally read previous attempts/feedback.
        # Impl simplification: Just fail for now to avoid infinite loop potential in v1 demo.
        
    async def save_draft(self, state: SniperState) -> Dict:
        """Persist the approved draft to Supabase."""
        from app.providers.adapters import SupabaseAdapter
        db = SupabaseAdapter()
        
        draft = state["draft"]
        draft_dict = draft.model_dump()
        # Ensure status is NEEDS_REVIEW
        draft_dict["status"] = "NEEDS_REVIEW"
        
        success = await db.save_draft(draft_dict)
        if success:
             return {"status": "DONE"}
        else:
             return {"status": "FAILED", "error": "Draft Save Failed"}

# --- Graph ---

def create_sniper_graph():
    nodes = SniperNodes()
    workflow = StateGraph(SniperState)
    
    workflow.add_node("load_dossier", nodes.load_dossier)
    workflow.add_node("select_hooks", nodes.select_hooks)
    workflow.add_node("draft_email", nodes.draft_email)
    workflow.add_node("critic", nodes.critic)
    workflow.add_node("refine", nodes.refine)
    
    workflow.add_node("save_draft", nodes.save_draft) # ADDED
    
    workflow.set_entry_point("load_dossier")
    
    workflow.add_edge("load_dossier", "select_hooks")
    workflow.add_edge("select_hooks", "draft_email")
    workflow.add_edge("draft_email", "critic")
    
    # Conditional Edge
    def check_critique(state):
        if state["critique"]["passed"]:
            return "save_draft" # Changed from DONE
        else:
            return "refine"
            
    workflow.add_conditional_edges(
        "critic",
        check_critique,
        {
            "save_draft": "save_draft",
            "refine": "refine"
        }
    )
    
    workflow.add_edge("refine", "draft_email")
    workflow.add_edge("save_draft", END)
    
    return workflow.compile()
