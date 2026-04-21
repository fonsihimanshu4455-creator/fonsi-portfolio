-- ============================================================================
-- FONSI portfolio - Character sizing & position controls
-- Adds JSON settings for scale/offset per character so they can be fine-
-- tuned from the admin without code changes.
-- ============================================================================

alter table hero_content
  add column if not exists hero_image_settings jsonb default '{}'::jsonb;

alter table site_settings
  add column if not exists character_settings jsonb default '{}'::jsonb;

-- Refresh PostgREST schema cache
notify pgrst, 'reload schema';
