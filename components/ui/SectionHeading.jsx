import DotCluster from "./DotCluster";
import { Reveal } from "./Reveal";

export default function SectionHeading({ children, eyebrow, align = "left" }) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start";
  return (
    <Reveal>
      <div className={`flex flex-col ${alignCls} gap-3 mb-10`}>
        {eyebrow && (
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
            {eyebrow}
          </span>
        )}
        <div className="flex items-center gap-3">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.05]">
            {children}
          </h2>
          <DotCluster size={28} className="sm:w-8 sm:h-8" />
        </div>
      </div>
    </Reveal>
  );
}
