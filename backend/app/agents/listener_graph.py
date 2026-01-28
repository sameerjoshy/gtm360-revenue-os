import json
import os
from typing import TypedDict, List, Dict, Any, Optional
from langgraph.graph import StateGraph, END

# --- THE SIGNALS AGENT CONSTITUTION ---
# Article I: Purpose - Improve decision quality, not activity.
# Article II: Signals Are Not Intent.
# Article III: Restraint Is Success.
# Article IV: Hypotheses Before Action.
# Article V: Multi-Signal Context Is Mandatory.
# Article VI: Negative Signals Override Positive Ones.
# Article VII: Explainability Is Required.
# Article VIII: Humans Remain Sovereign.
# Article IX: Drift Is a Failure Mode.
# Article X: Default to Inaction.

PRIME_DIRECTIVE = "This agent exists to protect GTM teams from premature action."

# --- SIGNAL COMBO LIBRARY v1 ---
SIGNAL_COMBOS = {
    "PRE_SCALE_CHAOS": {
        "name": "Pre-Scale Chaos",
        "pattern": ["hiring_sales", "hiring_revops", "tech_crm"],
        "bias": "ROUTE_TO_HUMAN",
        "desc": "Pipeline visibility breaking. Ops hire + CRM change."
    },
    "POST_FUNDING_SCRAMBLE": {
        "name": "Post-Funding Scramble",
        "pattern": ["news_financing", "hiring_marketing", "tech_change"],
        "bias": "RESEARCH",
        "desc": "Budget unlocked. Pressure to show traction."
    },
    "FOUNDER_LED_RESET": {
        "name": "Founder-Led Reset",
        "pattern": ["news_leadership_change", "company_positioning_change"],
        "bias": "ROUTE_TO_HUMAN",
        "desc": "New CEO/CRO or positioning shift. Fundamentals resetting."
    },
    "GTM_REPLATFORMING": {
        "name": "GTM Replatforming Window",
        "pattern": ["tech_crm_change", "hiring_revops"],
        "bias": "RESEARCH",
        "desc": "Existing stack not scaling. Operational pain."
    },
    "PLG_GTM_SHIFT": {
        "name": "Product-Led GTM Shift",
        "pattern": ["news_product_launch", "tech_marketing_automation"],
        "bias": "RESEARCH",
        "desc": "Motion shift (PLG <-> Sales). Funnel experimentation."
    },
    "SILENT_CHURN_RISK": {
        "name": "Silent Churn Risk",
        "pattern": ["news_layoffs", "tech_removal", "hiring_freeze"],
        "bias": "SUPPRESS",
        "desc": "Cost pressure. Vendor consolidation risk."
    },
    "EXPANSION_READINESS": {
        "name": "Expansion Readiness",
        "pattern": ["news_office_expansion", "hiring_sales_local"],
        "bias": "RESEARCH",
        "desc": "New geography. Replicating GTM motion."
    },
    "TOOL_FALSE_INTENT": {
        "name": "Tool-Driven False Intent (Suppressor)",
        "pattern": ["tech_single_detect"],
        "bias": "IGNORE",
        "desc": "Single tool detected without hiring or news."
    },
    "MARKETING_DEMAND_PUSH": {
        "name": "Marketing-Led Demand Push",
        "pattern": ["hiring_demand_gen", "tech_analytics"],
        "bias": "RESEARCH",
        "desc": "Funnel pressure. Attribution questions."
    },
    "NOISE_CLUSTER": {
        "name": "Noise Cluster (Suppressor)",
        "pattern": ["news_award", "news_blog_post"],
        "bias": "IGNORE",
        "desc": "PR activity without GTM change."
    }
}

class ListenerState(TypedDict):
    domain: str
    raw_event: Dict[str, Any]
    signal_def: Dict[str, Any]
    
    # State fields
    suppressed: bool
    suppression_reason: str
    archetype: str             
    archetype_desc: str
    
    confidence_score: float
    confidence_drivers: List[str]
    confidence_risks: List[str]
    
    decision: str              
    rationale: Dict[str, str]  
    
    draft_email: Optional[Dict]

