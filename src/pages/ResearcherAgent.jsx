import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, ArrowLeft, Search, CheckCircle, TrendingUp, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import AgentLoader from '../components/agents/AgentLoader';
import EmptyState from '../components/agents/EmptyState';
import ErrorState from '../components/agents/ErrorState';
import LastRunBadge from '../components/agents/LastRunBadge';
import StatusBadge from '../components/agents/StatusBadge';

const ResearcherAgent = () => {
    const navigate = useNavigate();
    const [domain, setDomain] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [dossier, setDossier] = useState(null);
    const [error, setError] = useState(null);
    const [lastRun, setLastRun] = useState(null);

    const handleResearch = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setDossier(null);
        setError(null);

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
                setLastRun(new Date());
            } else {
                throw new Error('Research failed');
            }
        } catch (e) {
            console.error(e);
            setError(e.message || 'Failed to connect to backend');
            // Mock fallback for demo
            setTimeout(() => {
                setDossier({
                    domain,
                    company_name: domain.split('.')[0].toUpperCase(),
                    gtm_diagnosis: {
                        diagnosis_label: 'High Intent',
                        judgment_reasoning: 'Multiple hiring signals correlated with tech stack installation.',
                        evidence: ['Hiring Head of Sales (LinkedIn)', 'HubSpot tag detected (BuiltWith)']
                    },
                    signals: [
                        { type: 'HIRING', description: 'Hiring Head of Sales', source: 'LinkedIn' },
                        { type: 'TECH', description: 'Using HubSpot CRM', source: 'BuiltWith' }
                    ],
                    // icp_score removed per 'No scoring' rule
                });
                setLastRun(new Date());
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
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Signals Scout</h1>
                        <p className="text-slate-500 text-sm">Signal-to-Intent Owner</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status="ACTIVE" />
                    <LastRunBadge timestamp={lastRun} />
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
                    {/* Operator Log Header */}
                    <div className="bg-slate-900 text-white p-6 rounded-xl shadow-sm border border-slate-800">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Target</span>
                                <div className="text-xl font-bold mt-1 text-white">{dossier.company_name}</div>
                            </div>
                            <div>
                                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Judgment</span>
                                <div className="text-xl font-bold mt-1 text-emerald-400">{dossier.gtm_diagnosis?.diagnosis_label || 'Pending'}</div>
                            </div>
                            <div>
                                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Action</span>
                                <div className="text-sm font-bold mt-1 text-slate-300">Human Review Required</div>
                            </div>
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
                    {/* Judgment Reasoning */}
                    {dossier.gtm_diagnosis && (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <FileText size={18} className="text-slate-500" />
                                Operator Judgment
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Reasoning</span>
                                    <p className="text-slate-700 leading-relaxed border-l-2 border-slate-200 pl-4">
                                        {dossier.gtm_diagnosis.judgment_reasoning || "Analysis complete. Waiting for reasoning..."}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Evidence Chain</span>
                                    <ul className="space-y-2">
                                        {dossier.gtm_diagnosis.evidence?.map((ev, i) => (
                                            <li key={i} className="text-sm text-slate-600 flex items-start gap-3 bg-slate-50 p-2 rounded">
                                                <span className="text-slate-400 font-mono text-xs mt-0.5">FACT {i + 1}</span>
                                                {ev}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            )}

            {isLoading && <AgentLoader message="Researching account..." />}

            {error && <ErrorState error={error} onRetry={() => { setError(null); handleResearch({ preventDefault: () => { } }); }} />}

            {!dossier && !isLoading && !error && (
                <EmptyState
                    icon={Database}
                    message="Enter a domain to begin autonomous research"
                    subMessage="We'll analyze their website, tech stack, and GTM signals"
                />
            )}
        </div>
    );
};

export default ResearcherAgent;
