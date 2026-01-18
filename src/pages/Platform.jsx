import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AlertTriangle, CheckCircle, Activity, TrendingUp, Cpu, BarChart2 } from 'lucide-react';

const Platform = () => {
    // ... existing logic ...
    return (
        // ... existing JSX ...
        We install the dashboard you see on the right.
                        </p >
    <Link to="/contact" className="btn bg-white text-[var(--color-primary)] hover:bg-indigo-50 border-none">
        Deploy GTM-360 →
    </Link>
                    </div >
    {/* Background deco */ }
// ... existing JSX ...
const [mode, setMode] = useState('chaos'); // 'chaos' or 'system'

// Mock Data: Chaos (Volatile, Unpredictable)
const chaosData = [
    { month: 'Jan', revenue: 80, forecast: 120, noise: 80 },
    { month: 'Feb', revenue: 95, forecast: 130, noise: 75 },
    { month: 'Mar', revenue: 60, forecast: 140, noise: 90 }, // Miss
    { month: 'Apr', revenue: 110, forecast: 110, noise: 60 }, // Heroics
    { month: 'May', revenue: 75, forecast: 150, noise: 85 }, // Miss
    { month: 'Jun', revenue: 85, forecast: 160, noise: 80 },
];

// Mock Data: System (Predictable, Converging)
const systemData = [
    { month: 'Jan', revenue: 82, forecast: 85, noise: 40 },
    { month: 'Feb', revenue: 90, forecast: 92, noise: 35 },
    { month: 'Mar', revenue: 105, forecast: 100, noise: 30 }, // Beat
    { month: 'Apr', revenue: 115, forecast: 112, noise: 25 },
    { month: 'May', revenue: 128, forecast: 125, noise: 20 },
    { month: 'Jun', revenue: 140, forecast: 138, noise: 15 },
];

const currentData = mode === 'chaos' ? chaosData : systemData;

return (
    <div className="platform-page bg-slate-50 min-h-screen pt-24 pb-16">
        <SEO
            title="Platform Demo"
            description="Interactive demo of the GTM360 Revenue Operating System. See the difference between ad-hoc growth and engineered revenue."
        />

        <div className="container max-w-7xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-semibold text-gray-900 mb-4">
                    See the System in Action
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                    Most companies run on "Ad-Hoc Heroics." We migrate you to an "Engineered System."
                    Toggle the view to see the difference in operating reality.
                </p>

                {/* The Toggle */}
                <div className="inline-flex bg-slate-100 p-1.5 rounded-full relative">
                    <button
                        onClick={() => setMode('chaos')}
                        className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${mode === 'chaos' ? 'bg-white text-slate-800 shadow-md ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <AlertTriangle size={18} className={mode === 'chaos' ? "text-red-500" : "text-slate-400"} />
                        Chaos Mode
                    </button>
                    <button
                        onClick={() => setMode('system')}
                        className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${mode === 'system' ? 'bg-white text-blue-700 shadow-md ring-1 ring-black/5' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Cpu size={18} className={mode === 'system' ? "text-blue-600" : "text-slate-400"} />
                        System Mode
                    </button>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* METRIC 1: Forecast Accuracy */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Forecast Acc.</h3>
                            <p className={`text-4xl font-bold mt-2 ${mode === 'chaos' ? 'text-slate-700' : 'text-blue-600'}`}>
                                {mode === 'chaos' ? '± 42%' : '± 4%'}
                            </p>
                        </div>
                        <div className={`p-3 rounded-xl ${mode === 'chaos' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-600'}`}>
                            <Activity size={24} />
                        </div>
                    </div>
                    <div className="h-48 -mx-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={currentData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" hide />
                                <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="forecast"
                                    stroke="#cbd5e1"
                                    strokeDasharray="4 4"
                                    dot={false}
                                    strokeWidth={2}
                                    name="Forecast"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke={mode === 'chaos' ? '#ef4444' : '#2563eb'}
                                    strokeWidth={3}
                                    dot={{ r: 4, fill: mode === 'chaos' ? '#ef4444' : '#2563eb', strokeWidth: 0 }}
                                    name="Actuals"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <p className={`text-sm font-medium mt-4 ${mode === 'chaos' ? 'text-red-600' : 'text-slate-600'}`}>
                        {mode === 'chaos'
                            ? "⚠ Variance Warning: Decoupled from plan."
                            : "✓ System Healthy: Within 5% variance."}
                    </p>
                </div>

                {/* METRIC 2: Signal-to-Noise */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-all duration-500">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Signal Quality</h3>
                            <p className={`text-4xl font-bold mt-2 ${mode === 'chaos' ? 'text-slate-700' : 'text-blue-600'}`}>
                                {mode === 'chaos' ? 'Low' : 'High'}
                            </p>
                        </div>
                        <div className={`p-3 rounded-xl ${mode === 'chaos' ? 'bg-orange-50 text-orange-500' : 'bg-indigo-50 text-indigo-600'}`}>
                            <BarChart2 size={24} />
                        </div>
                    </div>
                    <div className="h-48 -mx-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={currentData}>
                                <defs>
                                    <linearGradient id="colorNoise" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={mode === 'chaos' ? '#f97316' : '#6366f1'} stopOpacity={0.1} />
                                        <stop offset="95%" stopColor={mode === 'chaos' ? '#f97316' : '#6366f1'} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="month" hide />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="noise"
                                    stroke={mode === 'chaos' ? '#f97316' : '#6366f1'}
                                    fillOpacity={1}
                                    fill="url(#colorNoise)"
                                    name="System Noise"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <p className={`text-sm font-medium mt-4 ${mode === 'chaos' ? 'text-orange-600' : 'text-slate-600'}`}>
                        {mode === 'chaos'
                            ? "⚠ noise-dominated: 80% non-revenue activity."
                            : "✓ Signal-rich: High-intent interactions."}
                    </p>
                </div>

                {/* INSIGHT CARD (Textual) */}
                <div className={`p-8 rounded-2xl shadow-sm border transition-all duration-500 ${mode === 'chaos' ? 'bg-red-50/50 border-red-100' : 'bg-blue-50/50 border-blue-100'}`}>
                    <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                        {mode === 'chaos' ? <AlertTriangle size={24} className="text-red-500" /> : <CheckCircle size={24} className="text-blue-600" />}
                        <span className={mode === 'chaos' ? "text-red-900" : "text-blue-900"}>
                            {mode === 'chaos' ? "Operating Reality" : "Engineered Reality"}
                        </span>
                    </h3>
                    <div className="space-y-6 text-sm">
                        <div className="flex justify-between items-center pb-4 border-b border-black/5">
                            <span className="text-slate-500 font-medium">Decision Latency</span>
                            <span className={`font-mono font-bold px-2 py-1 rounded ${mode === 'chaos' ? 'bg-red-100 text-red-700' : 'bg-white text-blue-700 shadow-sm'}`}>
                                {mode === 'chaos' ? '14 Days' : '4 Hours'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-black/5">
                            <span className="text-slate-500 font-medium">Pipeline Confidence</span>
                            <span className={`font-mono font-bold px-2 py-1 rounded ${mode === 'chaos' ? 'bg-red-100 text-red-700' : 'bg-white text-blue-700 shadow-sm'}`}>
                                {mode === 'chaos' ? 'Low' : 'High'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500 font-medium">Compounding</span>
                            <span className={`font-mono font-bold px-2 py-1 rounded ${mode === 'chaos' ? 'bg-red-100 text-red-700' : 'bg-white text-blue-700 shadow-sm'}`}>
                                {mode === 'chaos' ? 'No' : 'Yes'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Call to Action Block */}
            <div className="mt-16 bg-[var(--color-primary)] rounded-xl p-10 text-center text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl font-semibold mb-4">Stop guessing. Start engineering.</h2>
                    <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
                        The difference isn't the team. It's the operating system. <br />
                        We install the dashboard you see on the right.
                    </p>
                    <a href="/contact" className="btn bg-white text-[var(--color-primary)] hover:bg-indigo-50 border-none">
                        Deploy GTM-360 →
                    </a>
                </div>
                {/* Background deco */}
                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <svg width="100%" height="100%">
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>
            </div>

        </div>
    </div>
);
};

export default Platform;
