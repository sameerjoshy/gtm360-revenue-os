import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, TrendingUp, AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatusBadge from '../components/agents/StatusBadge';
import LastRunBadge from '../components/agents/LastRunBadge';
import AgentLoader from '../components/agents/AgentLoader';

const ForecastAnalyzer = () => {
    const navigate = useNavigate();
    const [lastRun, setLastRun] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState(null);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setLastRun(new Date());

        // Simulate forecast analysis
        setTimeout(() => {
            setAnalysis({
                current_quarter: 'Q1 2026',
                forecast_total: 2450000,
                committed: 1850000,
                best_case: 2950000,
                worst_case: 1950000,
                accuracy_score: 78,
                confidence_level: 'MEDIUM',
                risks: [
                    { severity: 'HIGH', issue: '3 large deals ($450K) slipping to next quarter', impact: '$450,000' },
                    { severity: 'MEDIUM', issue: 'Pipeline coverage ratio below 3x target', impact: 'Risk to Q2' },
                    { severity: 'LOW', issue: 'Average deal cycle extended by 12 days', impact: 'Timing risk' }
                ],
                recommendations: [
                    'Accelerate top 3 at-risk deals with executive engagement',
                    'Increase pipeline generation by 40% for Q2 coverage',
                    'Review and optimize sales process to reduce cycle time'
                ],
                trend_data: [
                    { month: 'Oct', forecast: 750000, actual: 720000 },
                    { month: 'Nov', forecast: 820000, actual: 850000 },
                    { month: 'Dec', forecast: 880000, actual: 830000 },
                    { month: 'Jan', forecast: 950000, actual: 920000 },
                    { month: 'Feb', forecast: 1020000, actual: null },
                    { month: 'Mar', forecast: 1100000, actual: null }
                ]
            });
            setIsAnalyzing(false);
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
                    <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600">
                        <BarChart3 size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Forecast Analyzer</h1>
                        <p className="text-slate-500 text-sm">AI-powered forecast accuracy and risk analysis</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status="ACTIVE" />
                    <LastRunBadge timestamp={lastRun} />
                </div>
            </div>

            {/* Analyze Button */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Run Forecast Analysis</h3>
                <p className="text-slate-600 text-sm mb-6">
                    Analyze current quarter forecast accuracy, identify risks, and get AI-powered recommendations.
                </p>
                <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-lg font-bold hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <RefreshCw size={18} className={isAnalyzing ? 'animate-spin' : ''} />
                    {isAnalyzing ? 'Analyzing...' : 'Analyze Forecast'}
                </button>
            </div>

            {/* Loading State */}
            {isAnalyzing && (
                <div className="bg-white rounded-xl border border-slate-200 p-12">
                    <AgentLoader message="Analyzing pipeline and forecast data..." />
                </div>
            )}

            {/* Analysis Results */}
            {analysis && !isAnalyzing && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Summary Cards */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Forecast Total</p>
                            <p className="text-3xl font-bold text-slate-900">${(analysis.forecast_total / 1000000).toFixed(2)}M</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Committed</p>
                            <p className="text-3xl font-bold text-green-600">${(analysis.committed / 1000000).toFixed(2)}M</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Accuracy Score</p>
                            <p className="text-3xl font-bold text-blue-600">{analysis.accuracy_score}%</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Confidence</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${analysis.confidence_level === 'HIGH' ? 'bg-green-100 text-green-700' :
                                    analysis.confidence_level === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                                        'bg-red-100 text-red-700'
                                }`}>
                                {analysis.confidence_level}
                            </span>
                        </div>
                    </div>

                    {/* Forecast Trend Chart */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Forecast vs Actual Trend</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={analysis.trend_data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis tickFormatter={(value) => `$${(value / 1000)}K`} />
                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                <Legend />
                                <Line type="monotone" dataKey="forecast" stroke="#3b82f6" strokeWidth={2} name="Forecast" />
                                <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actual" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Risks */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900">Identified Risks</h3>
                        </div>
                        <div className="divide-y divide-slate-200">
                            {analysis.risks.map((risk, idx) => (
                                <div key={idx} className="p-6 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <AlertCircle className={
                                            risk.severity === 'HIGH' ? 'text-red-600' :
                                                risk.severity === 'MEDIUM' ? 'text-yellow-600' :
                                                    'text-blue-600'
                                        } size={24} />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${risk.severity === 'HIGH' ? 'bg-red-100 text-red-700' :
                                                        risk.severity === 'MEDIUM' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {risk.severity}
                                                </span>
                                                <span className="text-sm font-medium text-slate-600">Impact: {risk.impact}</span>
                                            </div>
                                            <p className="text-slate-900">{risk.issue}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recommendations */}
                    <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">AI Recommendations</h3>
                        <ul className="space-y-3">
                            {analysis.recommendations.map((rec, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-slate-700">
                                    <TrendingUp className="text-blue-600 mt-1" size={18} />
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ForecastAnalyzer;
