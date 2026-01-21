import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import diagnosisFlow from '../assets/schematics/diagnosis.png';
import { Target, Search, Compass, Activity, ShieldCheck, ArrowRight, XCircle, CheckCircle2 } from 'lucide-react';

const HowWeWork = () => {
    return (
        <div className="how-we-work-page min-h-screen bg-slate-50">
            <Helmet>
                <title>How We Work | GTM360</title>
                <meta name="description" content="We don't do pitch decks or 6-month audits. Our methodology is built on diagnostic rigor, rapid intervention, and creating a sustainable decision architecture." />
            </Helmet>

            {/* BLOCK 1: ORIENTATION */}
            <section className="section py-24 md:py-32 bg-white border-b border-gray-100">
                <div className="container max-w-5xl text-center opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <span className="text-[var(--color-primary)] font-mono text-xs tracking-widest uppercase mb-6 block">
                        The Operating Model
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-8 text-gray-900 tracking-tight">
                        How we work is as important as <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-blue-600">what we fix.</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
                        When growth stalls, organizations don’t need more activity. They need clarity. <br className="hidden md:block" />
                        Our work is designed to bring that clarity without disrupting what already works.
                    </p>
                </div>
            </section>

            {/* BLOCK 3: THE PLANNING CYCLE (Process Curve) */}
            <section className="section py-20 bg-slate-900 text-white">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center mb-20">
                        <h2 className="text-3xl font-bold mb-4">The Engineering Cycle</h2>
                        <p className="text-lg text-slate-400">Every engagement follows the same simple logic to ensure leverage.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                        {[
                            { icon: Compass, title: "1. Diagnostic", desc: "Establish a shared, objective view of reality." },
                            { icon: Search, title: "2. Analysis", desc: "Understand which decisions shaped current outcomes." },
                            { icon: Target, title: "3. Strategy", desc: "Define the next state with focus." },
                            { icon: Activity, title: "4. Execution", desc: "Identify the few system changes that create leverage." },
                            { icon: ShieldCheck, title: "5. Governance", desc: "Put inspection in place to course-correct." }
                        ].map((step, i) => (
                            <div key={i} className="group relative p-6 bg-slate-800/50 border border-slate-700 rounded-2xl hover:bg-slate-800 transition-all duration-300">
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-slate-900 border-4 border-slate-800 rounded-full flex items-center justify-center text-emerald-400 font-bold z-10 group-hover:border-emerald-500/30 transition-colors">
                                    <step.icon className="w-5 h-5" />
                                </div>
                                <div className="mt-8 text-center">
                                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                                </div>
                                {/* Connector Line (Desktop Only) */}
                                {i < 4 && (
                                    <div className="hidden md:block absolute top-0 -right-3 w-6 h-[2px] bg-slate-700 translate-y-6 z-0"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BLOCK 4: HOW DIAGNOSIS ACTUALLY WORKS */}
            <section className="section bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-indigo-600 font-bold uppercase tracking-wider text-xs mb-4 block">Discovery Phase</span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">We don't start with solutions.</h2>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                We start by understanding how decisions are currently made and enforced. The goal is not analysis for its own sake, but to surface where the system is quietly constraining progress.
                            </p>

                            <div className="space-y-4">
                                {[
                                    "Leadership conversations across functions",
                                    "Review of GTM signals, rhythms, and artifacts",
                                    "Pressure-testing assumptions behind stalled outcomes"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold mr-4">
                                            {i + 1}
                                        </div>
                                        <span className="text-indigo-900 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Schematic */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative bg-white border border-gray-200 p-8 rounded-2xl shadow-xl">
                                <img src={diagnosisFlow} alt="Diagnosis Process Flow" className="w-full h-auto mix-blend-multiply" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 7: WHAT WE AVOID */}
            <section className="section bg-slate-50 border-t border-gray-200">
                <div className="container max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">What we deliberately avoid</h2>
                        <p className="text-gray-600">If you are looking for these, we are not the right partner.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            "Re-orgs and large-scale transformations",
                            "Generic playbooks or methodologies",
                            "Activity inflation disguised as progress",
                            "Tool-led fixes without system clarity"
                        ].map(item => (
                            <div key={item} className="flex items-center bg-white p-5 rounded-xl border border-red-100 shadow-sm">
                                <XCircle className="w-6 h-6 text-red-500 mr-4 flex-shrink-0" />
                                <span className="text-gray-700 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BLOCK 10: CTA */}
            <section className="section bg-[var(--color-primary)] text-white text-center py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container max-w-2xl relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Start with clarity, not commitment.</h2>
                    <p className="text-xl text-indigo-100 mb-10 font-light">
                        The first conversation is diagnostic. No pitch. No pressure.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/contact" className="btn bg-white text-[var(--color-primary)] hover:bg-gray-100 shadow-xl border-0">
                            Start a diagnostic conversation →
                        </Link>
                        <Link to="/problems" className="btn border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                            Problems we solve →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowWeWork;
