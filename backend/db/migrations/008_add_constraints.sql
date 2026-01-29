-- Migration 008: Add Constraints and Triggers
-- Immutability enforcement and unique constraints

-- ============================================
-- Immutability Triggers
-- ============================================

-- Prevent workspace_id changes (strict)
CREATE OR REPLACE FUNCTION prevent_workspace_id_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.workspace_id IS DISTINCT FROM NEW.workspace_id THEN
        RAISE EXCEPTION 'workspace_id cannot be changed';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER accounts_prevent_workspace_change 
    BEFORE UPDATE ON accounts 
    FOR EACH ROW EXECUTE FUNCTION prevent_workspace_id_change();

CREATE TRIGGER agent_runs_prevent_workspace_change 
    BEFORE UPDATE ON agent_runs 
    FOR EACH ROW EXECUTE FUNCTION prevent_workspace_id_change();

CREATE TRIGGER evidence_prevent_workspace_change 
    BEFORE UPDATE ON evidence_items 
    FOR EACH ROW EXECUTE FUNCTION prevent_workspace_id_change();

CREATE TRIGGER dossiers_prevent_workspace_change 
    BEFORE UPDATE ON account_dossiers 
    FOR EACH ROW EXECUTE FUNCTION prevent_workspace_id_change();

CREATE TRIGGER drafts_prevent_workspace_change 
    BEFORE UPDATE ON sniper_drafts 
    FOR EACH ROW EXECUTE FUNCTION prevent_workspace_id_change();

-- Prevent account_id changes (strict)
CREATE OR REPLACE FUNCTION prevent_account_id_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.account_id IS DISTINCT FROM NEW.account_id THEN
        RAISE EXCEPTION 'account_id cannot be changed';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER dossiers_prevent_account_change 
    BEFORE UPDATE ON account_dossiers 
    FOR EACH ROW EXECUTE FUNCTION prevent_account_id_change();

CREATE TRIGGER evidence_prevent_account_change 
    BEFORE UPDATE ON evidence_items 
    FOR EACH ROW EXECUTE FUNCTION prevent_account_id_change();

CREATE TRIGGER drafts_prevent_account_change 
    BEFORE UPDATE ON sniper_drafts 
    FOR EACH ROW EXECUTE FUNCTION prevent_account_id_change();

-- Prevent run_id changes (strict)
CREATE OR REPLACE FUNCTION prevent_run_id_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.run_id IS DISTINCT FROM NEW.run_id THEN
        RAISE EXCEPTION 'run_id cannot be changed';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER evidence_prevent_run_change 
    BEFORE UPDATE ON evidence_items 
    FOR EACH ROW EXECUTE FUNCTION prevent_run_id_change();

CREATE TRIGGER drafts_prevent_run_change 
    BEFORE UPDATE ON sniper_drafts 
    FOR EACH ROW EXECUTE FUNCTION prevent_run_id_change();

-- Restrict agent_runs updates (inputs immutable, status updates allowed)
CREATE OR REPLACE FUNCTION restrict_agent_run_updates()
RETURNS TRIGGER AS $$
BEGIN
    -- Immutable fields
    IF OLD.run_id IS DISTINCT FROM NEW.run_id THEN
        RAISE EXCEPTION 'run_id cannot be changed';
    END IF;
    
    IF OLD.workspace_id IS DISTINCT FROM NEW.workspace_id THEN
        RAISE EXCEPTION 'workspace_id cannot be changed';
    END IF;
    
    IF OLD.idempotency_key IS DISTINCT FROM NEW.idempotency_key THEN
        RAISE EXCEPTION 'idempotency_key cannot be changed';
    END IF;
    
    IF OLD.agent_type IS DISTINCT FROM NEW.agent_type THEN
        RAISE EXCEPTION 'agent_type cannot be changed';
    END IF;
    
    IF OLD.account_id IS DISTINCT FROM NEW.account_id THEN
        RAISE EXCEPTION 'account_id cannot be changed';
    END IF;
    
    -- STRICT: inputs cannot be changed
    IF OLD.inputs IS DISTINCT FROM NEW.inputs THEN
        RAISE EXCEPTION 'inputs cannot be changed';
    END IF;
    
    IF OLD.created_by IS DISTINCT FROM NEW.created_by THEN
        RAISE EXCEPTION 'created_by cannot be changed';
    END IF;
    
    IF OLD.created_at IS DISTINCT FROM NEW.created_at THEN
        RAISE EXCEPTION 'created_at cannot be changed';
    END IF;
    
    -- Allow: status, outputs, logs, error_*, duration_ms, updated_at
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER agent_runs_restrict_updates 
    BEFORE UPDATE ON agent_runs 
    FOR EACH ROW EXECUTE FUNCTION restrict_agent_run_updates();

