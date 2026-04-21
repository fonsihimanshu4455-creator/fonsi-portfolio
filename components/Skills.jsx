"use client";

import { useState } from "react";
import SectionHeading from "./ui/SectionHeading";
import clsx from "clsx";

const SKILLS = [
  { id: "meta", label: "Meta Ads", display: "Meta Ads" },
  { id: "google", label: "Google Ads", display: "Google Ads" },
  { id: "design", label: "Graphic Design", display: "Graphic Design" },
  { id: "video", label: "Video Editing", display: "Video Editing" },
];

export default function Skills() {
  const [active, setActive] = useState("design");

  return (
    <section className="section">
      <SectionHeading>My Focus Areas</SectionHeading>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-4 max-w-sm">
          {SKILLS.map((s) => {
            const isActive = s.id === active;
            return (
              <button
                key={s.id}
                onMouseEnter={() => setActive(s.id)}
                onFocus={() => setActive(s.id)}
                onClick={() => setActive(s.id)}
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
            {SKILLS.map((s) => (
              <div
                key={s.id}
                className={clsx(
                  "font-display font-extrabold leading-[1.05] text-4xl md:text-6xl transition-colors",
                  s.id === active ? "ghost-text-solid" : "ghost-text"
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
