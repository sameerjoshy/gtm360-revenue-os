import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, TrendingUp, CheckCircle, XCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const AgentAnalytics = () => {
    const [timeRange, setTimeRange] = useState('7d'); // 7d, 30d, 90d
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMetrics();
    }, [timeRange]);

    const fetchMetrics = async () => {
        setLoading(true);
        try {
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const res = await fetch(`${API_BASE}/analytics/agent-metrics?range=${timeRange}`);

            if (res.ok) {
                const data = await res.json();
                setMetrics(data);
            } else {
                throw new Error('Failed to fetch metrics');
            }
        } catch (e) {
            console.error(e);
            // Mock fallback
            setMetrics({
                total_runs: 1247,
                success_rate: 94.2,
                avg_execution_time: 2.3,
                most_active_agent: 'Researcher',
                agent_breakdown: [
                    { agent: 'Researcher', runs: 456, success: 98, avg_time: 3.2 },
                    { agent: 'Sniper', runs: 342, success: 95, avg_time: 1.8 },
                    { agent: 'Listener', runs: 189, success: 92, avg_time: 0.9 },
                    { agent: 'Sales', runs: 123, success: 91, avg_time: 2.1 },
                    { agent: 'Expansion', runs: 87, success: 89, avg_time: 2.5 },
                    { agent: 'RevOps', runs: 50, success: 96, avg_time: 1.4 }
                ],
                daily_runs: [
                    { date: 'Jan 22', runs: 45 },
                    { date: 'Jan 23', runs: 52 },
                    { date: 'Jan 24', runs: 48 },
                    { date: 'Jan 25', runs: 61 },
                    { date: 'Jan 26', runs: 58 },
                    { date: 'Jan 27', runs: 67 },
                    { date: 'Jan 28', runs: 72 }
                ]
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <Activity className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
                    <p className="text-slate-600">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Agent Analytics</h1>
                <p className="text-slate-600">Performance metrics and usage insights across all agents</p>
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-2 mb-6">
                {['7d', '30d', '90d'].map(range => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${timeRange === range
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        Last {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
                    </button>
                ))}
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-slate-200 p-6"
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-600 text-sm font-medium">Total Runs</p>
                        <Activity size={20} className="text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{metrics.total_runs.toLocaleString()}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-xl border border-slate-200 p-6"
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-600 text-sm font-medium">Success Rate</p>
                        <CheckCircle size={20} className="text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{metrics.success_rate}%</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl border border-slate-200 p-6"
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-600 text-sm font-medium">Avg Execution</p>
                        <Clock size={20} className="text-orange-600" />
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{metrics.avg_execution_time}s</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl border border-slate-200 p-6"
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-slate-600 text-sm font-medium">Most Active</p>
                        <TrendingUp size={20} className="text-purple-600" />
                    </div>
                    <p className="text-xl font-bold text-slate-900">{metrics.most_active_agent}</p>
                </motion.div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Agent Breakdown */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Runs by Agent</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={metrics.agent_breakdown}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="agent" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip />
                            <Bar dataKey="runs" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Daily Trend */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Daily Activity</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={metrics.daily_runs}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="date" stroke="#64748b" />
                            <YAxis stroke="#64748b" />
                            <Tooltip />
                            <Line type="monotone" dataKey="runs" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Agent Details Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900">Agent Performance</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Agent</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Total Runs</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Success Rate</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase tracking-wider">Avg Time</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {metrics.agent_breakdown.map((agent, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="font-medium text-slate-900">{agent.agent}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                                        {agent.runs.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${agent.success >= 95 ? 'bg-green-100 text-green-700' :
                                                agent.success >= 90 ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {agent.success}%
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-slate-600">
                                        {agent.avg_time}s
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AgentAnalytics;
