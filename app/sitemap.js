import { SITE_URL } from "@/lib/site";
import { getAllPostSlugs } from "@/lib/queries/blog";
import { getAllCaseStudySlugs } from "@/lib/queries/caseStudies";

export default async function sitemap() {
  const now = new Date();
  const entries = [
    { url: SITE_URL,          lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
  ];

  const [posts, cases] = await Promise.all([getAllPostSlugs(), getAllCaseStudySlugs()]);
  posts.forEach((p) => entries.push({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  cases.forEach((c) => entries.push({
    url: `${SITE_URL}/case-studies/${c.slug}`,
    lastModified: c.updated_at ? new Date(c.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return entries;
}
