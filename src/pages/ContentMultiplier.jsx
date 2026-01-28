import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, FileText, Link as LinkIcon, Upload, ArrowLeft, Edit, Check, X, Copy, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import StatusBadge from '../components/agents/StatusBadge';
import LastRunBadge from '../components/agents/LastRunBadge';
import AgentLoader from '../components/agents/AgentLoader';

const ContentMultiplier = () => {
    const navigate = useNavigate();
    const [lastRun, setLastRun] = useState(null);

    // Stage 1: Input
    const [inputMethod, setInputMethod] = useState('paste');
    const [contentInput, setContentInput] = useState('');
    const [dominanceMode, setDominanceMode] = useState('opinionated');

    // Stage 2: STO
    const [isExtractingSTO, setIsExtractingSTO] = useState(false);
    const [sto, setSto] = useState(null);
    const [stoConfirmed, setStoConfirmed] = useState(false);
    const [editingSTO, setEditingSTO] = useState(false);

    // Stage 3-5: Outputs
    const [isGenerating, setIsGenerating] = useState(false);
    const [outputs, setOutputs] = useState(null);
    const [selectedPaths, setSelectedPaths] = useState({
        thought_leadership: true,
        demand: true,
        internal: true
    });

    // Stage 1: Extract STO
    const handleExtractSTO = async () => {
        if (!contentInput) return;

        setIsExtractingSTO(true);
        setLastRun(new Date());

        // Simulate STO extraction
        setTimeout(() => {
            setSto({
                core_thesis: "Most revenue teams are drowning in data but starving for insights. The solution isn't more tools—it's better orchestration through a Revenue Operations system.",
                primary_insights: [
                    "Your CRM already has everything you need—you just need the right system to extract it",
                    "RevOps systems increase forecast accuracy from 65% to 90%+ without adding headcount",
                    "The secret is orchestration, not accumulation of tools",
                    "Manual data entry can be reduced by 80% with proper automation"
                ],
                supporting_evidence: [
                    "50+ B2B companies implemented this framework",
                    "Average forecast accuracy improvement: 25 percentage points",
                    "Time saved: 520 hours annually per revenue team"
                ],
                contrarian_take: "Most companies fail at RevOps not because they lack data, but because they treat it as a tech problem instead of an orchestration problem.",
                audience_relevance: {
                    icp: "B2B Founders, CROs, RevOps Leaders",
                    why_it_matters: "Directly impacts forecast accuracy, team efficiency, and revenue predictability"
                },
                actionable_implications: [
                    "Audit your current data flow between sales, CS, and marketing",
                    "Identify manual data entry points that can be automated",
                    "Build a unified data model before adding new tools"
                ]
            });
            setIsExtractingSTO(false);
        }, 3000);
    };

    // Stage 2: Confirm STO
    const handleConfirmSTO = () => {
        setStoConfirmed(true);
        setEditingSTO(false);
    };

    // Stage 3-5: Generate Outputs
    const handleGenerateOutputs = async () => {
        if (!stoConfirmed) return;

        setIsGenerating(true);

        // Simulate output generation
        setTimeout(() => {
            const mockOutputs = {
                thought_leadership: [
                    {
                        format: 'LinkedIn Post',
                        intent: 'thought_leadership',
                        content: `Most revenue teams are drowning in data but starving for insights.

Here's the truth: Your CRM has everything you need.
You just need the right system to extract it.

We've helped 50+ B2B companies build Revenue Operations systems that:
→ Increase forecast accuracy from 65% to 90%+
→ Reduce manual data entry by 80%
→ Unify sales, CS, and marketing data

The secret? It's not about more tools.
It's about better orchestration.

Most companies fail at RevOps not because they lack data, but because they treat it as a tech problem instead of an orchestration problem.

Read the full breakdown 👇
[Link]`,
                        char_count: 547,
                        sto_nodes: ['core_thesis', 'primary_insights', 'contrarian_take']
                    },
                    {
                        format: 'Twitter Thread',
                        intent: 'thought_leadership',
                        content: `1/ Most revenue teams are drowning in data but starving for insights.

Here's how to build a RevOps system that actually works 🧵

2/ The truth: Your CRM already has everything you need.

You just need the right system to extract it.

3/ We've helped 50+ B2B companies increase forecast accuracy from 65% to 90%+ without adding headcount.

The secret? Orchestration, not more tools.

4/ Three things that change immediately:
→ 80% less manual data entry
→ Unified sales, CS, and marketing data
→ Real-time pipeline insights

5/ Most companies fail at RevOps not because they lack data.

They fail because they treat it as a tech problem instead of an orchestration problem.

6/ Start here:
• Audit your current data flow
• Identify manual entry points
• Build a unified data model BEFORE adding new tools

That's it. 🎯`,
                        char_count: 687,
                        sto_nodes: ['core_thesis', 'primary_insights', 'contrarian_take', 'actionable_implications']
                    }
                ],
                demand: [
                    {
                        format: 'Cold Email Hook',
                        intent: 'persuasion',
                        content: `Subject: Your forecast is probably 65% accurate

{{FirstName}},

Quick question: How accurate is your revenue forecast right now?

If you're like most B2B companies, it's around 65%.

We've helped 50+ revenue teams get to 90%+ accuracy without adding headcount or buying new tools.

The secret? Your CRM already has everything you need. You just need better orchestration.

Worth a 15-minute conversation?`,
                        char_count: 398,
                        sto_nodes: ['core_thesis', 'primary_insights']
                    },
                    {
                        format: 'Landing Page Section',
                        intent: 'persuasion',
                        content: `## Stop Drowning in Data. Start Extracting Insights.

Your CRM has everything you need to increase forecast accuracy from 65% to 90%+.

The problem isn't your data. It's your orchestration.

**What Changes:**
- 80% reduction in manual data entry
- Unified sales, CS, and marketing data
- Real-time pipeline visibility

**The GTM-360 Difference:**
We don't add more tools. We orchestrate the ones you have.

[Book a Demo] [See Case Studies]`,
                        char_count: 423,
                        sto_nodes: ['core_thesis', 'primary_insights', 'actionable_implications']
                    }
                ],
                internal: [
                    {
                        format: 'Executive Brief',
                        intent: 'internal_alignment',
                        content: `**Revenue Operations System - Key Findings**

**Core Insight:**
Revenue teams possess sufficient data but lack effective extraction systems. The primary challenge is orchestration, not tooling.

**Evidence:**
- 50+ B2B implementations demonstrate 25-point improvement in forecast accuracy (65% → 90%)
- 520 hours saved annually per revenue team
- 80% reduction in manual data entry achievable

**Recommended Actions:**
1. Audit current data flow between sales, CS, and marketing
2. Identify and automate manual data entry points
3. Establish unified data model before tool acquisition

**Risk:**
Treating this as a technology problem rather than an orchestration problem will result in continued inefficiency despite tool investment.`,
                        char_count: 687,
                        sto_nodes: ['primary_insights', 'supporting_evidence', 'actionable_implications']
                    }
                ]
            };

            setOutputs(mockOutputs);
            setIsGenerating(false);
        }, 2500);
    };

    const copyToClipboard = (content) => {
        navigator.clipboard.writeText(content);
        alert('Copied to clipboard!');
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
                        <Sparkles size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Content Multiplier</h1>
                        <p className="text-slate-500 text-sm">Canonical content intelligence layer</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <StatusBadge status="ACTIVE" />
                    <LastRunBadge timestamp={lastRun} />
                </div>
            </div>

            {/* Stage 1: Input */}
            <div className="bg-white rounded-xl border border-slate-200 p-8 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Stage 1: Input Content</h3>

                {/* Input Method Tabs */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => setInputMethod('paste')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${inputMethod === 'paste' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        <FileText size={18} />
                        Paste
                    </button>
                    <button
                        onClick={() => setInputMethod('url')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${inputMethod === 'url' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        <LinkIcon size={18} />
                        URL
                    </button>
                    <button
                        onClick={() => setInputMethod('upload')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${inputMethod === 'upload' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                    >
                        <Upload size={18} />
                        Upload
                    </button>
                </div>

                {/* Input Area */}
                <textarea
                    value={contentInput}
                    onChange={(e) => setContentInput(e.target.value)}
                    placeholder="Paste your content here (blog post, article, case study)..."
                    className="w-full h-64 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
                />

                {/* Dominance Mode */}
                <div className="flex items-center gap-4 mb-6">
                    <label className="text-sm font-medium text-slate-700">Dominance Mode:</label>
                    <select
                        value={dominanceMode}
                        onChange={(e) => setDominanceMode(e.target.value)}
                        className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="safe">Safe</option>
                        <option value="opinionated">Opinionated</option>
                        <option value="contrarian">Contrarian</option>
                    </select>
                </div>

                <button
                    onClick={handleExtractSTO}
                    disabled={isExtractingSTO || !contentInput}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Sparkles size={18} />
                    {isExtractingSTO ? 'Extracting Insights...' : 'Extract Source of Truth'}
                </button>
            </div>

            {/* Loading: STO Extraction */}
            {isExtractingSTO && (
                <div className="bg-white rounded-xl border border-slate-200 p-12 mb-6">
                    <AgentLoader message="Extracting Source of Truth Object (STO)..." />
                </div>
            )}

            {/* Stage 2: STO Editor */}
            {sto && !stoConfirmed && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-slate-200 p-8 mb-6"
                >
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Stage 2: Source of Truth Object (STO)</h3>
                        <button
                            onClick={() => setEditingSTO(!editingSTO)}
                            className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all"
                        >
                            <Edit size={16} />
                            {editingSTO ? 'Cancel Edit' : 'Edit STO'}
                        </button>
                    </div>

                    {/* Core Thesis */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Core Thesis</label>
                        {editingSTO ? (
                            <textarea
                                value={sto.core_thesis}
                                onChange={(e) => setSto({ ...sto, core_thesis: e.target.value })}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                            />
                        ) : (
                            <p className="text-slate-900 bg-blue-50 p-4 rounded-lg">{sto.core_thesis}</p>
                        )}
                    </div>

                    {/* Primary Insights */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Primary Insights (3-5)</label>
                        <ul className="space-y-2">
                            {sto.primary_insights.map((insight, idx) => (
                                <li key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg">
                                    <span className="text-blue-600 font-bold">{idx + 1}.</span>
                                    <span className="text-slate-900">{insight}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contrarian Take */}
                    <div className="mb-6">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Contrarian / Nuanced Take</label>
                        <p className="text-slate-900 bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">{sto.contrarian_take}</p>
                    </div>

                    {/* Confirm Button */}
                    <button
                        onClick={handleConfirmSTO}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all"
                    >
                        <Check size={18} />
                        Confirm STO & Generate Outputs
                    </button>
                </motion.div>
            )}

            {/* Stage 3-5: Generate Outputs */}
            {stoConfirmed && !outputs && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl border border-slate-200 p-8 mb-6"
                >
                    <h3 className="text-lg font-bold text-slate-900 mb-6">Stage 3: Select Deployment Paths</h3>

                    {/* Path Selection */}
                    <div className="space-y-3 mb-6">
                        <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-all">
                            <input
                                type="checkbox"
                                checked={selectedPaths.thought_leadership}
                                onChange={(e) => setSelectedPaths({ ...selectedPaths, thought_leadership: e.target.checked })}
                                className="w-5 h-5"
                            />
                            <div>
                                <p className="font-bold text-slate-900">🎯 Thought Leadership</p>
                                <p className="text-sm text-slate-600">LinkedIn Post, Twitter Thread, Newsletter (2 formats)</p>
                            </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-all">
                            <input
                                type="checkbox"
                                checked={selectedPaths.demand}
                                onChange={(e) => setSelectedPaths({ ...selectedPaths, demand: e.target.checked })}
                                className="w-5 h-5"
                            />
                            <div>
                                <p className="font-bold text-slate-900">📈 Demand & Persuasion</p>
                                <p className="text-sm text-slate-600">Cold Email Hook, Landing Page Section (2 formats)</p>
                            </div>
                        </label>
                        <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg cursor-pointer hover:bg-slate-100 transition-all">
                            <input
                                type="checkbox"
                                checked={selectedPaths.internal}
                                onChange={(e) => setSelectedPaths({ ...selectedPaths, internal: e.target.checked })}
                                className="w-5 h-5"
                            />
                            <div>
                                <p className="font-bold text-slate-900">📊 Internal Alignment</p>
                                <p className="text-sm text-slate-600">Executive Brief (1 format)</p>
                            </div>
                        </label>
                    </div>

                    <button
                        onClick={handleGenerateOutputs}
                        disabled={isGenerating}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all disabled:opacity-50"
                    >
                        <Sparkles size={18} />
                        {isGenerating ? 'Generating...' : 'Generate All Outputs'}
                    </button>
                </motion.div>
            )}

            {/* Loading: Output Generation */}
            {isGenerating && (
                <div className="bg-white rounded-xl border border-slate-200 p-12 mb-6">
                    <AgentLoader message="Generating intent-aware outputs..." />
                </div>
            )}

            {/* Stage 6: Outputs Display */}
            {outputs && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-900">Generated Outputs</h3>
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all">
                            <Download size={18} />
                            Download All
                        </button>
                    </div>

                    {/* Thought Leadership Outputs */}
                    {selectedPaths.thought_leadership && outputs.thought_leadership && (
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white">
                                <h4 className="text-lg font-bold text-slate-900">🎯 Thought Leadership</h4>
                            </div>
                            <div className="divide-y divide-slate-200">
                                {outputs.thought_leadership.map((output, idx) => (
                                    <div key={idx} className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h5 className="font-bold text-slate-900 mb-1">{output.format}</h5>
                                                <p className="text-sm text-slate-600">Intent: {output.intent} | {output.char_count} chars</p>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(output.content)}
                                                className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all"
                                            >
                                                <Copy size={16} />
                                                Copy
                                            </button>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg mb-3">
                                            <pre className="whitespace-pre-wrap text-sm text-slate-900 font-sans">{output.content}</pre>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="font-medium">STO Nodes:</span>
                                            {output.sto_nodes.map((node, i) => (
                                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded">{node}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Demand Outputs */}
                    {selectedPaths.demand && outputs.demand && (
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-orange-50 to-white">
                                <h4 className="text-lg font-bold text-slate-900">📈 Demand & Persuasion</h4>
                            </div>
                            <div className="divide-y divide-slate-200">
                                {outputs.demand.map((output, idx) => (
                                    <div key={idx} className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h5 className="font-bold text-slate-900 mb-1">{output.format}</h5>
                                                <p className="text-sm text-slate-600">Intent: {output.intent} | {output.char_count} chars</p>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(output.content)}
                                                className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all"
                                            >
                                                <Copy size={16} />
                                                Copy
                                            </button>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg mb-3">
                                            <pre className="whitespace-pre-wrap text-sm text-slate-900 font-sans">{output.content}</pre>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="font-medium">STO Nodes:</span>
                                            {output.sto_nodes.map((node, i) => (
                                                <span key={i} className="px-2 py-1 bg-orange-100 text-orange-700 rounded">{node}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Internal Outputs */}
                    {selectedPaths.internal && outputs.internal && (
                        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                                <h4 className="text-lg font-bold text-slate-900">📊 Internal Alignment</h4>
                            </div>
                            <div className="divide-y divide-slate-200">
                                {outputs.internal.map((output, idx) => (
                                    <div key={idx} className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h5 className="font-bold text-slate-900 mb-1">{output.format}</h5>
                                                <p className="text-sm text-slate-600">Intent: {output.intent} | {output.char_count} chars</p>
                                            </div>
                                            <button
                                                onClick={() => copyToClipboard(output.content)}
                                                className="flex items-center gap-2 px-3 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-all"
                                            >
                                                <Copy size={16} />
                                                Copy
                                            </button>
                                        </div>
                                        <div className="bg-slate-50 p-4 rounded-lg mb-3">
                                            <pre className="whitespace-pre-wrap text-sm text-slate-900 font-sans">{output.content}</pre>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <span className="font-medium">STO Nodes:</span>
                                            {output.sto_nodes.map((node, i) => (
                                                <span key={i} className="px-2 py-1 bg-slate-100 text-slate-700 rounded">{node}</span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export default ContentMultiplier;
