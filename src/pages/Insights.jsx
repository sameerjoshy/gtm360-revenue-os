import React from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

const Insights = () => {
    return (
        <div className="insights-page">
            <Helmet>
                <title>Cases & Insights | GTM360</title>
                <meta name="description" content="Real case studies of GTM system failures and fixes. See how we diagnosed and reversed growth stalls in SaaS, Enterprise, and Pre-IPO companies." />
            </Helmet>
            {/* BLOCK 1: FRAMING */}
            <section className="section py-24 md:py-32">
                <div className="container max-w-4xl opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-8 text-[var(--color-primary)]">
                        Cases and insights from real GTM systems.
                    </h1>
                    <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                        The patterns we see are consistent. The fixes require precision.
                    </p>
                    <p className="text-xl text-gray-700 leading-relaxed">
                        Below are detailed breakdowns of how we diagnose and intervene in stalled revenue engines.
                    </p>
                </div>
            </section>

            {/* BLOCK 2: DETAILED CASE STUDIES */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container">
                    <h2 className="text-sm font-bold uppercase text-gray-400 mb-12 tracking-widest">Case Studies</h2>

                    <div className="space-y-16">
                        {/* Case 1: Growth Slowdown */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-white p-8 md:p-12 rounded-sm shadow-sm">
                            <div className="md:col-span-4">
                                <div className="text-[var(--color-primary)] font-bold text-lg mb-2">The Plateau</div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Growth slowed despite rising activity</h3>
                                <div className="flex gap-2 mb-6">
                                    <span className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded">Series C</span>
                                    <span className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded">SaaS</span>
                                </div>
                            </div>
                            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-8">
                                <div>
                                    <h4 className="font-bold text-gray-500 text-sm uppercase mb-2">The Diagnosis</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        Execs believed the sales team had lost its edge. Our analysis showed <strong>decision decay</strong>: the Ideal Customer Profile had drifted, meaning sales reps were chasing 40% unqualified pipeline that marketing was celebrating as "MQLs."
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-[var(--color-primary)] text-sm uppercase mb-2">The Intervention</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        Redefined the ICP based on retention data, not just closures. Aligned marketing comp to stage-2 conversion (quality) rather than volume. Enforced strict disqualification rules at stage 1.
                                    </p>
                                </div>
                                <div className="sm:col-span-2 mt-4 bg-gray-50 p-6 rounded text-center border-l-4 border-[var(--color-primary)]">
                                    <span className="block text-gray-900 font-bold text-xl md:text-2xl">Outcome: Pipeline volume dropped 30%, but booking value rose 22% in 2 quarters.</span>
                                </div>
                            </div>
                        </div>

                        {/* Case 2: Lead Gen */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-white p-8 md:p-12 rounded-sm shadow-sm">
                            <div className="md:col-span-4">
                                <div className="text-[var(--color-primary)] font-bold text-lg mb-2">The Mirage</div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">The "Lead Gen" problem that wasn't</h3>
                                <div className="flex gap-2 mb-6">
                                    <span className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded">Enterprise</span>
                                    <span className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded">FinTech</span>
                                </div>
                            </div>
                            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-8">
                                <div>
                                    <h4 className="font-bold text-gray-500 text-sm uppercase mb-2">The Diagnosis</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        Inbound leads were "drying up." Diagnostic revealed the real issue was <strong>generic positioning</strong>. As the market matured, the company's broad promise no longer resonated with specific buyers, leading to low engagement.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-[var(--color-primary)] text-sm uppercase mb-2">The Intervention</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        Shifted from a "platform for everyone" message to three vertical-specific use cases. Restructured the SDR motion to lead with industry insights rather than product features.
                                    </p>
                                </div>
                                <div className="sm:col-span-2 mt-4 bg-gray-50 p-6 rounded text-center border-l-4 border-[var(--color-primary)]">
                                    <span className="block text-gray-900 font-bold text-xl md:text-2xl">Outcome: 2.5x increase in C-level response rates.</span>
                                </div>
                            </div>
                        </div>

                        {/* Case 3: Forecast */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-white p-8 md:p-12 rounded-sm shadow-sm">
                            <div className="md:col-span-4">
                                <div className="text-[var(--color-primary)] font-bold text-lg mb-2">The Rollercoaster</div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Forecast volatility in a scaled org</h3>
                                <div className="flex gap-2 mb-6">
                                    <span className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded">Pre-IPO</span>
                                    <span className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded">Cybersecurity</span>
                                </div>
                            </div>
                            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-8">
                                <div>
                                    <h4 className="font-bold text-gray-500 text-sm uppercase mb-2">The Diagnosis</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        Forecasts fluctuated wildly week-to-week. The cause: <strong>subjective stage exit criteria</strong>. Reps "felt good" about deals that had technically stalled, and managers were inspecting activity, not evidence.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-[var(--color-primary)] text-sm uppercase mb-2">The Intervention</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        Implemented strict "exit criteria" gates (e.g., verified budget access, legal review start) for late stages. Replaced "deal reviews" with "risk reviews" focusing on missing evidence.
                                    </p>
                                </div>
                                <div className="sm:col-span-2 mt-4 bg-gray-50 p-6 rounded text-center border-l-4 border-[var(--color-primary)]">
                                    <span className="block text-gray-900 font-bold text-xl md:text-2xl">Outcome: Forecast accuracy improved from ±40% to ±10%.</span>
                                </div>
                            </div>
                        </div>

                        {/* Case 4: AI Mandate */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start bg-white p-8 md:p-12 rounded-sm shadow-sm">
                            <div className="md:col-span-4">
                                <div className="text-[var(--color-primary)] font-bold text-lg mb-2">The Mandate</div>
                                <h3 className="text-2xl font-semibold text-gray-900 mb-4">"We need AI"</h3>
                                <div className="flex gap-2 mb-6">
                                    <span className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded">Growth Stage</span>
                                    <span className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded">B2B Services</span>
                                </div>
                            </div>
                            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-8">
                                <div>
                                    <h4 className="font-bold text-gray-500 text-sm uppercase mb-2">The Diagnosis</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        The Board demanded an "AI Strategy." The team planned to buy 5 different tools. We identified that their core data (CRM) was 60% unstructured/incomplete, meaning AI would only accelerate noise.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-[var(--color-primary)] text-sm uppercase mb-2">The Intervention</h4>
                                    <p className="text-gray-700 text-sm leading-relaxed">
                                        Paused tool buying. Fixed the data capture process at the "Opportunity" level. Deployed a single AI pilot focused solely on call recording analysis to automate data entry (low risk, high value).
                                    </p>
                                </div>
                                <div className="sm:col-span-2 mt-4 bg-gray-50 p-6 rounded text-center border-l-4 border-[var(--color-primary)]">
                                    <span className="block text-gray-900 font-bold text-xl md:text-2xl">Outcome: AI adoption succeeded because it solved a specific friction point.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 3: EDITORIAL INSIGHTS */}
            <section className="section">
                <div className="container">
                    <h2 className="text-sm font-bold uppercase text-gray-400 mb-12 tracking-widest">Editorial & Thinking</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Why 'More Pipeline' Breaks Your Revenue Model",
                                desc: "Mathematical proof that adding volume to a low-conversion system actually decreases total output.",
                                tag: "System Dynamics"
                            },
                            {
                                title: "The End of the 'Hero Rep'",
                                desc: "Why scalable revenue requires reliance on process, not individual brilliance.",
                                tag: "Talent"
                            },
                            {
                                title: "Dashboards Are Assessing the Wrong Things",
                                desc: "Most lagging indicators tell you what happened, not what decision to make next.",
                                tag: "Data Strategy"
                            }
                        ].map((article, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="aspect-[4/3] bg-gray-100 mb-4 rounded-sm relative overflow-hidden">
                                    {/* Placeholder for abstract visual */}
                                    <div className="absolute inset-0 bg-[var(--color-secondary)] group-hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-300">
                                        <span className="text-3xl font-light">Aa</span>
                                    </div>
                                </div>
                                <div className="text-xs font-bold text-[var(--color-primary)] uppercase mb-2">{article.tag}</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors">{article.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{article.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BLOCK 4: CTA */}
            <section className="section bg-[var(--color-primary)] text-white text-center py-24">
                <div className="container max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">See your own system clearly.</h2>
                    <p className="text-lg text-indigo-100 mb-10">
                        We apply this same diagnostic rigor to every engagement.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/contact" className="btn bg-white text-[var(--color-primary)] hover:bg-gray-100">
                            Start a diagnostic conversation →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Insights;
