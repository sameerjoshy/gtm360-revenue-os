-- ============================================
-- PATCH: Add Workspace Consistency Constraint
-- ============================================
-- This ensures that when an account_id is specified in agent_runs,
-- it must belong to the same workspace_id

-- Add a function to validate workspace/account consistency
CREATE OR REPLACE FUNCTION validate_account_workspace()
RETURNS TRIGGER AS $$
BEGIN
    -- If account_id is NULL, skip validation
    IF NEW.account_id IS NULL THEN
        RETURN NEW;
    END IF;
    
    -- Check if the account belongs to the same workspace
    IF NOT EXISTS (
        SELECT 1 FROM accounts
        WHERE account_id = NEW.account_id
        AND workspace_id = NEW.workspace_id
    ) THEN
        RAISE EXCEPTION 'account_id % does not belong to workspace_id %', 
            NEW.account_id, NEW.workspace_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to agent_runs
DROP TRIGGER IF EXISTS validate_agent_runs_workspace ON agent_runs;
CREATE TRIGGER validate_agent_runs_workspace
    BEFORE INSERT OR UPDATE ON agent_runs
    FOR EACH ROW
    EXECUTE FUNCTION validate_account_workspace();

-- Add similar triggers for other tables
DROP TRIGGER IF EXISTS validate_evidence_workspace ON evidence_items;
CREATE TRIGGER validate_evidence_workspace
    BEFORE INSERT OR UPDATE ON evidence_items
    FOR EACH ROW
    EXECUTE FUNCTION validate_account_workspace();

DROP TRIGGER IF EXISTS validate_dossiers_workspace ON account_dossiers;
CREATE TRIGGER validate_dossiers_workspace
    BEFORE INSERT OR UPDATE ON account_dossiers
    FOR EACH ROW
    EXECUTE FUNCTION validate_account_workspace();

DROP TRIGGER IF EXISTS validate_drafts_workspace ON sniper_drafts;
CREATE TRIGGER validate_drafts_workspace
    BEFORE INSERT OR UPDATE ON sniper_drafts
    FOR EACH ROW
    EXECUTE FUNCTION validate_account_workspace();

DROP TRIGGER IF EXISTS validate_signals_workspace ON signals;
CREATE TRIGGER validate_signals_workspace
    BEFORE INSERT OR UPDATE ON signals
    FOR EACH ROW
    EXECUTE FUNCTION validate_account_workspace();

-- Success message
SELECT 'Workspace consistency constraints added successfully! ✅' as status;
