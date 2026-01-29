"""
Debug script to test workspace consistency trigger
"""
import os
from supabase import create_client
from dotenv import load_dotenv
import uuid

load_dotenv()

# Initialize Supabase client with service role
client = create_client(
    os.getenv('SUPABASE_URL'),
    os.getenv('SUPABASE_SERVICE_ROLE_KEY')
)

DEFAULT_WORKSPACE_ID = '00000000-0000-0000-0000-000000000001'

print("Testing workspace consistency trigger...")
print("=" * 60)

try:
    # Step 1: Create account in default workspace
    print("\n1. Creating account in default workspace...")
    account_result = client.table('accounts').insert({
        'workspace_id': DEFAULT_WORKSPACE_ID,
        'domain': 'trigger-test.com'
    }).execute()
    account_id = account_result.data[0]['account_id']
    print(f"   ✓ Account created: {account_id}")
    
    # Step 2: Create a different workspace
    print("\n2. Creating a different workspace...")
    other_workspace_id = str(uuid.uuid4())
    workspace_result = client.table('workspaces').insert({
        'workspace_id': other_workspace_id,
        'name': 'Test Workspace',
        'slug': f'test-{uuid.uuid4().hex[:8]}'
    }).execute()
    print(f"   ✓ Workspace created: {other_workspace_id}")
    
    # Step 3: Try to insert agent_run with mismatched account/workspace
    print("\n3. Attempting to insert agent_run with mismatched account/workspace...")
    print(f"   - workspace_id: {other_workspace_id}")
    print(f"   - account_id: {account_id} (from workspace {DEFAULT_WORKSPACE_ID})")
    
    try:
        run_result = client.table('agent_runs').insert({
            'workspace_id': other_workspace_id,
            'account_id': account_id,  # From different workspace!
            'agent_type': 'RESEARCHER',
            'status': 'PENDING'
        }).execute()
        
        print("\n   ✗ TRIGGER FAILED: Insert was allowed!")
        print(f"   Created run_id: {run_result.data[0]['run_id']}")
        
        # Cleanup the created run
        client.table('agent_runs').delete().eq('run_id', run_result.data[0]['run_id']).execute()
        
    except Exception as trigger_error:
        print(f"\n   ✓ TRIGGER WORKED: Insert was blocked!")
        print(f"   Error: {str(trigger_error)[:200]}")
    
    # Cleanup
    print("\n4. Cleaning up...")
    client.table('accounts').delete().eq('account_id', account_id).execute()
    client.table('workspaces').delete().eq('workspace_id', other_workspace_id).execute()
    print("   ✓ Cleanup complete")
    
except Exception as e:
    print(f"\n✗ Error during test: {str(e)}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
