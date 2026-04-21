import SectionHeading from "./ui/SectionHeading";
import DotCluster from "./ui/DotCluster";

export default function Achievements({ headline, wins = [] }) {
  return (
    <section className="section">
      <div className="grid md:grid-cols-2 gap-14 items-start">
        <div>
          <SectionHeading>Achievements</SectionHeading>
          {headline && (
            <>
              <div className="flex items-start gap-4 mt-2">
                <div className="font-display font-extrabold text-[8rem] md:text-[10rem] leading-none text-[color:var(--color-red)]">
                  {headline.number}
                  <span className="text-[color:var(--color-red-hot)]">+</span>
                </div>
                <DotCluster size={64} className="mt-10" />
              </div>
              <p className="text-[color:var(--color-muted)] mt-4 max-w-md">
                {headline.description}
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col gap-6 md:mt-8">
          {wins.map((w, i) => (
            <div key={w.id || i} className="flex gap-4">
              <div className="shrink-0 w-10 h-10 rounded-md border border-[color:var(--color-red)] text-[color:var(--color-red)] flex items-center justify-center font-display font-bold">
                {i + 1}
              </div>
              <div>
                <div className="font-display text-lg font-bold">{w.label}</div>
                <p className="text-sm text-[color:var(--color-muted)] mt-2 leading-relaxed">
                  {w.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
