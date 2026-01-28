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
        <div className="min-h-screen bg-slate-50/50 pt-20 pb-20">
            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <button onClick={() => navigate('/agent-workbench')} className="text-slate-400 hover:text-slate-600 text-sm mb-6">
                    ← Back to Swarm Map
                </button>

                <div className="bg-white rounded-xl shadow border border-slate-200 p-8 mb-8">
                    <div className="flex items-start space-x-6 h-full">
                        <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-3xl">
                            🕵️
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">The Researcher</h1>
                            <p className="text-slate-500 mt-2 text-lg">Autonomous Account Enrichment & Diagnosis</p>
                            <div className="flex space-x-2 mt-4">
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase">Status: Online</span>
                                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded uppercase">Version: 1.0</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Left Col: Cockpit */}
                    <div className="md:col-span-2 space-y-8">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h3 className="font-bold text-slate-900 mb-4">Manual Override Trigger</h3>
                            <TriggerForm onStart={handleStartMission} />
                        </div>

                        <div>
                            <h3 className="font-bold text-slate-500 uppercase text-xs tracking-wider mb-4">Mission Logs</h3>
                            <LiveFeed runs={runs} />
                        </div>
                    </div>

                    {/* Right Col: Stats/Config */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h4 className="font-bold text-slate-900 mb-2">Capabilities</h4>
                            <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                                <li>Scrapes Homepage & Careers</li>
                                <li>Detects Tech Stack</li>
                                <li>Finds Funding News</li>
                                <li>Scores against ICP</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                            <h4 className="font-bold text-slate-900 mb-2">Connected Tools</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-2 py-1 bg-orange-50 text-orange-600 border border-orange-200 rounded text-xs">HubSpot</span>
                                <span className="px-2 py-1 bg-blue-50 text-blue-600 border border-blue-200 rounded text-xs">Tavily</span>
                                <span className="px-2 py-1 bg-purple-50 text-purple-600 border border-purple-200 rounded text-xs">Gemini 1.5</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentDetail;
