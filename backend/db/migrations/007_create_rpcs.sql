-- Migration 007: Create RPC Functions
-- Secure RPCs with workspace ownership checks (SECURITY DEFINER)

-- ============================================
-- RPC 1: Create Workspace
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
    
    -- Validate inputs
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
    
    -- Create workspace
    BEGIN
        INSERT INTO public.workspaces (name, slug)
        VALUES (workspace_name, workspace_slug)
        RETURNING workspace_id INTO new_workspace_id;
    EXCEPTION
        WHEN unique_violation THEN
            RAISE EXCEPTION 'Workspace slug "%" is already taken. Please choose a different slug.', workspace_slug;
    END;
    
    -- Add creator as owner
    INSERT INTO public.workspace_members (workspace_id, user_id, role)
    VALUES (new_workspace_id, calling_user_id, 'owner');
    
    RETURN new_workspace_id;
END;
$$;

GRANT EXECUTE ON FUNCTION create_workspace TO authenticated;

-- ============================================
-- RPC 2: Create or Get Account
-- ============================================

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
    
    -- Assert workspace membership
    IF NOT EXISTS (
        SELECT 1 FROM public.workspace_members
        WHERE workspace_id = p_workspace_id
        AND user_id = calling_user_id
    ) THEN
        RAISE EXCEPTION 'Access denied: not a member of workspace %', p_workspace_id;
    END IF;
    
    -- Normalize domain
    v_normalized_domain := normalize_domain(p_domain);
    
    -- Try SELECT first
    SELECT account_id INTO v_account_id
    FROM public.accounts
    WHERE workspace_id = p_workspace_id
    AND normalized_domain = v_normalized_domain
    AND is_deleted = FALSE;
    
    -- If found, update record_id if provided
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
    
    -- Not found, INSERT with retry on conflict
    BEGIN
        INSERT INTO public.accounts (workspace_id, domain, record_id, created_by)
        VALUES (p_workspace_id, p_domain, p_record_id, calling_user_id)
        RETURNING account_id INTO v_account_id;
        
        RETURN v_account_id;
    EXCEPTION
        WHEN unique_violation THEN
            -- Race condition: retry SELECT
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

-- ============================================
-- RPC 3: Create Agent Run
-- ============================================

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
    
    -- ENFORCE: idempotency key required
    IF p_idempotency_key IS NULL OR p_idempotency_key = '' THEN
        RAISE EXCEPTION 'idempotency_key is required and cannot be empty';
    END IF;
    
    -- Assert workspace membership
    IF NOT EXISTS (
        SELECT 1 FROM public.workspace_members
        WHERE workspace_id = p_workspace_id
        AND user_id = calling_user_id
    ) THEN
        RAISE EXCEPTION 'Access denied: not a member of workspace %', p_workspace_id;
    END IF;
    
    -- P0 FIX: Verify account belongs to workspace
    IF p_account_id IS NOT NULL THEN
        IF NOT EXISTS (
            SELECT 1 FROM public.accounts
            WHERE account_id = p_account_id
            AND workspace_id = p_workspace_id
        ) THEN
            RAISE EXCEPTION 'Access denied: account % does not belong to workspace %', p_account_id, p_workspace_id;
        END IF;
    END IF;
    
    -- Upsert agent run (idempotent)
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
    
    -- If conflict, return existing run_id
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
