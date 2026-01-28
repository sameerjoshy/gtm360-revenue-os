import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing. Check .env.local file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Default workspace ID for single-tenant deployment
export const DEFAULT_WORKSPACE_ID = import.meta.env.VITE_DEFAULT_WORKSPACE_ID || '00000000-0000-0000-0000-000000000001';

// Helper function to get workspace context
export const getWorkspaceId = () => {
    // For MVP, return default workspace
    // Future: Get from user session/context
    return DEFAULT_WORKSPACE_ID;
};
