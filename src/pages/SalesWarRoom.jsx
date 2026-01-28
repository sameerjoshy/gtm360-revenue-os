import React, { useState } from 'react';
import { Target, TrendingUp, AlertTriangle, CheckCircle, Smartphone, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const SalesWarRoom = () => {
    // Mock Active Deals
    const [deals, setDeals] = useState([
        { id: 'deal_101', name: 'Acme Corp - Enterprise Expansion', value: '$125,000', stage: 'Negotiation', probability: 75, last_activity: '2 days ago' },
        { id: 'deal_102', name: 'Globex - Q3 Renewal', value: '$45,000', stage: 'Qualification', probability: 40, last_activity: '5 hours ago' },
        { id: 'deal_103', name: 'Soylent Corp - New Logo', value: '$85,000', stage: 'Proposal', probability: 60, last_activity: '1 day ago' }
    ]);

    const [selectedDealId, setSelectedDealId] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleRunAnalysis = async (dealId) => {
        setLoading(true);
        setAnalysis(null);
        try {
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const res = await fetch(`${API_BASE}/sales/deal-intelligence/${dealId}`, {
                method: 'POST'
            });
            const data = await res.json();
            setAnalysis(data);
        } catch (e) {
            console.error(e);
            // Mock Fallback for Demo if backend offline
            setTimeout(() => {
                setAnalysis({
                    status: "COMPLETE",
                    risk_assessment: { risk_level: "MEDIUM", risk_factors: ["Budget approval pending", "Champion distracted"] },
                    buyer_readiness: { score: 72, signal: "Evaluating Competitors" },
                    next_best_action: "Schedule technical deep dive with CTO."
                });
            }, 1500);
        } finally {
            setLoading(false);
        }
    };

    const selectedDeal = deals.find(d => d.id === selectedDealId);

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-100px)] flex gap-6">

            {/* LEFT: Deal List */}
            <div className="w-1/3 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h2 className="font-bold text-slate-700 flex items-center gap-2">
                        <Target size={18} className="text-indigo-600" /> Active Pipeline
                    </h2>
                    <span className="text-xs font-mono bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded">{deals.length} Active</span>
                </div>
                <div className="overflow-y-auto flex-1 p-2 space-y-2">
                    {deals.map(deal => (
                        <div
                            key={deal.id}
                            onClick={() => { setSelectedDealId(deal.id); setAnalysis(null); }}
                            className={`p-4 rounded-lg cursor-pointer transition-all border ${selectedDealId === deal.id ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white border-slate-100 hover:border-indigo-100 hover:bg-slate-50'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-slate-800 text-sm truncate w-3/4">{deal.name}</span>
                                <span className="text-xs font-bold text-slate-600">{deal.value}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs text-slate-500 mt-2">
                                <span className="bg-slate-100 px-2 py-0.5 rounded">{deal.stage}</span>
                                <span>{deal.probability}% Prob</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT: Analysis Room */}
            <div className="w-2/3 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
                {selectedDeal ? (
                    <>
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex justify-between items-start">
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">{selectedDeal.name}</h1>
                                <div className="flex gap-4 mt-2 text-sm text-slate-500">
                                    <span className="flex items-center gap-1"><TrendingUp size={14} /> Stage: {selectedDeal.stage}</span>
                                    <span className="flex items-center gap-1"><Users size={14} /> Last Connect: {selectedDeal.last_activity}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRunAnalysis(selectedDeal.id)}
                                disabled={loading}
                                className={`px-6 py-2 rounded-lg font-bold text-white shadow-md transition-all flex items-center gap-2 ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg'}`}
                            >
                                {loading ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Running Swarm...
                                    </>
                                ) : (
                                    <>
                                        <Target size={18} />
                                        Analyze Deal Health
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Analysis Content */}
                        <div className="flex-1 p-8 overflow-y-auto bg-slate-50/50">
                            {analysis ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    {/* Scorecards */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Risk Level</span>
                                            <div className={`text-xl font-bold mt-1 ${analysis.risk_assessment?.risk_level === 'HIGH' ? 'text-red-600' : analysis.risk_assessment?.risk_level === 'MEDIUM' ? 'text-amber-500' : 'text-green-600'}`}>
                                                {analysis.risk_assessment?.risk_level || 'N/A'}
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Buyer Readiness</span>
                                            <div className="text-xl font-bold mt-1 text-slate-800">
                                                {analysis.buyer_readiness?.score || 0}/100
                                            </div>
                                        </div>
                                        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Next Action</span>
                                            <div className="text-sm font-medium mt-1 text-indigo-600 leading-snug">
                                                {analysis.next_best_action || 'N/A'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Deep Dive */}
                                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <AlertTriangle size={18} className="text-amber-500" /> Risk Factors
                                        </h3>
                                        <ul className="space-y-2">
                                            {analysis.risk_assessment?.risk_factors?.map((risk, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600 bg-red-50 p-2 rounded">
                                                    <span className="text-red-500 mt-0.5">•</span> {risk}
                                                </li>
                                            ))}
                                            {!analysis.risk_assessment?.risk_factors && <p className="text-slate-400 italic">No significant risks detected.</p>}
                                        </ul>
                                    </div>

                                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                            <Smartphone size={18} className="text-blue-500" /> Conversation Intelligence
                                        </h3>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            Analysis of the last 3 calls indicates that the <strong className="text-slate-900">Economic Buyer (CFO)</strong> has not yet been multi-threaded.
                                            The technical champion is sold, but budget authority pipeline velocity is slowing.
                                        </p>
                                    </div>

                                </motion.div>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-60">
                                    <TrendingUp size={48} className="mb-4 text-slate-300" />
                                    <p className="text-lg font-medium">Ready to Analyze</p>
                                    <p className="text-sm">Select a deal and run the Swarm to generate real-time intelligence.</p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <p>Select a deal from the pipeline to begin.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SalesWarRoom;
