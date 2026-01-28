from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional

class LLMProvider(ABC):
    @abstractmethod
    async def generate_json(self, prompt: str, schema: Dict[str, Any], system_prompt: str = "") -> Dict[str, Any]:
        """Generate a JSON response validated against the provided JSON schema."""
        pass

    @abstractmethod
    async def generate_text(self, prompt: str, system_prompt: str = "") -> str:
        """Generate a raw text response."""
        pass

class SearchProvider(ABC):
    @abstractmethod
    async def search(self, query: str, max_results: int = 5) -> List[Dict[str, Any]]:
        """Search the web and return a list of results with url, title, content."""
        pass

class CRMClient(ABC):
    @abstractmethod
    async def read_company(self, record_id: str) -> Dict[str, Any]:
        """Fetch company details from CRM."""
        pass

    @abstractmethod
    async def write_properties(self, record_id: str, properties: Dict[str, Any]) -> bool:
        """Write properties to a company record."""
        pass
    
    @abstractmethod
    async def search_company(self, domain: str) -> Optional[Dict[str, Any]]:
        """Find a company by domain."""
        pass

class StorageProvider(ABC):
    @abstractmethod
    async def fetch_dossier(self, domain: str) -> Optional[Dict[str, Any]]:
        pass
    
    @abstractmethod
    async def fetch_drafts(self, status: str = "NEEDS_REVIEW") -> List[Dict[str, Any]]:
        pass
        
    @abstractmethod
    async def save_draft(self, draft: Dict[str, Any]) -> bool:
        pass

    @abstractmethod
    async def save_dossier(self, dossier: Dict[str, Any]) -> bool:
        pass
