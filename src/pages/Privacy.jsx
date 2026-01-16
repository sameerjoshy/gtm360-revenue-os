import React from 'react';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
    return (
        <div className="privacy-page">
            <Helmet>
                <title>Privacy Policy | GTM360</title>
                <meta name="description" content="Privacy Policy for GTM360." />
            </Helmet>
            <section className="section py-24">
                <div className="container max-w-4xl">
                    <h1 className="text-4xl font-semibold mb-8">Privacy Policy</h1>
                    <div className="prose prose-lg text-gray-700">
                        <p className="mb-4">Last Updated: January 2026</p>
                        <p className="mb-4">
                            At GTM360, we take your privacy seriously. This policy describes how we handle any information collected through our website.
                        </p>
                        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
                        <p className="mb-4">
                            We generally only collect information you voluntarily provide, such as when you fill out our contact form (Name, Email, Company).
                        </p>
                        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use It</h2>
                        <p className="mb-4">
                            We use this information solely to communicate with you regarding our services. We do not sell or share your data with third parties.
                        </p>
                        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Contact Us</h2>
                        <p>
                            If you have questions about this policy, please contact us at privacy@gtm-360.com.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Privacy;
