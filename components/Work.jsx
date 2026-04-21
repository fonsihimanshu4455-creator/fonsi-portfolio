import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import PillButton from "./ui/PillButton";

const PROJECTS = [
  {
    title: "D2C Skincare Brand",
    tag: "Meta Ads · Creative",
    blurb: "Scaled from 1.2x to 4.6x ROAS in 60 days with UGC-led creatives.",
    gradient: "from-[#ff6a88] via-[#ff99ac] to-[#fecfef]",
  },
  {
    title: "SaaS Growth Launch",
    tag: "Full Funnel · Google Ads",
    blurb: "$0 to $48K MRR in one quarter with a targeted search + retargeting funnel.",
    gradient: "from-[#8a5cf6] via-[#a78bfa] to-[#c4b5fd]",
  },
  {
    title: "Lifestyle Brand Reel",
    tag: "Video Editing",
    blurb: "3 reels averaging 1.2M organic views — hooks cut to the first 1.8s.",
    gradient: "from-[#fbbf24] via-[#fb923c] to-[#f87171]",
  },
  {
    title: "Local Fitness Studio",
    tag: "Design · Ads",
    blurb: "Rebranded creatives + lead-gen campaign — 3x qualified bookings.",
    gradient: "from-[#34d399] via-[#22d3ee] to-[#60a5fa]",
  },
];

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
        <div>
          <SectionHeading>Recent Work</SectionHeading>
          <p className="text-[color:var(--color-muted)] max-w-xl">
            A few of the brands I&apos;ve helped grow. Numbers over noise.
          </p>
        </div>
        <PillButton variant="outline" href="#more-work">
          Show All
        </PillButton>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {PROJECTS.map((p) => (
          <a
            key={p.title}
            href="#contact"
            className="group card-elevated rounded-2xl overflow-hidden hover:border-[color:var(--color-red)]/40 transition-colors"
          >
            <div
              className={`relative h-64 bg-gradient-to-br ${p.gradient} flex items-center justify-center`}
            >
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative font-display text-2xl text-white/90 font-bold drop-shadow">
                {p.title}
              </div>
            </div>
            <div className="p-6 flex items-start justify-between gap-4">
              <div>
                <div className="font-display text-lg font-bold">{p.title}</div>
                <div className="text-sm text-[color:var(--color-muted)] mt-1">{p.tag}</div>
                <p className="text-sm text-[color:var(--color-text)]/80 mt-3 leading-relaxed">
                  {p.blurb}
                </p>
              </div>
              <div className="w-10 h-10 shrink-0 rounded-full border border-[color:var(--color-stroke)] flex items-center justify-center group-hover:bg-[color:var(--color-red)] group-hover:border-[color:var(--color-red)] transition-colors">
                <ArrowUpRight size={16} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
