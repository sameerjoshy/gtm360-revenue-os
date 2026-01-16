import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Problems from './pages/Problems';
import HowWeWork from './pages/HowWeWork';
import Insights from './pages/Insights';
import Partners from './pages/Partners';
import About from './pages/About';
import Contact from './pages/Contact';

import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
                <Header />
                <main className="flex-grow pt-36"> {/* Adjust for fixed header height */}
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
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
