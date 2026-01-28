import React, { useState } from 'react';
import { Activity, ShieldAlert, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const ListenerFeed = () => {
    const [logs, setLogs] = useState([]);
    const [processing, setProcessing] = useState(false);

    // Mock incoming stream
    const mockEvents = [
        { trigger: "Company founded", domain: "startuplab.io", industry: "SaaS" }, // IGNORE (Early)
        { trigger: "Headcount growth", domain: "scaleup.com", industry: "Retail" }, // IGNORE (ICP Veto)
        { trigger: "Funding Round (Series A/B/C)", domain: "unicorn.tech", industry: "SaaS" }, // ACTION
    ];

    const processStream = async () => {
        setProcessing(true);
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
            await new Promise(r => setTimeout(r, 1000)); // Delay for effect
        }
        setProcessing(false);
    };

    return (
        <div className="max-w-5xl mx-auto pb-20">
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold text-slate-900 mb-2 flex items-center gap-3">
                    <Activity className="text-pink-500" /> Listener Agent
                </h1>
                <p className="text-slate-500 text-lg">The Market Ear. Monitoring 52 signals. Filtering noise.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-bold text-slate-800">Live Signal Stream</h2>
                    <button
                        onClick={processStream}
                        disabled={processing}
                        className={`px-4 py-2 rounded-lg font-bold text-white transition-all ${processing ? 'bg-slate-300' : 'bg-pink-600 hover:bg-pink-700'
                            }`}
                    >
                        {processing ? 'Listening...' : 'Simulate Live Feed'}
                    </button>
                </div>

                <div className="space-y-4">
                    {logs.length === 0 && (
                        <div className="text-center py-12 text-slate-400 italic">
                            Waiting for signals...
                        </div>
                    )}

                    {logs.map((log, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl border border-slate-100 highlight-enter">
                            <div className="mt-1">
                                {log.decision === 'IGNORE' && <XCircle className="text-slate-300" />}
                                {log.decision === 'RESEARCH' && <CheckCircle className="text-blue-500" />}
                                {log.decision === 'OUTREACH_ELIGIBLE' && <ShieldAlert className="text-emerald-500" />}
                                {log.decision === 'ROUTE_TO_HUMAN' && <ArrowRight className="text-orange-500" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-slate-900">{log.signal}</h3>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${log.decision === 'IGNORE' ? 'bg-slate-100 text-slate-500' :
                                            log.decision === 'OUTREACH_ELIGIBLE' ? 'bg-emerald-100 text-emerald-800' :
                                                'bg-blue-50 text-blue-700'
                                        }`}>
                                        {log.decision}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 mt-1 font-mono">{log.reason}</p>
                                {log.hypothesis && (
                                    <div className="mt-2 text-xs bg-slate-50 p-2 rounded border-l-2 border-slate-300">
                                        <strong>Hypothesis:</strong> {log.hypothesis}
                                    </div>
                                )}
                                {log.draft && (
                                    <div className="mt-2 p-3 bg-emerald-50 rounded border border-emerald-100 text-sm text-slate-700">
                                        <strong>Draft:</strong> {log.draft.subject}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ListenerFeed;
