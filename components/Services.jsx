import { Megaphone, TrendingUp, Palette, Film } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";

const SERVICES = [
  {
    icon: Megaphone,
    title: "Paid Ads",
    desc: "Meta & Google campaigns built around real buyer intent. Creatives that convert, funnels that scale.",
  },
  {
    icon: TrendingUp,
    title: "Growth Strategy",
    desc: "End-to-end marketing plans — offer, audience, channels, metrics. From first $1 to first $100K.",
  },
  {
    icon: Palette,
    title: "Graphic Design",
    desc: "Ad creatives, brand kits, social posts. Clean, conversion-led, scroll-stopping visual work.",
  },
  {
    icon: Film,
    title: "Video Editing",
    desc: "UGC edits, reels, product videos. Punchy cuts with hooks that hold attention to the CTA.",
  },
];

export default function Services() {
  return (
    <section id="services" className="section">
      <SectionHeading>What I Do</SectionHeading>
      <p className="text-[color:var(--color-muted)] max-w-xl mb-10">
        Four services, one mission — making your brand grow in numbers you can measure.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SERVICES.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="card-elevated rounded-2xl p-6 group hover:border-[color:var(--color-red)]/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-[color:var(--color-red)]/15 text-[color:var(--color-red)] flex items-center justify-center mb-5 group-hover:bg-[color:var(--color-red)] group-hover:text-white transition-colors">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-[color:var(--color-muted)] leading-relaxed">
                {s.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
