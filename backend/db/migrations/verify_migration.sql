-- ============================================
-- VERIFICATION QUERIES - Run After Migration
-- ============================================

-- Query 1: Check all tables exist
SELECT 
    'Tables Created' as check_name,
    COUNT(*) as count,
    ARRAY_AGG(table_name ORDER BY table_name) as tables
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
    'workspaces', 'workspace_members', 'accounts', 
    'agent_runs', 'evidence_items', 'account_dossiers', 
    'sniper_drafts', 'signals', 'suggested_updates'
);

-- Query 2: Check RLS is enabled
SELECT 
    'RLS Enabled' as check_name,
    COUNT(*) as tables_with_rls,
    ARRAY_AGG(tablename ORDER BY tablename) as tables
FROM pg_tables 
WHERE schemaname = 'public' 
AND rowsecurity = true;

-- Query 3: Check RPC functions exist
SELECT 
    'RPC Functions' as check_name,
    COUNT(*) as count,
    ARRAY_AGG(routine_name ORDER BY routine_name) as functions
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('create_workspace', 'create_or_get_account', 'create_agent_run');

-- Query 4: Check default workspace
SELECT 
    'Default Workspace' as check_name,
    workspace_id,
    name,
    slug,
    created_at
FROM workspaces
WHERE slug = 'default';

-- Query 5: Check RLS policies
SELECT 
    'RLS Policies' as check_name,
    COUNT(*) as policy_count,
    COUNT(DISTINCT tablename) as tables_with_policies
FROM pg_policies
WHERE schemaname = 'public';

-- Query 6: Check triggers
SELECT 
    'Triggers' as check_name,
    COUNT(*) as trigger_count,
    ARRAY_AGG(DISTINCT trigger_name ORDER BY trigger_name) as triggers
FROM information_schema.triggers
WHERE trigger_schema = 'public'
AND trigger_name LIKE '%prevent%';

-- Query 7: Check unique indexes
SELECT 
    'Unique Indexes' as check_name,
    COUNT(*) as index_count,
    ARRAY_AGG(indexname ORDER BY indexname) as indexes
FROM pg_indexes
WHERE schemaname = 'public'
AND indexname IN (
    'idx_unique_account_per_workspace',
    'idx_idempotency_key',
    'idx_unique_dossier_per_account_config'
);

-- Query 8: Summary
SELECT 
    'MIGRATION SUMMARY' as status,
    (SELECT COUNT(*) FROM workspaces) as workspaces,
    (SELECT COUNT(*) FROM workspace_members) as members,
    (SELECT COUNT(*) FROM accounts) as accounts,
    (SELECT COUNT(*) FROM agent_runs) as agent_runs,
    (SELECT COUNT(*) FROM information_schema.routines WHERE routine_name IN ('create_workspace', 'create_or_get_account', 'create_agent_run')) as rpc_functions,
    (SELECT COUNT(*) FROM pg_tables WHERE schemaname = 'public' AND rowsecurity = true) as rls_enabled_tables;
