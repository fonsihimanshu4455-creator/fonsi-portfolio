"use client";

import CrudList from "@/components/admin/CrudList";
import { Field, Input } from "@/components/admin/Field";

const BLANK = { value: "", label: "", order: 0, is_visible: true };
const COLUMNS = [
  { key: "value", label: "Value" },
  { key: "label", label: "Label" },
];

export default function StatsAdmin() {
  return (
    <CrudList
      table="stats"
      title="Stats"
      blankRow={BLANK}
      columns={COLUMNS}
      renderRow={(row) => (
        <>
          <td className="px-4 py-3 font-display font-bold">{row.value}</td>
          <td className="px-4 py-3 text-[color:var(--color-muted)]">{row.label}</td>
        </>
      )}
      renderForm={(d, set) => (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Value (e.g. 100+)">
            <Input value={d.value || ""} onChange={(e) => set({ ...d, value: e.target.value })} />
          </Field>
          <Field label="Label">
            <Input value={d.label || ""} onChange={(e) => set({ ...d, label: e.target.value })} />
          </Field>
        </div>
      )}
    />
  );
}
