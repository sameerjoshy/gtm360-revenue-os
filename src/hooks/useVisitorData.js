import { useState, useEffect } from 'react';

/**
 * Hook to access visitor data from RB2B (or other providers).
 * Listens for the 'reb2b' object on the window.
 * Fallback to FreeIPAPI for basic geo-personalization with caching.
 */
const useVisitorData = () => {
    const [visitor, setVisitor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchStrategy = async () => {
            // Check cache first
            const cached = localStorage.getItem('gtm360_visitor');
            if (cached) {
                try {
                    const parsed = JSON.parse(cached);
                    const expiry = 1000 * 60 * 60 * 24; // 24 hours
                    if (Date.now() - parsed.timestamp < expiry) {
                        if (isMounted) {
                            setVisitor(parsed.data);
                            setLoading(false);
                        }
                        // Even if cached, check for RB2B if it loaded late
                        if (!window.reb2b) return;
                    }
                } catch (e) {
                    localStorage.removeItem('gtm360_visitor');
                }
            }

            // Strategy 1: RB2B (Preferred)
            if (window.reb2b && window.reb2b.visitor) {
                if (isMounted) {
                    setVisitor(window.reb2b.visitor);
                    setLoading(false);
                    return;
                }
            }

            // Strategy 2: FreeIPAPI
            try {
                const response = await fetch('https://freeipapi.com/api/json');
                if (!response.ok) throw new Error('CORS or Network Error');
                const data = await response.json();

                if (isMounted && data) {
                    const visitObj = {
                        company: data.asnOrganization || data.cityName,
                        industry: data.countryName || "Visitor",
                        isFallback: true
                    };
                    setVisitor(visitObj);
                    localStorage.setItem('gtm360_visitor', JSON.stringify({
                        data: visitObj,
                        timestamp: Date.now()
                    }));
                }
            } catch (err) {
                // Silent fallback
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        // Faster initial check (500ms instead of 2000ms)
        const timeout = setTimeout(fetchStrategy, 500);

        return () => {
            isMounted = false;
            clearTimeout(timeout);
        };
    }, []);

    return { visitor, loading };
};

export default useVisitorData;
