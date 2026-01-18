import { useState, useEffect } from 'react';

/**
 * Hook to access visitor data from RB2B (or other providers).
 * Listens for the 'reb2b' object on the window.
 * Fallback to FreeIPAPI for basic geo-personalization.
 */
const useVisitorData = () => {
    const [visitor, setVisitor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchStrategy = async () => {
            // Strategy 1: RB2B (High Quality, but likely blocked on free tier)
            if (window.reb2b && window.reb2b.visitor) {
                if (isMounted) {
                    setVisitor(window.reb2b.visitor);
                    setLoading(false);
                    return;
                }
            }

            // Strategy 2: FreeIPAPI (Primary Fallback)
            try {
                const response = await fetch('https://freeipapi.com/api/json');
                if (!response.ok) throw new Error('FreeIPAPI failed');
                const data = await response.json();

                if (isMounted && data) {
                    const companyName = data.asnOrganization || data.cityName;
                    if (companyName) {
                        setVisitor({
                            company: companyName,
                            industry: data.countryName || "Visitor",
                            isFallback: true
                        });
                        setLoading(false);
                        return;
                    }
                }
            } catch (err) {
                console.warn("GTM-360 [Personalization]: Primary fallback failed", err);
            }

            // Strategy 3: ipapi.co (Secondary Fallback)
            try {
                const response = await fetch('https://ipapi.co/json/');
                if (!response.ok) throw new Error('ipapi.co failed');
                const data = await response.json();

                if (isMounted && data) {
                    setVisitor({
                        company: data.org || data.city,
                        industry: data.country_name || "Visitor",
                        isFallback: true
                    });
                }
            } catch (err) {
                console.warn("GTM-360 [Personalization]: Secondary fallback failed", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        // Delay slightly to give RB2B a chance to load (2 seconds)
        const timeout = setTimeout(fetchStrategy, 2000);

        return () => {
            isMounted = false;
            clearTimeout(timeout);
        };
    }, []);

    return { visitor, loading };
};

export default useVisitorData;
