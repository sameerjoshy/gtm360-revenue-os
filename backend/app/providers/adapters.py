import os
import httpx
import json
from typing import List, Dict, Any, Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

from .interfaces import LLMProvider, SearchProvider, CRMClient, StorageProvider

# --- Gemini Adapter ---
class GeminiAdapter(LLMProvider):
    def __init__(self):
        api_key = os.getenv("GOOGLE_API_KEY")
        if not api_key:
            raise ValueError("GOOGLE_API_KEY is not set")
        
        # Use 1.5 Flash for speed/cost (as per spec)
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-1.5-flash",
            temperature=0.0,
            convert_system_message_to_human=True
        )

    async def generate_json(self, prompt: str, schema: Dict[str, Any], system_prompt: str = "") -> Dict[str, Any]:
        # Note: In a real prod implementation, we would use strict structured output mode.
        # For v1 with LangChain, we rely on prompting + JSON mode.
        messages = [
            ("system", f"{system_prompt}\nYou must output strictly valid JSON matching this schema: {json.dumps(schema)}"),
            ("human", prompt)
        ]
        chain = ChatPromptTemplate.from_messages(messages) | self.llm | JsonOutputParser()
        return await chain.ainvoke({})

    async def generate_text(self, prompt: str, system_prompt: str = "") -> str:
        messages = [
            ("system", system_prompt),
            ("human", prompt)
        ]
        chain = ChatPromptTemplate.from_messages(messages) | self.llm
        result = await chain.ainvoke({})
        return result.content

# --- Tavily Adapter ---
class TavilyAdapter(SearchProvider):
    def __init__(self):
        self.api_key = os.getenv("TAVILY_API_KEY")
        self.base_url = "https://api.tavily.com/search"

    async def search(self, query: str, max_results: int = 5) -> List[Dict[str, Any]]:
        if not self.api_key:
            # Mock Fallback for dev if no key
            print("WARNING: No TAVILY_API_KEY. Returning mock data.")
            return [{"url": "https://example.com", "title": "Mock Result", "content": "This is a mock search result."}]

        async with httpx.AsyncClient() as client:
            resp = await client.post(
                self.base_url,
                json={
                    "api_key": self.api_key,
                    "query": query,
                    "search_depth": "basic", # Free tier friendly
                    "max_results": max_results
                }
            )
            resp.raise_for_status()
            data = resp.json()
            return data.get("results", [])

# --- HubSpot Adapter ---
class HubSpotAdapter(CRMClient):
    def __init__(self):
        self.access_token = os.getenv("HUBSPOT_ACCESS_TOKEN")
        self.base_url = "https://api.hubapi.com/crm/v3/objects/companies"
        self.headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }

    async def read_company(self, record_id: str) -> Dict[str, Any]:
        if not self.access_token: 
             return {"id": record_id, "properties": {"name": "Mock Company"}}

        async with httpx.AsyncClient() as client:
            resp = await client.get(
                f"{self.base_url}/{record_id}", 
                headers=self.headers,
                params={"properties": ["name", "domain", "industry", "lifecycle_stage"]}
            )
            resp.raise_for_status()
            return resp.json()

    async def search_company(self, domain: str) -> Optional[Dict[str, Any]]:
        # This requires the 'companies.search' scope and endpoint
        if not self.access_token: return None
        
        search_url = "https://api.hubapi.com/crm/v3/objects/companies/search"
        payload = {
            "filterGroups": [{
                "filters": [{
                    "propertyName": "domain",
                    "operator": "EQ",
                    "value": domain
                }]
            }]
        }
        async with httpx.AsyncClient() as client:
            resp = await client.post(search_url, headers=self.headers, json=payload)
            if resp.status_code == 200:
                results = resp.json().get("results")
                if results: return results[0]
        return None

    async def write_properties(self, record_id: str, properties: Dict[str, Any]) -> bool:
        if not self.access_token:
            print(f"MOCK WRITE to {record_id}: {properties}")
            return True

        async with httpx.AsyncClient() as client:
            resp = await client.patch(
                f"{self.base_url}/{record_id}",
                headers=self.headers,
                json={"properties": properties}
            )
            return resp.status_code == 200

# --- Supabase Adapter ---
from supabase import create_client, Client

class SupabaseAdapter(StorageProvider):
    def __init__(self):
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_KEY")
        if not url or not key:
            print("WARNING: SUPABASE_URL or SUPABASE_KEY missing")
            self.client = None
        else:
            self.client: Client = create_client(url, key)

    async def fetch_dossier(self, domain: str) -> Optional[Dict[str, Any]]:
        if not self.client: return None
        try:
            # Look for latest dossier for this domain
            response = self.client.table("account_dossiers")\
                .select("dossier_json")\
                .eq("domain", domain)\
                .order("created_at", desc=True)\
                .limit(1)\
                .execute()
            
            if response.data and len(response.data) > 0:
                return response.data[0]["dossier_json"]
            return None
        except Exception as e:
            print(f"Supabase Error (fetch_dossier): {e}")
            return None

    async def fetch_drafts(self, status: str = "NEEDS_REVIEW") -> List[Dict[str, Any]]:
        if not self.client: return []
        try:
            response = self.client.table("sniper_drafts")\
                .select("draft_json, status, draft_id")\
                .eq("status", status)\
                .execute()
            
            # Enrich the JSON with the top-level status/id if needed
            results = []
            for row in response.data:
                d = row["draft_json"]
                d["status"] = row["status"] 
                d["draft_id"] = row["draft_id"] # Ensure ID matches DB
                results.append(d)
            return results
        except Exception as e:
            print(f"Supabase Error (fetch_drafts): {e}")
            return []

    async def save_draft(self, draft: Dict[str, Any]) -> bool:
        if not self.client: return False
        try:
            # Upsert based on draft_id
            payload = {
                "draft_id": draft["draft_id"],
                "run_id": draft.get("run_id"),
                "domain": draft.get("domain"),
                "sequence_type": draft.get("sequence_type"),
                "draft_json": draft,
                "status": draft.get("status", "NEEDS_REVIEW")
            }
            self.client.table("sniper_drafts").upsert(payload).execute()
            return True
        except Exception as e:
            print(f"Supabase Error (save_draft): {e}")
            return False

    async def save_dossier(self, dossier: Dict[str, Any]) -> bool:
        if not self.client: return False
        try:
             # Convert Pydantic to JSON if needed, or assume dict
            payload = {
                "dossier_id": dossier["dossier_id"],
                "domain": dossier["domain"],
                "record_id": dossier.get("record_id"),
                "config_id": dossier.get("config_id"),
                "dossier_json": dossier,
                "created_at": dossier.get("created_at")
            }
            self.client.table("account_dossiers").upsert(payload).execute()
            return True
        except Exception as e:
            print(f"Supabase Error (save_dossier): {e}")
            return False
