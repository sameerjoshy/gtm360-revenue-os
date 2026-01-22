import React, { useState } from 'react';
import { AreaChart as AreaIcon, Check, X, ArrowRight, ScatterChart, Printer, Download, Target, TrendingUp } from 'lucide-react';
import { ScatterChart as RechartsScatter, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label, Cell } from 'recharts';
import useSubmitLead from '../../hooks/useSubmitLead';
import useLocalStorage from '../../hooks/useLocalStorage';

const RuleOf40 = () => {
    const [inputs, setInputs] = useLocalStorage('gtm360_rule40_inputs', {
        growthRate: 30, // %
        profitMargin: 15 // %
    });

    const score = Number(inputs.growthRate) + Number(inputs.profitMargin);
    const { submit } = useSubmitLead();

    // Data for the user's point
    const userPoint = [{ x: inputs.growthRate, y: inputs.profitMargin, z: 1 }];

    // Status Logic
    const getStatus = () => {
        if (score >= 40) return { label: 'Elite (Rule of 40 Passed)', color: '#10b981', text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' };
        if (score >= 20) return { label: 'Standard / Growth Focused', color: '#f59e0b', text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
        return { label: 'Inefficient / High Burn', color: '#ef4444', text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
    };

    const status = getStatus();

    const handleExport = () => {
        const headers = ["Metric", "Value"];
        const rows = [
            ["Growth Rate (%)", inputs.growthRate],
            ["Profit Margin (%)", inputs.profitMargin],
            ["Combined Score", score],
            ["Status", status.label]
        ];

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "rule_of_40_analysis.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-slate-700 bg-slate-900 z-20 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 text-blue-400 font-mono text-xs uppercase tracking-widest mb-1">
                        <AreaIcon className="w-4 h-4" /> Valuation Logic
                    </div>
                    <h2 className="text-2xl font-bold text-white">Rule of 40 Analyzer</h2>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleExport} className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition-colors border border-slate-600 no-print" title="Export CSV">
                        <Download className="w-4 h-4" />
                    </button>
                    <button onClick={() => window.print()} className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition-colors border border-slate-600 no-print" title="Print Report">
                        <Printer className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-grow p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* CHART */}
                <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-6 flex flex-col items-center justify-center min-h-[300px]">
                    <div className="w-full h-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsScatter margin={{ top: 20, right: 30, bottom: 30, left: 10 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis type="number" dataKey="x" name="Growth" unit="%" domain={[-20, 100]} stroke="#64748b" fontSize={10} axisLine={false} tickLine={false}>
                                    <Label value="Revenue Growth Rate (%)" offset={-15} position="insideBottom" fill="#475569" fontSize={10} fontWeight="bold" />
                                </XAxis>
                                <YAxis type="number" dataKey="y" name="Profit" unit="%" domain={[-50, 50]} stroke="#64748b" fontSize={10} axisLine={false} tickLine={false}>
                                    <Label value="EBITDA Margin (%)" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="#475569" fontSize={10} fontWeight="bold" />
                                </YAxis>
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />

                                {/* The "Efficient Frontier" diagonal line for Rule of 40 (Growth + Profit = 40) */}
                                {/* We can use a reference line starting at (40,0) and going to (0,40) */}
                                <ReferenceLine segment={[{ x: -10, y: 50 }, { x: 90, y: -50 }]} stroke="#6366f1" strokeDasharray="5 5" strokeWidth={2}>
                                    <Label value="Rule of 40 Frontier" position="top" fill="#6366f1" fontSize={10} />
                                </ReferenceLine>

                                <ReferenceLine y={0} stroke="#475569" strokeWidth={1} />
                                <ReferenceLine x={0} stroke="#475569" strokeWidth={1} />

                                <Scatter name="Your Position" data={userPoint} fill={status.color} shape="circle">
                                    {userPoint.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={status.color} className="animate-pulse" />
                                    ))}
                                </Scatter>
                            </RechartsScatter>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="space-y-8 flex flex-col justify-center">
                    <div className={`${status.bg} ${status.border} border p-6 rounded-2xl`}>
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                                <Target className="w-3 h-3" /> Growth Efficiency Score
                            </div>
                            <span className={`font-mono text-2xl font-black ${status.text}`}>{score}</span>
                        </div>
                        <div className={`text-lg font-bold text-white mb-2 tracking-tight`}>{status.label}</div>
                        <p className="text-xs text-slate-500 leading-relaxed italic">
                            Investors prioritize companies above the diagonal "40" line, where the sum of growth and profitability exceeds 40%.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Rate (%)</label>
                                <span className="text-sm font-mono text-white bg-slate-800 px-3 py-0.5 rounded-lg border border-slate-700">{inputs.growthRate}%</span>
                            </div>
                            <input
                                type="range" min="-20" max="100"
                                value={inputs.growthRate}
                                onChange={(e) => setInputs({ ...inputs, growthRate: Number(e.target.value) })}
                                className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Profit Margin (%)</label>
                                <span className="text-sm font-mono text-white bg-slate-800 px-3 py-0.5 rounded-lg border border-slate-700">{inputs.profitMargin}%</span>
                            </div>
                            <input
                                type="range" min="-50" max="50"
                                value={inputs.profitMargin}
                                onChange={(e) => setInputs({ ...inputs, profitMargin: Number(e.target.value) })}
                                className="w-full accent-blue-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>

                    <button className="flex items-center justify-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors py-2 group">
                        <TrendingUp className="w-4 h-4" /> View Valuation Benchmarks <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RuleOf40;
