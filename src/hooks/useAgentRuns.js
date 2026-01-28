import { useState, useEffect } from 'react';
import { supabase, getWorkspaceId } from '../lib/supabase';

/**
 * Hook to fetch agent runs from Supabase with real-time updates
 * @param {number} limit - Number of runs to fetch
 * @returns {object} - { runs, loading, error, refetch }
 */
export function useAgentRuns(limit = 20) {
    const [runs, setRuns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRuns = async () => {
        try {
            setLoading(true);
            const workspaceId = getWorkspaceId();

            const { data, error: fetchError } = await supabase
                .from('agent_runs')
                .select('run_id, agent_type, status, inputs, created_at, account_id')
                .eq('workspace_id', workspaceId)
                .order('created_at', { ascending: false })
                .limit(limit);

            if (fetchError) throw fetchError;

            setRuns(data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching agent runs:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRuns();

        // Subscribe to real-time updates
        const workspaceId = getWorkspaceId();
        const subscription = supabase
            .channel('agent_runs_changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'agent_runs',
                    filter: `workspace_id=eq.${workspaceId}`
                },
                (payload) => {
                    console.log('Agent run change detected:', payload);
                    fetchRuns(); // Refetch on any change
                }
            )
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [limit]);

    return { runs, loading, error, refetch: fetchRuns };
}
