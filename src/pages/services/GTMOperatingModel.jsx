import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, Layers, Users, Activity, GitCommit, Shield } from 'lucide-react';
import VisualConcept from '../../components/visuals/VisualConcept';
import OperatingModelDiagram from '../../components/visuals/OperatingModelDiagram';
import AEOSchema from '../../components/seo/AEOSchema';

const GTMOperatingModel = () => {
    return (
        <div className="service-detail-page bg-white font-sans text-gray-900">
            <Helmet>
                <title>GTM Operating Model Realignment | GTM-360</title>
                <meta name="description" content="Fix misaligned GTM systems where teams execute well individually but strategy degrades. A system-level engagement." />
                <link rel="canonical" href="https://gtm-360.com/services/gtm-operating-model" />
            </Helmet>

            <AEOSchema
                type="HowTo"
                data={{
                    name: "How to Realign a GTM Operating Model",
                    description: "Moving from functional silos to a unified revenue system.",
                    steps: [
                        { title: "Map the Decision Flow", text: "Identify who owns specific GTM decisions and where friction exists." },
                        { title: "Define the System Pulse", text: "Establish a single operating rhythm (cadence) that connects Strategy to Execution." },
                        { title: "Clarify Trade-offs", text: "Explicitly define what the organization will NOT do to protect focus." }
                    ]
                }}
            />

            {/* HERO SECTION: Split Layout */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Text Content */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-indigo-100">
                                <GitCommit size={14} /> System Realignment
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-slate-900">
                                Stop fixing teams. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                                    Fix the connections.
                                </span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                                When functional teams execute perfectly but the business misses targets, the problem isn't the people. It's the operating model.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/diagnostic" className="btn bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-4 rounded-lg font-semibold transition-all shadow-lg shadow-indigo-200">
                                    Start Diagnostic
                                </Link>
                            </div>
                        </div>

                        {/* Visual Content */}
                        <div className="relative">
                            <div className="relative z-10 transform lg:translate-x-12">
                                <OperatingModelDiagram />
                            </div>
                            {/* Decorative Blur */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/20 rounded-full blur-3xl -z-0"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROBLEM DEFINITION: The Silo Trap */}
            <section className="py-24 bg-white">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">The "Functional Excellence" Trap</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Why do companies with great talent fail to grow? Because they optimize for functional efficiency, not system throughput.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Users className="text-red-500" size={32} />,
                                title: "Tribal Truths",
                                desc: "Sales, Marketing, and CS each have their own data, their own definitions of success, and their own reality."
                            },
                            {
                                icon: <Layers className="text-red-500" size={32} />,
                                title: "Execution Drag",
                                desc: "Strategy is clear at the executive level but degrades by 50% every time it hands off between departments."
                            },
                            {
                                icon: <Activity className="text-red-500" size={32} />,
                                title: "Reactive Heroics",
                                desc: "The quarter is saved by last-minute brute force, not by a predictable, engineered machine."
                            }
                        ].map((card, i) => (
                            <div key={i} className="p-8 bg-slate-50 border border-slate-100 rounded-2xl hover:border-red-200 transition-colors group">
                                <div className="mb-6 p-4 bg-white rounded-xl inline-block shadow-sm group-hover:scale-110 transition-transform">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{card.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SOLUTION: The Unified Rhythm */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <svg width="100%" height="100%">
                        <pattern id="grid-dark" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid-dark)" />
                    </svg>
                </div>

                <div className="container max-w-6xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-start gap-16">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                From "Hand-offs" to <br />
                                <span className="text-indigo-400">Integrated Motion</span>
                            </h2>
                            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                                We don't just "align" teams. As revenue architects, we install a single operating rhythm that forces integration at the decision level.
                            </p>

                            <ul className="space-y-6">
                                {[
                                    { title: "Single Source of Truth", text: "One data model that everyone trusts. No more arguing over whose spreadsheet is right." },
                                    { title: "Unified Decision Cadence", text: "Weekly and monthly rituals where teams solve problems together, not report status separately." },
                                    { title: "Explicit Trade-offs", text: "Clear rules for what we do AND what we don't do, preventing strategy creep." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-lg">{item.title}</h4>
                                            <p className="text-slate-400 text-sm mt-1">{item.text}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="md:w-1/2 bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-indigo-500/50 transition-colors">
                            <h3 className="text-sm font-bold uppercase text-slate-500 tracking-widest mb-6">Deliverables</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    "GTM Operating Model Narrative",
                                    "Role & Decision Ownership Map (RACI)",
                                    "Governance Cadence & Rituals",
                                    "Cross-Functional KPI Definitions"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                        <Shield size={20} className="text-indigo-400" />
                                        <span className="font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHEN TO ACT */}
            <section className="py-24 bg-indigo-50">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">Is this your next step?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-indigo-100">
                            <h3 className="font-bold text-green-600 flex items-center gap-2 mb-6">
                                <Check size={20} /> Yes, if you see this:
                            </h3>
                            <ul className="space-y-3">
                                {["Teams blaming each other for misses", "Slow decision making (weeks vs days)", "Growth is reactive/hero-based"].map(i => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></span>
                                        {i}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100">
                            <h3 className="font-bold text-red-600 flex items-center gap-2 mb-6">
                                <X size={20} /> No, if you need this:
                            </h3>
                            <ul className="space-y-3">
                                {["Just sales training", "A new CRM implementation", "Basic process documentation"].map(i => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></span>
                                        {i}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16">
                        <p className="text-slate-600 mb-6">Unsure if you need a system realignment?</p>
                        <Link to="/diagnostic" className="inline-flex items-center gap-2 text-indigo-700 font-bold hover:gap-4 transition-all">
                            Take the GTM Diagnostic <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GTMOperatingModel;
