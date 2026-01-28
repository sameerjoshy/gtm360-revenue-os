import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Lightbulb, ArrowLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import StatusBadge from '../components/agents/StatusBadge';
import LastRunBadge from '../components/agents/LastRunBadge';
import AgentLoader from '../components/agents/AgentLoader';

const ObjectionHandler = () => {
    const navigate = useNavigate();
    const [lastRun, setLastRun] = useState(null);
    const [objection, setObjection] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [response, setResponse] = useState(null);

    const commonObjections = [
        { text: "We're already using [Competitor]", category: 'Competition' },
        { text: "The price is too high", category: 'Pricing' },
        { text: "We don't have budget right now", category: 'Budget' },
        { text: "We need to think about it", category: 'Stalling' },
        { text: "Can you send me some information?", category: 'Stalling' },
        { text: "We're not ready yet", category: 'Timing' }
    ];

    const handleGenerate = async (objectionText = objection) => {
        if (!objectionText) return;

        setIsGenerating(true);
        setLastRun(new Date());
        setObjection(objectionText);

        // Simulate AI response generation
        setTimeout(() => {
            const responses = {
                "We're already using [Competitor]": {
                    framework: 'Acknowledge + Differentiate + Question',
                    response: "That's great that you have a solution in place. Many of our customers were using [Competitor] before switching to us. The key difference they found was our AI-powered automation that reduced manual work by 80%. Out of curiosity, how satisfied are you with [Competitor]'s forecast accuracy?",
                    talking_points: [
                        'Acknowledge their current solution',
                        'Share social proof (other customers switched)',
                        'Highlight unique differentiator',
                        'Ask discovery question to uncover pain'
                    ],
                    follow_up: 'If they express any dissatisfaction, offer a side-by-side comparison or ROI analysis.'
                },
                "The price is too high": {
                    framework: 'Reframe Value + ROI + Options',
                    response: "I understand price is a consideration. Let me reframe this: our customers typically see a 3.6-month payback through time savings and revenue impact. For a team your size, that's roughly $250K in annual value. Would it help if I showed you the ROI breakdown specific to your situation?",
                    talking_points: [
                        'Shift from price to value',
                        'Quantify ROI with specific numbers',
                        'Offer to customize the analysis',
                        'Consider offering payment flexibility'
                    ],
                    follow_up: 'Prepare a custom ROI calculator showing their specific savings and revenue impact.'
                },
                "We don't have budget right now": {
                    framework: 'Validate + Timeline + Cost of Inaction',
                    response: "I totally understand budget constraints. When does your next budget cycle open up? In the meantime, let me share something: our customers found that delaying this decision cost them an average of $40K per quarter in lost efficiency. Would it make sense to at least get this approved for next quarter?",
                    talking_points: [
                        'Validate their concern',
                        'Uncover budget timing',
                        'Quantify cost of waiting',
                        'Propose future-dated start'
                    ],
                    follow_up: 'Stay engaged with value content until their budget opens. Set a calendar reminder for their next cycle.'
                }
            };

            const defaultResponse = {
                framework: 'Listen + Empathize + Reframe',
                response: "I hear you. That's a common concern we hear from prospects. Let me address that directly...",
                talking_points: [
                    'Acknowledge the objection',
                    'Show empathy and understanding',
                    'Reframe with value proposition',
                    'Ask clarifying questions'
                ],
                follow_up: 'Dig deeper to understand the root cause of this objection.'
            };

            setResponse(responses[objectionText] || defaultResponse);
            setIsGenerating(false);
        }, 2000);
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
                        <MessageSquare size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Objection Handler</h1>
                        <p className="text-slate-500 text-sm">AI-powered objection handling and response generation</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status="ACTIVE" />
                    <LastRunBadge timestamp={lastRun} />
                </div>
            </div>

            {/* Input Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Enter Objection</h3>
                <p className="text-slate-600 text-sm mb-6">
                    Type or select a common objection to get AI-powered response frameworks and talking points.
                </p>

                <div className="flex items-center gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="e.g., 'We're already using Salesforce'"
                        value={objection}
                        onChange={(e) => setObjection(e.target.value)}
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                    />
                    <button
                        onClick={() => handleGenerate()}
                        disabled={isGenerating || !objection}
                        className="flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={18} />
                        {isGenerating ? 'Generating...' : 'Generate Response'}
                    </button>
                </div>

                {/* Common Objections */}
                <div>
                    <p className="text-sm font-medium text-slate-700 mb-3">Common Objections:</p>
                    <div className="flex flex-wrap gap-2">
                        {commonObjections.map((obj, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleGenerate(obj.text)}
                                className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition-all"
                            >
                                {obj.text}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {isGenerating && (
                <div className="bg-white rounded-xl border border-slate-200 p-12">
                    <AgentLoader message="Generating objection handling framework..." />
                </div>
            )}

            {/* Response */}
            {response && !isGenerating && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Objection */}
                    <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
                        <p className="text-sm font-medium text-slate-600 mb-2">Objection:</p>
                        <p className="text-lg font-bold text-slate-900">"{objection}"</p>
                    </div>

                    {/* Framework */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Lightbulb className="text-orange-600" size={20} />
                            <h3 className="text-lg font-bold text-slate-900">Response Framework</h3>
                        </div>
                        <p className="text-sm font-medium text-orange-600 mb-3">{response.framework}</p>
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <p className="text-slate-900 leading-relaxed">{response.response}</p>
                        </div>
                    </div>

                    {/* Talking Points */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4">Key Talking Points</h3>
                        <ul className="space-y-2">
                            {response.talking_points.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-slate-700">
                                    <span className="text-orange-500 mt-1">✓</span>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Follow-up */}
                    <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-200 p-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Recommended Follow-up</h3>
                        <p className="text-slate-700">{response.follow_up}</p>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default ObjectionHandler;
