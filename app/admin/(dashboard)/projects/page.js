"use client";

import CrudList from "@/components/admin/CrudList";
import { Field, Input, Textarea } from "@/components/admin/Field";
import ImageUpload from "@/components/admin/ImageUpload";

const BLANK = {
  title: "",
  category: "",
  description: "",
  image_url: "",
  gradient: "from-[#3b0a0f] to-[#1e1012]",
  link: "#contact",
  order: 0,
  is_visible: true,
};
const COLUMNS = [
  { key: "title", label: "Title" },
  { key: "category", label: "Category" },
];

export default function ProjectsAdmin() {
  return (
    <CrudList
      table="projects"
      title="Recent Work"
      blankRow={BLANK}
      columns={COLUMNS}
      renderRow={(row) => (
        <>
          <td className="px-4 py-3 font-display font-bold">{row.title}</td>
          <td className="px-4 py-3 text-[color:var(--color-muted)]">{row.category}</td>
        </>
      )}
      renderForm={(d, set) => (
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Title"><Input value={d.title || ""} onChange={(e) => set({ ...d, title: e.target.value })} /></Field>
          <Field label="Category"><Input value={d.category || ""} onChange={(e) => set({ ...d, category: e.target.value })} /></Field>
          <div className="sm:col-span-2">
            <Field label="Description">
              <Textarea rows={3} value={d.description || ""} onChange={(e) => set({ ...d, description: e.target.value })} />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <ImageUpload value={d.image_url} onChange={(v) => set({ ...d, image_url: v })} label="Cover image (optional)" />
          </div>
          <Field label="Fallback gradient (Tailwind classes if no image)">
            <Input value={d.gradient || ""} onChange={(e) => set({ ...d, gradient: e.target.value })} />
          </Field>
          <Field label="Link"><Input value={d.link || ""} onChange={(e) => set({ ...d, link: e.target.value })} /></Field>
        </div>
      )}
    />
  );
}
