import os
from supabase import create_client, Client
from app.core.config import settings

def get_supabase_client() -> Client:
    """Get Supabase client with service role key (bypasses RLS for agents)"""
    url: str = settings.SUPABASE_URL
    key: str = settings.SUPABASE_SERVICE_ROLE_KEY
    supabase: Client = create_client(url, key)
    return supabase

def get_workspace_id() -> str:
    """Get current workspace ID (default workspace for single-tenant deployment)"""
    return settings.DEFAULT_WORKSPACE_ID

async def create_agent_run_rpc(
    workspace_id: str,
    idempotency_key: str,
    agent_type: str,
    account_id: str | None,
    inputs: dict
) -> str:
    """
    Wrapper for create_agent_run RPC function.
    Creates an agent run with proper workspace/account validation.
    
    Args:
        workspace_id: UUID of the workspace
        idempotency_key: Unique key to prevent duplicate runs
        agent_type: 'RESEARCHER' or 'SNIPER'
        account_id: UUID of the account (optional)
        inputs: JSON inputs for the agent
    
    Returns:
        run_id: UUID of the created agent run
    """
    client = get_supabase_client()
    result = client.rpc('create_agent_run', {
        'p_workspace_id': workspace_id,
        'p_idempotency_key': idempotency_key,
        'p_agent_type': agent_type,
        'p_account_id': account_id,
        'p_inputs': inputs
    }).execute()
    return result.data

async def create_or_get_account_rpc(
    workspace_id: str,
    domain: str,
    record_id: str | None = None
) -> str:
    """
    Wrapper for create_or_get_account RPC function.
    Creates account if it doesn't exist, or returns existing account_id.
    
    Args:
        workspace_id: UUID of the workspace
        domain: Company domain
        record_id: Optional HubSpot record ID
    
    Returns:
        account_id: UUID of the account
    """
    client = get_supabase_client()
    result = client.rpc('create_or_get_account', {
        'p_workspace_id': workspace_id,
        'p_domain': domain,
        'p_record_id': record_id
    }).execute()
    return result.data
