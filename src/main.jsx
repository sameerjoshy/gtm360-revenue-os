import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import ReactGA from 'react-ga4';
import App from './App.jsx';
import './index.css';

// Initialize GA4 with your Measurement ID
const MEASUREMENT_ID = "G-XK9P9Q9R9"; // Placeholder
ReactGA.initialize(MEASUREMENT_ID);

const Root = () => {
    // Track initial page load
    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    }, []);

    return (
        <React.StrictMode>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </React.StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
