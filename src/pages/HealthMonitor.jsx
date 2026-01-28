import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Activity, TrendingUp, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import StatusBadge from '../components/agents/StatusBadge';
import LastRunBadge from '../components/agents/LastRunBadge';
import AgentLoader from '../components/agents/AgentLoader';

const HealthMonitor = () => {
    const navigate = useNavigate();
    const [lastRun, setLastRun] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [healthData, setHealthData] = useState(null);

    const handleScan = async () => {
        setIsScanning(true);
        setLastRun(new Date());

        // Simulate health monitoring
        setTimeout(() => {
            setHealthData({
                overall_score: 78,
                total_accounts: 247,
                healthy: 189,
                at_risk: 35,
                critical: 23,
                metrics: [
                    { name: 'Product Usage', score: 85, status: 'HEALTHY' },
                    { name: 'Feature Adoption', score: 72, status: 'GOOD' },
                    { name: 'Support Engagement', score: 68, status: 'ATTENTION' },
                    { name: 'NPS Score', score: 81, status: 'HEALTHY' },
                    { name: 'Login Frequency', score: 75, status: 'GOOD' },
                    { name: 'Renewal Likelihood', score: 79, status: 'GOOD' }
                ],
                trending_down: [
                    { company: 'TechCorp Inc', metric: 'Login Frequency', change: -45, current: 55 },
                    { company: 'DataFlow Systems', metric: 'Feature Adoption', change: -32, current: 48 },
                    { company: 'CloudStart LLC', metric: 'Support Satisfaction', change: -28, current: 62 }
                ],
                chart_data: [
                    { month: 'Aug', healthy: 195, at_risk: 28, critical: 18 },
                    { month: 'Sep', healthy: 192, at_risk: 31, critical: 20 },
                    { month: 'Oct', healthy: 191, at_risk: 33, critical: 21 },
                    { month: 'Nov', healthy: 190, at_risk: 34, critical: 22 },
                    { month: 'Dec', healthy: 189, at_risk: 35, critical: 23 }
                ]
            });
            setIsScanning(false);
        }, 2500);
    };

    return (
        <div className="max-w-7xl mx-auto pb-20">
            {/* Navigation */}
            <button
                onClick={() => navigate('/agent-workbench')}
                className="flex items-center text-slate-400 hover:text-slate-600 text-sm mb-4 transition-colors"
            >
                <ArrowLeft size={16} className="mr-1" />
                Back to Swarm Map
            </button>

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600">
                        <Heart size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Health Monitor</h1>
                        <p className="text-slate-500 text-sm">Real-time customer health tracking and insights</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status="ACTIVE" />
                    <LastRunBadge timestamp={lastRun} />
                </div>
            </div>

            {/* Scan Button */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Run Health Check</h3>
                <p className="text-slate-600 text-sm mb-6">
                    Scan all customer accounts to assess health scores across usage, engagement, and satisfaction metrics.
                </p>
                <button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <RefreshCw size={18} className={isScanning ? 'animate-spin' : ''} />
                    {isScanning ? 'Scanning...' : 'Scan All Accounts'}
                </button>
            </div>

            {/* Loading State */}
            {isScanning && (
                <div className="bg-white rounded-xl border border-slate-200 p-12">
                    <AgentLoader message="Analyzing customer health metrics..." />
                </div>
            )}

            {/* Health Dashboard */}
            {healthData && !isScanning && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Summary Cards */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Overall Health</p>
                            <p className="text-3xl font-bold text-emerald-600">{healthData.overall_score}%</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Healthy</p>
                            <p className="text-3xl font-bold text-green-600">{healthData.healthy}</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">At Risk</p>
                            <p className="text-3xl font-bold text-yellow-600">{healthData.at_risk}</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Critical</p>
                            <p className="text-3xl font-bold text-red-600">{healthData.critical}</p>
                        </div>
                    </div>

                    {/* Health Trend Chart */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Health Trend (Last 5 Months)</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={healthData.chart_data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="healthy" fill="#10b981" name="Healthy" />
                                <Bar dataKey="at_risk" fill="#f59e0b" name="At Risk" />
                                <Bar dataKey="critical" fill="#ef4444" name="Critical" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Health Metrics */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900">Health Metrics Breakdown</h3>
                        </div>
                        <div className="divide-y divide-slate-200">
                            {healthData.metrics.map((metric, idx) => (
                                <div key={idx} className="p-6 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-900 mb-1">{metric.name}</p>
                                            <div className="w-full bg-slate-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${metric.score >= 80 ? 'bg-green-600' :
                                                            metric.score >= 70 ? 'bg-emerald-600' :
                                                                metric.score >= 60 ? 'bg-yellow-600' :
                                                                    'bg-red-600'
                                                        }`}
                                                    style={{ width: `${metric.score}%` }}
                                                />
                                            </div>
                                        </div>
                                        <div className="ml-6 text-right">
                                            <p className="text-2xl font-bold text-slate-900">{metric.score}</p>
                                            <span className={`text-xs font-medium ${metric.status === 'HEALTHY' ? 'text-green-600' :
                                                    metric.status === 'GOOD' ? 'text-emerald-600' :
                                                        'text-yellow-600'
                                                }`}>
                                                {metric.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trending Down */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900">Accounts Trending Down</h3>
                        </div>
                        <div className="divide-y divide-slate-200">
                            {healthData.trending_down.map((account, idx) => (
                                <div key={idx} className="p-6 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-slate-900 mb-1">{account.company}</p>
                                            <p className="text-sm text-slate-600">{account.metric}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-red-600">{account.change}%</p>
                                            <p className="text-sm text-slate-600">Current: {account.current}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default HealthMonitor;
