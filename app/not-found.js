import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PillButton from "@/components/ui/PillButton";
import OutlineBox from "@/components/ui/OutlineBox";
import GhostText from "@/components/ui/GhostText";
import { getSiteSettings } from "@/lib/queries/public";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <>
      <Nav />
      <main>
        <section className="section min-h-[70vh] flex items-center">
          <div className="grid md:grid-cols-2 gap-10 items-center w-full">
            <div className="relative z-10">
              <div className="font-display font-extrabold text-[6rem] md:text-[9rem] leading-none text-[color:var(--color-red)]">
                4<span className="text-[color:var(--color-text)]/20">0</span>4
              </div>
              <h1 className="font-display font-extrabold text-3xl md:text-5xl leading-[1.05] mt-2">
                Lost in the <OutlineBox>funnel</OutlineBox>.
              </h1>
              <p className="mt-5 text-[color:var(--color-muted)] max-w-md">
                The page you&apos;re looking for moved, got renamed, or never existed.
                Let&apos;s get you back on track.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PillButton as={Link} href="/">Back home</PillButton>
                <Link
                  href="/blog"
                  className="text-[color:var(--color-text)] font-medium hover:text-[color:var(--color-red)] transition-colors"
                >
                  Read the blog →
                </Link>
              </div>
            </div>

            <div className="relative min-h-[300px] md:min-h-[420px] flex items-end justify-center">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center justify-center select-none"
              >
                <GhostText className="text-[clamp(6rem,18vw,14rem)] whitespace-nowrap">
                  404
                </GhostText>
              </div>
              {settings.not_found_character_url ? (
                <img
                  src={settings.not_found_character_url}
                  alt=""
                  className="relative z-10 w-full max-w-sm object-contain object-bottom drop-shadow-[0_20px_60px_rgba(229,28,35,0.35)]"
                />
              ) : (
                <div aria-hidden="true" className="relative z-10 text-8xl">🤷</div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer settings={settings} />
    </>
  );
}
