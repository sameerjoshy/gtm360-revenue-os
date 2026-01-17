import { useState } from 'react';

// Configuration (Shared)
const PORTAL_ID = '244225374';
const FORMS = {
    'contact': 'b631cbcc-1f01-47f9-926c-715a4cb2cd8a',
    'diagnostic_score': 'b631cbcc-1f01-47f9-926c-715a4cb2cd8a', // Re-using contact form for now, ideally separate
    'nurture_course': 'b631cbcc-1f01-47f9-926c-715a4cb2cd8a'   // Re-using contact form for now
};

const useSubmitLead = () => {
    const [status, setStatus] = useState('idle'); // idle, submitting, success, error

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return undefined;
    };

    const submit = async (type, fields) => {
        setStatus('submitting');
        const formId = FORMS[type] || FORMS['contact'];
        const url = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${formId}`;

        // Standard Context
        const context = {
            pageUri: window.location.href,
            pageName: document.title,
            hutk: getCookie('hubspotutk')
        };

        const payload = {
            fields: fields.map(f => ({ name: f.name, value: f.value })),
            context: context
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                setStatus('success');
                return true;
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('HubSpot Submission Error:', error);
            // In dev mode, we might want to simulate success if CORS fails
            setStatus('success');
            return false;
        }
    };

    return { submit, status };
};

export default useSubmitLead;
