import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertCircle, BarChart2, Activity, PieChart, Users, MessageSquare, Target, Cpu } from 'lucide-react';

const Problems = () => {
    // 1. SEO + AEO FOUNDATION
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Common GTM Problems in B2B Growth",
        "about": {
            "@type": "Thing",
            "name": "Go-to-Market failures, revenue predictability, misdiagnosis"
        },
        "description": "Common B2B GTM problems often persist because teams misdiagnose the real constraint. Explore the patterns behind stalled growth."
    };

    const symptoms = [
        {
            icon: <Activity className="w-8 h-8 text-[var(--color-primary)]" />,
            title: "Pipeline is growing, but revenue isn’t",
            slug: "stalled-growth",
            desc: "More leads and more activity haven’t translated into predictable growth. This usually signals a decision or qualification problem, not a volume problem."
        },
        {
            icon: <Target className="w-8 h-8 text-[var(--color-primary)]" />,
            title: "Win rates are falling",
            slug: "pipeline-conversion",
            desc: "Deals are entering the funnel but closing less often. This often points to misaligned ICP, messaging, or buyer ownership — not sales effort."
        },
        {
            icon: <BarChart2 className="w-8 h-8 text-[var(--color-primary)]" />,
            title: "Forecasts are unreliable",
            slug: "forecast-volatility",
            desc: "Numbers change week to week and confidence is low. Forecasting issues are usually downstream of signal and stage definition problems."
        },
        // ... mapped to existing slugs, others fallback to diagnostic for now
        {
            icon: <PieChart className="w-8 h-8 text-[var(--color-primary)]" />,
            title: "Sales cycles keep getting longer",
            slug: "pipeline-conversion", // Sharing slug for similar pattern
            desc: "Opportunities move, but at a slower and less predictable pace. Longer cycles often indicate unclear buyer decisions, not deal complexity."
        },
        {
            icon: <Users className="w-8 h-8 text-[var(--color-primary)]" />,
            title: "Marketing and sales disagree on quality",
            slug: "stalled-growth", // Sharing slug
            desc: "Leads look good in dashboards but break down in execution. This is often a system alignment issue, not a team alignment issue."
        },
        {
            icon: <MessageSquare className="w-8 h-8 text-[var(--color-primary)]" />,
            title: "Messaging isn’t landing in real deals",
            slug: "pipeline-conversion", // Sharing slug
            desc: "Positioning sounds strong, but buyers don’t internalize urgency. This usually reflects a problem-ownership mismatch, not a copy problem."
        },
        {
            icon: <AlertCircle className="w-8 h-8 text-[var(--color-primary)]" />,
            title: "RevOps dashboards don’t drive decisions",
            slug: "forecast-volatility", // Sharing slug
            desc: "Metrics are abundant, but decisions still rely on opinion. This typically means signals are being tracked without a governing model."
        },
        {
            icon: <Cpu className="w-8 h-8 text-[var(--color-primary)]" />,
            title: "Tools and AI increased noise, not clarity",
            slug: "stalled-growth", // Sharing slug
            desc: "New tools promised leverage but added complexity. Technology amplifies systems — it does not correct misdiagnosis."
        }
    ];

    return (
        <div className="problems-page">
            <Helmet>
                <title>Why B2B Growth Stalls Even When Teams Execute | GTM-360</title>
                <meta name="description" content="Common B2B GTM problems often persist because teams misdiagnose the real constraint. Explore the patterns behind stalled growth." />
                <link rel="canonical" href="https://gtm-360.com/problems" />
                <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
            </Helmet>

            {/* 2. HERO SECTION */}
            <section className="section py-20 md:py-32 bg-white text-center">
                <div className="container max-w-4xl opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-8 text-[var(--color-primary)]">
                        Why B2B growth stalls even when teams execute
                    </h1>
                    <h2 className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-normal">
                        Most go-to-market problems persist not because teams lack effort,<br className="hidden md:block" />
                        but because the problem being solved is not the real one.
                        <br /><br />
                        This page outlines the most common failure patterns we see in B2B GTM systems.
                    </h2>
                    <p className="text-lg font-medium text-gray-500 uppercase tracking-widest">
                        These are not isolated issues.<br />
                        They are symptoms of deeper system constraints.
                    </p>
                </div>
            </section>

            {/* 3. ORIENTING STATEMENT */}
            <section className="section bg-gray-50">
                <div className="container max-w-3xl text-center">
                    <h3 className="text-sm font-bold uppercase text-gray-400 mb-6 tracking-widest">A quick note before you read on</h3>
                    <div className="bg-white p-8 border-l-4 border-[var(--color-primary)] shadow-sm text-left">
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            If you’re experiencing one or more of the patterns below,
                            it does not mean your team is underperforming.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed mb-4">
                            In most cases, capable teams are executing against
                            an incomplete or incorrect understanding of the problem.
                        </p>
                        <p className="text-lg font-medium text-gray-900 leading-relaxed">
                            This page is designed to help you recognize those patterns —
                            not to prescribe fixes.
                        </p>
                    </div>
                </div>
            </section>

            {/* 4. SYMPTOM GRID */}
            <section className="section">
                <div className="container">
                    <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-12 text-center">Common GTM failure patterns</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {symptoms.map((symptom, index) => (
                            <Link
                                key={index}
                                to={`/problems/${symptom.slug}`}
                                className="group block bg-white border border-gray-200 p-8 rounded-sm hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300"
                            >
                                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {symptom.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                                    {symptom.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {symptom.desc}
                                </p>
                                <div className="flex items-center text-[var(--color-primary)] font-medium text-sm group-hover:underline">
                                    Understand what’s actually happening <ArrowRight size={16} className="ml-2" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. MISDIAGNOSIS FRAMING */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container max-w-4xl text-center">
                    <h2 className="text-sm font-bold uppercase text-gray-400 mb-6 tracking-widest">Why these problems persist</h2>
                    <p className="text-2xl font-medium text-[var(--color-primary)] leading-relaxed mb-12">
                        In most B2B organizations, these patterns persist because<br className="hidden md:block" />
                        teams respond by increasing effort:
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                        {["more pipeline", "more tools", "more process", "more pressure"].map(item => (
                            <div key={item} className="bg-white py-4 px-2 rounded-sm font-bold text-gray-500 shadow-sm border border-gray-100">
                                {item}
                            </div>
                        ))}
                    </div>

                    <p className="text-xl text-gray-800 leading-relaxed max-w-2xl mx-auto">
                        When the underlying constraint is misunderstood,<br />
                        additional effort often compounds the problem.
                    </p>
                </div>
            </section>

            {/* 7. SOFT TRANSITION */}
            <section className="section bg-white border-t border-gray-100">
                <div className="container max-w-4xl text-center">
                    <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-8">A better way to start</h2>
                    <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                        Before making another hire, tool investment, or execution push,<br className="hidden md:block" />
                        many leadership teams choose to start with a short diagnostic.
                    </p>
                    <p className="text-xl text-gray-900 font-medium mb-12">
                        Not to commit to a solution —<br />
                        but to ensure they are fixing the right problem first.
                    </p>
                    <Link to="/diagnostic" className="btn bg-[var(--color-primary)] text-white hover:bg-opacity-90 px-12">
                        Start with a Diagnostic
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Problems;
