import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Network, Mail, Database, PenTool, MessageSquare, Monitor, ArrowRight, Activity, Disc } from 'lucide-react';

const swarms = [
    {
        id: 'outbound-swarm',
        title: 'Outbound Motion',
        subtitle: 'Target, Enrich, & Engage',
        color: 'from-blue-500/10 to-indigo-500/5',
        border: 'border-blue-200/50',
        icon: Network,
        agents: [
            { id: 'researcher', name: 'Researcher', role: 'Deep Account Intelligence', status: 'ACTIVE', icon: Database },
            { id: 'sniper', name: 'Sniper', role: 'Multi-Channel Outreach', status: 'ACTIVE', icon: Mail },
            { id: 'scraper', name: 'Listen', role: 'Market Signal Monitoring', status: 'PLANNED', icon: Activity }
        ]
    },
    {
        id: 'inbound-swarm',
        title: 'Inbound & Content',
        subtitle: 'Attract & Nurture',
        color: 'from-purple-500/10 to-pink-500/5',
        border: 'border-purple-200/50',
        icon: PenTool,
        agents: [
            { id: 'content-led', name: 'Publisher', role: 'Asset Distribution', status: 'PLANNED', icon: Disc },
            { id: 'inbox', name: 'Concierge', role: 'Inbox & Reply Handling', status: 'PLANNED', icon: MessageSquare },
            { id: 'deanonymize', name: 'Identifier', role: 'Visitor Deanonymization', status: 'PLANNED', icon: Monitor }
        ]
    },
    {
        id: 'ops-swarm',
        title: 'RevOps Infrastructure',
        subtitle: 'Synchronize & Enable',
        color: 'from-slate-500/10 to-gray-500/5',
        border: 'border-slate-200/50',
        icon: Database,
        agents: [
            { id: 'crm-sync', name: 'Syncer', role: 'Bi-Directional Sync', status: 'PLANNED', icon: Database },
            { id: 'calendly', name: 'Prep', role: 'Meeting Context', status: 'PLANNED', icon: Activity }
        ]
    }
];

const SwarmMap = () => {
    const navigate = useNavigate();
    const [hoveredAgent, setHoveredAgent] = useState(null);

    return (
        <div className="w-full">
            {/* Legend / Status Bar */}
            <div className="flex justify-between items-center mb-8 px-4">
                <div className="flex space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-slate-600 font-medium">Active Agents</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                        <span className="text-slate-400">In Development</span>
                    </div>
                </div>
                <div className="text-xs font-mono text-slate-400">
                    SYSTEM STATUS: ONLINE
                </div>
            </div>

            {/* Map Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                {/* Connecting Line Enhancement (Background) */}
                <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10 transform -translate-y-1/2"></div>

                {swarms.map((swarm, i) => (
                    <motion.div
                        key={swarm.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative rounded-2xl border ${swarm.border} bg-gradient-to-br ${swarm.color} backdrop-blur-sm p-6 overflow-hidden`}
                    >
                        {/* Header */}
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="p-3 bg-white/80 rounded-xl shadow-sm">
                                <swarm.icon className="w-6 h-6 text-slate-700" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-lg">{swarm.title}</h3>
                                <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{swarm.subtitle}</p>
                            </div>
                        </div>

                        {/* Agents Stack */}
                        <div className="space-y-4 relative z-10">
                            {swarm.agents.map((agent) => (
                                <motion.div
                                    key={agent.id}
                                    onHoverStart={() => setHoveredAgent(agent.id)}
                                    onHoverEnd={() => setHoveredAgent(null)}
                                    onClick={() => agent.status === 'ACTIVE' && navigate(`/agents/${agent.id}`)}
                                    whileHover={agent.status === 'ACTIVE' ? { scale: 1.02, x: 4 } : {}}
                                    className={`
                                        group relative p-4 rounded-xl border transition-all duration-300 flex items-center justify-between
                                        ${agent.status === 'ACTIVE'
                                            ? 'bg-white border-indigo-100 shadow-md cursor-pointer hover:border-indigo-300 hover:shadow-lg'
                                            : 'bg-white/40 border-slate-100 opacity-70 cursor-not-allowed grayscale-[0.5]'
                                        }
                                    `}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center text-lg
                                            ${agent.status === 'ACTIVE' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}
                                        `}>
                                            <agent.icon size={18} />
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-sm ${agent.status === 'ACTIVE' ? 'text-slate-800' : 'text-slate-500'}`}>
                                                {agent.name}
                                            </h4>
                                            <p className="text-xs text-slate-500">{agent.role}</p>
                                        </div>
                                    </div>

                                    {/* Action Indicator */}
                                    {agent.status === 'ACTIVE' ? (
                                        <div className="flex items-center text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-bold mr-1">OPEN</span>
                                            <ArrowRight size={14} />
                                        </div>
                                    ) : (
                                        <div className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded">
                                            SOON
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SwarmMap;
