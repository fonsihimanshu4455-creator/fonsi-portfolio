-- ============================================================================
-- FONSI portfolio - Logo admin control
-- Lets the admin upload a custom logo image, change the wordmark text,
-- or hide the wordmark entirely.
-- ============================================================================

alter table site_settings add column if not exists logo_url text;
alter table site_settings add column if not exists logo_wordmark text;
alter table site_settings add column if not exists logo_hide_wordmark boolean default false;

notify pgrst, 'reload schema';
