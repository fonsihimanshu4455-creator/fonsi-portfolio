-- ============================================================================
-- FONSI portfolio - Case Studies add-on
-- ============================================================================

create table if not exists case_studies (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  client_name text,
  industry text,
  hero_image_url text,
  summary text,
  challenge_md text,
  strategy_md text,
  execution_md text,
  metrics jsonb default '[]'::jsonb,
  gallery_urls text[] default '{}',
  testimonial_quote text,
  testimonial_author text,
  seo_title text,
  seo_description text,
  is_published boolean not null default false,
  published_at timestamptz,
  "order" int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists case_studies_published_idx
  on case_studies (is_published, "order");

drop trigger if exists set_updated_at on case_studies;
create trigger set_updated_at before update on case_studies
  for each row execute procedure extensions.moddatetime(updated_at);

alter table case_studies enable row level security;

drop policy if exists "public read published" on case_studies;
create policy "public read published" on case_studies
  for select to anon using (is_published = true);

drop policy if exists "auth read all" on case_studies;
create policy "auth read all" on case_studies
  for select to authenticated using (true);

drop policy if exists "auth write" on case_studies;
create policy "auth write" on case_studies
  for all to authenticated using (true) with check (true);

-- projects table: add optional case_study_slug to link "Recent Work" tiles
alter table projects add column if not exists case_study_slug text;
