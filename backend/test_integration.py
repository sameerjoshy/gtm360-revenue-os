"""
Quick integration test for workspace-aware backend
"""
import asyncio
from app.core.supabase import get_workspace_id, create_or_get_account_rpc
from app.providers.adapters import SupabaseAdapter

async def test_integration():
    print("=" * 60)
    print("Backend Workspace Integration Test")
    print("=" * 60)
    
    # Test 1: Get workspace ID
    print("\n1. Testing workspace context...")
    workspace_id = get_workspace_id()
    print(f"   ✓ Workspace ID: {workspace_id}")
    
    # Test 2: Initialize SupabaseAdapter with workspace
    print("\n2. Testing SupabaseAdapter initialization...")
    db = SupabaseAdapter(workspace_id=workspace_id)
    print(f"   ✓ Adapter initialized for workspace: {db.workspace_id}")
    
    # Test 3: Create/get account via RPC
    print("\n3. Testing create_or_get_account RPC...")
    try:
        account_id = await create_or_get_account_rpc(
            workspace_id=workspace_id,
            domain="integration-test.com",
            record_id="test-123"
        )
        print(f"   ✓ Account ID: {account_id}")
    except Exception as e:
        print(f"   ✗ RPC Error: {str(e)[:100]}")
    
    # Test 4: Ensure account via adapter
    print("\n4. Testing ensure_account via adapter...")
    try:
        account_id2 = await db.ensure_account("adapter-test.com", "test-456")
        print(f"   ✓ Account ID: {account_id2}")
    except Exception as e:
        print(f"   ✗ Adapter Error: {str(e)[:100]}")
    
    print("\n" + "=" * 60)
    print("Integration test complete!")
    print("=" * 60)

if __name__ == "__main__":
    asyncio.run(test_integration())
