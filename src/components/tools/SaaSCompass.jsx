import React, { useState, useEffect } from 'react';
import { Compass, TrendingUp, DollarSign, Activity, AlertTriangle, RefreshCw, Save, ArrowRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import useSubmitLead from '../../hooks/useSubmitLead';

const SaaSCompass = () => {
    const [activeTab, setActiveTab] = useState('dashboard');

    // BASELINE & SCENARIO STATE
    const [inputs, setInputs] = useState({
        cac: 15000,
        arpa: 45000,
        grossMargin: 80,
        churnRate: 15
    });

    const [scenario, setScenario] = useState({ ...inputs });
    const [isComparing, setIsComparing] = useState(false);

    const [metrics, setMetrics] = useState(null);
    const [scenarioMetrics, setScenarioMetrics] = useState(null);

    const { submit, status } = useSubmitLead();
    const [email, setEmail] = useState('');

    // CALCULATION ENGINE
    useEffect(() => {
        const base = calculate(inputs);
        setMetrics(base);

        if (isComparing) {
            const scen = calculate(scenario);
            setScenarioMetrics(scen);
        }
    }, [inputs, scenario, isComparing]);

    const calculate = (data) => {
        const marginDecimal = data.grossMargin / 100;
        const churnDecimal = data.churnRate / 100;
        const effectiveChurn = churnDecimal < 0.01 ? 0.01 : churnDecimal;

        const ltv = (data.arpa * marginDecimal) / effectiveChurn;
        const ltvCac = ltv / data.cac;

        const monthlyGrossProfit = (data.arpa / 12) * marginDecimal;
        const paybackMonths = data.cac / monthlyGrossProfit;

        let health = 'neutral';
        if (ltvCac > 3 && paybackMonths < 12) health = 'healthy';
        if (ltvCac < 1.5 || paybackMonths > 18) health = 'danger';

        return {
            ltv: Math.round(ltv),
            ltvCac: Number(ltvCac.toFixed(1)),
            payback: Number(paybackMonths.toFixed(1)),
            health
        };
    };

    const toggleCompare = () => {
        if (!isComparing) setScenario({ ...inputs });
        setIsComparing(!isComparing);
    };

    const formatMoney = (n) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, notation: "compact" }).format(n);

    // PREPARE CHART DATA
    const chartData = [
        { name: 'LTV:CAC', actual: metrics?.ltvCac || 0, benchmark: 3, scenario: isComparing ? scenarioMetrics?.ltvCac : null },
    ];

    // Payback needs to be inverted for "Good" (lower is better), so we handle it visually or separately.

    const getHealthColor = (score) => {
        if (score === 'healthy') return '#10b981'; // emerald-500
        if (score === 'danger') return '#ef4444'; // red-500
        return '#f59e0b'; // amber-500
    };

    return (
        <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-full">
            {/* HEADER */}
            <div className="p-6 border-b border-slate-700 bg-slate-900 z-20 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-1">
                        <Compass className="w-4 h-4" /> Unit Economics Engine
                    </div>
                    <h2 className="text-2xl font-bold text-white">The SaaS Compass</h2>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={toggleCompare}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border ${isComparing ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-800 border-slate-600 text-slate-300 hover:text-white'}`}
                    >
                        <RefreshCw className="w-3 h-3" /> {isComparing ? 'Scenario Active' : 'Run Scenario'}
                    </button>
                </div>
            </div>

            <div className="flex-grow p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-y-auto custom-scrollbar">
                {/* LEFT: CONTROLS */}
                <div className="space-y-8">
                    {/* BASELINE INPUTS */}
                    <div className={`space-y-4 ${isComparing ? 'opacity-50 pointer-events-none' : ''}`}>
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Baseline Metrics</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">CAC ($)</label>
                                <input type="number" value={inputs.cac} onChange={(e) => setInputs({ ...inputs, cac: Number(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white text-sm focus:border-emerald-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">ARPA ($)</label>
                                <input type="number" value={inputs.arpa} onChange={(e) => setInputs({ ...inputs, arpa: Number(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white text-sm focus:border-emerald-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Gross Margin (%)</label>
                                <input type="number" value={inputs.grossMargin} onChange={(e) => setInputs({ ...inputs, grossMargin: Number(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white text-sm focus:border-emerald-500 outline-none" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-400 mb-1">Churn Rate (%)</label>
                                <input type="number" value={inputs.churnRate} onChange={(e) => setInputs({ ...inputs, churnRate: Number(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white text-sm focus:border-emerald-500 outline-none" />
                            </div>
                        </div>
                    </div>

                    {/* SCENARIO INPUTS */}
                    {isComparing && (
                        <div className="space-y-4 bg-emerald-900/10 p-4 rounded-xl border border-emerald-500/20 animation-fade-in">
                            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                                <RefreshCw className="w-3 h-3" /> Target Scenario
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1">Target CAC</label>
                                    <input type="number" value={scenario.cac} onChange={(e) => setScenario({ ...scenario, cac: Number(e.target.value) })} className="w-full bg-slate-900 border border-emerald-500/50 rounded p-2 text-white text-sm focus:ring-1 focus:ring-emerald-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-slate-400 mb-1">Target Churn</label>
                                    <input type="number" value={scenario.churnRate} onChange={(e) => setScenario({ ...scenario, churnRate: Number(e.target.value) })} className="w-full bg-slate-900 border border-emerald-500/50 rounded p-2 text-white text-sm focus:ring-1 focus:ring-emerald-500 outline-none" />
                                </div>
                                {/* Can add more scenario inputs here if needed */}
                            </div>
                        </div>
                    )}
                </div>

                {/* RIGHT: DASHBOARD */}
                {metrics && (
                    <div className="flex flex-col h-full">
                        {/* TOP STATS */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center">
                                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">LTV : CAC</div>
                                <div className="text-3xl font-bold text-white flex items-center justify-center gap-2">
                                    {metrics.ltvCac}x
                                    {isComparing && (
                                        <span className={`text-sm ${scenarioMetrics.ltvCac > metrics.ltvCac ? 'text-emerald-400' : 'text-red-400'}`}>
                                            vs {scenarioMetrics.ltvCac}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-center">
                                <div className="text-xs text-slate-500 uppercase tracking-widest mb-1">Payback Period</div>
                                <div className="text-3xl font-bold text-white flex items-center justify-center gap-2">
                                    {metrics.payback}<span className="text-lg text-slate-500">mo</span>
                                    {isComparing && (
                                        <span className={`text-sm ${scenarioMetrics.payback < metrics.payback ? 'text-emerald-400' : 'text-red-400'}`}>
                                            vs {scenarioMetrics.payback}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* CHART AREA */}
                        <div className="flex-grow bg-slate-800/50 rounded-xl border border-slate-700 p-4 relative min-h-[200px]">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">LTV Efficiency vs Benchmark</h4>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="name" hide />
                                    <YAxis stroke="#64748b" fontSize={12} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                                    />
                                    <ReferenceLine y={3} label={{ value: "Target (3x)", fill: "#10b981", fontSize: 10, position: 'right' }} stroke="#10b981" strokeDasharray="3 3" />
                                    <Bar dataKey="actual" name="Current" fill={getHealthColor(metrics.health)} radius={[4, 4, 0, 0]} barSize={60} />
                                    {isComparing && <Bar dataKey="scenario" name="Target Scenario" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={60} />}
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                            <div className={`px-3 py-1 rounded text-xs font-bold uppercase ${metrics.health === 'danger' ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                Diagnosis: {metrics.health === 'danger' ? 'Inefficient Growth' : 'Healthy Model'}
                            </div>
                            <button className="text-emerald-400 hover:text-emerald-300 text-xs font-bold flex items-center gap-1">
                                Full Report <ArrowRight className="w-3 h-3" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SaaSCompass;
