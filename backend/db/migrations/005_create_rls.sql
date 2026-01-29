-- Migration 005: Create RLS Policies
-- Enables Row Level Security and creates policies for workspace isolation

-- Helper functions (SECURITY INVOKER - default, safer)
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

-- Enable RLS on all tenant-scoped tables
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE workspace_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE account_dossiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE sniper_drafts ENABLE ROW LEVEL SECURITY;

-- Workspaces policies
CREATE POLICY "workspaces_select" ON workspaces FOR SELECT 
    USING (EXISTS (SELECT 1 FROM workspace_members WHERE workspace_id = workspaces.workspace_id AND user_id = auth.uid()));

-- Workspace members policies
CREATE POLICY "workspace_members_select" ON workspace_members FOR SELECT 
    USING (user_id = auth.uid() OR is_workspace_admin(workspace_id));

-- Accounts policies
CREATE POLICY "accounts_select" ON accounts FOR SELECT 
    USING (is_workspace_member(workspace_id));
CREATE POLICY "accounts_insert" ON accounts FOR INSERT 
    WITH CHECK (is_workspace_member(workspace_id));
CREATE POLICY "accounts_update" ON accounts FOR UPDATE 
    USING (is_workspace_member(workspace_id)) 
    WITH CHECK (is_workspace_member(workspace_id));
CREATE POLICY "accounts_delete" ON accounts FOR DELETE 
    USING (is_workspace_admin(workspace_id));

-- Agent runs policies
CREATE POLICY "agent_runs_select" ON agent_runs FOR SELECT 
    USING (is_workspace_member(workspace_id));
CREATE POLICY "agent_runs_insert" ON agent_runs FOR INSERT 
    WITH CHECK (is_workspace_member(workspace_id));
CREATE POLICY "agent_runs_update" ON agent_runs FOR UPDATE 
    USING (is_workspace_member(workspace_id)) 
    WITH CHECK (is_workspace_member(workspace_id));
CREATE POLICY "agent_runs_delete" ON agent_runs FOR DELETE 
    USING (is_workspace_admin(workspace_id));

-- Evidence items policies
CREATE POLICY "evidence_items_select" ON evidence_items FOR SELECT 
    USING (is_workspace_member(workspace_id));
CREATE POLICY "evidence_items_insert" ON evidence_items FOR INSERT 
    WITH CHECK (is_workspace_member(workspace_id));

-- Account dossiers policies
CREATE POLICY "account_dossiers_select" ON account_dossiers FOR SELECT 
    USING (is_workspace_member(workspace_id));
CREATE POLICY "account_dossiers_insert" ON account_dossiers FOR INSERT 
    WITH CHECK (is_workspace_member(workspace_id));
CREATE POLICY "account_dossiers_update" ON account_dossiers FOR UPDATE 
    USING (is_workspace_member(workspace_id)) 
    WITH CHECK (is_workspace_member(workspace_id));

-- Sniper drafts policies
CREATE POLICY "sniper_drafts_select" ON sniper_drafts FOR SELECT 
    USING (is_workspace_member(workspace_id));
CREATE POLICY "sniper_drafts_insert" ON sniper_drafts FOR INSERT 
    WITH CHECK (is_workspace_member(workspace_id));
CREATE POLICY "sniper_drafts_update" ON sniper_drafts FOR UPDATE 
    USING (is_workspace_member(workspace_id)) 
    WITH CHECK (is_workspace_member(workspace_id));
