"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import clsx from "clsx";

const COLORS = ["#ef4444", "#8b5cf6", "#10b981", "#f59e0b", "#06b6d4", "#ec4899"];

export default function Testimonials({ data = [] }) {
  const [idx, setIdx] = useState(Math.min(2, Math.max(0, data.length - 1)));

  if (data.length === 0) return null;

  const prev = () => setIdx((i) => (i - 1 + data.length) % data.length);
  const next = () => setIdx((i) => (i + 1) % data.length);

  const order = data.length >= 3
    ? [(idx - 1 + data.length) % data.length, idx, (idx + 1) % data.length]
    : [idx];

  return (
    <section className="section">
      <SectionHeading>Experiences That Inspire</SectionHeading>

      <div className="flex justify-center flex-wrap gap-3 mb-10">
        {data.map((t, i) => (
          <button
            key={t.id || t.name}
            onClick={() => setIdx(i)}
            aria-label={`Select testimonial from ${t.name}`}
            className={clsx(
              "w-12 h-12 rounded-full overflow-hidden flex items-center justify-center font-bold text-white transition-all",
              i === idx
                ? "ring-2 ring-[color:var(--color-red)] ring-offset-4 ring-offset-[color:var(--color-bg)] scale-110"
                : "opacity-70 hover:opacity-100"
            )}
            style={{
              background: t.photo_url ? "#000" : COLORS[i % COLORS.length],
              backgroundImage: t.photo_url ? `url(${t.photo_url})` : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!t.photo_url && t.name?.[0]}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-5 items-stretch">
        {order.map((i, slot) => {
          const t = data[i];
          const isCenter = data.length >= 3 ? slot === 1 : true;
          return (
            <div
              key={`${t.id || t.name}-${slot}`}
              className={clsx(
                "rounded-2xl p-6 card-elevated",
                isCenter && "border-[color:var(--color-red)]/70",
                !isCenter && "opacity-60 hidden md:block"
              )}
            >
              <div className="flex items-baseline gap-2 mb-3">
                <div className="font-display font-bold">{t.name}</div>
                <div className="text-xs text-[color:var(--color-muted)]">{t.days_ago}</div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                {Array.from({ length: Math.round(t.rating) }).map((_, si) => (
                  <Star key={si} size={14} className="text-yellow-400 fill-yellow-400" />
                ))}
                <span className="text-sm font-medium ml-1">{Number(t.rating).toFixed(1)}</span>
              </div>
              <p className="text-sm text-[color:var(--color-text)]/85 leading-relaxed">
                {t.review_text}
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
