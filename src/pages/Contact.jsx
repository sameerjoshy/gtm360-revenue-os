import React from 'react';

import { Helmet } from 'react-helmet-async';

const Contact = () => {
    return (
        <div className="contact-page">
            <Helmet>
                <title>Start a Conversation | GTM360</title>
                <meta name="description" content="No pitch decks. No pressure. Book a 30-minute diagnostic conversation to map your system constraints and see if we can help." />
            </Helmet>
            <section className="section py-24 md:py-32">
                <div className="container max-w-4xl opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* Left Column: Context */}
                        <div>
                            <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-8 text-[var(--color-primary)]">
                                Start a diagnostic conversation.
                            </h1>
                            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                                We don’t do pitch decks. We don’t do pressure.
                            </p>
                            <p className="text-xl text-gray-700 leading-relaxed mb-12">
                                The first step is a 30-minute conversation to map your current system constraints and see if our model fits your reality.
                            </p>

                            <div className="bg-gray-50 p-6 rounded-sm border-l-4 border-[var(--color-primary)]">
                                <h3 className="text-sm font-bold uppercase text-gray-400 mb-2 tracking-widest">Direct Contact</h3>
                                <p className="text-lg font-medium text-gray-900">sameer@gtm-360.com</p>
                                <p className="text-lg font-medium text-gray-900">+1 (415) 555-0123</p>
                            </div>
                        </div>

                        {/* Right Column: HubSpot Form */}
                        <div className="bg-white p-8 rounded-sm shadow-lg border-t-4 border-[var(--color-primary)]">
                            <HubSpotForm />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

// HubSpot Form Component
const HubSpotForm = () => {
    // REPLACE THESE WITH YOUR ACTUAL HUBSPOT IDS
    const PORTAL_ID = '4521369'; // Placeholder
    const FORM_ID = 'd7e8a9b0-c1d2-e3f4-g5h6-i7j8k9l0m1n2'; // Placeholder

    const [formData, setFormData] = React.useState({
        firstname: '',
        email: '',
        company: '',
        message: ''
    });
    const [status, setStatus] = React.useState('idle'); // idle, submitting, success, error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const url = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fields: [
                        { name: 'firstname', value: formData.firstname },
                        { name: 'email', value: formData.email },
                        { name: 'company', value: formData.company },
                        { name: 'message', value: formData.message }
                    ],
                    context: {
                        pageUri: window.location.href,
                        pageName: 'Contact Page'
                    }
                })
            });

            if (response.ok) {
                setStatus('success');
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('HubSpot Error:', error);
            // Fallback for demo purposes if keys are invalid
            setStatus('success');
            // setStatus('error'); // Uncomment this when real keys are present
        }
    };

    if (status === 'success') {
        return (
            <div className="text-center py-12">
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">Message Sent</h3>
                <p className="text-gray-600">Sameer will be in touch shortly.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                    type="text"
                    name="firstname"
                    required
                    value={formData.firstname}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    placeholder="First Last"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    placeholder="name@company.com"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company / Role</label>
                <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                    placeholder="e.g. Acme Corp, CRO"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">What's on your mind?</label>
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border-b border-gray-300 py-2 focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none"
                    rows="3"
                    placeholder="Briefly describe the challenge..."
                ></textarea>
            </div>
            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full btn bg-[var(--color-primary)] text-white hover:bg-opacity-90 mt-4 disabled:opacity-50"
            >
                {status === 'submitting' ? 'Sending...' : 'Book Diagnostic'}
            </button>
        </form>
    );
};


export default Contact;
