"use client";

import SingletonForm from "@/components/admin/SingletonForm";
import { Field, Input, Textarea } from "@/components/admin/Field";
import ImageUpload from "@/components/admin/ImageUpload";

const BLANK = {
  heading_prefix: "",
  heading_highlight: "",
  heading_suffix: "",
  subheading: "",
  global_line: "",
  hero_image_url: "",
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

          <div>
            <ImageUpload
              value={d.hero_image_url}
              onChange={(v) => set({ ...d, hero_image_url: v })}
              label="Hero image (your stylized photo — transparent PNG recommended)"
            />
            <p className="mt-2 text-xs text-[color:var(--color-muted)]">
              Shown in the hero card (3:4 aspect). If empty, a placeholder glow is shown.
            </p>
          </div>

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

