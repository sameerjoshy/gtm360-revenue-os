
from typing import TypedDict, List, Dict, Any
from langgraph.graph import StateGraph, END

from app.seeders.crm_seeder import CRMSeeder

# --- State Definition ---
class HygieneState(TypedDict):
    raw_data: Dict[str, Any]
    issues: List[Dict[str, Any]]
    health_score: int
    status: str

# --- Nodes ---
class HygieneNodes:
    def scan_crm(self, state: HygieneState) -> Dict:
        """Fetch data from the CRM (Mocked for now)."""
        data = CRMSeeder.generate_messy_data(record_count=15)
        return {"raw_data": data, "status": "SCANNING"}

    def detect_anomalies(self, state: HygieneState) -> Dict:
        """
        Rule Engine to find issues.
        1. Stale Deal: No activity > 30 days.
        2. Ghost Contact: Missing Email or Title.
        """
        data = state["raw_data"]
        issues = []
        
        # 1. Check Deals
        stale_count = 0
        from datetime import datetime
        now = datetime.now()
        
        for deal in data["deals"]:
            last_active = datetime.fromisoformat(deal["last_activity_date"])
            days_inactive = (now - last_active).days
            
            if days_inactive > 30:
                stale_count += 1
                issues.append({
                    "type": "STALE_DEAL",
                    "severity": "HIGH" if deal["amount"] > 50000 else "MED",
                    "entity_id": deal["deal_id"],
                    "description": f"Deal '{deal['name']}' (${deal['amount']:,}) untouched for {days_inactive} days.",
                    "suggested_fix": "Move to 'Closed Lost' or enrolling in 'Wake Up' sequence."
                })

        # 2. Check Contacts
        missing_data_count = 0
        for contact in data["contacts"]:
            missing_fields = []
            if not contact["email"]: missing_fields.append("Email")
            if not contact["title"]: missing_fields.append("Title")
            
            if missing_fields:
                missing_data_count += 1
                issues.append({
                    "type": "INCOMPLETE_CONTACT",
                    "severity": "LOW",
                    "entity_id": contact["contact_id"],
                    "description": f"Contact matches but missing: {', '.join(missing_fields)}.",
                    "suggested_fix": "Auto-Enrich via Clearbit/Apollo."
                })

        # Calculate Score (Basic heuristic)
        total_records = len(data["deals"]) + len(data["contacts"])
        total_issues = stale_count + missing_data_count
        # Floor at 0, max 100
        health_score = max(0, int(100 - (total_issues / total_records * 100)))

        return {"issues": issues, "health_score": health_score, "status": "DONE"}

# --- Graph ---
def create_hygiene_graph():
    nodes = HygieneNodes()
    workflow = StateGraph(HygieneState)
    
    workflow.add_node("scan_crm", nodes.scan_crm)
    workflow.add_node("detect_anomalies", nodes.detect_anomalies)
    
    workflow.set_entry_point("scan_crm")
    workflow.add_edge("scan_crm", "detect_anomalies")
    workflow.add_edge("detect_anomalies", END)
    
    return workflow.compile()
