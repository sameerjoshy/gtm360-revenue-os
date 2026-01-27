# GTM360 Deployment Guide

This repository contains two parts:
1.  **Backend**: Python FastAPI (Folder: `/backend`)
2.  **Frontend**: React + Vite (Root folder)

## 1. Deploying the Backend (Brain)
We recommend **Render** or **Railway** for the backend (Python support).

### Steps (Render.com)
1.  Push this code to GitHub.
2.  Create a "Web Service" in Render.
3.  **Root Directory**: `backend`
4.  **Build Command**: `pip install -r requirements.txt`
5.  **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
6.  **Environment Variables**:
    *   `GOOGLE_API_KEY`: (Your Gemini Key)
    *   `TAVILY_API_KEY`: (Your Tavily Key)
    *   `HUBSPOT_ACCESS_TOKEN`: (Your HubSpot Key)
    *   `PYTHON_VERSION`: `3.11.0` (Recommended)

## 2. Deploying the Frontend (Workbench)
We recommend **Cloudflare Pages** or **Vercel**.

### Steps (Cloudflare Pages)
1.  Connect your GitHub repo.
2.  **Build Command**: `npm run build`
3.  **Output Directory**: `dist`
4.  **Environment Variables**:
    *   `VITE_API_URL`: The URL of your deployed Backend (e.g., `https://gtm360-backend.onrender.com/api/v1`)
    
## 3. Important: CORS Configuration
Once deployed, you must update `backend/app/main.py`.
Change:
```python
allow_origins=["*"] 
```
To:
```python
allow_origins=["https://your-frontend-domain.pages.dev"]
```
This ensures only YOUR frontend can talk to the Agent.

## 4. Live Deployment Details
*   **Backend URL**: `https://gtm360-revenue-os.onrender.com`
*   **Frontend URL**: `https://82a37dbe.gtm-360.pages.dev`
