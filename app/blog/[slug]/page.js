import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, ArrowUpRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/ui/Reveal";
import { getPostBySlug, getRelatedPosts, getAllPostSlugs } from "@/lib/queries/blog";
import { getSiteSettings } from "@/lib/queries/public";
import { mdToHtml } from "@/lib/markdown";
import { SITE_URL } from "@/lib/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const rows = await getAllPostSlugs();
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  const title = post.seo_title || post.title;
  const description = post.seo_description || post.excerpt || "";
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.published_at,
      modifiedTime: post.updated_at,
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const [related, settings] = await Promise.all([
    getRelatedPosts(post.id, post.tags || []),
    getSiteSettings(),
  ]);

  const html = mdToHtml(post.body_markdown || "");
  const url = `${SITE_URL}/blog/${post.slug}`;
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.cover_image_url,
    datePublished: post.published_at,
    dateModified: post.updated_at,
    author: { "@type": "Person", name: "Himanshu Bhardwaj" },
    mainEntityOfPage: url,
  };

  return (
    <>
      <Nav />
      <main>
        <article className="section max-w-3xl">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-red)] mb-8"
            >
              <ArrowLeft size={14} /> Back to blog
            </Link>
          </Reveal>

          <Reveal>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-[color:var(--color-red)]/15 text-[color:var(--color-red)]">{t}</span>
                ))}
              </div>
            )}
            <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.05] mb-5">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-lg text-[color:var(--color-muted)] mb-5 leading-relaxed">{post.excerpt}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-[color:var(--color-muted)] mb-10">
              {post.published_at && (
                <span>{new Date(post.published_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              )}
              {post.reading_time && (
                <span className="inline-flex items-center gap-1"><Clock size={12} /> {post.reading_time} min read</span>
              )}
            </div>
          </Reveal>

          {post.cover_image_url && (
            <Reveal>
              <img
                src={post.cover_image_url}
                alt=""
                className="w-full aspect-[16/9] object-cover rounded-2xl border border-[color:var(--color-stroke)] mb-12"
              />
            </Reveal>
          )}

          <Reveal>
            <div
              className="prose-fonsi"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Reveal>
        </article>

        {related.length > 0 && (
          <section className="section pt-4">
            <h2 className="font-display text-2xl font-bold mb-6">Keep reading</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group card-elevated rounded-2xl p-5 hover:border-[color:var(--color-red)]/40 hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display font-bold text-base line-clamp-2">{p.title}</h3>
                    <div className="w-7 h-7 shrink-0 rounded-full border border-[color:var(--color-stroke)] flex items-center justify-center group-hover:bg-[color:var(--color-red)] group-hover:border-[color:var(--color-red)] group-hover:rotate-45 transition-all">
                      <ArrowUpRight size={12} />
                    </div>
                  </div>
                  {p.reading_time && (
                    <div className="text-xs text-[color:var(--color-muted)] mt-3">{p.reading_time} min read</div>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer settings={settings} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
    </>
  );
}
