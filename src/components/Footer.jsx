import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-slate-200 py-6 mt-auto">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
                <p>
                    &copy; {currentYear} GTM-360 Intelligence. Revenue OS Platform v1.0
                </p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-slate-700 transition-colors">System Status</a>
                    <a href="#" className="hover:text-slate-700 transition-colors">Support</a>
                    <a href="#" className="hover:text-slate-700 transition-colors">API Docs</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
