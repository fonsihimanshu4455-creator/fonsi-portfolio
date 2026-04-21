import { createClient } from "@/lib/supabase/server";

export async function getPublishedPosts() {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image_url, tags, reading_time, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });
  return data || [];
}

export async function getPostBySlug(slug) {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  return data || null;
}

export async function getRelatedPosts(currentId, tags = [], limit = 3) {
  const supabase = await createClient();
  if (!supabase) return [];
  let query = supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, cover_image_url, reading_time, published_at")
    .eq("is_published", true)
    .neq("id", currentId)
    .limit(limit);
  if (tags && tags.length > 0) query = query.overlaps("tags", tags);
  const { data } = await query.order("published_at", { ascending: false });
  return data || [];
}

export async function getAllPostSlugs() {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("blog_posts")
    .select("slug, updated_at")
    .eq("is_published", true);
  return data || [];
}
