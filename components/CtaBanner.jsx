"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import OutlineBox from "./ui/OutlineBox";

export default function CtaBanner() {
  const [email, setEmail] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent("Let's build something with FONSI");
    const body = encodeURIComponent(`Hi Himanshu, I'd like to connect. My email: ${email}`);
    window.location.href = `mailto:hello@fonsi.co?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section">
      <div className="relative overflow-hidden rounded-3xl card-elevated p-8 md:p-14">
        <div
          aria-hidden="true"
          className="absolute -right-20 top-0 bottom-0 w-[40%] pointer-events-none"
          style={{
            background:
              "radial-gradient(closest-side, rgba(229,28,35,0.35), transparent 70%)",
          }}
        />

        <div className="relative grid md:grid-cols-[1.4fr_1fr] gap-10 items-center">
          <div>
            <h3 className="font-display font-extrabold text-4xl md:text-6xl leading-[1.05]">
              Let&apos;s Build
              <br />
              Something <OutlineBox>Amazing</OutlineBox>
            </h3>
            <p className="mt-5 text-[color:var(--color-muted)] max-w-md">
              Tell me about your brand, your offer, and where you&apos;re stuck.
              I&apos;ll come back with a no-fluff plan.
            </p>

            <form onSubmit={onSubmit} className="mt-7 flex items-center gap-2 max-w-md">
              <div className="flex-1 flex items-center gap-2 rounded-full border border-[color:var(--color-stroke)] bg-[color:var(--color-surface)] pl-5 pr-1 py-1">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="bg-transparent flex-1 py-2 text-sm outline-none text-[color:var(--color-text)] placeholder:text-[color:var(--color-muted)]"
                />
                <button
                  type="submit"
                  aria-label="Send"
                  className="w-9 h-9 rounded-full bg-[color:var(--color-red)] hover:bg-[color:var(--color-red-hot)] flex items-center justify-center text-white transition-colors"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>

          <div className="relative flex items-center justify-center min-h-[240px]">
            <div className="relative w-48 h-56 md:w-60 md:h-72 rounded-3xl overflow-hidden flex items-center justify-center">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(255,45,53,0.45), transparent 70%)",
                }}
              />
              <div className="relative text-7xl">🚀</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
