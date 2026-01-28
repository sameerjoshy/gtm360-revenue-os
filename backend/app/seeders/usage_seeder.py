
import random
from typing import Dict, Any

class UsageSeeder:
    """
    Simulates product usage data for GTM-360 customers.
    Focuses on signals that indicate 'Expansion Readiness'.
    """

    @staticmethod
    def generate_usage_report(domain: str) -> Dict[str, Any]:
        """
        Generates a synthetic usage report for a given domain.
        """
        
        # Deterministic seed based on domain for consistent demos, but with some variation
        random.seed(domain)
        
        # 1. License Utilization (The classic upsell trigger)
        license_cap = random.choice([10, 20, 50, 100, 500])
        utilization_rate = random.uniform(0.4, 0.98) # 40% to 98% utilized
        active_users = int(license_cap * utilization_rate)
        
        # 2. Feature Usage (Cross-sell triggers)
        features = {
            "core_crm": "HIGH",
            "reporting": random.choice(["LOW", "MED", "HIGH"]),
            "api_access": random.choice(["NONE", "LOW", "HIGH"]),
            "mobile_app": random.choice(["LOW", "MED", "HIGH"]),
            "ai_assistant": random.choice(["NONE", "NONE", "LOW", "HIGH"]) # AI is new, so often NONE
        }
        
        # 3. Health Score Components
        nps_score = random.randint(6, 10) # Generally happy customers
        last_login_days_ago = random.randint(0, 5)
        support_tickets_open = random.randint(0, 3)
        
        # 4. Expansion Signals (Derived)
        is_seat_constrained = (active_users / license_cap) > 0.90
        is_power_user = features["reporting"] == "HIGH" and features["api_access"] == "HIGH"
        
        return {
            "domain": domain,
            "subscription": {
                "plan": "Enterprise" if license_cap > 100 else "Pro",
                "license_cap": license_cap,
                "active_users": active_users,
                "utilization_pct": round(utilization_rate * 100, 1)
            },
            "features": features,
            "health": {
                "nps": nps_score,
                "last_login_days_ago": last_login_days_ago,
                "tickets_open": support_tickets_open
            },
            "signals": {
                "seat_constrained": is_seat_constrained,
                "power_user": is_power_user
            }
        }

if __name__ == "__main__":
    # Test
    print(UsageSeeder.generate_usage_report("stripe.com"))
