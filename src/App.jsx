import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
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
const Diagnostic = lazy(() => import('./pages/Diagnostic'));
const Services = lazy(() => import('./pages/Services'));
const GTMOperatingModel = lazy(() => import('./pages/services/GTMOperatingModel'));
const PipelineQuality = lazy(() => import('./pages/services/PipelineQuality'));
const ForecastingGovernance = lazy(() => import('./pages/services/ForecastingGovernance'));
const GTMSignalsAI = lazy(() => import('./pages/services/GTMSignalsAI'));
const InsightPost = lazy(() => import('./pages/insights/InsightPost'));
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

function App() {
    return (
        <Router>
            <RouteTracker />
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
                            <Route path="/diagnostic" element={<Diagnostic />} />
                            <Route path="/services" element={<Services />} />
                            <Route path="/services/gtm-operating-model" element={<GTMOperatingModel />} />
                            <Route path="/services/pipeline-quality" element={<PipelineQuality />} />
                            <Route path="/services/forecasting-governance" element={<ForecastingGovernance />} />
                            <Route path="/services/gtm-signals-and-ai" element={<GTMSignalsAI />} />
                            <Route path="/insights" element={<Insights />} />
                            <Route path="/insights/:slug" element={<InsightPost />} />
                            <Route path="/thank-you" element={<ThankYou />} />
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
