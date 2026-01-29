-- Migration 003: Backfill Workspace Data
-- Creates default workspace and backfills existing data

-- Create default workspace
INSERT INTO workspaces (workspace_id, name, slug)
VALUES ('00000000-0000-0000-0000-000000000001', 'Default Workspace', 'default')
ON CONFLICT (workspace_id) DO NOTHING;

-- Backfill workspace_id for existing data
UPDATE agent_runs SET workspace_id = '00000000-0000-0000-0000-000000000001' WHERE workspace_id IS NULL;
UPDATE evidence_items SET workspace_id = '00000000-0000-0000-0000-000000000001' WHERE workspace_id IS NULL;
UPDATE account_dossiers SET workspace_id = '00000000-0000-0000-0000-000000000001' WHERE workspace_id IS NULL;
UPDATE sniper_drafts SET workspace_id = '00000000-0000-0000-0000-000000000001' WHERE workspace_id IS NULL;

-- Migrate existing domain-based data to accounts table
-- This creates account records from existing dossiers
INSERT INTO accounts (workspace_id, domain, record_id, created_at)
SELECT DISTINCT
    '00000000-0000-0000-0000-000000000001' as workspace_id,
    domain,
    record_id,
    MIN(created_at) as created_at
FROM account_dossiers
WHERE domain IS NOT NULL
GROUP BY domain, record_id
ON CONFLICT DO NOTHING;

-- Update account_id references in existing tables
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

-- Backfill workspace_members (comprehensive - all users who created data)
WITH all_users AS (
    SELECT DISTINCT created_by AS user_id FROM agent_runs WHERE created_by IS NOT NULL
    UNION
    SELECT DISTINCT created_by FROM account_dossiers WHERE created_by IS NOT NULL
    UNION
    SELECT DISTINCT created_by FROM sniper_drafts WHERE created_by IS NOT NULL
),
first_user AS (
    SELECT created_by AS user_id 
    FROM agent_runs 
    WHERE created_by IS NOT NULL 
    ORDER BY created_at ASC 
    LIMIT 1
)
INSERT INTO workspace_members (workspace_id, user_id, role)
SELECT 
    '00000000-0000-0000-0000-000000000001',
    all_users.user_id,
    CASE 
        WHEN all_users.user_id = (SELECT user_id FROM first_user) THEN 'owner'
        ELSE 'member'
    END
FROM all_users
WHERE all_users.user_id IS NOT NULL
ON CONFLICT DO NOTHING;
