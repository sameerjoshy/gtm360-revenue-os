#!/usr/bin/env node
/**
 * QA SEO Audit for GTM-360
 * Verifies SEO meta tags, Open Graph tags, and best practices
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const results = {
    totalPages: 0,
    pagesWithIssues: 0,
    issues: [],
    summary: {
        missingTitle: 0,
        missingDescription: 0,
        missingOgTags: 0,
        missingTwitterCard: 0,
        missingCanonical: 0,
        titleTooLong: 0,
        descriptionTooLong: 0
    }
};

// Get all HTML files recursively
function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getHtmlFiles(filePath, fileList);
        } else if (file.endsWith('.html')) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

// Extract meta tag content
function extractMetaTag(html, name) {
    const patterns = [
        new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']+)["']`, 'i'),
        new RegExp(`<meta\\s+content=["']([^"']+)["']\\s+name=["']${name}["']`, 'i'),
        new RegExp(`<meta\\s+property=["']${name}["']\\s+content=["']([^"']+)["']`, 'i'),
        new RegExp(`<meta\\s+content=["']([^"']+)["']\\s+property=["']${name}["']`, 'i')
    ];

    for (const pattern of patterns) {
        const match = html.match(pattern);
        if (match) return match[1];
    }

    return null;
}

// Extract title
function extractTitle(html) {
    const match = html.match(/<title>([^<]+)<\/title>/i);
    return match ? match[1] : null;
}

// Extract canonical URL
function extractCanonical(html) {
    const match = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
    return match ? match[1] : null;
}

// Audit a single page
function auditPage(filePath) {
    const relativePath = path.relative(distDir, filePath);
    const html = fs.readFileSync(filePath, 'utf-8');

    const pageIssues = [];

    // Check title
    const title = extractTitle(html);
    if (!title) {
        pageIssues.push({ severity: 'high', issue: 'Missing <title> tag' });
        results.summary.missingTitle++;
    } else if (title.length > 60) {
        pageIssues.push({ severity: 'medium', issue: `Title too long (${title.length} chars, recommended: <60)`, value: title });
        results.summary.titleTooLong++;
    }

    // Check meta description
    const description = extractMetaTag(html, 'description');
    if (!description) {
        pageIssues.push({ severity: 'high', issue: 'Missing meta description' });
        results.summary.missingDescription++;
    } else if (description.length > 160) {
        pageIssues.push({ severity: 'medium', issue: `Description too long (${description.length} chars, recommended: <160)` });
        results.summary.descriptionTooLong++;
    }

    // Check Open Graph tags
    const ogTitle = extractMetaTag(html, 'og:title');
    const ogDescription = extractMetaTag(html, 'og:description');
    const ogUrl = extractMetaTag(html, 'og:url');
    const ogType = extractMetaTag(html, 'og:type');

    if (!ogTitle || !ogDescription || !ogUrl || !ogType) {
        const missing = [];
        if (!ogTitle) missing.push('og:title');
        if (!ogDescription) missing.push('og:description');
        if (!ogUrl) missing.push('og:url');
        if (!ogType) missing.push('og:type');
        pageIssues.push({ severity: 'medium', issue: `Missing Open Graph tags: ${missing.join(', ')}` });
        results.summary.missingOgTags++;
    }

    // Check Twitter Card tags
    const twitterCard = extractMetaTag(html, 'twitter:card');
    const twitterTitle = extractMetaTag(html, 'twitter:title');
    const twitterDescription = extractMetaTag(html, 'twitter:description');

    if (!twitterCard || !twitterTitle || !twitterDescription) {
        const missing = [];
        if (!twitterCard) missing.push('twitter:card');
        if (!twitterTitle) missing.push('twitter:title');
        if (!twitterDescription) missing.push('twitter:description');
        pageIssues.push({ severity: 'low', issue: `Missing Twitter Card tags: ${missing.join(', ')}` });
        results.summary.missingTwitterCard++;
    }

    // Check canonical URL
    const canonical = extractCanonical(html);
    if (!canonical) {
        pageIssues.push({ severity: 'medium', issue: 'Missing canonical URL' });
        results.summary.missingCanonical++;
    }

    if (pageIssues.length > 0) {
        results.pagesWithIssues++;
        results.issues.push({
            page: relativePath,
            url: relativePath.replace(/index\.html$/, '').replace(/\.html$/, ''),
            title: title || 'N/A',
            issueCount: pageIssues.length,
            issues: pageIssues
        });
    }

    return {
        page: relativePath,
        title,
        description,
        hasIssues: pageIssues.length > 0,
        issueCount: pageIssues.length
    };
}

// Main execution
console.log('🔍 GTM-360 SEO Audit\n');
console.log(`Scanning directory: ${distDir}\n`);

try {
    const htmlFiles = getHtmlFiles(distDir);
    results.totalPages = htmlFiles.length;

    console.log(`Found ${htmlFiles.length} HTML pages\n`);
    console.log('Auditing pages...\n');

    htmlFiles.forEach(filePath => {
        auditPage(filePath);
    });

    // Print results
    console.log('═══════════════════════════════════════════════════════');
    console.log('                    RESULTS SUMMARY                    ');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log(`📄 Total Pages Audited: ${results.totalPages}`);
    console.log(`✅ Pages Without Issues: ${results.totalPages - results.pagesWithIssues}`);
    console.log(`⚠️  Pages With Issues: ${results.pagesWithIssues}\n`);

    console.log('Issue Breakdown:');
    console.log(`  - Missing Title: ${results.summary.missingTitle}`);
    console.log(`  - Missing Description: ${results.summary.missingDescription}`);
    console.log(`  - Missing Open Graph Tags: ${results.summary.missingOgTags}`);
    console.log(`  - Missing Twitter Card: ${results.summary.missingTwitterCard}`);
    console.log(`  - Missing Canonical URL: ${results.summary.missingCanonical}`);
    console.log(`  - Title Too Long: ${results.summary.titleTooLong}`);
    console.log(`  - Description Too Long: ${results.summary.descriptionTooLong}\n`);

    if (results.pagesWithIssues > 0) {
        console.log('═══════════════════════════════════════════════════════');
        console.log('                   DETAILED ISSUES                     ');
        console.log('═══════════════════════════════════════════════════════\n');

        results.issues.forEach((page, index) => {
            console.log(`${index + 1}. ${page.url || page.page}`);
            console.log(`   Title: ${page.title}`);
            console.log(`   Issues (${page.issueCount}):`);
            page.issues.forEach(issue => {
                const icon = issue.severity === 'high' ? '❌' : issue.severity === 'medium' ? '⚠️' : 'ℹ️';
                console.log(`     ${icon} [${issue.severity.toUpperCase()}] ${issue.issue}`);
            });
            console.log('');
        });
    }

    // Save detailed report
    const reportPath = path.join(__dirname, 'qa_seo_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`📄 Detailed report saved to: qa_seo_report.json\n`);

    // Exit with warning if issues found
    if (results.pagesWithIssues > 0) {
        console.log('⚠️  SEO issues detected. Review the report for details.\n');
        process.exit(0); // Don't fail build, just warn
    } else {
        console.log('✅ All pages pass SEO audit!\n');
        process.exit(0);
    }

} catch (error) {
    console.error('❌ Error during SEO audit:', error.message);
    process.exit(1);
}
