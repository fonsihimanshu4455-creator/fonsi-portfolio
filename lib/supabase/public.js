import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// A cookie-less Supabase client safe to use in build-time contexts like
// generateStaticParams and sitemap. Only useful for anon-accessible queries.
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createSupabaseClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
