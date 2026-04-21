"use client";

import CrudList from "@/components/admin/CrudList";
import { Field, Input, Textarea, Select } from "@/components/admin/Field";
import { ICON_KEYS } from "@/lib/icons";

const BLANK = { title: "", description: "", icon_name: "megaphone", order: 0, is_visible: true };
const COLUMNS = [
  { key: "title", label: "Title" },
  { key: "icon_name", label: "Icon" },
];

export default function ServicesAdmin() {
  return (
    <CrudList
      table="services"
      title="Services"
      blankRow={BLANK}
      columns={COLUMNS}
      renderRow={(row) => (
        <>
          <td className="px-4 py-3 font-display font-bold">{row.title}</td>
          <td className="px-4 py-3 text-[color:var(--color-muted)]">{row.icon_name}</td>
        </>
      )}
      renderForm={(d, set) => (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title">
            <Input value={d.title || ""} onChange={(e) => set({ ...d, title: e.target.value })} />
          </Field>
          <Field label="Icon">
            <Select value={d.icon_name || "megaphone"} onChange={(e) => set({ ...d, icon_name: e.target.value })}>
              {ICON_KEYS.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </Select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Description">
              <Textarea rows={3} value={d.description || ""} onChange={(e) => set({ ...d, description: e.target.value })} />
            </Field>
          </div>
        </div>
      )}
    />
  );
}
