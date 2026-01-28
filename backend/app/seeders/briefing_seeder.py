import random
from datetime import datetime, timedelta

class BriefingSeeder:
    @staticmethod
    def generate_weekly_stats():
        """Generates realistic aggregated stats for the Executive Briefing."""
        
        return {
            "period": "Last 7 Days",
            "outbound_swarm": {
                "leads_processed": 142,
                "dossiers_created": 38,
                "sniper_drafts_generated": 35,
                "emails_sent": 28,  # Simulated manual approval
                "meetings_booked": 4,
                "top_performer": "Sniper Agent (Hooks: Funding News)"
            },
            "sales_swarm": {
                "deals_analyzed": 12,
                "risks_flagged": 3,
                "buyer_readiness_avg": "Medium",
                "critical_alert": "Deal 'Acme Corp' (150k) flagged for 'Ghosting Champion'"
            },
            "cs_swarm": {
                "expansion_signals_detected": 5,
                "upsell_pipeline_generated": "$45,000",
                "churn_risk_alerts": 1,
                "top_expansion_signal": "Seat Utilization > 95%"
            },
            "revops_swarm": {
                "state_of_crm": "Improving",
                "stale_deals_fixed": 8,
                "contacts_enriched": 45,
                "revenue_leak_detected": "$12,000 (Stalled Stage 3)"
            }
        }
