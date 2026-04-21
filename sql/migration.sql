-- ============================================================================
-- FONSI portfolio - Supabase migration
-- Paste into Supabase SQL editor and Run.
-- ============================================================================

create extension if not exists moddatetime schema extensions;

-- ----- 1. hero_content ------------------------------------------------------
create table if not exists hero_content (
  id int primary key default 1,
  heading_prefix text,
  heading_highlight text,
  heading_suffix text,
  subheading text,
  global_line text,
  hero_image_url text,
  cta_primary_text text,
  cta_primary_link text,
  cta_secondary_text text,
  cta_secondary_link text,
  updated_at timestamptz default now(),
  constraint hero_single_row check (id = 1)
);
alter table hero_content add column if not exists hero_image_url text;

-- ----- 2. stats -------------------------------------------------------------
create table if not exists stats (
  id uuid primary key default gen_random_uuid(),
  value text not null,
  label text not null,
  "order" int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ----- 3. services ----------------------------------------------------------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon_name text not null default 'megaphone',
  "order" int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ----- 4. projects ----------------------------------------------------------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text,
  image_url text,
  gradient text,
  link text,
  "order" int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ----- 5. future_projects ---------------------------------------------------
create table if not exists future_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  description text,
  image_url text,
  gradient text,
  link text,
  "order" int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ----- 6. journey_steps -----------------------------------------------------
create table if not exists journey_steps (
  id uuid primary key default gen_random_uuid(),
  step_number text not null,
  title text not null,
  description text not null,
  "order" int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ----- 7. achievements ------------------------------------------------------
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  number text,
  label text not null,
  description text not null,
  is_headline boolean default false,
  "order" int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ----- 8. skills ------------------------------------------------------------
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  display text not null,
  "order" int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ----- 9. testimonials ------------------------------------------------------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  photo_url text,
  rating numeric(2,1) not null default 5.0,
  review_text text not null,
  days_ago text,
  "order" int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ----- 11. website_features (Why My Websites Outperform) -------------------
create table if not exists website_features (
  id uuid primary key default gen_random_uuid(),
  icon_name text not null default 'zap',
  title text not null,
  description text not null,
  "order" int not null default 0,
  is_visible boolean not null default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ----- 10. site_settings ----------------------------------------------------
create table if not exists site_settings (
  id int primary key default 1,
  contact_email text,
  contact_phone text,
  address text,
  timezone_line text,
  footer_description text,
  social_links jsonb default '{}'::jsonb,
  cta_heading_prefix text,
  cta_heading_highlight text,
  cta_heading_suffix text,
  cta_subcopy text,
  updated_at timestamptz default now(),
  constraint settings_single_row check (id = 1)
);

-- ----- updated_at triggers --------------------------------------------------
do $$
declare t text;
begin
  for t in select unnest(array[
    'hero_content','stats','services','projects','future_projects',
    'journey_steps','achievements','skills','testimonials','site_settings',
    'website_features'
  ]) loop
    execute format(
      'drop trigger if exists set_updated_at on %I; ' ||
      'create trigger set_updated_at before update on %I ' ||
      'for each row execute procedure extensions.moddatetime(updated_at);',
      t, t
    );
  end loop;
end $$;

-- ----- Row Level Security ---------------------------------------------------
alter table hero_content     enable row level security;
alter table stats            enable row level security;
alter table services         enable row level security;
alter table projects         enable row level security;
alter table future_projects  enable row level security;
alter table journey_steps    enable row level security;
alter table achievements     enable row level security;
alter table skills           enable row level security;
alter table testimonials     enable row level security;
alter table site_settings    enable row level security;
alter table website_features enable row level security;

-- Singletons: public can always read
do $$
declare t text;
begin
  for t in select unnest(array['hero_content','site_settings']) loop
    execute format('drop policy if exists "public read" on %I;', t);
    execute format('create policy "public read" on %I for select to anon using (true);', t);
    execute format('drop policy if exists "auth read" on %I;', t);
    execute format('create policy "auth read" on %I for select to authenticated using (true);', t);
    execute format('drop policy if exists "auth write" on %I;', t);
    execute format('create policy "auth write" on %I for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- Lists: public reads only visible rows; authenticated full access
do $$
declare t text;
begin
  for t in select unnest(array[
    'stats','services','projects','future_projects',
    'journey_steps','achievements','skills','testimonials',
    'website_features'
  ]) loop
    execute format('drop policy if exists "public read visible" on %I;', t);
    execute format('create policy "public read visible" on %I for select to anon using (is_visible = true);', t);
    execute format('drop policy if exists "auth read all" on %I;', t);
    execute format('create policy "auth read all" on %I for select to authenticated using (true);', t);
    execute format('drop policy if exists "auth write" on %I;', t);
    execute format('create policy "auth write" on %I for all to authenticated using (true) with check (true);', t);
  end loop;
end $$;

-- ----- Storage bucket policies (run AFTER you create the `media` bucket) ----
-- Public read
drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select to anon using (bucket_id = 'media');

-- Authenticated write
drop policy if exists "media auth write" on storage.objects;
create policy "media auth write" on storage.objects
  for all to authenticated
  using (bucket_id = 'media')
  with check (bucket_id = 'media');
