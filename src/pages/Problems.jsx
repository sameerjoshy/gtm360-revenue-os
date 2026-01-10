import React from 'react';
import { Link } from 'react-router-dom';

const Problems = () => {
    return (
        <div className="problems-page">
            {/* BLOCK 1: INTRO */}
            <section className="section py-24 md:py-32">
                <div className="container max-w-4xl opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-8 text-[var(--color-primary)]">
                        The problems we solve are rarely the ones companies think they have.
                    </h1>
                    <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                        When growth slows, symptoms show up everywhere — pipeline, win rates, cycle time, forecasts, execution quality.
                    </p>
                    <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                        Most teams respond by fixing what’s visible. We focus on what’s structural.
                    </p>
                    <div className="bg-[var(--color-secondary)] p-8 rounded-sm mt-8 border-l-4 border-[var(--color-primary)]">
                        <p className="text-lg text-gray-800">
                            At GTM360, we work on the <span className="font-semibold text-[var(--color-primary)]">GTM operating model</span> — the system that governs how focus is set, how decisions propagate, how execution flows, and how leaders see what matters in time to act.
                        </p>
                    </div>
                </div>
            </section>

            {/* BLOCK 2: WHAT IS A GTM OPERATING MODEL */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-6">What we mean by a GTM operating model</h2>
                            <p className="text-lg text-gray-700 mb-6">
                                A GTM operating model is not your org chart, tools, or sales methodology.
                            </p>
                            <p className="text-lg text-gray-700 mb-6">
                                It is the system that determines:
                            </p>
                            <ul className="space-y-3 mb-6">
                                {['what the organization focuses on', 'how decisions are made and enforced', 'how work moves across functions', 'how leaders gain visibility early enough to intervene'].map(item => (
                                    <li key={item} className="flex items-start">
                                        <span className="text-[var(--color-primary)] mr-2">•</span>
                                        <span className="text-gray-800">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-lg text-gray-700 font-medium">
                                When this system works, effort compounds. When it degrades, activity increases and outcomes stall.
                            </p>
                        </div>

                        {/* System Schematic */}
                        <div className="bg-white p-12 rounded-sm shadow-sm flex flex-col items-center justify-center space-y-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-500 uppercase tracking-widest text-center">
                                <span>Markets</span>
                                <span>•</span>
                                <span>Customers</span>
                                <span>•</span>
                                <span>Signals</span>
                            </div>
                            <div className="text-gray-300">↓</div>
                            <div className="border-2 border-[var(--color-primary)] px-8 py-4 rounded text-[var(--color-primary)] font-bold text-xl tracking-wide">
                                GTM OPERATING MODEL
                            </div>
                            <div className="text-gray-300">↓</div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 uppercase tracking-widest text-center">
                                <span>Revenue</span>
                                <span>•</span>
                                <span>Predictability</span>
                                <span>•</span>
                                <span>Confidence</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 3: THE FOUR LAYERS */}
            <section className="section">
                <div className="container">
                    <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-12 text-center">The four layers that determine GTM performance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Focus",
                                desc: "What the organization is truly oriented around — not what it says it prioritizes.",
                                break: ["teams chase too many segments", "ICP drifts quietly", "resources spread thin without leverage"]
                            },
                            {
                                title: "Alignment",
                                desc: "How decisions and priorities propagate across functions.",
                                break: ["marketing, sales, product, and CS optimize locally", "handoffs create friction", "leaders disagree on root causes"]
                            },
                            {
                                title: "Execution",
                                desc: "How work actually moves — or leaks — through the system.",
                                break: ["deals stall late", "cycles stretch unpredictably", "teams do more work for diminishing returns"]
                            },
                            {
                                title: "Visibility",
                                desc: "What leaders can see, understand, and act on in time.",
                                break: ["dashboards explain the past", "risks surface too late", "decisions get revisited instead of enforced"]
                            }
                        ].map((layer, i) => (
                            <div key={i} className="border border-gray-200 p-8 rounded-sm hover:border-[var(--color-primary)] transition-colors">
                                <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-3">{layer.title}</h3>
                                <p className="text-gray-700 mb-6 min-h-[3rem]">{layer.desc}</p>
                                <div className="bg-gray-50 p-4 rounded text-sm">
                                    <span className="block text-xs font-bold text-gray-400 uppercase mb-2">When {layer.title.toLowerCase()} breaks:</span>
                                    <ul className="space-y-1">
                                        {layer.break.map(b => (
                                            <li key={b} className="text-gray-600 flex items-start">
                                                <span className="mr-2 text-red-400">×</span> {b}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BLOCK 4: COMMON FAILURE PATTERNS */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container max-w-4xl">
                    <h2 className="text-3xl font-semibold mb-8">How GTM operating model failures show up</h2>
                    <div className="space-y-4 mb-8">
                        {[
                            "Growth slows despite rising activity",
                            "Pipeline exists, but conversion weakens",
                            "Deals stall late without clear blockers",
                            "Forecasts fluctuate quarter to quarter",
                            "Leaders debate explanations instead of actions",
                            "New tools and AI amplify noise, not clarity"
                        ].map((pattern, i) => (
                            <div key={i} className="bg-white p-4 rounded-sm shadow-sm border-l-2 border-gray-300">
                                <p className="text-lg text-gray-800">{pattern}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-lg text-gray-600 italic border-l-4 border-gray-400 pl-4">
                        These are not isolated issues. They are symptoms of the same underlying system decay.
                    </p>
                </div>
            </section>

            {/* BLOCK 5: WHERE WE INTERVENE */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-6">Where we intervene — and where we don’t</h2>
                            <p className="text-lg text-gray-700 mb-8">
                                We do not overhaul everything. We identify and fix the few pressure points that restore leverage across the system.
                            </p>

                            <h3 className="text-lg font-bold text-gray-900 mb-4">Intervention areas</h3>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "How stage progression decisions are made",
                                    "How buying groups are identified and engaged",
                                    "How champions are enabled to sell internally",
                                    "How value and risk are surfaced early",
                                    "How execution is governed and inspected"
                                ].map(item => (
                                    <li key={item} className="flex items-start text-gray-700">
                                        <span className="text-green-600 mr-2">✓</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-gray-50 p-8 rounded-sm h-fit">
                            <h3 className="text-lg font-bold text-gray-500 mb-4">What we avoid</h3>
                            <ul className="space-y-3">
                                {[
                                    "re-orgs",
                                    "blanket process rollouts",
                                    "generic enablement",
                                    "tool-led fixes without system clarity"
                                ].map(item => (
                                    <li key={item} className="flex items-start text-gray-500">
                                        <span className="text-gray-400 mr-2">×</span> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 6: AI & TOOLS */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-6">Our view on AI and tools</h2>
                            <p className="text-lg text-gray-700 mb-6">
                                AI and tools do not fix GTM systems. They amplify them.
                            </p>
                            <div className="bg-white p-6 rounded-sm shadow-sm border-l-4 border-yellow-400 mb-6">
                                <p className="text-gray-800">
                                    When the operating model is unclear, automation magnifies noise, accelerates bad decisions, and creates false confidence.
                                </p>
                            </div>
                            <p className="text-lg text-gray-700">
                                We work with teams to identify where intelligence actually matters, fix decision clarity first, and apply automation only where it increases leverage.
                            </p>
                        </div>
                        <div className="grid grid-rows-2 gap-4">
                            <div className="bg-gray-200 p-8 rounded text-center opacity-70">
                                <div className="text-sm font-bold uppercase text-gray-500 mb-2">Automation without clarity</div>
                                <div className="text-2xl font-bold text-gray-400">NOISE</div>
                            </div>
                            <div className="bg-[var(--color-primary)] p-8 rounded text-center">
                                <div className="text-sm font-bold uppercase text-indigo-200 mb-2">Automation with clarity</div>
                                <div className="text-2xl font-bold text-white">LEVERAGE</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 7: PROBLEMS -> PROOF */}
            <section className="section">
                <div className="container">
                    <h2 className="text-3xl font-semibold mb-8">How this shows up in real engagements</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                        {[
                            "Growth slowdown misdiagnosed as pipeline problem",
                            "“Lead gen issue” that turned out to be decision decay",
                            "Forecast volatility caused by weak execution governance",
                            "AI mandate that required system redesign first"
                        ].map((item, i) => (
                            <div key={i} className="border-b border-gray-100 pb-4">
                                <Link to="/insights" className="text-lg text-[var(--color-primary)] hover:underline block">
                                    {item} →
                                </Link>
                            </div>
                        ))}
                    </div>
                    <Link to="/insights" className="btn border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white">
                        Explore insights →
                    </Link>
                </div>
            </section>

            {/* BLOCK 8: CTA */}
            <section className="section bg-[var(--color-primary)] text-white text-center py-24">
                <div className="container max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">If these patterns feel familiar, start with the system.</h2>
                    <p className="text-lg text-indigo-100 mb-10">
                        The first conversation focuses on diagnosis — not solutions. We map what’s breaking, what’s working, and where intervention actually matters.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/contact" className="btn bg-white text-[var(--color-primary)] hover:bg-gray-100">
                            Start a diagnostic conversation →
                        </Link>
                        <Link to="/how-we-work" className="btn border border-white text-white hover:bg-indigo-900">
                            How we work →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Problems;
