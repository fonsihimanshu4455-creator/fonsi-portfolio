import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import PillButton from "./ui/PillButton";
import { Stagger, StaggerItem } from "./ui/Reveal";

export default function Work({ data = [] }) {
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

      <Stagger className="grid md:grid-cols-2 gap-5">
        {data.map((p) => (
          <StaggerItem key={p.id || p.title}>
            <a
              href={p.case_study_slug ? `/case-studies/${p.case_study_slug}` : (p.link || "#contact")}
              className="group block card-elevated rounded-2xl overflow-hidden hover:border-[color:var(--color-red)]/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`relative h-64 ${p.image_url ? "" : `bg-gradient-to-br ${p.gradient || "from-[#3b0a0f] to-[#1e1012]"}`} flex items-center justify-center overflow-hidden`}
                style={p.image_url ? { backgroundImage: `url(${p.image_url})`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                <div className="relative font-display text-2xl text-white/90 font-bold drop-shadow transition-transform duration-500 group-hover:scale-105">
                  {p.title}
                </div>
              </div>
              <div className="p-6 flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-lg font-bold">{p.title}</div>
                  <div className="text-sm text-[color:var(--color-muted)] mt-1">{p.category}</div>
                  <p className="text-sm text-[color:var(--color-text)]/80 mt-3 leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="w-10 h-10 shrink-0 rounded-full border border-[color:var(--color-stroke)] flex items-center justify-center group-hover:bg-[color:var(--color-red)] group-hover:border-[color:var(--color-red)] group-hover:rotate-45 transition-all duration-300">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </a>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}
