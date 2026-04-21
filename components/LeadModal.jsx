"use client";

import { useEffect, useState } from "react";
import { X, Send, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { createClient } from "@/lib/supabase/client";
import { useLead } from "./LeadContext";
import OutlineBox from "./ui/OutlineBox";

const SERVICES = [
  "Digital Ads",
  "Website Development",
  "SEO",
  "Google My Business",
  "Graphic Design",
  "Video Editing",
  "Not sure yet",
];

const BUDGETS = [
  "Under $500 / month",
  "$500 – $2,000 / month",
  "$2,000 – $5,000 / month",
  "$5,000+ / month",
  "One-time project",
  "Let's discuss",
];

export default function LeadModal() {
  const { open, preset, closeForm } = useLead();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open && preset) setForm((f) => ({ ...f, service: preset }));
  }, [open, preset]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSuccess(false);
        setError("");
        setForm({ name: "", email: "", phone: "", service: "", budget: "", message: "" });
      }, 300);
    }
  }, [open]);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && closeForm();
    if (open) window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [open, closeForm]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const supabase = createClient();
    if (!supabase) {
      setError("Form submission is temporarily unavailable. Please email hello@fonsi.co directly.");
      setSubmitting(false);
      return;
    }

    const payload = {
      ...form,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
      referrer: typeof document !== "undefined" ? document.referrer || null : null,
    };

    const { error: err } = await supabase.from("leads").insert(payload);
    if (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setSubmitting(false);
      return;
    }

    // Fire-and-forget email notification; ignore failures
    fetch("/api/notify-lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});

    setSubmitting(false);
    setSuccess(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeForm}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            key="panel"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed z-50 top-0 right-0 h-full w-full sm:max-w-lg bg-[color:var(--color-bg)] border-l border-[color:var(--color-stroke)] shadow-2xl overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Contact form"
          >
            <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-[color:var(--color-stroke)] bg-[color:var(--color-bg)]/90 backdrop-blur">
              <h2 className="font-display text-xl font-extrabold">
                Let&apos;s <OutlineBox>Talk</OutlineBox>
              </h2>
              <button
                onClick={closeForm}
                aria-label="Close"
                className="w-9 h-9 rounded-full border border-[color:var(--color-stroke)] flex items-center justify-center hover:border-[color:var(--color-red)] transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {success ? (
              <div className="p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[color:var(--color-red)] flex items-center justify-center mb-6">
                  <Check size={28} className="text-white" />
                </div>
                <h3 className="font-display text-2xl font-extrabold mb-2">Message received</h3>
                <p className="text-sm text-[color:var(--color-muted)] max-w-xs mb-6">
                  I&apos;ll get back to you within 24 hours. Usually much sooner. Check your inbox
                  (and spam, just in case).
                </p>
                <button onClick={closeForm} className="pill pill-outline">Close</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="p-6 space-y-4">
                <p className="text-sm text-[color:var(--color-muted)]">
                  Quick brief. I reply within 24 hours with a no-fluff next step.
                </p>

                <Field label="Your name *">
                  <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </Field>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Email *">
                    <Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </Field>
                  <Field label="Phone (optional)">
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </Field>
                </div>

                <Field label="What do you need help with?">
                  <Select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                    <option value="">— Select a service —</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </Field>

                <Field label="Budget range">
                  <Select value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })}>
                    <option value="">— Select a range —</option>
                    {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </Select>
                </Field>

                <Field label="Tell me about your brand / project *">
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Website, landing page, offer, where you're stuck, timeline…"
                    className="w-full rounded-lg border border-[color:var(--color-stroke)] bg-[color:var(--color-surface)] px-3 py-2 text-sm outline-none focus:border-[color:var(--color-red)] resize-y"
                  />
                </Field>

                {error && (
                  <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">{error}</div>
                )}

                <div className="pt-2 flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="pill pill-red flex-1 justify-center disabled:opacity-50"
                  >
                    <Send size={14} />
                    {submitting ? "Sending…" : "Send message"}
                  </button>
                </div>

                <p className="text-xs text-[color:var(--color-muted)] text-center pt-2">
                  No spam, no newsletter, just a reply.
                </p>
              </form>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-wider text-[color:var(--color-muted)] mb-2">{label}</span>
      {children}
    </label>
  );
}
function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-[color:var(--color-stroke)] bg-[color:var(--color-surface)] px-3 py-2 text-sm outline-none focus:border-[color:var(--color-red)]"
    />
  );
}
function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full rounded-lg border border-[color:var(--color-stroke)] bg-[color:var(--color-surface)] px-3 py-2 text-sm outline-none focus:border-[color:var(--color-red)]"
    >
      {children}
    </select>
  );
}
