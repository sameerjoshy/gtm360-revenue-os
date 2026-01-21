import React, { useState, useEffect } from 'react';
import { Gauge, Zap, TrendingUp, ArrowRight, Sliders, ChevronRight } from 'lucide-react';
import useSubmitLead from '../../hooks/useSubmitLead';

const PipelineVelocity = () => {
    // INPUTS
    const [inputs, setInputs] = useState({
        opportunities: 50,
        dealValue: 25000,
        winRate: 20, // %
        salesCycle: 90 // days
    });

    const [velocity, setVelocity] = useState(0);
    const [impacts, setImpacts] = useState({});

    // CALCULATE
    useEffect(() => {
        const v = calculateVelocity(inputs);
        setVelocity(v);
        calculateImpacts(v, inputs);
    }, [inputs]);

    const calculateVelocity = (data) => {
        const totalPipelineValue = data.opportunities * data.dealValue;
        const expectedRevenue = totalPipelineValue * (data.winRate / 100);
        const cycleMonths = data.salesCycle / 30;
        const effectiveCycle = cycleMonths < 0.1 ? 0.1 : cycleMonths;
        return Math.round(expectedRevenue / effectiveCycle);
    };

    const calculateImpacts = (currentV, data) => {
        // Impact of 10% improvement in each metric
        const betterWinRate = calculateVelocity({ ...data, winRate: data.winRate * 1.1 });
        const betterCycle = calculateVelocity({ ...data, salesCycle: data.salesCycle * 0.9 });
        const betterValue = calculateVelocity({ ...data, dealValue: data.dealValue * 1.1 });

        setImpacts({
            winRate: betterWinRate - currentV,
            cycle: betterCycle - currentV,
            dealValue: betterValue - currentV
        });
    };

    const formatMoney = (n) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n);

    return (
        <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-slate-700 bg-slate-900 z-20">
                <div className="flex items-center gap-2 text-orange-400 font-mono text-xs uppercase tracking-widest mb-1">
                    <Gauge className="w-4 h-4" /> Pipeline Physics
                </div>
                <h2 className="text-2xl font-bold text-white">Velocity Engine</h2>
            </div>

            <div className="flex-grow p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* VELOCITY GAUGE AREA */}
                <div className="flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500 rounded-full blur-[60px] opacity-10 pointer-events-none"></div>

                    <div className="text-xs text-slate-500 uppercase tracking-widest mb-4">Current Velocity</div>
                    <div className="text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tight">
                        {formatMoney(velocity)}
                    </div>
                    <div className="text-sm text-orange-400 font-medium">Revenue / Month</div>

                    <div className="w-full h-2 bg-slate-700 rounded-full mt-8 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-orange-600 to-yellow-400 transition-all duration-700 ease-out"
                            style={{ width: `${Math.min((velocity / 200000) * 100, 100)}%` }} // Normalized to 200k for visual
                        ></div>
                    </div>
                    <div className="flex justify-between w-full text-[10px] text-slate-600 mt-2 font-mono">
                        <span>$0</span>
                        <span>$200k+</span>
                    </div>
                </div>

                {/* LEVERS INPUTS */}
                <div className="space-y-5">
                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">Opportunities (Active)</label>
                            <span className="text-xs font-mono text-white">{inputs.opportunities}</span>
                        </div>
                        <input type="range" min="5" max="200" value={inputs.opportunities} onChange={(e) => setInputs({ ...inputs, opportunities: Number(e.target.value) })} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">Deal Value ($)</label>
                            <span className="text-xs font-mono text-white">${inputs.dealValue}</span>
                        </div>
                        <input type="range" min="1000" max="100000" step="1000" value={inputs.dealValue} onChange={(e) => setInputs({ ...inputs, dealValue: Number(e.target.value) })} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">Win Rate (%)</label>
                            <span className="text-xs font-mono text-white">{inputs.winRate}%</span>
                        </div>
                        <input type="range" min="1" max="80" value={inputs.winRate} onChange={(e) => setInputs({ ...inputs, winRate: Number(e.target.value) })} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-xs font-bold text-slate-400 uppercase">Sales Cycle (Days)</label>
                            <span className="text-xs font-mono text-white">{inputs.salesCycle}d</span>
                        </div>
                        <input type="range" min="15" max="365" value={inputs.salesCycle} onChange={(e) => setInputs({ ...inputs, salesCycle: Number(e.target.value) })} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500" />
                    </div>
                </div>
            </div>

            {/* IMPACT ANALYSIS */}
            <div className="bg-slate-950 p-6 border-t border-slate-800">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap className="w-3 h-3 text-yellow-400" /> Leverage Analysis (Impact of 10% Improvement)
                </h4>
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-slate-900 p-3 rounded border border-slate-800 hover:border-orange-500/50 transition-colors group cursor-pointer">
                        <div className="text-[10px] text-slate-500 mb-1">Increase Win Rate</div>
                        <div className="text-sm font-bold text-green-400">+{formatMoney(impacts.winRate)}</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded border border-slate-800 hover:border-orange-500/50 transition-colors group cursor-pointer">
                        <div className="text-[10px] text-slate-500 mb-1">Increase Deal Size</div>
                        <div className="text-sm font-bold text-green-400">+{formatMoney(impacts.dealValue)}</div>
                    </div>
                    <div className="bg-slate-900 p-3 rounded border border-slate-800 hover:border-orange-500/50 transition-colors group cursor-pointer border-l-4 border-l-orange-500">
                        <div className="text-[10px] text-slate-500 mb-1">Shorten Cycle</div>
                        <div className="text-sm font-bold text-green-400">+{formatMoney(impacts.cycle)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PipelineVelocity;
