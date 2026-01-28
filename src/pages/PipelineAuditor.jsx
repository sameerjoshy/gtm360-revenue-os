import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, AlertTriangle, CheckCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import StatusBadge from '../components/agents/StatusBadge';
import LastRunBadge from '../components/agents/LastRunBadge';
import AgentLoader from '../components/agents/AgentLoader';

const PipelineAuditor = () => {
    const navigate = useNavigate();
    const [lastRun, setLastRun] = useState(null);
    const [isAuditing, setIsAuditing] = useState(false);
    const [auditResults, setAuditResults] = useState(null);

    const handleAudit = async () => {
        setIsAuditing(true);
        setLastRun(new Date());

        // Simulate pipeline audit
        setTimeout(() => {
            setAuditResults({
                total_deals: 347,
                issues_found: 42,
                critical: 8,
                warnings: 34,
                health_score: 88,
                findings: [
                    {
                        severity: 'CRITICAL',
                        category: 'Data Quality',
                        issue: 'Missing close dates on 8 deals worth $450K',
                        impact: 'Forecast accuracy compromised',
                        recommendation: 'Update close dates within 24 hours',
                        affected_deals: ['DEAL-1234', 'DEAL-5678', 'DEAL-9012']
                    },
                    {
                        severity: 'WARNING',
                        category: 'Stage Hygiene',
                        issue: '12 deals stuck in "Demo" stage for 45+ days',
                        impact: 'Pipeline bloat, inaccurate conversion metrics',
                        recommendation: 'Review and either advance or disqualify',
                        affected_deals: ['DEAL-2345', 'DEAL-6789']
                    },
                    {
                        severity: 'WARNING',
                        category: 'Contact Data',
                        issue: '15 deals missing decision-maker contact',
                        impact: 'Risk of stalled deals',
                        recommendation: 'Add primary contact to all deals',
                        affected_deals: ['DEAL-3456', 'DEAL-7890']
                    },
                    {
                        severity: 'WARNING',
                        category: 'Activity Tracking',
                        issue: '9 deals with no activity in 14+ days',
                        impact: 'Deals likely to slip or die',
                        recommendation: 'Immediate rep outreach required',
                        affected_deals: ['DEAL-4567', 'DEAL-8901']
                    }
                ],
                stage_distribution: [
                    { stage: 'Qualification', count: 89, avg_age: 12 },
                    { stage: 'Demo', count: 67, avg_age: 18 },
                    { stage: 'Proposal', count: 45, avg_age: 24 },
                    { stage: 'Negotiation', count: 32, avg_age: 31 },
                    { stage: 'Closed Won', count: 114, avg_age: 0 }
                ]
            });
            setIsAuditing(false);
        }, 3000);
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
                        <Search size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Pipeline Auditor</h1>
                        <p className="text-slate-500 text-sm">Automated pipeline hygiene and data quality checks</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status="ACTIVE" />
                    <LastRunBadge timestamp={lastRun} />
                </div>
            </div>

            {/* Audit Button */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Run Pipeline Audit</h3>
                <p className="text-slate-600 text-sm mb-6">
                    Scan your entire pipeline for data quality issues, stale deals, and hygiene problems.
                </p>
                <button
                    onClick={handleAudit}
                    disabled={isAuditing}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-lg font-bold hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <RefreshCw size={18} className={isAuditing ? 'animate-spin' : ''} />
                    {isAuditing ? 'Auditing...' : 'Run Audit'}
                </button>
            </div>

            {/* Loading State */}
            {isAuditing && (
                <div className="bg-white rounded-xl border border-slate-200 p-12">
                    <AgentLoader message="Auditing pipeline data quality..." />
                </div>
            )}

            {/* Audit Results */}
            {auditResults && !isAuditing && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Summary Cards */}
                    <div className="grid grid-cols-4 gap-4">
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Health Score</p>
                            <p className="text-3xl font-bold text-emerald-600">{auditResults.health_score}%</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Total Deals</p>
                            <p className="text-3xl font-bold text-slate-900">{auditResults.total_deals}</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Critical Issues</p>
                            <p className="text-3xl font-bold text-red-600">{auditResults.critical}</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Warnings</p>
                            <p className="text-3xl font-bold text-yellow-600">{auditResults.warnings}</p>
                        </div>
                    </div>

                    {/* Findings */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900">Audit Findings</h3>
                        </div>
                        <div className="divide-y divide-slate-200">
                            {auditResults.findings.map((finding, idx) => (
                                <div key={idx} className="p-6 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-start gap-4">
                                        <AlertTriangle className={
                                            finding.severity === 'CRITICAL' ? 'text-red-600' : 'text-yellow-600'
                                        } size={24} />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${finding.severity === 'CRITICAL' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {finding.severity}
                                                </span>
                                                <span className="text-sm font-medium text-slate-600">{finding.category}</span>
                                            </div>
                                            <p className="text-lg font-bold text-slate-900 mb-2">{finding.issue}</p>
                                            <p className="text-sm text-slate-600 mb-3">Impact: {finding.impact}</p>
                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                                <p className="text-sm font-medium text-blue-900">
                                                    Recommendation: {finding.recommendation}
                                                </p>
                                            </div>
                                            <div className="mt-3">
                                                <p className="text-xs text-slate-500">
                                                    Affected: {finding.affected_deals.slice(0, 2).join(', ')}
                                                    {finding.affected_deals.length > 2 && ` +${finding.affected_deals.length - 2} more`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stage Distribution */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <div className="p-6 border-b border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900">Pipeline Distribution</h3>
                        </div>
                        <div className="divide-y divide-slate-200">
                            {auditResults.stage_distribution.map((stage, idx) => (
                                <div key={idx} className="p-6 hover:bg-slate-50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-slate-900 mb-1">{stage.stage}</p>
                                            <p className="text-sm text-slate-600">Avg Age: {stage.avg_age} days</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-slate-900">{stage.count}</p>
                                            <p className="text-sm text-slate-600">deals</p>
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

export default PipelineAuditor;
