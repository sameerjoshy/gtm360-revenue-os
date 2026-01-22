import React from 'react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import IconRenderer from '../components/visuals/IconRenderer';
import { ArrowRight } from 'lucide-react';

const Services = () => {
    // 1. SEO + AEO FOUNDATION
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "name": "GTM System Repair Services",
        "description": "Post-diagnostic system repairs to realign GTM operating models, pipeline quality, forecasting, and signals."
    };

    const services = [
        {
            icon: 'gear',
            title: "GTM Operating Model Realignment",
            desc: "When teams execute well individually, but the system doesn’t compound. We align strategy, roles, and KPIs into a unified engine.",
            symptom: "Silos, conflicting goals, slow velocity",
            link: "/services/gtm-operating-model",
            color: "blue"
        },
        {
            icon: 'filter',
            title: "Pipeline & Deal Quality Repair",
            desc: "When pipeline looks healthy, but deals don’t convert predictably. We install strict entry/exit criteria and stage definitions.",
            symptom: "Bloated pipeline, late stage loss",
            link: "/services/pipeline-quality",
            color: "green"
        },
        {
            icon: 'trending-up',
            title: "Forecasting & Revenue Governance",
            desc: "When forecasts exist, but confidence in them does not. We build data-driven triangulation models to replace 'gut feel'.",
            symptom: "Forecast misses, surprise churn",
            link: "/services/forecasting-governance",
            color: "purple"
        },
        {
            icon: 'cpu',
            title: "GTM Signals, Tooling & AI Alignment",
            desc: "When tools and AI increase noise instead of clarity. We audit the stack to ensure every tool amplifies a specific decision.",
            symptom: "Tool fatigue, dirty data, low adoption",
            link: "/services/gtm-signals-and-ai",
            color: "indigo"
        }
    ];

    return (
        <div className="services-page bg-slate-50 min-h-screen">
            <SEO
                title="GTM System Repair Services"
                description="Post-diagnostic system repairs to realign GTM operating models, pipeline quality, forecasting, and signals."
                canonical="https://gtm-360.com/services"
            >
                <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
            </SEO>

            {/* HERO SECTION */}
            <section className="section py-24 md:py-32 bg-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-noise opacity-30"></div>
                <div className="container max-w-4xl relative z-10 opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-8 text-[var(--color-primary)]">
                        How We Unlock Revenue
                    </h1>
                    <h2 className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-normal">
                        Once the real GTM constraint is clear, <br className="hidden md:block" />
                        we help leadership teams redesign and operationalize the system — <br />
                        <span className="font-semibold text-gray-900">so execution becomes predictable, not reactive.</span>
                    </h2>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="section -mt-12 relative z-20">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {services.map((service, index) => (
                            <Link
                                key={index}
                                to={service.link}
                                className="group relative bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 flex flex-col h-full overflow-hidden"
                            >
                                {/* Decorative Gradient */}
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-${service.color}-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-${service.color}-100 transition-colors`}></div>

                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className={`w-14 h-14 rounded-xl bg-${service.color}-50 flex items-center justify-center text-${service.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                                            <IconRenderer icon={service.icon} className="w-7 h-7" />
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-widest text-${service.color}-600 bg-${service.color}-50 px-3 py-1 rounded-full`}>
                                            Solution
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                                        {service.title}
                                    </h3>

                                    {/* Symptom Tag */}
                                    <div className="mb-6 flex items-start text-sm text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
                                        <span className="font-semibold text-gray-700 not-italic mr-2">Fixes:</span> {service.symptom}
                                    </div>

                                    <p className="text-gray-600 mb-8 text-lg leading-relaxed flex-grow">
                                        {service.desc}
                                    </p>

                                    <div className="flex items-center text-[var(--color-primary)] font-bold group-hover:translate-x-2 transition-transform">
                                        View Service Details <ArrowRight className="ml-2 w-5 h-5" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA BLOCK */}
            <section className="section py-24 bg-[var(--color-primary)] text-white text-center relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                <div className="container max-w-3xl relative z-10">
                    <h2 className="text-3xl font-bold mb-6">Not sure where to start?</h2>
                    <p className="text-xl text-indigo-100 mb-10 leading-relaxed font-light">
                        Most teams begin with a short diagnostic<br />
                        to understand which system constraint is actually limiting growth.
                    </p>
                    <Link to="/diagnostic" className="btn bg-white text-[var(--color-primary)] hover:bg-indigo-50 px-10 py-5 text-lg shadow-xl hover:shadow-2xl transition-all">
                        Start with a Diagnostic
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Services;