class ListenerNodes:
    def __init__(self):
        try:
            with open("backend/app/data/signals_canon.json", "r") as f:
                self.canon = json.load(f)
        except:
             # Fallback path if running from root vs backend
             try:
                 with open("app/data/signals_canon.json", "r") as f:
                     self.canon = json.load(f)
             except:
                 self.canon = {"signals": []}

    def convert_event_to_signal(self, state: ListenerState) -> Dict:
        """Ingest: Maps raw event to Canonical Signal."""
        raw = state["raw_event"]
        print(f"--- [Listener] Ingesting: {raw.get('trigger')} ---")
        
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
        """
        Suppression Layer (Article VI).
        Checks for Combo 6 (Silent Churn) and Combo 10 (Noise).
        """
        if state["decision"] == "IGNORE": return {}
        
        trigger = state["raw_event"].get("trigger", "").lower()
        sig_id = state["signal_def"].get("signal_id", "")
        
        # COMBO 6: Silent Churn Risk (Layoffs/Legal)
        if "layoff" in trigger or "decreases_headcount" in trigger or "legal" in trigger:
             return {
                 "suppressed": True, 
                 "suppression_reason": "Article VI Violation: Negative Signal Override (Layoffs/Risk detected).", 
                 "decision": "IGNORE",
                 "archetype": SIGNAL_COMBOS["SILENT_CHURN_RISK"]["name"]
             }

        # COMBO 8: Tool False Intent (Single Tool)
        # For simulation, if we see 'detected' but it's low confidence/isolated
        if "detected" in trigger and "score" not in trigger and "hiring" not in trigger:
             # Mock check: In real life we'd check context history
             pass 

        # COMBO 10: Noise Cluster (Awards)
        if "award" in trigger or "recognized" in trigger:
            return {
                "suppressed": True,
                "suppression_reason": "Article I Violation: Noise Cluster (Awards do not equal intent).",
                "decision": "IGNORE",
                "archetype": SIGNAL_COMBOS["NOISE_CLUSTER"]["name"]
            }
        
        return {"suppressed": False}

    def match_archetype(self, state: ListenerState) -> Dict:
        """
        Pattern Recognition (Combo Library).
        Evaluates the 10 Archetypes.
        """
        if state["decision"] == "IGNORE": return {}
        
        sig_id = state["signal_def"]["signal_id"]
        trigger = state["raw_event"].get("trigger", "").lower()
        
        # Mock Evaluator Logic (Mapping triggers to Combos)
        archetype_key = None
        
        # Funding -> Post-Funding Scramble
        if "financing" in sig_id:
            archetype_key = "POST_FUNDING_SCRAMBLE"
            
        # Sales Hiring -> Pre-Scale Chaos (if combined with ops - simplified for single event)
        elif "hiring_sales" in sig_id:
            archetype_key = "PRE_SCALE_CHAOS"
            
        # Tech CRM -> GTM Replatforming
        elif "crm" in trigger and "tech" in sig_id:
            archetype_key = "GTM_REPLATFORMING"
            
        # Pivot/Launch -> PLG Shift
        elif "launch" in trigger or "product" in trigger:
             archetype_key = "PLG_GTM_SHIFT"
             
        # New Geo -> Expansion
        elif "location" in trigger or "office" in trigger:
             archetype_key = "EXPANSION_READINESS"

        if archetype_key:
            combo = SIGNAL_COMBOS[archetype_key]
            return {"archetype": combo["name"], "archetype_desc": combo["desc"]}
        
        return {"archetype": "Unclassified Signal", "archetype_desc": "Single signal without clear pattern match."}

    def score_confidence(self, state: ListenerState) -> Dict:
        """
        Confidence Scorer (Article VII).
        """
        if state["decision"] == "IGNORE": return {}
        
        sig = state["signal_def"]
        drivers = []
        risks = []
        
        # Article V: Multi-Signal Context
        if state["archetype"] != "Unclassified Signal":
            drivers.append(f"Matches Combo: {state['archetype']}")
        else:
            risks.append("Article V Risk: Single signal lacks corroboration.")
            
        # Source Reliability
        if "news" in sig.get("dataset", ""): risks.append("PR Source (Medium Reliability)")
        if "tech" in sig.get("dataset", ""): drivers.append("Tech Detection (High Truth)")
        
        score = 0.5
        if drivers: score += 0.2
        if risks: score -= 0.1
        
        return {
            "confidence_score": round(score, 2),
            "confidence_drivers": drivers,
            "confidence_risks": risks
        }

    def decide_action(self, state: ListenerState) -> Dict:
        """
        The Governor (Article X: Default to Inaction).
        Enforces Article III (Restraint) and Article IV (Hypotheses).
        """
        if state["decision"] == "IGNORE": return {}
        
        sig = state["signal_def"]
        allowed = sig.get("allowed_actions", ["RESEARCH"])
        
        # 1. Why this matters (Hypothesis)
        why_matters = f"{sig['what_it_signals']} -> {sig['why_it_matters']}"
        if state["archetype"] != "None":
             why_matters += f" | Context: {state.get('archetype_desc', '')}"
        
        # 2. Why it might not (Counter-Hypothesis)
        why_not = "No counter-evidence found."
        if len(state['confidence_risks']) > 0:
             why_not = f"Risks: {', '.join(state['confidence_risks'])}"
             
        # 3. Decision Logic (Restraint)
        final_decision = "RESEARCH" # Article X Default
        choice_reason = "Defaulting to Research (Article X)."
        
        # Check against Combo Bias
        combo_bias = "RESEARCH"
        if state["archetype"] in list(k["name"] for k in SIGNAL_COMBOS.values()):
             # Find bias
             pass 

        # Logic: Only valid if score is high AND allowed
        if "OUTREACH_ELIGIBLE" in allowed:
            if state["confidence_score"] >= 0.7:
                 # Article V Check: Do we have "Multi-Signal Context"?
                 if "Unclassified" in state["archetype"]:
                     final_decision = "ROUTE_TO_HUMAN"
                     choice_reason = "Downgraded: High score but Single Signal (Article V violations)."
                 else:
                     final_decision = "OUTREACH_ELIGIBLE"
                     choice_reason = "High Confidence + Archetype Match + Eligible."
            else:
                 final_decision = "ROUTE_TO_HUMAN"
                 choice_reason = "Downgraded: Low Confidence Score."
        
        rationale = {
            "why_matters": why_matters,
            "why_not": why_not,
            "missing_info": "Need secondary dataset confirmation (Article V).",
            "choice_reason": f"{choice_reason} [Prime Directive: Protect from premature action]"
        }
        
        return {"decision": final_decision, "rationale": rationale}

    def compose_copy(self, state: ListenerState) -> Dict:
        if state["decision"] != "OUTREACH_ELIGIBLE":
            return {"draft_email": None}
            
        sig = state["signal_def"]
        draft = {
            "subject": f"Context: {state['archetype']}",
            "body": f"Observation: {sig['ready_outreach_hook']}\n\n(Generated under Article III Restraint Protocol)",
            "tone": "Neutral / Contextual"
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
