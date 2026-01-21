import React, { useState } from 'react';
import { Target, CheckCircle2, ArrowRight } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import useSubmitLead from '../../hooks/useSubmitLead';

const ICPCalculator = () => {
    // SCORING CRITERIA
    const [scores, setScores] = useState({
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
        if (totalScore >= 80) return { label: 'High Signal', color: 'text-green-400', stroke: '#4ade80', fill: '#4ade80' };
        if (totalScore >= 50) return { label: 'Medium Signal', color: 'text-yellow-400', stroke: '#facc15', fill: '#facc15' };
        return { label: 'Low Signal', color: 'text-red-400', stroke: '#f87171', fill: '#f87171' };
    };

    const signal = getSignalStrength();

    const handleSave = (e) => {
        e.preventDefault();
        submit('icp_score', [
            { name: 'firstname', value: leadName },
            { name: 'message', value: `ICP Score: ${totalScore}/100` }
        ]);
    };

    return (
        <div className="bg-slate-900 rounded-2xl border border-slate-700 shadow-xl overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-slate-700 bg-slate-900 z-20">
                <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase tracking-widest mb-1">
                    <Target className="w-4 h-4" /> Qualification Radar
                </div>
                <h2 className="text-2xl font-bold text-white">ICP Signal Scorer</h2>
            </div>

            <div className="flex-grow p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CHART */}
                <div className="h-64 w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                            <PolarGrid stroke="#334155" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                            <PolarRadiusAxis angle={30} domain={[0, 20]} tick={false} axisLine={false} />
                            <Radar
                                name="Lead Score"
                                dataKey="A"
                                stroke={signal.stroke}
                                fill={signal.fill}
                                fillOpacity={0.4}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                        <div className="text-2xl font-bold text-white shadow-black drop-shadow-md">{totalScore}</div>
                    </div>
                </div>

                {/* INPUTS */}
                <div className="space-y-4">
                    {data.map((item) => (
                        <div key={item.subject}>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-slate-400 font-bold uppercase">{item.subject}</span>
                                <span className="text-white font-mono">{scores[item.subject === 'Tech Fit' ? 'techFit' : item.subject.toLowerCase()]} / 20</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="20"
                                value={scores[item.subject === 'Tech Fit' ? 'techFit' : item.subject.toLowerCase()]}
                                onChange={(e) => setScores({ ...scores, [item.subject === 'Tech Fit' ? 'techFit' : item.subject.toLowerCase()]: Number(e.target.value) })}
                                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 border-t border-slate-800 bg-slate-900/50">
                {!status ? (
                    <button onClick={handleSave} className="w-full py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 border border-purple-600/50 rounded-lg text-xs font-bold transition-all uppercase tracking-wider">
                        Save Lead Record
                    </button>
                ) : (
                    <div className="text-center text-green-400 text-xs font-bold py-2">Lead Saved Successfully</div>
                )}
            </div>
        </div>
    );
};

export default ICPCalculator;
