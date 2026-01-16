import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Problems = lazy(() => import('./pages/Problems'));
const HowWeWork = lazy(() => import('./pages/HowWeWork'));
const Insights = lazy(() => import('./pages/Insights'));
const Partners = lazy(() => import('./pages/Partners'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-[var(--color-secondary)] border-t-[var(--color-primary)] rounded-full animate-spin"></div>
    </div>
);

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
                <Header />
                <main className="flex-grow pt-36"> {/* Adjust for fixed header height */}
                    <Suspense fallback={<PageLoader />}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/problems" element={<Problems />} />
                            <Route path="/how-we-work" element={<HowWeWork />} />
                            <Route path="/insights" element={<Insights />} />
                            <Route path="/partners" element={<Partners />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/privacy" element={<Privacy />} />
                            <Route path="/terms" element={<Terms />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
