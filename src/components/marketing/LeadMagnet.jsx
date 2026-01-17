import React, { useState } from 'react';
import { Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useSubmitLead from '../../hooks/useSubmitLead';

const LeadMagnet = () => {
    const [email, setEmail] = useState('');
    const { submit, status } = useSubmitLead();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        // Submit to HubSpot
        const success = await submit('nurture_course', [
            { name: 'email', value: email },
            { name: 'message', value: 'Opted in for 5-Day Revenue Diagnostic Course' }
        ]);

        if (success) {
            navigate('/thank-you', { state: { search: 'nurture' } });
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-slate-900 rounded-sm p-8 md:p-12 border border-slate-700 text-center animate-fade-in-up">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-6">
                    <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">You're on the list.</h3>
                <p className="text-slate-300 max-w-lg mx-auto">
                    Your first diagnostic check will arrive in your inbox in 5 minutes.
                    <br />
                    Subject line: <em>"[Day 1] The Truth About Your Pipeline"</em>
                </p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900 rounded-sm overflow-hidden border border-slate-700 shadow-2xl relative">
            {/* Contextual Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="relative p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest rounded-sm mb-6 border border-blue-500/20">
                        Free 5-Day Email Course
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                        Diagnose your revenue engine before you break it.
                    </h3>
                    <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                        Don't have time for a full audit? Get 5 evidence-based checks delivered to your inbox. Find your bottleneck in 10 minutes a day.
                    </p>

                    <ul className="space-y-3 mb-8">
                        {[
                            "Day 1: The 'Fake Pipeline' Test",
                            "Day 2: Why your win rates are lying",
                            "Day 3: The Forecast Reality Check"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center text-slate-300">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full md:w-[400px] bg-white p-6 rounded-sm">
                    <div className="text-center mb-6">
                        <p className="text-gray-900 font-bold mb-1">Get the checks</p>
                        <p className="text-xs text-gray-500">No fluff. Unsubscribe anytime.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">Work Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your work email"
                                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-gray-900"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full btn bg-[var(--color-primary)] text-white hover:bg-opacity-90 flex items-center justify-center gap-2 py-3"
                        >
                            {status === 'loading' ? 'Processing...' : (
                                <>
                                    Start the Course <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>
                    <p className="text-[10px] text-center text-gray-400 mt-4">
                        Join 2,000+ Revenue Leaders.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LeadMagnet;
