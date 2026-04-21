import { Mail, Phone, MapPin, Instagram, Twitter, Youtube, Send } from "lucide-react";
import DotCluster from "./ui/DotCluster";

const SERVICES = ["Paid Ads", "Growth Strategy", "Graphic Design", "Video Editing"];
const COMPANY = ["About Me", "Work", "Contact", "Privacy"];

export default function Footer() {
  return (
    <footer className="mt-10">
      <hr className="dashed-divider" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-14 grid md:grid-cols-[1.4fr_1fr_1fr] gap-12">
        <div>
          <a href="#home" className="flex items-center gap-2 mb-5">
            <DotCluster size={36} />
            <span className="font-display text-3xl font-extrabold tracking-tight text-[color:var(--color-red)]">
              FONSI
            </span>
          </a>
          <p className="text-sm text-[color:var(--color-muted)] max-w-sm leading-relaxed">
            Himanshu Bhardwaj — digital marketer, designer, and editor helping brands
            grow with performance ads and creative that actually converts.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
            <div className="flex items-center gap-2 text-[color:var(--color-muted)]">
              <Mail size={14} /> hello@fonsi.co
            </div>
            <div className="flex items-center gap-2 text-[color:var(--color-muted)]">
              <Phone size={14} /> +91 00000 00000
            </div>
            <div className="flex items-center gap-2 text-[color:var(--color-muted)]">
              <MapPin size={14} /> India · Worldwide
            </div>
          </div>
          <p className="mt-3 text-xs text-[color:var(--color-muted)]/80">
            Available across time zones · India · US · UK · UAE · Global
          </p>

          <div className="mt-6 flex gap-3">
            {[Send, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full border border-[color:var(--color-stroke)] flex items-center justify-center hover:border-[color:var(--color-red)] hover:text-[color:var(--color-red)] transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="font-display font-bold text-lg mb-4 inline-block border-b border-dotted border-[color:var(--color-stroke)] pb-1">
            Services
          </div>
          <ul className="flex flex-col gap-3 text-sm text-[color:var(--color-muted)]">
            {SERVICES.map((s) => (
              <li key={s}>
                <a href="#services" className="hover:text-[color:var(--color-red)] transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="font-display font-bold text-lg mb-4 inline-block border-b border-dotted border-[color:var(--color-stroke)] pb-1">
            Company
          </div>
          <ul className="flex flex-col gap-3 text-sm text-[color:var(--color-muted)]">
            {COMPANY.map((s) => (
              <li key={s}>
                <a href="#" className="hover:text-[color:var(--color-red)] transition-colors">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="dashed-divider" />
      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[color:var(--color-muted)]">
        <div className="flex gap-5">
          <a href="#" className="hover:text-[color:var(--color-text)] transition-colors">
            Privacy Policy
          </a>
          <span>•</span>
          <a href="#" className="hover:text-[color:var(--color-text)] transition-colors">
            Disclaimer
          </a>
        </div>
        <div>© {new Date().getFullYear()} FONSI · All rights reserved</div>
      </div>
    </footer>
  );
}
