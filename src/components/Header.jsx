import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { title: 'Problems', path: '/problems' },
        { title: 'Diagnostic', path: '/diagnostic' },
        { title: 'Services', path: '/services' },
        { title: 'Insights', path: '/insights' },
        { title: 'About', path: '/about' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-2' : 'bg-white py-2'
                }`}
        >
            <div className="container flex justify-between items-center">
                {/* Left Group: Logo + Desktop Nav */}
                <div className="flex items-center gap-12">
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="GTM 360" className={`transition-all duration-300 ${isScrolled ? 'h-14 md:h-20' : 'h-16 md:h-28'}`} />
                    </Link>

                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.title}
                                to={link.path}
                                className="text-sm font-medium text-gray-700 hover:text-[var(--color-primary)] transition-colors"
                            >
                                {link.title}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Right Group: CTA */}
                <div className="hidden md:block">
                    <Link
                        to="/diagnostic"
                        className="text-sm font-medium text-[var(--color-primary)] border border-[var(--color-primary)] px-6 py-3 rounded hover:bg-[var(--color-primary)] hover:text-white transition-colors"
                    >
                        Run a Diagnostic
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 px-6 flex flex-col space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.title}
                            to={link.path}
                            className="text-base font-medium text-gray-800 py-2 border-b border-gray-50"
                        >
                            {link.title}
                        </Link>
                    ))}
                    <Link
                        to="/diagnostic"
                        className="text-base font-medium text-[var(--color-primary)] py-2"
                    >
                        Run a Diagnostic
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Header;
