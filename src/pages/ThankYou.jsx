import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ThankYou = () => {
    return (
        <div className="thank-you-page">
            <Helmet>
                <title>Thank You | GTM360</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <section className="section py-32 bg-gray-50 min-h-[80vh] flex flex-col justify-center">
                <div className="container max-w-3xl text-center">
                    <div className="mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <h1 className="text-4xl font-semibold text-[var(--color-primary)] mb-4">
                            Message received.
                        </h1>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            We will be in touch shortly to schedule your diagnostic.
                        </p>
                    </div>

                    <div className="bg-white p-10 rounded-sm shadow-sm border-t-4 border-[var(--color-primary)] text-left">
                        <h2 className="text-2xl font-semibold mb-6">While you wait, explore our thinking.</h2>
                        <div className="space-y-6">
                            <Link to="/insights" className="block group">
                                <h3 className="text-lg font-medium text-[var(--color-primary)] group-hover:underline">
                                    Browse the Insights Library →
                                </h3>
                                <p className="text-gray-600 mt-1">
                                    Case studies and anti-patterns from real revenue systems.
                                </p>
                            </Link>
                            <Link to="/how-we-work" className="block group border-t border-gray-100 pt-6">
                                <h3 className="text-lg font-medium text-[var(--color-primary)] group-hover:underline">
                                    Understand the GTM Operating Model →
                                </h3>
                                <p className="text-gray-600 mt-1">
                                    How we deconstruct revenue problems into architectural constraints.
                                </p>
                            </Link>
                        </div>
                    </div>

                    <div className="mt-12">
                        <Link to="/" className="text-gray-500 hover:text-[var(--color-primary)] text-sm font-medium">
                            ← Return to Home
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ThankYou;
