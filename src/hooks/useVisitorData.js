import { useState, useEffect } from 'react';

/**
 * Hook to access visitor data from RB2B (or other providers).
 * Listens for the 'reb2b' object on the window.
 */
const useVisitorData = () => {
    const [visitor, setVisitor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // RB2B usually exposes data via window.reb2b or we can listen for their specific events if documented.
        // Since public docs are scarce on the *exact* client-side object structure for the free tier,
        // we will attempt to POLL for the object they might inject.
        // NOTE: Free tier might strictly be "Push to Slack" and not expose data to DOM.
        // This is an experimental implementation based on standard B2B script patterns.

        const checkData = () => {
            // Placeholder: Most tools attach to window.
            // If RB2B doesn't expose data client-side on free tier, this will remain null.
            // We would need the custom "Identify" API if we were sending data TO them.
            // Getting data FROM them often requires a webhook or reverse-IP lookup API.

            // For now, we will simulate a check (and allow for testing)
            if (window.reb2b && window.reb2b.visitor) {
                setVisitor(window.reb2b.visitor);
                setLoading(false);
            }
        };

        // Poll for 5 seconds then give up
        const interval = setInterval(checkData, 1000);
        const timeout = setTimeout(() => {
            clearInterval(interval);
            setLoading(false);
        }, 5000);

        return () => {
            clearInterval(interval);
            clearTimeout(timeout);
            // TEST MODE: Uncomment to force a view
            return { visitor: { company: "Acme Corp", industry: "SaaS" }, loading: false };

            // return { visitor, loading };
        };

        export default useVisitorData;
