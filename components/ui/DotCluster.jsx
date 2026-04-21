import clsx from "clsx";

const PATTERN = [
  [2, 0], [3, 0],
  [1, 1], [2, 1], [3, 1], [4, 1],
  [0, 2], [1, 2], [2, 2], [3, 2], [4, 2], [5, 2],
  [1, 3], [2, 3], [3, 3], [4, 3],
  [2, 4], [3, 4],
];

export default function DotCluster({ size = 56, color = "var(--color-red)", className }) {
  const cell = size / 6;
  const r = cell * 0.35;
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={clsx("inline-block shrink-0", className)}
      aria-hidden="true"
    >
      {PATTERN.map(([x, y], i) => (
        <circle
          key={i}
          cx={x * cell + cell / 2}
          cy={y * cell + cell / 2}
          r={r}
          fill={color}
        />
      ))}
    </svg>
  );
}
