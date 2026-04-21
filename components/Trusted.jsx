const BRANDS = [
  "LUMEN",
  "NOVA",
  "VERTEX",
  "HALO",
  "KINETIC",
  "PULSE",
  "ORBIT",
  "FORGE",
  "ZENITH",
  "ECHO",
];

export default function Trusted() {
  const loop = [...BRANDS, ...BRANDS];

  return (
    <section className="border-y border-[color:var(--color-stroke)] py-10 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 mb-6">
        <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-muted)]">
          Trusted by brands that care about numbers
        </p>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max gap-8 sm:gap-14 whitespace-nowrap">
          {loop.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[color:var(--color-text)]/35 hover:text-[color:var(--color-red)] transition-colors"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
