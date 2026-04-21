"use client";

import { motion } from "framer-motion";
import SectionHeading from "./ui/SectionHeading";

export default function Process({ data = [] }) {
  return (
    <section id="about" className="section">
      <SectionHeading>My Process</SectionHeading>
      <p className="text-[color:var(--color-muted)] max-w-xl mb-16">
        A simple four-step flow I run with every client — big or small.
      </p>

      <div className="relative">
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          className="hidden md:block absolute inset-0 w-full h-full pointer-events-none"
        >
          <path
            d="M 120 90 Q 300 -20 500 120 T 900 120 Q 1050 200 1100 220"
            fill="none"
            stroke="rgba(229,28,35,0.65)"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="marching"
          />
        </svg>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
        >
          {data.map((s) => (
            <motion.div
              key={s.id || s.step_number}
              className="flex gap-4"
              variants={{
                hidden: { opacity: 0, y: 22 },
                show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
              }}
            >
              <div className="shrink-0 w-10 h-10 rounded-md border border-[color:var(--color-red)] text-[color:var(--color-red)] flex items-center justify-center font-display font-bold">
                {s.step_number}
              </div>
              <div>
                <div className="font-display text-lg font-bold">{s.title}</div>
                <p className="text-sm text-[color:var(--color-muted)] mt-2 leading-relaxed">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
