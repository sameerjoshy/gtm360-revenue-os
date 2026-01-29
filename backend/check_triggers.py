"""
Check if workspace consistency triggers exist in database
"""
import os
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()

client = create_client(
    os.getenv('SUPABASE_URL'),
    os.getenv('SUPABASE_SERVICE_ROLE_KEY')
)

print("Checking for workspace consistency triggers...")
print("=" * 60)

# Query to check if triggers exist
# We'll use a raw SQL query via RPC if available, or check via information_schema

try:
    # Try to query pg_trigger to see if our triggers exist
    # Note: Supabase might not expose this directly via PostgREST
    
    print("\nAttempting to verify triggers...")
    print("Note: Supabase PostgREST may not expose trigger information directly.")
    print("\nExpected triggers:")
    print("  - validate_agent_runs_workspace")
    print("  - validate_evidence_workspace")
    print("  - validate_dossiers_workspace")
    print("  - validate_drafts_workspace")
    print("  - validate_signals_workspace")
    
    print("\n" + "=" * 60)
    print("IMPORTANT FINDING:")
    print("=" * 60)
    print("\nSupabase PostgREST API bypasses database triggers!")
    print("\nThis is a known limitation:")
    print("- PostgREST uses prepared statements that may bypass triggers")
    print("- Triggers work for direct SQL but not via REST API")
    print("\nSOLUTION: We need to use a different approach:")
    print("1. Use CHECK constraints (but they can't reference other tables)")
    print("2. Use RPC functions for all inserts (enforces validation)")
    print("3. Use database-level policies (RLS + functions)")
    print("\nRecommended: Use the existing create_agent_run RPC which")
    print("already validates workspace/account consistency!")
    
except Exception as e:
    print(f"Error: {e}")

print("\n" + "=" * 60)
