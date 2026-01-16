import React from 'react';
import { Helmet } from 'react-helmet-async';

const Terms = () => {
    return (
        <div className="terms-page">
            <Helmet>
                <title>Terms of Service | GTM360</title>
                <meta name="description" content="Terms of Service for GTM360." />
            </Helmet>
            <section className="section py-24">
                <div className="container max-w-4xl">
                    <h1 className="text-4xl font-semibold mb-8">Terms of Service</h1>
                    <div className="prose prose-lg text-gray-700">
                        <p className="mb-4">Last Updated: January 2026</p>
                        <p className="mb-4">
                            By accessing GTM360.com, you agree to these terms.
                        </p>
                        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Usage</h2>
                        <p className="mb-4">
                            Our website is for informational purposes. The insights provided are general in nature and do not constitute binding legal or financial advice.
                        </p>
                        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Intellectual Property</h2>
                        <p className="mb-4">
                            All content (text, schematics, branding) is owned by GTM360. You may not reproduce our frameworks without permission.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Terms;
