#!/usr/bin/env node
/**
 * QA Link Checker for GTM-360
 * Crawls all HTML files in dist folder and verifies internal links
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const results = {
    totalPages: 0,
    totalLinks: 0,
    brokenLinks: [],
    validLinks: 0,
    externalLinks: [],
    warnings: []
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

// Extract links from HTML content
function extractLinks(htmlContent, filePath) {
    const links = [];
    const hrefRegex = /href=["']([^"']+)["']/g;
    let match;

    while ((match = hrefRegex.exec(htmlContent)) !== null) {
        links.push({
            url: match[1],
            sourceFile: filePath
        });
    }

    return links;
}

// Check if a link is valid
function checkLink(link, distDir) {
    const url = link.url;

    // Skip external links, anchors, and special protocols
    if (url.startsWith('http://') || url.startsWith('https://') ||
        url.startsWith('mailto:') || url.startsWith('tel:') ||
        url.startsWith('javascript:') || url === '#') {
        if (url.startsWith('http://') || url.startsWith('https://')) {
            results.externalLinks.push(link);
        }
        return { valid: true, type: 'external' };
    }

    // Handle anchor links
    if (url.startsWith('#')) {
        return { valid: true, type: 'anchor' };
    }

    // Clean the URL
    let cleanUrl = url.split('#')[0].split('?')[0];

    // Handle root-relative URLs
    if (cleanUrl.startsWith('/')) {
        cleanUrl = cleanUrl.substring(1);
    }

    // If empty after cleaning, it's the current page
    if (!cleanUrl) {
        return { valid: true, type: 'self' };
    }

    // Check if it's a directory (should have index.html)
    let targetPath = path.join(distDir, cleanUrl);

    // Try as-is first
    if (fs.existsSync(targetPath)) {
        const stat = fs.statSync(targetPath);
        if (stat.isDirectory()) {
            targetPath = path.join(targetPath, 'index.html');
        }
    } else {
        // Try adding index.html
        targetPath = path.join(distDir, cleanUrl, 'index.html');
    }

    const exists = fs.existsSync(targetPath);

    return {
        valid: exists,
        type: 'internal',
        targetPath: targetPath,
        cleanUrl: cleanUrl
    };
}

// Main execution
console.log('🔍 GTM-360 Link Integrity Checker\n');
console.log(`Scanning directory: ${distDir}\n`);

try {
    const htmlFiles = getHtmlFiles(distDir);
    results.totalPages = htmlFiles.length;

    console.log(`Found ${htmlFiles.length} HTML pages\n`);

    htmlFiles.forEach(filePath => {
        const relativePath = path.relative(distDir, filePath);
        const htmlContent = fs.readFileSync(filePath, 'utf-8');
        const links = extractLinks(htmlContent, relativePath);

        links.forEach(link => {
            results.totalLinks++;
            const check = checkLink(link, distDir);

            if (check.type === 'internal') {
                if (check.valid) {
                    results.validLinks++;
                } else {
                    results.brokenLinks.push({
                        ...link,
                        targetPath: check.targetPath,
                        cleanUrl: check.cleanUrl
                    });
                }
            }
        });
    });

    // Print results
    console.log('═══════════════════════════════════════════════════════');
    console.log('                    RESULTS SUMMARY                    ');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log(`✅ Total Pages Scanned: ${results.totalPages}`);
    console.log(`🔗 Total Links Found: ${results.totalLinks}`);
    console.log(`✓  Valid Internal Links: ${results.validLinks}`);
    console.log(`🌐 External Links: ${results.externalLinks.length}`);
    console.log(`❌ Broken Links: ${results.brokenLinks.length}\n`);

    if (results.brokenLinks.length > 0) {
        console.log('═══════════════════════════════════════════════════════');
        console.log('                   BROKEN LINKS                        ');
        console.log('═══════════════════════════════════════════════════════\n');

        results.brokenLinks.forEach((link, index) => {
            console.log(`${index + 1}. ${link.url}`);
            console.log(`   Source: ${link.sourceFile}`);
            console.log(`   Expected: ${link.targetPath}`);
            console.log('');
        });
    }

    // Save detailed report
    const reportPath = path.join(__dirname, 'qa_link_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`📄 Detailed report saved to: qa_link_report.json\n`);

    // Exit with error code if broken links found
    if (results.brokenLinks.length > 0) {
        console.log('⚠️  WARNING: Broken links detected!\n');
        process.exit(1);
    } else {
        console.log('✅ All internal links are valid!\n');
        process.exit(0);
    }

} catch (error) {
    console.error('❌ Error during link checking:', error.message);
    process.exit(1);
}
