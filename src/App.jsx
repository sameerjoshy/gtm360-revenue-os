import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Header from './components/Header';
import Footer from './components/Footer';
import IntelligenceLayer from './components/analytics/IntelligenceLayer';

// Lazy load pages for performance
const NotFound = lazy(() => import('./pages/NotFound'));
const AgentWorkbench = lazy(() => import('./pages/AgentWorkbench'));
const AgentDetail = lazy(() => import('./pages/AgentDetail'));
const ResearcherAgent = lazy(() => import('./pages/ResearcherAgent'));
const SniperQueue = lazy(() => import('./pages/SniperQueue'));
const SalesWarRoom = lazy(() => import('./pages/SalesWarRoom'));
const ExpansionRadar = lazy(() => import('./pages/ExpansionRadar'));
const SystemHealth = lazy(() => import('./pages/SystemHealth'));
const ExecutiveBriefing = lazy(() => import('./pages/ExecutiveBriefing'));
const ListenerFeed = lazy(() => import('./pages/ListenerFeed'));
const AgentAnalytics = lazy(() => import('./pages/AgentAnalytics'));
const SignalConfig = lazy(() => import('./pages/SignalConfig'));
const WorkflowBuilder = lazy(() => import('./pages/WorkflowBuilder'));
const QualifierAgent = lazy(() => import('./pages/QualifierAgent'));
const ChurnPredictor = lazy(() => import('./pages/ChurnPredictor'));
const ProposalBuilder = lazy(() => import('./pages/ProposalBuilder'));
const ForecastAnalyzer = lazy(() => import('./pages/ForecastAnalyzer'));
const SequencerAgent = lazy(() => import('./pages/SequencerAgent'));
const ObjectionHandler = lazy(() => import('./pages/ObjectionHandler'));
const HealthMonitor = lazy(() => import('./pages/HealthMonitor'));
const PipelineAuditor = lazy(() => import('./pages/PipelineAuditor'));
const ContentMultiplier = lazy(() => import('./pages/ContentMultiplier'));

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

// Layouts
import WorkbenchLayout from './components/layouts/WorkbenchLayout';

// Animated Routes Component to handle useLocation
const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

                {/* Redirect Root to Agent Workbench */}
                <Route path="/" element={<Navigate to="/agent-workbench" replace />} />

                {/* App / Workbench Routes */}
                <Route element={<WorkbenchLayout />}>
                    <Route path="/agent-workbench" element={<PageTransition><AgentWorkbench /></PageTransition>} />
                    <Route path="/agents/researcher" element={<PageTransition><ResearcherAgent /></PageTransition>} />
                    <Route path="/agents/sniper" element={<PageTransition><SniperQueue /></PageTransition>} />
                    <Route path="/agents/sales" element={<PageTransition><SalesWarRoom /></PageTransition>} />
                    <Route path="/agents/expansion" element={<PageTransition><ExpansionRadar /></PageTransition>} />
                    <Route path="/agents/revops" element={<PageTransition><SystemHealth /></PageTransition>} />
                    <Route path="/agents/executive" element={<PageTransition><ExecutiveBriefing /></PageTransition>} />
                    <Route path="/agents/listener" element={<PageTransition><ListenerFeed /></PageTransition>} />
                    <Route path="/agents/agent-analytics" element={<PageTransition><AgentAnalytics /></PageTransition>} />
                    <Route path="/agents/signal-config" element={<PageTransition><SignalConfig /></PageTransition>} />
                    <Route path="/agents/workflows" element={<PageTransition><WorkflowBuilder /></PageTransition>} />
                    <Route path="/agents/qualifier" element={<PageTransition><QualifierAgent /></PageTransition>} />
                    <Route path="/agents/churn-predictor" element={<PageTransition><ChurnPredictor /></PageTransition>} />
                    <Route path="/agents/proposal" element={<PageTransition><ProposalBuilder /></PageTransition>} />
                    <Route path="/agents/forecast" element={<PageTransition><ForecastAnalyzer /></PageTransition>} />
                    <Route path="/agents/sequencer" element={<PageTransition><SequencerAgent /></PageTransition>} />
                    <Route path="/agents/objection-handler" element={<PageTransition><ObjectionHandler /></PageTransition>} />
                    <Route path="/agents/health-monitor" element={<PageTransition><HealthMonitor /></PageTransition>} />
                    <Route path="/agents/pipeline-auditor" element={<PageTransition><PipelineAuditor /></PageTransition>} />
                    <Route path="/agents/content-multiplier" element={<PageTransition><ContentMultiplier /></PageTransition>} />
                    <Route path="/agents/:agentId" element={<PageTransition><AgentDetail /></PageTransition>} />
                </Route>

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
            <Suspense fallback={<PageLoader />}>
                <AnimatedRoutes />
            </Suspense>
        </Router>
    );
}

export default App;
