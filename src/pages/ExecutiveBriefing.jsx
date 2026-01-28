import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertTriangle, TrendingUp, Shield, Activity, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

const ExecutiveBriefing = () => {
    const [loading, setLoading] = useState(false);
    const [briefing, setBriefing] = useState(null);
    const [steps, setSteps] = useState([]);

    const runBriefing = async () => {
        setLoading(true);
        setSteps([]);
        setBriefing(null);

        // Simulate "Reading" files
        const fakeSteps = [
            "Accessing Outbound Swarm Logs...",
            "Analyzing Pipeline Risks (Sales Swarm)...",
            "Checking Expansion Signals (CS Swarm)...",
            "Synthesizing Strategic Memo..."
        ];

        for (const step of fakeSteps) {
            setSteps(prev => [...prev, step]);
            await new Promise(r => setTimeout(r, 800));
        }

        try {
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const res = await fetch(`${API_BASE}/api/executive/briefing/generate`, { method: 'POST' });
            const data = await res.json();
            setBriefing(data);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } catch (e) {
            console.error("Briefing failed", e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Header */}
            <div className="mb-10 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-slate-900 text-white rounded-2xl mb-4 shadow-lg">
                    <FileText size={32} />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Executive Briefing</h1>
                <p className="text-slate-500 text-lg">Your Monday Morning "State of Revenue" Memo.</p>
            </div>

            {/* Empty State / CTA */}
            {!briefing && !loading && (
                <div className="text-center p-12 bg-white rounded-2xl border border-dashed border-slate-300 shadow-sm">
                    <p className="text-slate-500 mb-6">Ready to synthesize intelligence from all 5 active agents?</p>
                    <button
                        onClick={runBriefing}
                        className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transform transition-all active:scale-95 shadow-xl shadow-slate-200"
                    >
                        Generate Weekly Briefing
                    </button>
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Activity className="animate-pulse text-indigo-500" /> Working...
                    </h3>
                    <div className="space-y-3">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex items-center gap-3 text-sm text-slate-600"
                            >
                                <CheckCircle size={14} className="text-emerald-500" />
                                {step}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* The Memo (Axios Style) */}
            {briefing && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden"
                >
                    {/* Memo Head */}
                    <div className="bg-slate-50 border-b border-slate-200 p-8">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Internal Only • Confidential</p>
                                <h2 className="text-3xl font-serif font-bold text-slate-900 leading-tight">{briefing.subject}</h2>
                            </div>
                            <Calendar className="text-slate-400" />
                        </div>
                        <div className="mt-6 pl-4 border-l-4 border-indigo-500">
                            <h4 className="font-bold text-slate-900 text-sm uppercase mb-1">TL;DR</h4>
                            <p className="text-slate-700 text-lg leading-relaxed">{briefing.tldr}</p>
                        </div>
                    </div>

                    {/* Memo Body */}
                    <div className="p-8 space-y-10">
                        {briefing.sections.map((section, i) => (
                            <div key={i}>
                                <h3 className="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">
                                    {section.title}
                                </h3>
                                <ul className="space-y-3">
                                    {section.bullets.map((bullet, j) => (
                                        <li key={j} className="flex items-start gap-3 text-slate-700 leading-relaxed">
                                            <span className="mt-2 w-1.5 h-1.5 bg-slate-400 rounded-full flex-shrink-0" />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Recommendations */}
                        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
                            <h3 className="text-indigo-900 font-bold mb-4 flex items-center gap-2">
                                <Shield size={18} /> Strategic Recommendations
                            </h3>
                            <div className="grid gap-4 md:grid-cols-3">
                                {briefing.recommendations.map((rec, i) => (
                                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-indigo-100">
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">{rec.owner}</p>
                                        <h4 className="font-bold text-slate-900 mb-2">{rec.action}</h4>
                                        <p className="text-xs text-slate-600 leading-snug">{rec.rationale}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ExecutiveBriefing;
