import React from 'react';
import { useAgentRuns } from '../hooks/useAgentRuns';
import { Activity, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const ActivityFeed = ({ limit = 10 }) => {
    const { runs, loading, error } = useAgentRuns(limit);

    const getAgentIcon = (agentType) => {
        return <Activity size={16} className="text-indigo-600" />;
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'DONE':
                return <CheckCircle size={14} className="text-green-500" />;
            case 'FAILED':
                return <AlertCircle size={14} className="text-red-500" />;
            default:
                return <Clock size={14} className="text-yellow-500" />;
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Activity Feed</h3>
                <div className="space-y-3">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-200 rounded-full"></div>
                            <div className="flex-1">
                                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                                <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Activity Feed</h3>
                <div className="text-center text-red-600 py-4">
                    <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Failed to load activity</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Activity size={20} className="text-indigo-600" />
                Activity Feed
            </h3>

            {runs.length === 0 ? (
                <div className="text-center text-slate-400 py-8">
                    <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No activity yet</p>
                    <p className="text-xs mt-1">Agent runs will appear here</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {runs.map(run => (
                        <div
                            key={run.run_id}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                                {getAgentIcon(run.agent_type)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-slate-900 text-sm">
                                        {run.agent_type}
                                    </span>
                                    {getStatusIcon(run.status)}
                                    <span className={`text-xs font-medium ${run.status === 'DONE' ? 'text-green-600' :
                                            run.status === 'FAILED' ? 'text-red-600' :
                                                'text-yellow-600'
                                        }`}>
                                        {run.status}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">
                                    {run.inputs?.domain || 'Processing...'}
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                    {formatTime(run.created_at)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActivityFeed;
