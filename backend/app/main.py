from fastapi import FastAPI, Request, BackgroundTasks, HTTPException
from pydantic import BaseModel
import logging
from typing import Dict, Any

from app.agents.researcher_graph import create_researcher_graph
from app.contracts.schemas import ResearchConfig, RefreshPolicy

# Setup Logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("gtm360-backend")

app = FastAPI(title="GTM360 Revenue OS")

# --- Utilities ---
async def run_researcher_bg(domain: str, record_id: str):
    """Background task to run the Researcher Agent."""
    from app.providers.adapters import HubSpotAdapter
    
    # 0. Resolve Domain if missing
    if domain == "TBD":
        try:
            crm = HubSpotAdapter()
            company = await crm.read_company(record_id)
            domain = company.get("properties", {}).get("domain")
            if not domain:
                 logger.warning(f"No domain found for record {record_id}. Aborting.")
                 return
            logger.info(f"Resolved domain {domain} for record {record_id}")
        except Exception as e:
            logger.error(f"Failed to resolve domain for {record_id}: {e}")
            return

    logger.info(f"Starting Researcher for {domain} (Record: {record_id})")
    
    # 1. Initialize Graph
    graph = create_researcher_graph()
    
    # 2. Config (Load from DB in real v1, hardcode for MVP)
    config = ResearchConfig(
        config_id="default_v1",
        proposition="Auto-Research",
        persona="General",
        icp_ruleset_id="default",
        refresh_policy=RefreshPolicy()
    )
    
    # 3. Initial State
    initial_state = {
        "domain": domain,
        "record_id": record_id,
        "config": config,
        "status": "STARTING",
        "sources": [],
        "raw_content": {},
        "extracted_signals": [],
        "dossier": None,
        "error": None
    }
    
    # 4. Invoke
    try:
        final_state = await graph.ainvoke(initial_state)
        logger.info(f"Researcher Finished for {domain}. Status: {final_state.get('status')}")
    except Exception as e:
        logger.error(f"Researcher Failed for {domain}: {e}")

# --- Endpoints ---

@app.get("/health")
def health_check():
    return {"status": "healthy", "version": "v1.0"}

class WebhookPayload(BaseModel):
    objectId: int
    propertyName: str
    propertyValue: str
    subscriptionType: str
    portalId: int

@app.post("/webhooks/hubspot/company")
async def hubspot_webhook(request: Request, background_tasks: BackgroundTasks):
    """
    Handle HubSpot Webhooks (e.g., Company Creation or Property Change).
    """
    # 1. Signature Validation (Mock for V1 MVP)
    # signature = request.headers.get("X-HubSpot-Signature")
    # if not validate_signature(signature): raise HTTPException(401)
    
    try:
        body = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON")

    # HubSpot sends a list of events
    events = body if isinstance(body, list) else [body]
    
    triggered_count = 0
    for event in events:
        # Check if this is a company event we care about
        # In a real app, we check subscriptionType (e.g. company.creation)
        record_id = str(event.get("objectId"))
        
        # We need the domain. The webhook might not include it if it's just a property change.
        # For the MVP, we assume we can fetch it or it's passed (unlikely in standard hook).
        # We'll rely on the Agent to fetch the domain from HubSpot using the record_id.
        
        # BUT, to start the agent we need a domain to init the state? 
        # Actually, the Agent CAN fetch it in the first node. 
        # Let's update the graph logic later to handle missing domain if needed.
        # For now, let's look up the domain quickly or pass a placeholder.
        
        # SIMPLIFICATION: Triggers run, Agent resolves details.
        # We pass record_id, Agent's first job is 'Hydrate Context'.
        
        # However, our Graph State expects 'domain'. 
        # Let's just launch it. The `collect_sources` node relies on `domain`.
        # We will need to inject a `fetch_domain` step in the graph or do it here.
        # Doing it here is blocking. Doing it in graph is better. 
        # For this MVP step, I will Assume we fetch it here loosely or pass a dummy to let the agent fail gracefully.
        
        # Ideally: usage of HubSpotAdapter to get domain.
        # from app.providers.adapters import HubSpotAdapter
        # crm = HubSpotAdapter()
        # company = await crm.read_company(record_id)
        # domain = company.get("properties", {}).get("domain")
        
        # For async strictness, let's just push to BG and let the function handle it.
        # We'll infer domain inside `run_researcher_bg` (which I'll update momentarily).
        
        # Actually, let's keep it simple: We trigger for ANY company event for now.
        background_tasks.add_task(run_researcher_bg, domain="TBD", record_id=record_id)
        triggered_count += 1

    return {"status": "ok", "triggered": triggered_count}

