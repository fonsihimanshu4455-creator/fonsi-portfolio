import SectionHeading from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";
import { getIcon } from "@/lib/icons";

export default function Services({ data = [] }) {
  return (
    <section id="services" className="section">
      <SectionHeading>What I Do</SectionHeading>
      <p className="text-[color:var(--color-muted)] max-w-xl mb-10">
        Four services, one mission — making your brand grow in numbers you can measure.
      </p>

      <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {data.map((s) => {
          const Icon = getIcon(s.icon_name);
          return (
            <StaggerItem
              key={s.id || s.title}
              className="card-elevated rounded-2xl p-6 group hover:border-[color:var(--color-red)]/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[color:var(--color-red)]/15 text-[color:var(--color-red)] flex items-center justify-center mb-5 group-hover:bg-[color:var(--color-red)] group-hover:text-white transition-colors">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-[color:var(--color-muted)] leading-relaxed">
                {s.description}
              </p>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
