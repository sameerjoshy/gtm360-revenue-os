import React from 'react';
import { Clock } from 'lucide-react';

const LastRunBadge = ({ timestamp }) => {
    if (!timestamp) return null;

    const getTimeAgo = (ts) => {
        const now = new Date();
        const then = new Date(ts);
        const diffMs = now - then;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        return `${diffDays}d ago`;
    };

    return (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
            <Clock size={14} />
            <span>Last run: {getTimeAgo(timestamp)}</span>
        </div>
    );
};

export default LastRunBadge;
