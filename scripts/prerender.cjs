
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROUTES = [
    '/',
    '/tools',
    '/insights',
    '/services',
    '/services/gtm-operating-model',
    '/services/pipeline-quality',
    '/services/forecasting-governance',
    '/services/gtm-signals-and-ai',
    '/diagnostic',
    '/problems',
    '/how-we-work',
    '/partners',
    '/about',
    '/contact',
    '/insights/more-pipeline-doesnt-fix-growth',
    '/insights/win-rate-is-not-a-sales-problem',
    '/insights/case-studies/fixing-the-wrong-problem',
    '/insights/case-studies/when-ai-created-noise-not-clarity',
    '/agent-workbench',
    '/agents/researcher',
    '/agents/sniper',
    '/agents/sales',
    '/agents/expansion',
    '/agents/revops',
    '/agents/executive',
    '/agents/listener',
    '/agents/agent-analytics',
    '/agents/signal-config',
    '/agents/workflows',
    '/agents/qualifier',
    '/agents/churn-predictor',
    '/agents/proposal',
    '/agents/forecast',
    '/agents/sequencer',
    '/agents/objection-handler',
    '/agents/health-monitor',
    '/agents/pipeline-auditor',
    '/agents/content-multiplier'
];

const PORT = 4173; // Vite preview port
const BASE_URL = `http://localhost:${PORT}`;
const DIST_DIR = path.join(__dirname, '../dist');

async function main() {
    console.log('🚀 Starting pre-rendering process...');

    // 1. Start static server
    console.log('📦 Starting preview server...');
    const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const server = spawn(npmCmd, ['run', 'preview', '--', '--port', PORT], {
        cwd: path.join(__dirname, '..'),
        stdio: 'pipe',
        shell: true
    });

    // Wait for server to start
    await new Promise(resolve => setTimeout(resolve, 3000));

    // 2. Launch Browser
    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        for (const route of ROUTES) {
            const url = `${BASE_URL}${route}`;
            const outDir = path.join(DIST_DIR, route);
            const outFile = path.join(outDir, 'index.html');

            console.log(`📸 Prerendering: ${route}...`);

            const page = await browser.newPage();

            // Navigate
            await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

            // Wait for custom event (dispatched in main.jsx)
            try {
                await page.evaluate(() => {
                    return new Promise((resolve) => {
                        // Check if already fired? Hard to know. 
                        // Simpler: Wait for selector that proves content exists
                        // or wait for the event listener. 

                        // We added dispatchEvent in main.jsx.
                        document.addEventListener('custom-render-trigger', resolve, { once: true });

                        // Fallback: If it already happened before we added listener?
                        setTimeout(resolve, 3000);
                    });
                });
            } catch (e) {
                console.warn(`⚠️ Warning: Timeout waiting for trigger on ${route}. Snapshoting anyway.`);
            }

            // Ensure directory exists
            if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir, { recursive: true });
            }

            // Capture HTML
            let html = await page.content();

            // Post-process: Fix asset paths if needed (Vite preview usually handles valid paths)
            // But we need to make sure we don't break hydration.
            // Replace absolute localhost links if any? Usually not.

            // Write file
            fs.writeFileSync(outFile, html);
            console.log(`✅ Saved: ${outFile}`);

            await page.close();
        }
    } catch (error) {
        console.error('❌ Error during pre-rendering:', error);
    } finally {
        await browser.close();
        server.kill();
        process.exit(0);
    }
}

main();
