import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ThankYou = () => {
    const { state } = useLocation();
    const type = state?.search || 'default'; // 'default', 'nurture', 'diagnostic'

    const content = {
        default: {
            title: "Message received.",
            subtitle: "We will be in touch shortly to schedule your diagnostic."
        },
        nurture: {
            title: "You're on the list.",
            subtitle: "Your first diagnostic check is on its way to your inbox (Subject: Day 1). Check your spam folder if you don't see it in 5 minutes."
        },
        diagnostic: {
            title: "Report generated.",
            subtitle: "Your Revenue Maturity Score has been emailed to you. It includes the breakdown of your system constraints."
        }
    }[type] || { title: "Message received.", subtitle: "We will be in touch shortly." };

    return (
        <div className="thank-you-page">
            <Helmet>
                <title>Thank You | GTM360</title>
                <meta name="robots" content="noindex" />
            </Helmet>

            <section className="section py-20 bg-gray-50 min-h-[90vh] flex flex-col justify-center">
                <div className="container max-w-5xl">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">
                        {/* LEFT: STATUS */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-6">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-semibold text-[var(--color-primary)] mb-6 tracking-tight">
                                {content.title}
                            </h1>
                            <p className="text-xl text-gray-700 leading-relaxed mb-10 max-w-xl">
                                {content.subtitle}
                            </p>

                            <div className="space-y-4">
                                <Link to="/insights" className="btn bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 flex items-center justify-between group">
                                    <span>Explore Insights Hub</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </Link>
                                <Link to="/how-we-work" className="btn bg-[var(--color-primary)] text-white hover:bg-opacity-90 flex items-center justify-between group">
                                    <span>Understand the Operating Model</span>
                                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                                </Link>
                            </div>

                            <div className="mt-12 text-center lg:text-left">
                                <Link to="/" className="text-gray-400 hover:text-[var(--color-primary)] text-sm font-medium">
                                    ← Return to home
                                </Link>
                            </div>
                        </div>

                        {/* RIGHT: BLUEPRINT VISUAL */}
                        <div className="flex-1 w-full max-w-md lg:max-w-none animate-fade-in-up delay-200">
                            {type === 'diagnostic' ? (
                                <GrowthBlueprintDesign />
                            ) : (
                                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 italic text-gray-400 text-center">
                                    <p>Your custom GTM roadmap will appear here after diagnostic completion.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ThankYou;
