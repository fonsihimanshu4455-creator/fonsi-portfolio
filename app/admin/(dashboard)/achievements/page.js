"use client";

import CrudList from "@/components/admin/CrudList";
import { Field, Input, Textarea } from "@/components/admin/Field";

const BLANK = { number: "", label: "", description: "", is_headline: false, order: 0, is_visible: true };
const COLUMNS = [
  { key: "label", label: "Label" },
  { key: "is_headline", label: "Headline?" },
];

export default function AchievementsAdmin() {
  return (
    <CrudList
      table="achievements"
      title="Achievements"
      blankRow={BLANK}
      columns={COLUMNS}
      renderRow={(row) => (
        <>
          <td className="px-4 py-3 font-display font-bold">{row.label}</td>
          <td className="px-4 py-3 text-[color:var(--color-muted)]">
            {row.is_headline ? `Yes (${row.number}+)` : "No"}
          </td>
        </>
      )}
      renderForm={(d, set) => (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Label">
            <Input value={d.label || ""} onChange={(e) => set({ ...d, label: e.target.value })} />
          </Field>
          <Field label="Headline number (only used if Headline = on)">
            <Input value={d.number || ""} onChange={(e) => set({ ...d, number: e.target.value })} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Description">
              <Textarea rows={3} value={d.description || ""} onChange={(e) => set({ ...d, description: e.target.value })} />
            </Field>
          </div>
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={!!d.is_headline}
              onChange={(e) => set({ ...d, is_headline: e.target.checked })}
            />
            Use as the big headline number
          </label>
        </div>
      )}
    />
  );
}
