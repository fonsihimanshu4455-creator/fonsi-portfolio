import clsx from "clsx";
import DotCluster from "./DotCluster";

const SIZES = {
  xs: { dot: 20, text: "text-base" },
  sm: { dot: 24, text: "text-lg" },
  md: { dot: 30, text: "text-2xl" },
  lg: { dot: 40, text: "text-3xl" },
  xl: { dot: 56, text: "text-5xl" },
};

export default function Logo({
  size = "md",
  showWordmark = true,
  pulse = true,
  className,
  wordmarkClassName,
  as: Tag = "span",
}) {
  const s = SIZES[size] || SIZES.md;
  return (
    <Tag className={clsx("inline-flex items-center gap-2.5 select-none", className)}>
      <DotCluster size={s.dot} pulse={pulse} />
      {showWordmark && (
        <span
          className={clsx(
            "font-display font-extrabold tracking-[-0.03em] text-[color:var(--color-red)] leading-none",
            s.text,
            wordmarkClassName
          )}
        >
          FONSI
        </span>
      )}
    </Tag>
  );
}
