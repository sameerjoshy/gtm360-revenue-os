import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, CheckCircle2, AlertTriangle } from 'lucide-react';
import RevenueCalculator from '../components/tools/RevenueCalculator';
import LeadMagnet from '../components/marketing/LeadMagnet';

// This data would ideally move to a separate data file
const problemData = {
    "stalled-growth": {
        title: "Growth Stalled Despite Activity",
        symptom: "Busy everywhere, breakthrough nowhere.",
        diagnosis: "Your GTM operating system is efficient at generating noise, not signals.",
        solution: "Realign the operating model to focus on outcomes, not output.",
        stats: "Companies with aligned GTM systems grow 19% faster and are 15% more profitable."
    },
    "pipeline-conversion": {
        title: "Pipeline Exists, Conversion Weakens",
        symptom: "Lots of opportunities, very few closes.",
        diagnosis: "You have a definition problem. Your 'stages' track activity, not buyer evidence.",
        solution: "Implement evidence-based entrance/exit criteria for every deal stage.",
        stats: "Strict stage gates reduce sales cycles by 25% on average."
    },
    "forecast-volatility": {
        title: "Forecast Volatility",
        symptom: "Week 1 commit looks great. Week 12 is a disaster.",
        diagnosis: "Your forecast is based on rep optimism, not data validity.",
        solution: "Separate 'Forecast' (Math) from 'Commit' (Rep Pledge) and audit the gap.",
        stats: "93% of sales leaders cannot predict revenue within 5% accuracy."
    },
    // Add more mappings as needed
};

const ProblemDetail = () => {
    const { slug } = useParams();
    const data = problemData[slug];

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col">
                <h1 className="text-2xl font-bold mb-4">Problem Not Found</h1>
                <Link to="/problems" className="text-blue-600 hover:underline">Return to Problems</Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20">
            <Helmet>
                <title>{data.title} | GTM-360 Diagnostic</title>
                <meta name="description" content={`Fixing ${data.title}: ${data.diagnosis}`} />
            </Helmet>

            <div className="container max-w-4xl">
                <Link to="/problems" className="flex items-center text-gray-500 hover:text-[var(--color-primary)] mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to all problems
                </Link>

                <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase tracking-widest rounded-sm mb-6">
                    Symptom Analysis
                </span>

                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    {data.title}
                </h1>

                <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed">
                    "{data.symptom}"
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                    <div className="bg-slate-50 p-8 rounded border border-slate-200">
                        <div className="flex items-center gap-3 mb-4 text-red-600">
                            <AlertTriangle className="w-6 h-6" />
                            <h3 className="font-bold uppercase tracking-wide">The Misdiagnosis</h3>
                        </div>
                        <p className="text-lg text-gray-700">
                            Most teams think this is a <strong>personnel</strong> or <strong>effort</strong> issue. They try to fix it by hiring more reps or increasing activity quotas.
                        </p>
                    </div>

                    <div className="bg-slate-900 p-8 rounded border border-slate-800 text-white">
                        <div className="flex items-center gap-3 mb-4 text-[var(--color-primary)]">
                            <CheckCircle2 className="w-6 h-6" />
                            <h3 className="font-bold uppercase tracking-wide">The Root Cause</h3>
                        </div>
                        <p className="text-lg text-gray-300">
                            {data.diagnosis}
                        </p>
                    </div>
                </div>

                <div className="prose prose-lg max-w-none text-gray-700 mb-16">
                    <h3>Why this happens</h3>
                    <p>
                        In absence of structural clarity, entropy takes over. Systems naturally degrade into chaos unless energy is applied to organize them. {data.solution}
                    </p>
                    <blockquote>
                        {data.stats}
                    </blockquote>
                </div>

                {/* MICRO-CONVERSION IN CONTEXT */}
                <div className="my-16">
                    <RevenueCalculator />
                </div>

                {/* LEAD MAGNET */}
                <div className="my-16">
                    <LeadMagnet />
                </div>

            </div>
        </div>
    );
};

export default ProblemDetail;
