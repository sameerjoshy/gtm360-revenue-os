import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const GTMSignalsAI = () => {
    return (
        <div className="service-detail-page">
            <Helmet>
                <title>GTM Signals, Tooling & AI Alignment | GTM-360</title>
                <meta name="description" content="Align technology and AI to the GTM model. Reduce noise, clarify signals, and stop tool sprawl." />
                <link rel="canonical" href="https://gtm-360.com/services/gtm-signals-and-ai" />
            </Helmet>

            {/* HERO */}
            <section className="section py-20 bg-white">
                <div className="container max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6 text-[var(--color-primary)]">
                        GTM Signals, Tooling & AI Alignment
                    </h1>
                    <h2 className="text-xl text-gray-700 mb-6 leading-relaxed font-normal">
                        A system-level engagement designed to fix a specific GTM constraint —<br />
                        not a functional problem.
                    </h2>
                    <p className="text-sm font-bold uppercase text-gray-400 tracking-widest">
                        This work typically follows a GTM Diagnostic
                        to ensure the right constraint is being addressed.
                    </p>
                </div>
            </section>

            {/* 1. WHAT THIS FIXES */}
            <section className="section bg-gray-50">
                <div className="container max-w-4xl">
                    <h3 className="text-sm font-bold uppercase text-gray-400 mb-6 tracking-widest">What this service fixes</h3>
                    <div className="bg-white p-8 border-l-4 border-[var(--color-primary)] shadow-sm">
                        <p className="text-xl text-gray-900 leading-relaxed">
                            Technology and AI sprawl<br />
                            that amplifies confusion instead of clarity.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. WHEN THIS IS RIGHT */}
            <section className="section">
                <div className="container max-w-4xl">
                    <h3 className="text-sm font-bold uppercase text-gray-400 mb-6 tracking-widest">When this is the right next step</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                            "Too many dashboards, too few decisions",
                            "AI tools increase activity but not outcomes",
                            "Teams don’t trust signals"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center text-gray-800 p-4 bg-gray-50 rounded-sm">
                                <span className="text-green-600 mr-3 font-bold">✓</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* 3. WHAT CHANGES */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container max-w-4xl">
                    <h3 className="text-sm font-bold uppercase text-gray-400 mb-6 tracking-widest">What changes after this work</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            "Clear definition of signals vs data",
                            "Tooling aligned to the GTM model",
                            "AI used as an amplifier, not a crutch"
                        ].map((card, i) => (
                            <div key={i} className="bg-white p-6 rounded-sm shadow-sm">
                                <span className="text-3xl text-[var(--color-primary)] font-bold block mb-2">{i + 1}</span>
                                <p className="text-gray-900 font-medium">{card}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. WHAT WE DELIVER */}
            <section className="section">
                <div className="container max-w-4xl">
                    <h3 className="text-sm font-bold uppercase text-gray-400 mb-6 tracking-widest">What we deliver</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            "Signal taxonomy",
                            "Tool role clarity",
                            "AI usage guardrails",
                            "Decommissioning plan"
                        ].map(item => (
                            <div key={item} className="border border-gray-200 p-4 rounded-sm hover:border-[var(--color-primary)] transition-colors">
                                <span className="font-bold text-gray-900">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. WHAT THIS IS NOT */}
            <section className="section bg-gray-900 text-white">
                <div className="container max-w-4xl">
                    <h3 className="text-sm font-bold uppercase text-gray-500 mb-6 tracking-widest">What this is not</h3>
                    <div className="flex flex-wrap gap-4">
                        {["Tool selection", "AI experimentation lab", "Automation for its own sake"].map(item => (
                            <span key={item} className="px-4 py-2 bg-gray-800 rounded-full text-gray-300 border border-gray-700">
                                <span className="text-red-400 mr-2">×</span> {item}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. HOW TO START */}
            <section className="section py-20 text-center">
                <div className="container max-w-3xl">
                    <h3 className="text-sm font-bold uppercase text-gray-400 mb-6 tracking-widest">How teams typically start</h3>
                    <p className="text-xl text-gray-900 mb-8 leading-relaxed">
                        Most teams begin with a short diagnostic<br />
                        to confirm this is the right constraint to address.
                    </p>
                    <Link to="/diagnostic" className="btn bg-[var(--color-primary)] text-white hover:bg-opacity-90 px-10 py-4">
                        Start with a Diagnostic
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default GTMSignalsAI;