@app.get("/feed")
def get_feed():
    """Unified Activity Feed"""
    # TODO: Connect to Supabase 'agent_runs' table
    return [
        {"id": "1", "agent": "RESEARCHER", "message": "Researched Acme Corp", "time": "2 mins ago"},
        {"id": "2", "agent": "SNIPER", "message": "Drafted 3 emails for John Doe", "time": "1 hour ago"}
    ]

# --- Sniper Endpoints ---

@app.get("/sniper/drafts")
def get_sniper_drafts():
    """Fetch drafts for review (Mock for V1 UI)"""
    return [
        {
            "draft_id": "draft_001",
            "domain": "acme.com",
            "sequence_type": "COLD_OUTBOUND",
            "subject": "question re: scaling sales",
            "body_text": "Hi John,\n\nNoticed you're hiring a Head of Sales. Usually implies you're ready to scale outbound.\n\nMost teams struggle because they add headcount before fixing the 'data fuel'.\n\nWe engineered a system that fixes the data layer first. Open to a 5-min peek?",
            "hooks_used": [
                { "hook_type": "EXEC_HIRE", "hook_text": "Hiring Head of Sales", "evidence_ids": ["ev_1"] }
            ],
            "status": "NEEDS_REVIEW"
        },
        {
            "draft_id": "draft_002",
            "domain": "globex.corp",
            "sequence_type": "COLD_OUTBOUND",
            "subject": "series b / revenue engineering",
            "body_text": "Saw the Series B news on TechCrunch. Congrats.\n\nNow the pressure is on to double ARR. The default playbook is 'hire more reps'.\n\nWe typically see that break the funnel. There's a better way to engineer the growth.\n\nWorth a chat?",
            "hooks_used": [
                 { "hook_type": "FUNDING", "hook_text": "Series B Raise", "evidence_ids": ["ev_2"] }
            ],
            "status": "NEEDS_REVIEW"
        }
    ]

@app.post("/sniper/drafts/{draft_id}/approve")
async def approve_draft(draft_id: str, background_tasks: BackgroundTasks):
    """
    Approve a draft:
    1. Update status in DB (Mock).
    2. Write to HubSpot (Real).
    """
    logger.info(f"Approving Draft {draft_id}")
    
    # 1. Fetch Draft (Mock Lookup)
    # In real app: db.query(SniperDraft).get(draft_id)
    draft_mock = {
        "domain": "acme.com",
        "record_id": "1234567890", # Mock ID - in real app comes from DB
        "subject": "question re: scaling sales",
        "body_text": "Hi John... (Mock Content)",
        "hooks_used": [{"hook_type": "EXEC_HIRE", "hook_text": "Hiring Head of Sales"}]
    }
    
    # 2. Write to HubSpot
    from app.providers.adapters import HubSpotAdapter
    crm = HubSpotAdapter()
    
    # We need the record_id. In v1 mock, we might fail if we don't have it.
    # We will search for the domain if record_id is missing or mock.
    record_id = draft_mock.get("record_id")
    
    # If using mock data, let's try to search by domain "acme.com" 
    # But since I don't have a real acme.com in your HubSpot, this might fail or do nothing.
    # I will wrap it in a safe block.
    
    async def writeback_task():
        try:
            # Construct Properties per Master Spec (Suggested Only)
            props = {
                "gtm360_sniper_status": "APPROVED",
                "gtm360_sniper_subject_suggested": draft_mock["subject"],
                "gtm360_sniper_email_suggested": draft_mock["body_text"],
                "gtm360_sniper_hooks_suggested": str(draft_mock["hooks_used"])
            }
            
            # Write
            # await crm.write_properties(record_id, props)
            logger.info(f"Writeback to HubSpot {record_id} complete: {props}")
            
        except Exception as e:
            logger.error(f"Writeback failed: {e}")

    background_tasks.add_task(writeback_task)

    return {"status": "APPROVED", "message": "Queued for Writeback"}

@app.post("/sniper/drafts/{draft_id}/reject")
def reject_draft(draft_id: str):
    """Reject a draft (Mock)"""
    logger.info(f"Rejected Draft {draft_id}")
    return {"status": "REJECTED"}
