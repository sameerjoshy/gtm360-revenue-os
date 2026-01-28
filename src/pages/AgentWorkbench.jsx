import React, { useState } from 'react';
import AgentTransparency from '../components/agents/AgentTransparency';
import TriggerForm from '../components/agents/TriggerForm';
import LiveFeed from '../components/agents/LiveFeed';
import SwarmMap from '../components/agents/SwarmMap';
import { motion } from 'framer-motion';

const AgentWorkbench = () => {
    const [activeTab, setActiveTab] = useState('map');
    const [runs, setRuns] = useState([]);

    const handleStartMission = async ({ domain, persona }) => {
        // Quick Mock to update UI immediately
        const newRun = {
            id: Date.now(),
            domain,
            persona,
            status: 'RUNNING',
            time: 'Just now',
            lastLog: 'Initializing Researcher Graph...'
        };
        setRuns([newRun, ...runs]);
        setActiveTab('live-feed');

        // Note: Real API integration will happen in next step
        // We will wire this to the backend API we built
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
            setRuns(prev => prev.map(r =>
                r.id === newRun.id
                    ? { ...r, status: 'FAILED', lastLog: 'Connection failed. Is Backend running?' }
                    : r
            ));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/50 pt-20 pb-20">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Agent Workbench</h1>
                        <p className="text-slate-500 mt-2">Monitor and control your autonomous revenue workforce.</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex space-x-6 border-b border-slate-200 mb-8">
                    <button
                        onClick={() => setActiveTab('map')}
                        className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'map'
                            ? 'text-indigo-600'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Swarm Map
                        {activeTab === 'map' && (
                            <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('live-feed')}
                        className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'live-feed'
                            ? 'text-indigo-600'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Live Feed
                        {activeTab === 'live-feed' && (
                            <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('transparency')}
                        className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'transparency'
                            ? 'text-indigo-600'
                            : 'text-slate-500 hover:text-slate-700'
                            }`}
                    >
                        Transparency & Safety
                        {activeTab === 'transparency' && (
                            <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                        )}
                    </button>
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 min-h-[500px] p-6">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {activeTab === 'map' && (
                            <div className="max-w-6xl mx-auto py-4">
                                <SwarmMap />
                            </div>
                        )}
                        {activeTab === 'transparency' && <AgentTransparency />}
                        {activeTab === 'live-feed' && (
                            <div className="max-w-2xl mx-auto">
                                <TriggerForm onStart={handleStartMission} />
                                <div className="mt-8">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Recent Missions</h3>
                                    <LiveFeed runs={runs} />
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AgentWorkbench;
