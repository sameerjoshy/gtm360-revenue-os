import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { insights } from '../data/insightsData';
import { caseStudies } from '../data/caseStudies';
import { FileText, ArrowRight } from 'lucide-react';

const Insights = () => {
    // 1. SEO
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "GTM Insights: Why Growth Stalls in B2B Systems",
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
        <div className="insights-hub">
            <Helmet>
                <title>GTM Insights: Why Growth Stalls in B2B Systems | GTM-360</title>
                <meta name="description" content="Diagnostic insights into common GTM failures in B2B companies — beyond tactics and tools." />
                <link rel="canonical" href="https://gtm-360.com/insights" />
                <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
            </Helmet>

            {/* HERO */}
            <section className="section py-20 bg-white text-center">
                <div className="container max-w-4xl opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-8 text-[var(--color-primary)]">
                        GTM Insights: Why growth stalls even when teams execute
                    </h1>
                    <h2 className="text-xl text-gray-700 mb-8 leading-relaxed font-normal">
                        Short, diagnostic essays on why common GTM fixes fail —<br className="hidden md:block" />
                        and what’s actually constraining growth in B2B systems.
                    </h2>
                </div>
            </section>

            {/* CATEGORY BAR */}
            <section className="sticky top-20 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200 py-4">
                <div className="container overflow-x-auto">
                    <div className="flex justify-center min-w-max gap-2 px-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeCategory === cat
                                    ? 'bg-[var(--color-primary)] text-white shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* INSIGHTS GRID */}
            <section className="section bg-gray-50 min-h-screen">
                <div className="container max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredInsights.map((insight) => (
                            <Link
                                key={insight.slug}
                                to={insight.slug}
                                className="group bg-white p-8 rounded-sm shadow-sm hover:shadow-lg border border-gray-200 transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="text-xs font-bold uppercase text-[var(--color-primary)] mb-4 tracking-widest flex justify-between items-center">
                                    <span>{insight.category}</span>
                                    <span className="text-gray-400 font-normal normal-case">{insight.readTime}</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[var(--color-primary)] transition-colors leading-tight">
                                    {insight.title}
                                </h3>
                                <p className="text-gray-600 mb-8 leading-relaxed flex-grow">
                                    {insight.description}
                                </p>
                                <div className="text-[var(--color-primary)] font-medium text-sm group-hover:underline">
                                    Read Analysis →
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CASE STUDIES BLOCK (Secondary, Distinct) */}
            <section className="section py-20 bg-white border-t border-gray-200">
                <div className="container max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
                            Diagnostic Case Studies
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Real examples of GTM misdiagnosis —<br />
                            and what changed once the real constraint was identified.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {Object.values(caseStudies).map((study) => (
                            <Link
                                key={study.slug}
                                to={study.slug}
                                className="group bg-slate-900 p-10 rounded-sm shadow-xl hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col relative overflow-hidden h-full"
                            >
                                {/* Decorative accent */}
                                <div className="absolute top-0 left-0 w-2 h-full bg-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                <div className="text-xs font-bold uppercase text-[var(--color-primary)] mb-6 tracking-widest flex items-center gap-2">
                                    <FileText className="w-4 h-4" />
                                    <span>{study.client_profile}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                                    {study.title}
                                </h3>

                                <p className="text-slate-300 mb-8 text-lg font-serif italic border-l-2 border-slate-700 pl-4 flex-grow">
                                    "{study.subtitle}"
                                </p>

                                <div className="mt-6 pt-6 border-t border-slate-800 flex justify-between items-center text-sm font-medium">
                                    <div className="text-green-400">
                                        <span className="block text-xs uppercase text-slate-500">Impact</span>
                                        {study.metrics.after.growth} Growth
                                    </div>
                                    <div className="text-white group-hover:translate-x-2 transition-transform flex items-center">
                                        Read Case Study <ArrowRight className="ml-2 w-4 h-4" />
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
