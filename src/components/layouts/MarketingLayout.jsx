
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import PersonalizationBanner from '../marketing/PersonalizationBanner';

const MarketingLayout = () => {
    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white relative">
            <div className="bg-noise"></div>
            <Header />
            <main className="flex-grow pt-36">
                <Outlet />
            </main>
            <PersonalizationBanner />
            <Footer />
        </div>
    );
};

export default MarketingLayout;
