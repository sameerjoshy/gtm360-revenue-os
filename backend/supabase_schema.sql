-- GTM360 Revenue OS Schema (v1)

-- 1. Agent Runs
create table if not exists agent_runs (
  run_id text primary key,
  agent_type text not null check (agent_type in ('RESEARCHER', 'SNIPER')),
  status text not null,
  domain text not null,
  record_id text,
  config_id text,
  logs jsonb default '[]'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Evidence Items (Provenance)
create table if not exists evidence_items (
  evidence_id text primary key,
  domain text not null,
  url text not null,
  source_type text,
  excerpt text,
  reliability text,
  raw_data jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Account Dossiers (Output of Researcher)
create table if not exists account_dossiers (
  dossier_id text primary key,
  domain text not null,
  record_id text,
  config_id text,
  dossier_json jsonb not null, -- Stores the full AccountDossier object
  version text default '1.0',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index if not exists idx_dossier_domain on account_dossiers(domain);

-- 4. Sniper Drafts (Output of Sniper)
create table if not exists sniper_drafts (
  draft_id text primary key,
  run_id text references agent_runs(run_id),
  domain text not null,
  sequence_type text,
  draft_json jsonb not null, -- Stores the full DraftEmail object
  status text default 'NEEDS_REVIEW', -- NEEDS_REVIEW, APPROVED, REJECTED
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Suggested Updates (Diff Engine)
create table if not exists suggested_updates (
  update_id text primary key,
  run_id text references agent_runs(run_id),
  agent_type text,
  domain text,
  record_id text,
  payload_json jsonb, -- The fields we want to change
  status text default 'PENDING'
);
