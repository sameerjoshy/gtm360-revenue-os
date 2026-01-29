"""
Check Supabase for the agent run created by deployment test
"""
from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Supabase client
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")
supabase = create_client(url, key)

print("=" * 60)
print("Checking Supabase for Agent Runs")
print("=" * 60)

# Query recent agent runs
workspace_id = "00000000-0000-0000-0000-000000000001"

try:
    response = supabase.table("agent_runs")\
        .select("run_id, workspace_id, account_id, agent_type, status, inputs, created_at")\
        .eq("workspace_id", workspace_id)\
        .order("created_at", desc=True)\
        .limit(5)\
        .execute()
    
    if response.data:
        print(f"\n✅ Found {len(response.data)} recent agent run(s):\n")
        for run in response.data:
            print(f"Run ID: {run['run_id']}")
            print(f"  Agent Type: {run['agent_type']}")
            print(f"  Status: {run['status']}")
            print(f"  Account ID: {run['account_id']}")
            print(f"  Inputs: {run['inputs']}")
            print(f"  Created: {run['created_at']}")
            print()
    else:
        print("\n⚠️  No agent runs found in workspace")
        print("This might mean:")
        print("1. The webhook test hasn't completed yet (check Render logs)")
        print("2. There was an error creating the run (check Render logs)")
        
except Exception as e:
    print(f"\n❌ Error querying Supabase: {e}")

# Also check accounts table
print("\n" + "=" * 60)
print("Checking Accounts Created")
print("=" * 60)

try:
    accounts = supabase.table("accounts")\
        .select("account_id, workspace_id, domain, record_id, created_at")\
        .eq("workspace_id", workspace_id)\
        .order("created_at", desc=True)\
        .limit(5)\
        .execute()
    
    if accounts.data:
        print(f"\n✅ Found {len(accounts.data)} recent account(s):\n")
        for acc in accounts.data:
            print(f"Account ID: {acc['account_id']}")
            print(f"  Domain: {acc['domain']}")
            print(f"  Record ID: {acc.get('record_id', 'N/A')}")
            print(f"  Created: {acc['created_at']}")
            print()
    else:
        print("\n⚠️  No accounts found")
        
except Exception as e:
    print(f"\n❌ Error querying accounts: {e}")

print("=" * 60)
