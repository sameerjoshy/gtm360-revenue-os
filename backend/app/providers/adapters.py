import os
import httpx
import json
from typing import List, Dict, Any, Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

from .interfaces import LLMProvider, SearchProvider, CRMClient

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
