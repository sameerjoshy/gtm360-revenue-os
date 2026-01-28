import json
import os
from typing import TypedDict, List, Dict, Any, Optional
from langgraph.graph import StateGraph, END

# --- 1. State Definition (Decision Quality) ---
class ListenerState(TypedDict):
    domain: str
    raw_event: Dict[str, Any]
    signal_def: Dict[str, Any]
    
    # Suppression Layer
    suppressed: bool
    suppression_reason: str
    
    # Analysis Layer
    archetype: str             # e.g. "Post-Funding Scramble"
    confidence_score: float
    confidence_drivers: List[str]
    confidence_risks: List[str]
    
    # Contract Output
    decision: str              # IGNORE, RESEARCH, ROUTE_TO_HUMAN, OUTREACH
    rationale: Dict[str, str]  # The 4-Part Contract: {why_matters, why_not, missing_info, choice_reason}
    
    draft_email: Optional[Dict]

# --- 2. Logic & Nodes ---
class ListenerNodes:
    def __init__(self):
        try:
            with open("app/data/signals_canon.json", "r") as f:
                self.canon = json.load(f)
        except:
             self.canon = {"signals": []}

    def convert_event_to_signal(self, state: ListenerState) -> Dict:
        """Ingest: Maps raw event to Canonical Signal."""
        raw = state["raw_event"]
        print(f"--- [Listener] Ingesting: {raw.get('trigger')} for {state['domain']} ---")
        
        matched = None
        for sig in self.canon["signals"]:
            if sig["trigger"].lower() in raw.get("trigger", "").lower():
                matched = sig
                break
        
        if not matched:
            return {
                "signal_def": None, 
                "decision": "IGNORE", 
                "rationale": {"choice_reason": "No canonical trigger matched."}
            }
            
        return {"signal_def": matched, "decision": "PROCESSING"}

    def check_suppression(self, state: ListenerState) -> Dict:
        """Suppression Layer: Checks for Negative Signals."""
        if state["decision"] == "IGNORE": return {}
        
        # Mock Suppression Logic (In production, query DB for recent negative signals)
        trigger = state["raw_event"].get("trigger", "").lower()
        
        # Explicit Negative Signals from User Prompt
        if "layoff" in trigger or "decreases_headcount" in trigger:
             return {"suppressed": True, "suppression_reason": "Active Layoffs detected (45-day cooldown).", "decision": "IGNORE"}
        if "legal" in trigger or "suit" in trigger:
             return {"suppressed": True, "suppression_reason": "Legal issues detected.", "decision": "IGNORE"}
        
        return {"suppressed": False}

    def match_archetype(self, state: ListenerState) -> Dict:
        """Pattern Matching: Assigns Named Archetypes."""
        if state["decision"] == "IGNORE": return {}
        
        sig_id = state["signal_def"]["signal_id"]
        
        # Mock Logic for V1 Archetypes
        archetype = "Single Signal"
        if "02" in sig_id or "14" in sig_id:
             archetype = "Scaling Pain"
        elif "11" in sig_id: # Funding
             archetype = "Post-Funding Scramble"
        elif "39" in sig_id: # Tech
             archetype = "Tech Refresh"
             
        return {"archetype": archetype}

    def score_confidence(self, state: ListenerState) -> Dict:
        """Confidence Explanation: Drivers vs Risks."""
        if state["decision"] == "IGNORE": return {}
        
        sig = state["signal_def"]
        drivers = []
        risks = []
        
        # Drivers
        if sig.get("intent_type") == "High Intent": drivers.append("Signal is classified as High Intent.")
        if state["archetype"] != "Single Signal": drivers.append(f"Matches archetype: {state['archetype']}")
        
        # Risks
        if "news" in sig.get("dataset", ""): risks.append("PR sources can be exaggerated.")
        if "job" in sig.get("dataset", ""): risks.append("Job posts may be backfills, not growth.")
        
        score = 0.5 + (0.1 * len(drivers)) - (0.1 * len(risks))
        
        return {
            "confidence_score": round(score, 2),
            "confidence_drivers": drivers,
            "confidence_risks": risks
        }

    def decide_action(self, state: ListenerState) -> Dict:
        """The Governor: Enforces Decision Quality Contract."""
        if state["decision"] == "IGNORE": return {}
        
        sig = state["signal_def"]
        allowed = sig.get("allowed_actions", ["RESEARCH"])
        
        # 1. Why this matters
        why_matters = f"{sig['what_it_signals']} -> {sig['why_it_matters']}"
        
        # 2. Why it might not
        why_not = "Isolated signal without corroboration." if len(state['confidence_drivers']) < 2 else "None observed."
        if len(state['confidence_risks']) > 0:
             why_not = f"Risks identified: {', '.join(state['confidence_risks'])}"
             
        # 3. What we need to look for
        missing = "Need validation from a second dataset (e.g. Careers page confirmation)."
        
        # 4. Choice
        # Restraint Principle: Downgrade Action if risks exist
        choice = "RESEARCH" # Default
        
        if "OUTREACH_ELIGIBLE" in allowed:
            if state["confidence_score"] > 0.7:
                 choice = "OUTREACH_ELIGIBLE"
            else:
                 choice = "ROUTE_TO_HUMAN" # Downgrade
        elif "ROUTE_TO_HUMAN" in allowed:
            choice = "ROUTE_TO_HUMAN"
            
        choice_reason = f"Allowed: {allowed}. Score: {state['confidence_score']}. Principle: Restraint."
        
        rationale = {
            "why_matters": why_matters,
            "why_not": why_not,
            "missing_info": missing,
            "choice_reason": choice_reason
        }
        
        return {"decision": choice, "rationale": rationale}

    def compose_copy(self, state: ListenerState) -> Dict:
        """Composer: Only if Outreach Eligible."""
        if state["decision"] != "OUTREACH_ELIGIBLE":
            return {"draft_email": None}
            
        sig = state["signal_def"]
        draft = {
            "subject": f"Question re: {sig['trigger']}",
            "body": f"Hi,\n\n{sig['ready_outreach_hook']}\n\n(Tone: Observer, not Seller)",
            "tone": "Calm, observant"
        }
        return {"draft_email": draft}

def create_listener_graph():
    nodes = ListenerNodes()
    workflow = StateGraph(ListenerState)

    workflow.add_node("ingest", nodes.convert_event_to_signal)
    workflow.add_node("suppress", nodes.check_suppression)
    workflow.add_node("archetype", nodes.match_archetype)
    workflow.add_node("confidence", nodes.score_confidence)
    workflow.add_node("decide", nodes.decide_action)
    workflow.add_node("compose", nodes.compose_copy)

    workflow.set_entry_point("ingest")
    workflow.add_edge("ingest", "suppress")
    workflow.add_edge("suppress", "archetype")
    workflow.add_edge("archetype", "confidence")
    workflow.add_edge("confidence", "decide")
    workflow.add_edge("decide", "compose")
    workflow.add_edge("compose", END)

    return workflow.compile()
