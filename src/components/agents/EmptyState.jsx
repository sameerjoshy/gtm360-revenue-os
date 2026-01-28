import React from 'react';

const EmptyState = ({ icon: Icon, message, subMessage }) => {
    return (
        <div className="text-center py-20 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            {Icon && <Icon size={48} className="mx-auto text-slate-300 mb-4" />}
            <p className="text-slate-500 font-medium">{message}</p>
            {subMessage && <p className="text-slate-400 text-sm mt-2">{subMessage}</p>}
        </div>
    );
};

export default EmptyState;
