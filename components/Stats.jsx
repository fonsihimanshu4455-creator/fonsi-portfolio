import DotCluster from "./ui/DotCluster";

const STATS = [
  { value: "100+", label: "Campaigns Run" },
  { value: "4.8x", label: "Average ROAS" },
  { value: "3+", label: "Years Experience" },
  { value: "24/7", label: "Client Support" },
];

export default function Stats() {
  return (
    <section className="border-y border-[color:var(--color-stroke)]">
      <div className="section py-14 md:py-16">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <DotCluster size={56} className="hidden md:block" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14 flex-1">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-baseline gap-3">
                <div className="font-display text-4xl md:text-5xl font-extrabold text-[color:var(--color-text)]">
                  {s.value}
                </div>
                <div className="text-sm text-[color:var(--color-muted)] leading-tight max-w-[7rem]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <DotCluster size={56} className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}
