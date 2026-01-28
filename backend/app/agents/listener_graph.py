import json
import os
from typing import TypedDict, List, Dict, Any, Optional
from langgraph.graph import StateGraph, END

# Define State
class ListenerState(TypedDict):
    domain: str
    raw_event: Dict[str, Any]      # Input event (e.g. from webhook/feed)
    signal_def: Dict[str, Any]     # Matched definition from Canon
    validated: bool                # Freshness/Source check
    icp_fit: bool                  # ICP Veto check
    hypothesis: str                # Generating reasoning
    competing_hypothesis: str      # Mandatory counter-argument
    context: List[str]             # Other signals for this domain
    decision: str                  # IGNORE, RESEARCH, ROUTE_TO_HUMAN, OUTREACH
    decision_reason: str           # Audit trail
    draft_email: Optional[Dict]    # Final output if OUTREACH

class ListenerNodes:
    def __init__(self):
        # Load Canon
        try:
            with open("app/data/signals_canon.json", "r") as f:
                self.canon = json.load(f)
        except:
             # Fallback for compilation if file not found locally
             self.canon = {"signals": []}

    def convert_event_to_signal(self, state: ListenerState) -> Dict:
        """1. Ingestor: Maps raw event to Canonical Signal ID."""
        raw = state["raw_event"]
        print(f"--- [Listener] Ingesting: {raw.get('trigger')} ---")
        
        # Simple string matching for V1 (Real version uses semantic matcher)
        matched = None
        for sig in self.canon["signals"]:
            if sig["trigger"].lower() in raw.get("trigger", "").lower():
                matched = sig
                break
        
        if not matched:
            return {
                "signal_def": None, 
                "decision": "IGNORE", 
                "decision_reason": "No matching canonical trigger found."
            }
            
        return {"signal_def": matched, "decision": "PROCESSING"}

    def validate_signal(self, state: ListenerState) -> Dict:
        """2. Validator: checks Freshness & Source Reliability."""
        if state["decision"] == "IGNORE": return {}
        
        # Mock Check: Is it older than 30 days?
        # In real app, check raw_event['timestamp']
        is_fresh = True 
        
        if not is_fresh:
             return {"validated": False, "decision": "IGNORE", "decision_reason": "Signal too old (>30 days)."}
             
        return {"validated": True}

    def check_icp(self, state: ListenerState) -> Dict:
        """3. ICP Mapper: Veto if not fit."""
        if state["decision"] == "IGNORE": return {}
        
        # Mock ICP Check (e.g. Industry = SaaS)
        # Real app uses Researcher's previous output or simplistic lookup
        industry = state["raw_event"].get("industry", "Unknown")
        
        if industry == "Retail": # Example Exclusion
            return {"icp_fit": False, "decision": "IGNORE", "decision_reason": "ICP Veto: Retail industry not supported."}
            
        return {"icp_fit": True}

    def build_hypothesis(self, state: ListenerState) -> Dict:
        """4. Hypothesis Builder: Why does this matter?"""
        if state["decision"] == "IGNORE": return {}
        
        sig = state["signal_def"]
        hypo = f"Primary: {sig['what_it_signals']} -> {sig['why_it_matters']}."
        anti_hypo = "Competing: Maybe false positive or internal promotion only."
        
        return {"hypothesis": hypo, "competing_hypothesis": anti_hypo}

    def build_context(self, state: ListenerState) -> Dict:
        """5. Context Builder: Look for Combos."""
        if state["decision"] == "IGNORE": return {}
        
        # Mock: Look up other signals for this domain in Supabase
        # combos = db.fetch_signals(state['domain'])
        combos = [] 
        
        return {"context": combos}

    def decide_action(self, state: ListenerState) -> Dict:
        """6. Action Decider (Governor): The Veto Gate."""
        if state["decision"] == "IGNORE": return {}
        
        sig = state["signal_def"]
        allowed = sig.get("allowed_actions", ["RESEARCH"])
        
        # Governance Rule: Default to non-intrusive
        final_decision = "RESEARCH" # Fallback
        
        # If 'OUTREACH_ELIGIBLE' is allowed AND we have High Confidence...
        # For V1, let's be conservative as requested.
        if "OUTREACH_ELIGIBLE" in allowed:
            # Only if we have >1 signal or very strong fit
            if len(state["context"]) > 0:
                final_decision = "OUTREACH_ELIGIBLE"
            else:
                 final_decision = "ROUTE_TO_HUMAN" # Downgrade single signals
        
        return {"decision": final_decision, "decision_reason": f"Matched Canon {sig['signal_id']}. Allowed: {allowed}."}

    def compose_copy(self, state: ListenerState) -> Dict:
        """7. Copy Composer: Only if Outreach Eligible."""
        if state["decision"] != "OUTREACH_ELIGIBLE":
            return {"draft_email": None}
            
        sig = state["signal_def"]
        draft = {
            "subject": f"Question re: {sig['trigger']}",
            "body": f"Hi,\n\n{sig['ready_outreach_hook']}\n\nOpen to a chat?",
            "tone": "Calm, observant"
        }
        return {"draft_email": draft}

def create_listener_graph():
    nodes = ListenerNodes()
    workflow = StateGraph(ListenerState)

    workflow.add_node("ingest", nodes.convert_event_to_signal)
    workflow.add_node("validate", nodes.validate_signal)
    workflow.add_node("icp_check", nodes.check_icp)
    workflow.add_node("hypothesis", nodes.build_hypothesis)
    workflow.add_node("context", nodes.build_context)
    workflow.add_node("decide", nodes.decide_action)
    workflow.add_node("compose", nodes.compose_copy)

    # Linear flow with early exits handled by state["decision"] == "IGNORE" checks inside nodes
    # Ideally we'd use conditional edges, but for readability in V1 linear is fine 
    # as nodes just pass precise output if already ignored.
    
    workflow.set_entry_point("ingest")
    workflow.add_edge("ingest", "validate")
    workflow.add_edge("validate", "icp_check")
    workflow.add_edge("icp_check", "hypothesis")
    workflow.add_edge("hypothesis", "context")
    workflow.add_edge("context", "decide")
    workflow.add_edge("decide", "compose")
    workflow.add_edge("compose", END)

    return workflow.compile()
