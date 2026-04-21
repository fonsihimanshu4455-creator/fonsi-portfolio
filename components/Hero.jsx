import { ArrowRight } from "lucide-react";
import PillButton from "./ui/PillButton";
import OutlineBox from "./ui/OutlineBox";
import GhostText from "./ui/GhostText";
import DotCluster from "./ui/DotCluster";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="section pt-10 md:pt-16 grid md:grid-cols-2 gap-10 items-center relative">
        <DotCluster size={80} className="absolute -left-4 top-40 opacity-70" />

        <div className="relative z-10">
          <h1 className="font-display font-extrabold leading-[1.02] text-5xl md:text-7xl">
            Turning <OutlineBox>Ads</OutlineBox> Into
            <br />
            Actual Revenue
          </h1>
          <p className="mt-6 max-w-md text-[color:var(--color-muted)] text-base md:text-lg leading-relaxed">
            I&apos;m Himanshu Bhardwaj — FONSI. I run performance ads, grow brands,
            and design graphics & edit video that stop the scroll and move the numbers.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <PillButton href="#contact">Start a Project</PillButton>
            <a
              href="#work"
              className="inline-flex items-center gap-2 text-[color:var(--color-text)] font-medium hover:text-[color:var(--color-red)] transition-colors"
            >
              See My Work <ArrowRight size={18} />
            </a>
          </div>
        </div>

        <div className="relative min-h-[380px] md:min-h-[520px] flex items-center justify-center">
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center select-none"
          >
            <GhostText className="text-[clamp(6rem,16vw,14rem)] whitespace-nowrap">
              FONSI
            </GhostText>
          </div>

          <div className="relative z-10 w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden card-elevated flex items-center justify-center">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(229,28,35,0.35), transparent 70%)",
              }}
            />
            <div className="relative z-10 text-center px-6">
              <div className="font-display text-7xl md:text-8xl">🔥</div>
              <p className="mt-4 text-sm text-[color:var(--color-muted)]">
                Your hero image goes here
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
