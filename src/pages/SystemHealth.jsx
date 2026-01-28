
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, AlertTriangle, CheckCircle, RefreshCw, Database, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import StatusBadge from '../components/agents/StatusBadge';
import LastRunBadge from '../components/agents/LastRunBadge';

const SystemHealth = () => {
    const navigate = useNavigate();
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);
    const [lastRun, setLastRun] = useState(null);

    const handleScan = async () => {
        setIsScanning(true);
        setResult(null);
        setLastRun(new Date());

        try {
            const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await fetch(`${API_BASE}/revops/scan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setResult(data);
            } else {
                throw new Error('Scan failed');
            }
        } catch (error) {
            console.error("Scan failed", error);
            // Mock fallback
            setTimeout(() => {
                setResult({
                    health_score: 78,
                    issues: [
                        { type: "Stale Deal", count: 12, severity: "Medium" },
                        { type: "Missing Fields", count: 34, severity: "Low" }
                    ],
                    auto_fixes: ["Update 12 stale deals to 'Closed Lost'", "Populate missing contact data"],
                    scan_time: "just now"
                });
            }, 1200);
        } finally {
            setIsScanning(false);
        }
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
                        <ShieldCheck size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Health</h1>
                        <p className="text-slate-500 text-sm">Revenue Integrity & Data Hygiene Monitor</p>
                    </div>
                </div>
                <button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="px-6 py-2 bg-slate-600 text-white rounded-lg font-bold shadow-sm hover:bg-slate-700 flex items-center gap-2 transition-all"
                >
                    <RefreshCw size={18} className={isScanning ? "animate-spin" : ""} />
                    {isScanning ? "Scanning..." : "Run Scan"}
                </button>
            </div>

            {!result && !isScanning && (
                <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <Database size={48} className="mx-auto text-slate-300 mb-4" />
                    <p className="text-slate-500">Run a scan to detect stale deals and missing data.</p>
                </div>
            )}

            {result && (
                <div className="space-y-8">
                    {/* Scorecard */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <HealthCard
                            title="Overall Health"
                            value={`${result.health_score}/100`}
                            color={result.health_score > 80 ? "text-green-600" : "text-yellow-600"}
                        />
                        <HealthCard
                            title="Records Scanned"
                            value={result.record_count}
                            color="text-slate-900"
                        />
                        <HealthCard
                            title="Issues Detected"
                            value={result.issues.length}
                            color="text-red-500"
                        />
                    </div>

                    {/* Issues List */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 font-bold text-slate-800">
                            Action Items
                        </div>
                        <ul className="divide-y divide-slate-100">
                            {result.issues.map((issue, idx) => (
                                <motion.li
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    key={idx}
                                    className="p-6 hover:bg-slate-50 transition-colors flex justify-between items-center group"
                                >
                                    <div className="flex gap-4 items-start">
                                        <div className={`mt-1 p-2 rounded-full ${issue.severity === 'HIGH' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                            <AlertTriangle size={20} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-bold text-slate-900">{issue.type}</h4>
                                                <span className="text-xs font-mono text-slate-400 bg-slate-100 px-1 rounded">{issue.entity_id}</span>
                                            </div>
                                            <p className="text-slate-600 mt-1">{issue.description}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <span className="text-xs uppercase font-bold text-slate-400 block mb-1">Suggested Fix</span>
                                            <span className="text-sm font-medium text-indigo-600">{issue.suggested_fix}</span>
                                        </div>
                                        <button className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 bg-slate-900 text-white text-sm rounded font-medium">
                                            Auto-Fix
                                        </button>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                        {result.issues.length === 0 && (
                            <div className="p-8 text-center text-slate-500">
                                <CheckCircle size={32} className="mx-auto text-green-500 mb-2" />
                                <p>System is clean. Great job!</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const HealthCard = ({ title, value, color }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 text-center">
        <h3 className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-2">{title}</h3>
        <p className={`text-4xl font-bold ${color}`}>{value}</p>
    </div>
);

export default SystemHealth;
