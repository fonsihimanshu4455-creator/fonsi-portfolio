"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

const STEPS = [
  {
    n: "1",
    title: "Discover",
    desc: "Audit your brand, offer, audience and numbers. Find the real bottleneck.",
  },
  {
    n: "2",
    title: "Strategy",
    desc: "Map the funnel, channels, creatives and KPIs. Zero fluff, clear plan.",
  },
  {
    n: "3",
    title: "Execute",
    desc: "Ads live, creatives shipped, video cut. Daily eyes on the dashboard.",
  },
  {
    n: "4",
    title: "Scale",
    desc: "Double down on what works, kill what doesn't. ROAS up, CAC down.",
  },
];

export default function Process() {
  return (
    <section id="about" className="section">
      <SectionHeading>My Process</SectionHeading>
      <p className="text-[color:var(--color-muted)] max-w-xl mb-16">
        A simple four-step flow I run with every client — big or small.
      </p>

      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="hidden lg:block absolute left-0 right-0 top-[-40px] w-full h-[200px] pointer-events-none"
        >
          <defs>
            <filter id="pathGlow" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="pathGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ff2d35" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#ff2d35" stopOpacity="1" />
              <stop offset="100%" stopColor="#ff2d35" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <motion.path
            d="M 60 120 C 160 30, 280 30, 380 120 S 580 210, 680 120 S 880 30, 980 120 S 1180 210, 1280 120"
            fill="none"
            stroke="url(#pathGrad)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="10 8"
            filter="url(#pathGlow)"
            className="marching"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
          }}
        >
          {STEPS.map((s) => (
            <motion.div
              key={s.n}
              className="flex gap-4"
              variants={{
                hidden: { opacity: 0, y: 24 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
              }}
            >
              <div className="shrink-0 w-10 h-10 rounded-md border-2 border-[color:var(--color-red)] text-[color:var(--color-red)] flex items-center justify-center font-display font-bold shadow-[0_0_20px_-4px_rgba(229,28,35,0.6)]">
                {s.n}
              </div>
              <div>
                <div className="font-display text-lg font-bold">{s.title}</div>
                <p className="text-sm text-[color:var(--color-muted)] mt-2 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
