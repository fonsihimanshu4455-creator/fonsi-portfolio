-- ============================================================================
-- FONSI portfolio - Leads add-on
-- Paste into Supabase SQL editor and Run (after the main migration).
-- ============================================================================

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  service text,
  budget text,
  message text not null,
  source text default 'website',
  status text not null default 'new',
  is_read boolean not null default false,
  is_starred boolean not null default false,
  user_agent text,
  referrer text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

drop trigger if exists set_updated_at on leads;
create trigger set_updated_at before update on leads
  for each row execute procedure extensions.moddatetime(updated_at);

alter table leads enable row level security;

-- Anyone (anon) can INSERT a lead (contact form submissions)
drop policy if exists "public insert" on leads;
create policy "public insert" on leads
  for insert to anon
  with check (true);

-- Only authenticated can read / update / delete
drop policy if exists "auth read" on leads;
create policy "auth read" on leads
  for select to authenticated
  using (true);

drop policy if exists "auth write" on leads;
create policy "auth write" on leads
  for all to authenticated
  using (true) with check (true);
