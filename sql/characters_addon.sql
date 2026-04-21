-- ============================================================================
-- FONSI portfolio - Characters add-on
-- Adds 6 optional character image URLs to site_settings so you can drop a
-- stylized 3D character into CTA, Achievements, Process, Skills, 404 page
-- and Footer. Each section gracefully falls back to the existing design
-- when its URL is empty.
-- ============================================================================

alter table site_settings add column if not exists cta_character_url text;
alter table site_settings add column if not exists achievements_character_url text;
alter table site_settings add column if not exists process_character_url text;
alter table site_settings add column if not exists skills_character_url text;
alter table site_settings add column if not exists not_found_character_url text;
alter table site_settings add column if not exists footer_character_url text;
