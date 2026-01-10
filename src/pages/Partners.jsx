import React from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

const Partners = () => {
    return (
        <div className="partners-page">
            <Helmet>
                <title>Partners & Tech Stack | GTM360</title>
                <meta name="description" content="We are tool-agnostic. We don't take referral fees. We work with the best-in-class revenue technology providers to build systems that actually flow." />
            </Helmet>
            {/* BLOCK 1: INTRO */}
            <section className="section py-24 md:py-32">
                <div className="container max-w-4xl opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-8 text-[var(--color-primary)]">
                        Tools don’t create leverage. Systems do.
                    </h1>
                    <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                        The GTM technology landscape is noisy. We act as a filter, not a funnel.
                    </p>
                    <div className="bg-[var(--color-secondary)] p-8 rounded-sm mt-8 border-l-4 border-[var(--color-primary)]">
                        <p className="text-lg text-gray-800">
                            We are 100% independent. We take no referral fees and resell no software. Our only incentive is your system's performance.
                        </p>
                    </div>
                </div>
            </section>

            {/* BLOCK 2: ECOSYSTEM */}
            <section className="section">
                <div className="container">
                    <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-12">The ecosystem we work with</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { category: "CRM / System of Record", examples: "Salesforce, HubSpot" },
                            { category: "Revenue Intelligence", examples: "Gong, Clari, BoostUp" },
                            { category: "Sales Engagement", examples: "Outreach, Salesloft" },
                            { category: "Intent & Data", examples: "6sense, ZoomInfo, Clearbit" },
                            { category: "Marketing Automation", examples: "Marketo, HubSpot" },
                            { category: "Customer Success", examples: "Gainsight, Catalyst" },
                            { category: "Partner / Ecosystem", examples: "Crossbeam, Impartner" },
                            { category: "PLG / Product Data", examples: "Pendo, Amplitude" }
                        ].map((item, i) => (
                            <div key={i} className="border border-gray-200 p-6 rounded-sm hover:border-[var(--color-primary)] transition-colors">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.category}</h3>
                                <p className="text-sm text-gray-500">{item.examples}</p>
                            </div>
                        ))}
                    </div>
                    <p className="mt-12 text-gray-600 text-center max-w-2xl mx-auto">
                        We know these tools intimately — not just how to configure them, but how to architect them to enforce the operating model rather than distract from it.
                    </p>
                </div>
            </section>

            {/* BLOCK 3: WHAT WE DON'T DO */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-6">Our stance on partnerships</h2>
                            <p className="text-lg text-gray-700 mb-6">
                                We maintain strong technical relationships with key vendors to ensure we understand their roadmaps and capabilities.
                            </p>
                            <p className="text-lg text-gray-700">
                                However, we maintain strict commercial neutrality.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-sm shadow-sm space-y-4">
                            {[
                                "We do NOT accept referral fees.",
                                "We do NOT resell licenses.",
                                "We do NOT recommend tools based on perks."
                            ].map((item, i) => (
                                <div key={i} className="flex items-center text-gray-800 font-medium">
                                    <span className="text-red-500 mr-3 text-lg">✕</span> {item}
                                </div>
                            ))}
                            <div className="border-t border-gray-100 pt-4 mt-4">
                                <div className="flex items-center text-gray-800 font-medium">
                                    <span className="text-green-500 mr-3 text-lg">✓</span> We recommend what fixes the system.
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 4: CTA */}
            <section className="section bg-[var(--color-primary)] text-white text-center py-24">
                <div className="container max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Unbiased advice. System-first architecture.</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/contact" className="btn bg-white text-[var(--color-primary)] hover:bg-gray-100">
                            Assess your stack →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Partners;
