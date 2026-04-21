"use client";

import SingletonForm from "@/components/admin/SingletonForm";
import { Field, Input, Textarea } from "@/components/admin/Field";
import CharacterField from "@/components/admin/CharacterField";

const BLANK = {
  heading_prefix: "",
  heading_highlight: "",
  heading_suffix: "",
  subheading: "",
  global_line: "",
  hero_image_url: "",
  hero_image_settings: {},
  cta_primary_text: "",
  cta_primary_link: "",
  cta_secondary_text: "",
  cta_secondary_link: "",
};

export default function HeroAdminPage() {
  return (
    <SingletonForm
      table="hero_content"
      title="Hero"
      blank={BLANK}
      renderForm={(d, set) => (
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Heading prefix">
              <Input value={d.heading_prefix || ""} onChange={(e) => set({ ...d, heading_prefix: e.target.value })} />
            </Field>
            <Field label="Heading highlight (red box)">
              <Input value={d.heading_highlight || ""} onChange={(e) => set({ ...d, heading_highlight: e.target.value })} />
            </Field>
            <Field label="Heading suffix">
              <Input value={d.heading_suffix || ""} onChange={(e) => set({ ...d, heading_suffix: e.target.value })} />
            </Field>
            <div className="sm:col-span-2">
              <Field label="Subheading">
                <Textarea rows={3} value={d.subheading || ""} onChange={(e) => set({ ...d, subheading: e.target.value })} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Global line (optional international positioning)">
                <Input value={d.global_line || ""} onChange={(e) => set({ ...d, global_line: e.target.value })} />
              </Field>
            </div>
          </div>

          <CharacterField
            label="Hero image (your stylized photo — transparent PNG recommended)"
            hint="Shown in the hero card. Use Scale + Offset to fine-tune position. Empty = placeholder."
            url={d.hero_image_url}
            onUrlChange={(v) => set({ ...d, hero_image_url: v })}
            settings={d.hero_image_settings}
            onSettingsChange={(s) => set({ ...d, hero_image_settings: s })}
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Primary CTA text">
              <Input value={d.cta_primary_text || ""} onChange={(e) => set({ ...d, cta_primary_text: e.target.value })} />
            </Field>
            <Field label="Primary CTA link">
              <Input value={d.cta_primary_link || ""} onChange={(e) => set({ ...d, cta_primary_link: e.target.value })} />
            </Field>
            <Field label="Secondary CTA text">
              <Input value={d.cta_secondary_text || ""} onChange={(e) => set({ ...d, cta_secondary_text: e.target.value })} />
            </Field>
            <Field label="Secondary CTA link">
              <Input value={d.cta_secondary_link || ""} onChange={(e) => set({ ...d, cta_secondary_link: e.target.value })} />
            </Field>
          </div>
        </div>
      )}
    />
  );
}

