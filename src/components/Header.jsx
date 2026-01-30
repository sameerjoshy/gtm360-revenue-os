import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { ExternalLink, Bell } from 'lucide-react';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white border-b border-gray-100 h-16">
            <div className="container h-full flex justify-between items-center px-4 md:px-6">
                {/* Logo Area */}
                <Link to="/agent-workbench" className="flex items-center gap-3">
                    <img src={logo} alt="GTM 360" className="h-8 md:h-10" />
                    <span className="font-bold text-slate-900 tracking-tight text-lg hidden md:block">Revenue OS</span>
                </Link>

                {/* Right Actions */}
                <div className="flex items-center gap-6">
                    <a
                        href="https://gtm-360.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-slate-500 hover:text-indigo-600 flex items-center gap-2 transition-colors"
                    >
                        Back to Website <ExternalLink size={14} />
                    </a>

                    <button className="text-slate-400 hover:text-slate-600 relative">
                        <Bell size={20} />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                    </button>

                    <div className="h-9 w-9 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 flex items-center justify-center font-bold text-sm">
                        JS
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
