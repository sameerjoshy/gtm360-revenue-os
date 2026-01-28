import React from 'react';
import { motion } from 'framer-motion';

const AgentLoader = ({ message = "Processing..." }) => {
    return (
        <div className="flex flex-col items-center justify-center py-20">
            <motion.div
                className="relative w-16 h-16 mb-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
                <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full"></div>
            </motion.div>
            <motion.p
                className="text-slate-600 font-medium"
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
            >
                {message}
            </motion.p>
        </div>
    );
};

export default AgentLoader;
