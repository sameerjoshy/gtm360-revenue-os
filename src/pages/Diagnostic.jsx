import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

const Diagnostic = () => {
    // 1. SEO + AEO FOUNDATION
    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": "GTM Diagnostic",
        "provider": {
            "@type": "Organization",
            "name": "GTM-360"
        },
        "areaServed": "Global",
        "serviceType": "Go-to-Market Diagnostic",
        "description": "A short, rigorous GTM diagnostic to help B2B leaders identify the real constraint behind stalled growth."
    };

    return (
        <div className="diagnostic-page">
            <Helmet>
                <title>GTM Diagnostic for Stalled B2B Growth | GTM-360</title>
                <meta name="description" content="A short, rigorous GTM diagnostic to help B2B leaders identify the real constraint behind stalled growth before committing to execution." />
                <link rel="canonical" href="https://gtm-360.com/diagnostic" />
                <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
            </Helmet>

            {/* 2. HERO SECTION */}
            <section className="section py-20 md:py-32 bg-white">
                <div className="container max-w-4xl opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-8 text-[var(--color-primary)]">
                        Fix the real GTM constraint behind stalled B2B growth
                    </h1>
                    <h2 className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed font-normal">
                        GTM-360 helps B2B companies design and realign their go-to-market systems<br className="hidden md:block" />
                        so growth becomes predictable — not accidental.
                        <br /><br />
                        Most teams begin with a short diagnostic<br className="hidden md:block" />
                        to ensure they are fixing the right problem first.
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                        <a href="#diagnostic-form" className="btn bg-[var(--color-primary)] text-white hover:bg-opacity-90">
                            Start with a Diagnostic
                        </a>
                        <Link to="/problems" className="text-[var(--color-primary)] font-medium hover:underline">
                            Explore common GTM failure patterns →
                        </Link>
                    </div>
                </div>
            </section>

            {/* 3. WHAT THIS IS */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container max-w-4xl">
                    <h2 className="text-sm font-bold uppercase text-gray-400 mb-6 tracking-widest">What the GTM Diagnostic is</h2>
                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="md:w-1/2">
                            <p className="text-lg text-gray-800 leading-relaxed mb-6">
                                The GTM Diagnostic is a short, time-boxed entry engagement.
                            </p>
                            <p className="text-lg text-gray-800 leading-relaxed">
                                It is designed to help leadership teams:
                            </p>
                            <ul className="space-y-3 mt-4">
                                <li className="flex items-start"><span className="text-[var(--color-primary)] mr-3">•</span> understand what is actually limiting growth</li>
                                <li className="flex items-start"><span className="text-[var(--color-primary)] mr-3">•</span> avoid investing further in the wrong fixes</li>
                                <li className="flex items-start"><span className="text-[var(--color-primary)] mr-3">•</span> decide what should change first — and what should not</li>
                            </ul>
                        </div>
                        <div className="md:w-1/2 bg-white p-8 rounded-sm shadow-sm border-l-4 border-[var(--color-primary)]">
                            <p className="text-xl font-medium text-gray-800 leading-relaxed">
                                It is not an audit, and it is not an implementation project.<br />
                                It is a clarity-first starting point.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. WHO THIS START IS FOR */}
            <section className="section">
                <div className="container">
                    <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-12 text-center">Who this starting point is for</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-16 border-t md:border-t-0 border-gray-200">
                        <div className="py-8 border-b md:border-b-0 md:border-r border-gray-200 pr-8">
                            <h3 className="text-xl font-semibold text-gray-900 mb-6">This is a good starting point if:</h3>
                            <ul className="space-y-4">
                                {[
                                    "You are a B2B company with an active sales motion",
                                    "Pipeline, people, and tools already exist",
                                    "Growth feels inconsistent or unpredictable",
                                    "You have tried execution, tooling, or hiring without clear results",
                                    "You want confidence before making the next big bet"
                                ].map(i => (
                                    <li key={i} className="flex items-start text-gray-700">
                                        <span className="text-green-600 mr-3 font-bold">✓</span> {i}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="py-8 pl-0 md:pl-8 bg-gray-50/50 md:bg-transparent -mx-4 px-4 md:mx-0 md:px-0">
                            <h3 className="text-xl font-semibold text-gray-500 mb-6">This is not a fit if:</h3>
                            <ul className="space-y-4">
                                {[
                                    "You are pre-revenue or idea-stage",
                                    "You are looking for tactics, templates, or growth hacks",
                                    "You want outsourced execution without diagnosis",
                                    "You want tool recommendations without system clarity"
                                ].map(i => (
                                    <li key={i} className="flex items-start text-gray-500">
                                        <span className="text-gray-400 mr-3 font-bold">×</span> {i}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. WHAT WE EXAMINE */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container">
                    <h2 className="text-sm font-bold uppercase text-gray-400 mb-4 tracking-widest">What we examine during the diagnostic</h2>
                    <p className="text-2xl font-medium text-[var(--color-primary)] max-w-3xl mb-12">
                        We examine how your go-to-market system actually behaves in practice — not how it is supposed to work on paper.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {[
                            {
                                title: "Demand & Pipeline Reality",
                                bullets: ["How “qualified” is defined vs how deals actually progress", "Where volume hides buyer decision friction"]
                            },
                            {
                                title: "Sales & Deal Dynamics",
                                bullets: ["How buyers make decisions inside active deals", "Where deals slow, stall, or quietly disengage"]
                            },
                            {
                                title: "ICP & Positioning Coherence",
                                bullets: ["Whether you are solving a problem buyers truly own", "Where messaging compensates for misalignment"]
                            },
                            {
                                title: "Operating Rhythm & Governance",
                                bullets: ["How decisions are reviewed and corrected", "Whether metrics drive action or internal debate"]
                            },
                            {
                                title: "Tooling & AI Usage",
                                bullets: ["What tools are amplifying clarity — and what are amplifying noise", "Where automation masks upstream issues"]
                            }
                        ].map((card, i) => (
                            <div key={i} className="bg-white p-8 rounded-sm shadow-sm">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">{card.title}</h3>
                                <ul className="space-y-2">
                                    {card.bullets.map(b => (
                                        <li key={b} className="text-sm text-gray-600 flex items-start">
                                            <span className="mr-2 text-[var(--color-primary)]">•</span> {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <p className="text-xl text-center font-medium text-gray-800 border-t border-gray-200 pt-8 mt-8">
                        We are not auditing effort.<br />
                        We are diagnosing the model behind the effort.
                    </p>
                </div>
            </section>

            {/* 6. WHAT YOU RECEIVE */}
            <section className="section">
                <div className="container">
                    <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-12">What you walk away with</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { title: "Primary GTM Constraint Map", desc: "A clear articulation of the main bottleneck limiting growth." },
                            { title: "Misdiagnosis Breakdown", desc: "What the organization believed the problem was — and why that explanation failed." },
                            { title: "Decision & Signal Clarity", desc: "Which metrics and signals matter, which don’t, and why." },
                            { title: "Change Sequencing View", desc: "What must change first, what can wait, and what will not help yet." },
                            { title: "Executive Readout", desc: "A concise narrative suitable for leadership or board discussion." }
                        ].map((item, i) => (
                            <div key={i} className="border border-gray-200 p-6 rounded-sm hover:border-[var(--color-primary)] transition-colors">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. HOW IT WORKS */}
            <section className="section bg-gray-900 text-white">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-3xl font-semibold mb-8">How this starting engagement works</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-sm font-bold uppercase text-gray-400 mb-2 tracking-widest">Typical shape</h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li>• Duration: ~10–14 days</li>
                                        <li>• Low disruption to operating teams</li>
                                        <li>• Designed to inform next decisions, not lock you into a program</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold uppercase text-gray-400 mb-2 tracking-widest">Flow</h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li>1. Context intake and artifact review</li>
                                        <li>2. Targeted leadership conversations</li>
                                        <li>3. Analysis and synthesis</li>
                                        <li>4. Executive readout with options</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <p className="text-2xl font-medium text-white leading-relaxed border-l-4 border-[var(--color-primary)] pl-6">
                                This engagement exists to prevent expensive mistakes — not to push a predefined solution.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 8. WHAT HAPPENS AFTER & 9. APPROACH */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        {/* After */}
                        <div>
                            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-6">What happens after the diagnostic</h2>
                            <p className="text-lg text-gray-700 mb-4">After the diagnostic, there are three possible outcomes:</p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start"><span className="text-gray-900 font-bold mr-3">1.</span> <span className="text-gray-700">You have clarity and choose to execute internally</span></li>
                                <li className="flex items-start"><span className="text-gray-900 font-bold mr-3">2.</span> <span className="text-gray-700">You engage GTM-360 for deeper system work</span></li>
                                <li className="flex items-start"><span className="text-gray-900 font-bold mr-3">3.</span> <span className="text-gray-700">You decide not to proceed further — with confidence</span></li>
                            </ul>
                            <p className="text-gray-600 italic">The diagnostic is designed to support any of these outcomes.</p>
                        </div>

                        {/* Approach */}
                        <div className="bg-[var(--color-secondary)] p-8 rounded-sm">
                            <h2 className="text-2xl font-semibold text-[var(--color-primary)] mb-6">Our approach</h2>
                            <ul className="space-y-4">
                                {[
                                    "Operator-led, not theory-led",
                                    "Diagnosis before execution",
                                    "Systems over tactics",
                                    "AI and tools treated as amplifiers, not cures"
                                ].map(item => (
                                    <li key={item} className="flex items-center text-gray-800 font-medium">
                                        <div className="w-2 h-2 bg-[var(--color-primary)] rounded-full mr-3"></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 10. CTA + FORM */}
            <section id="diagnostic-form" className="section bg-[var(--color-primary)] text-white">
                <div className="container max-w-4xl">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-semibold text-white mb-4">Start with a Diagnostic</h2>
                        <p className="text-xl text-indigo-100">
                            If this page reflects your situation,<br />
                            a short diagnostic is usually the safest way to decide what to do next.
                        </p>
                    </div>

                    <div className="bg-white text-gray-900 p-8 md:p-12 rounded-sm shadow-xl">
                        <HubSpotDiagnosticForm />
                    </div>
                </div>
            </section>
        </div>
    );
};

// Custom HubSpot Form Component for Diagnostic
const HubSpotDiagnosticForm = () => {
    const PORTAL_ID = '244225374';
    const FORM_ID = 'b631cbcc-1f01-47f9-926c-715a4cb2cd8a'; // Using same endpoint, custom payload
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstname: '',
        company: '',
        role: '', // Mapped to 'company' or 'message' if needed, will append to message
        email: '',
        arrRange: '<$5M',
        primarySymptom: 'Pipeline but no growth',
        tried: '',
        timeline: '' // Optional
    });
    const [status, setStatus] = useState('idle');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('submitting');

        const url = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

        // Construct a detailed message blob since we are using the generic form endpoint
        const detailedMessage = `
[DIAGNOSTIC REQUEST]
Role: ${formData.role}
ARR Range: ${formData.arrRange}
Primary Symptom: ${formData.primarySymptom}
What they tried: ${formData.tried}
Timeline: ${formData.timeline}
        `.trim();

        const context = {
            pageUri: window.location.href,
            pageName: 'Diagnostic Page',
            hutk: getCookie('hubspotutk')
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fields: [
                        { name: 'firstname', value: formData.firstname },
                        { name: 'email', value: formData.email },
                        { name: 'company', value: formData.company }, // Company Property
                        { name: 'message', value: detailedMessage }   // Message Property (Rich Data)
                    ],
                    context: context
                })
            });

            if (response.ok) {
                setStatus('success');
                navigate('/thank-you');
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('HubSpot Error:', error);
            // Fallback for safety
            navigate('/thank-you');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                    <input type="text" name="firstname" required value={formData.firstname} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-sm focus:border-[var(--color-primary)] outline-none" placeholder="First Last" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-sm focus:border-[var(--color-primary)] outline-none" placeholder="name@company.com" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Company</label>
                    <input type="text" name="company" required value={formData.company} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-sm focus:border-[var(--color-primary)] outline-none" placeholder="Company Name" />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Role</label>
                    <input type="text" name="role" required value={formData.role} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-sm focus:border-[var(--color-primary)] outline-none" placeholder="Job Title" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Company ARR Range</label>
                    <select name="arrRange" value={formData.arrRange} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-sm focus:border-[var(--color-primary)] outline-none bg-white">
                        <option value="<$5M">&lt;$5M</option>
                        <option value="$5–20M">$5–20M</option>
                        <option value="$20–50M">$20–50M</option>
                        <option value="$50–100M">$50–100M</option>
                        <option value="$100M+">$100M+</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Primary Symptom</label>
                    <select name="primarySymptom" value={formData.primarySymptom} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-sm focus:border-[var(--color-primary)] outline-none bg-white">
                        <option value="Pipeline but no growth">Pipeline but no growth</option>
                        <option value="Falling win rates">Falling win rates</option>
                        <option value="Long sales cycles">Long sales cycles</option>
                        <option value="Forecasting uncertainty">Forecasting uncertainty</option>
                        <option value="Messaging not landing">Messaging not landing</option>
                        <option value="Tool / AI overload">Tool / AI overload</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">What have you already tried?</label>
                <textarea name="tried" value={formData.tried} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-sm focus:border-[var(--color-primary)] outline-none h-24 resize-none" placeholder="Briefly describe past attempts..."></textarea>
            </div>

            <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Timeline / Urgency (Optional)</label>
                <input type="text" name="timeline" value={formData.timeline} onChange={handleChange} className="w-full border border-gray-300 p-3 rounded-sm focus:border-[var(--color-primary)] outline-none" placeholder="e.g. ASAP, Next Quarter" />
            </div>

            <button type="submit" disabled={status === 'submitting'} className="w-full btn bg-[var(--color-primary)] text-white hover:bg-opacity-90 py-4 text-lg">
                {status === 'submitting' ? 'Submitting...' : 'Request Diagnostic'}
            </button>
        </form>
    );
};

export default Diagnostic;
