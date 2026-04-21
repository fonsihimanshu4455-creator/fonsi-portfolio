"use client";

import SingletonForm from "@/components/admin/SingletonForm";
import { Field, Input, Textarea } from "@/components/admin/Field";
import ImageUpload from "@/components/admin/ImageUpload";

const BLANK = {
  contact_email: "",
  contact_phone: "",
  address: "",
  timezone_line: "",
  footer_description: "",
  social_links: { twitter: "", instagram: "", youtube: "", email: "" },
  cta_heading_prefix: "",
  cta_heading_highlight: "",
  cta_heading_suffix: "",
  cta_subcopy: "",
  cta_character_url: "",
  achievements_character_url: "",
  process_character_url: "",
  skills_character_url: "",
  not_found_character_url: "",
  footer_character_url: "",
};

export default function SettingsAdmin() {
  return (
    <SingletonForm
      table="site_settings"
      title="Site Settings"
      blank={BLANK}
      renderForm={(d, set) => {
        const socials = d.social_links || {};
        const setSocial = (k, v) => set({ ...d, social_links: { ...socials, [k]: v } });

        return (
          <div className="space-y-8">
            <section>
              <div className="font-display font-bold mb-4">Contact</div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Email"><Input value={d.contact_email || ""} onChange={(e) => set({ ...d, contact_email: e.target.value })} /></Field>
                <Field label="Phone (international format)"><Input value={d.contact_phone || ""} onChange={(e) => set({ ...d, contact_phone: e.target.value })} /></Field>
                <Field label="Address / Location"><Input value={d.address || ""} onChange={(e) => set({ ...d, address: e.target.value })} /></Field>
                <Field label="Timezone line"><Input value={d.timezone_line || ""} onChange={(e) => set({ ...d, timezone_line: e.target.value })} /></Field>
              </div>
            </section>

            <section>
              <div className="font-display font-bold mb-4">Footer</div>
              <Field label="Footer description">
                <Textarea rows={3} value={d.footer_description || ""} onChange={(e) => set({ ...d, footer_description: e.target.value })} />
              </Field>
            </section>

            <section>
              <div className="font-display font-bold mb-4">Social links</div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Twitter / X"><Input value={socials.twitter || ""} onChange={(e) => setSocial("twitter", e.target.value)} /></Field>
                <Field label="Instagram"><Input value={socials.instagram || ""} onChange={(e) => setSocial("instagram", e.target.value)} /></Field>
                <Field label="YouTube"><Input value={socials.youtube || ""} onChange={(e) => setSocial("youtube", e.target.value)} /></Field>
                <Field label="Email link (mailto:…)"><Input value={socials.email || ""} onChange={(e) => setSocial("email", e.target.value)} /></Field>
              </div>
            </section>

            <section>
              <div className="font-display font-bold mb-4">CTA banner</div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Heading prefix (use \\n for line break)">
                  <Input value={d.cta_heading_prefix || ""} onChange={(e) => set({ ...d, cta_heading_prefix: e.target.value })} />
                </Field>
                <Field label="Heading highlight (red box)">
                  <Input value={d.cta_heading_highlight || ""} onChange={(e) => set({ ...d, cta_heading_highlight: e.target.value })} />
                </Field>
                <Field label="Heading suffix">
                  <Input value={d.cta_heading_suffix || ""} onChange={(e) => set({ ...d, cta_heading_suffix: e.target.value })} />
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Subcopy">
                    <Textarea rows={3} value={d.cta_subcopy || ""} onChange={(e) => set({ ...d, cta_subcopy: e.target.value })} />
                  </Field>
                </div>
              </div>
            </section>

            <section>
              <div className="font-display font-bold mb-1">Characters</div>
              <p className="text-xs text-[color:var(--color-muted)] mb-5">
                Optional stylized character images. Leave any field empty to keep
                the current design (emoji / plain section). Transparent PNGs
                recommended.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <ImageUpload
                  value={d.cta_character_url}
                  onChange={(v) => set({ ...d, cta_character_url: v })}
                  label="CTA banner character (replaces 🚀)"
                />
                <ImageUpload
                  value={d.achievements_character_url}
                  onChange={(v) => set({ ...d, achievements_character_url: v })}
                  label="Achievements character (next to 20+)"
                />
                <ImageUpload
                  value={d.process_character_url}
                  onChange={(v) => set({ ...d, process_character_url: v })}
                  label="My Process character"
                />
                <ImageUpload
                  value={d.skills_character_url}
                  onChange={(v) => set({ ...d, skills_character_url: v })}
                  label="Skills / Focus Areas character"
                />
                <ImageUpload
                  value={d.not_found_character_url}
                  onChange={(v) => set({ ...d, not_found_character_url: v })}
                  label="404 page character"
                />
                <ImageUpload
                  value={d.footer_character_url}
                  onChange={(v) => set({ ...d, footer_character_url: v })}
                  label="Footer mascot (small)"
                />
              </div>
            </section>
          </div>
        );
      }}
    />
  );
}
