import { createClient } from "@/lib/supabase/server";

export async function getCaseStudyBySlug(slug) {
  const supabase = await createClient();
  if (!supabase) return null;
  const { data } = await supabase
    .from("case_studies")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  return data || null;
}

export async function getAllCaseStudySlugs() {
  const supabase = await createClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("case_studies")
    .select("slug, updated_at")
    .eq("is_published", true);
  return data || [];
}
