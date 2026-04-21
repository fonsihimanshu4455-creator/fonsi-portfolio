import SectionHeading from "./ui/SectionHeading";

const STEPS = [
  {
    n: "1",
    title: "Discover",
    desc: "Audit your brand, offer, audience and numbers. Find the real bottleneck.",
  },
  {
    n: "2",
    title: "Strategy",
    desc: "Map the funnel, channels, creatives and KPIs. Zero fluff, clear plan.",
  },
  {
    n: "3",
    title: "Execute",
    desc: "Ads live, creatives shipped, video cut. Daily eyes on the dashboard.",
  },
  {
    n: "4",
    title: "Scale",
    desc: "Double down on what works, kill what doesn't. ROAS up, CAC down.",
  },
];

export default function Process() {
  return (
    <section id="about" className="section">
      <SectionHeading>My Process</SectionHeading>
      <p className="text-[color:var(--color-muted)] max-w-xl mb-12">
        A simple four-step flow I run with every client — big or small.
      </p>

      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
        >
          <path
            d="M 120 90 Q 300 -20 500 120 T 900 120 Q 1050 200 1100 220"
            fill="none"
            stroke="rgba(229,28,35,0.35)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        </svg>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {STEPS.map((s) => (
            <div key={s.n} className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-md border border-[color:var(--color-red)] text-[color:var(--color-red)] flex items-center justify-center font-display font-bold">
                {s.n}
              </div>
              <div>
                <div className="font-display text-lg font-bold">{s.title}</div>
                <p className="text-sm text-[color:var(--color-muted)] mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
