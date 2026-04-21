"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";
import PillButton from "./ui/PillButton";
import clsx from "clsx";

const FILTERS = ["All", "Ads", "Design", "Video"];

const ITEMS = [
  { title: "Supplement Brand", tag: "Ads", gradient: "from-[#6366f1] to-[#312e81]" },
  { title: "Fashion Reel Cut", tag: "Video", gradient: "from-[#f59e0b] to-[#b45309]" },
  { title: "Café Launch Kit", tag: "Design", gradient: "from-[#a78bfa] to-[#6d28d9]" },
  { title: "EdTech Funnel", tag: "Ads", gradient: "from-[#ec4899] to-[#831843]" },
  { title: "Product Explainer", tag: "Video", gradient: "from-[#10b981] to-[#065f46]" },
  { title: "Brand Starter Pack", tag: "Design", gradient: "from-[#38bdf8] to-[#0c4a6e]" },
];

export default function MoreWork() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? ITEMS : ITEMS.filter((i) => i.tag === active);

  return (
    <section id="more-work" className="section">
      <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
        <div>
          <SectionHeading>More Work</SectionHeading>
          <p className="text-[color:var(--color-muted)] max-w-xl">
            Campaigns, creatives and cuts across industries — filter to explore.
          </p>
        </div>
        <PillButton variant="outline" href="#contact">
          Show All
        </PillButton>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={clsx(
              "pill",
              active === f ? "pill-red" : "pill-outline"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.a
              key={p.title}
              href="#contact"
              layout
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group card-elevated rounded-2xl overflow-hidden hover:border-[color:var(--color-red)]/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div className={`h-44 bg-gradient-to-br ${p.gradient} transition-transform duration-500 group-hover:scale-105`} />
              <div className="p-5 flex items-start justify-between gap-3">
                <div>
                  <div className="font-display font-bold">{p.title}</div>
                  <div className="text-xs text-[color:var(--color-muted)] mt-1">{p.tag}</div>
                </div>
                <div className="w-9 h-9 shrink-0 rounded-full border border-[color:var(--color-stroke)] flex items-center justify-center group-hover:bg-[color:var(--color-red)] group-hover:border-[color:var(--color-red)] group-hover:rotate-45 transition-all duration-300">
                  <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
