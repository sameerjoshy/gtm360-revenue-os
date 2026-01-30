import React from 'react';
import { LucideIcon } from 'lucide-react';

const EmptyState = ({
    icon: Icon,
    title,
    description,
    actionLabel,
    onAction,
    color = "indigo"
}) => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-slate-50/50 rounded-xl border-2 border-dashed border-slate-200">
            <div className={`w-16 h-16 rounded-full bg-${color}-50 flex items-center justify-center mb-6`}>
                {Icon && <Icon className={`w-8 h-8 text-${color}-500`} />}
            </div>

            <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
            <p className="text-slate-500 max-w-md mb-8 leading-relaxed">
                {description}
            </p>

            {actionLabel && onAction && (
                <button
                    onClick={onAction}
                    className={`px-6 py-3 rounded-lg font-medium text-white shadow-sm transition-all bg-${color}-600 hover:bg-${color}-700 hover:shadow-md`}
                >
                    {actionLabel}
                </button>
            )}
        </div>
    );
};

export default EmptyState;
