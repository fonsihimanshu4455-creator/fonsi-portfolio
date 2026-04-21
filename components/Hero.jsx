"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PillButton from "./ui/PillButton";
import OutlineBox from "./ui/OutlineBox";
import GhostText from "./ui/GhostText";
import DotCluster from "./ui/DotCluster";

const EASE = [0.22, 1, 0.36, 1];

export default function Hero({ data }) {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="section pt-10 md:pt-16 grid md:grid-cols-2 gap-10 items-center relative">
        <motion.div
          className="absolute -left-4 top-40 opacity-70"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
        >
          <DotCluster size={80} />
        </motion.div>

        <div className="relative z-10">
          <motion.h1
            className="font-display font-extrabold leading-[1.02] text-5xl md:text-7xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {data.heading_prefix}
            <OutlineBox>{data.heading_highlight}</OutlineBox>
            {data.heading_suffix?.includes("\n") ? (
              <>
                {data.heading_suffix.split("\n").map((s, i, arr) => (
                  <span key={i}>
                    {s}
                    {i < arr.length - 1 && <br />}
                  </span>
                ))}
              </>
            ) : (
              <>
                <br />
                {data.heading_suffix?.trimStart()}
              </>
            )}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-md text-[color:var(--color-muted)] text-base md:text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            {data.subheading}
            {data.global_line && (
              <span className="block mt-3 text-sm text-[color:var(--color-text)]/70">
                {data.global_line}
              </span>
            )}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          >
            <PillButton href={data.cta_primary_link || "#contact"}>
              {data.cta_primary_text || "Start a Project"}
            </PillButton>
            <a
              href={data.cta_secondary_link || "#work"}
              className="group inline-flex items-center gap-2 text-[color:var(--color-text)] font-medium hover:text-[color:var(--color-red)] transition-colors"
            >
              {data.cta_secondary_text || "See My Work"}
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
          </motion.div>
        </div>

        <motion.div
          className="relative min-h-[380px] md:min-h-[520px] flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center select-none"
          >
            <GhostText className="text-[clamp(6rem,16vw,14rem)] whitespace-nowrap">
              FONSI
            </GhostText>
          </div>

          <div className="relative z-10 w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden card-elevated flex items-center justify-center">
            <div
              className="absolute inset-0 glow-breath"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(229,28,35,0.35), transparent 70%)",
              }}
            />
            <div className="relative z-10 text-center px-6">
              <motion.div
                aria-hidden="true"
                className="font-display text-7xl md:text-8xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                🔥
              </motion.div>
              <p className="mt-4 text-sm text-[color:var(--color-muted)]">
                Your hero image goes here
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
