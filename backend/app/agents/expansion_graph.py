
from typing import TypedDict, List, Dict, Any, Literal
from langgraph.graph import StateGraph, END
from datetime import datetime
import json

from app.seeders.usage_seeder import UsageSeeder
from app.providers.adapters import GeminiAdapter

# --- State Definition ---
class ExpansionState(TypedDict):
    domain: str
    usage_data: Dict[str, Any]
    expansion_signal: Dict[str, Any] # The "Detected Opportunity"
    proposal_draft: str
    status: str

# --- Nodes ---
class ExpansionNodes:
    def __init__(self):
        self.llm = GeminiAdapter()

    def fetch_usage(self, state: ExpansionState) -> Dict:
        """Fetch synthetic usage data."""
        data = UsageSeeder.generate_usage_report(state["domain"])
        return {"usage_data": data, "status": "ANALYZING"}

    async def analyze_growth(self, state: ExpansionState) -> Dict:
        """
        Analyze usage data to find concrete expansion signals.
        - Rule 1: Seats > 90% -> Seat Expansion
        - Rule 2: API High Usage -> Enterprise Tier Upgrade
        """
        data = state["usage_data"]
        signals = []
        
        # Rule 1: Seat Pressure
        if data["signals"]["seat_constrained"]:
            signals.append({
                "type": "SEAT_EXPANSION",
                "evidence": f"License utilization at {data['subscription']['utilization_pct']}% ({data['subscription']['active_users']}/{data['subscription']['license_cap']}).",
                "confidence": 0.95
            })
            
        # Rule 2: API Power User
        if data["features"]["api_access"] == "HIGH" and data["subscription"]["plan"] != "Enterprise":
             signals.append({
                "type": "ENTERPRISE_UPGRADE",
                "evidence": "High API consumption detected on non-Enterprise plan.",
                "confidence": 0.85
            })
            
        # Fallback: No Signal
        if not signals:
             return {"status": "DONE", "expansion_signal": None}
             
        # Pick the strongest signal
        best_signal = max(signals, key=lambda x: x["confidence"])
        return {"expansion_signal": best_signal, "status": "DRAFTING_PROPOSAL"}

    async def generate_proposal(self, state: ExpansionState) -> Dict:
        """
        Draft an internal 'Upsell Brief' for the CSM.
        """
        signal = state["expansion_signal"]
        data = state["usage_data"]
        
        prompt = f"""
        You are a Customer Success AI Agent.
        
        Client: {state['domain']}
        Current Plan: {data['subscription']['plan']}
        Utilization: {data['subscription']['utilization_pct']}%
        
        Expansion Opportunity: {signal['type']}
        Evidence: {signal['evidence']}
        
        Goal: Write a short internal note to the Account Manager.
        - Explain WHY they are ready to upgrade.
        - Suggest the specific 'Ask' (e.g. "Propose 20 more seats").
        - Keep it under 3 bullets.
        """
        
        # Simple text generation via adapter
        # We cheat a bit and use the 'generate_json' method but treat it as text wrapper if needed, 
        # or just assume the adapter supports text. 
        # Given our adapter interface is generate_json, let's wrap logic or use a text method if available.
        # Checking interface... we only defined generate_json in the mock adapter usually.
        # Let's use a JSON schema to capture the text.
        
        schema = {
            "type": "object",
            "properties": {
                "brief_text": {"type": "string"},
                "suggested_arr_impact": {"type": "integer"}
            },
            "required": ["brief_text", "suggested_arr_impact"]
        }
        
        try:
            result = await self.llm.generate_json(prompt, schema)
            proposal = result.get("brief_text", "Error generated proposal.")
        except Exception:
            proposal = "Automated Proposal Generation Failed."

        return {"proposal_draft": proposal, "status": "DONE"}

# --- Graph ---
def create_expansion_graph():
    nodes = ExpansionNodes()
    workflow = StateGraph(ExpansionState)
    
    workflow.add_node("fetch_usage", nodes.fetch_usage)
    workflow.add_node("analyze_growth", nodes.analyze_growth)
    workflow.add_node("generate_proposal", nodes.generate_proposal)
    
    workflow.set_entry_point("fetch_usage")
    
    workflow.add_edge("fetch_usage", "analyze_growth")
    
    # Conditional logic
    def check_opportunity(state):
        if state.get("expansion_signal"):
            return "generate_proposal"
        return END
        
    workflow.add_conditional_edges(
        "analyze_growth",
        check_opportunity,
        {
            "generate_proposal": "generate_proposal",
            END: END
        }
    )
    
    workflow.add_edge("generate_proposal", END)
    
    return workflow.compile()
