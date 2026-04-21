import SectionHeading from "./ui/SectionHeading";
import DotCluster from "./ui/DotCluster";

const WINS = [
  {
    n: "1",
    title: "Scaling Brands Beyond 7 Figures",
    desc: "Multiple e-com clients crossed ₹1Cr+ in monthly revenue with my campaigns.",
  },
  {
    n: "2",
    title: "Creative-First Performance",
    desc: "In-house creatives consistently outperforming agency-made ads by 2–3x.",
  },
  {
    n: "3",
    title: "Retention Over Spray & Pray",
    desc: "Built retention funnels that lift LTV so every rupee of ad spend earns more.",
  },
];

export default function Achievements() {
  return (
    <section className="section">
      <div className="grid md:grid-cols-2 gap-14 items-start">
        <div>
          <SectionHeading>Achievements</SectionHeading>
          <div className="flex items-start gap-4 mt-2">
            <div className="font-display font-extrabold text-[8rem] md:text-[10rem] leading-none text-[color:var(--color-red)]">
              20
              <span className="text-[color:var(--color-red-hot)]">+</span>
            </div>
            <DotCluster size={64} className="mt-10" />
          </div>
          <p className="text-[color:var(--color-muted)] mt-4 max-w-md">
            Brands grown across e-com, SaaS, and local services since I started FONSI.
          </p>
        </div>

        <div className="flex flex-col gap-6 md:mt-8">
          {WINS.map((w) => (
            <div key={w.n} className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-md border border-[color:var(--color-red)] text-[color:var(--color-red)] flex items-center justify-center font-display font-bold">
                {w.n}
              </div>
              <div>
                <div className="font-display text-lg font-bold">{w.title}</div>
                <p className="text-sm text-[color:var(--color-muted)] mt-2 leading-relaxed">
                  {w.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
