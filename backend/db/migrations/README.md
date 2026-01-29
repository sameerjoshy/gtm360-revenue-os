# Database Migration Guide

## Overview

This directory contains SQL migration files for implementing multi-tenancy, workspace isolation, and the Hybrid privileges model for the GTM-360 Agent Swarm.

## Migration Sequence

Execute migrations in order:

1. **001_create_workspaces.sql** - Create workspaces and workspace_members tables
2. **002_add_workspace_id.sql** - Add workspace_id columns and create accounts table
3. **003_backfill_workspace.sql** - Backfill default workspace and migrate data
4. **004_enforce_not_null.sql** - Make workspace_id required
5. **005_create_rls.sql** - Enable RLS and create policies
6. **006_set_privileges.sql** - Set privileges for Hybrid model
7. **007_create_rpcs.sql** - Create RPC functions with ownership checks
8. **008_add_constraints.sql** - Add immutability triggers and unique constraints

## How to Run

### Option A: Supabase Dashboard (Recommended for Dev)

1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of each migration file
3. Execute in order (001 → 008)
4. Verify no errors

### Option B: Supabase CLI

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link to project
supabase link --project-ref <your-project-ref>

# Run migrations
supabase db push
```

### Option C: psql (Direct Connection)

```bash
# Connect to Supabase database
psql "postgresql://postgres:[password]@[host]:5432/postgres"

# Run each migration
\i backend/db/migrations/001_create_workspaces.sql
\i backend/db/migrations/002_add_workspace_id.sql
# ... etc
```

## Verification

After running all migrations, verify:

```sql
-- Check workspaces table exists
SELECT * FROM workspaces LIMIT 1;

-- Check RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public' AND tablename IN ('accounts', 'agent_runs');

-- Check RPC functions exist
SELECT routine_name FROM information_schema.routines 
WHERE routine_schema = 'public' AND routine_name IN ('create_workspace', 'create_or_get_account', 'create_agent_run');

-- Check triggers exist
SELECT trigger_name, event_object_table FROM information_schema.triggers 
WHERE trigger_schema = 'public';
```

## Rollback

To rollback migrations (use with caution):

```sql
-- Drop in reverse order
DROP TRIGGER IF EXISTS drafts_restrict_updates ON sniper_drafts;
-- ... (drop all triggers)
DROP FUNCTION IF EXISTS create_agent_run;
DROP FUNCTION IF EXISTS create_or_get_account;
DROP FUNCTION IF EXISTS create_workspace;
-- ... (drop all functions)
DROP TABLE IF EXISTS workspace_members;
DROP TABLE IF EXISTS workspaces;
```

## Notes

- **Idempotent**: Migrations use `IF NOT EXISTS` and `IF EXISTS` checks
- **Safe**: Backfill happens before NOT NULL enforcement
- **Tested**: All migrations tested on Supabase dev instance
- **Hybrid Model**: Creates via RPC, artifacts via direct writes (RLS enforced)
