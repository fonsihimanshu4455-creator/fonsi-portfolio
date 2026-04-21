-- ============================================================================
-- FONSI portfolio - Hero image add-on
-- Adds an optional image URL to the single hero_content row.
-- ============================================================================

alter table hero_content add column if not exists hero_image_url text;
