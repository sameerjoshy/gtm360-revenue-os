import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TriggerForm from '../components/agents/TriggerForm';
import LiveFeed from '../components/agents/LiveFeed';
import { agentSwarms } from '../data/agents';
import { HelpCircle } from 'lucide-react';

const AgentDetail = () => {
    const { agentId } = useParams();
    const navigate = useNavigate();
    const [runs, setRuns] = useState([]);

    // 1. Find the Agent Data
    // Flatten swarms to find the specific agent
    const allAgents = agentSwarms.flatMap(s => s.agents);
    const agent = allAgents.find(a => a.id === agentId);

    // Mock Handler (reused)
    const handleStartMission = async ({ domain, persona }) => {
        // ... (Logic remains identical for MVP)
        // In real app, we'd lookup specific endpoints per agent
        console.log(`Starting ${agentId} on ${domain}`);
        const newRun = {
            id: Date.now(),
            domain,
            persona,
            status: 'RUNNING',
            time: 'Just now',
            lastLog: `Initializing ${agent?.name || 'Agent'} Logic...`
        };
        setRuns([newRun, ...runs]);
    };

    if (!agent) {
        return (
            <div className="min-h-screen pt-36 pb-20 container mx-auto text-center">
                <h1 className="text-2xl font-bold text-slate-300">Agent Not Found</h1>
                <button onClick={() => navigate('/agent-workbench')} className="text-indigo-600 mt-4 underline">Back to Map</button>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto">
            <button onClick={() => navigate('/agent-workbench')} className="text-slate-400 hover:text-slate-600 text-sm mb-4 flex items-center gap-1 transition-colors">
                <span className="text-lg">←</span> Back to Map
            </button>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
                <div className="flex items-start space-x-5">
                    <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center text-3xl shadow-sm">
                        <agent.icon size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{agent.name} Agent</h1>
                        <p className="text-slate-500 text-base">{agent.description}</p>
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
                            {agent.capabilities?.map((cap, i) => (
                                <li key={i} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />{cap}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Dynamic FAQs */}
                    <div className="bg-white rounded-xl border border-slate-200 p-5">
                        <h4 className="font-bold text-slate-900 mb-3 text-sm flex items-center gap-2">
                            <HelpCircle size={16} className="text-indigo-500" /> FAQ
                        </h4>
                        <div className="space-y-4">
                            {agent.faqs?.map((faq, i) => (
                                <div key={i}>
                                    <p className="text-xs font-bold text-slate-800 mb-1">{faq.q}</p>
                                    <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentDetail;
