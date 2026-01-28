import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ShieldAlert, CheckCircle, XCircle, ArrowRight, AlertTriangle, Lock, ArrowLeft } from 'lucide-react';
import AgentLoader from '../components/agents/AgentLoader';
import EmptyState from '../components/agents/EmptyState';
import StatusBadge from '../components/agents/StatusBadge';
import LastRunBadge from '../components/agents/LastRunBadge';

const ListenerFeed = () => {
    const navigate = useNavigate();
    const [logs, setLogs] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [lastRun, setLastRun] = useState(null);

    // Mock incoming stream (Test Cases for Constitution)
    const mockEvents = [
        { trigger: "Company announces Layoffs", domain: "struggling.co", industry: "SaaS" }, // COMBO 6: Silent Churn (Suppressed)
        { trigger: "Wins 'Best Place to Work' Award", domain: "noisy.io", industry: "SaaS" }, // COMBO 10: Noise Cluster (Suppressed)
        { trigger: "Receives $50M Financing", domain: "rocketship.io", industry: "SaaS" }, // COMBO 2: Post-Funding Scramble (Action)
        { trigger: "Hiring for Sales roles", domain: "unknown.co", industry: "SaaS" }, // Single Signal (Downgrade to Human)
    ];

    const processStream = async () => {
        setProcessing(true);
        setLastRun(new Date());
        setLogs([]);

        const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

        for (const event of mockEvents) {
            try {
                const res = await fetch(`${API_BASE}/api/listener/process`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(event)
                });
                const result = await res.json();
                setLogs(prev => [result, ...prev]);
            } catch (e) {
                console.error(e);
            }
            await new Promise(r => setTimeout(r, 1500));
        }
        setProcessing(false);
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
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
                        <Activity size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Listener Agent</h1>
                        <p className="text-slate-500 text-sm">The Market Ear. Governed by the Signals Constitution.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status="ACTIVE" />
                    <LastRunBadge timestamp={lastRun} />
                </div>
            </div>

            <div className="mb-6 bg-slate-100 px-4 py-2 rounded-lg border border-slate-200 inline-block">
                <p className="text-xs font-mono text-slate-600 font-medium">
                    PRIME DIRECTIVE: "This agent exists to protect GTM teams from premature action."
                </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-slate-800">Live Signal Stream</h2>
                    <button
                        onClick={processStream}
                        disabled={processing}
                        className={`px-6 py-2 rounded-lg font-bold text-white transition-all ${processing ? 'bg-slate-300' : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        {processing ? 'Processing Stream...' : 'Simulate Feed'}
                    </button>
                </div>

                <div className="space-y-4">
                    {logs.length === 0 && (
                        <div className="text-center py-12 text-slate-400 italic">
                            Waiting for signals...
                        </div>
                    )}

                    {logs.map((log, i) => (
                        <div key={i} className="p-5 rounded-xl border border-slate-100 highlight-enter bg-slate-50/50">

                            {/* Header: Signal & Decision */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="mt-1">
                                        {log.suppressed ? <Lock className="text-red-500" /> :
                                            log.decision === 'IGNORE' ? <XCircle className="text-slate-300" /> :
                                                log.decision === 'RESEARCH' ? <CheckCircle className="text-blue-500" /> :
                                                    log.decision === 'OUTREACH_ELIGIBLE' ? <ShieldAlert className="text-emerald-500" /> :
                                                        <ArrowRight className="text-orange-500" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg">{log.signal || 'Unknown Signal'}</h3>
                                        {log.archetype && log.archetype !== 'None' && (
                                            <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded mr-2">
                                                {log.archetype}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full ${log.suppressed ? 'bg-red-100 text-red-700' :
                                    log.decision === 'IGNORE' ? 'bg-slate-200 text-slate-500' :
                                        log.decision === 'OUTREACH_ELIGIBLE' ? 'bg-emerald-100 text-emerald-800' :
                                            log.decision === 'RESEARCH' ? 'bg-blue-100 text-blue-800' :
                                                'bg-orange-100 text-orange-800'
                                    }`}>
                                    {log.suppressed ? 'SUPPRESSED' : log.decision}
                                </span>
                            </div>

                            {/* Suppression Message */}
                            {log.suppressed && (
                                <div className="bg-red-50 text-red-800 p-3 rounded-lg text-sm border border-red-100 flex items-center gap-2 mb-3">
                                    <AlertTriangle className="w-4 h-4" />
                                    <strong>Blocked:</strong> {log.suppression_reason}
                                </div>
                            )}

                            {/* Decision Quality Contract Card */}
                            {!log.suppressed && log.rationale && (
                                <div className="bg-white p-4 rounded-lg border border-slate-200 text-sm space-y-2 shadow-sm">
                                    <h4 className="text-xs uppercase tracking-wide text-slate-400 font-bold mb-2">Decision Quality Contract</h4>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="font-semibold text-slate-700">Why it matters:</p>
                                            <p className="text-slate-600">{log.rationale.why_matters}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-700">Why NOT act:</p>
                                            <p className="text-slate-600">{log.rationale.why_not}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-700">Missing info:</p>
                                            <p className="text-slate-600">{log.rationale.missing_info}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-700">Choice Rationale:</p>
                                            <p className="text-slate-600">{log.rationale.choice_reason}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Confidence Drivers & Risks */}
                            {!log.suppressed && log.confidence && (
                                <div className="mt-4 flex gap-6 text-xs">
                                    <div className="flex-1">
                                        <p className="font-bold text-emerald-700 mb-1">Confidence Drivers</p>
                                        <ul className="space-y-1">
                                            {log.confidence.drivers.length > 0 ? log.confidence.drivers.map((d, idx) => (
                                                <li key={idx} className="flex gap-1 text-emerald-600">
                                                    <CheckCircle className="w-3 h-3 mt-0.5" /> {d}
                                                </li>
                                            )) : <span className="text-slate-400">None</span>}
                                        </ul>
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-bold text-red-700 mb-1">Risks / Unknowns</p>
                                        <ul className="space-y-1">
                                            {log.confidence.risks.length > 0 ? log.confidence.risks.map((r, idx) => (
                                                <li key={idx} className="flex gap-1 text-red-600">
                                                    <AlertTriangle className="w-3 h-3 mt-0.5" /> {r}
                                                </li>
                                            )) : <span className="text-slate-400">None</span>}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {log.draft && (
                                <div className="mt-4 p-3 bg-emerald-50 rounded border border-emerald-100 text-sm text-slate-700">
                                    <strong>Draft Created:</strong> {log.draft.subject}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListenerFeed;
