import DotCluster from "./ui/DotCluster";
import { Stagger, StaggerItem } from "./ui/Reveal";

export default function Stats({ data = [] }) {
  return (
    <section className="border-y border-[color:var(--color-stroke)]">
      <div className="section py-14 md:py-16">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <DotCluster size={56} className="hidden md:block" />

          <Stagger className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14 flex-1">
            {data.map((s) => (
              <StaggerItem key={s.id || s.label} className="flex items-baseline gap-3">
                <div className="font-display text-4xl md:text-5xl font-extrabold text-[color:var(--color-text)]">
                  {s.value}
                </div>
                <div className="text-sm text-[color:var(--color-muted)] leading-tight max-w-[7rem]">
                  {s.label}
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <DotCluster size={56} className="hidden md:block" />
        </div>
      </div>
    </section>
  );
}
