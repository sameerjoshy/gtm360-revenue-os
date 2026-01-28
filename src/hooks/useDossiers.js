import { useState, useEffect } from 'react';
import { supabase, getWorkspaceId } from '../lib/supabase';

/**
 * Hook to fetch account dossiers from Supabase
 * @param {number} limit - Number of dossiers to fetch
 * @returns {object} - { dossiers, loading, error, refetch }
 */
export function useDossiers(limit = 20) {
    const [dossiers, setDossiers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDossiers = async () => {
        try {
            setLoading(true);
            const workspaceId = getWorkspaceId();

            const { data, error: fetchError } = await supabase
                .from('account_dossiers')
                .select('dossier_id, domain, dossier_json, created_at, account_id')
                .eq('workspace_id', workspaceId)
                .order('created_at', { ascending: false })
                .limit(limit);

            if (fetchError) throw fetchError;

            setDossiers(data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching dossiers:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDossiers();
    }, [limit]);

    return { dossiers, loading, error, refetch: fetchDossiers };
}
