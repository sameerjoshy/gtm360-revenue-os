import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, TrendingDown, Users, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import StatusBadge from '../components/agents/StatusBadge';
import LastRunBadge from '../components/agents/LastRunBadge';
import AgentLoader from '../components/agents/AgentLoader';

const ChurnPredictor = () => {
    const navigate = useNavigate();
    const [lastRun, setLastRun] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [results, setResults] = useState(null);

    const handleScan = async () => {
        setIsScanning(true);
        setLastRun(new Date());

        // Simulate churn analysis
        setTimeout(() => {
            setResults({
                total_accounts: 247,
                at_risk: 23,
                high_risk: 8,
                medium_risk: 15,
                accounts: [
                    {
                        id: 1,
                        company: 'TechCorp Inc',
                        risk_score: 87,
                        risk_level: 'HIGH',
                        signals: ['Login activity down 65%', 'Support tickets up 3x', 'No feature adoption in 60 days'],
                        recommended_action: 'Immediate executive check-in + success plan review'
                    },
                    {
                        id: 2,
                        company: 'DataFlow Systems',
                        risk_score: 82,
                        risk_level: 'HIGH',
                        signals: ['Contract expires in 45 days', 'Champion left company', 'Usage declining'],
                        recommended_action: 'Schedule renewal conversation + identify new champion'
                    },
                    {
                        id: 3,
                        company: 'CloudStart LLC',
                        risk_score: 71,
                        risk_level: 'MEDIUM',
                        signals: ['Stagnant usage', 'Low NPS score (4/10)', 'Missed QBR'],
                        recommended_action: 'Proactive outreach + value demonstration'
                    },
                    {
                        id: 4,
                        company: 'Innovation Labs',
                        risk_score: 68,
                        risk_level: 'MEDIUM',
                        signals: ['Feature requests ignored', 'Slow support response times', 'Budget cuts announced'],
                        recommended_action: 'Address product gaps + demonstrate ROI'
                    }
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
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600">
                        <TrendingDown size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Churn Predictor</h1>
                        <p className="text-slate-500 text-sm">Identify at-risk accounts before they churn</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status="ACTIVE" />
                    <LastRunBadge timestamp={lastRun} />
                </div>
            </div>

            {/* Scan Button */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Run Churn Analysis</h3>
                <p className="text-slate-600 text-sm mb-6">
                    Analyze customer usage patterns, engagement metrics, and support interactions to identify accounts at risk of churning.
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
                    <AgentLoader message="Analyzing customer health signals..." />
                </div>
            )}

            {/* Results */}
            {results && !isScanning && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Summary Cards */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Total Accounts</p>
                            <p className="text-3xl font-bold text-slate-900">{results.total_accounts}</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">At Risk</p>
                            <p className="text-3xl font-bold text-orange-600">{results.at_risk}</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">High Risk</p>
                            <p className="text-3xl font-bold text-red-600">{results.high_risk}</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Medium Risk</p>
                            <p className="text-3xl font-bold text-yellow-600">{results.medium_risk}</p>
                        </div>
                    </div>

                    {/* At-Risk Accounts */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900">At-Risk Accounts</h3>
                        </div>
                        <div className="divide-y divide-slate-200">
                            {results.accounts.map(account => (
                                <div key={account.id} className="p-6 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h4 className="text-lg font-bold text-slate-900 mb-1">{account.company}</h4>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${account.risk_level === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {account.risk_level} RISK
                                                </span>
                                                <span className="text-sm text-slate-600">
                                                    Risk Score: <span className="font-bold text-slate-900">{account.risk_score}</span>
                                                </span>
                                            </div>
                                        </div>
                                        <AlertTriangle className={account.risk_level === 'HIGH' ? 'text-red-600' : 'text-yellow-600'} size={24} />
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-sm font-medium text-slate-700 mb-2">Warning Signals:</p>
                                        <ul className="space-y-1">
                                            {account.signals.map((signal, idx) => (
                                                <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                                                    <span className="text-red-500 mt-1">•</span>
                                                    {signal}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                                        <p className="text-sm font-medium text-emerald-900 mb-1">Recommended Action:</p>
                                        <p className="text-sm text-emerald-700">{account.recommended_action}</p>
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

export default ChurnPredictor;
