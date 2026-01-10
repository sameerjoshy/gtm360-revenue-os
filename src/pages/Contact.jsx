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
                                <p className="text-lg font-medium text-gray-900">hello@gtm360.io</p>
                                <p className="text-lg font-medium text-gray-900">+1 (415) 555-0123</p>
                            </div>
                        </div>

                        {/* Right Column: Simple Form */}
                        <div className="bg-white p-8 rounded-sm shadow-lg border-t-4 border-[var(--color-primary)]">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input type="text" className="w-full border-b border-gray-300 py-2 focus:border-[var(--color-primary)] focus:outline-none transition-colors" placeholder="First Last" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
                                    <input type="email" className="w-full border-b border-gray-300 py-2 focus:border-[var(--color-primary)] focus:outline-none transition-colors" placeholder="name@company.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company / Role</label>
                                    <input type="text" className="w-full border-b border-gray-300 py-2 focus:border-[var(--color-primary)] focus:outline-none transition-colors" placeholder="e.g. Acme Corp, CRO" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">What's on your mind?</label>
                                    <textarea className="w-full border-b border-gray-300 py-2 focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none" rows="3" placeholder="Briefly describe the challenge..."></textarea>
                                </div>
                                <button type="button" className="w-full btn bg-[var(--color-primary)] text-white hover:bg-opacity-90 mt-4">
                                    Book Diagnostic
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
