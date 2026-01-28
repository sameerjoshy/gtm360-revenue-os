import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitBranch, Mail, Clock, ArrowLeft, Play, Pause, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import StatusBadge from '../components/agents/StatusBadge';
import LastRunBadge from '../components/agents/LastRunBadge';
import EmptyState from '../components/agents/EmptyState';

const SequencerAgent = () => {
    const navigate = useNavigate();
    const [lastRun, setLastRun] = useState(null);
    const [sequences, setSequences] = useState([
        {
            id: 1,
            name: 'Series A Outreach',
            status: 'ACTIVE',
            touches: 5,
            active_leads: 47,
            replies: 12,
            reply_rate: 25.5,
            steps: [
                { day: 0, type: 'Email', subject: 'Congrats on the Series A' },
                { day: 2, type: 'LinkedIn', subject: 'Connection request' },
                { day: 5, type: 'Email', subject: 'Quick follow-up' },
                { day: 8, type: 'Email', subject: 'Sharing relevant case study' },
                { day: 12, type: 'Email', subject: 'Final check-in' }
            ]
        },
        {
            id: 2,
            name: 'Executive Hire Follow-up',
            status: 'ACTIVE',
            touches: 3,
            active_leads: 23,
            replies: 5,
            reply_rate: 21.7,
            steps: [
                { day: 0, type: 'Email', subject: 'Welcome to your new role' },
                { day: 4, type: 'Email', subject: 'Helping new leaders scale' },
                { day: 9, type: 'Email', subject: 'Quick question' }
            ]
        },
        {
            id: 3,
            name: 'Cold Outbound - Tech Stack',
            status: 'PAUSED',
            touches: 4,
            active_leads: 0,
            replies: 8,
            reply_rate: 18.2,
            steps: [
                { day: 0, type: 'Email', subject: 'Noticed you use Salesforce' },
                { day: 3, type: 'Email', subject: 'Common challenge we solve' },
                { day: 7, type: 'LinkedIn', subject: 'Connection + value share' },
                { day: 11, type: 'Email', subject: 'Last attempt' }
            ]
        }
    ]);

    const [showCreateModal, setShowCreateModal] = useState(false);

    const toggleSequence = (id) => {
        setSequences(sequences.map(seq =>
            seq.id === id
                ? { ...seq, status: seq.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' }
                : seq
        ));
        setLastRun(new Date());
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
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                        <GitBranch size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sequencer</h1>
                        <p className="text-slate-500 text-sm">Multi-touch outbound sequence management</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status="ACTIVE" />
                    <LastRunBadge timestamp={lastRun} />
                    <button
                        onClick={() => setShowCreateModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-all"
                    >
                        <Plus size={18} />
                        New Sequence
                    </button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <p className="text-slate-600 text-sm mb-1">Active Sequences</p>
                    <p className="text-3xl font-bold text-slate-900">
                        {sequences.filter(s => s.status === 'ACTIVE').length}
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <p className="text-slate-600 text-sm mb-1">Total Leads</p>
                    <p className="text-3xl font-bold text-indigo-600">
                        {sequences.reduce((sum, s) => sum + s.active_leads, 0)}
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <p className="text-slate-600 text-sm mb-1">Total Replies</p>
                    <p className="text-3xl font-bold text-green-600">
                        {sequences.reduce((sum, s) => sum + s.replies, 0)}
                    </p>
                </div>
                <div className="bg-white rounded-lg border border-slate-200 p-6">
                    <p className="text-slate-600 text-sm mb-1">Avg Reply Rate</p>
                    <p className="text-3xl font-bold text-blue-600">
                        {(sequences.reduce((sum, s) => sum + s.reply_rate, 0) / sequences.length).toFixed(1)}%
                    </p>
                </div>
            </div>

            {/* Sequences List */}
            <div className="space-y-4">
                {sequences.map(sequence => (
                    <motion.div
                        key={sequence.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-200">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">{sequence.name}</h3>
                                    <div className="flex items-center gap-4 text-sm text-slate-600">
                                        <span className="flex items-center gap-1">
                                            <Mail size={14} />
                                            {sequence.touches} touches
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} />
                                            {sequence.active_leads} active leads
                                        </span>
                                        <span className="text-green-600 font-medium">
                                            {sequence.replies} replies ({sequence.reply_rate}%)
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${sequence.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {sequence.status}
                                    </span>
                                    <button
                                        onClick={() => toggleSequence(sequence.id)}
                                        className={`p-2 rounded-lg transition-all ${sequence.status === 'ACTIVE'
                                                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                                : 'bg-green-100 text-green-600 hover:bg-green-200'
                                            }`}
                                    >
                                        {sequence.status === 'ACTIVE' ? <Pause size={18} /> : <Play size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Sequence Steps */}
                            <div className="space-y-3">
                                {sequence.steps.map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                                        <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full text-sm font-bold">
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-slate-900">{step.subject}</p>
                                            <p className="text-xs text-slate-500">Day {step.day} • {step.type}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Create Modal Placeholder */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowCreateModal(false)}>
                    <div className="bg-white rounded-xl p-8 max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">Create New Sequence</h3>
                        <p className="text-slate-600 mb-6">Sequence builder coming soon...</p>
                        <button
                            onClick={() => setShowCreateModal(false)}
                            className="px-6 py-2 bg-slate-600 text-white rounded-lg font-bold hover:bg-slate-700 transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SequencerAgent;
