// Load all case studies from JSON files
const modules = import.meta.glob('../../src/content/case-studies/*.json', { eager: true });

export const caseStudies = Object.keys(modules).reduce((acc, path) => {
    // Extract slug from filename (e.g., .../scaling-past-series-b-plateau.json -> scaling-past-series-b-plateau)
    const slug = path.split('/').pop().replace('.json', '');
    const data = modules[path].default || modules[path]; // Handle JSON default export behavior

    // Ensure slug in data matches filename (or override)
    acc[slug] = { ...data, slug: `/insights/case-studies/${slug}` };
    return acc;
}, {});
