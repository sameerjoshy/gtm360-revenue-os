-- Migration 004: Enforce NOT NULL Constraints
-- Makes workspace_id required on all tables after backfill

ALTER TABLE accounts ALTER COLUMN workspace_id SET NOT NULL;
ALTER TABLE agent_runs ALTER COLUMN workspace_id SET NOT NULL;
ALTER TABLE evidence_items ALTER COLUMN workspace_id SET NOT NULL;
ALTER TABLE account_dossiers ALTER COLUMN workspace_id SET NOT NULL;
ALTER TABLE sniper_drafts ALTER COLUMN workspace_id SET NOT NULL;
