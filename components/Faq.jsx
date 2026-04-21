"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import clsx from "clsx";

const FAQS = [
  {
    q: "What size of business do you work with?",
    a: "I work with solo founders, D2C brands, and small-to-mid businesses — typically when monthly ad spend is between ₹50k and ₹10L. If your model is clear and your offer is solid, I can help scale it.",
  },
  {
    q: "Do you only run ads, or also create the creatives?",
    a: "Both. That's actually my edge — creative-led performance. I design the ads, cut the video, and run the media buying in-house. No handoffs, no 'we'll coordinate with the designer'.",
  },
  {
    q: "What's your pricing model?",
    a: "Monthly retainer for ongoing performance work (ads + creative), or project-based for design/video sprints. I share a clear scope and deliverables before any invoice — no surprises.",
  },
  {
    q: "How soon can I expect results?",
    a: "First 2 weeks = audit, setup, testing. Weeks 3–6 we optimize what's working and kill what isn't. Most clients see meaningful lift in ROAS by week 6, real scale by week 10–12.",
  },
  {
    q: "Which industries do you work with most?",
    a: "D2C (skincare, fashion, supplements), SaaS/info products, and local service businesses (fitness, coaching, F&B). Deep playbooks for each.",
  },
  {
    q: "Do you sign contracts and NDAs?",
    a: "Yes to both. Standard 3-month minimum engagement on retainers so the work has time to show results. Month-to-month after that.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section className="section">
      <SectionHeading>Frequently Asked</SectionHeading>
      <p className="text-[color:var(--color-muted)] max-w-xl mb-10">
        Quick answers to what most people ask before we start working together.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={clsx(
                "card-elevated rounded-2xl overflow-hidden transition-colors",
                isOpen && "border-[color:var(--color-red)]/50"
              )}
            >
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display font-bold text-base md:text-lg">{f.q}</span>
                <span
                  className={clsx(
                    "shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300",
                    isOpen
                      ? "bg-[color:var(--color-red)] border-[color:var(--color-red)] rotate-45 text-white"
                      : "border-[color:var(--color-stroke)]"
                  )}
                >
                  <Plus size={16} />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-[color:var(--color-muted)] leading-relaxed">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
