"use client";

import CrudList from "@/components/admin/CrudList";
import { Field, Input, Textarea } from "@/components/admin/Field";
import ImageUpload from "@/components/admin/ImageUpload";

const BLANK = {
  name: "",
  role: "",
  photo_url: "",
  rating: 5.0,
  review_text: "",
  days_ago: "1 day ago",
  order: 0,
  is_visible: true,
};
const COLUMNS = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "rating", label: "Rating" },
];

export default function TestimonialsAdmin() {
  return (
    <CrudList
      table="testimonials"
      title="Testimonials"
      blankRow={BLANK}
      columns={COLUMNS}
      renderRow={(row) => (
        <>
          <td className="px-4 py-3 font-display font-bold">{row.name}</td>
          <td className="px-4 py-3 text-[color:var(--color-muted)]">{row.role}</td>
          <td className="px-4 py-3 text-[color:var(--color-muted)]">{Number(row.rating).toFixed(1)}</td>
        </>
      )}
      renderForm={(d, set) => (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Name"><Input value={d.name || ""} onChange={(e) => set({ ...d, name: e.target.value })} /></Field>
          <Field label="Role / Company"><Input value={d.role || ""} onChange={(e) => set({ ...d, role: e.target.value })} /></Field>
          <Field label="Rating (0–5)">
            <Input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={d.rating ?? 5}
              onChange={(e) => set({ ...d, rating: parseFloat(e.target.value) })}
            />
          </Field>
          <Field label="Days ago text"><Input value={d.days_ago || ""} onChange={(e) => set({ ...d, days_ago: e.target.value })} /></Field>
          <div className="sm:col-span-2">
            <Field label="Review text">
              <Textarea rows={4} value={d.review_text || ""} onChange={(e) => set({ ...d, review_text: e.target.value })} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <ImageUpload value={d.photo_url} onChange={(v) => set({ ...d, photo_url: v })} label="Photo (optional)" />
          </div>
        </div>
      )}
    />
  );
}
