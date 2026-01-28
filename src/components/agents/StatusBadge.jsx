import React from 'react';

const StatusBadge = ({ status = 'ACTIVE' }) => {
    const styles = {
        ACTIVE: 'bg-green-100 text-green-700 border-green-200',
        IDLE: 'bg-slate-100 text-slate-600 border-slate-200',
        ERROR: 'bg-red-100 text-red-700 border-red-200',
        RUNNING: 'bg-blue-100 text-blue-700 border-blue-200'
    };

    return (
        <span className={`px-3 py-1 text-xs font-bold rounded uppercase border ${styles[status] || styles.ACTIVE}`}>
            {status === 'ACTIVE' && '● System Active'}
            {status === 'IDLE' && 'Idle'}
            {status === 'ERROR' && '⚠ Error'}
            {status === 'RUNNING' && '⟳ Running'}
        </span>
    );
};

export default StatusBadge;
