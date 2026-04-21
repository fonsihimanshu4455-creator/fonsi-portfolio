import SectionHeading from "./ui/SectionHeading";
import DotCluster from "./ui/DotCluster";

export default function Achievements({ headline, wins = [], characterUrl }) {
  return (
    <section className="section relative">
      {characterUrl && (
        <img
          src={characterUrl}
          alt=""
          aria-hidden="true"
          className="hidden lg:block absolute right-0 top-8 w-56 xl:w-64 pointer-events-none select-none drop-shadow-[0_20px_60px_rgba(229,28,35,0.35)] z-0"
        />
      )}
      <div className="grid md:grid-cols-2 gap-14 items-start relative z-10">
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
              {characterUrl && (
                <img
                  src={characterUrl}
                  alt=""
                  aria-hidden="true"
                  className="lg:hidden mt-6 w-40 drop-shadow-[0_10px_30px_rgba(229,28,35,0.35)]"
                />
              )}
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
