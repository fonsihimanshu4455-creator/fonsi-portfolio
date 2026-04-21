"use client";

import CrudList from "@/components/admin/CrudList";
import { Field, Input } from "@/components/admin/Field";

const BLANK = { label: "", display: "", order: 0, is_visible: true };
const COLUMNS = [
  { key: "label", label: "Pill label" },
  { key: "display", label: "Display text" },
];

export default function SkillsAdmin() {
  return (
    <CrudList
      table="skills"
      title="Skills / Focus Areas"
      blankRow={BLANK}
      columns={COLUMNS}
      renderRow={(row) => (
        <>
          <td className="px-4 py-3 font-display font-bold">{row.label}</td>
          <td className="px-4 py-3 text-[color:var(--color-muted)]">{row.display}</td>
        </>
      )}
      renderForm={(d, set) => (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Pill label">
            <Input value={d.label || ""} onChange={(e) => set({ ...d, label: e.target.value })} />
          </Field>
          <Field label="Display text (ghost-text on the right)">
            <Input value={d.display || ""} onChange={(e) => set({ ...d, display: e.target.value })} />
          </Field>
        </div>
      )}
    />
  );
}
