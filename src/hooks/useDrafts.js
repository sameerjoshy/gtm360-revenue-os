import { useState, useEffect } from 'react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'https://gtm360-revenue-os.onrender.com';

/**
 * Hook to fetch Sniper drafts from backend API
 * @returns {object} - { drafts, loading, error, refetch }
 */
export function useDrafts() {
    const [drafts, setDrafts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDrafts = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${BACKEND_URL}/sniper/drafts`);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setDrafts(data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching drafts:', err);
            setError(err.message);
            // Fallback to empty array on error
            setDrafts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDrafts();
    }, []);

    const approveDraft = async (draftId) => {
        try {
            const response = await fetch(`${BACKEND_URL}/sniper/drafts/${draftId}/approve`, {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Refetch drafts after approval
            await fetchDrafts();
            return { success: true };
        } catch (err) {
            console.error('Error approving draft:', err);
            return { success: false, error: err.message };
        }
    };

    const rejectDraft = async (draftId) => {
        try {
            const response = await fetch(`${BACKEND_URL}/sniper/drafts/${draftId}/reject`, {
                method: 'POST'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            // Refetch drafts after rejection
            await fetchDrafts();
            return { success: true };
        } catch (err) {
            console.error('Error rejecting draft:', err);
            return { success: false, error: err.message };
        }
    };

    return {
        drafts,
        loading,
        error,
        refetch: fetchDrafts,
        approveDraft,
        rejectDraft
    };
}
