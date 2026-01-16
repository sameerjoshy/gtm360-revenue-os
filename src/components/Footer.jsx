import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--color-secondary)] py-12 border-t border-gray-200">
            <div className="container flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                    <span className="font-bold text-[var(--color-primary)] text-lg">GTM360</span>
                    <span className="ml-2 text-gray-500 text-sm">— Revenue OS</span>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    <Link to="/problems" className="hover:text-[var(--color-primary)]">Problems We Solve</Link>
                    <Link to="/how-we-work" className="hover:text-[var(--color-primary)]">How We Work</Link>
                    <Link to="/insights" className="hover:text-[var(--color-primary)]">Insights</Link>
                    <Link to="/partners" className="hover:text-[var(--color-primary)]">Partners</Link>
                    <Link to="/about" className="hover:text-[var(--color-primary)]">About</Link>
                    <Link to="/contact" className="hover:text-[var(--color-primary)]">Contact</Link>
                </div>
            </div>
            <div className="container mt-8 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
                <span>© {currentYear} GTM360. All rights reserved.</span>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <Link to="/privacy" className="hover:text-gray-600">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-gray-600">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
