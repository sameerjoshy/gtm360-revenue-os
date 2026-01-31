-- ============================================
-- COMPLETE MIGRATION - Fresh Supabase Instance
-- GTM-360 Base Schema + Multi-Tenancy + RLS + Hybrid Model
-- ============================================

-- ============================================
-- PART 0: Extensions (Required for UUID)
-- ============================================
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- PART 0.5: Create Base Tables (Original Schema)
-- ============================================

-- 1. Agent Runs (Base Table)
CREATE TABLE IF NOT EXISTS agent_runs (
    run_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_type TEXT NOT NULL CHECK (agent_type IN ('RESEARCHER', 'SNIPER')),
    status TEXT NOT NULL,
    domain TEXT,
    record_id TEXT,
    config_id TEXT,
    logs JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Evidence Items (Provenance)
CREATE TABLE IF NOT EXISTS evidence_items (
    evidence_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain TEXT NOT NULL,
    url TEXT NOT NULL,
    source_type TEXT,
    excerpt TEXT,
    reliability TEXT,
    raw_data JSONB,
    run_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Account Dossiers (Output of Researcher)
CREATE TABLE IF NOT EXISTS account_dossiers (
    dossier_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain TEXT NOT NULL,
    record_id TEXT,
    config_id TEXT,
    dossier_json JSONB NOT NULL,
    version TEXT DEFAULT '1.0',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_dossier_domain ON account_dossiers(domain);

-- 4. Sniper Drafts (Output of Sniper)
CREATE TABLE IF NOT EXISTS sniper_drafts (
    draft_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id UUID,
    domain TEXT NOT NULL,
    sequence_type TEXT,
    draft_json JSONB NOT NULL,
    status TEXT DEFAULT 'NEEDS_REVIEW',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Suggested Updates (Diff Engine)
CREATE TABLE IF NOT EXISTS suggested_updates (
    update_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    run_id UUID,
    agent_type TEXT,
    domain TEXT,
    record_id TEXT,
    payload_json JSONB,
    status TEXT DEFAULT 'PENDING',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Signals (if not exists)
CREATE TABLE IF NOT EXISTS signals (
    signal_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    domain TEXT NOT NULL,
    signal_type TEXT NOT NULL,
    signal_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PART 1: Create Workspaces Foundation
-- ============================================

CREATE TABLE IF NOT EXISTS workspaces (
    workspace_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS workspace_members (
    workspace_id UUID REFERENCES workspaces(workspace_id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'admin', 'member')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (workspace_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_workspace_slug ON workspaces(slug);
CREATE INDEX IF NOT EXISTS idx_workspace_members_user ON workspace_members(user_id);

-- ============================================
-- PART 2: Domain Normalization + Accounts Table
-- ============================================

CREATE OR REPLACE FUNCTION normalize_domain(domain TEXT)
RETURNS TEXT AS $$
BEGIN
    IF domain IS NULL THEN
        RETURN NULL;
    END IF;
    domain := REGEXP_REPLACE(domain, '^https?://', '', 'i');
    domain := REGEXP_REPLACE(domain, '^www\.', '', 'i');
    domain := RTRIM(domain, '/');
    RETURN LOWER(TRIM(domain));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE TABLE IF NOT EXISTS accounts (
    account_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID REFERENCES workspaces(workspace_id) ON DELETE RESTRICT,
    domain TEXT NOT NULL,
    normalized_domain TEXT GENERATED ALWAYS AS (normalize_domain(domain)) STORED,
    record_id TEXT,
    company_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES auth.users(id),
    updated_by UUID REFERENCES auth.users(id),
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMPTZ
);

-- Add workspace_id to existing tables
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES workspaces(workspace_id) ON DELETE RESTRICT;
ALTER TABLE evidence_items ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES workspaces(workspace_id) ON DELETE CASCADE;
ALTER TABLE account_dossiers ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES workspaces(workspace_id) ON DELETE CASCADE;
ALTER TABLE sniper_drafts ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES workspaces(workspace_id) ON DELETE CASCADE;
ALTER TABLE signals ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES workspaces(workspace_id) ON DELETE CASCADE;

-- Add account_id foreign keys
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES accounts(account_id) ON DELETE SET NULL;
ALTER TABLE evidence_items ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES accounts(account_id) ON DELETE CASCADE;
ALTER TABLE account_dossiers ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES accounts(account_id) ON DELETE CASCADE;
ALTER TABLE sniper_drafts ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES accounts(account_id) ON DELETE CASCADE;
ALTER TABLE signals ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES accounts(account_id) ON DELETE CASCADE;

-- Add audit columns
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
ALTER TABLE account_dossiers ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
ALTER TABLE account_dossiers ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id);
ALTER TABLE sniper_drafts ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

-- Add new columns for agent_runs
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS idempotency_key TEXT;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS inputs JSONB;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS outputs JSONB;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS error_code TEXT;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS error_message TEXT;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS error_context JSONB;
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS duration_ms INTEGER;

CREATE INDEX IF NOT EXISTS idx_accounts_workspace ON accounts(workspace_id);
CREATE INDEX IF NOT EXISTS idx_accounts_record_id ON accounts(record_id) WHERE record_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_accounts_normalized_domain ON accounts(normalized_domain);

-- ============================================
-- PART 3: Backfill Data
-- ============================================

INSERT INTO workspaces (workspace_id, name, slug)
VALUES ('00000000-0000-0000-0000-000000000001'::uuid, 'Default Workspace', 'default')
ON CONFLICT (workspace_id) DO NOTHING;

UPDATE agent_runs SET workspace_id = '00000000-0000-0000-0000-000000000001'::uuid WHERE workspace_id IS NULL;
UPDATE evidence_items SET workspace_id = '00000000-0000-0000-0000-000000000001'::uuid WHERE workspace_id IS NULL;
UPDATE account_dossiers SET workspace_id = '00000000-0000-0000-0000-000000000001'::uuid WHERE workspace_id IS NULL;
UPDATE sniper_drafts SET workspace_id = '00000000-0000-0000-0000-000000000001'::uuid WHERE workspace_id IS NULL;
UPDATE signals SET workspace_id = '00000000-0000-0000-0000-000000000001'::uuid WHERE workspace_id IS NULL;

-- Migrate domain-based data to accounts
INSERT INTO accounts (workspace_id, domain, record_id, created_at)
SELECT DISTINCT
    '00000000-0000-0000-0000-000000000001'::uuid as workspace_id,
    domain,
    record_id,
    MIN(created_at) as created_at
FROM account_dossiers
WHERE domain IS NOT NULL
GROUP BY domain, record_id
ON CONFLICT DO NOTHING;

-- Update account_id references
UPDATE account_dossiers ad
SET account_id = a.account_id
FROM accounts a
WHERE ad.domain = a.domain
AND ad.workspace_id = a.workspace_id
AND ad.account_id IS NULL;

UPDATE agent_runs ar
SET account_id = a.account_id
FROM accounts a
WHERE ar.domain = a.domain
AND ar.workspace_id = a.workspace_id
AND ar.account_id IS NULL;

UPDATE evidence_items ei
SET account_id = a.account_id
FROM accounts a
WHERE ei.domain = a.domain
AND ei.workspace_id = a.workspace_id
AND ei.account_id IS NULL;

UPDATE sniper_drafts sd
SET account_id = a.account_id
FROM accounts a
WHERE sd.domain = a.domain
AND sd.workspace_id = a.workspace_id
AND sd.account_id IS NULL;

UPDATE signals s
SET account_id = a.account_id
FROM accounts a
WHERE s.domain = a.domain
AND s.workspace_id = a.workspace_id
AND s.account_id IS NULL;

-- ============================================
-- PART 4: Enforce NOT NULL
-- ============================================

ALTER TABLE accounts ALTER COLUMN workspace_id SET NOT NULL;
ALTER TABLE agent_runs ALTER COLUMN workspace_id SET NOT NULL;
ALTER TABLE evidence_items ALTER COLUMN workspace_id SET NOT NULL;
ALTER TABLE account_dossiers ALTER COLUMN workspace_id SET NOT NULL;
ALTER TABLE sniper_drafts ALTER COLUMN workspace_id SET NOT NULL;
ALTER TABLE signals ALTER COLUMN workspace_id SET NOT NULL;

-- ============================================
-- PART 5: RLS Policies
-- ============================================

CREATE OR REPLACE FUNCTION is_workspace_member(wid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.workspace_members
        WHERE workspace_id = wid AND user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql STABLE;

CREATE OR REPLACE FUNCTION is_workspace_admin(wid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.workspace_members
        WHERE workspace_id = wid 
        AND user_id = auth.uid()
        AND role IN ('owner', 'admin')
    );
END;
$$ LANGUAGE plpgsql STABLE;

ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_dossiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sniper_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE signals ENABLE ROW LEVEL SECURITY;

-- Workspaces policies
DROP POLICY IF EXISTS "workspaces_select" ON workspaces;
CREATE POLICY "workspaces_select" ON workspaces FOR SELECT 
    USING (EXISTS (SELECT 1 FROM workspace_members WHERE workspace_id = workspaces.workspace_id AND user_id = auth.uid()));

-- Workspace members policies
DROP POLICY IF EXISTS "workspace_members_select" ON workspace_members;
CREATE POLICY "workspace_members_select" ON workspace_members FOR SELECT 
    USING (user_id = auth.uid() OR is_workspace_admin(workspace_id));

-- Accounts policies
DROP POLICY IF EXISTS "accounts_select" ON accounts;
DROP POLICY IF EXISTS "accounts_insert" ON accounts;
DROP POLICY IF EXISTS "accounts_update" ON accounts;
DROP POLICY IF EXISTS "accounts_delete" ON accounts;
CREATE POLICY "accounts_select" ON accounts FOR SELECT USING (is_workspace_member(workspace_id));
CREATE POLICY "accounts_insert" ON accounts FOR INSERT WITH CHECK (is_workspace_member(workspace_id));
CREATE POLICY "accounts_update" ON accounts FOR UPDATE USING (is_workspace_member(workspace_id)) WITH CHECK (is_workspace_member(workspace_id));
CREATE POLICY "accounts_delete" ON accounts FOR DELETE USING (is_workspace_admin(workspace_id));

-- Agent runs policies
DROP POLICY IF EXISTS "agent_runs_select" ON agent_runs;
DROP POLICY IF EXISTS "agent_runs_insert" ON agent_runs;
DROP POLICY IF EXISTS "agent_runs_update" ON agent_runs;
DROP POLICY IF EXISTS "agent_runs_delete" ON agent_runs;
CREATE POLICY "agent_runs_select" ON agent_runs FOR SELECT USING (is_workspace_member(workspace_id));
CREATE POLICY "agent_runs_insert" ON agent_runs FOR INSERT WITH CHECK (is_workspace_member(workspace_id));
CREATE POLICY "agent_runs_update" ON agent_runs FOR UPDATE USING (is_workspace_member(workspace_id)) WITH CHECK (is_workspace_member(workspace_id));
CREATE POLICY "agent_runs_delete" ON agent_runs FOR DELETE USING (is_workspace_admin(workspace_id));

-- Evidence items policies
DROP POLICY IF EXISTS "evidence_items_select" ON evidence_items;
DROP POLICY IF EXISTS "evidence_items_insert" ON evidence_items;
CREATE POLICY "evidence_items_select" ON evidence_items FOR SELECT USING (is_workspace_member(workspace_id));
CREATE POLICY "evidence_items_insert" ON evidence_items FOR INSERT WITH CHECK (is_workspace_member(workspace_id));

-- Signals policies
DROP POLICY IF EXISTS "signals_select" ON signals;
DROP POLICY IF EXISTS "signals_insert" ON signals;
CREATE POLICY "signals_select" ON signals FOR SELECT USING (is_workspace_member(workspace_id));
CREATE POLICY "signals_insert" ON signals FOR INSERT WITH CHECK (is_workspace_member(workspace_id));

-- Account dossiers policies
DROP POLICY IF EXISTS "account_dossiers_select" ON account_dossiers;
DROP POLICY IF EXISTS "account_dossiers_insert" ON account_dossiers;
DROP POLICY IF EXISTS "account_dossiers_update" ON account_dossiers;
CREATE POLICY "account_dossiers_select" ON account_dossiers FOR SELECT USING (is_workspace_member(workspace_id));
CREATE POLICY "account_dossiers_insert" ON account_dossiers FOR INSERT WITH CHECK (is_workspace_member(workspace_id));
CREATE POLICY "account_dossiers_update" ON account_dossiers FOR UPDATE USING (is_workspace_member(workspace_id)) WITH CHECK (is_workspace_member(workspace_id));

-- Sniper drafts policies
DROP POLICY IF EXISTS "sniper_drafts_select" ON sniper_drafts;
DROP POLICY IF EXISTS "sniper_drafts_insert" ON sniper_drafts;
DROP POLICY IF EXISTS "sniper_drafts_update" ON sniper_drafts;
CREATE POLICY "sniper_drafts_select" ON sniper_drafts FOR SELECT USING (is_workspace_member(workspace_id));
CREATE POLICY "sniper_drafts_insert" ON sniper_drafts FOR INSERT WITH CHECK (is_workspace_member(workspace_id));
CREATE POLICY "sniper_drafts_update" ON sniper_drafts FOR UPDATE USING (is_workspace_member(workspace_id)) WITH CHECK (is_workspace_member(workspace_id));

-- ============================================
-- PART 6: Hybrid Privileges
-- ============================================

REVOKE INSERT, UPDATE, DELETE ON workspaces FROM authenticated;
GRANT SELECT ON workspaces TO authenticated;

REVOKE INSERT, UPDATE, DELETE ON workspace_members FROM authenticated;
GRANT SELECT ON workspace_members TO authenticated;

REVOKE INSERT, UPDATE, DELETE ON accounts FROM authenticated;
GRANT SELECT ON accounts TO authenticated;

REVOKE INSERT, DELETE ON agent_runs FROM authenticated;
GRANT SELECT ON agent_runs TO authenticated;
GRANT UPDATE (status, updated_at, logs, outputs, error_code, error_message, error_context, duration_ms) ON agent_runs TO authenticated;

GRANT SELECT, INSERT ON evidence_items TO authenticated;
REVOKE UPDATE, DELETE ON evidence_items FROM authenticated;

GRANT SELECT, INSERT ON signals TO authenticated;
REVOKE UPDATE, DELETE ON signals FROM authenticated;

GRANT SELECT, INSERT, UPDATE ON account_dossiers TO authenticated;
REVOKE DELETE ON account_dossiers FROM authenticated;

GRANT SELECT, INSERT, UPDATE ON sniper_drafts TO authenticated;
REVOKE DELETE ON sniper_drafts FROM authenticated;

-- ============================================
-- PART 7: RPC Functions
-- ============================================

CREATE OR REPLACE FUNCTION create_workspace(workspace_name TEXT, workspace_slug TEXT)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    new_workspace_id UUID;
    calling_user_id UUID;
BEGIN
    calling_user_id := auth.uid();
    
    IF calling_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;
    
    IF workspace_name IS NULL OR TRIM(workspace_name) = '' THEN
        RAISE EXCEPTION 'Workspace name is required';
    END IF;
    
    IF workspace_slug IS NULL OR workspace_slug = '' THEN
        RAISE EXCEPTION 'Workspace slug is required';
    END IF;
    
    IF workspace_slug !~ '^[a-z0-9-]+$' THEN
        RAISE EXCEPTION 'Workspace slug must contain only lowercase letters, numbers, and hyphens';
    END IF;
    
    IF LENGTH(workspace_slug) < 3 OR LENGTH(workspace_slug) > 63 THEN
        RAISE EXCEPTION 'Workspace slug must be 3-63 characters';
    END IF;
    
    BEGIN
        INSERT INTO public.workspaces (name, slug)
        VALUES (workspace_name, workspace_slug)
        RETURNING workspace_id INTO new_workspace_id;
    EXCEPTION
        WHEN unique_violation THEN
            RAISE EXCEPTION 'Workspace slug "%" is already taken. Please choose a different slug.', workspace_slug;
    END;
    
    INSERT INTO public.workspace_members (workspace_id, user_id, role)
    VALUES (new_workspace_id, calling_user_id, 'owner');
    
    RETURN new_workspace_id;
END;
$$;

GRANT EXECUTE ON FUNCTION create_workspace TO authenticated;

CREATE OR REPLACE FUNCTION create_or_get_account(
    p_workspace_id UUID,
    p_domain TEXT,
    p_record_id TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_account_id UUID;
    v_normalized_domain TEXT;
    calling_user_id UUID;
BEGIN
    calling_user_id := auth.uid();
    
    IF calling_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM public.workspace_members
        WHERE workspace_id = p_workspace_id
        AND user_id = calling_user_id
    ) THEN
        RAISE EXCEPTION 'Access denied: not a member of workspace %', p_workspace_id;
    END IF;
    
    v_normalized_domain := normalize_domain(p_domain);
    
    SELECT account_id INTO v_account_id
    FROM public.accounts
    WHERE workspace_id = p_workspace_id
    AND normalized_domain = v_normalized_domain
    AND is_deleted = FALSE;
    
    IF v_account_id IS NOT NULL THEN
        IF p_record_id IS NOT NULL THEN
            UPDATE public.accounts
            SET record_id = p_record_id,
                updated_at = NOW(),
                updated_by = calling_user_id
            WHERE account_id = v_account_id;
        END IF;
        RETURN v_account_id;
    END IF;
    
    BEGIN
        INSERT INTO public.accounts (workspace_id, domain, record_id, created_by)
        VALUES (p_workspace_id, p_domain, p_record_id, calling_user_id)
        RETURNING account_id INTO v_account_id;
        
        RETURN v_account_id;
    EXCEPTION
        WHEN unique_violation THEN
            SELECT account_id INTO v_account_id
            FROM public.accounts
            WHERE workspace_id = p_workspace_id
            AND normalized_domain = v_normalized_domain
            AND is_deleted = FALSE;
            
            RETURN v_account_id;
    END;
END;
$$;

GRANT EXECUTE ON FUNCTION create_or_get_account TO authenticated;

CREATE OR REPLACE FUNCTION create_agent_run(
    p_workspace_id UUID,
    p_idempotency_key TEXT,
    p_agent_type TEXT,
    p_account_id UUID,
    p_inputs JSONB
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
    v_run_id UUID;
    calling_user_id UUID;
BEGIN
    calling_user_id := auth.uid();
    
    IF calling_user_id IS NULL THEN
        RAISE EXCEPTION 'Not authenticated';
    END IF;
    
    IF p_idempotency_key IS NULL OR p_idempotency_key = '' THEN
        RAISE EXCEPTION 'idempotency_key is required and cannot be empty';
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM public.workspace_members
        WHERE workspace_id = p_workspace_id
        AND user_id = calling_user_id
    ) THEN
        RAISE EXCEPTION 'Access denied: not a member of workspace %', p_workspace_id;
    END IF;
    
    IF p_account_id IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1 FROM public.accounts
            WHERE account_id = p_account_id
            AND workspace_id = p_workspace_id
        ) THEN
            RAISE EXCEPTION 'Access denied: account % does not belong to workspace %', p_account_id, p_workspace_id;
        END IF;
    END IF;
    
    INSERT INTO public.agent_runs (
        workspace_id,
        idempotency_key,
        agent_type,
        account_id,
        status,
        inputs,
        created_by
    )
    VALUES (
        p_workspace_id,
        p_idempotency_key,
        p_agent_type,
        p_account_id,
        'PENDING',
        p_inputs,
        calling_user_id
    )
    ON CONFLICT (workspace_id, idempotency_key)
    DO NOTHING
    RETURNING run_id INTO v_run_id;
    
    IF v_run_id IS NULL THEN
        SELECT run_id INTO v_run_id
        FROM public.agent_runs
        WHERE workspace_id = p_workspace_id
        AND idempotency_key = p_idempotency_key;
    END IF;
    
    RETURN v_run_id;
END;
$$;

GRANT EXECUTE ON FUNCTION create_agent_run TO authenticated;

-- ============================================
-- PART 8: Constraints & Triggers
-- ============================================

CREATE OR REPLACE FUNCTION prevent_workspace_id_change()
RETURNS TRIGGER AS $$
BEGIN
    IF OLD.workspace_id IS DISTINCT FROM NEW.workspace_id THEN
        RAISE EXCEPTION 'workspace_id cannot be changed';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS accounts_prevent_workspace_change ON accounts;
DROP TRIGGER IF EXISTS agent_runs_prevent_workspace_change ON agent_runs;
DROP TRIGGER IF EXISTS evidence_prevent_workspace_change ON evidence_items;
DROP TRIGGER IF EXISTS dossiers_prevent_workspace_change ON account_dossiers;
DROP TRIGGER IF EXISTS drafts_prevent_workspace_change ON sniper_drafts;
DROP TRIGGER IF EXISTS signals_prevent_workspace_change ON signals;

CREATE TRIGGER accounts_prevent_workspace_change BEFORE UPDATE ON accounts FOR EACH ROW EXECUTE FUNCTION prevent_workspace_id_change();
CREATE TRIGGER agent_runs_prevent_workspace_change BEFORE UPDATE ON agent_runs FOR EACH ROW EXECUTE FUNCTION prevent_workspace_id_change();
CREATE TRIGGER evidence_prevent_workspace_change BEFORE UPDATE ON evidence_items FOR EACH ROW EXECUTE FUNCTION prevent_workspace_id_change();
CREATE TRIGGER dossiers_prevent_workspace_change BEFORE UPDATE ON account_dossiers FOR EACH ROW EXECUTE FUNCTION prevent_workspace_id_change();
CREATE TRIGGER drafts_prevent_workspace_change BEFORE UPDATE ON sniper_drafts FOR EACH ROW EXECUTE FUNCTION prevent_workspace_id_change();
CREATE TRIGGER signals_prevent_workspace_change BEFORE UPDATE ON signals FOR EACH ROW EXECUTE FUNCTION prevent_workspace_id_change();

CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_account_per_workspace ON accounts(workspace_id, normalized_domain) WHERE is_deleted = FALSE;
CREATE UNIQUE INDEX IF NOT EXISTS idx_idempotency_key ON agent_runs(workspace_id, idempotency_key) WHERE idempotency_key IS NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_dossier_per_account_config ON account_dossiers(workspace_id, account_id, config_id) WHERE account_id IS NOT NULL AND config_id IS NOT NULL;

-- ============================================
-- PART 9: Workspace Consistency Validation
-- ============================================

-- Function to validate that account_id belongs to the same workspace_id
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

-- Add triggers to enforce workspace consistency
DROP TRIGGER IF EXISTS validate_agent_runs_workspace ON agent_runs;
CREATE TRIGGER validate_agent_runs_workspace
    BEFORE INSERT OR UPDATE ON agent_runs
    FOR EACH ROW
    EXECUTE FUNCTION validate_account_workspace();

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
SELECT 'Migration completed successfully! ✅' as status,
       (SELECT COUNT(*) FROM workspaces) as workspaces_created,
       (SELECT COUNT(*) FROM information_schema.routines WHERE routine_name IN ('create_workspace', 'create_or_get_account', 'create_agent_run')) as rpc_functions_created;
