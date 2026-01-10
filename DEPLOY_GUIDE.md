# Deployment Guide: Cloudflare Pages

Since you already have `gtm-360.com` on Cloudflare, **Cloudflare Pages** is the absolute best hosting choice. It's free, fast (served from the edge), and integrates native DNS setup.

## Option 1: The "Professional" Way (Recommended)
**Connects git to Cloudflare. Updates happen automatically when you push code.**

1.  **Create a GitHub Repository:**
    *   Go to GitHub.com -> New Repository -> Name it `gtm-360`.
    *   Run these commands in your project terminal:
        ```bash
        git add .
        git commit -m "Ready for deploy"
        git branch -M main
        git remote add origin https://github.com/YOUR_USERNAME/gtm-360.git
        git push -u origin main
        ```

2.  **Connect Cloudflare:**
    *   Log into Cloudflare Dashboard.
    *   Go to **Workers & Pages** -> **Create Application** -> **Pages** -> **Connect to Git**.
    *   Select your `gtm-360` repository.

3.  **Build Settings (Cloudflare will likely auto-detect these):**
    *   **Framework Preset:** `Vite`
    *   **Build Command:** `npm run build`
    *   **Build Output Directory:** `dist`
    *   **Save & Deploy**.

4.  **Map Domain:**
    *   Once deployed, go to the project's **Custom Domains** tab.
    *   Add `gtm-360.com`. Cloudflare will automatically configure the DNS records (CNAME) for you since you are already using their DNS.

---

## Option 2: The "Quickest" Way (Direct Upload)
**Upload the build folder manually. Good for a one-off launch.**

1.  **Build Locally:**
    *   Run this in your terminal:
        ```bash
        npm run build
        ```
    *   This creates a `dist` folder in your project directory.

2.  **Upload to Cloudflare:**
    *   Log into Cloudflare Dashboard.
    *   Go to **Workers & Pages** -> **Create Application** -> **Pages**.
    *   Select **"Upload Assets"**.
    *   Drag and drop the `dist` folder you just created.
    *   Click **Deploy**.

3.  **Map Domain:**
    *   Go to **Custom Domains** tab -> Add `gtm-360.com`.

## Note on Routing
I have already added a `public/_redirects` file to the project. This ensures that direct links (like `gtm-360.com/about`) work correctly without giving 404 errors.
