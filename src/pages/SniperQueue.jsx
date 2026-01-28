
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Check, X, RefreshCw } from 'lucide-react';

const SniperQueue = () => {
    const navigate = useNavigate();

    // Mock Data (Matches DraftEmail Schema)
    const [drafts, setDrafts] = useState([
        {
            draft_id: 'draft_001',
            domain: 'acme.com',
            sequence_type: 'COLD_OUTBOUND',
            subject: 'question re: scaling sales',
            body_text: "Hi John,\n\nNoticed you're hiring a Head of Sales. Usually implies you're ready to scale outbound.\n\nMost teams struggle because they add headcount before fixing the 'data fuel'.\n\nWe engineered a system that fixes the data layer first. Open to a 5-min peek?",
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
            body_text: "Saw the Series B news on TechCrunch. Congrats.\n\nNow the pressure is on to double ARR. The default playbook is 'hire more reps'.\n\nWe typically see that break the funnel. There's a better way to engineer the growth.\n\nWorth a chat?",
            hooks_used: [
                { hook_type: 'FUNDING', hook_text: 'Series B Raise', evidence_ids: ['ev_2'] }
            ],
            status: 'NEEDS_REVIEW'
        }
    ]);

    const [selectedDraftId, setSelectedDraftId] = useState(drafts[0]?.draft_id || null);
    const selectedDraft = drafts.find(d => d.draft_id === selectedDraftId);

    const [actionLoading, setActionLoading] = useState(null); // 'APPROVE' | 'REJECT' | null

    const handleAction = async (id, action) => {
        setActionLoading(action);
        // Optimistic UI Update failure fallback logic omitted for brevity
        try {
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

            if (action === 'REGENERATE') {
                const res = await fetch(`${API_BASE}/sniper/drafts/${id}/regenerate`, { method: 'POST' });
                if (!res.ok) throw new Error("Regeneration failed");
                const updatedDraft = await res.json();

                // Update local state with new draft content
                setDrafts(prev => prev.map(d => d.draft_id === id ? { ...d, ...updatedDraft } : d));
                console.log(`Regenerated ${id}`);
            } else {
                const endpoint = action === 'APPROVE' ? 'approve' : 'reject';
                await fetch(`${API_BASE}/sniper/drafts/${id}/${endpoint}`, { method: 'POST' });
                console.log(`${action} ${id}`);

                // Success - Remove from list
                const remaining = drafts.filter(d => d.draft_id !== id);
                setDrafts(remaining);

                if (selectedDraftId === id) {
                    if (remaining.length > 0) setSelectedDraftId(remaining[0].draft_id);
                    else setSelectedDraftId(null);
                }
            }
        } catch (e) {
            console.error("Action failed", e);
            alert(`Action failed: ${e.message}`);
        } finally {
            setActionLoading(null);
        }
    };

    return (
        <div className="max-w-7xl mx-auto h-[calc(100vh-100px)] flex flex-col">
            <div className="flex-none mb-6">
                <button
                    onClick={() => navigate('/agent-workbench')}
                    className="flex items-center text-slate-400 hover:text-slate-600 text-sm mb-4 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-1" />
                    Back to Swarm Map
                </button>

                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600">
                            <Mail size={24} />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Sniper Queue</h1>
                            <p className="text-slate-500 text-sm">Review and approve autonomous outreach drafts.</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded uppercase border border-green-200">System Active</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow min-h-0">
                {/* LEFT COL: List */}
                <div className="lg:col-span-4 bg-white rounded-xl shadow-sm border border-slate-200 overflow-y-auto">
                    {drafts.map(draft => (
                        <div
                            key={draft.draft_id}
                            onClick={() => setSelectedDraftId(draft.draft_id)}
                            className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${selectedDraftId === draft.draft_id ? 'bg-indigo-50/50 border-l-4 border-l-indigo-600' : 'border-l-4 border-l-transparent'}`}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-bold text-slate-700 text-sm">{draft.domain}</span>
                                <span className="text-[10px] font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{draft.sequence_type}</span>
                            </div>
                            <p className="text-xs text-slate-500 truncate">{draft.subject}</p>
                        </div>
                    ))}
                    {drafts.length === 0 && (
                        <div className="p-8 text-center text-slate-400">
                            <Check className="w-8 h-8 mx-auto mb-2 opacity-50" />
                            <p>All caught up!</p>
                        </div>
                    )}
                </div>

                {/* RIGHT COL: Preview & Action */}
                <div className="lg:col-span-8 flex flex-col min-h-0">
                    {selectedDraft ? (
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex-grow flex flex-col overflow-hidden">
                            {/* Email Header */}
                            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-slate-600">Subject:</span>
                                            <span className="text-sm text-slate-900">{selectedDraft.subject}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            {selectedDraft.hooks_used && selectedDraft.hooks_used[0] && (
                                                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                                    Hook: {selectedDraft.hooks_used[0].hook_type}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Email Body */}
                            <div className="p-8 flex-grow overflow-y-auto font-serif text-lg leading-relaxed text-slate-800 whitespace-pre-wrap">
                                {selectedDraft.body_text}
                            </div>

                            {/* Actions */}
                            <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-between items-center">
                                <button
                                    onClick={() => handleAction(selectedDraft.draft_id, 'REJECT')}
                                    disabled={!!actionLoading}
                                    className="flex items-center space-x-2 px-6 py-3 rounded-lg border border-slate-300 text-slate-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <X size={18} />
                                    <span>{actionLoading === 'REJECT' ? 'Rejecting...' : 'Reject'}</span>
                                </button>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleAction(selectedDraft.draft_id, 'REGENERATE')}
                                        disabled={!!actionLoading}
                                        className="flex items-center space-x-2 px-6 py-3 rounded-lg border border-slate-300 text-slate-600 hover:bg-white hover:text-indigo-600 hover:border-indigo-200 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <RefreshCw size={18} className={actionLoading === 'REGENERATE' ? 'animate-spin text-indigo-600' : ''} />
                                        <span>{actionLoading === 'REGENERATE' ? 'Refining...' : 'Regenerate'}</span>
                                    </button>
                                    <button
                                        onClick={() => handleAction(selectedDraft.draft_id, 'APPROVE')}
                                        disabled={!!actionLoading}
                                        className="flex items-center space-x-2 px-8 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {actionLoading === 'APPROVE' ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check size={18} />}
                                        <span>{actionLoading === 'APPROVE' ? 'Sending...' : 'Approve & Send'}</span>
                                    </button>
                                </div>
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
