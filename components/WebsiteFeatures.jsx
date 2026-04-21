import SectionHeading from "./ui/SectionHeading";
import { Stagger, StaggerItem } from "./ui/Reveal";
import { getIcon } from "@/lib/icons";

export default function WebsiteFeatures({ data = [] }) {
  if (data.length === 0) return null;

  return (
    <section id="websites" className="section">
      <SectionHeading>Why My Websites Outperform</SectionHeading>
      <p className="text-[color:var(--color-muted)] max-w-xl mb-10">
        Every site I build is engineered to rank, load fast, and convert visitors into customers.
      </p>

      <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((f) => {
          const Icon = getIcon(f.icon_name);
          return (
            <StaggerItem
              key={f.id || f.title}
              className="card-elevated rounded-2xl p-6 group hover:border-[color:var(--color-red)]/50 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(229,28,35,0.5)] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[color:var(--color-red)]/15 text-[color:var(--color-red)] flex items-center justify-center mb-5 group-hover:bg-[color:var(--color-red)] group-hover:text-white transition-colors">
                <Icon size={22} />
              </div>
              <h3 className="font-display text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-[color:var(--color-muted)] leading-relaxed">
                {f.description}
              </p>
            </StaggerItem>
          );
        })}
      </Stagger>
    </section>
  );
}
