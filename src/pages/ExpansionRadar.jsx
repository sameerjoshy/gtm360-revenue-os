
import React, { useState } from 'react';
import { TrendingUp, Users, Zap, CheckCircle, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ExpansionRadar = () => {
    const [domain, setDomain] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleScan = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);

        try {
            // Call the new Mock Agent Endpoint
            // In a real app this would go through a service layer, but fetch is fine for V1
            const response = await fetch(`/api/cs/expansion/${domain}`, { method: 'POST' });
            const data = await response.json();

            // Simulate a "Radar Sweep" delay for effect
            setTimeout(() => {
                setResult(data);
                setIsLoading(false);
            }, 1500);

        } catch (error) {
            console.error("Scan failed", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
            <header className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    <TrendingUp className="text-indigo-600" size={32} />
                    Expansion Radar
                </h1>
                <p className="text-slate-500 mt-2 text-lg">
                    Detect upsell signals based on usage telemetry and feature constraints.
                </p>
            </header>

            {/* Scanner Input */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8 max-w-2xl">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Target Account Domain</label>
                <form onSubmit={handleScan} className="flex gap-4">
                    <input
                        type="text"
                        placeholder="e.g. acme.com"
                        className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none text-lg"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`btn px-8 py-3 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all ${isLoading ? 'opacity-80' : ''}`}
                    >
                        {isLoading ? (
                            <span className="flex items-center gap-2">
                                <Zap className="animate-pulse" size={18} /> Scanning...
                            </span>
                        ) : (
                            "Scan Signals"
                        )}
                    </button>
                </form>
            </div>

            {/* Results Area */}
            {result && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                >
                    {/* Usage Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                            <h3 className="font-bold text-slate-800">Usage Telemetry</h3>
                            <span className="text-xs font-mono text-slate-400">LIVE FEED</span>
                        </div>
                        <div className="p-6 space-y-6">
                            {/* License Gauge */}
                            <div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="font-medium text-slate-600">License Utilization</span>
                                    <span className="font-bold text-slate-900">{result.usage_report.subscription.utilization_pct}%</span>
                                </div>
                                <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.usage_report.subscription.utilization_pct}%` }}
                                        className={`h-full ${result.usage_report.subscription.utilization_pct > 90 ? 'bg-red-500' : 'bg-green-500'}`}
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-1">
                                    {result.usage_report.subscription.active_users} / {result.usage_report.subscription.license_cap} Seats Active
                                </p>
                            </div>

                            {/* Feature Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <FeatureBadge label="Core CRM" level={result.usage_report.features.core_crm} />
                                <FeatureBadge label="Reporting" level={result.usage_report.features.reporting} />
                                <FeatureBadge label="API Access" level={result.usage_report.features.api_access} />
                                <FeatureBadge label="AI Assistant" level={result.usage_report.features.ai_assistant} />
                            </div>
                        </div>
                    </div>

                    {/* Signal & Proposal Card */}
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex flex-col">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800">Expansion Opportunity</h3>
                        </div>

                        <div className="p-6 flex-1 flex flex-col">
                            {result.opportunity_detected ? (
                                <>
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="bg-green-100 p-3 rounded-full text-green-600">
                                            <CheckCircle size={24} />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg text-slate-900">{result.opportunity_detected.type}</h4>
                                            <p className="text-slate-600 mt-1">{result.opportunity_detected.evidence}</p>
                                            <span className="inline-block mt-2 bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded border border-green-200">
                                                CONFIDENCE: {result.opportunity_detected.confidence * 100}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-indigo-50 rounded-lg p-5 border border-indigo-100 mt-auto">
                                        <h5 className="text-xs font-bold text-indigo-800 uppercase tracking-wide mb-2 flex items-center gap-2">
                                            <FileText size={14} /> Draft Proposal
                                        </h5>
                                        <p className="text-indigo-900 text-sm italic leading-relaxed">
                                            "{result.proposal_draft}"
                                        </p>
                                        <button className="mt-3 w-full btn bg-indigo-600 text-white text-sm py-2 rounded shadow-sm hover:bg-indigo-700 flex justify-center items-center gap-2">
                                            Review & Send to CSM <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                                    <AlertTriangle size={48} className="mb-4 opacity-20" />
                                    <p>No expansion signal detected at this time.</p>
                                    <p className="text-sm mt-2">Account appears healthy and within limits.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

// Helper
const FeatureBadge = ({ label, level }) => {
    const colors = {
        'HIGH': 'bg-green-100 text-green-700 border-green-200',
        'MED': 'bg-yellow-50 text-yellow-700 border-yellow-200',
        'LOW': 'bg-slate-100 text-slate-600 border-slate-200',
        'NONE': 'bg-slate-50 text-slate-400 border-slate-100'
    };

    return (
        <div className={`p-3 rounded-lg border flex flex-col items-center justify-center text-center ${colors[level] || colors['NONE']}`}>
            <span className="text-xs font-bold block mb-1">{label}</span>
            <span className="text-xs font-mono">{level}</span>
        </div>
    );
};

export default ExpansionRadar;
