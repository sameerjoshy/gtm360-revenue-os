import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, Filter, BarChart3, Database, ShieldAlert, GitCommit } from 'lucide-react';
import VisualConcept from '../../components/visuals/VisualConcept';
import PipelineFunnel from '../../components/visuals/PipelineFunnel';
import AEOSchema from '../../components/seo/AEOSchema';

const PipelineQuality = () => {
    return (
        <div className="service-detail-page bg-white font-sans text-gray-900">
            <Helmet>
                <title>Pipeline & Deal Quality Repair | GTM-360</title>
                <meta name="description" content="Fix pipelines that look healthy but fail to convert. Align stage criteria, qualification logic, and signals." />
                <link rel="canonical" href="https://gtm-360.com/services/pipeline-quality" />
            </Helmet>

            <AEOSchema
                type="Service"
                data={{
                    name: "Pipeline & Deal Quality Repair",
                    description: "System-level repair for GTM pipelines to increase conversion predictability.",
                    serviceType: "Management Consulting"
                }}
            />

            {/* HERO SECTION: Split Layout */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-slate-50">
                <div className="container max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Text Content */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-100">
                                <Filter size={14} /> Pipeline Engineering
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 text-slate-900">
                                Stop celebrating <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                                    vanity volume.
                                </span>
                            </h1>
                            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-lg">
                                Most pipelines are full of hope, not revenue. We install the rigorous "Exit Criteria" that ensure only real deals progress.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/diagnostic" className="btn bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold transition-all shadow-lg shadow-blue-200">
                                    Start Diagnostic
                                </Link>
                            </div>
                        </div>

                        {/* Visual Content */}
                        <div className="relative">
                            <div className="relative z-10 transform lg:translate-x-12">
                                <PipelineFunnel />
                            </div>
                            {/* Decorative Blur */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/20 rounded-full blur-3xl -z-0"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROBLEM DEFINITION */}
            <section className="py-24 bg-white">
                <div className="container max-w-5xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">The "Happy Ears" Problem</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Teams are incentivized to open opportunities, not close them. This creates a bloated pipeline that hides the truth until the end of the quarter.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <ShieldAlert className="text-red-500" size={32} />,
                                title: "Late-Stage Surprises",
                                desc: "Deals sit in 'Commit' for weeks, then drop out because the Economic Buyer was never actually engaged."
                            },
                            {
                                icon: <BarChart3 className="text-red-500" size={32} />,
                                title: "Inflationary Coverage",
                                desc: "You have '3x Coverage', but win rates are dropping. You're measuring activity, not intent."
                            },
                            {
                                icon: <Database className="text-red-500" size={32} />,
                                title: "Zombie Opportunities",
                                desc: "Reps hoard dead deals to avoid difficult conversations with management."
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

            {/* SOLUTION */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <svg width="100%" height="100%">
                        <pattern id="grid-dark-pipe" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid-dark-pipe)" />
                    </svg>
                </div>

                <div className="container max-w-6xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-start gap-16">
                        <div className="md:w-1/2">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">
                                Engineering <br />
                                <span className="text-blue-400">Deal Velocity</span>
                            </h2>
                            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                                We shift the focus from "Coverage" to "Conversion". By installing strict entry and exit criteria for every stage, we expose the reality of the business.
                            </p>

                            <ul className="space-y-6">
                                {[
                                    { title: "Objective Exit Criteria", text: "Deals don't advance based on rep 'feeling'. They advance based on customer action (e.g., 'Verbal Tech Validation')." },
                                    { title: "Signal-Based Qualification", text: "Using data (intent signals, engagement) to validate subjective claims." },
                                    { title: "Ruthless Disqualification", text: "Celebrating the 'No'. Disqualifying bad fits early generates more ROI than chasing them." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold">
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
                        <div className="md:w-1/2 bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-colors">
                            <h3 className="text-sm font-bold uppercase text-slate-500 tracking-widest mb-6">Deliverables</h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    "Stage-by-Stage Exit Criteria Map",
                                    "Deal Inspection Playbook",
                                    "Pipeline Hygiene Dashboard Specs",
                                    "Forecast Category Redefinition"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                                        <GitCommit size={20} className="text-blue-400" />
                                        <span className="font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* WHEN TO ACT */}
            <section className="py-24 bg-blue-50">
                <div className="container max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-12">Is your pipeline lying to you?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100">
                            <h3 className="font-bold text-green-600 flex items-center gap-2 mb-6">
                                <Check size={20} /> Yes, if you see this:
                            </h3>
                            <ul className="space-y-3">
                                {["Win rates dropping despite high activity", "Forecast slips > 20% in the last month", "Reps surprised by losses"].map(i => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></span>
                                        {i}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-red-100">
                            <h3 className="font-bold text-red-600 flex items-center gap-2 mb-6">
                                <X size={20} /> No, if provided:
                            </h3>
                            <ul className="space-y-3">
                                {["You can predict revenue within 5%", "Loss reasons are always known", "Deals velocity is increasing"].map(i => (
                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2"></span>
                                        {i}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="mt-16">
                        <p className="text-slate-600 mb-6">Need to clean up your pipeline?</p>
                        <Link to="/diagnostic" className="inline-flex items-center gap-2 text-blue-700 font-bold hover:gap-4 transition-all">
                            Take the GTM Diagnostic <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PipelineQuality;
