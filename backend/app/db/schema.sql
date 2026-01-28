-- Enable Row Level Security (RLS) recommended practices
-- but for this MVP Agent OS, we will start with basic tables.

-- 1. Agent Runs (The "Audit Log")
-- Tracks every time a user triggers an agent
CREATE TABLE IF NOT EXISTS agent_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    agent_id TEXT NOT NULL, -- e.g. "researcher", "sniper"
    inputs JSONB, -- The initial parameters (e.g. domain: stripe.com)
    status TEXT DEFAULT 'PENDING', -- PENDING, RUNNING, COMPLETED, FAILED
    outputs JSONB, -- The final result
    logs JSONB[] -- structured logs from the run
);

-- 2. Evidence Items (The "Facts")
-- Atomic pieces of truth found by the Researcher
CREATE TABLE IF NOT EXISTS evidence_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    domain TEXT NOT NULL, -- e.g. "stripe.com"
    source_url TEXT NOT NULL,
    fact_text TEXT NOT NULL, -- The extracted text snippet
    confidence_score FLOAT, -- 0.0 to 1.0
    run_id UUID REFERENCES agent_runs(id) -- traceable back to the run that found it
);

-- 3. Account Dossiers (The "Profile")
-- The consolidated view of a company
CREATE TABLE IF NOT EXISTS dossiers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    domain TEXT NOT NULL UNIQUE,
    data JSONB NOT NULL, -- The full JSON contract
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
