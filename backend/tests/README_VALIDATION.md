# Phase 1 Validation - Quick Start Guide

## Prerequisites

1. **Supabase migration completed** ✅
2. **Test users created** (see below)
3. **Environment variables configured**

## Step 1: Create Test Users

### Option A: Via Supabase Dashboard (Recommended)

1. Go to **Authentication** → **Users**
2. Click **"Add user"** → **"Create new user"**
3. Create these 3 users:

**User 1 (Owner)**:
- Email: `owner@test.com`
- Password: `TestPass123!`
- Auto Confirm User: ✅ YES

**User 2 (Member)**:
- Email: `member@test.com`
- Password: `TestPass123!`
- Auto Confirm User: ✅ YES

**User 3 (Other - for isolation tests)**:
- Email: `other@test.com`
- Password: `TestPass123!`
- Auto Confirm User: ✅ YES

### Option B: Via SQL (if dashboard doesn't work)

Run `backend/db/migrations/create_test_users.sql` in Supabase SQL Editor

## Step 2: Add Users to Workspace

Run this in Supabase SQL Editor:

```sql
-- Add owner@test.com as owner
INSERT INTO workspace_members (workspace_id, user_id, role)
SELECT 
    '00000000-0000-0000-0000-000000000001'::uuid,
    id,
    'owner'
FROM auth.users
WHERE email = 'owner@test.com'
ON CONFLICT DO NOTHING;

-- Add member@test.com as member
INSERT INTO workspace_members (workspace_id, user_id, role)
SELECT 
    '00000000-0000-0000-0000-000000000001'::uuid,
    id,
    'member'
FROM auth.users
WHERE email = 'member@test.com'
ON CONFLICT DO NOTHING;

-- Verify
SELECT wm.role, u.email 
FROM workspace_members wm
JOIN auth.users u ON wm.user_id = u.id
WHERE wm.workspace_id = '00000000-0000-0000-0000-000000000001'::uuid;
```

**Expected**: 2 rows (owner@test.com as owner, member@test.com as member)

## Step 3: Configure Environment

Create `backend/.env`:

```bash
# Supabase
SUPABASE_URL=https://pxvxggspaaexnfpmsawl.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_ANON_KEY=your_anon_key_here

# Test Users
TEST_OWNER_EMAIL=owner@test.com
TEST_OWNER_PASSWORD=TestPass123!
TEST_MEMBER_EMAIL=member@test.com
TEST_MEMBER_PASSWORD=TestPass123!
TEST_OTHER_EMAIL=other@test.com
TEST_OTHER_PASSWORD=TestPass123!
```

**Get your keys from**: Supabase Dashboard → Settings → API

## Step 4: Run Validation Tests

```bash
cd backend
pip install supabase python-dotenv
python tests/test_phase1_validation.py
```

**Expected output**:
```
✓ PASS | A1: Migration sequence completed
✓ PASS | A2: GRANT/REVOKE statements verified
✓ PASS | A3: RLS policies active
✓ PASS | A4: Immutability triggers fire
...
✓ ALL TESTS PASSED: 22/22

🎉 Phase 1 validation complete! Ready for agent code updates.
```

## What the Tests Validate

### A. Database & Security (5 tests)
- Migration completion
- GRANT/REVOKE enforcement
- RLS policy activation
- Immutability triggers
- Invariant mutation prevention

### B. Ownership & Isolation (4 tests)
- Cross-workspace read blocking
- Cross-workspace write blocking
- Mismatched account/workspace prevention
- Mismatched run/workspace prevention

### C. Idempotency & Run Safety (3 tests)
- Same idempotency_key → same run_id
- Changed inputs with same key → rejected
- No duplicate run creation

### D. Agent Runtime (5 tests)
- Agents create runs via RPC
- Agents write artifacts directly
- Agents update run status
- No JWT required for agents
- Service role cannot violate invariants

### E. UI Runtime (5 tests)
- UI works via anon key + JWT
- RLS enforces workspace visibility
- Draft editing only in NEEDS_REVIEW
- Dossier editing always allowed
- Status transitions work

## Troubleshooting

### "Not authenticated" errors
- Check SUPABASE_SERVICE_ROLE_KEY is set correctly
- Verify test users exist in Supabase Dashboard

### "workspace_id cannot be changed" is good!
- This means immutability triggers are working correctly

### RLS blocking queries
- This is expected for unauthenticated requests
- Service role key should bypass RLS

### Foreign key violations
- This is expected when testing mismatched workspace/account IDs
- Validates data integrity constraints

## Next Steps

Once all tests pass:
1. ✅ Update agent code to use RPCs
2. ✅ Update frontend to use anon key + JWT
3. ✅ Configure backend with service role key
4. ✅ Test end-to-end agent flows

**Phase 1 Definition of DONE**: All 22 tests passing ✅
