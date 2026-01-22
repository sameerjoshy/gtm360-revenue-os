import React, { useState } from 'react';
import { Target, CheckCircle2, ArrowRight, Printer, Download, Star } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import useSubmitLead from '../../hooks/useSubmitLead';
import useLocalStorage from '../../hooks/useLocalStorage';

const ICPCalculator = () => {
    // SCORING CRITERIA
    const [scores, setScores] = useLocalStorage('gtm360_icp_scores', {
        budget: 10,
        authority: 10,
        need: 10,
        timeline: 10,
        techFit: 10
    });

    const [leadName, setLeadName] = useState('');
    const { submit, status } = useSubmitLead();

    const totalScore = Object.values(scores).reduce((a, b) => a + Number(b), 0);
    const maxScore = 100;

    const data = [
        { subject: 'Budget', A: scores.budget, fullMark: 20 },
        { subject: 'Authority', A: scores.authority, fullMark: 20 },
        { subject: 'Need', A: scores.need, fullMark: 20 },
        { subject: 'Timeline', A: scores.timeline, fullMark: 20 },
        { subject: 'Tech Fit', A: scores.techFit, fullMark: 20 },
    ];

    const getSignalStrength = () => {
        if (totalScore >= 80) return { label: 'High Signal', color: '#10b981', text: 'text-emerald-400', stroke: '#10b981', fill: '#10b981' };
        if (totalScore >= 50) return { label: 'Medium Signal', color: '#f59e0b', text: 'text-amber-400', stroke: '#f59e0b', fill: '#f59e0b' };
        return { label: 'Low Signal', color: '#ef4444', text: 'text-red-400', stroke: '#ef4444', fill: '#ef4444' };
    };

    const signal = getSignalStrength();

    const handleSave = (e) => {
        e.preventDefault();
        submit('icp_score', [
            { name: 'firstname', value: leadName },
            { name: 'message', value: `ICP Score: ${totalScore}/100` }
        ]);
    };

    const handleExport = () => {
        const headers = ["Dimension", "Score"];
        const rows = data.map(d => [d.subject, d.A]);
        rows.push(["Total Score", totalScore]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `icp_audit_${leadName || 'export'}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-slate-700 bg-slate-900 z-20 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-widest mb-1">
                        <Target className="w-4 h-4" /> Qualification Radar
                    </div>
                    <h2 className="text-2xl font-bold text-white">ICP Signal Scorer</h2>
                </div>
                <div className="flex gap-2">
                    <button onClick={handleExport} className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition-colors border border-slate-600 no-print" title="Export CSV">
                        <Download className="w-4 h-4" />
                    </button>
                    <button onClick={() => window.print()} className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-2 rounded-lg transition-colors border border-slate-600 no-print" title="Print Report">
                        <Printer className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex-grow p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* CHART */}
                <div className="bg-slate-800/30 rounded-2xl border border-slate-700/50 p-4 relative flex flex-col items-center justify-center min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                            <PolarRadiusAxis angle={30} domain={[0, 20]} tick={false} axisLine={false} />
                            <Radar
                                name="Lead Score"
                                dataKey="A"
                                stroke={signal.stroke}
                                fill={signal.fill}
                                fillOpacity={0.3}
                                strokeWidth={2}
                            />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                        </RadarChart>
                    </ResponsiveContainer>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <div className={`text-4xl font-black ${signal.text} drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]`}>{totalScore}</div>
                        <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Aggregate</div>
                    </div>
                </div>

                {/* INPUTS */}
                <div className="space-y-6 flex flex-col justify-center">
                    <div className="bg-purple-900/10 border border-purple-500/20 p-4 rounded-xl mb-2">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-slate-800 border border-slate-700 ${signal.text}`}>
                                <Star className="w-5 h-5 fill-current opacity-80" />
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Quality Diagnosis</div>
                                <div className={`text-lg font-bold ${signal.text}`}>{signal.label}</div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {data.map((item) => {
                            const key = item.subject === 'Tech Fit' ? 'techFit' : item.subject.toLowerCase();
                            return (
                                <div key={item.subject}>
                                    <div className="flex justify-between items-center text-xs mb-2">
                                        <span className="text-slate-400 font-bold uppercase tracking-wider">{item.subject}</span>
                                        <span className="text-white font-mono bg-slate-800 px-2 py-0.5 rounded">{scores[key]} / 20</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="20"
                                        value={scores[key]}
                                        onChange={(e) => setScores({ ...scores, [key]: Number(e.target.value) })}
                                        className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="p-6 border-t border-slate-800 bg-slate-950/50 flex flex-col md:flex-row gap-4 items-center">
                <input
                    type="text"
                    placeholder="Account Name (e.g. Acme Corp)"
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    className="flex-grow bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:border-purple-500/50 outline-none transition-all"
                />
                {!status ? (
                    <button onClick={handleSave} className="w-full md:w-auto px-8 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-purple-900/20 active:scale-95">
                        Log Signal Result
                    </button>
                ) : (
                    <div className="text-emerald-400 text-xs font-bold px-8 py-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4" /> Result Persisted
                    </div>
                )}
            </div>
        </div>
    );
};

export default ICPCalculator;
