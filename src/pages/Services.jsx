import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Settings, Filter, TrendingUp, Cpu, ArrowRight } from 'lucide-react';

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
            icon: <Settings className="w-10 h-10 text-[var(--color-primary)]" />,
            title: "GTM Operating Model Realignment",
            desc: "When teams execute well individually, but the system doesn’t compound.",
            link: "/services/gtm-operating-model"
        },
        {
            icon: <Filter className="w-10 h-10 text-[var(--color-primary)]" />,
            title: "Pipeline & Deal Quality Repair",
            desc: "When pipeline looks healthy, but deals don’t convert predictably.",
            link: "/services/pipeline-quality"
        },
        {
            icon: <TrendingUp className="w-10 h-10 text-[var(--color-primary)]" />,
            title: "Forecasting & Revenue Governance",
            desc: "When forecasts exist, but confidence in them does not.",
            link: "/services/forecasting-governance"
        },
        {
            icon: <Cpu className="w-10 h-10 text-[var(--color-primary)]" />,
            title: "GTM Signals, Tooling & AI Alignment",
            desc: "When tools and AI increase noise instead of clarity.",
            link: "/services/gtm-signals-and-ai"
        }
    ];

    return (
        <div className="services-page">
            <Helmet>
                <title>GTM System Repair Services | GTM-360</title>
                <meta name="description" content="Post-diagnostic system repairs to realign GTM operating models, pipeline quality, forecasting, and signals." />
                <link rel="canonical" href="https://gtm-360.com/services" />
                <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
            </Helmet>

            {/* HERO SECTION */}
            <section className="section py-20 md:py-32 bg-white text-center">
                <div className="container max-w-4xl opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-8 text-[var(--color-primary)]">
                        What we help fix after diagnosis
                    </h1>
                    <h2 className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-normal">
                        Once the real GTM constraint is clear,<br className="hidden md:block" />
                        GTM-360 helps leadership teams realign the system —<br className="hidden md:block" />
                        so execution becomes predictable, not reactive.
                    </h2>
                    <p className="text-lg font-medium text-gray-500 uppercase tracking-widest">
                        These services are not meant to be picked blindly.<br />
                        Most teams begin with a Diagnostic to determine which — if any — apply.
                    </p>
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="section bg-gray-50">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {services.map((service, index) => (
                            <Link
                                key={index}
                                to={service.link}
                                className="group bg-white p-10 rounded-sm shadow-sm hover:shadow-md border border-gray-200 hover:border-[var(--color-primary)] transition-all duration-300 flex flex-col h-full"
                            >
                                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 mb-8 text-lg leading-relaxed flex-grow">
                                    {service.desc}
                                </p>
                                <div className="flex items-center text-[var(--color-primary)] font-medium group-hover:translate-x-2 transition-transform">
                                    Learn more <ArrowRight className="ml-2 w-5 h-5" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA BLOCK */}
            <section className="section py-24 bg-[var(--color-primary)] text-white text-center">
                <div className="container max-w-3xl">
                    <h2 className="text-3xl font-semibold mb-6">Not sure where to start?</h2>
                    <p className="text-xl text-indigo-100 mb-10 leading-relaxed">
                        Most teams begin with a short diagnostic<br />
                        to understand which system constraint is actually limiting growth.
                    </p>
                    <Link to="/diagnostic" className="btn bg-white text-[var(--color-primary)] hover:bg-opacity-90 px-10 py-4 text-lg">
                        Start with a Diagnostic
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Services;
