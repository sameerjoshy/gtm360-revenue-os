
import random
from typing import Dict, List, Any
from datetime import datetime, timedelta

class CRMSeeder:
    """
    Simulates a 'Dirty CRM' with hygiene issues.
    """

    @staticmethod
    def generate_messy_data(record_count: int = 10) -> Dict[str, Any]:
        deals = []
        contacts = []
        
        # 1. Generate Deals (Mix of Healthy and Stale)
        for i in range(record_count):
            is_stale = random.random() < 0.4 # 40% stale rate
            days_ago = random.randint(45, 120) if is_stale else random.randint(1, 14)
            
            deal = {
                "deal_id": f"deal_{100 + i}",
                "name": f"Opportunity #{100+i}",
                "stage": random.choice(["discovery", "presentation", "contract_sent", "negotiation"]),
                "amount": random.choice([10000, 25000, 50000, 120000]),
                "last_activity_date": (datetime.now() - timedelta(days=days_ago)).isoformat(),
                "owner_id": "rep_01"
            }
            deals.append(deal)

        # 2. Generate Contacts (Mix of Complete and Incomplete)
        for i in range(record_count):
            is_missing_data = random.random() < 0.5 # 50% have missing fields
            
            contact = {
                "contact_id": f"contact_{500 + i}",
                "first_name": f"John_{i}",
                "last_name": f"Doe_{i}",
                "email": f"john.doe.{i}@example.com" if random.random() > 0.2 else None, # 20% missing email
                "title": f"Director of Sales" if not is_missing_data else None, # Missing title
                "phone": "+1-555-0100" if not is_missing_data else None
            }
            contacts.append(contact)

        return {
            "deals": deals,
            "contacts": contacts,
            "metadata": {
                "generated_at": datetime.now().isoformat(),
                "environment": "MOCK_DIRTY_CRM"
            }
        }

if __name__ == "__main__":
    import json
    print(json.dumps(CRMSeeder.generate_messy_data(5), indent=2))
