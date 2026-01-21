import React, { useState } from 'react';
import { AreaChart, Check, X, ArrowRight, ScatterChart } from 'lucide-react';
import { ScatterChart as RechartsScatter, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import useSubmitLead from '../../hooks/useSubmitLead';

const RuleOf40 = () => {
    const [inputs, setInputs] = useState({
        growthRate: 30, // %
        profitMargin: 15 // %
    });

    const score = Number(inputs.growthRate) + Number(inputs.profitMargin);
    const { submit } = useSubmitLead();

    // Data for the user's point
    const userPoint = [{ x: inputs.growthRate, y: inputs.profitMargin, z: 1 }];

    // Contextual Zones
    // Typically: High Growth > 20%, Profitable > 0%
    // Rule of 40 Line: y = 40 - x

    // Status Logic
    const getStatus = () => {
        if (score >= 40) return { label: 'Elite / Investable', color: '#10b981' };
        if (score >= 20) return { label: 'Good / Stable', color: '#facc15' };
        return { label: 'Inefficient / Burn', color: '#f87171' };
    };

    const status = getStatus();

    return (
        <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-slate-700 bg-slate-900 z-20">
                <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-1">
                    <AreaChart className="w-4 h-4" /> Valuation Logic
                </div>
                <h2 className="text-2xl font-bold text-white">Rule of 40 Analyzer</h2>
            </div>

            <div className="flex-grow p-6 grid grid-cols-1 gap-6">
                {/* CHART */}
                <div className="h-64 w-full bg-slate-800/50 rounded-xl border border-slate-700 p-2">
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsScatter margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                            <XAxis type="number" dataKey="x" name="Growth" unit="%" domain={[-20, 100]} stroke="#94a3b8" fontSize={10}>
                                <Label value="Growth Rate" offset={0} position="insideBottom" fill="#64748b" fontSize={10} />
                            </XAxis>
                            <YAxis type="number" dataKey="y" name="Profit" unit="%" domain={[-50, 50]} stroke="#94a3b8" fontSize={10}>
                                <Label value="Profit Margin" angle={-90} position="insideLeft" fill="#64748b" fontSize={10} />
                            </YAxis>
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />

                            {/* The "Rule of 40" Efficient Frontier Line (Approximate visualization) */}
                            {/* We can't easily draw diagonal lines in basic Recharts without custom shapes, but Reference areas help */}
                            <ReferenceLine y={0} stroke="#475569" strokeWidth={1} />
                            <ReferenceLine x={0} stroke="#475569" strokeWidth={1} />

                            <Scatter name="You" data={userPoint} fill={status.color} shape="circle" r={150} />
                        </RechartsScatter>
                    </ResponsiveContainer>
                </div>

                {/* CONTROLS */}
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Growth Rate</label>
                            <span className="text-sm font-mono text-white bg-slate-800 px-2 rounded">{inputs.growthRate}%</span>
                        </div>
                        <input
                            type="range" min="-20" max="100"
                            value={inputs.growthRate}
                            onChange={(e) => setInputs({ ...inputs, growthRate: Number(e.target.value) })}
                            className="w-full accent-blue-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between mb-2">
                            <label className="text-xs font-bold text-slate-400 uppercase">Profit Margin</label>
                            <span className="text-sm font-mono text-white bg-slate-800 px-2 rounded">{inputs.profitMargin}%</span>
                        </div>
                        <input
                            type="range" min="-50" max="50"
                            value={inputs.profitMargin}
                            onChange={(e) => setInputs({ ...inputs, profitMargin: Number(e.target.value) })}
                            className="w-full accent-blue-500 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>

                <div className="text-center mt-2">
                    <div className="text-4xl font-bold text-white mb-1 transition-all" style={{ color: status.color }}>
                        {score}
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-widest">{status.label}</div>
                </div>
            </div>
        </div>
    );
};

export default RuleOf40;
