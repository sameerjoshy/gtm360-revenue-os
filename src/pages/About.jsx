import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import founderAbstract from '../assets/founder_abstract.png';
import brandLogos from '../assets/brand_logos.png';

const About = () => {
    return (
        <div className="about-page">
            <SEO
                title="Team & Principals"
                description="We are operators, not consultants. Led by former AWS/Amazon executives, we bring architectural rigor to revenue problems."
                canonical="https://gtm-360.com/about"
            />
            {/* BLOCK 1: WHY EXIST */}
            <section className="section py-24 md:py-32">
                <div className="container max-w-4xl opacity-0 animate-fade-in-up" style={{ animationFillMode: 'forwards' }}>
                    <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-8 text-[var(--color-primary)]">
                        GTM360 was built to solve the gap between strategy and system.
                    </h1>
                    <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                        Most companies have plenty of strategy. What they lack is a reliable operating model to translate that strategy into revenue.
                    </p>
                    <p className="text-xl text-gray-700 leading-relaxed">
                        We are operators, not career consultants. We don’t sell slides. We build the systems that make revenue predictable.
                    </p>
                </div>
            </section>

            {/* BLOCK 2: PERSPECTIVE */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container max-w-4xl text-center">
                    <p className="text-2xl font-medium text-gray-800 leading-normal">
                        "Go-to-market is not a department. It is an operating model."
                    </p>
                </div>
            </section>

            {/* BLOCK 3: FOUNDER */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <div>
                            {/* Founder Image */}
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gray-100 rounded-sm -z-10 transform rotate-2"></div>
                                <img
                                    src={founderAbstract}
                                    alt="Revenue Architecture - Founder Perspective"
                                    className="w-full h-auto rounded-sm shadow-lg grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-sm font-bold uppercase text-gray-400 mb-2 tracking-widest">Founder</h2>
                            <h3 className="text-3xl font-semibold text-[var(--color-primary)] mb-6">Built by operators with 25+ years of scar tissue.</h3>
                            <p className="text-lg text-gray-700 mb-6">
                                Our founder brings deep operational experience from scaling revenue engines at <strong>Pepsi</strong>, <strong>Deloitte</strong>, and <strong>Amazon/AWS</strong>.
                            </p>
                            <p className="text-lg text-gray-700 mb-6">
                                Having sat in the seat, we know that "best practices" often fail in the real world. That’s why we focus on engineering the system, not just training the people.
                            </p>

                            {/* UPDATED LOGOS SECTION */}
                            <div className="mt-8 flex justify-start items-center">
                                <img
                                    src={brandLogos}
                                    alt="Experienced at Amazon, AWS, Deloitte, Pepsi"
                                    className="max-w-full h-auto grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* BLOCK 4: TEAM */}
            <section className="section bg-[var(--color-secondary)]">
                <div className="container">
                    <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-12">The team behind the work</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { role: "Revenue Architecture", desc: "Former CROs and VPs of Sales who understand the pressure of the number." },
                            { role: "Data Strategy", desc: "Engineers who treat your CRM as a product, not a database." },
                            { role: "Change Governance", desc: "Experts in making new habits stick without cultural friction." }
                        ].map((member, i) => (
                            <div key={i} className="bg-white p-8 rounded-sm shadow-sm">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.role}</h3>
                                <p className="text-gray-600">{member.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BLOCK 6: PRINCIPLES (Replaces Ethos) */}
            <section className="section">
                <div className="container">
                    <h2 className="text-3xl font-semibold text-[var(--color-primary)] mb-12 text-center">What we believe</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Clarity first", desc: "We don't automate chaos. We fix the logic before we touch the tech." },
                            { title: "Less, but better", desc: "Most GTM systems are too complex. We remove friction." },
                            { title: "Evidence over opinion", desc: "Decisions should be driven by data, not the loudest voice." },
                            { title: "Transfer ownership", desc: "We build systems you can run. We don't want to live in your org." }
                        ].map((principle, i) => (
                            <div key={i} className="border-t-4 border-[var(--color-primary)] pt-6">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{principle.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{principle.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-[var(--color-primary)] text-white text-center py-24">
                <div className="container max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Work with operators, not observers.</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/contact" className="btn bg-white text-[var(--color-primary)] hover:bg-gray-100">
                            Start a conversation →
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
