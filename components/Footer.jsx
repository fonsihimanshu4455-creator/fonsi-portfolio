import { Mail, Phone, MapPin, Instagram, Twitter, Youtube, Send } from "lucide-react";
import Logo from "./ui/Logo";
import { characterStyle } from "@/lib/characterStyle";

const SERVICES = [
  "Digital Ads",
  "Website Development",
  "SEO",
  "GMB",
  "Graphic Design",
  "Video Editing",
];
const COMPANY = ["About Me", "Work", "Contact", "Privacy"];

const SOCIAL_ICONS = {
  email: Send,
  twitter: Twitter,
  instagram: Instagram,
  youtube: Youtube,
};

export default function Footer({ settings = {} }) {
  const socials = settings.social_links || {};
  const socialKeys = Object.keys(SOCIAL_ICONS).filter((k) => socials[k]);

  return (
    <footer className="mt-10">
      <hr className="dashed-divider" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-8 py-10 md:py-14 grid sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr] gap-10 md:gap-12">
        <div>
          <div className="flex items-start gap-4 mb-5">
            <a href="/#home" className="inline-block" aria-label="Home">
              <Logo
                size="lg"
                wordmark={settings.logo_wordmark ?? "FONSI"}
                showWordmark={!settings.logo_hide_wordmark}
                imageUrl={settings.logo_url || null}
              />
            </a>
            {settings.footer_character_url && (
              <img
                src={settings.footer_character_url}
                alt=""
                aria-hidden="true"
                style={characterStyle(settings.character_settings?.footer)}
                className="w-20 h-20 object-contain object-bottom drop-shadow-[0_8px_24px_rgba(229,28,35,0.35)]"
              />
            )}
          </div>
          <p className="text-sm text-[color:var(--color-muted)] max-w-sm leading-relaxed">
            {settings.footer_description ||
              "Himanshu Bhardwaj — digital marketer, designer, and editor helping brands grow with performance ads and creative that actually converts."}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm">
            <div className="flex items-center gap-2 text-[color:var(--color-muted)]">
              <Mail size={14} /> {settings.contact_email || "hello@fonsi.co"}
            </div>
            <div className="flex items-center gap-2 text-[color:var(--color-muted)]">
              <Phone size={14} /> {settings.contact_phone || "+91 00000 00000"}
            </div>
            <div className="flex items-center gap-2 text-[color:var(--color-muted)]">
              <MapPin size={14} /> {settings.address || "India · Worldwide"}
            </div>
          </div>
          {settings.timezone_line && (
            <p className="mt-3 text-xs text-[color:var(--color-muted)]/80">
              {settings.timezone_line}
            </p>
          )}

          <div className="mt-6 flex gap-3">
            {(socialKeys.length > 0 ? socialKeys : ["email", "twitter", "instagram", "youtube"]).map((k) => {
              const Icon = SOCIAL_ICONS[k];
              const href = socials[k] || "#";
              return (
                <a
                  key={k}
                  href={href}
                  className="w-10 h-10 rounded-full border border-[color:var(--color-stroke)] flex items-center justify-center hover:border-[color:var(--color-red)] hover:text-[color:var(--color-red)] transition-colors"
                >
                  <Icon size={16} />
                </a>
              );
            })}
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
