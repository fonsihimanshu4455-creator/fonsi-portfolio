"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import PillButton from "./ui/PillButton";
import Logo from "./ui/Logo";
import { useLead } from "./LeadContext";

const LINKS = [
  { href: "/#home", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/#about", label: "About" },
];

export default function Nav({ settings = {} }) {
  const [open, setOpen] = useState(false);
  const { openForm } = useLead();

  const wordmark = settings.logo_wordmark ?? "FONSI";
  const showWordmark = !settings.logo_hide_wordmark;
  const imageUrl = settings.logo_url || null;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color:var(--color-bg)]/60 border-b border-[color:var(--color-stroke)]">
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="/#home" aria-label={`${wordmark} home`}>
          <Logo size="sm" wordmark={wordmark} showWordmark={showWordmark} imageUrl={imageUrl} />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[color:var(--color-text)]/80 hover:text-[color:var(--color-red)] text-sm font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <PillButton as="button" onClick={() => openForm()}>Let&apos;s Talk</PillButton>
        </div>

        <button
          aria-label="Toggle menu"
          className="md:hidden text-[color:var(--color-text)]"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[color:var(--color-stroke)] bg-[color:var(--color-bg)]/95">
          <div className="px-6 py-4 flex flex-col gap-3">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[color:var(--color-text)]/90 py-2"
              >
                {l.label}
              </a>
            ))}
            <PillButton
              as="button"
              onClick={() => {
                setOpen(false);
                openForm();
              }}
              className="self-start mt-2"
            >
              Let&apos;s Talk
            </PillButton>
          </div>
        </div>
      )}
    </header>
  );
}
