import React, { useState } from 'react';
import { Plus, Play, Trash2, ArrowRight, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const WorkflowBuilder = () => {
    const [workflows, setWorkflows] = useState([
        {
            id: 'wf_001',
            name: 'Research → Sniper → Approve',
            description: 'Automated outbound sequence',
            steps: [
                { agent: 'Researcher', trigger: 'Manual', condition: null },
                { agent: 'Sniper', trigger: 'Auto', condition: 'ICP Score > 80' },
                { agent: 'Approval', trigger: 'Manual', condition: null }
            ],
            status: 'Active'
        }
    ]);

    const [selectedWorkflow, setSelectedWorkflow] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    const availableAgents = [
        { id: 'researcher', name: 'Researcher', color: 'blue' },
        { id: 'sniper', name: 'Sniper', color: 'indigo' },
        { id: 'listener', name: 'Listener', color: 'pink' },
        { id: 'sales', name: 'Sales War Room', color: 'orange' },
        { id: 'expansion', name: 'Expansion Radar', color: 'emerald' },
        { id: 'revops', name: 'System Health', color: 'slate' }
    ];

    const createWorkflow = () => {
        const newWorkflow = {
            id: `wf_${Date.now()}`,
            name: 'New Workflow',
            description: 'Click to edit description',
            steps: [],
            status: 'Draft'
        };
        setWorkflows([...workflows, newWorkflow]);
        setSelectedWorkflow(newWorkflow.id);
        setIsCreating(true);
    };

    const deleteWorkflow = (id) => {
        setWorkflows(workflows.filter(w => w.id !== id));
        if (selectedWorkflow === id) setSelectedWorkflow(null);
    };

    const addStep = (workflowId, agentId) => {
        setWorkflows(workflows.map(w => {
            if (w.id === workflowId) {
                const agent = availableAgents.find(a => a.id === agentId);
                return {
                    ...w,
                    steps: [...w.steps, { agent: agent.name, trigger: 'Auto', condition: null }]
                };
            }
            return w;
        }));
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Workflow Automation</h1>
                    <p className="text-slate-600">Create multi-agent workflows with conditional logic</p>
                </div>
                <button
                    onClick={createWorkflow}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
                >
                    <Plus size={20} />
                    New Workflow
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Workflow List */}
                <div className="lg:col-span-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Your Workflows</h3>
                    <div className="space-y-3">
                        {workflows.map(workflow => (
                            <motion.div
                                key={workflow.id}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setSelectedWorkflow(workflow.id)}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${selectedWorkflow === workflow.id
                                        ? 'border-blue-500 bg-blue-50'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-900">{workflow.name}</h4>
                                    <span className={`px-2 py-1 text-xs font-medium rounded ${workflow.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                                        }`}>
                                        {workflow.status}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-600 mb-3">{workflow.description}</p>
                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                    <Settings size={14} />
                                    {workflow.steps.length} steps
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Workflow Canvas */}
                <div className="lg:col-span-2">
                    {selectedWorkflow ? (
                        <div className="bg-white rounded-xl border border-slate-200 p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-slate-900">
                                    {workflows.find(w => w.id === selectedWorkflow)?.name}
                                </h3>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {/* Execute workflow */ }}
                                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-all flex items-center gap-2"
                                    >
                                        <Play size={16} />
                                        Run
                                    </button>
                                    <button
                                        onClick={() => deleteWorkflow(selectedWorkflow)}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all flex items-center gap-2"
                                    >
                                        <Trash2 size={16} />
                                        Delete
                                    </button>
                                </div>
                            </div>

                            {/* Workflow Steps */}
                            <div className="space-y-4 mb-6">
                                {workflows.find(w => w.id === selectedWorkflow)?.steps.map((step, idx) => (
                                    <div key={idx} className="flex items-center gap-4">
                                        <div className="flex-1 p-4 bg-slate-50 rounded-lg border border-slate-200">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-bold text-slate-900">{step.agent}</p>
                                                    <p className="text-sm text-slate-600">Trigger: {step.trigger}</p>
                                                    {step.condition && (
                                                        <p className="text-xs text-slate-500 mt-1">Condition: {step.condition}</p>
                                                    )}
                                                </div>
                                                <div className="text-2xl font-bold text-slate-300">{idx + 1}</div>
                                            </div>
                                        </div>
                                        {idx < workflows.find(w => w.id === selectedWorkflow).steps.length - 1 && (
                                            <ArrowRight className="text-slate-400" size={24} />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Add Step */}
                            <div className="border-t border-slate-200 pt-6">
                                <h4 className="font-bold text-slate-900 mb-3">Add Agent</h4>
                                <div className="grid grid-cols-3 gap-3">
                                    {availableAgents.map(agent => (
                                        <button
                                            key={agent.id}
                                            onClick={() => addStep(selectedWorkflow, agent.id)}
                                            className={`p-3 rounded-lg border-2 border-${agent.color}-200 bg-${agent.color}-50 hover:bg-${agent.color}-100 transition-all text-sm font-medium text-${agent.color}-700`}
                                        >
                                            {agent.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-slate-50 rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
                            <Settings size={48} className="mx-auto text-slate-300 mb-4" />
                            <p className="text-slate-600">Select a workflow to edit or create a new one</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WorkflowBuilder;
