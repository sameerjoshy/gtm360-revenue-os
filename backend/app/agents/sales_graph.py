
from typing import TypedDict, List, Dict, Any
from langgraph.graph import StateGraph, END
from app.contracts.schemas import AccountDossier
from app.providers.adapters import GeminiAdapter, HubSpotAdapter
from app.seeders.conversation_seeder import generate_mock_transcript, generate_mock_emails

# --- STATE SCHEMA ---
class SalesState(TypedDict):
    deal_id: str
    dossier: Dict # AccountDossier
    crm_state: Dict # Current HubSpot Deal State
    conversations: List[Dict] # Transcripts/Emails
    
    # Outputs
    deal_summary: str
    stakeholders: List[Dict]
    buyer_readiness_score: int # 0-100
    risk_flags: List[str]
    next_steps: List[str]

# --- NODES ---

class DealIntelligenceNodes:
    def __init__(self):
        self.llm = GeminiAdapter()
        self.crm = HubSpotAdapter()

    async def load_context(self, state: SalesState) -> Dict:
        """
        1. Fetch Deal from CRM
        2. Fetch associated Company (Dossier)
        3. Fetch Timeline/Conversations (Mock for now)
        """
        deal_id = state["deal_id"]
        # Mock CRM Fetch
        crm_deal = {"properties": {"dealname": "Acme Renewal", "amount": "50000", "dealstage": "contract_sent"}}
        
        # Mock Conversation Fetch (using seeder if empty)
        convos = state.get("conversations") or [generate_mock_transcript(deal_id)]
        emails = generate_mock_emails(deal_id)
        
        return {
            "crm_state": crm_deal, 
            "conversations": convos + emails
        }

    async def analyze_deal(self, state: SalesState) -> Dict:
        """
        Synthesize CRM data + Conversations into a 'Living Deal Brief'
        """
        prompt = f"""
        Analyze this deal context.
        
        CRM Data: {state['crm_state']}
        
        Conversations:
        {json.dumps(state['conversations'], indent=2)}
        
        Task:
        1. Summarize the current deal status.
        2. Map stakeholders found in transcripts (Name, Role, Stance).
        3. Identify explicitly stated pain points.
        
        Return JSON: {{ "summary": "...", "stakeholders": [], "pains": [] }}
        """
        
        # In prod we'd use a structured output schema
        response = await self.llm.generate_text(prompt)
        # Mocking structured parsing for v1 resilience
        return {
            "deal_summary": "Deal is in contract phase. Mike (RevOps) had concerns about writeback but was satisfied. Sarah (VP Sales) is budget holder.",
            "stakeholders": [
                {"name": "Sarah", "role": "VP Sales", "stance": "Champion"},
                {"name": "Mike", "role": "RevOps", "stance": "Skeptic-turned-Neutral"}
            ]
        }

    async def score_readiness(self, state: SalesState) -> Dict:
        """
        BuyerReadinessAgent logic:
        Evaluate Budget, Authority, Need, Timeline (BANT) or MEDDIC from evidence.
        """
        # Simple heuristic for V1
        score = 60
        summary = state.get("deal_summary", "")
        if "budget" in summary.lower(): score += 10
        if "contract" in summary.lower(): score += 10
        if "legal" in summary.lower(): score += 10
        
        return {"buyer_readiness_score": min(score, 100)}

    async def check_risk(self, state: SalesState) -> Dict:
        """
        DealRiskAgent logic:
        Flag risks based on missing fields or negative sentiment.
        """
        risks = []
        if state["buyer_readiness_score"] < 70:
            risks.append("Low Readiness Score")
        if "legal" not in str(state["conversations"]).lower():
            risks.append("Legal not involved yet")
            
        return {"risk_flags": risks}

# --- GRAPH ---
def build_sales_graph():
    builder = StateGraph(SalesState)
    nodes = DealIntelligenceNodes()
    
    builder.add_node("load_context", nodes.load_context)
    builder.add_node("analyze_deal", nodes.analyze_deal)
    builder.add_node("score_readiness", nodes.score_readiness)
    builder.add_node("check_risk", nodes.check_risk)
    
    builder.set_entry_point("load_context")
    builder.add_edge("load_context", "analyze_deal")
    builder.add_edge("analyze_deal", "score_readiness")
    builder.add_edge("score_readiness", "check_risk")
    builder.add_edge("check_risk", END)
    
    return builder.compile()

import json
