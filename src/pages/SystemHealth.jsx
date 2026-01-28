
import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, RefreshCw, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const SystemHealth = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [result, setResult] = useState(null);

    const handleScan = async () => {
        setIsScanning(true);
        setResult(null);
        try {
            const response = await fetch('/api/revops/hygiene/scan', { method: 'POST' });
            const data = await response.json();

            // Artificial delay for UX
            setTimeout(() => {
                setResult(data);
                setIsScanning(false);
            }, 1200);
        } catch (error) {
            console.error("Scan failed", error);
            setIsScanning(false);
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto min-h-screen">
            <header className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <ShieldCheck className="text-indigo-600" size={32} />
                        System Health
                    </h1>
                    <p className="text-slate-500 mt-2 text-lg">
                        Revenue Integrity & Data Hygiene Monitor
                    </p>
                </div>

                <button
                    onClick={handleScan}
                    disabled={isScanning}
                    className="btn bg-white border border-slate-300 text-slate-700 px-6 py-2 rounded-lg font-medium shadow-sm hover:bg-slate-50 flex items-center gap-2"
                >
                    <RefreshCw size={18} className={isScanning ? "animate-spin" : ""} />
                    {isScanning ? "Scanning Environment..." : "Run Hygiene Scan"}
                </button>
            </header>

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
