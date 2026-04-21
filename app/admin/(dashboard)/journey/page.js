"use client";

import CrudList from "@/components/admin/CrudList";
import { Field, Input, Textarea } from "@/components/admin/Field";

const BLANK = { step_number: "1", title: "", description: "", order: 0, is_visible: true };
const COLUMNS = [
  { key: "step_number", label: "#" },
  { key: "title", label: "Step" },
];

export default function JourneyAdmin() {
  return (
    <CrudList
      table="journey_steps"
      title="My Process"
      blankRow={BLANK}
      columns={COLUMNS}
      renderRow={(row) => (
        <>
          <td className="px-4 py-3 font-display font-bold">{row.step_number}</td>
          <td className="px-4 py-3">{row.title}</td>
        </>
      )}
      renderForm={(d, set) => (
        <div className="grid sm:grid-cols-3 gap-4">
          <Field label="Step number"><Input value={d.step_number || ""} onChange={(e) => set({ ...d, step_number: e.target.value })} /></Field>
          <div className="sm:col-span-2">
            <Field label="Title"><Input value={d.title || ""} onChange={(e) => set({ ...d, title: e.target.value })} /></Field>
          </div>
          <div className="sm:col-span-3">
            <Field label="Description">
              <Textarea rows={3} value={d.description || ""} onChange={(e) => set({ ...d, description: e.target.value })} />
            </Field>
          </div>
        </div>
      )}
    />
  );
}
