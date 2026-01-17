import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PipelineFunnel = () => {
    // We'll simulate a continuous flow of "deals" (particles)
    // Some get filtered out (red), some pass (blue)

    return (
        <div className="w-full relative aspect-square bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-800 flex items-center justify-center">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%">
                    <pattern id="grid-pipe" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#grid-pipe)" />
                </svg>
            </div>

            <div className="relative w-full h-full p-8 flex flex-col items-center justify-between">

                {/* Stage 1: The Input (Wide) */}
                <div className="w-full h-2 bg-slate-700 rounded-full relative overflow-visible">
                    <div className="absolute -top-6 w-full text-center text-xs font-mono text-slate-500">RAW LEAD FLOW</div>
                    {/* Emitters */}
                    {[...Array(5)].map((_, i) => (
                        <ParticleEmitter key={i} delay={i * 0.8} x={`${20 + i * 15}%`} />
                    ))}
                </div>

                {/* Filter 1: ICP Logic */}
                <div className="w-3/4 h-12 border-2 border-indigo-500/30 bg-slate-800/50 backdrop-blur rounded-lg flex items-center justify-center relative z-10">
                    <span className="text-xs font-bold text-indigo-400 tracking-widest">ICP FILTER</span>
                </div>

                {/* Filter 2: Intent Logic */}
                <div className="w-1/2 h-12 border-2 border-indigo-500/50 bg-slate-800/50 backdrop-blur rounded-lg flex items-center justify-center relative z-10">
                    <span className="text-xs font-bold text-indigo-400 tracking-widest">INTENT SIGNAL</span>
                </div>

                {/* Filter 3: Decision Logic */}
                <div className="w-1/3 h-12 border-2 border-indigo-500/80 bg-slate-800/50 backdrop-blur rounded-lg flex items-center justify-center relative z-10">
                    <span className="text-xs font-bold text-indigo-400 tracking-widest">DECISION</span>
                </div>

                {/* Output: Revenue */}
                <div className="w-24 h-24 rounded-full bg-indigo-600 shadow-[0_0_30px_rgba(79,70,229,0.5)] flex items-center justify-center relative z-20">
                    <span className="text-xs font-bold text-white">REVENUE</span>
                    <div className="absolute inset-0 border border-indigo-400 rounded-full animate-ping opacity-20"></div>
                </div>

            </div>
        </div>
    );
};

// Particle Component that travels down
const ParticleEmitter = ({ delay, x }) => {
    // 0 = Filtered at Stage 1, 1 = Filtered at Stage 2, 2 = Filtered at Stage 3, 3 = Success
    const getFate = () => Math.floor(Math.random() * 4); // Random fate

    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Math.random();
            const fate = getFate();
            setParticles(prev => [...prev, { id, fate }]);

            // Cleanup
            setTimeout(() => {
                setParticles(prev => prev.filter(p => p.id !== id));
            }, 6000);
        }, 2000 + (Math.random() * 1000));

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-0 text-white" style={{ left: x }}>
            <AnimatePresence>
                {particles.map(p => (
                    <Particle key={p.id} fate={p.fate} />
                ))}
            </AnimatePresence>
        </div>
    );
};

const Particle = ({ fate }) => {
    // Paths are simplified: dropping down Y axis with checks
    // We define keyframes for Y position.

    // Config based on fate
    // Fate 0: Dies at 20% (Filter 1)
    // Fate 1: Dies at 40% (Filter 2)
    // Fate 2: Dies at 60% (Filter 3)
    // Fate 3: Goes to 100% (Revenue)

    const isSuccess = fate === 3;
    const color = isSuccess ? '#4f46e5' : '#94a3b8'; // Indigo vs Slate

    return (
        <motion.div
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{
                y: fate === 0 ? 80 : fate === 1 ? 160 : fate === 2 ? 240 : 350,
                opacity: [1, 1, 0],
                x: isSuccess ? 0 : [0, (Math.random() - 0.5) * 50] // Rejected particles drift apart
            }}
            transition={{
                duration: fate === 0 ? 1 : fate === 1 ? 2 : fate === 2 ? 3 : 4,
                ease: "linear",
                times: [0, 0.9, 1]
            }}
            className="absolute w-3 h-3 rounded-full"
            style={{
                backgroundColor: isSuccess ? '#6366f1' : '#cbd5e1',
                boxShadow: isSuccess ? '0 0 10px #6366f1' : 'none',
                zIndex: isSuccess ? 20 : 10
            }}
        />
    );
};

export default PipelineFunnel;
