from typing import List, Optional, Dict, Literal, Any
from datetime import datetime
from pydantic import BaseModel, Field, HttpUrl

# --- 2.2 EvidenceItem ---
class EvidenceItem(BaseModel):
    evidence_id: str
    domain: str
    source_type: Literal["HOMEPAGE", "CAREERS", "NEWS", "BLOG", "DOC", "TECH_DETECT", "OTHER"]
    url: HttpUrl
    retrieved_at: datetime
    extract_method: Literal["requests", "readability", "html_meta", "llm_summary"]
    excerpt: str
    excerpt_hash: str
    reliability: Literal["HIGH", "MED", "LOW"]

# --- 2.3 Signal ---
class Signal(BaseModel):
    signal_type: Literal[
        "EXEC_HIRE", "FUNDING", "TECH_STACK", "GTM_TOOLING", 
        "PARTNER", "EXPANSION", "COMPLIANCE", "PRODUCT_LAUNCH", "NEWS"
    ]
    label: str
    value: str
    confidence: float = Field(..., ge=0.0, le=1.0)
    evidence_ids: List[str]  # Must match existing EvidenceItem.evidence_id

# --- 2.1 ResearchConfig ---
class RefreshPolicy(BaseModel):
    ttl_days: int = 14
    force_refresh_signals: List[str] = []

class ContextOverrides(BaseModel):
    tone_guide: Optional[str] = None
    reference_url: Optional[str] = None

class ResearchConfig(BaseModel):
    config_id: str
    proposition: str
    persona: str
    icp_ruleset_id: str
    refresh_policy: RefreshPolicy
    context_overrides: Optional[ContextOverrides] = None

# --- 2.4 AccountDossier ---
class GTMDiagnosis(BaseModel):
    fit_tier: Literal["Tier 1", "Tier 2", "Tier 3", "Out"]
    diagnosis_label: str
    key_drivers: List[str]
    evidence_ids: List[str]

class AccountDossier(BaseModel):
    dossier_id: str
    domain: str
    record_id: Optional[str] = None
    config_id: str
    signals: List[Signal]
    gtm_diagnosis: GTMDiagnosis
    created_at: datetime
    version: str = "1.0"

# --- 2.5 Hook ---
class Hook(BaseModel):
    hook_id: str
    hook_type: str
    hook_text: str
    evidence_ids: List[str]
    confidence: float

# --- 2.6 DraftEmail ---
class Claim(BaseModel):
    text: str
    evidence_ids: List[str]

class DraftEmail(BaseModel):
    draft_id: str
    run_id: str
    domain: str
    sequence_type: Literal["COLD_OUTBOUND", "NURTURE", "BREAKUP"]
    subject: str
    body_text: str
    hooks_used: List[Hook]
    claims: List[Claim]
    tone: Literal["PROFESSIONAL", "CASUAL", "DIRECT"]
    created_at: datetime
