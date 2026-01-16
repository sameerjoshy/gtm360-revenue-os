import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { insights } from '../../data/insightsData';
import InsightTemplate from '../../components/InsightTemplate';

const InsightPost = () => {
    // In a real app we might grab slug from useParams, but here we can check the URL
    // Actually, since we are registering specific routes or dynamic routes, let's look at the window location or prop
    // Better pattern: dynamic route /insights/:slug

    const { slug } = useParams();

    // The slug from params "more-pipeline-doesnt-fix-growth" needs to be matched
    // My data object keys are the slugs (w/o /insights/ prefix, or with? keys are "more-pipeline...")
    // Wait, in insightsData.js keys are like "more-pipeline-doesnt-fix-growth"

    const insight = insights[slug];

    if (!insight) {
        return <Navigate to="/404" />;
    }

    return <InsightTemplate data={insight} />;
};

export default InsightPost;
