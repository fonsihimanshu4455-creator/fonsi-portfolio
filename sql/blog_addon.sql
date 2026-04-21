-- ============================================================================
-- FONSI portfolio - Blog add-on
-- ============================================================================

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  cover_image_url text,
  body_markdown text not null default '',
  tags text[] default '{}',
  reading_time int,
  seo_title text,
  seo_description text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists blog_posts_published_idx
  on blog_posts (is_published, published_at desc);

drop trigger if exists set_updated_at on blog_posts;
create trigger set_updated_at before update on blog_posts
  for each row execute procedure extensions.moddatetime(updated_at);

alter table blog_posts enable row level security;

drop policy if exists "public read published" on blog_posts;
create policy "public read published" on blog_posts
  for select to anon
  using (is_published = true);

drop policy if exists "auth read all" on blog_posts;
create policy "auth read all" on blog_posts
  for select to authenticated using (true);

drop policy if exists "auth write" on blog_posts;
create policy "auth write" on blog_posts
  for all to authenticated using (true) with check (true);
