import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import PillButton from "@/components/ui/PillButton";
import { getCaseStudyBySlug, getAllCaseStudySlugs } from "@/lib/queries/caseStudies";
import { getSiteSettings } from "@/lib/queries/public";
import { mdToHtml } from "@/lib/markdown";
import { SITE_URL } from "@/lib/site";

export const revalidate = 60;

export async function generateStaticParams() {
  const rows = await getAllCaseStudySlugs();
  return rows.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) return {};
  const title = cs.seo_title || `${cs.title} — Case Study`;
  const description = cs.seo_description || cs.summary || "";
  return {
    title,
    description,
    alternates: { canonical: `/case-studies/${cs.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${SITE_URL}/case-studies/${cs.slug}`,
      images: cs.hero_image_url ? [{ url: cs.hero_image_url }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const cs = await getCaseStudyBySlug(slug);
  if (!cs) notFound();

  const [settings] = await Promise.all([getSiteSettings()]);
  const metrics = Array.isArray(cs.metrics) ? cs.metrics : [];
  const gallery = cs.gallery_urls || [];

  return (
    <>
      <Nav settings={settings} />
      <main>
        <section className="section pt-10">
          <Reveal>
            <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-[color:var(--color-muted)] hover:text-[color:var(--color-red)] mb-8">
              <ArrowLeft size={14} /> Back to work
            </Link>
          </Reveal>

          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
            <Reveal>
              <div className="flex flex-wrap items-center gap-2 mb-4 text-xs uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
                {cs.client_name && <span>{cs.client_name}</span>}
                {cs.industry && (<><span>·</span><span>{cs.industry}</span></>)}
              </div>
              <h1 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.05] mb-5">
                {cs.title}
              </h1>
              {cs.summary && (
                <p className="text-lg text-[color:var(--color-muted)] leading-relaxed mb-6">{cs.summary}</p>
              )}
            </Reveal>

            <Reveal>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden card-elevated">
                {cs.hero_image_url ? (
                  <img src={cs.hero_image_url} alt={cs.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#3b0a0f] to-[#1e1012]" />
                )}
              </div>
            </Reveal>
          </div>
        </section>

        {metrics.length > 0 && (
          <section className="section pt-0">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {metrics.map((m, i) => (
                <div key={i} className="card-elevated rounded-2xl p-6">
                  <div className="text-xs uppercase tracking-wider text-[color:var(--color-muted)] mb-2">{m.label}</div>
                  <div className="flex items-baseline gap-3">
                    {m.before && <span className="text-sm text-[color:var(--color-muted)] line-through">{m.before}</span>}
                    <span className="font-display text-3xl font-extrabold text-[color:var(--color-red)]">{m.after}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {cs.challenge_md && (
          <section className="section pt-4 max-w-3xl">
            <SectionHeading>The Challenge</SectionHeading>
            <div className="prose-fonsi" dangerouslySetInnerHTML={{ __html: mdToHtml(cs.challenge_md) }} />
          </section>
        )}

        {cs.strategy_md && (
          <section className="section pt-4 max-w-3xl">
            <SectionHeading>The Strategy</SectionHeading>
            <div className="prose-fonsi" dangerouslySetInnerHTML={{ __html: mdToHtml(cs.strategy_md) }} />
          </section>
        )}

        {cs.execution_md && (
          <section className="section pt-4 max-w-3xl">
            <SectionHeading>Execution</SectionHeading>
            <div className="prose-fonsi" dangerouslySetInnerHTML={{ __html: mdToHtml(cs.execution_md) }} />
          </section>
        )}

        {gallery.length > 0 && (
          <section className="section pt-4">
            <SectionHeading>Work samples</SectionHeading>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {gallery.map((g, i) => (
                <div key={i} className="rounded-2xl overflow-hidden card-elevated aspect-[4/3]">
                  <img src={g} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </section>
        )}

        {cs.testimonial_quote && (
          <section className="section pt-4 max-w-3xl">
            <div className="card-elevated rounded-3xl p-8 border-[color:var(--color-red)]/40">
              <p className="font-display text-2xl md:text-3xl font-bold leading-snug">&ldquo;{cs.testimonial_quote}&rdquo;</p>
              {cs.testimonial_author && (
                <div className="mt-5 text-sm text-[color:var(--color-muted)]">— {cs.testimonial_author}</div>
              )}
            </div>
          </section>
        )}

        <section className="section pt-4">
          <div className="card-elevated rounded-3xl p-8 md:p-12 flex flex-wrap items-center justify-between gap-6">
            <div>
              <h3 className="font-display font-extrabold text-2xl md:text-3xl">Want results like these?</h3>
              <p className="text-sm text-[color:var(--color-muted)] mt-2">Tell me about your brand and your numbers.</p>
            </div>
            <PillButton as={Link} href="/#contact">
              Start a Project <ArrowUpRight size={16} />
            </PillButton>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
