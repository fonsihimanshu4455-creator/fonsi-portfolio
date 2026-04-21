import Link from "next/link";
import {
  Sparkles,
  BarChart3,
  Briefcase,
  Image as ImageIcon,
  Layers,
  Globe,
  Route,
  Trophy,
  Target,
  MessageSquare,
  Settings,
} from "lucide-react";

const CARDS = [
  { href: "/admin/hero", label: "Hero", icon: Sparkles, desc: "Headline, subhead, CTAs" },
  { href: "/admin/stats", label: "Stats", icon: BarChart3, desc: "Numbers band" },
  { href: "/admin/services", label: "Services", icon: Briefcase, desc: "What I do cards" },
  { href: "/admin/projects", label: "Projects", icon: ImageIcon, desc: "Recent Work tiles" },
  { href: "/admin/future-projects", label: "More Work", icon: Layers, desc: "Filterable grid" },
  { href: "/admin/website-features", label: "Website Features", icon: Globe, desc: "Why my websites win" },
  { href: "/admin/journey", label: "Journey", icon: Route, desc: "My Process steps" },
  { href: "/admin/achievements", label: "Achievements", icon: Trophy, desc: "Headline + wins" },
  { href: "/admin/skills", label: "Skills", icon: Target, desc: "Focus area pills" },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare, desc: "Reviews" },
  { href: "/admin/settings", label: "Site Settings", icon: Settings, desc: "Footer + CTA + contact" },
];

export default function AdminOverview() {
  return (
    <div>
      <h1 className="font-display text-3xl font-extrabold mb-2">Welcome back</h1>
      <p className="text-[color:var(--color-muted)] mb-8">
        Manage every section of your portfolio. Hidden items don&apos;t show on the
        public site.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="card-elevated rounded-2xl p-5 hover:border-[color:var(--color-red)]/50 hover:-translate-y-0.5 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-[color:var(--color-red)]/15 text-[color:var(--color-red)] flex items-center justify-center mb-3">
                <Icon size={18} />
              </div>
              <div className="font-display font-bold">{c.label}</div>
              <div className="text-xs text-[color:var(--color-muted)] mt-1">{c.desc}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
