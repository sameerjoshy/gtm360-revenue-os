import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, DollarSign, TrendingUp, ArrowLeft, Download, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import StatusBadge from '../components/agents/StatusBadge';
import LastRunBadge from '../components/agents/LastRunBadge';
import AgentLoader from '../components/agents/AgentLoader';

const ProposalBuilder = () => {
    const navigate = useNavigate();
    const [lastRun, setLastRun] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [dealId, setDealId] = useState('');
    const [proposal, setProposal] = useState(null);

    const handleGenerate = async () => {
        if (!dealId) return;

        setIsGenerating(true);
        setLastRun(new Date());

        // Simulate proposal generation
        setTimeout(() => {
            setProposal({
                deal_name: 'Acme Corp - Enterprise Plan',
                executive_summary: 'Transform your revenue operations with GTM-360\'s AI-powered platform. Based on your current challenges with pipeline visibility and forecast accuracy, we\'ve designed a solution that delivers immediate impact.',
                requirements: [
                    'Improve forecast accuracy from 65% to 90%+',
                    'Reduce manual data entry by 80%',
                    'Unify sales, CS, and marketing data',
                    'Enable real-time pipeline insights'
                ],
                solution: {
                    platform: 'GTM-360 Enterprise',
                    modules: ['Agent Swarm', 'Signal Intelligence', 'Workflow Automation', 'Analytics Dashboard'],
                    implementation: '6-week phased rollout'
                },
                pricing: {
                    setup_fee: 15000,
                    monthly_fee: 4999,
                    annual_total: 74988,
                    seats: 25
                },
                roi: {
                    time_saved_hours: 520,
                    time_saved_value: 52000,
                    revenue_impact: 250000,
                    payback_months: 3.6
                }
            });
            setIsGenerating(false);
        }, 3000);
    };

    const downloadProposal = () => {
        alert('Downloading proposal as PDF...');
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
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600">
                        <FileText size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Proposal Builder</h1>
                        <p className="text-slate-500 text-sm">AI-generated sales proposals from deal data</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status="ACTIVE" />
                    <LastRunBadge timestamp={lastRun} />
                </div>
            </div>

            {/* Input Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Generate Proposal</h3>
                <p className="text-slate-600 text-sm mb-6">
                    Enter a deal ID from your CRM. The agent will extract requirements, generate pricing, and calculate ROI.
                </p>

                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        placeholder="Deal ID (e.g., DEAL-12345)"
                        value={dealId}
                        onChange={(e) => setDealId(e.target.value)}
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !dealId}
                        className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Sparkles size={18} />
                        {isGenerating ? 'Generating...' : 'Generate Proposal'}
                    </button>
                </div>
            </div>

            {/* Loading State */}
            {isGenerating && (
                <div className="bg-white rounded-xl border border-slate-200 p-12">
                    <AgentLoader message="Analyzing deal notes and generating proposal..." />
                </div>
            )}

            {/* Proposal */}
            {proposal && !isGenerating && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Header Actions */}
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-900">Generated Proposal</h3>
                        <button
                            onClick={downloadProposal}
                            className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-all"
                        >
                            <Download size={18} />
                            Download PDF
                        </button>
                    </div>

                    {/* Proposal Content */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        {/* Deal Name */}
                        <div className="p-8 border-b border-slate-200 bg-gradient-to-r from-orange-50 to-white">
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">{proposal.deal_name}</h2>
                            <p className="text-slate-600">Commercial Proposal</p>
                        </div>

                        {/* Executive Summary */}
                        <div className="p-8 border-b border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Executive Summary</h3>
                            <p className="text-slate-700 leading-relaxed">{proposal.executive_summary}</p>
                        </div>

                        {/* Requirements */}
                        <div className="p-8 border-b border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Your Requirements</h3>
                            <ul className="space-y-2">
                                {proposal.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-slate-700">
                                        <span className="text-orange-500 mt-1">✓</span>
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Solution */}
                        <div className="p-8 border-b border-slate-200">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">Proposed Solution</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm font-medium text-slate-600 mb-2">Platform</p>
                                    <p className="text-lg font-bold text-slate-900">{proposal.solution.platform}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-600 mb-2">Implementation</p>
                                    <p className="text-lg font-bold text-slate-900">{proposal.solution.implementation}</p>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm font-medium text-slate-600 mb-2">Included Modules</p>
                                <div className="flex flex-wrap gap-2">
                                    {proposal.solution.modules.map((module, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                                            {module}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Pricing */}
                        <div className="p-8 border-b border-slate-200 bg-slate-50">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">Investment</h3>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <p className="text-sm text-slate-600 mb-1">Setup Fee</p>
                                    <p className="text-2xl font-bold text-slate-900">${proposal.pricing.setup_fee.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 mb-1">Monthly Fee</p>
                                    <p className="text-2xl font-bold text-slate-900">${proposal.pricing.monthly_fee.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 mb-1">Annual Total</p>
                                    <p className="text-2xl font-bold text-orange-600">${proposal.pricing.annual_total.toLocaleString()}</p>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 mt-4">{proposal.pricing.seats} seats included</p>
                        </div>

                        {/* ROI */}
                        <div className="p-8 bg-gradient-to-r from-emerald-50 to-white">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">Expected ROI</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-slate-600 mb-1">Time Saved (Annual)</p>
                                    <p className="text-2xl font-bold text-slate-900">{proposal.roi.time_saved_hours} hours</p>
                                    <p className="text-sm text-emerald-600">${proposal.roi.time_saved_value.toLocaleString()} value</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 mb-1">Revenue Impact</p>
                                    <p className="text-2xl font-bold text-emerald-600">${proposal.roi.revenue_impact.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-white rounded-lg border border-emerald-200">
                                <p className="text-sm font-medium text-slate-700">
                                    Payback Period: <span className="text-lg font-bold text-emerald-600">{proposal.roi.payback_months} months</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ProposalBuilder;
