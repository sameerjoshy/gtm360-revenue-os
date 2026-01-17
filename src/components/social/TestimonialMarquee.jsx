import React from 'react';

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "CRO @ TechScale",
        quote: "We stopped guessing at our forecast. GTM360 gave us the mathematical certainty we were missing.",
        initials: "SJ"
    },
    {
        name: "David Chen",
        role: "VP Sales @ CloudFlow",
        quote: "The diagnostic found a $2M leak in our mid-funnel that we had completely ignored for two years.",
        initials: "DC"
    },
    {
        name: "Elena Rodriguez",
        role: "Founder @ Nexus AI",
        quote: "Finally, a system that connects marketing signal to sales action without the fluff.",
        initials: "ER"
    },
    {
        name: "Marcus Thorne",
        role: "RevOps Lead @ DataMesh",
        quote: "Our operating rhythm was broken. This framework fixed our weekly cadence in 30 days.",
        initials: "MT"
    },
    {
        name: "Jennifer Wu",
        role: "CMO @ Velocity",
        quote: "We replaced 3 agencies with one operating system. The clarity is worth 10x the investment.",
        initials: "JW"
    },
    {
        name: "Robert Alverez",
        role: "CEO @ PrimeStream",
        quote: "I sleep better knowing my revenue numbers are based on evidence, not rep optimism.",
        initials: "RA"
    },
    {
        name: "Amanda Cole",
        role: "VP Growth @ EcoSys",
        quote: "The deal velocity visualization changed how we run our Monday commits forever.",
        initials: "AC"
    },
    {
        name: "Thomas Wright",
        role: "Head of Sales @ InfraCore",
        quote: "Simple, brutal, effective. It forces you to look at the truth of your pipeline.",
        initials: "TW"
    },
    {
        name: "Lisa Chang",
        role: "COO @ VentureSoft",
        quote: "Aligning Product, Sales, and CS around a single data truth was the game changer.",
        initials: "LC"
    },
    {
        name: "James Wilson",
        role: "CRO @ FinEdge",
        quote: "The ROI was obvious by week 4. We recovered the cost of the engagement in one deal.",
        initials: "JW"
    }
];

const TestimonialMarquee = () => {
    return (
        <div className="w-full overflow-hidden bg-slate-900 py-16 border-y border-slate-800">
            <div className="container mb-8">
                <p className="text-center text-sm font-mono uppercase tracking-[0.2em] text-slate-500">
                    Trusted by Revenue Leaders
                </p>
            </div>

            <div className="relative w-full">
                {/* Gradient Masks for Fade Effort */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10"></div>

                {/* Marquee Track */}
                <div className="flex gap-6 animate-scroll w-max hover:[animation-play-state:paused]">
                    {/* Double the list to create seamless loop */}
                    {[...testimonials, ...testimonials].map((t, i) => (
                        <div
                            key={i}
                            className="w-[350px] bg-slate-800 p-6 rounded-sm border border-slate-700 flex-shrink-0 hover:border-blue-500 transition-colors cursor-default"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                                    {t.initials}
                                </div>
                                <div>
                                    <div className="text-white font-medium text-sm">{t.name}</div>
                                    <div className="text-slate-400 text-xs uppercase tracking-wide">{t.role}</div>
                                </div>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed italic">
                                "{t.quote}"
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    animation: scroll 40s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default TestimonialMarquee;
