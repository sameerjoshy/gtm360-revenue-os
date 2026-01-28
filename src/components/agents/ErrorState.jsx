import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorState = ({ error, onRetry }) => {
    return (
        <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
            <AlertTriangle size={48} className="mx-auto text-red-500 mb-4" />
            <h3 className="text-lg font-bold text-red-900 mb-2">Something went wrong</h3>
            <p className="text-red-700 mb-6">{error || "An unexpected error occurred."}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700 transition-all flex items-center gap-2 mx-auto"
                >
                    <RefreshCw size={18} />
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorState;
