import React, { useState } from 'react';
import { ArrowRight, DollarSign, Calculator, ChevronRight, TrendingDown, ShieldAlert, Zap, Download } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import useSubmitLead from '../../hooks/useSubmitLead';

const RevenueLeakageCalculator = () => {
    // FORM STATE
    const [inputs, setInputs] = useState({
        arr: 5000000,
        growthRate: 20, // %
        salesCycle: 90, // days
        winRate: 25 // %
    });

    // UI STATE
    const [view, setView] = useState('input'); // 'input', 'result'
    const [leadForm, setLeadForm] = useState({ email: '', role: '' });
    const { submit, status } = useSubmitLead();

    // CALCULATIONS
    const calculateLeakage = () => {
        const annualRevenue = Number(inputs.arr);

        // Dynamic factors based on inputs (simplified logic for demo)
        const slippagePct = 0.08 * (inputs.salesCycle / 90);
        const handoffPct = 0.05 * (1 + (inputs.growthRate / 100));
        const wastePct = 0.04 * (1 / (inputs.winRate / 25));

        const slippageAmount = Math.round(annualRevenue * slippagePct);
        const handoffAmount = Math.round(annualRevenue * handoffPct);
        const wasteAmount = Math.round(annualRevenue * wastePct);

        const totalLeakageAmount = slippageAmount + handoffAmount + wasteAmount;
        const totalLeakagePct = (totalLeakageAmount / annualRevenue) * 100;

        return {
            amount: totalLeakageAmount,
            pct: totalLeakagePct.toFixed(1),
            breakdown: [
                { name: 'Pipeline Slippage', value: slippageAmount, color: '#ef4444' },
                { name: 'Expansion Missed', value: handoffAmount, color: '#f97316' },
                { name: 'Efficiency Waste', value: wasteAmount, color: '#facc15' }
            ]
        };
    };

    const leakageResults = calculateLeakage();

    const handleCalculate = (e) => {
        e.preventDefault();
        setView('result');
    };

    const formatCurrency = (num) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, notation: 'compact' }).format(num);
    };

    const handleExport = () => {
        const headers = ["Category", "Loss Amount"];
        const rows = leakageResults.breakdown.map(b => [b.name, b.value]);
        rows.push(["Total Annual Leakage", leakageResults.amount]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "revenue_leakage_audit.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (!leadForm.email) return;

        submit('revenue_leakage_result', [
            { name: 'email', value: leadForm.email },
            { name: 'jobtitle', value: leadForm.role },
            { name: 'annualrevenue', value: inputs.arr },
            { name: 'message', value: `Estimated Leakage: ${formatCurrency(leakageResults.amount)} (${leakageResults.pct}% of ARR)` }
        ]);
    };

    return (
        <div className="bg-slate-900 rounded-3xl p-1 text-white relative overflow-hidden shadow-2xl border border-slate-800 h-full">
            <div className="bg-slate-950 rounded-[inherit] p-8 md:p-12 relative z-10 h-full flex flex-col">

                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>

                <div className="mb-10 flex items-center justify-between">
                    <div>
                        <span className="text-red-500 font-mono text-[10px] tracking-widest uppercase mb-2 block flex items-center gap-2">
                            <ShieldAlert className="w-3 h-3" /> System Friction Audit
                        </span>
                        <h3 className="text-2xl font-bold text-white tracking-tight">Revenue Leakage <span className="text-red-500">Analyzer</span></h3>
                    </div>
                    {view === 'result' && (
                        <button onClick={handleExport} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700" title="Export CSV">
                            <Download className="w-4 h-4 text-slate-400" />
                        </button>
                    )}
                </div>

                {view === 'input' ? (
                    <form onSubmit={handleCalculate} className="flex-grow flex flex-col">
                        <p className="text-slate-400 mb-10 text-sm leading-relaxed max-w-md">
                            Most GTM systems lose 15-25% of their potential revenue to invisible friction. Map your leakage in 30 seconds.
                        </p>

                        <div className="space-y-8 mb-12">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">Annual Recurring Revenue (ARR)</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-slate-500 font-bold">$</span>
                                    </div>
                                    <input
                                        type="number"
                                        value={inputs.arr}
                                        onChange={(e) => setInputs({ ...inputs, arr: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-800 group-hover:border-slate-700 rounded-xl py-4 pl-10 pr-4 text-white focus:border-red-500/50 outline-none transition-all font-mono text-lg"
                                        placeholder="5,000,000"
                                        min="0"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">Sales Cycle (Days)</label>
                                    <input
                                        type="number"
                                        value={inputs.salesCycle}
                                        onChange={(e) => setInputs({ ...inputs, salesCycle: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-red-500/50 outline-none transition-all font-mono"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-3 tracking-widest">Win Rate (%)</label>
                                    <input
                                        type="number"
                                        value={inputs.winRate}
                                        onChange={(e) => setInputs({ ...inputs, winRate: e.target.value })}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-red-500/50 outline-none transition-all font-mono"
                                    />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white py-5 rounded-xl flex items-center justify-center gap-3 font-bold text-lg transition-all shadow-xl shadow-red-900/20 active:scale-[0.98]">
                            Audit System Health <ArrowRight className="w-5 h-5" />
                        </button>
                    </form>
                ) : (
                    <div className="flex-grow flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
                            {/* RESULTS HERO */}
                            <div className="space-y-6">
                                <div className="p-6 bg-red-500/5 rounded-2xl border border-red-500/20">
                                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-2">Annual Leakage Estimate</p>
                                    <h2 className="text-5xl font-bold text-white mb-2">{formatCurrency(leakageResults.amount)}</h2>
                                    <div className="flex items-center gap-2 text-sm text-red-500 font-bold">
                                        <TrendingDown className="w-4 h-4" /> {leakageResults.pct}% of Gross ARR
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {leakageResults.breakdown.map((item, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                                <span className="text-xs text-slate-400 font-medium">{item.name}</span>
                                            </div>
                                            <span className="text-xs font-mono font-bold text-white">{formatCurrency(item.value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* PIE CHART */}
                            <div className="h-64 bg-slate-900/50 rounded-2xl border border-slate-800 p-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={leakageResults.breakdown}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {leakageResults.breakdown.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                                            formatter={(value) => formatCurrency(value)}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* LEAD GEN FOOTER */}
                        <div className="mt-auto pt-8 border-t border-slate-800">
                            {status === 'success' ? (
                                <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl text-emerald-400 text-center animate-in zoom-in-95 duration-300">
                                    <div className="flex justify-center mb-2">
                                        <Zap className="w-8 h-8 fill-emerald-500/20" />
                                    </div>
                                    <p className="font-bold text-lg">Audit Sent to Inbox</p>
                                    <p className="text-sm opacity-70">We've included the $1M+ ARR reclamation checklist.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col md:flex-row gap-6 items-center">
                                    <div className="flex-grow">
                                        <h4 className="font-bold text-white mb-1">Get the Reclamation Roadmap</h4>
                                        <p className="text-xs text-slate-500">We'll send the detailed breakdown and a bespoke fix strategy.</p>
                                    </div>
                                    <form onSubmit={handleEmailSubmit} className="flex gap-2 w-full md:w-auto">
                                        <input
                                            type="email"
                                            placeholder="Work Email"
                                            value={leadForm.email}
                                            onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                                            className="px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:border-red-500/50 outline-none text-sm text-white w-full md:w-64"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            disabled={status === 'submitting'}
                                            className="bg-white text-slate-950 hover:bg-slate-100 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all disabled:opacity-50 h-full"
                                        >
                                            {status === 'submitting' ? '...' : 'Send'}
                                        </button>
                                    </form>
                                </div>
                            )}

                            <button
                                onClick={() => setView('input')}
                                className="mt-8 w-full text-center text-[10px] font-bold text-slate-600 hover:text-red-400 uppercase tracking-widest transition-colors"
                            >
                                ← Recalibrate Baseline
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RevenueLeakageCalculator;
