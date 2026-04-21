"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Sparkles,
  BarChart3,
  Briefcase,
  Image as ImageIcon,
  Layers,
  Route,
  Trophy,
  Target,
  MessageSquare,
  Settings,
  Menu,
  X,
} from "lucide-react";
import clsx from "clsx";
import DotCluster from "@/components/ui/DotCluster";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { href: "/admin/hero", label: "Hero", icon: Sparkles },
  { href: "/admin/stats", label: "Stats", icon: BarChart3 },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/projects", label: "Projects", icon: ImageIcon },
  { href: "/admin/future-projects", label: "More Work", icon: Layers },
  { href: "/admin/journey", label: "Journey", icon: Route },
  { href: "/admin/achievements", label: "Achievements", icon: Trophy },
  { href: "/admin/skills", label: "Skills", icon: Target },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden flex items-center justify-between p-4 border-b border-[color:var(--color-stroke)]">
        <div className="flex items-center gap-2">
          <DotCluster size={22} />
          <span className="font-display font-extrabold text-[color:var(--color-red)]">FONSI</span>
          <span className="text-xs text-[color:var(--color-muted)]">Admin</span>
        </div>
        <button onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <aside
        className={clsx(
          "fixed md:fixed top-0 left-0 z-40 h-full w-64 border-r border-[color:var(--color-stroke)] bg-[color:var(--color-bg)] flex flex-col",
          "transition-transform duration-200",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="hidden md:flex items-center gap-2 px-6 py-5 border-b border-[color:var(--color-stroke)]">
          <DotCluster size={26} />
          <span className="font-display text-xl font-extrabold tracking-tight text-[color:var(--color-red)]">
            FONSI
          </span>
          <span className="text-xs text-[color:var(--color-muted)] ml-auto">Admin</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {NAV.map((n) => {
            const Icon = n.icon;
            const isActive = n.exact ? pathname === n.href : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className={clsx(
                  "flex items-center gap-3 mx-3 my-0.5 px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-[color:var(--color-red)]/15 text-[color:var(--color-red)]"
                    : "text-[color:var(--color-text)]/80 hover:bg-white/5"
                )}
              >
                <Icon size={16} />
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-6 py-4 border-t border-[color:var(--color-stroke)] text-xs text-[color:var(--color-muted)]">
          <Link href="/" target="_blank" className="hover:text-[color:var(--color-red)]">
            View site →
          </Link>
        </div>
      </aside>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          aria-hidden
        />
      )}
    </>
  );
}
