import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { insights } from '../data/insightsData';
import { caseStudies } from '../data/caseStudies';
import { FileText, ArrowRight, BookOpen, Clock, Tag } from 'lucide-react';

const Insights = () => {
    // 1. SEO
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "GTM Research Hub: The Science of Revenue",
        "description": "Diagnostic insights into common GTM failures in B2B companies — beyond tactics and tools."
    };

    const categories = [
        "All",
        "Pipeline & Deals",
        "Forecasting",
        "Positioning & ICP",
        "RevOps & Signals",
        "Tools & AI",
        "Operating Model"
    ];

    const [activeCategory, setActiveCategory] = useState("All");

    // Convert insights object to array
    const allInsights = Object.values(insights);

    const filteredInsights = activeCategory === "All"
        ? allInsights
        : allInsights.filter(i => i.category === activeCategory);

    return (
        <div className="insights-hub min-h-screen bg-slate-50">
            <Helmet>
                <title>GTM Research Hub: The Science of Revenue | GTM-360</title>
                <meta name="description" content="Diagnostic insights into common GTM failures in B2B companies — beyond tactics and tools." />
                <link rel="canonical" href="https://gtm-360.com/insights" />
                <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
            </Helmet>

            {/* HERO */}
            <section className="section pt-32 pb-20 bg-slate-900 relative overflow-hidden text-white">
                {/* Abstract Backgrounds */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600 rounded-full mix-blend-screen filter blur-[100px] opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600 rounded-full mix-blend-screen filter blur-[80px] opacity-10"></div>

                <div className="container max-w-5xl relative z-10 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-slate-800 border border-slate-700 text-xs font-mono text-indigo-400 mb-6 tracking-widest uppercase">
                        GTM-360 Intelligence
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 tracking-tight">
                        The Science of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Revenue</span>
                    </h1>
                    <h2 className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
                        We don't publish "content". We publish <strong className="text-white">diagnostics</strong>.<br />
                        Deep dives into why B2B systems fail and how to engineer them correctly.
                    </h2>
                </div>
            </section>

            {/* CATEGORY BAR */}
            <section className="sticky top-24 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 py-4 shadow-sm">
                <div className="container overflow-x-auto">
                    <div className="flex justify-center min-w-max gap-2 px-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap border ${activeCategory === cat
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* INSIGHTS GRID */}
            <section className="section py-20 px-4">
                <div className="container max-w-7xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredInsights.map((insight) => (
                            <Link
                                key={insight.slug}
                                to={insight.slug}
                                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Top Gradient Stripe */}
                                <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                                <div className="p-8 flex flex-col h-full">
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                                            {insight.category}
                                        </span>
                                        <span className="flex items-center text-xs text-gray-400 font-medium">
                                            <Clock className="w-3 h-3 mr-1" /> {insight.readTime}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-indigo-600 transition-colors leading-snug">
                                        {insight.title}
                                    </h3>

                                    <p className="text-gray-600 mb-8 leading-relaxed flex-grow text-sm">
                                        {insight.description}
                                    </p>

                                    <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-sm font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                                        Read Analysis <ArrowRight className="w-4 h-4 ml-2" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CASE STUDIES BLOCK */}
            <section className="section py-24 bg-slate-900 text-white border-t border-slate-800">
                <div className="container max-w-7xl">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div className="max-w-2xl">
                            <span className="text-emerald-400 font-mono text-xs tracking-widest uppercase mb-4 block">
                                Proof of Work
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">
                                Diagnostic Case Studies
                            </h2>
                            <p className="text-xl text-slate-400 leading-relaxed">
                                Real examples of GTM misdiagnosis &mdash; and what changed once the real constraint was identified.
                            </p>
                        </div>
                        <Link to="/contact" className="hidden md:inline-flex items-center px-6 py-3 border border-emerald-500/30 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-colors font-medium">
                            Become the next Case Study <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.values(caseStudies).map((study) => (
                            <Link
                                key={study.slug}
                                to={study.slug}
                                className="group relative bg-slate-800/50 p-10 rounded-3xl border border-slate-700/50 hover:border-emerald-500/50 hover:bg-slate-800 transition-all duration-300 flex flex-col h-full overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
                                    <FileText className="w-32 h-32 text-emerald-500" />
                                </div>

                                <div className="text-xs font-bold uppercase text-emerald-400 mb-6 tracking-widest flex items-center gap-2">
                                    <Tag className="w-3 h-3" />
                                    <span>{study.client_profile}</span>
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-emerald-400 transition-colors">
                                    {study.title}
                                </h3>

                                <p className="text-slate-400 mb-8 text-lg font-serif italic border-l-2 border-emerald-500/30 pl-4 flex-grow">
                                    "{study.subtitle}"
                                </p>

                                <div className="mt-6 pt-6 border-t border-slate-700 flex justify-between items-center">
                                    <div className="text-emerald-400 font-mono text-sm">
                                        <span className="block text-xs uppercase text-slate-500 mb-1">Impact</span>
                                        {study.metrics?.after?.growth || 'Significant'} Growth
                                    </div>
                                    <div className="bg-emerald-500/10 p-3 rounded-full text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Insights;
