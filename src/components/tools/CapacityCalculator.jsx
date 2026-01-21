import React, { useState, useEffect } from 'react';
import {
    Users, TrendingDown, ArrowRight, BarChart2, AlertCircle,
    Settings, Download, Table, ChevronDown, ChevronUp
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import useSubmitLead from '../../hooks/useSubmitLead';

const CapacityCalculator = () => {
    // --- STATE MANAGEMENT ---
    const [activeTab, setActiveTab] = useState('visuals'); // visuals, data, settings
    const [showAdvanced, setShowAdvanced] = useState(false);

    // Core Inputs
    const [inputs, setInputs] = useState({
        startingReps: 8,
        quotaPerRep: 600000,
        attritionRate: 18,
        hiringPlan: [2, 2, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0], // 12-month array
        rampSchedule: [0, 0.2, 0.5, 0.8, 1.0, 1.0] // 6-month ramp
    });

    const [chartData, setChartData] = useState([]);
    const [summary, setSummary] = useState({});
    const { submit, status } = useSubmitLead();
    const [email, setEmail] = useState('');

    // --- CALCULATION ENGINE ---
    useEffect(() => {
        calculateModel();
    }, [inputs]);

    const calculateModel = () => {
        let currentHeadcount = inputs.startingReps;
        let cumulativeRevenueStreet = 0;
        let cumulativeRevenueSpreadsheet = 0;
        let data = [];

        // Track cohorts for specific ramp logic
        // Format: { monthsTenure: number, count: number }
        let cohorts = [
            { monthsTenure: 99, count: inputs.startingReps } // Initial reps assumed fully ramped
        ];

        for (let m = 0; m < 12; m++) {
            const monthName = `Month ${m + 1}`;

            // 1. ATTRITION LOGIC
            // Monthly attrition probability
            const attritionProb = inputs.attritionRate / 100 / 12;
            const attritionCount = currentHeadcount * attritionProb;

            // Apply attrition to cohorts proportionally (simplified)
            currentHeadcount -= attritionCount;
            cohorts.forEach(c => c.count -= (c.count * attritionProb));

            // 2. HIRING LOGIC
            const newHires = inputs.hiringPlan[m] || 0;
            currentHeadcount += newHires;
            cohorts.push({ monthsTenure: 0, count: newHires });

            // 3. REVENUE CALCULATION (STREET)
            let monthRevenueStreet = 0;
            cohorts.forEach(c => {
                // Determine ramp effectiveness
                let productivity = 1.0;
                if (c.monthsTenure < inputs.rampSchedule.length) {
                    productivity = inputs.rampSchedule[c.monthsTenure];
                }

                // Monthly Quota * Count * Productivity
                monthRevenueStreet += (inputs.quotaPerRep / 12) * c.count * productivity;

                // Age the cohort
                c.monthsTenure++;
            });

            // 4. REVENUE CALCULATION (SPREADSHEET / NAIVE)
            // Naive model often assumes: (Start + End)/2 * Quota, or just Headcount * Quota
            // Let's model the "Board Slide Lie": Headcount * Quota (immediately)
            const monthRevenueSpreadsheet = currentHeadcount * (inputs.quotaPerRep / 12);

            cumulativeRevenueStreet += monthRevenueStreet;
            cumulativeRevenueSpreadsheet += monthRevenueSpreadsheet;

            data.push({
                name: monthName,
                headcount: Math.round(currentHeadcount * 10) / 10,
                street: Math.round(monthRevenueStreet),
                spreadsheet: Math.round(monthRevenueSpreadsheet),
                gap: Math.round(monthRevenueSpreadsheet - monthRevenueStreet),
                cumulativeStreet: Math.round(cumulativeRevenueStreet),
                cumulativeSpreadsheet: Math.round(cumulativeRevenueSpreadsheet)
            });
        }

        setChartData(data);
        setSummary({
            totalStreet: Math.round(cumulativeRevenueStreet),
            totalSpreadsheet: Math.round(cumulativeRevenueSpreadsheet),
            gap: Math.round(cumulativeRevenueSpreadsheet - cumulativeRevenueStreet),
            gapPct: Math.round(((cumulativeRevenueSpreadsheet - cumulativeRevenueStreet) / cumulativeRevenueSpreadsheet) * 100)
        });
    };

    // --- HELPERS ---
    const formatMoney = (n) => new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', maximumFractionDigits: 0, notation: "compact"
    }).format(n);

    const handleExport = () => {
        // Simple CSV Export Logic
        const headers = ["Month", "Headcount", "Street Revenue", "Spreadsheet Revenue", "Gap"];
        const rows = chartData.map(d => [d.name, d.headcount, d.street, d.spreadsheet, d.gap]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "quota_cliff_analysis.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const updateHiringPlan = (index, val) => {
        const newPlan = [...inputs.hiringPlan];
        newPlan[index] = Number(val);
        setInputs({ ...inputs, hiringPlan: newPlan });
    };

    const updateRampSchedule = (index, val) => {
        const newRamp = [...inputs.rampSchedule];
        newRamp[index] = Number(val);
        setInputs({ ...inputs, rampSchedule: newRamp });
    };

    // --- RENDER ---
    return (
        <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col h-full">
            {/* 1. HEADER & CONTROLS */}
            <div className="p-6 border-b border-slate-700 bg-slate-900 z-20">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase tracking-widest mb-1">
                            <Users className="w-4 h-4" /> Capacity Planning Engine
                        </div>
                        <h2 className="text-2xl font-bold text-white">The Quota Cliff</h2>
                    </div>
                    <button onClick={handleExport} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors border border-slate-600">
                        <Download className="w-3 h-3" /> Export CSV
                    </button>
                </div>

                {/* TABS */}
                <div className="flex gap-1 bg-slate-800/50 p-1 rounded-lg inline-flex">
                    <button
                        onClick={() => setActiveTab('visuals')}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'visuals' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        <BarChart2 className="w-3 h-3 inline mr-1.5" /> Simulation
                    </button>
                    <button
                        onClick={() => setActiveTab('inputs')}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'inputs' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Settings className="w-3 h-3 inline mr-1.5" /> Assumptions
                    </button>
                    <button
                        onClick={() => setActiveTab('data')}
                        className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${activeTab === 'data' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                    >
                        <Table className="w-3 h-3 inline mr-1.5" /> Details
                    </button>
                </div>
            </div>

            {/* 2. MAIN CONTENT AREA */}
            <div className="flex-grow bg-slate-900 overflow-y-auto custom-scrollbar">

                {/* --- VIEW: VISUALS --- */}
                {activeTab === 'visuals' && (
                    <div className="p-6">
                        {/* KPI CARDS */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                                <div className="text-slate-400 text-xs font-bold mb-1">SPREADSHEET CAPACITY</div>
                                <div className="text-2xl font-bold text-white">{formatMoney(summary.totalSpreadsheet)}</div>
                            </div>
                            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500 rounded-full blur-[40px] opacity-20"></div>
                                <div className="text-emerald-400 text-xs font-bold mb-1">STREET CAPACITY (REAL)</div>
                                <div className="text-2xl font-bold text-white">{formatMoney(summary.totalStreet)}</div>
                            </div>
                            <div className="bg-red-500/10 p-4 rounded-xl border border-red-500/20">
                                <div className="text-red-400 text-xs font-bold mb-1">REVENUE GAP</div>
                                <div className="text-2xl font-bold text-red-100">{summary.gapPct}% <span className="text-sm font-normal opacity-50">({formatMoney(summary.gap)})</span></div>
                            </div>
                        </div>

                        {/* CHART */}
                        <div className="h-64 md:h-80 w-full mb-6">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorStreet" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                    <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis
                                        stroke="#64748b"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(val) => `$${val / 1000}k`}
                                    />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
                                        itemStyle={{ fontSize: '12px' }}
                                        formatter={(value, name) => [formatMoney(value), name === 'street' ? 'Street Capacity' : 'Spreadsheet Capacity']}
                                    />
                                    <Area type="monotone" dataKey="spreadsheet" stackId="2" stroke="#475569" strokeDasharray="5 5" fill="none" strokeWidth={2} name="Spreadsheet Capacity" />
                                    <Area type="monotone" dataKey="street" stackId="1" stroke="#6366f1" fill="url(#colorStreet)" strokeWidth={3} name="Street Capacity" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="bg-indigo-900/20 border border-indigo-500/20 rounded-lg p-4 flex gap-3 text-sm text-indigo-200 leading-relaxed">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 text-indigo-400 mt-0.5" />
                            <p>
                                <strong>Insight:</strong> You are overestimating year 1 capability by {summary.gapPct}%.
                                To hit your board target of {formatMoney(summary.totalSpreadsheet)}, you need to hire {Math.ceil(inputs.hiringPlan.reduce((a, b) => a + b, 0) * (summary.gap / summary.totalStreet))} more reps than planned, or reduce attrition to 0%.
                            </p>
                        </div>
                    </div>
                )}

                {/* --- VIEW: INPUTS --- */}
                {activeTab === 'inputs' && (
                    <div className="p-6 space-y-8">
                        {/* BASIC INPUTS */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-2">Starting Headcount</label>
                                <input
                                    type="number"
                                    value={inputs.startingReps}
                                    onChange={(e) => setInputs({ ...inputs, startingReps: Number(e.target.value) })}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-2">Annual Quota ($)</label>
                                <input
                                    type="number"
                                    value={inputs.quotaPerRep}
                                    onChange={(e) => setInputs({ ...inputs, quotaPerRep: Number(e.target.value) })}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-2">Annual Attrition (%)</label>
                                <input
                                    type="number"
                                    value={inputs.attritionRate}
                                    onChange={(e) => setInputs({ ...inputs, attritionRate: Number(e.target.value) })}
                                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-white focus:border-indigo-500 outline-none"
                                />
                            </div>
                        </div>

                        {/* HIRING PLAN GRID */}
                        <div>
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide block mb-3">Hiring Plan (New Reps / Month)</label>
                            <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                                {inputs.hiringPlan.map((val, idx) => (
                                    <div key={idx} className="text-center">
                                        <div className="text-[10px] text-slate-500 mb-1 font-mono">M{idx + 1}</div>
                                        <input
                                            type="number"
                                            value={val}
                                            onChange={(e) => updateHiringPlan(idx, e.target.value)}
                                            className="w-full bg-slate-800 border border-slate-600 rounded p-1 text-center text-white text-sm focus:border-indigo-500 outline-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* ADVANCED RAMP */}
                        <div className="border border-slate-700 rounded-xl overflow-hidden">
                            <button
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="w-full bg-slate-800 p-3 flex justify-between items-center text-xs font-bold text-slate-300 uppercase hover:bg-slate-700 transition"
                            >
                                <span>Advanced Ramp Configuration</span>
                                {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>

                            {showAdvanced && (
                                <div className="p-4 bg-slate-900 grid grid-cols-6 gap-2">
                                    {inputs.rampSchedule.map((val, idx) => (
                                        <div key={idx} className="text-center">
                                            <div className="text-[10px] text-slate-500 mb-1 font-mono">M{idx + 1} %</div>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={val}
                                                onChange={(e) => updateRampSchedule(idx, e.target.value)}
                                                className="w-full bg-slate-800 border border-slate-600 rounded p-1 text-center text-emerald-400 text-sm focus:border-emerald-500 outline-none"
                                            />
                                        </div>
                                    ))}
                                    <div className="col-span-6 mt-2 text-xs text-slate-500">
                                        * Define productivity % for the first 6 months of a rep's tenure.
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* --- VIEW: DATA TABLE --- */}
                {activeTab === 'data' && (
                    <div className="p-0">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="bg-slate-800 text-xs uppercase font-bold text-slate-300">
                                <tr>
                                    <th className="px-6 py-4">Month</th>
                                    <th className="px-6 py-4">Headcount</th>
                                    <th className="px-6 py-4 text-emerald-400">Street Rev</th>
                                    <th className="px-6 py-4">Sheet Rev</th>
                                    <th className="px-6 py-4 text-red-400">Gap</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {chartData.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-slate-800/30 transition">
                                        <td className="px-6 py-3 font-mono text-xs">{row.name}</td>
                                        <td className="px-6 py-3">{row.headcount}</td>
                                        <td className="px-6 py-3 font-mono text-emerald-300">{formatMoney(row.street)}</td>
                                        <td className="px-6 py-3 font-mono opacity-50">{formatMoney(row.spreadsheet)}</td>
                                        <td className="px-6 py-3 font-mono text-red-400">-{formatMoney(row.gap)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* FOOTER CTA */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex justify-between items-center text-xs text-slate-500">
                <span>Enterprise Grade v2.0</span>
                {!status ? (
                    <button className="text-indigo-400 hover:text-indigo-300 font-bold transition">Save Calculation</button>
                ) : (
                    <span className="text-emerald-500">Saved</span>
                )}
            </div>
        </div>
    );
};

export default CapacityCalculator;
