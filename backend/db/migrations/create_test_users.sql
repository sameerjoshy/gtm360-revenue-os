-- ============================================
-- CREATE TEST USERS
-- Run this in Supabase SQL Editor
-- ============================================

-- Note: This creates users directly in auth.users
-- In production, users would sign up via the frontend

-- Test User 1: Workspace Owner
-- Email: owner@test.com
-- Password: TestPass123!

-- Test User 2: Workspace Member  
-- Email: member@test.com
-- Password: TestPass123!

-- Test User 3: Other Workspace (for isolation tests)
-- Email: other@test.com
-- Password: TestPass123!

-- ============================================
-- MANUAL STEPS (Supabase Dashboard)
-- ============================================

-- 1. Go to Authentication → Users
-- 2. Click "Add user" → "Create new user"
-- 3. Create these 3 users:

/*
User 1:
- Email: owner@test.com
- Password: TestPass123!
- Auto Confirm User: YES

User 2:
- Email: member@test.com
- Password: TestPass123!
- Auto Confirm User: YES

User 3:
- Email: other@test.com
- Password: TestPass123!
- Auto Confirm User: YES
*/

-- ============================================
-- ADD USERS TO DEFAULT WORKSPACE
-- Run this AFTER creating users above
-- ============================================

-- Add owner@test.com as owner of default workspace
INSERT INTO workspace_members (workspace_id, user_id, role)
SELECT 
    '00000000-0000-0000-0000-000000000001'::uuid,
    id,
    'owner'
FROM auth.users
WHERE email = 'owner@test.com'
ON CONFLICT DO NOTHING;

-- Add member@test.com as member of default workspace
INSERT INTO workspace_members (workspace_id, user_id, role)
SELECT 
    '00000000-0000-0000-0000-000000000001'::uuid,
    id,
    'member'
FROM auth.users
WHERE email = 'member@test.com'
ON CONFLICT DO NOTHING;

-- Do NOT add other@test.com to default workspace
-- (used for isolation testing)

-- ============================================
-- VERIFY TEST USERS
-- ============================================

-- Check users were created
SELECT 
    'Test Users Created' as check_name,
    COUNT(*) as user_count,
    ARRAY_AGG(email ORDER BY email) as emails
FROM auth.users
WHERE email IN ('owner@test.com', 'member@test.com', 'other@test.com');

-- Check workspace memberships
SELECT 
    'Workspace Members' as check_name,
    wm.role,
    u.email
FROM workspace_members wm
JOIN auth.users u ON wm.user_id = u.id
WHERE wm.workspace_id = '00000000-0000-0000-0000-000000000001'::uuid
ORDER BY wm.role DESC, u.email;

-- Expected results:
-- - 3 users created
-- - 2 workspace members (owner@test.com as owner, member@test.com as member)
-- - other@test.com NOT in workspace (for isolation tests)
