import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, ArrowLeft, Search, CheckCircle, AlertTriangle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const ResearcherAgent = () => {
    const navigate = useNavigate();
    const [domain, setDomain] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [dossier, setDossier] = useState(null);

    const handleResearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setDossier(null);

        try {
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const res = await fetch(`${API_BASE}/api/v1/research/run`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    domain,
                    config: {
                        config_id: 'ui_trigger_v1',
                        proposition: 'GTM360 Autonomy',
                        persona: 'General',
                        icp_ruleset_id: 'default',
                        refresh_policy: { ttl_days: 7, force_refresh_signals: [] },
                        crm_update_mode: 'suggest'
                    }
                })
            });

            if (res.ok) {
                const data = await res.json();
                setDossier(data);
            } else {
                throw new Error('Research failed');
            }
        } catch (e) {
            console.error(e);
            // Mock fallback for demo
            setTimeout(() => {
                setDossier({
                    domain,
                    company_name: domain.split('.')[0].toUpperCase(),
                    gtm_diagnosis: {
                        diagnosis_label: 'Pipeline Visibility Gap',
                        confidence: 0.85,
                        evidence: ['No CRM detected', 'Hiring Sales Ops']
                    },
                    signals: [
                        { type: 'HIRING', description: 'Hiring Head of Sales', source: 'LinkedIn' },
                        { type: 'TECH', description: 'Using HubSpot CRM', source: 'BuiltWith' }
                    ],
                    icp_score: 78
                });
            }, 1500);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-20">
            {/* Navigation */}
            <button
                onClick={() => navigate('/agent-workbench')}
                className="flex items-center text-slate-400 hover:text-slate-600 text-sm mb-4 transition-colors"
            >
                <ArrowLeft size={16} className="mr-1" />
                Back to Swarm Map
            </button>

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        <Database size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Researcher Agent</h1>
                        <p className="text-slate-500 text-sm">Autonomous Account Enrichment & Diagnosis</p>
                    </div>
                </div>
            </div>

            {/* Input Form */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
                <form onSubmit={handleResearch} className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter company domain (e.g., acme.com)"
                        className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none text-lg"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`px-6 py-2 rounded-lg font-bold text-white transition-all flex items-center gap-2 ${isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {isLoading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Researching...
                            </>
                        ) : (
                            <>
                                <Search size={18} />
                                Run Research
                            </>
                        )}
                    </button>
                </form>
            </div>

            {/* Results */}
            {dossier && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Scorecard */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Company</span>
                            <div className="text-xl font-bold mt-1 text-slate-900">{dossier.company_name}</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">ICP Score</span>
                            <div className="text-xl font-bold mt-1 text-blue-600">{dossier.icp_score}/100</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Diagnosis</span>
                            <div className="text-sm font-bold mt-1 text-slate-900">{dossier.gtm_diagnosis?.diagnosis_label}</div>
                        </div>
                    </div>

                    {/* Signals */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                            <h3 className="font-bold text-slate-800">Detected Signals</h3>
                        </div>
                        <ul className="divide-y divide-slate-100">
                            {dossier.signals?.map((signal, idx) => (
                                <li key={idx} className="p-6 flex items-start gap-4">
                                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                        <CheckCircle size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-bold text-slate-900">{signal.type}</span>
                                            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">{signal.source}</span>
                                        </div>
                                        <p className="text-slate-600 text-sm">{signal.description}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Diagnosis */}
                    {dossier.gtm_diagnosis && (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <TrendingUp size={18} className="text-blue-500" />
                                GTM Diagnosis
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-slate-700">Confidence:</span>
                                    <span className="text-sm text-slate-600">{Math.round(dossier.gtm_diagnosis.confidence * 100)}%</span>
                                </div>
                                <div>
                                    <span className="text-sm font-semibold text-slate-700 block mb-2">Evidence:</span>
                                    <ul className="space-y-1">
                                        {dossier.gtm_diagnosis.evidence?.map((ev, i) => (
                                            <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                                <span className="text-blue-500 mt-0.5">•</span> {ev}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}

            {!dossier && !isLoading && (
                <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <Database size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500">Enter a domain to begin autonomous research.</p>
                </div>
            )}
        </div>
    );
};

export default ResearcherAgent;
