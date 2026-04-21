import clsx from "clsx";

export default function PillButton({
  as: Tag = "a",
  variant = "red",
  href,
  children,
  className,
  ...rest
}) {
  return (
    <Tag
      href={href}
      className={clsx("pill", variant === "red" ? "pill-red" : "pill-outline", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
