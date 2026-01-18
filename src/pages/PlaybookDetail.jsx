import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { playbooks } from '../data/playbooks';
import { BookOpen, Video, ArrowLeft, CheckCircle, Copy, Share2 } from 'lucide-react';
import DOMPurify from 'dompurify';

const SnippetCard = ({ snippet }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(snippet);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="group bg-white border border-gray-100 hover:border-[var(--color-primary)] p-6 rounded-xl shadow-sm hover:shadow-md transition-all relative">
            <p className="text-gray-700 text-sm leading-relaxed pr-8">
                "{snippet}"
            </p>
            <button
                onClick={handleCopy}
                className={`absolute top-4 right-4 p-2 rounded-lg transition-colors ${copied ? 'text-green-500 bg-green-50' : 'text-gray-400 hover:text-[var(--color-primary)] hover:bg-gray-50'
                    }`}
                title="Copy snippet"
            >
                {copied ? <CheckCircle className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
        </div>
    );
};

const PlaybookDetail = () => {
    const { slug } = useParams();
    const playbook = playbooks.find(p => p.slug === slug);
    const [activeTab, setActiveTab] = useState('strategy'); // 'strategy' or 'creator'

    if (!playbook || !playbook.content) {
        return <Navigate to="/playbooks" />;
    }

    return (
        <div className="playbook-detail min-h-screen bg-white">
            <Helmet>
                <title>{playbook.title} | GTM Playbooks</title>
                <meta name="description" content={playbook.subtitle} />
            </Helmet>

            {/* HEADER */}
            <section className="bg-slate-50 border-b border-gray-200 pt-32 pb-12">
                <div className="container max-w-5xl">
                    <Link to="/playbooks" className="inline-flex items-center text-slate-500 hover:text-[var(--color-primary)] mb-8 text-sm font-medium transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Repository
                    </Link>
                    <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary)] mb-2 block">
                                {playbook.category} Playbook
                            </span>
                            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                {playbook.title}
                            </h1>
                            <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                                {playbook.subtitle}
                            </p>
                        </div>
                        <div className="flex gap-3">
                            {/* Actions (Future: Save, Share) */}
                            <button className="btn bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-4 py-2 text-sm flex items-center gap-2">
                                <Share2 className="w-4 h-4" /> Share
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* TABS & CONTENT */}
            <section className="py-12">
                <div className="container max-w-5xl">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* LEFT: MAIN CONTENT */}
                        <div className="lg:col-span-2">
                            {/* Tab Headers */}
                            <div className="flex gap-8 border-b border-gray-200 mb-8">
                                <button
                                    onClick={() => setActiveTab('strategy')}
                                    className={`pb-4 text-sm font-bold uppercase tracking-wide flex items-center gap-2 transition-all border-b-2 ${activeTab === 'strategy'
                                        ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                                        : 'border-transparent text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <BookOpen className="w-4 h-4" /> The Strategy
                                </button>
                                <button
                                    onClick={() => setActiveTab('creator')}
                                    className={`pb-4 text-sm font-bold uppercase tracking-wide flex items-center gap-2 transition-all border-b-2 ${activeTab === 'creator'
                                        ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                                        : 'border-transparent text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <Video className="w-4 h-4" /> Creator Studio
                                </button>
                            </div>

                            {/* View: STRATEGY */}
                            {activeTab === 'strategy' && (
                                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-[var(--color-primary)] prose-strong:text-gray-900">
                                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(playbook.content.onePager) }} />
                                </div>
                            )}

                            {/* View: CREATOR STUDIO */}
                            {activeTab === 'creator' && (
                                <div className="space-y-12">
                                    {/* Shot Script */}
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-bold flex items-center gap-2">
                                                <Video className="w-5 h-5 text-red-500" />
                                                Video Script: The 60s Short
                                            </h3>
                                            <span className="text-xs font-mono bg-slate-200 text-slate-600 px-2 py-1 rounded">linkedin / shorts / reels</span>
                                        </div>
                                        <div className="bg-white border p-6 rounded-lg font-mono text-sm leading-loose whitespace-pre-wrap text-slate-700 shadow-inner">
                                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(playbook.content.scriptShort) }} />
                                        </div>
                                    </div>

                                    {/* Deep Dive */}
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-8">
                                        <div className="flex justify-between items-center mb-6">
                                            <h3 className="text-xl font-bold flex items-center gap-2">
                                                <BookOpen className="w-5 h-5 text-blue-500" />
                                                Conversation Guide: The Deep Dive
                                            </h3>
                                            <span className="text-xs font-mono bg-slate-200 text-slate-600 px-2 py-1 rounded">podcast / youtube</span>
                                        </div>
                                        <div className="bg-white border p-6 rounded-lg font-sans text-sm leading-relaxed text-slate-700 shadow-inner">
                                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(playbook.content.scriptDeepDive) }} />
                                        </div>
                                    </div>

                                    {/* Best Practice Snippets */}
                                    {playbook.content.bestPracticeSnippets && (
                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2">
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                                <h3 className="text-xl font-bold text-gray-900">Best Practice Snippets</h3>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {playbook.content.bestPracticeSnippets.map((snippet, idx) => (
                                                    <SnippetCard key={idx} snippet={snippet} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* RIGHT: SIDEBAR (Service Bridge) */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-28 bg-[var(--color-primary)] text-white p-8 rounded-xl shadow-xl overflow-hidden relative">
                                <div className="relative z-10">
                                    <h3 className="text-lg font-bold mb-2">Deploy this System</h3>
                                    <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                                        Understanding the theory is step one. Installing it into your organization is step two.
                                    </p>
                                    <div className="bg-white/10 rounded-lg p-4 mb-6 backdrop-blur-sm border border-white/10">
                                        <h4 className="text-xs font-bold uppercase opacity-75 mb-1">Recommended Module</h4>
                                        <div className="font-semibold">{playbook.relatedService.title}</div>
                                    </div>
                                    <Link to={playbook.relatedService.link} className="btn bg-white text-[var(--color-primary)] w-full text-center hover:bg-indigo-50 border-none font-bold">
                                        View Implementation Details
                                    </Link>
                                </div>
                                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default PlaybookDetail;
