import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { engineStages, glossaryTerms } from '../data/glossary';
import SEO from '../components/SEO';
import IconRenderer from '../components/visuals/IconRenderer';
import { Search, ArrowRight, Tag } from 'lucide-react';

const Glossary = () => {
    const [activeStage, setActiveStage] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredTerms = glossaryTerms.filter(term => {
        const matchesStage = activeStage === 'all' || term.stage === activeStage;
        const matchesSearch = term.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            term.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
            term.slug.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStage && matchesSearch;
    });

    const getStageColor = (stageId) => {
        const stage = engineStages.find(s => s.id === stageId);
        return stage ? stage.color : 'gray';
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <SEO
                title="GTM Dictionary | The Language of Revenue Engineering"
                description="Decode the slang and science of modern GTM. From 'Shadow Funnels' to 'Zombie Pipelines', learn the terminology of high-growth revenue engines."
            />

            {/* Hero Section */}
            <section className="pt-24 pb-16 bg-white border-b border-gray-100 relative overflow-hidden">
                {/* Abstract Bg */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-[var(--color-primary)] uppercase bg-indigo-50 rounded-full border border-indigo-100">
                            <Tag className="w-3 h-3" /> GTM Dictionary
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight">
                            The New Language of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] to-purple-600">Growth</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
                            Modern revenue engines aren't built on "MQLs" and "Dials". They are built on <span className="font-semibold text-gray-900">Signals</span>, <span className="font-semibold text-gray-900">Leverage</span>, and <span className="font-semibold text-gray-900">Physics</span>.
                        </p>
                    </motion.div>

                    {/* Search & Filter Controls */}
                    <div className="max-w-3xl mx-auto">
                        <div className="relative mb-8 group">
                            <input
                                type="text"
                                placeholder="Search the dictionary (e.g. 'Zombie Pipeline')..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-4 py-5 bg-white border border-gray-200 rounded-full shadow-lg focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all outline-none text-lg group-hover:shadow-xl"
                            />
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-hover:text-[var(--color-primary)] transition-colors" />
                        </div>

                        <div className="flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => setActiveStage('all')}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${activeStage === 'all'
                                    ? 'bg-gray-900 text-white border-gray-900 shadow-lg scale-105'
                                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900'
                                    }`}
                            >
                                All Terms
                            </button>
                            {engineStages.map((stage) => (
                                <button
                                    key={stage.id}
                                    onClick={() => setActiveStage(stage.id)}
                                    className={`px-5 py-2 rounded-full text-sm font-bold transition-all border ${activeStage === stage.id
                                        ? `bg-white text-gray-900 border-${stage.color}-500 ring-2 ring-${stage.color}-100 shadow-md scale-105`
                                        : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-900'
                                        }`}
                                >
                                    {stage.title}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Grid */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence>
                        {filteredTerms.map((term) => (
                            <motion.div
                                key={term.id}
                                variants={itemVariants}
                                layout
                                className="group relative h-full bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-white/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Hover Gradient Border Effect */}
                                <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-${getStageColor(term.stage)}-100 pointer-events-none transition-all`}></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`p-3 rounded-xl bg-${getStageColor(term.stage)}-50 text-${getStageColor(term.stage)}-600 group-hover:scale-110 transition-transform duration-300`}>
                                            <IconRenderer icon={term.visualIcon} className="w-6 h-6" />
                                        </div>
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-500 border border-gray-200`}>
                                            {term.type}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[var(--color-primary)] transition-colors">
                                        {term.title}
                                    </h3>

                                    <p className="text-gray-500 text-sm mb-4 italic border-l-2 border-gray-200 pl-3">
                                        "{term.shortDefinition}"
                                    </p>

                                    <p className="text-gray-700 leading-relaxed mb-6 text-sm flex-grow">
                                        {term.fullDefinition}
                                    </p>

                                    <div className="pt-4 border-t border-gray-100 mt-auto flex items-center justify-between">
                                        <span className={`text-xs font-bold uppercase tracking-wider text-${getStageColor(term.stage)}-600 flex items-center gap-1`}>
                                            <div className={`w-2 h-2 rounded-full bg-${getStageColor(term.stage)}-500`}></div>
                                            {engineStages.find(s => s.id === term.stage)?.title.split(' ')[0]}
                                        </span>
                                        {term.relatedPlaybook && (
                                            <Link to={term.relatedPlaybook.link} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors bg-indigo-50 px-3 py-1.5 rounded-full hover:bg-indigo-100 border border-indigo-100">
                                                View Playbook <ArrowRight className="w-3 h-3" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredTerms.length === 0 && (
                    <div className="text-center py-20 bg-white/50 rounded-3xl border border-dashed border-gray-300">
                        <p className="text-lg text-gray-500">No signals found matching "{searchQuery}".</p>
                        <button onClick={() => setSearchQuery('')} className="mt-4 text-[var(--color-primary)] font-bold hover:underline">
                            Clear filters
                        </button>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Glossary;
