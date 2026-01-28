import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { agentSwarms } from '../../data/agents';

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
                        <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                        <span className="text-slate-400">Planned</span>
                    </div>
                </div>
                <div className="text-xs font-mono text-slate-400">
                    SYSTEM STATUS: ONLINE
                </div>
            </div>

            {/* Map Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6 relative">
                {/* Background Line */}
                <div className="hidden xl:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-200 to-transparent -z-10 transform -translate-y-1/2"></div>

                {agentSwarms.map((swarm, i) => (
                    <motion.div
                        key={swarm.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative rounded-2xl border ${swarm.border} bg-gradient-to-br ${swarm.color} backdrop-blur-sm p-5 overflow-hidden flex flex-col h-full`}
                    >
                        {/* Header */}
                        <div className="flex items-center space-x-3 mb-6">
                            <div className="p-2.5 bg-white/80 rounded-xl shadow-sm">
                                <swarm.icon className="w-5 h-5 text-slate-700" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 text-base">{swarm.title}</h3>
                                <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{swarm.subtitle}</p>
                            </div>
                        </div>

                        {/* Agents Stack */}
                        <div className="space-y-3 relative z-10 flex-1">
                            {swarm.agents.map((agent) => (
                                <motion.div
                                    key={agent.id}
                                    onHoverStart={() => setHoveredAgent(agent.id)}
                                    onHoverEnd={() => setHoveredAgent(null)}
                                    onClick={() => agent.status === 'ACTIVE' && navigate(agent.route || `/agents/${agent.id}`)}
                                    whileHover={agent.status === 'ACTIVE' ? { scale: 1.02, x: 2 } : {}}
                                    className={`
                                        group relative p-3 rounded-xl border transition-all duration-300 flex items-center justify-between
                                        ${agent.status === 'ACTIVE'
                                            ? 'bg-white border-indigo-100 shadow-sm cursor-pointer hover:border-indigo-300 hover:shadow-md'
                                            : 'bg-white/40 border-slate-100 opacity-70 cursor-not-allowed'
                                        }
                                    `}
                                >
                                    <div className="flex items-center space-x-3">
                                        <div className={`
                                            w-8 h-8 rounded-full flex items-center justify-center text-sm
                                            ${agent.status === 'ACTIVE' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-400'}
                                        `}>
                                            <agent.icon size={16} />
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-xs ${agent.status === 'ACTIVE' ? 'text-slate-800' : 'text-slate-500'}`}>
                                                {agent.name}
                                            </h4>
                                            <p className="text-[10px] text-slate-500 leading-tight">{agent.role}</p>
                                        </div>
                                    </div>
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
