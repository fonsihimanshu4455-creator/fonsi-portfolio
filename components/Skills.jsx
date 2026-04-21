"use client";

import { useState } from "react";
import SectionHeading from "./ui/SectionHeading";
import clsx from "clsx";

export default function Skills({ data = [] }) {
  const [active, setActive] = useState(0);

  if (data.length === 0) return null;

  return (
    <section className="section">
      <SectionHeading>My Focus Areas</SectionHeading>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4 max-w-sm">
          {data.map((s, i) => {
            const isActive = i === active;
            return (
              <button
                key={s.id || s.label}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={clsx(
                  "text-left pill justify-start px-5",
                  isActive
                    ? "border border-[color:var(--color-red)] text-[color:var(--color-red)]"
                    : "pill-outline"
                )}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[220px] md:min-h-[320px] flex items-center">
          <div className="flex flex-col gap-3 md:gap-4 w-full">
            {data.map((s, i) => (
              <div
                key={s.id || s.label}
                className={clsx(
                  "font-display font-extrabold leading-[1.05] text-4xl md:text-6xl transition-colors",
                  i === active ? "ghost-text-solid" : "ghost-text"
                )}
              >
                {s.display}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
