"""
Test the create_agent_run RPC with mismatched workspace/account
"""
import os
from supabase import create_client
from dotenv import load_dotenv
import uuid

load_dotenv()

client = create_client(
    os.getenv('SUPABASE_URL'),
    os.getenv('SUPABASE_SERVICE_ROLE_KEY')
)

DEFAULT_WORKSPACE_ID = '00000000-0000-0000-0000-000000000001'

print("Testing create_agent_run RPC with mismatched workspace/account...")
print("=" * 60)

try:
    # Step 1: Create account using RPC
    print("\n1. Creating account via RPC...")
    account_id = client.rpc('create_or_get_account', {
        'p_workspace_id': DEFAULT_WORKSPACE_ID,
        'p_domain': 'rpc-test.com'
    }).execute().data
    print(f"   ✓ Account created: {account_id}")
    
    # Step 2: Create different workspace
    print("\n2. Creating different workspace...")
    other_workspace_id = str(uuid.uuid4())
    client.table('workspaces').insert({
        'workspace_id': other_workspace_id,
        'name': 'Test Workspace',
        'slug': f'test-{uuid.uuid4().hex[:8]}'
    }).execute()
    print(f"   ✓ Workspace created: {other_workspace_id}")
    
    # Step 3: Try to create agent_run via RPC with mismatch
    print("\n3. Calling create_agent_run RPC with mismatched account/workspace...")
    print(f"   - p_workspace_id: {other_workspace_id}")
    print(f"   - p_account_id: {account_id} (from workspace {DEFAULT_WORKSPACE_ID})")
    
    try:
        result = client.rpc('create_agent_run', {
            'p_workspace_id': other_workspace_id,
            'p_idempotency_key': f'test-{uuid.uuid4()}',
            'p_agent_type': 'RESEARCHER',
            'p_account_id': account_id,
            'p_inputs': {'domain': 'test.com'}
        }).execute()
        
        print(f"\n   ✗ RPC DID NOT BLOCK: Returned run_id: {result.data}")
        print("   This means the RPC validation is not working!")
        
    except Exception as rpc_error:
        print(f"\n   ✓ RPC BLOCKED THE CALL!")
        print(f"   Error type: {type(rpc_error).__name__}")
        print(f"   Error message: {str(rpc_error)}")
        print(f"\n   Full error details:")
        print(f"   {repr(rpc_error)}")
    
    # Cleanup
    print("\n4. Cleaning up...")
    client.table('accounts').delete().eq('account_id', account_id).execute()
    client.table('workspaces').delete().eq('workspace_id', other_workspace_id).execute()
    print("   ✓ Done")
    
except Exception as e:
    print(f"\n✗ Outer error: {str(e)}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 60)
