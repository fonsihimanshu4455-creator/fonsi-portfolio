"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import clsx from "clsx";

const TESTIMONIALS = [
  {
    name: "Aarav Mehta",
    ago: "2 days ago",
    rating: 5,
    quote:
      "FONSI rebuilt our ad creatives and funnel from scratch. We went from 1.2x to 4x ROAS in under two months. Communication was sharp, no fluff.",
    avatar: "A",
    color: "#ef4444",
  },
  {
    name: "Priya Sharma",
    ago: "1 week ago",
    rating: 5,
    quote:
      "Himanshu gets performance marketing AND design. Rare combo. Our reels started hitting six-figure views consistently.",
    avatar: "P",
    color: "#8b5cf6",
  },
  {
    name: "Rohan Kapoor",
    ago: "3 weeks ago",
    rating: 5,
    quote:
      "Launched our D2C brand with FONSI. Clear numbers, clear reporting, and creatives that actually moved the needle.",
    avatar: "R",
    color: "#10b981",
  },
  {
    name: "Sneha Iyer",
    ago: "1 month ago",
    rating: 5,
    quote:
      "He treats your money like his own. Scaled our local studio with a lean budget — 3x qualified leads in one quarter.",
    avatar: "S",
    color: "#f59e0b",
  },
  {
    name: "Kabir Joshi",
    ago: "2 months ago",
    rating: 5,
    quote:
      "Best creative + paid combo I've worked with. Hooks are tight, edits are clean, and reporting is brutally honest.",
    avatar: "K",
    color: "#06b6d4",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(2);

  const prev = () => setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setIdx((i) => (i + 1) % TESTIMONIALS.length);

  const order = [
    (idx - 1 + TESTIMONIALS.length) % TESTIMONIALS.length,
    idx,
    (idx + 1) % TESTIMONIALS.length,
  ];

  return (
    <section className="section">
      <SectionHeading>Experiences That Inspire</SectionHeading>

      <div className="flex justify-center flex-wrap gap-3 mb-10">
        {TESTIMONIALS.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setIdx(i)}
            aria-label={`Select testimonial from ${t.name}`}
            className={clsx(
              "w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all",
              i === idx
                ? "ring-2 ring-[color:var(--color-red)] ring-offset-4 ring-offset-[color:var(--color-bg)] scale-110"
                : "opacity-70 hover:opacity-100"
            )}
            style={{ background: t.color }}
          >
            {t.avatar}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-5 items-stretch">
        {order.map((i, slot) => {
          const t = TESTIMONIALS[i];
          const isCenter = slot === 1;
          return (
            <div
              key={`${t.name}-${slot}`}
              className={clsx(
                "rounded-2xl p-6 card-elevated",
                isCenter && "border-[color:var(--color-red)]/70",
                !isCenter && "opacity-60 hidden md:block"
              )}
            >
              <div className="flex items-baseline gap-2 mb-3">
                <div className="font-display font-bold">{t.name}</div>
                <div className="text-xs text-[color:var(--color-muted)]">{t.ago}</div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: t.rating }).map((_, si) => (
                  <Star key={si} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-sm font-medium ml-1">{t.rating.toFixed(1)}</span>
              </div>
              <p className="text-sm text-[color:var(--color-text)]/85 leading-relaxed">
                {t.quote}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3 mt-10">
        <button
          onClick={prev}
          aria-label="Previous"
          className="w-11 h-11 rounded-full border border-[color:var(--color-stroke)] flex items-center justify-center hover:border-[color:var(--color-red)] transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="w-11 h-11 rounded-full bg-[color:var(--color-red)] hover:bg-[color:var(--color-red-hot)] flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
