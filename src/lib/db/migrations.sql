-- ============================================================
-- AutonOps Platform — Migration: Mission Command UI
-- Run AFTER schema.sql in Supabase SQL Editor
-- ============================================================

-- ─── Add mission columns ────────────────────────────────────
alter table missions
  add column if not exists daily_room_url text,
  add column if not exists aar_report text,
  add column if not exists cmdr_id uuid references users(id);

-- ─── Mission Chat (realtime comms log) ──────────────────────
create table if not exists mission_chat (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions(id) on delete cascade,
  user_id uuid references users(id),
  user_name text,
  role text not null check (role in ('commander','operator','observer','system')),
  message text not null,
  created_at timestamptz default now() not null
);

create index if not exists idx_mission_chat_mission on mission_chat(mission_id);
create index if not exists idx_mission_chat_created on mission_chat(created_at);

-- Enable realtime
alter publication supabase_realtime add table mission_chat;

-- ─── Mission Evidence (capture moments) ─────────────────────
create table if not exists mission_evidence (
  id uuid primary key default gen_random_uuid(),
  mission_id uuid not null references missions(id) on delete cascade,
  created_by uuid references users(id),
  created_by_name text,
  label text not null,
  notes text,
  captured_at timestamptz default now() not null
);

create index if not exists idx_mission_evidence_mission on mission_evidence(mission_id);

-- Enable realtime
alter publication supabase_realtime add table mission_evidence;

-- ─── Orders table (for Shopify webhook) ─────────────────────
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  shopify_order_id text unique,
  display_id text,
  account_id uuid references accounts(id),
  mission_id uuid references missions(id),
  mission_type text,
  location text,
  requester_name text,
  requester_email text,
  amount numeric,
  currency text default 'USD',
  status text default 'paid',
  raw_payload jsonb,
  created_at timestamptz default now() not null
);

create index if not exists idx_orders_shopify on orders(shopify_order_id);
create index if not exists idx_orders_account on orders(account_id);

-- ─── RLS for new tables ─────────────────────────────────────
alter table mission_chat enable row level security;
alter table mission_evidence enable row level security;
alter table orders enable row level security;

-- Example policies (commented — uncomment and adapt to your auth)
-- create policy "mission chat readable by mission account members" on mission_chat
--   for select using (
--     mission_id in (
--       select id from missions where account_id = (
--         select account_id from users where id = auth.uid()
--       )
--     )
--   );
