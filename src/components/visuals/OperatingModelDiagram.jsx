import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OperatingModelDiagram = () => {
    const [state, setState] = useState('silos'); // 'silos', 'aligning', 'unified'

    useEffect(() => {
        const sequence = async () => {
            while (true) {
                // Phase 1: Silos (Chaos)
                setState('silos');
                await new Promise(r => setTimeout(r, 4000));

                // Phase 2: Alignment
                setState('aligning');
                await new Promise(r => setTimeout(r, 2000));

                // Phase 3: Unified System
                setState('unified');
                await new Promise(r => setTimeout(r, 6000));
            }
        };
        sequence();
    }, []);

    // Configuration for the three nodes
    const nodes = [
        { id: 'mktg', label: 'MKTG', color: '#ec4899' }, // Pink-500
        { id: 'sales', label: 'SALES', color: '#3b82f6' }, // Blue-500
        { id: 'cs', label: 'CS', color: '#10b981' }      // Emerald-500
    ];

    return (
        <div className="w-full relative aspect-square bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%">
                    <pattern id="grid-modern" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid-modern)" />
                </svg>
            </div>

            {/* Status Label */}
            <div className="absolute top-6 left-6 z-10">
                <motion.div
                    key={state}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${state === 'silos' ? 'border-red-500/50 text-red-400 bg-red-900/20' :
                            state === 'aligning' ? 'border-yellow-500/50 text-yellow-400 bg-yellow-900/20' :
                                'border-indigo-500/50 text-indigo-400 bg-indigo-900/20'
                        }`}
                >
                    STATUS: {state.toUpperCase()}
                </motion.div>
            </div>

            {/* Central Core (Only visible in unified state) */}
            <AnimatePresence>
                {state === 'unified' && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="absolute w-24 h-24 rounded-full bg-indigo-500/20 border border-indigo-500/50 z-0 flex items-center justify-center"
                    >
                        <div className="w-16 h-16 rounded-full bg-indigo-600 shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center relative">
                            <span className="text-[10px] font-bold text-white tracking-widest">OS</span>

                            {/* Pulse rings */}
                            {[1, 2, 3].map(i => (
                                <motion.div
                                    key={i}
                                    className="absolute inset-0 rounded-full border border-indigo-400/30"
                                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Connections (Only in unified state) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {state === 'unified' && nodes.map((node, i) => {
                    // Calculate positions based on triangle layout
                    const angle = (i * 120 - 90) * (Math.PI / 180);
                    const radius = 100;
                    const x = 200 + Math.cos(angle) * radius; // assuming 400x400 viewBox logic for calculation, but mapped to %
                    const y = 200 + Math.sin(angle) * radius; // actually we are using flex center so logic is relative to center.

                    // We'll use CSS transforms for nodes, so we can't easily draw SVG lines to them without absolute coords.
                    // Instead, let's draw lines from center (50%) to the node positions.
                    // 120 degree separation: Top (0deg/-90), Right (120deg), Left (240deg).

                    const rotation = i * 120;

                    return (
                        <g key={`conn-${i}`} style={{ transformOrigin: 'center', transform: `rotate(${rotation}deg)` }}>
                            {/* Line from center upwards */}
                            <motion.line
                                x1="50%" y1="50%" x2="50%" y2="25%"
                                stroke="#6366f1"
                                strokeWidth="2"
                                strokeDasharray="4 4"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.5 }}
                                transition={{ duration: 0.8 }}
                            />
                            {/* Data particle moving */}
                            <motion.circle r="3" fill="white">
                                <animateMotion
                                    dur="2s"
                                    repeatCount="indefinite"
                                    path="M 200 200 L 200 100" // Assuming standard SVG coords for simplicity: Center is 50%
                                // Actually, let's just use CSS for particles or simpler SVG logic.
                                // Simplification: Just pulsing lines.
                                />
                            </motion.circle>
                        </g>
                    );
                })}
            </svg>


            {/* Nodes Animation */}
            <div className="relative w-64 h-64">
                {nodes.map((node, i) => {
                    // Position calculations
                    // State: Silos -> Random spots
                    // State: Aligning -> Triangle
                    // State: Unified -> Triangle + Connected

                    const isSilo = state === 'silos';

                    // Unified Positions (Triangle)
                    const angle = (i * 120 - 90) * (Math.PI / 180);
                    const radius = 80;
                    const unifiedX = Math.cos(angle) * radius;
                    const unifiedY = Math.sin(angle) * radius;

                    // Silo Positions (Scattered)
                    const siloX = i === 0 ? -60 : i === 1 ? 70 : -10;
                    const siloY = i === 0 ? -60 : i === 1 ? 20 : 80;

                    return (
                        <motion.div
                            key={node.id}
                            className={`absolute w-20 h-20 flex flex-col items-center justify-center rounded-2xl backdrop-blur-sm border transition-colors duration-500
                                ${state === 'unified'
                                    ? 'bg-slate-800/80 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.3)]'
                                    : 'bg-slate-900/50 border-slate-700 shadow-none'
                                }
                            `}
                            animate={{
                                x: isSilo ? siloX : unifiedX,
                                y: isSilo ? siloY : unifiedY,
                                rotate: isSilo ? [0, 10, -10, 0] : 0, // Wobble in silo mode
                                scale: state === 'unified' ? 1 : 0.9
                            }}
                            // Center the absolute element (it's top-left based by default)
                            style={{
                                left: '50%',
                                top: '50%',
                                marginLeft: '-40px',
                                marginTop: '-40px'
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 60,
                                damping: 12,
                                rotate: { duration: 4, repeat: Infinity, repeatType: "reverse" }
                            }}
                        >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1" style={{ backgroundColor: state === 'unified' ? node.color : '#475569' }}>
                                <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                            <span className={`text-[10px] font-bold tracking-wider ${state === 'unified' ? 'text-white' : 'text-slate-400'}`}>
                                {node.label}
                            </span>
                        </motion.div>
                    );
                })}

                {/* Visualizing Data Flow in Unified State only */}
                {state === 'unified' && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                        {[0, 1, 2].map(i => {
                            const angle = (i * 120 - 90) * (Math.PI / 180);
                            const x2 = 128 + Math.cos(angle) * 80; // 128 is center of 256px container
                            const y2 = 128 + Math.sin(angle) * 80;

                            return (
                                <motion.circle
                                    key={i}
                                    r="2"
                                    fill="white"
                                    initial={{ opacity: 1 }}
                                    animate={{
                                        cx: [128, x2, 128], // Out and back
                                        cy: [128, y2, 128],
                                    }}
                                    transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                />
                            );
                        })}
                    </svg>
                )}
            </div>
        </div>
    );
};

export default OperatingModelDiagram;
