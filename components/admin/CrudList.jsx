"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Pencil, Trash2, Plus, ArrowUp, ArrowDown, Save, X } from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";

export default function CrudList({ table, title, columns, blankRow, renderForm, renderRow }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(null); // row being edited (id) or "new"
  const [draft, setDraft] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);

  const supabase = createClient();

  const load = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").order("order", { ascending: true });
    if (error) setError(error.message);
    setRows(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, [table]);

  const startNew = () => {
    setEditing("new");
    const maxOrder = rows.reduce((m, r) => Math.max(m, r.order ?? 0), 0);
    setDraft({ ...blankRow, order: maxOrder + 1, is_visible: true });
  };

  const startEdit = (row) => {
    setEditing(row.id);
    setDraft({ ...row });
  };

  const cancel = () => {
    setEditing(null);
    setDraft(null);
  };

  const save = async () => {
    setError("");
    if (editing === "new") {
      const { id, ...payload } = draft;
      const { error } = await supabase.from(table).insert(payload);
      if (error) return setError(error.message);
    } else {
      const { id, created_at, updated_at, ...payload } = draft;
      const { error } = await supabase.from(table).update(payload).eq("id", editing);
      if (error) return setError(error.message);
    }
    cancel();
    load();
  };

  const toggleVisibility = async (row) => {
    await supabase.from(table).update({ is_visible: !row.is_visible }).eq("id", row.id);
    load();
  };

  const move = async (row, dir) => {
    const sorted = [...rows].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const idx = sorted.findIndex((r) => r.id === row.id);
    const swapWith = sorted[idx + dir];
    if (!swapWith) return;
    await Promise.all([
      supabase.from(table).update({ order: swapWith.order }).eq("id", row.id),
      supabase.from(table).update({ order: row.order }).eq("id", swapWith.id),
    ]);
    load();
  };

  const remove = async (id) => {
    await supabase.from(table).delete().eq("id", id);
    setConfirmDel(null);
    load();
  };

  if (!supabase) {
    return (
      <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-200">
        Supabase is not configured. Add env vars and reload.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-extrabold">{title}</h1>
        <button onClick={startNew} className="pill pill-red">
          <Plus size={14} /> Add new
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
          {error}
        </div>
      )}

      {editing && draft && (
        <div className="card-elevated rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-display font-bold">
              {editing === "new" ? "Add new" : "Edit"}
            </div>
            <div className="flex gap-2">
              <button onClick={cancel} className="pill pill-outline text-sm">
                <X size={14} /> Cancel
              </button>
              <button onClick={save} className="pill pill-red text-sm">
                <Save size={14} /> Save
              </button>
            </div>
          </div>
          {renderForm(draft, setDraft)}
        </div>
      )}

      {loading ? (
        <div className="text-[color:var(--color-muted)] text-sm">Loading…</div>
      ) : rows.length === 0 ? (
        <div className="card-elevated rounded-2xl p-10 text-center text-[color:var(--color-muted)] text-sm">
          No items yet. Click <span className="text-[color:var(--color-red)]">Add new</span> to start.
        </div>
      ) : (
        <div className="card-elevated rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-[color:var(--color-muted)] border-b border-[color:var(--color-stroke)]">
                {columns.map((c) => (
                  <th key={c.key} className="px-4 py-3 font-medium">
                    {c.label}
                  </th>
                ))}
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={clsx(
                    "border-b border-[color:var(--color-stroke)] last:border-0",
                    !row.is_visible && "opacity-50"
                  )}
                >
                  {renderRow(row, columns)}
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button
                        onClick={() => move(row, -1)}
                        disabled={i === 0}
                        className="w-8 h-8 rounded-md hover:bg-white/5 disabled:opacity-30 inline-flex items-center justify-center"
                        aria-label="Move up"
                      >
                        <ArrowUp size={14} />
                      </button>
                      <button
                        onClick={() => move(row, 1)}
                        disabled={i === rows.length - 1}
                        className="w-8 h-8 rounded-md hover:bg-white/5 disabled:opacity-30 inline-flex items-center justify-center"
                        aria-label="Move down"
                      >
                        <ArrowDown size={14} />
                      </button>
                      <button
                        onClick={() => toggleVisibility(row)}
                        className="w-8 h-8 rounded-md hover:bg-white/5 inline-flex items-center justify-center"
                        aria-label={row.is_visible ? "Hide" : "Show"}
                        title={row.is_visible ? "Visible" : "Hidden"}
                      >
                        {row.is_visible ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                      <button
                        onClick={() => startEdit(row)}
                        className="w-8 h-8 rounded-md hover:bg-white/5 inline-flex items-center justify-center"
                        aria-label="Edit"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => setConfirmDel(row)}
                        className="w-8 h-8 rounded-md hover:bg-red-500/15 text-red-300 inline-flex items-center justify-center"
                        aria-label="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {confirmDel && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="card-elevated rounded-2xl p-6 max-w-sm w-full">
            <div className="font-display font-bold text-lg mb-2">Delete this item?</div>
            <p className="text-sm text-[color:var(--color-muted)] mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setConfirmDel(null)} className="pill pill-outline text-sm">
                Cancel
              </button>
              <button onClick={() => remove(confirmDel.id)} className="pill pill-red text-sm">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