-- Restrict sniper_drafts updates (draft_json editable only in NEEDS_REVIEW)
CREATE OR REPLACE FUNCTION restrict_draft_updates()
RETURNS TRIGGER AS $$
BEGIN
    -- Immutable fields
    IF OLD.draft_id IS DISTINCT FROM NEW.draft_id THEN
        RAISE EXCEPTION 'draft_id cannot be changed';
    END IF;
    
    IF OLD.workspace_id IS DISTINCT FROM NEW.workspace_id THEN
        RAISE EXCEPTION 'workspace_id cannot be changed';
    END IF;
    
    IF OLD.account_id IS DISTINCT FROM NEW.account_id THEN
        RAISE EXCEPTION 'account_id cannot be changed';
    END IF;
    
    IF OLD.run_id IS DISTINCT FROM NEW.run_id THEN
        RAISE EXCEPTION 'run_id cannot be changed';
    END IF;
    
    IF OLD.created_by IS DISTINCT FROM NEW.created_by THEN
        RAISE EXCEPTION 'created_by cannot be changed';
    END IF;
    
    IF OLD.created_at IS DISTINCT FROM NEW.created_at THEN
        RAISE EXCEPTION 'created_at cannot be changed';
    END IF;
    
    -- RELAXED: Allow draft_json updates only if status = 'NEEDS_REVIEW'
    IF OLD.draft_json IS DISTINCT FROM NEW.draft_json THEN
        IF OLD.status != 'NEEDS_REVIEW' THEN
            RAISE EXCEPTION 'draft_json can only be changed when status = NEEDS_REVIEW';
        END IF;
    END IF;
    
    -- Allow: status, draft_json (conditional), updated_at
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER drafts_restrict_updates 
    BEFORE UPDATE ON sniper_drafts 
    FOR EACH ROW EXECUTE FUNCTION restrict_draft_updates();

-- ============================================
-- Unique Constraints
-- ============================================

-- Accounts: unique per workspace + normalized_domain (soft delete aware)
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_account_per_workspace 
    ON accounts(workspace_id, normalized_domain) 
    WHERE is_deleted = FALSE;

-- Agent runs: unique idempotency key per workspace
-- First, add idempotency_key column if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'agent_runs' AND column_name = 'idempotency_key'
    ) THEN
        ALTER TABLE agent_runs ADD COLUMN idempotency_key TEXT;
    END IF;
END $$;

-- Add inputs column if not exists (for new schema)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'agent_runs' AND column_name = 'inputs'
    ) THEN
        ALTER TABLE agent_runs ADD COLUMN inputs JSONB;
    END IF;
END $$;

-- Add outputs column if not exists
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'agent_runs' AND column_name = 'outputs'
    ) THEN
        ALTER TABLE agent_runs ADD COLUMN outputs JSONB;
    END IF;
END $$;

-- Add error columns if not exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'agent_runs' AND column_name = 'error_code'
    ) THEN
        ALTER TABLE agent_runs ADD COLUMN error_code TEXT;
        ALTER TABLE agent_runs ADD COLUMN error_message TEXT;
        ALTER TABLE agent_runs ADD COLUMN error_context JSONB;
        ALTER TABLE agent_runs ADD COLUMN duration_ms INTEGER;
    END IF;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS idx_idempotency_key 
    ON agent_runs(workspace_id, idempotency_key)
    WHERE idempotency_key IS NOT NULL;

-- Account dossiers: unique per workspace + account + config
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_dossier_per_account_config 
    ON account_dossiers(workspace_id, account_id, config_id)
    WHERE account_id IS NOT NULL AND config_id IS NOT NULL;
