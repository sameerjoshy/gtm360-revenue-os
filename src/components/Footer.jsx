import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            // Mimic API call
            setStatus('success');
            setTimeout(() => { setEmail(''); setStatus('idle'); }, 3000);
        }
    };

    return (
        <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-slate-900">
            <div className="container mx-auto px-4 md:px-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                    {/* COL 1: BRAND (4 cols) */}
                    <div className="md:col-span-4">
                        <Link to="/" className="inline-block text-2xl font-bold text-white mb-6 tracking-tight">
                            GTM-360
                        </Link>
                        <p className="text-slate-500 mb-8 leading-relaxed max-w-sm">
                            The Operating System for Revenue Teams. We help B2B leaders move from "Art" to "Engineering".
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-slate-700 hover:text-white transition-all">
                                <Github className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* COL 2: PLATFORM (2 cols) */}
                    <div className="md:col-span-2">
                        <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Platform</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/platform" className="hover:text-indigo-400 transition-colors">Interactive Demo</Link></li>
                            <li><Link to="/problems" className="hover:text-indigo-400 transition-colors">Problems Solved</Link></li>
                            <li><Link to="/services" className="hover:text-indigo-400 transition-colors">Services</Link></li>
                            <li><Link to="/playbooks" className="hover:text-indigo-400 transition-colors">Playbook Repo</Link></li>
                            <li><Link to="/diagnostic" className="hover:text-indigo-400 transition-colors">Diagnostic</Link></li>
                            <li><Link to="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* COL 3: RESOURCES (2 cols) */}
                    <div className="md:col-span-2">
                        <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Resources</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/insights" className="hover:text-indigo-400 transition-colors">Research Hub</Link></li>
                            <li><Link to="/glossary" className="hover:text-indigo-400 transition-colors">GTM Dictionary</Link></li>
                            <li><Link to="/how-we-work" className="hover:text-indigo-400 transition-colors">Operating Model</Link></li>
                            <li><Link to="/partners" className="hover:text-indigo-400 transition-colors">Partners</Link></li>
                        </ul>
                    </div>

                    {/* COL 4: NEWSLETTER (4 cols) */}
                    <div className="md:col-span-4">
                        <h4 className="text-white font-bold mb-6 tracking-wide text-sm uppercase">Join 5,000+ Revenue Engineers</h4>
                        <p className="text-slate-500 text-sm mb-6">
                            Weekly diagnostics, axioms, and plays. No fluff.
                        </p>
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="email"
                                placeholder="work@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-slate-900 border border-slate-800 rounded-lg py-3 pl-4 pr-12 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder-slate-600"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-indigo-600 rounded text-white hover:bg-indigo-500 transition-colors"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                        {status === 'success' && (
                            <p className="text-emerald-400 text-xs mt-2 flex items-center">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-2"></span> Welcome to the system.
                            </p>
                        )}
                    </div>
                </div>

                {/* BOTTOM BRAND */}
                <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
                    <div className="mb-4 md:mb-0">
                        &copy; {currentYear} GTM-360 Intelligence. All rights reserved.
                    </div>
                    <div className="flex space-x-8">
                        <Link to="/privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
                        <a href="#" className="hover:text-slate-400 transition-colors">System Status</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
