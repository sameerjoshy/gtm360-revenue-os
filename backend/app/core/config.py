import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "GTM360 Revenue OS"
    API_V1_STR: str = "/api/v1"
    
    # Supabase
    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str  # Changed from SUPABASE_KEY
    DEFAULT_WORKSPACE_ID: str = "00000000-0000-0000-0000-000000000001"
    
    # LLM Provider (Default to Gemini as discussed)
    GOOGLE_API_KEY: str | None = None
    OPENAI_API_KEY: str | None = None

    # Services
    HUBSPOT_ACCESS_TOKEN: str | None = None
    TAVILY_API_KEY: str | None = None
    
    class Config:
        env_file = ".env"

settings = Settings()
