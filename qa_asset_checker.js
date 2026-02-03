#!/usr/bin/env node
/**
 * QA Asset Checker for GTM-360
 * Verifies all asset references (images, fonts, etc.) in HTML and CSS files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.join(__dirname, 'dist');
const results = {
    totalFiles: 0,
    totalAssetReferences: 0,
    missingAssets: [],
    validAssets: 0,
    assetTypes: {}
};

// Get all files recursively
function getAllFiles(dir, fileList = [], extensions = ['.html', '.css']) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getAllFiles(filePath, fileList, extensions);
        } else if (extensions.some(ext => file.endsWith(ext))) {
            fileList.push(filePath);
        }
    });

    return fileList;
}

// Extract asset references from content
function extractAssets(content, filePath, fileType) {
    const assets = [];

    if (fileType === 'html') {
        // Extract img src
        const imgRegex = /src=["']([^"']+\.(png|jpg|jpeg|gif|svg|webp|ico))["']/gi;
        let match;
        while ((match = imgRegex.exec(content)) !== null) {
            assets.push({ url: match[1], type: 'image', sourceFile: filePath });
        }

        // Extract link href for stylesheets and icons
        const linkRegex = /href=["']([^"']+\.(css|png|jpg|jpeg|gif|svg|webp|ico))["']/gi;
        while ((match = linkRegex.exec(content)) !== null) {
            const ext = match[2].toLowerCase();
            const type = ext === 'css' ? 'stylesheet' : 'image';
            assets.push({ url: match[1], type, sourceFile: filePath });
        }

        // Extract background images from inline styles
        const bgRegex = /background(?:-image)?:\s*url\(['"]?([^'")\s]+)['"]?\)/gi;
        while ((match = bgRegex.exec(content)) !== null) {
            assets.push({ url: match[1], type: 'background', sourceFile: filePath });
        }
    } else if (fileType === 'css') {
        // Extract url() references
        const urlRegex = /url\(['"]?([^'")\s]+)['"]?\)/gi;
        let match;
        while ((match = urlRegex.exec(content)) !== null) {
            const url = match[1];
            const ext = path.extname(url).toLowerCase();
            let type = 'other';
            if (['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp'].includes(ext)) {
                type = 'image';
            } else if (['.woff', '.woff2', '.ttf', '.eot'].includes(ext)) {
                type = 'font';
            }
            assets.push({ url, type, sourceFile: filePath });
        }
    }

    return assets;
}

// Check if asset exists
function checkAsset(asset, distDir, sourceFile) {
    let url = asset.url;

    // Skip external URLs and data URIs
    if (url.startsWith('http://') || url.startsWith('https://') ||
        url.startsWith('data:') || url.startsWith('//')) {
        return { valid: true, type: 'external' };
    }

    // Clean the URL
    url = url.split('?')[0].split('#')[0];

    // Handle root-relative URLs
    if (url.startsWith('/')) {
        url = url.substring(1);
    }

    // Resolve relative URLs
    const sourceDir = path.dirname(sourceFile);
    let assetPath;

    if (url.startsWith('/') || path.isAbsolute(url)) {
        assetPath = path.join(distDir, url);
    } else {
        assetPath = path.resolve(sourceDir, url);
    }

    const exists = fs.existsSync(assetPath);

    return {
        valid: exists,
        type: 'local',
        assetPath,
        url
    };
}

// Main execution
console.log('🖼️  GTM-360 Asset Integrity Checker\n');
console.log(`Scanning directory: ${distDir}\n`);

try {
    const files = getAllFiles(distDir);
    results.totalFiles = files.length;

    console.log(`Found ${files.length} HTML/CSS files\n`);

    files.forEach(filePath => {
        const relativePath = path.relative(distDir, filePath);
        const content = fs.readFileSync(filePath, 'utf-8');
        const fileType = path.extname(filePath).substring(1);
        const assets = extractAssets(content, filePath, fileType);

        assets.forEach(asset => {
            results.totalAssetReferences++;

            // Track asset types
            if (!results.assetTypes[asset.type]) {
                results.assetTypes[asset.type] = 0;
            }
            results.assetTypes[asset.type]++;

            const check = checkAsset(asset, distDir, filePath);

            if (check.type === 'local') {
                if (check.valid) {
                    results.validAssets++;
                } else {
                    results.missingAssets.push({
                        ...asset,
                        assetPath: check.assetPath,
                        sourceFile: path.relative(distDir, asset.sourceFile)
                    });
                }
            }
        });
    });

    // Print results
    console.log('═══════════════════════════════════════════════════════');
    console.log('                    RESULTS SUMMARY                    ');
    console.log('═══════════════════════════════════════════════════════\n');

    console.log(`📄 Total Files Scanned: ${results.totalFiles}`);
    console.log(`🔗 Total Asset References: ${results.totalAssetReferences}`);
    console.log(`✓  Valid Local Assets: ${results.validAssets}`);
    console.log(`❌ Missing Assets: ${results.missingAssets.length}\n`);

    console.log('Asset Types:');
    Object.entries(results.assetTypes).forEach(([type, count]) => {
        console.log(`  - ${type}: ${count}`);
    });
    console.log('');

    if (results.missingAssets.length > 0) {
        console.log('═══════════════════════════════════════════════════════');
        console.log('                   MISSING ASSETS                      ');
        console.log('═══════════════════════════════════════════════════════\n');

        results.missingAssets.forEach((asset, index) => {
            console.log(`${index + 1}. ${asset.url}`);
            console.log(`   Type: ${asset.type}`);
            console.log(`   Source: ${asset.sourceFile}`);
            console.log(`   Expected: ${asset.assetPath}`);
            console.log('');
        });
    }

    // Save detailed report
    const reportPath = path.join(__dirname, 'qa_asset_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    console.log(`📄 Detailed report saved to: qa_asset_report.json\n`);

    // Exit with error code if missing assets found
    if (results.missingAssets.length > 0) {
        console.log('⚠️  WARNING: Missing assets detected!\n');
        process.exit(1);
    } else {
        console.log('✅ All local assets are valid!\n');
        process.exit(0);
    }

} catch (error) {
    console.error('❌ Error during asset checking:', error.message);
    process.exit(1);
}
