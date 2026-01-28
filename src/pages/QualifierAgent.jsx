import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Filter, Upload, Download, ArrowLeft, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import StatusBadge from '../components/agents/StatusBadge';
import LastRunBadge from '../components/agents/LastRunBadge';
import AgentLoader from '../components/agents/AgentLoader';
import EmptyState from '../components/agents/EmptyState';

const QualifierAgent = () => {
    const navigate = useNavigate();
    const [lastRun, setLastRun] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [leads, setLeads] = useState([]);
    const [results, setResults] = useState(null);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsProcessing(true);
        setLastRun(new Date());

        // Simulate CSV processing
        setTimeout(() => {
            const mockResults = {
                total: 150,
                qualified: 89,
                disqualified: 61,
                leads: [
                    { id: 1, company: 'Acme Corp', score: 92, tier: 'A', reason: 'Perfect ICP fit: B2B SaaS, 50-200 employees, Series B funded' },
                    { id: 2, company: 'TechStart Inc', score: 85, tier: 'A', reason: 'Strong fit: Tech stack matches, hiring SDRs' },
                    { id: 3, company: 'Global Enterprises', score: 78, tier: 'B', reason: 'Good fit: Right industry, but enterprise size' },
                    { id: 4, company: 'Small Shop LLC', score: 45, tier: 'C', reason: 'Weak fit: Too small, wrong vertical' },
                    { id: 5, company: 'Retail Co', score: 32, tier: 'D', reason: 'Poor fit: B2C company, not our ICP' }
                ]
            };
            setResults(mockResults);
            setIsProcessing(false);
        }, 2000);
    };

    const downloadResults = () => {
        // Mock CSV download
        alert('Downloading qualified leads CSV...');
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
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        <Filter size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Qualifier</h1>
                        <p className="text-slate-500 text-sm">Batch lead scoring and ICP pre-screening</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status="ACTIVE" />
                    <LastRunBadge timestamp={lastRun} />
                </div>
            </div>

            {/* Upload Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Upload Lead List</h3>
                <p className="text-slate-600 text-sm mb-6">
                    Upload a CSV file with company domains or names. The Qualifier will score each lead against your ICP.
                </p>

                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all cursor-pointer">
                        <Upload size={18} />
                        Upload CSV
                        <input
                            type="file"
                            accept=".csv"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                    <span className="text-sm text-slate-500">Supports: .csv files</span>
                </div>
            </div>

            {/* Processing State */}
            {isProcessing && (
                <div className="bg-white rounded-xl border border-slate-200 p-12">
                    <AgentLoader message="Scoring leads against ICP..." />
                </div>
            )}

            {/* Results */}
            {results && !isProcessing && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Summary Cards */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Total Leads</p>
                            <p className="text-3xl font-bold text-slate-900">{results.total}</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Qualified (A/B)</p>
                            <p className="text-3xl font-bold text-green-600">{results.qualified}</p>
                        </div>
                        <div className="bg-white rounded-lg border border-slate-200 p-6">
                            <p className="text-slate-600 text-sm mb-1">Disqualified (C/D)</p>
                            <p className="text-3xl font-bold text-red-600">{results.disqualified}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-900">Scored Leads</h3>
                        <button
                            onClick={downloadResults}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all"
                        >
                            <Download size={18} />
                            Export Qualified
                        </button>
                    </div>

                    {/* Leads Table */}
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Score</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Tier</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 uppercase">Reason</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {results.leads.map(lead => (
                                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900">
                                            {lead.company}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-lg font-bold text-slate-900">{lead.score}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${lead.tier === 'A' ? 'bg-green-100 text-green-700' :
                                                    lead.tier === 'B' ? 'bg-blue-100 text-blue-700' :
                                                        lead.tier === 'C' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                }`}>
                                                Tier {lead.tier}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {lead.reason}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            )}

            {/* Empty State */}
            {!results && !isProcessing && (
                <EmptyState
                    icon={Filter}
                    title="No leads processed yet"
                    description="Upload a CSV file to start scoring leads against your ICP"
                />
            )}
        </div>
    );
};

export default QualifierAgent;
