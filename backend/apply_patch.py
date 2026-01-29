"""
Apply workspace consistency patch directly via Supabase
"""
import os
from supabase import create_client
from dotenv import load_dotenv
import requests

load_dotenv()

SUPABASE_URL = os.getenv('SUPABASE_URL')
SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

print("Applying workspace consistency patch to Supabase...")
print("=" * 60)

# Read the patch SQL
with open('db/migrations/001_workspace_consistency_patch.sql', 'r', encoding='utf-8') as f:
    patch_sql = f.read()

# Use the Supabase REST API to execute SQL
# Note: This requires the SQL to be executed via the database directly
# Since Supabase doesn't expose a direct SQL execution endpoint via REST,
# we'll use the postgrest admin API

headers = {
    'apikey': SERVICE_ROLE_KEY,
    'Authorization': f'Bearer {SERVICE_ROLE_KEY}',
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
}

# Try using the rpc endpoint if available
client = create_client(SUPABASE_URL, SERVICE_ROLE_KEY)

print("\n⚠ Note: Supabase Python client doesn't support direct SQL execution.")
print("Please copy and run the following SQL in Supabase SQL Editor:")
print("\nURL: https://supabase.com/dashboard/project/pxvxggspaaexnfpmsawl/sql/new")
print("\n" + "=" * 60)
print(patch_sql)
print("=" * 60)
print("\nAfter running the SQL, press Enter to continue with tests...")
input()
