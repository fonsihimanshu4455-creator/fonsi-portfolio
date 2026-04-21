import { createClient } from "@/lib/supabase/server";
import { createPublicClient } from "@/lib/supabase/public";

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
  // Cookie-less client so this can run in generateStaticParams / sitemap.
  const supabase = createPublicClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("case_studies")
    .select("slug, updated_at")
    .eq("is_published", true);
  return data || [];
}
