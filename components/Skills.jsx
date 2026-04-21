"use client";

import { useState } from "react";
import SectionHeading from "./ui/SectionHeading";
import clsx from "clsx";
import { characterStyle } from "@/lib/characterStyle";

export default function Skills({ data = [], characterUrl, characterSettings }) {
  const [active, setActive] = useState(0);

  if (data.length === 0) return null;

  return (
    <section className="section relative">
      <SectionHeading>My Focus Areas</SectionHeading>

      {characterUrl && (
        <img
          src={characterUrl}
          alt=""
          aria-hidden="true"
          style={characterStyle(characterSettings)}
          className="hidden md:block absolute right-0 bottom-0 w-56 lg:w-64 pointer-events-none select-none opacity-90 drop-shadow-[0_20px_60px_rgba(229,28,35,0.35)] z-0"
        />
      )}

      <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
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
