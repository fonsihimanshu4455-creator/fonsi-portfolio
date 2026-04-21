import clsx from "clsx";

export default function GhostText({ children, className, solid = false }) {
  return (
    <span className={clsx("ghost-text", solid && "ghost-text-solid", className)}>{children}</span>
  );
}
