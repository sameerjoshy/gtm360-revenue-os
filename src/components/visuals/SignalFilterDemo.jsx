import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Bell, CheckCircle, Search, Filter, Cpu, Zap, AlertCircle } from 'lucide-react';

const RAW_EVENTS = [
    { id: 1, type: 'click', label: 'Clicked Sidebar Link', company: 'Unknown', score: 2 },
    { id: 2, type: 'view', label: 'Viewed Pricing Page', company: 'GlobalTech Corp', score: 15 },
    { id: 3, type: 'scroll', label: 'Scrolled 50% of Bloom Article', company: 'Unknown', score: 5 },
    { id: 4, type: 'intent', label: 'Searching for "RevOps Outsourcing"', company: 'Enterprise SaaS Ltd', score: 85 },
    { id: 5, type: 'view', label: 'Viewed Careers Page', company: 'Competitor X', score: 1 },
    { id: 6, type: 'intent', label: 'Budget Holder Researching Case Studies', company: 'ScaleUp Inc', score: 92 },
    { id: 7, type: 'click', label: 'Clicked Unsubscribe', company: 'Lost Prospect', score: -10 },
    { id: 8, type: 'view', label: 'Viewed Service: GTM Diagnostic', company: 'Unicorn Foundries', score: 78 },
];

const SignalFilterDemo = () => {
    const [isFiltering, setIsFiltering] = useState(false);
    const [events, setEvents] = useState(RAW_EVENTS);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [processingIndex, setProcessingIndex] = useState(-1);

    const startFilter = async () => {
        setIsFiltering(true);
        setFilteredEvents([]);

        for (let i = 0; i < RAW_EVENTS.length; i++) {
            setProcessingIndex(i);
            await new Promise(resolve => setTimeout(resolve, 400));

            if (RAW_EVENTS[i].score > 50) {
                setFilteredEvents(prev => [...prev, {
                    ...RAW_EVENTS[i],
                    insight: RAW_EVENTS[i].score > 90 ? 'Critical Decision Trigger' : 'Qualified Intent Signal'
                }]);
            }
        }

        setProcessingIndex(-1);
    };

    return (
        <div className="bg-slate-900 rounded-2xl p-6 md:p-10 border border-slate-800 shadow-2xl text-white overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8">
                {/* LEFT: RAW STREAM */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-6">
                        <Activity className="text-slate-500 w-5 h-5 animate-pulse" />
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Raw Market Noise</h3>
                    </div>

                    <div className="space-y-2 h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                        {events.map((event, i) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{
                                    opacity: processingIndex === i ? 1 : 0.6,
                                    scale: processingIndex === i ? 1.02 : 1,
                                    borderColor: processingIndex === i ? 'rgba(59, 130, 246, 0.5)' : 'rgba(255,255,255,0.05)'
                                }}
                                className={`p-3 rounded bg-slate-800/50 border text-xs flex justify-between items-center ${processingIndex === i ? 'bg-slate-800 text-blue-100' : 'text-slate-400'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                                    <span>{event.label}</span>
                                </div>
                                <span className="font-mono opacity-50">{event.type}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CENTER: THE PROCESSOR */}
                <div className="flex flex-col items-center justify-center gap-4">
                    <button
                        onClick={startFilter}
                        disabled={isFiltering && processingIndex !== -1}
                        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg ${isFiltering ? 'bg-blue-600 animate-spin-slow' : 'bg-slate-700 hover:bg-blue-600 group'}`}
                    >
                        {isFiltering ? <Cpu className="w-8 h-8" /> : <Filter className="w-8 h-8 group-hover:scale-110 transition-transform" />}
                    </button>
                    <div className="text-[10px] font-bold uppercase tracking-tighter text-slate-500 text-center leading-tight">
                        {isFiltering ? 'Processing...' : 'Engage GTM-360 Filter'}
                    </div>
                </div>

                {/* RIGHT: INTELLIGENCE */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-6">
                        <Zap className="text-amber-400 w-5 h-5" />
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Revenue Signal Intelligence</h3>
                    </div>

                    <div className="space-y-3 h-[320px]">
                        <AnimatePresence>
                            {filteredEvents.length === 0 && !isFiltering && (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                                    <Search className="w-12 h-12 mb-4" />
                                    <p className="text-sm">Click filter to isolate signals</p>
                                </div>
                            )}
                            {filteredEvents.map((event) => (
                                <motion.div
                                    key={event.id}
                                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    className="p-4 rounded-xl bg-blue-600/10 border border-blue-500/30 shadow-inner"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">{event.insight}</span>
                                        </div>
                                        <Bell className="w-3 h-3 text-blue-400" />
                                    </div>
                                    <div className="text-sm font-bold text-white mb-1">{event.company}</div>
                                    <div className="text-xs text-blue-200/70">{event.label}</div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap justify-between items-center gap-4">
                <p className="text-xs text-slate-500 max-w-sm italic">
                    Most companies amplify the noise. We use AI to extract the few triggers that actually predict a buying committee decision.
                </p>
                {filteredEvents.length > 0 && !isFiltering && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-green-400 font-bold text-sm"
                    >
                        <CheckCircle className="w-4 h-4" /> Signal Integrity Verified
                    </motion.div>
                )}
            </div>

            <style>{`
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255,255,255,0.02);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255,255,255,0.1);
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};

export default SignalFilterDemo;
