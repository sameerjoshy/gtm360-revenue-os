import React from 'react';
import useVisitorData from '../../hooks/useVisitorData';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const PersonalizationBanner = () => {
    const { visitor } = useVisitorData();

    // If no visitor identified (or no company name), don't show anything.
    if (!visitor || !visitor.company) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-4 right-4 z-50 max-w-sm w-full"
            >
                <div className="bg-slate-900 border-l-4 border-[var(--color-primary)] p-6 shadow-2xl rounded-r mx-4 md:mx-0">
                    <div className="flex justify-between items-start mb-2">
                        <span className="text-[var(--color-primary)] text-xs font-bold uppercase tracking-widest">
                            Welcome {visitor.company} Team
                        </span>
                        <button
                            onClick={(e) => e.target.closest('.fixed').style.display = 'none'}
                            className="text-gray-500 hover:text-white"
                        >
                            ×
                        </button>
                    </div>
                    <p className="text-white text-sm leading-relaxed">
                        We help companies in {visitor.industry || "your industry"} fix the GTM systems strictly executing growth strategy.
                    </p>
                    <Link to="/diagnostic" className="mt-4 inline-block text-xs font-bold text-white border-b border-[var(--color-primary)] pb-1 hover:text-[var(--color-primary)] transition-colors">
                        See how we can help {visitor.company} →
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PersonalizationBanner;
