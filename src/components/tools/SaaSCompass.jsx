import React, { useState, useEffect } from 'react';
import { Compass, TrendingUp, DollarSign, Activity, AlertTriangle, RefreshCw, Save, ArrowRight, Download } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
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

    const handleExport = () => {
        const headers = ["Metric", "Baseline", "Scenario"];
        const rows = [
            ["CAC", inputs.cac, isComparing ? scenario.cac : "-"],
            ["ARPA", inputs.arpa, isComparing ? scenario.arpa : "-"],
            ["Gross Margin %", inputs.grossMargin, isComparing ? scenario.grossMargin : "-"],
            ["Churn Rate %", inputs.churnRate, isComparing ? scenario.churnRate : "-"],
            ["LTV:CAC", metrics.ltvCac, isComparing ? scenarioMetrics.ltvCac : "-"],
            ["Payback Months", metrics.payback, isComparing ? scenarioMetrics.payback : "-"]
        ];

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "saas_unit_economics.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Chart Data Config
    const ltvData = [
        { name: 'Efficiency', actual: metrics?.ltvCac || 0, benchmark: 3, scenario: isComparing ? scenarioMetrics?.ltvCac : null },
    ];

    // Payback Gauge Data (Normalize to 24 months for visual)
    const paybackData = [
        { name: 'Payback', value: Math.min(metrics?.payback || 0, 24), fill: metrics?.health === 'danger' ? '#ef4444' : '#10b981' }
    ];

    if (isComparing) {
        paybackData.push({ name: 'Target', value: Math.min(scenarioMetrics?.payback || 0, 24), fill: '#6366f1' });
    }

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
                    <button onClick={handleExport} className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition-colors border border-slate-600">
                        <Download className="w-4 h-4" />
                    </button>
                    <button
                        onClick={toggleCompare}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${isComparing ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg shadow-emerald-900/20' : 'bg-slate-800 border-slate-600 text-slate-300 hover:text-white'}`}
                    >
                        <RefreshCw className={`w-3 h-3 ${isComparing ? 'animate-spin' : ''}`} /> {isComparing ? 'Exit Scenario' : 'Run Scenario'}
                    </button>
                </div>
            </div>

            <div className="flex-grow p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-y-auto custom-scrollbar">
                {/* LEFT: CONTROLS */}
                <div className="space-y-8">
                    {/* BASELINE INPUTS */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Model Inputs</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">CAC ($)</label>
                                <input type="number" value={inputs.cac} onChange={(e) => setInputs({ ...inputs, cac: Number(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white text-sm focus:border-emerald-500 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">ARPA ($)</label>
                                <input type="number" value={inputs.arpa} onChange={(e) => setInputs({ ...inputs, arpa: Number(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white text-sm focus:border-emerald-500 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Gross Margin (%)</label>
                                <input type="number" value={inputs.grossMargin} onChange={(e) => setInputs({ ...inputs, grossMargin: Number(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white text-sm focus:border-emerald-500 outline-none transition-all" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Churn Rate (%)</label>
                                <input type="number" value={inputs.churnRate} onChange={(e) => setInputs({ ...inputs, churnRate: Number(e.target.value) })} className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white text-sm focus:border-emerald-500 outline-none transition-all" />
                            </div>
                        </div>
                    </div>

                    {/* SCENARIO INPUTS */}
                    {isComparing && (
                        <div className="space-y-4 bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/20 animation-fade-in">
                            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                                <Activity className="w-3 h-3" /> Target Scenario Levers
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">CAC Target</label>
                                    <input type="number" value={scenario.cac} onChange={(e) => setScenario({ ...scenario, cac: Number(e.target.value) })} className="w-full bg-slate-900 border border-indigo-500/30 rounded-lg p-3 text-white text-sm focus:border-indigo-500 outline-none" />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Churn Target</label>
                                    <input type="number" value={scenario.churnRate} onChange={(e) => setScenario({ ...scenario, churnRate: Number(e.target.value) })} className="w-full bg-slate-900 border border-indigo-500/30 rounded-lg p-3 text-white text-sm focus:border-indigo-500 outline-none" />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-xs text-slate-400 leading-relaxed italic">
                        "Your LTV should be at least 3x your CAC for sustainable scaling. Payback periods over 12 months often indicate high capital consumption."
                    </div>
                </div>

                {/* RIGHT: DASHBOARD */}
                {metrics && (
                    <div className="flex flex-col space-y-6 h-full">
                        {/* KPI CARS */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">LTV : CAC</div>
                                <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                                    {metrics.ltvCac}x
                                    {isComparing && (
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${scenarioMetrics.ltvCac > metrics.ltvCac ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {scenarioMetrics.ltvCac}x
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all"></div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Payback (Mo)</div>
                                <div className="text-3xl font-bold text-white flex items-baseline gap-2">
                                    {metrics.payback}
                                    {isComparing && (
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${scenarioMetrics.payback < metrics.payback ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {scenarioMetrics.payback}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* CHARTS AREA */}
                        <div className="flex-grow grid grid-cols-1 gap-6">
                            <div className="h-48 bg-slate-800/30 rounded-xl border border-slate-700 p-4 relative">
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">LTV Efficiency benchmark</h4>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={ltvData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                        <XAxis dataKey="name" hide />
                                        <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                                        <ReferenceLine y={3} label={{ value: "Target (3x)", fill: "#10b981", fontSize: 9, position: 'right' }} stroke="#10b981" strokeDasharray="3 3" />
                                        <Bar dataKey="actual" name="Current" fill={getHealthColor(metrics.health)} radius={[4, 4, 0, 0]} barSize={40} />
                                        {isComparing && <Bar dataKey="scenario" name="Target" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />}
                                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} itemStyle={{ fontSize: '12px' }} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="h-48 bg-slate-800/30 rounded-xl border border-slate-700 p-4 flex flex-col items-center justify-center">
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest self-start mb-2">Payback Velocity Index</h4>
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadialBarChart
                                        cx="50%"
                                        cy="50%"
                                        innerRadius="40%"
                                        outerRadius="100%"
                                        barSize={12}
                                        data={paybackData}
                                        startAngle={180}
                                        endAngle={0}
                                    >
                                        <PolarAngleAxis type="number" domain={[0, 24]} angleAxisId={0} tick={false} />
                                        <RadialBar
                                            background={{ fill: '#334155' }}
                                            clockWise
                                            dataKey="value"
                                            cornerRadius={15}
                                        />
                                        <Tooltip cursor={false} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }} />
                                    </RadialBarChart>
                                </ResponsiveContainer>
                                <div className="text-[10px] text-slate-500 font-mono -mt-8">0 — 24 Months</div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${metrics.health === 'danger' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                                Model Diagnosis: {metrics.health === 'danger' ? 'Inefficient / Vulnerable' : metrics.health === 'healthy' ? 'High Performance' : 'Stable / Standard'}
                            </div>
                            <button className="text-emerald-400 hover:text-emerald-300 text-xs font-bold flex items-center gap-1 group">
                                Get Fix Plan <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SaaSCompass;
