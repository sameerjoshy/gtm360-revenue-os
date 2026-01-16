import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
    return (
        <div className="not-found-page text-center">
            <Helmet>
                <title>404 - Page Not Found | GTM360</title>
            </Helmet>
            <section className="section py-32">
                <div className="container">
                    <h1 className="text-6xl font-bold text-[var(--color-primary)] mb-6">404</h1>
                    <p className="text-2xl text-gray-600 mb-8">This page is off the map.</p>
                    <p className="text-gray-500 mb-12">
                        Maybe you were looking for <Link to="/" className="text-[var(--color-accent)] hover:underline">the homepage</Link>?
                    </p>
                </div>
            </section>
        </div>
    );
};

export default NotFound;
