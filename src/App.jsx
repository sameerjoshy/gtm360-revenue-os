import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Header from './components/Header';
import Footer from './components/Footer';
import IntelligenceLayer from './components/analytics/IntelligenceLayer';
import PersonalizationBanner from './components/marketing/PersonalizationBanner';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Problems = lazy(() => import('./pages/Problems'));
const ProblemDetail = lazy(() => import('./pages/ProblemDetail'));
const HowWeWork = lazy(() => import('./pages/HowWeWork'));
const Insights = lazy(() => import('./pages/Insights'));
const Partners = lazy(() => import('./pages/Partners'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Diagnostic = lazy(() => import('./pages/Diagnostic'));
const Platform = lazy(() => import('./pages/Platform'));
const Services = lazy(() => import('./pages/Services'));
const GTMOperatingModel = lazy(() => import('./pages/services/GTMOperatingModel'));
const PipelineQuality = lazy(() => import('./pages/services/PipelineQuality'));
const ForecastingGovernance = lazy(() => import('./pages/services/ForecastingGovernance'));
const GTMSignalsAI = lazy(() => import('./pages/services/GTMSignalsAI'));
const InsightPost = lazy(() => import('./pages/insights/InsightPost'));
const CaseStudyPost = lazy(() => import('./pages/insights/CaseStudyPost'));
const ThankYou = lazy(() => import('./pages/ThankYou'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Terms = lazy(() => import('./pages/Terms'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-16 h-16 border-4 border-[var(--color-secondary)] border-t-[var(--color-primary)] rounded-full animate-spin"></div>
    </div>
);

// GA4 Route Tracker
const RouteTracker = () => {
    const location = useLocation();

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: location.pathname });
    }, [location]);

    return null;
};

import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/layout/PageTransition';

// ... existing imports ...

// Animated Routes Component to handle useLocation
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/problems" element={<PageTransition><Problems /></PageTransition>} />
                <Route path="/problems/:slug" element={<PageTransition><ProblemDetail /></PageTransition>} />
                <Route path="/how-we-work" element={<PageTransition><HowWeWork /></PageTransition>} />
                <Route path="/insights" element={<PageTransition><Insights /></PageTransition>} />
                <Route path="/partners" element={<PageTransition><Partners /></PageTransition>} />
                <Route path="/about" element={<PageTransition><About /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
                <Route path="/diagnostic" element={<PageTransition><Diagnostic /></PageTransition>} />
                <Route path="/platform" element={<PageTransition><Platform /></PageTransition>} />
                <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
                <Route path="/services/gtm-operating-model" element={<PageTransition><GTMOperatingModel /></PageTransition>} />
                <Route path="/services/pipeline-quality" element={<PageTransition><PipelineQuality /></PageTransition>} />
                <Route path="/services/forecasting-governance" element={<PageTransition><ForecastingGovernance /></PageTransition>} />
                <Route path="/services/gtm-signals-and-ai" element={<PageTransition><GTMSignalsAI /></PageTransition>} />
                <Route path="/insights/case-studies/:slug" element={<PageTransition><CaseStudyPost /></PageTransition>} />
                <Route path="/insights/:slug" element={<PageTransition><InsightPost /></PageTransition>} />
                <Route path="/thank-you" element={<PageTransition><ThankYou /></PageTransition>} />
                <Route path="/privacy" element={<PageTransition><Privacy /></PageTransition>} />
                <Route path="/terms" element={<PageTransition><Terms /></PageTransition>} />
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
};

function App() {
    return (
        <Router>
            <RouteTracker />
            <IntelligenceLayer />
            <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
                <Header />
                <main className="flex-grow pt-36">
                    <Suspense fallback={<PageLoader />}>
                        <AnimatedRoutes />
                    </Suspense>
                </main>
                <PersonalizationBanner />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
