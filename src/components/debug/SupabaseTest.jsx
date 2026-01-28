
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

const SupabaseTest = () => {
    const [status, setStatus] = useState('Checking connection...');
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkConnection = async () => {
            try {
                // Simple query to test connection
                // Just checking if we can talk to the server. 
                // Note: This might fail if no tables exist or RLS blocks it, 
                // but looking for a network response rather than a timeout or auth error.

                // We often don't have a table yet, so we can check the session or a health check if available.
                // Or simply check if the client config is there.
                if (!supabase.supabaseUrl || !supabase.supabaseKey) {
                    throw new Error("Supabase client not initialized correctly.");
                }

                // Try to fetch current session (doesn't require database tables)
                const { data, error } = await supabase.auth.getSession();

                if (error) throw error;

                setStatus(`Connected to ${supabase.supabaseUrl}`);
            } catch (err) {
                console.error("Supabase connection error:", err);
                setStatus('Connection failed');
                setError(err.message);
            }
        };

        checkConnection();
    }, []);

    return (
        <div className="p-4 bg-gray-900 text-white rounded-lg border border-gray-700 m-4">
            <h3 className="text-xl font-bold mb-2">Supabase Connection Status</h3>
            <div className={`p-2 rounded ${error ? 'bg-red-900/50 text-red-200' : 'bg-green-900/50 text-green-200'}`}>
                {status}
            </div>
            {error && (
                <div className="mt-2 text-sm text-red-400 font-mono break-all">
                    Error: {error}
                </div>
            )}
            <div className="mt-4 text-xs text-gray-500">
                URL: {import.meta.env.VITE_SUPABASE_URL}
            </div>
        </div>
    );
};

export default SupabaseTest;
