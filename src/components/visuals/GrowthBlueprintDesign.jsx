import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Target, Zap, Shield, ChevronRight } from 'lucide-react';

const GrowthBlueprintDesign = () => {
    const pillars = [
        { id: 'focus', icon: Target, title: 'ICP Focus', score: 65, color: 'blue', desc: 'Precision of your Ideal Customer Profile definition.' },
        { id: 'signals', icon: Zap, title: 'Signal Identification', score: 40, color: ' amber', desc: 'Ability to isolate high-intent triggers from noise.' },
        { id: 'execution', icon: BarChart3, title: 'Revenue Velocity', score: 55, color: 'green', desc: 'The speed at which qualified deals move through the system.' },
        { id: 'governance', icon: Shield, title: 'Data Governance', score: 30, color: 'slate', desc: 'Integrity and reliability of your CRM/Revenue data.' }
    ];

    return (
        <div className="relative overflow-hidden bg-white border border-gray-100 rounded-2xl shadow-xl">
            {/* Blueprint Header */}
            <div className="p-8 pb-4 border-b border-gray-50">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Revenue Maturity Roadmap</h2>
                        <p className="text-sm text-gray-500">Diagnostic ID: GTM-882-SYS</p>
                    </div>
                    <div className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-mono tracking-tighter">
                        SCORE: <span className="text-blue-400">47.5%</span>
                    </div>
                </div>
            </div>

            {/* Main Visualizer */}
            <div className="p-8">
                <div className="grid grid-cols-1 gap-6 mb-8">
                    {pillars.map((pillar, idx) => (
                        <div key={pillar.id}>
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <pillar.icon className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-bold text-gray-700">{pillar.title}</span>
                                </div>
                                <span className="text-xs font-mono text-gray-400">{pillar.score}%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pillar.score}%` }}
                                    transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                                    className={`h-full bg-[var(--color-primary)] rounded-full`}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100/50">
                    <h3 className="text-xs font-bold uppercase text-blue-600 mb-2 tracking-widest flex items-center gap-2">
                        <Zap className="w-3 h-3" /> System Recommendation
                    </h3>
                    <p className="text-sm text-blue-800 leading-relaxed">
                        Your data governance is the primary constraint. Scaling activity now will likely lead to "Transaction Chaos." Fix the signal layer before increasing volume.
                    </p>
                </div>
            </div>

            {/* CTA Overlay Previews */}
            <div className="p-6 bg-gray-900 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-[10px] font-bold uppercase text-gray-500 tracking-widest mb-1">Full Report Pending</p>
                        <p className="text-xs text-slate-300">Check your inbox for the detailed teardown.</p>
                    </div>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors">
                        View Full Blueprint <ChevronRight className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Blueprint Grid Background Decor */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden -z-10">
                <svg width="100%" height="100%">
                    <defs>
                        <pattern id="grid-bp" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-bp)" />
                </svg>
            </div>
        </div>
    );
};

export default GrowthBlueprintDesign;
