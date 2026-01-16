import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { insights } from '../data/insightsData';

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
        </div>
    );
};

export default Insights;
