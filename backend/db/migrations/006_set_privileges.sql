-- Migration 006: Set Privileges (Hybrid Model)
-- Implements Option B: Creates via RPC, artifacts via direct writes

-- ============================================
-- REVOKE: Invariant Tables (RPC-Only)
-- ============================================

-- Workspaces (create via RPC only)
REVOKE INSERT, UPDATE, DELETE ON workspaces FROM authenticated;
GRANT SELECT ON workspaces TO authenticated;

-- Workspace Members (managed via RPC only)
REVOKE INSERT, UPDATE, DELETE ON workspace_members FROM authenticated;
GRANT SELECT ON workspace_members TO authenticated;

-- Accounts (create via RPC only, no direct writes)
REVOKE INSERT, UPDATE, DELETE ON accounts FROM authenticated;
GRANT SELECT ON accounts TO authenticated;

-- Agent Runs (create via RPC, update status via direct writes)
REVOKE INSERT, DELETE ON agent_runs FROM authenticated;
GRANT SELECT ON agent_runs TO authenticated;
-- Allow limited UPDATE (status and outputs only)
GRANT UPDATE (status, updated_at, logs, outputs, error_code, error_message, error_context, duration_ms) 
    ON agent_runs TO authenticated;

-- ============================================
-- GRANT: Artifact Tables (Direct Writes)
-- ============================================

-- Evidence Items (INSERT-only, agents write)
GRANT SELECT, INSERT ON evidence_items TO authenticated;
REVOKE UPDATE, DELETE ON evidence_items FROM authenticated;

-- Account Dossiers (UPSERT allowed)
GRANT SELECT, INSERT, UPDATE ON account_dossiers TO authenticated;
REVOKE DELETE ON account_dossiers FROM authenticated;

-- Sniper Drafts (INSERT + UPDATE allowed)
GRANT SELECT, INSERT, UPDATE ON sniper_drafts TO authenticated;
REVOKE DELETE ON sniper_drafts FROM authenticated;

-- Suggested Updates (if exists)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'suggested_updates') THEN
        GRANT SELECT, INSERT, UPDATE ON suggested_updates TO authenticated;
        REVOKE DELETE ON suggested_updates FROM authenticated;
    END IF;
END $$;
