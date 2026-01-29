import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Check, X, RefreshCw } from 'lucide-react';
import StatusBadge from '../components/agents/StatusBadge';
import LastRunBadge from '../components/agents/LastRunBadge';

const SniperQueue = () => {
    const navigate = useNavigate();
    const [lastRun, setLastRun] = useState(null);

    // Mock Data (Matches DraftEmail Schema)
    const drafts = [
        {
            draft_id: 'draft_001',
            domain: 'acme.com',
            sequence_type: 'COLD_OUTBOUND',
            subject: 'question re: scaling sales',
            body_text: "Hi John,\\n\\nNoticed you're hiring a Head of Sales. Usually implies you're ready to scale outbound.\\n\\nMost teams struggle because they add headcount before fixing the 'data fuel'.\\n\\nWe engineered a system that fixes the data layer first. Open to a 5-min peek?",
            hooks_used: [
                { hook_type: 'EXEC_HIRE', hook_text: 'Hiring Head of Sales', evidence_ids: ['ev_1'] }
            ],
            status: 'NEEDS_REVIEW'
        },
        {
            draft_id: 'draft_002',
            domain: 'globex.corp',
            sequence_type: 'COLD_OUTBOUND',
            subject: 'series b / revenue engineering',
            body_text: "Saw the Series B news on TechCrunch. Congrats.\\n\\nNow the pressure is on to double ARR. The default playbook is 'hire more reps'.\\n\\nWe typically see that break the funnel. There's a better way to engineer the growth.\\n\\nWorth a chat?",
            hooks_used: [
                { hook_type: 'FUNDING', hook_text: 'Series B Raise', evidence_ids: ['ev_2'] }
            ],
            status: 'NEEDS_REVIEW'
        }
    ];

    const [selectedDraftId, setSelectedDraftId] = useState(drafts[0]?.draft_id || null);
    const selectedDraft = drafts.find(d => d.draft_id === selectedDraftId);

    const [actionLoading, setActionLoading] = useState(null);

    const handleAction = async (id, action) => {
        setActionLoading(action);
        try {
            if (action === 'REGENERATE') {
                const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';
                const res = await fetch(`${API_BASE}/sniper/drafts/${id}/regenerate`, { method: 'POST' });
                if (!res.ok) throw new Error("Regeneration failed");
                const updated = await res.json();
                console.log('Regenerated:', updated);
            } else if (action === 'APPROVE') {
                console.log('Approving draft:', id);
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else if (action === 'REJECT') {
                console.log('Rejecting draft:', id);
                await new Promise(resolve => setTimeout(resolve, 500));
            }
        } catch (error) {
            console.error(`Error during ${action}:`, error);
            alert(`Failed to ${action.toLowerCase()} draft`);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50">
            {/* HEADER */}
            <div className="bg-white border-b border-slate-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/agent-workbench')}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={20} className="text-slate-600" />
                        </button>
                        <div>
                            <div className="flex items-center gap-3">
                                <Mail className="text-indigo-600" size={24} />
                                <h1 className="text-2xl font-bold text-slate-900">Sniper Queue</h1>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">Review and approve AI-generated email drafts</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <StatusBadge status="ACTIVE" />
                        <LastRunBadge timestamp={lastRun} />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow min-h-0 p-6">
                {/* LEFT COL: List */}
                <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto">
                    {drafts.map(draft => (
                        <div
                            key={draft.draft_id}
                            onClick={() => setSelectedDraftId(draft.draft_id)}
                            className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${selectedDraftId === draft.draft_id ? 'bg-indigo-50/50 border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-semibold text-slate-900 text-sm">{draft.domain}</span>
                                <span className="text-xs px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-medium">
                                    {draft.status}
                                </span>
                            </div>
                            <p className="text-sm text-slate-600 font-medium mb-1">{draft.subject}</p>
                            <p className="text-xs text-slate-500 line-clamp-2">{draft.body_text}</p>
                        </div>
                    ))}
                </div>

                {/* RIGHT COL: Preview */}
                <div className="lg:col-span-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-y-auto">
                    {selectedDraft ? (
                        <div className="h-full flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{selectedDraft.domain}</h2>
                                    <p className="text-sm text-slate-500">{selectedDraft.sequence_type}</p>
                                </div>
                                <button
                                    onClick={() => handleAction(selectedDraft.draft_id, 'REGENERATE')}
                                    className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors"
                                >
                                    <RefreshCw size={16} />
                                    Regenerate
                                </button>
                            </div>

                            <div className="mb-4">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Subject</label>
                                <p className="text-base font-semibold text-slate-900 mt-1">{selectedDraft.subject}</p>
                            </div>

                            <div className="mb-4 flex-grow">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Body</label>
                                <div className="mt-2 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                    <p className="text-sm text-slate-800 whitespace-pre-wrap">{selectedDraft.body_text}</p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2 block">Hooks Used</label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedDraft.hooks_used.map((hook, idx) => (
                                        <span key={idx} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                                            {hook.hook_type}: {hook.hook_text}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 mt-auto pt-4 border-t border-slate-200">
                                <button
                                    onClick={() => handleAction(selectedDraft.draft_id, 'REJECT')}
                                    disabled={actionLoading !== null}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {actionLoading === 'REJECT' ? <div className="w-4 h-4 border-2 border-red-300 border-t-red-700 rounded-full animate-spin" /> : <X size={18} />}
                                    <span>{actionLoading === 'REJECT' ? 'Rejecting...' : 'Reject'}</span>
                                </button>
                                <button
                                    onClick={() => handleAction(selectedDraft.draft_id, 'APPROVE')}
                                    disabled={actionLoading !== null}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {actionLoading === 'APPROVE' ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={18} />}
                                    <span>{actionLoading === 'APPROVE' ? 'Sending...' : 'Approve & Send'}</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
                            Select a draft to review
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SniperQueue;
