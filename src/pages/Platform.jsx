import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { AlertTriangle, CheckCircle, Activity, TrendingUp, Cpu, BarChart2 } from 'lucide-react';

const Platform = () => {
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
            <Helmet>
                <title>Platform Demo | GTM360 Revenue OS</title>
                <meta name="description" content="Interactive demo of the GTM360 Revenue Operating System. See the difference between ad-hoc growth and engineered revenue." />
            </Helmet>

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
                    <div className="inline-flex bg-white p-1 rounded-full border border-gray-200 shadow-sm relative">
                        <button
                            onClick={() => setMode('chaos')}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${mode === 'chaos' ? 'bg-red-100 text-red-700 shadow-inner' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <AlertTriangle size={16} />
                            Ad-Hoc Mode (Chaos)
                        </button>
                        <button
                            onClick={() => setMode('system')}
                            className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${mode === 'system' ? 'bg-[var(--color-primary)] text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <Cpu size={16} />
                            Revenue OS (System)
                        </button>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* METRIC 1: Forecast Accuracy */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Forecast Precision</h3>
                                <p className={`text-2xl font-bold mt-1 ${mode === 'chaos' ? 'text-red-600' : 'text-green-600'}`}>
                                    {mode === 'chaos' ? '± 42%' : '± 4%'}
                                </p>
                            </div>
                            <div className={`p-2 rounded-full ${mode === 'chaos' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                                <Activity size={20} />
                            </div>
                        </div>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={currentData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="month" hide />
                                    <YAxis hide domain={['dataMin - 10', 'dataMax + 10']} />
                                    <Tooltip />
                                    <Line
                                        type="monotone"
                                        dataKey="forecast"
                                        stroke="#94a3b8"
                                        strokeDasharray="5 5"
                                        dot={false}
                                        strokeWidth={2}
                                        name="Forecast"
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke={mode === 'chaos' ? '#ef4444' : '#10b981'}
                                        strokeWidth={3}
                                        dot={{ r: 4 }}
                                        name="Actuals"
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            {mode === 'chaos'
                                ? "Warning: Actuals decoupling from plan. High volatility detected."
                                : "System Healthy: Execution variance within acceptable limits."}
                        </p>
                    </div>

                    {/* METRIC 2: Signal-to-Noise */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Signal Quality</h3>
                                <p className={`text-2xl font-bold mt-1 ${mode === 'chaos' ? 'text-orange-500' : 'text-[var(--color-primary)]'}`}>
                                    {mode === 'chaos' ? 'Low (Noise Dominant)' : 'High (Signal Rich)'}
                                </p>
                            </div>
                            <div className={`p-2 rounded-full ${mode === 'chaos' ? 'bg-orange-50 text-orange-600' : 'bg-indigo-50 text-indigo-600'}`}>
                                <BarChart2 size={20} />
                            </div>
                        </div>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={currentData}>
                                    <defs>
                                        <linearGradient id="colorNoise" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={mode === 'chaos' ? '#f97316' : '#6366f1'} stopOpacity={0.1} />
                                            <stop offset="95%" stopColor={mode === 'chaos' ? '#f97316' : '#6366f1'} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="month" hide />
                                    <YAxis hide />
                                    <Tooltip />
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
                        <p className="text-xs text-gray-500 mt-2">
                            {mode === 'chaos'
                                ? "Alert: 80% of CRM activity is 'Noise' (non-revenue generating)."
                                : "Optimization: Noise filtered. Focus on high-intent signals."}
                        </p>
                    </div>

                    {/* INSIGHT CARD (Textual) */}
                    <div className={`p-6 rounded-lg shadow-sm border border-l-4 ${mode === 'chaos' ? 'bg-red-50 border-red-500 border-gray-100' : 'bg-indigo-50 border-[var(--color-primary)] border-indigo-100'}`}>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            {mode === 'chaos' ? <AlertTriangle size={20} className="text-red-500" /> : <CheckCircle size={20} className="text-[var(--color-primary)]" />}
                            {mode === 'chaos' ? "Operating Reality: Reactive" : "Operating Reality: Engineered"}
                        </h3>
                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between border-b border-black/5 pb-2">
                                <span className={mode === 'chaos' ? 'text-red-700' : 'text-gray-600'}>Decision Latency</span>
                                <span className="font-mono font-bold">{mode === 'chaos' ? '14 Days' : '4 Hours'}</span>
                            </div>
                            <div className="flex justify-between border-b border-black/5 pb-2">
                                <span className={mode === 'chaos' ? 'text-red-700' : 'text-gray-600'}>Pipeline Confidence</span>
                                <span className="font-mono font-bold">{mode === 'chaos' ? 'Low (Subjective)' : 'High (Data-Led)'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className={mode === 'chaos' ? 'text-red-700' : 'text-gray-600'}>Growth Compounding</span>
                                <span className="font-mono font-bold">{mode === 'chaos' ? 'No (Linear)' : 'Yes (Exponential)'}</span>
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
