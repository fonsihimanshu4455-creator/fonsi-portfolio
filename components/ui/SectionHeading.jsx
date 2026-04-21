import DotCluster from "./DotCluster";

export default function SectionHeading({ children, eyebrow, align = "left" }) {
  const alignCls = align === "center" ? "items-center text-center" : "items-start";
  return (
    <div className={`flex flex-col ${alignCls} gap-3 mb-10`}>
      {eyebrow && (
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-[color:var(--color-muted)]">
          {eyebrow}
        </span>
      )}
      <div className="flex items-center gap-3">
        <h2 className="font-display text-4xl md:text-5xl font-700 font-bold leading-[1.05]">
          {children}
        </h2>
        <DotCluster size={34} />
      </div>
    </div>
  );
}
