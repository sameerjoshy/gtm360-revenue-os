import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import heroWarRoom from '../assets/hero_war_room.png';
import operatingBlueprint from '../assets/operating_model_blueprint.png';
import RevenueCalculator from '../components/tools/RevenueCalculator';
import TestimonialMarquee from '../components/social/TestimonialMarquee';
import VideoEmbed from '../components/media/VideoEmbed';

const Home = () => {
    return (
        <div className="home-page">
            <Helmet>
                <title>GTM360 | The Revenue Operating System</title>
                <meta name="description" content="When growth stalls, the problem is rarely effort. It's the GTM operating model. GTM360 helps leadership teams fix the decision systems that convert effort into revenue." />
                <meta property="og:title" content="GTM360 | The Revenue Operating System" />
                <meta property="og:description" content="We build revenue operating systems for B2B companies. Stop guessing, start engineering." />
                <meta property="og:image" content="https://gtm-360.com/assets/hero_war_room.png" />
                <meta property="og:url" content="https://gtm-360.com/" />
                <meta property="og:type" content="website" />
            </Helmet>
            {/* BLOCK 1: HERO */}
            <section className="section !pt-0 pb-24 md:pb-32" style={{ paddingTop: '0px' }}>
                <div className="container max-w-6xl"> {/* Widened container for better image fit */}
                    <div className="flex flex-col md:flex-row items-center gap-12 mt-16">
                        <div className="flex-1">
                            <h1 className="text-5xl md:text-6xl font-semibold leading-tight mb-6 text-[var(--color-primary)]">
                                When growth stalls, the problem is rarely effort. <br />
                                <span className="opacity-75">It’s the GTM operating model.</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl">
                                GTM360 helps leadership teams fix the decision systems that convert go-to-market effort into revenue.
                            </p>
                            <div className="text-sm font-semibold tracking-wide text-gray-400 uppercase mb-10">
                                GTM360 — Revenue OS
                            </div>

                            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                                <Link to="/problems" className="btn bg-[var(--color-primary)] text-white hover:bg-opacity-90 transition-all">
                                    Explore the GTM Operating Model →
                                </Link>
                                <Link to="/insights" className="text-[var(--color-primary)] font-medium hover:underline">
                                    See insights →
                                </Link>
                            </div>
                        </div>

                        {/* HERO IMAGE: Human War Room */}
                        <div className="flex-1 w-full relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                            <img
                                src={heroWarRoom}
                                alt="GTM360 War Room: Operators solving system problems"
                                className="relative rounded-lg shadow-2xl border border-gray-100 transform group-hover:scale-[1.01] transition duration-500"
                            />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-xs font-mono text-indigo-600 border border-indigo-100">
                                /// OPERATOR_VIEW_ACTIVE
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 2: MISDIAGNOSIS */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-6">Most stalled growth is misdiagnosed.</h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                When growth slows, companies respond predictably: more pipeline, more tools, more activity, more inspection.
                            </p>
                            <p className="text-lg text-gray-600 font-medium">
                                Teams stay busy. Dashboards fill up. Outcomes don’t compound.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-sm shadow-sm border-l-4 border-[var(--color-primary)]">
                            <p className="text-xl text-[var(--color-primary)] leading-relaxed">
                                In most cases, the issue isn’t talent or effort. <br /><br />
                                It’s that the GTM system is quietly enforcing the wrong decisions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 2.5: SOCIAL PROOF */}
            <TestimonialMarquee />

            {/* BLOCK 2.6: FOUNDER MEMO (VIDEO) */}
            <section className="section bg-white border-b border-gray-100">
                <div className="container max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <span className="text-[var(--color-primary)] font-mono text-xs tracking-widest uppercase mb-4 block">
                                Founder's Memo
                            </span>
                            <h2 className="text-3xl font-semibold mb-6">
                                Why I left traditional consulting to build a Revenue OS.
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                "I watched too many smart leadership teams burn out trying to fix revenue problems with more calls, more pressure, and more dashboards.
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                The truth is, most growth problems aren't people problems. They are system problems. I built GTM-360 to give leaders the engineering controls they need to actually fix the engine."
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
                                    {/* Placeholder Avatar - Replace with actual headshot */}
                                    <div className="w-full h-full bg-slate-300 flex items-center justify-center text-slate-500 font-bold">S</div>
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">Sameer</p>
                                    <p className="text-sm text-gray-500">Founder, GTM-360</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            {/* VIDEO EMBED */}
                            <VideoEmbed
                                videoId="M7lc1UVf-VE"
                                title="Why GTM-360 Exists"
                            />
                            {/* Decorative Elements */}
                            <div className="absolute -z-10 top-6 -right-6 w-full h-full border-2 border-[var(--color-secondary)] rounded-sm"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 3: FAILURE PATTERNS */}
            <section className="section">
                <div className="container">
                    <h2 className="text-3xl font-semibold mb-12">What this looks like inside real companies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            "Busy everywhere, breakthrough nowhere",
                            "Pipeline exists, conversion weakens",
                            "Deals stall late “without a clear reason”",
                            "Forecasts explain the past, not guide action",
                            "Leaders disagree on what’s actually wrong",
                            "AI and tools add noise, not leverage"
                        ].map((item, i) => (
                            <div key={i} className="border-t-2 border-[var(--color-secondary)] pt-4">
                                <p className="text-lg text-gray-800">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MICRO-CONVERSION: CALCULATOR */}
            <section className="section py-20 bg-gray-50">
                <div className="container max-w-4xl">
                    <RevenueCalculator />
                </div>
            </section>

            {/* BLOCK 4: GTM OPERATING MODEL */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container">
                    <div className="max-w-3xl">
                        <h2 className="text-3xl md:text-4xl font-semibold text-[var(--color-primary)] mb-8">
                            Go-to-market is an operating model — not a set of functions.
                        </h2>
                        <p className="text-lg text-gray-700 mb-6">
                            Growth is governed by a system: how focus is set, how decisions propagate, how execution flows, and how leaders see what matters in time to act.
                        </p>
                        <p className="text-lg text-gray-700 mb-8">
                            When that system degrades, effort stops converting into outcomes — no matter how hard teams push. <br />
                            GTM360 exists to fix that layer.
                        </p>
                        <Link to="/problems" className="text-[var(--color-primary)] font-semibold text-lg hover:underline inline-flex items-center">
                            Understand the GTM Operating Model →
                        </Link>
                    </div>

                    {/* MODEL VISUAL: System Blueprint */}
                    <div className="mt-16 flex justify-center">
                        <div className="relative max-w-4xl shadow-2xl rounded-sm overflow-hidden border border-gray-200">
                            <img src={operatingBlueprint} alt="GTM System Architecture Blueprint" className="w-full" />
                            <div className="absolute inset-0 border-4 border-white/10 pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 5: WHAT CHANGES */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h2 className="text-3xl font-semibold mb-6">What changes when the system is fixed</h2>
                            <ul className="space-y-4">
                                {[
                                    "Clearer priorities and fewer competing initiatives",
                                    "Stronger decision quality across the funnel",
                                    "Faster execution with fewer late-stage surprises",
                                    "Improved predictability in revenue outcomes",
                                    "Leadership confidence and control restored"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start">
                                        <span className="mr-3 text-[var(--color-primary)]">•</span>
                                        <span className="text-lg text-gray-700">{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="mt-6 text-sm text-gray-500 italic">Not overnight. Not all at once. But measurably.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 6: CASE HIGHLIGHTS */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container">
                    <div className="flex justify-between items-end mb-12">
                        <h2 className="text-3xl font-semibold max-w-xl">Seen this before. Fixed it without breaking what worked.</h2>
                        <Link to="/insights" className="hidden md:inline-block text-[var(--color-primary)] font-medium hover:underline">
                            Explore insights →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                symptom: "Growth slowed despite rising activity",
                                reality: "Decision decay across the GTM system",
                                outcome: "Restored focus, improved conversion, regained confidence"
                            },
                            {
                                symptom: "Lead generation problem that wasn't",
                                reality: "Weak customer cohorting and generic value",
                                outcome: "Fewer campaigns, higher signal quality"
                            },
                            {
                                symptom: "Forecast volatility in scaled org",
                                reality: "Inspection was backward-looking",
                                outcome: "Earlier risk surfacing, improved predictability"
                            }
                        ].map((card, i) => (
                            <div key={i} className="bg-white p-8 rounded-sm shadow-sm flex flex-col h-full border-t-4 border-transparent hover:border-[var(--color-primary)] transition-all">
                                <div className="mb-4">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Symptom</span>
                                    <p className="font-medium text-gray-900 mt-1">{card.symptom}</p>
                                </div>
                                <div className="mb-4">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Reality</span>
                                    <p className="font-medium text-[var(--color-primary)] mt-1">{card.reality}</p>
                                </div>
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Outcome</span>
                                    <p className="text-sm text-gray-600 mt-1">{card.outcome}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 md:hidden">
                        <Link to="/insights" className="text-[var(--color-primary)] font-medium hover:underline">
                            Explore insights →
                        </Link>
                    </div>
                </div>
            </section>

            {/* BLOCK 7: WHO THIS IS FOR */}
            <section className="section">
                <div className="container">
                    <h2 className="text-3xl font-semibold mb-12 text-center">Who we work with</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16 border-t md:border-t-0 border-gray-200">
                        <div className="py-8 border-b md:border-b-0 md:border-r border-gray-200 pr-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">This is for you if</h3>
                            <ul className="space-y-3">
                                {['Growth has slowed for structural reasons', 'You suspect the system, not the people', 'You want clarity before adding more effort'].map(i => (
                                    <li key={i} className="flex items-start text-gray-700">
                                        <span className="text-green-600 mr-2">✓</span> {i}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="py-8 pl-0 md:pl-8">
                            <h3 className="text-xl font-semibold text-gray-500 mb-6">This is not for you if</h3>
                            <ul className="space-y-3">
                                {['You’re looking for a lead-gen vendor', 'You want a quick tool rollout', 'You’re seeking a transformation program'].map(i => (
                                    <li key={i} className="flex items-start text-gray-500">
                                        <span className="text-gray-400 mr-2">×</span> {i}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 8: FINAL CTA */}
            <section className="section bg-[var(--color-primary)] text-white text-center py-24">
                <div className="container max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Fix the system before adding more force.</h2>
                    <p className="text-lg text-indigo-100 mb-10">
                        The first conversation is diagnostic. No pitch. No framework. No obligation.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/contact" className="btn bg-white text-[var(--color-primary)] hover:bg-gray-100">
                            Start a conversation →
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

export default Home;
