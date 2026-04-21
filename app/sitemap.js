import { SITE_URL } from "@/lib/site";
import { getAllPostSlugs } from "@/lib/queries/blog";

export default async function sitemap() {
  const now = new Date();
  const entries = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const posts = await getAllPostSlugs();
  posts.forEach((p) => {
    entries.push({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });

  return entries;
}
