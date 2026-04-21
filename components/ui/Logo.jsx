import clsx from "clsx";
import DotCluster from "./DotCluster";

const SIZES = {
  xs: { dot: 20, text: "text-base", dotAccent: 3, img: 22 },
  sm: { dot: 26, text: "text-lg", dotAccent: 4, img: 28 },
  md: { dot: 32, text: "text-2xl", dotAccent: 5, img: 34 },
  lg: { dot: 42, text: "text-3xl", dotAccent: 6, img: 44 },
  xl: { dot: 58, text: "text-5xl", dotAccent: 8, img: 60 },
};

export default function Logo({
  size = "md",
  showWordmark = true,
  wordmark = "FONSI",
  imageUrl,
  pulse = true,
  className,
  wordmarkClassName,
  as: Tag = "span",
}) {
  const s = SIZES[size] || SIZES.md;

  // Custom logo image takes over entire mark
  if (imageUrl) {
    return (
      <Tag className={clsx("inline-flex items-center select-none group", className)}>
        <img
          src={imageUrl}
          alt={wordmark || "Logo"}
          style={{ height: s.img }}
          className="w-auto object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_14px_rgba(229,28,35,0.35)]"
        />
      </Tag>
    );
  }

  return (
    <Tag className={clsx("inline-flex items-center gap-2.5 select-none group", className)}>
      <span
        className="inline-flex shrink-0 transition-[filter,transform] duration-300 group-hover:scale-[1.06]"
        style={{
          filter:
            "drop-shadow(0 0 6px rgba(255,45,53,0.35)) drop-shadow(0 0 14px rgba(229,28,35,0.25))",
        }}
      >
        <DotCluster size={s.dot} pulse={pulse} />
      </span>
      {showWordmark && wordmark && (
        <span
          className={clsx(
            "font-display font-extrabold tracking-[-0.035em] leading-none inline-flex items-end gap-[0.15em]",
            s.text,
            wordmarkClassName
          )}
        >
          <span className="text-[color:var(--color-red)] [text-shadow:0_0_18px_rgba(229,28,35,0.35)]">
            {wordmark}
          </span>
          <span
            aria-hidden="true"
            className="rounded-full bg-[color:var(--color-red-hot)] translate-y-[0.08em] shadow-[0_0_8px_rgba(255,45,53,0.75)]"
            style={{ width: s.dotAccent, height: s.dotAccent }}
          />
        </span>
      )}
    </Tag>
  );
}
