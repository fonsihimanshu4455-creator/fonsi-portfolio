import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { getPublishedPosts } from "@/lib/queries/blog";
import { getSiteSettings } from "@/lib/queries/public";
import { ArrowUpRight, Clock } from "lucide-react";

export const metadata = {
  title: "Blog · Insights on Ads, Growth & Web",
  description:
    "Tactical posts on Meta ads, Google ads, landing pages, web performance and growth — from FONSI (Himanshu Bhardwaj).",
  alternates: { canonical: "/blog" },
};

export const revalidate = 60;

export default async function BlogIndex() {
  const [posts, settings] = await Promise.all([getPublishedPosts(), getSiteSettings()]);

  return (
    <>
      <Nav settings={settings} />
      <main>
        <section className="section">
          <SectionHeading eyebrow="Insights">The FONSI Blog</SectionHeading>
          <p className="text-[color:var(--color-muted)] max-w-xl mb-10">
            Short, tactical notes on performance marketing, websites that convert, and the
            creative behind both.
          </p>

          {posts.length === 0 ? (
            <div className="card-elevated rounded-2xl p-10 text-center text-[color:var(--color-muted)]">
              First posts are on the way. Check back soon.
            </div>
          ) : (
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((p) => (
                <StaggerItem key={p.id}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group block card-elevated rounded-2xl overflow-hidden hover:border-[color:var(--color-red)]/40 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div
                      className="h-44 bg-gradient-to-br from-[#3b0a0f] to-[#1e1012] transition-transform duration-500 group-hover:scale-105"
                      style={
                        p.cover_image_url
                          ? { backgroundImage: `url(${p.cover_image_url})`, backgroundSize: "cover", backgroundPosition: "center" }
                          : undefined
                      }
                    />
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-display font-bold line-clamp-2">{p.title}</h3>
                        <div className="w-8 h-8 shrink-0 rounded-full border border-[color:var(--color-stroke)] flex items-center justify-center group-hover:bg-[color:var(--color-red)] group-hover:border-[color:var(--color-red)] group-hover:rotate-45 transition-all duration-300">
                          <ArrowUpRight size={12} />
                        </div>
                      </div>
                      {p.excerpt && (
                        <p className="text-sm text-[color:var(--color-muted)] mt-2 line-clamp-2 leading-relaxed">{p.excerpt}</p>
                      )}
                      <div className="flex items-center gap-3 mt-4 text-xs text-[color:var(--color-muted)]">
                        {p.published_at && (
                          <span>{new Date(p.published_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
                        )}
                        {p.reading_time && (
                          <span className="inline-flex items-center gap-1">
                            <Clock size={11} /> {p.reading_time} min read
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
