import React from 'react';
import { Link } from 'react-router-dom';

const HowWeWork = () => {
    return (
        <div className="how-we-work-page">
            {/* BLOCK 1: ORIENTATION */}
            <section className="section py-24 md:py-32">
                <div className="container max-w-4xl opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-8 text-[var(--color-primary)]">
                        How we work is as important as what we fix.
                    </h1>
                    <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                        When growth stalls, organizations don’t need more activity. They need clarity — about what’s broken, what’s working, and what to change first.
                    </p>
                    <p className="text-xl text-gray-700 leading-relaxed">
                        Our work is designed to bring that clarity without disrupting what already works. No theatrics. No mass change programs. No unnecessary complexity.
                    </p>
                </div>
            </section>

            {/* BLOCK 2: OUR CORE BELIEF */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container max-w-4xl">
                    <h2 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest">Our Belief</h2>
                    <p className="text-2xl font-medium text-gray-800 leading-normal border-l-4 border-[var(--color-primary)] pl-8 py-2">
                        Most GTM problems persist not because teams don’t work hard, but because the system does not reliably surface the right information, enable the right decisions, or enforce them consistently.
                    </p>
                    <p className="mt-8 text-lg text-gray-600">
                        We focus on fixing the system around decisions — so execution improves naturally.
                    </p>
                </div>
            </section>

            {/* BLOCK 3: THE PLANNING CYCLE */}
            <section className="section">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-4">Our planning cycle</h2>
                        <p className="text-lg text-gray-600">Every engagement follows the same simple logic.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                        {/* Creating a visual loop effect with CSS borders/connectors is complex for text-only. Using a clean step layout. */}
                        {[
                            { number: "01", question: "Where are we right now?", desc: "Establish a shared, objective view of reality." },
                            { number: "02", question: "What got us here?", desc: "Understand which decisions shaped current outcomes." },
                            { number: "03", question: "Where do we want to go?", desc: "Define the next state with focus — not ambition overload." },
                            { number: "04", question: "How do we get there?", desc: "Identify the few system changes that will create leverage." },
                            { number: "05", question: "Are we getting there?", desc: "Put governance in place to inspect, reinforce, and course-correct." }
                        ].map((step, i) => (
                            <div key={i} className="relative p-6 bg-white border border-gray-100 shadow-sm rounded-sm hover:-translate-y-1 transition-transform">
                                <div className="text-4xl font-bold text-gray-100 mb-4">{step.number}</div>
                                <h3 className="text-lg font-bold text-[var(--color-primary)] mb-2 leading-tight">{step.question}</h3>
                                <p className="text-sm text-gray-600">{step.desc}</p>
                                {i < 4 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 text-gray-300 z-10">→</div>
                                )}
                            </div>
                        ))}
                    </div>
                    <p className="text-center mt-12 text-sm text-gray-400 uppercase tracking-widest">This cycle keeps work grounded, focused, and repeatable.</p>
                </div>
            </section>

            {/* BLOCK 4: HOW DIAGNOSIS ACTUALLY WORKS */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-6">How we diagnose</h2>
                            <p className="text-lg text-gray-700 mb-6">
                                We don’t start with solutions. We start by understanding how decisions are currently made and enforced.
                            </p>
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center text-gray-700 bg-white p-4 rounded-sm shadow-sm">
                                    <span className="text-[var(--color-primary)] mr-3">1.</span> Leadership conversations across functions
                                </div>
                                <div className="flex items-center text-gray-700 bg-white p-4 rounded-sm shadow-sm">
                                    <span className="text-[var(--color-primary)] mr-3">2.</span> Review of GTM signals, rhythms, and artifacts
                                </div>
                                <div className="flex items-center text-gray-700 bg-white p-4 rounded-sm shadow-sm">
                                    <span className="text-[var(--color-primary)] mr-3">3.</span> Pressure-testing assumptions behind stalled outcomes
                                </div>
                            </div>
                            <p className="text-gray-600 italic">
                                The goal is not analysis for its own sake, but to surface where the system is quietly constraining progress.
                            </p>
                        </div>
                        {/* Schematic */}
                        <div className="border border-gray-200 p-8 rounded-sm bg-gray-50 flex justify-center items-center">
                            <div className="flex items-center space-x-4">
                                <div className="text-center">
                                    <div className="text-xs font-bold uppercase text-gray-400 mb-2">Inputs</div>
                                    <div className="w-16 h-16 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm">Raw Data</div>
                                </div>
                                <div className="text-gray-300">→</div>
                                <div className="text-center">
                                    <div className="text-xs font-bold uppercase text-gray-400 mb-2">Process</div>
                                    <div className="w-24 h-24 bg-white rounded-full border-2 border-[var(--color-primary)] flex items-center justify-center shadow-md font-bold text-[var(--color-primary)]">Insight</div>
                                </div>
                                <div className="text-gray-300">→</div>
                                <div className="text-center">
                                    <div className="text-xs font-bold uppercase text-gray-400 mb-2">Output</div>
                                    <div className="w-16 h-16 bg-white rounded-full border border-gray-200 flex items-center justify-center shadow-sm">Constraints</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 5 & 6: DESIGN & GOVERNANCE */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* How Changes are Designed */}
                        <div>
                            <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-6">How changes are designed</h2>
                            <p className="text-lg text-gray-700 mb-6">
                                We don’t impose frameworks or replace teams. Interventions are:
                            </p>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "co-designed with leaders and operators",
                                    "targeted to specific pressure points",
                                    "sequenced to avoid disruption"
                                ].map(item => (
                                    <li key={item} className="flex items-start text-gray-700">
                                        <span className="text-[var(--color-primary)] mr-2 font-bold">•</span> {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600">
                                We focus on changing how decisions flow through the system, not adding new layers of process.
                            </p>
                        </div>

                        {/* How Changes Stick */}
                        <div>
                            <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-6">How changes stick</h2>
                            <p className="text-lg text-gray-700 mb-6">
                                Most GTM fixes fail not in design, but in reinforcement. We help teams put in place:
                            </p>
                            <ul className="space-y-3 mb-8">
                                {[
                                    "clear decision ownership",
                                    "inspection rhythms that surface issues early",
                                    "governance that reinforces focus over time"
                                ].map(item => (
                                    <li key={item} className="flex items-start text-gray-700">
                                        <span className="text-[var(--color-primary)] mr-2 font-bold">•</span> {item}
                                    </li>
                                ))}
                            </ul>
                            <p className="text-gray-600">
                                This is how improvements persist — without constant external involvement.
                            </p>
                            <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between text-xs text-gray-400 uppercase tracking-widest">
                                <span>Design</span><span>Execute</span><span>Inspect</span><span>Adjust</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 7: WHAT WE AVOID */}
            <section className="section bg-gray-900 text-gray-300">
                <div className="container">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-semibold text-white mb-8">What we deliberately avoid</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-left inline-block">
                            {[
                                "re-orgs and large-scale transformations",
                                "generic playbooks or methodologies",
                                "activity inflation disguised as progress",
                                "tool-led fixes without system clarity"
                            ].map(item => (
                                <div key={item} className="flex items-center">
                                    <span className="text-red-400 mr-3 text-xl">×</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                        <p className="mt-12 text-gray-500 italic">If those are the outcomes you’re looking for, we’re not the right partner.</p>
                    </div>
                </div>
            </section>

            {/* BLOCK 8: WHAT IT FEELS LIKE */}
            <section className="section">
                <div className="container text-center">
                    <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-12">What working together feels like</h2>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {[
                            "focused, not frantic",
                            "structured, not bureaucratic",
                            "collaborative, not prescriptive",
                            "honest about trade-offs"
                        ].map(item => (
                            <div key={item} className="text-xl font-medium text-gray-700">
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BLOCK 9: ROUTING TO PROOF */}
            <section className="section bg-[var(--color-secondary)] text-center">
                <div className="container">
                    <h2 className="text-2xl font-semibold mb-6">See how this approach plays out in practice</h2>
                    <Link to="/insights" className="text-[var(--color-primary)] font-semibold text-lg hover:underline inline-flex items-center">
                        Explore insights →
                    </Link>
                </div>
            </section>

            {/* BLOCK 10: CTA */}
            <section className="section bg-[var(--color-primary)] text-white text-center py-24">
                <div className="container max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Start with clarity, not commitment.</h2>
                    <p className="text-lg text-indigo-100 mb-10">
                        The first conversation is about understanding the system — not pitching solutions.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/contact" className="btn bg-white text-[var(--color-primary)] hover:bg-gray-100">
                            Start a diagnostic conversation →
                        </Link>
                        <Link to="/problems" className="btn border border-white text-white hover:bg-indigo-900">
                            Problems we solve →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HowWeWork;
