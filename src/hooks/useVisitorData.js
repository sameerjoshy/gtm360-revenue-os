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

            // Strategy 2: FreeIPAPI (Fallback for free tier)
            try {
                // simple fetch to get IP metadata
                const response = await fetch('https://freeipapi.com/api/json');
                const data = await response.json();

                if (isMounted && data) {
                    // Normalize data. asnOrganization is often the ISP (e.g. "Comcast") 
                    // or the Company if they have a dedicated block (e.g. "Google LLC").
                    const companyName = data.asnOrganization || data.cityName;

                    if (companyName) {
                        setVisitor({
                            company: companyName,
                            industry: data.countryName || "Visitor",
                            isFallback: true
                        });
                    }
                }
            } catch (err) {
                console.warn("GTM-360 [Personalization]: Fallback failed", err);
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
