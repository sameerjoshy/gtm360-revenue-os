-- Migration 002: Add workspace_id and Create Accounts Table
-- Adds workspace_id to existing tables and creates accounts table with normalized_domain

-- Domain normalization function (IMMUTABLE for generated column)
CREATE OR REPLACE FUNCTION normalize_domain(domain TEXT)
RETURNS TEXT AS $$
BEGIN
    IF domain IS NULL THEN
        RETURN NULL;
    END IF;
    
    -- Remove protocol (http://, https://)
    domain := REGEXP_REPLACE(domain, '^https?://', '', 'i');
    
    -- Remove www.
    domain := REGEXP_REPLACE(domain, '^www\.', '', 'i');
    
    -- Remove trailing slash
    domain := RTRIM(domain, '/');
    
    -- Lowercase and trim
    RETURN LOWER(TRIM(domain));
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create accounts table (identity layer)
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

-- Add workspace_id to existing tables (NULLABLE first)
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES workspaces(workspace_id) ON DELETE RESTRICT;
ALTER TABLE evidence_items ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES workspaces(workspace_id) ON DELETE CASCADE;
ALTER TABLE account_dossiers ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES workspaces(workspace_id) ON DELETE CASCADE;
ALTER TABLE sniper_drafts ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES workspaces(workspace_id) ON DELETE CASCADE;

-- Add account_id foreign keys
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES accounts(account_id) ON DELETE SET NULL;
ALTER TABLE evidence_items ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES accounts(account_id) ON DELETE CASCADE;
ALTER TABLE account_dossiers ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES accounts(account_id) ON DELETE CASCADE;
ALTER TABLE sniper_drafts ADD COLUMN IF NOT EXISTS account_id UUID REFERENCES accounts(account_id) ON DELETE CASCADE;

-- Add created_by/updated_by to existing tables if not exists
ALTER TABLE agent_runs ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
ALTER TABLE account_dossiers ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);
ALTER TABLE account_dossiers ADD COLUMN IF NOT EXISTS updated_by UUID REFERENCES auth.users(id);
ALTER TABLE sniper_drafts ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_accounts_workspace ON accounts(workspace_id);
CREATE INDEX IF NOT EXISTS idx_accounts_record_id ON accounts(record_id) WHERE record_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_accounts_normalized_domain ON accounts(normalized_domain);
