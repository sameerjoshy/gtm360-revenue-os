import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TriggerForm from '../components/agents/TriggerForm';
import LiveFeed from '../components/agents/LiveFeed';

const AgentDetail = () => {
    const { agentId } = useParams();
    const navigate = useNavigate();
    const [runs, setRuns] = useState([]);

    // Logic: If we had more active agents, we would switch logic based on agentId
    // For now, only 'researcher' is active.

    const handleStartMission = async ({ domain, persona }) => {
        // ... (Reuse logic from Workbench for now)
        // In full build, this uses the useAgent hook created later
        console.log(`Starting ${agentId} on ${domain}`);
        // Mock Trigger Reuse
        const newRun = {
            id: Date.now(),
            domain,
            persona,
            status: 'RUNNING',
            time: 'Just now',
            lastLog: 'Initializing Researcher Graph...'
        };
        setRuns([newRun, ...runs]);

        // Mock API Call
        try {
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await fetch(`${API_BASE}/api/v1/research/run`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    domain,
                    config: {
                        config_id: 'ui_trigger_v1',
                        proposition: 'GTM360 Autonomy',
                        persona: persona,
                        icp_ruleset_id: 'default',
                        refresh_policy: { ttl_days: 7, force_refresh_signals: [] },
                        crm_update_mode: 'suggest'
                    }
                })
            });

            if (response.ok) {
                const data = await response.json();
                setRuns(prev => prev.map(r =>
                    r.id === newRun.id
                        ? { ...r, status: 'COMPLETE', lastLog: `Success! Diagnosis: ${data.gtm_diagnosis?.diagnosis_label}` }
                        : r
                ));
            } else {
                setRuns(prev => prev.map(r =>
                    r.id === newRun.id
                        ? { ...r, status: 'FAILED', lastLog: 'Server returned error.' }
                        : r
                ));
            }
        } catch (e) {
            console.error(e);
        }
    };

    if (agentId !== 'researcher') {
        return (
            <div className="min-h-screen pt-36 pb-20 container mx-auto text-center">
                <h1 className="text-2xl font-bold text-slate-300">Agent Under Construction 🚧</h1>
                <button onClick={() => navigate('/agent-workbench')} className="text-indigo-600 mt-4 underline">Back to Map</button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <button onClick={() => navigate('/agent-workbench')} className="text-slate-400 hover:text-slate-600 text-sm mb-4 flex items-center gap-1 transition-colors">
                <span className="text-lg">←</span> Back to Map
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                <div className="flex items-start space-x-5">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-3xl shadow-sm">
                        🕵️
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">The Researcher</h1>
                        <p className="text-slate-500 text-base">Autonomous Account Enrichment & Diagnosis</p>
                        <div className="flex space-x-2 mt-3">
                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded border border-emerald-100 uppercase tracking-wide">Online</span>
                            <span className="px-2 py-0.5 bg-slate-50 text-slate-600 text-xs font-bold rounded border border-slate-100 uppercase tracking-wide">v1.0</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Col: Cockpit */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
                        <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">Manual Override</h3>
                        <TriggerForm onStart={handleStartMission} />
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-400 uppercase text-xs tracking-wider mb-3">Recent Missions</h3>
                        <LiveFeed runs={runs} />
                    </div>
                </div>

                {/* Right Col: Stats/Config */}
                <div className="space-y-6">
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                        <h4 className="font-bold text-slate-900 mb-3 text-sm">Capabilities</h4>
                        <ul className="text-sm text-slate-600 space-y-2.5">
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />Scrapes Homepage & Careers</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />Detects Tech Stack</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />Finds Funding News</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />Scores against ICP</li>
                        </ul>
                    </div>
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
                        <h4 className="font-bold text-slate-900 mb-3 text-sm">Connected Tools</h4>
                        <div className="flex flex-wrap gap-2">
                            <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 shadow-sm">HubSpot</span>
                            <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 shadow-sm">Tavily</span>
                            <span className="px-2 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 shadow-sm">Gemini 1.5</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentDetail;
