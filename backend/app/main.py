from fastapi import FastAPI
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# --- CORS Configuration (Critical for UI) ---
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://82a37dbe.gtm-360.pages.dev"
    ], # In production, set to specific domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "GTM360 Revenue OS - Autonomous Core Online", "version": "0.1.0"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "backend"}

from app.api.routes import router as research_router

app.include_router(research_router, prefix=f"{settings.API_V1_STR}/research", tags=["research"])

