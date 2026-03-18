-- ============================================================
-- AutonOps Platform Database Schema
-- Run in Supabase SQL Editor
-- ============================================================

-- Enable extensions
create extension if not exists vector;
create extension if not exists "uuid-ossp";

-- ============================================================
-- USERS & AUTH
-- ============================================================

create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  role text not null check (role in ('customer','admin','cfo','operations','leadership')),
  account_id uuid,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ============================================================
-- ACCOUNTS & CONTACTS
-- ============================================================

create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  city text,
  state text,
  zip text,
  phone text,
  type text check (type in ('fire','law','sar','recon','government','commercial')),
  status text default 'active' check (status in ('active','inactive','prospect')),
  contract_start date,
  price_per_sortie numeric default 1000,
  lead_source text,
  notes text,
  created_at timestamptz default now() not null
);

alter table users add constraint fk_users_account foreign key (account_id) references accounts(id);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  account_id uuid not null references accounts(id) on delete cascade,
  name text not null,
  title text,
  phone text,
  email text,
  is_primary boolean default false,
  created_at timestamptz default now() not null
);

-- ============================================================
-- REQUESTS (customer-initiated mission requests)
-- ============================================================

create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  display_id text unique not null,
  account_id uuid not null references accounts(id),
  user_id uuid not null references users(id),
  incident_type text not null check (incident_type in ('fire','sar','law','recon','other')),
  location text not null,
  lat numeric,
  lng numeric,
  urgency text not null check (urgency in ('immediate','scheduled','routine')),
  description text,
  requested_timing text,
  status text default 'submitted' check (status in (
    'submitted','under_review','approved','scheduled','active','completed','closed','rejected'
  )),
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

-- ============================================================
-- MISSIONS
-- ============================================================

create table if not exists missions (
  id uuid primary key default gen_random_uuid(),
  display_id text unique not null,
  request_id uuid references requests(id),
  account_id uuid not null references accounts(id),
  type text not null,
  status text default 'planning' check (status in (
    'planning','briefed','active','debriefing','completed','closed'
  )),
  location text,
  lat numeric,
  lng numeric,
  commander_id uuid,
  controller_id uuid,
  aircraft_id uuid,
  score integer check (score between 0 and 100),
  start_time timestamptz,
  end_time timestamptz,
  aar_summary text,
  created_at timestamptz default now() not null
);

-- ============================================================
-- SORTIES
-- ============================================================

create table if not exists sorties (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions(id) on delete cascade,
  sortie_number integer not null,
  status text default 'planned' check (status in ('planned','active','completed','aborted')),
  waypoints jsonb,
  start_time timestamptz,
  end_time timestamptz,
  flight_hours numeric default 0,
  created_at timestamptz default now() not null
);

-- ============================================================
-- AIRCRAFT
-- ============================================================

create table if not exists aircraft (
  id uuid primary key default gen_random_uuid(),
  display_id text unique not null,
  name text not null,
  type text check (type in ('vtol','fixed_wing','rotary')),
  status text default 'standby' check (status in ('active','standby','maintenance','offline')),
  location text,
  total_flight_hours numeric default 0,
  last_maintenance date,
  next_maintenance date,
  insurance_expiry date,
  created_at timestamptz default now() not null
);

alter table missions add constraint fk_missions_aircraft foreign key (aircraft_id) references aircraft(id);

-- ============================================================
-- PILOTS / CONTROLLERS
-- ============================================================

create table if not exists pilots (
  id uuid primary key default gen_random_uuid(),
  display_id text unique not null,
  name text not null,
  type text check (type in ('pilot','controller','commander')),
  status text default 'available' check (status in ('available','on_mission','offline')),
  location text,
  certifications jsonb default '[]',
  total_flight_hours numeric default 0,
  cert_expiry date,
  created_at timestamptz default now() not null
);

alter table missions add constraint fk_missions_commander foreign key (commander_id) references pilots(id);
alter table missions add constraint fk_missions_controller foreign key (controller_id) references pilots(id);

-- ============================================================
-- INVOICES
-- ============================================================

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  display_id text unique not null,
  account_id uuid not null references accounts(id),
  mission_id uuid references missions(id),
  amount numeric not null,
  status text default 'draft' check (status in ('draft','sent','paid','overdue','cancelled')),
  due_date date,
  paid_date date,
  line_items jsonb default '[]',
  notes text,
  created_at timestamptz default now() not null
);

-- ============================================================
-- EXPENSES
-- ============================================================

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references missions(id),
  category text not null check (category in (
    'fuel','maintenance','pilot_payout','insurance','equipment','software','travel','other'
  )),
  description text,
  amount numeric not null,
  date date not null,
  created_at timestamptz default now() not null
);

-- ============================================================
-- REPORTS / DELIVERABLES
-- ============================================================

create table if not exists reports (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions(id),
  account_id uuid not null references accounts(id),
  type text not null check (type in ('aar','imagery','data_package','analysis','thermal','video')),
  title text not null,
  description text,
  file_url text,
  file_size integer,
  created_at timestamptz default now() not null
);

-- ============================================================
-- MESSAGES
-- ============================================================

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid references missions(id),
  request_id uuid references requests(id),
  account_id uuid not null references accounts(id),
  user_id uuid not null references users(id),
  user_name text not null,
  content text not null,
  is_internal boolean default false,
  created_at timestamptz default now() not null
);

-- ============================================================
-- AUDIT LOGS
-- ============================================================

create table if not exists audit_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  user_name text,
  action text not null,
  entity_type text not null,
  entity_id uuid,
  metadata jsonb,
  created_at timestamptz default now() not null
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

-- Customers can only see their own account data
-- Admins can see everything

alter table accounts enable row level security;
alter table contacts enable row level security;
alter table requests enable row level security;
alter table missions enable row level security;
alter table invoices enable row level security;
alter table reports enable row level security;
alter table messages enable row level security;

-- Policies would reference auth.uid() -> users.id -> users.account_id
-- Example:
-- create policy "customers see own account" on accounts
--   for select using (
--     id = (select account_id from users where id = auth.uid())
--     or (select role from users where id = auth.uid()) in ('admin','cfo','operations','leadership')
--   );

-- ============================================================
-- INDEXES
-- ============================================================

create index if not exists idx_requests_account on requests(account_id);
create index if not exists idx_requests_status on requests(status);
create index if not exists idx_missions_account on missions(account_id);
create index if not exists idx_missions_status on missions(status);
create index if not exists idx_invoices_account on invoices(account_id);
create index if not exists idx_invoices_status on invoices(status);
create index if not exists idx_messages_account on messages(account_id);
create index if not exists idx_messages_mission on messages(mission_id);
create index if not exists idx_audit_logs_user on audit_logs(user_id);
create index if not exists idx_audit_logs_entity on audit_logs(entity_type, entity_id);
create index if not exists idx_reports_mission on reports(mission_id);
create index if not exists idx_sorties_mission on sorties(mission_id);
