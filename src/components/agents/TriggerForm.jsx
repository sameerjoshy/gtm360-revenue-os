import React, { useState } from 'react';

const TriggerForm = ({ onStart }) => {
    const [domain, setDomain] = useState('');
    const [persona, setPersona] = useState('VP of Sales');

    // Advanced Context
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
    const [contextTone, setContextTone] = useState('');
    const [contextUrl, setContextUrl] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API delay or call parent
        await onStart({
            domain,
            persona,
            context_overrides: {
                tone_guide: contextTone,
                reference_url: contextUrl
            }
        });
        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm mt-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Start New Mission</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Target Domain</label>
                    <input
                        type="text"
                        placeholder="e.g. stripe.com"
                        className="w-full border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Target Persona</label>
                    <select
                        className="w-full border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                        value={persona}
                        onChange={(e) => setPersona(e.target.value)}
                    >
                        <option>VP of Sales</option>
                        <option>Head of Finance</option>
                        <option>CTO</option>
                        <option>Chief Marketing Officer</option>
                    </select>
                </div>
            </div>

            {/* Advanced Context Injection */}
            <div className="mt-6 border-t border-slate-100 pt-4">
                <button
                    type="button"
                    onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                    className="flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
                >
                    {isAdvancedOpen ? '▼' : '▶'} <span className="ml-2">Advanced Context & Tone</span>
                </button>

                {isAdvancedOpen && (
                    <div className="mt-4 space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Tone & Voice Guide</label>
                            <textarea
                                placeholder="e.g. 'Use a pirate voice', 'Strictly professional', 'Reference our case study on Series B scaling'..."
                                className="w-full border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-sm h-20"
                                value={contextTone}
                                onChange={(e) => setContextTone(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Upload Playbook / Context URL</label>
                            <input
                                type="url"
                                placeholder="https://..."
                                className="w-full border border-slate-300 rounded px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                value={contextUrl}
                                onChange={(e) => setContextUrl(e.target.value)}
                            />
                            <p className="text-xs text-slate-400 mt-1">Link to a Google Doc, Notion page, or PDF to guide the agent.</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-6 flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className={`btn px-6 py-2 rounded-lg font-bold shadow-sm transition-all bg-indigo-600 text-white hover:bg-indigo-700 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {isLoading ? 'Igniting Engines...' : 'Deploy Agent'}
                </button>
            </div>
        </form >
    );
};

export default TriggerForm;
