"use client";

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-[color:var(--color-muted)] mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-[color:var(--color-stroke)] bg-[color:var(--color-surface)] px-3 py-2 text-sm outline-none focus:border-[color:var(--color-red)]"
    />
  );
}

export function Textarea(props) {
  return (
    <textarea
      {...props}
      className="w-full rounded-lg border border-[color:var(--color-stroke)] bg-[color:var(--color-surface)] px-3 py-2 text-sm outline-none focus:border-[color:var(--color-red)] resize-y min-h-[80px]"
    />
  );
}

export function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full rounded-lg border border-[color:var(--color-stroke)] bg-[color:var(--color-surface)] px-3 py-2 text-sm outline-none focus:border-[color:var(--color-red)]"
    >
      {children}
    </select>
  );
}
