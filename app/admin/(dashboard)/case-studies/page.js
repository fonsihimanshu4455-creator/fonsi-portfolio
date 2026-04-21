"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Eye, EyeOff, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import clsx from "clsx";
import { createClient } from "@/lib/supabase/client";

export default function CaseStudiesAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDel, setConfirmDel] = useState(null);
  const supabase = createClient();

  const load = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase.from("case_studies").select("*").order("order", { ascending: true });
    setRows(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const togglePublish = async (p) => {
    const patch = { is_published: !p.is_published };
    if (!p.is_published) patch.published_at = new Date().toISOString();
    await supabase.from("case_studies").update(patch).eq("id", p.id);
    load();
  };
  const move = async (row, dir) => {
    const sorted = [...rows].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    const idx = sorted.findIndex((r) => r.id === row.id);
    const swap = sorted[idx + dir];
    if (!swap) return;
    await Promise.all([
      supabase.from("case_studies").update({ order: swap.order }).eq("id", row.id),
      supabase.from("case_studies").update({ order: row.order }).eq("id", swap.id),
    ]);
    load();
  };
  const remove = async (id) => {
    await supabase.from("case_studies").delete().eq("id", id);
    setConfirmDel(null);
    load();
  };

  if (!supabase) {
    return <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-200">Supabase is not configured.</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-extrabold">Case Studies</h1>
        <Link href="/admin/case-studies/new" className="pill pill-red">
          <Plus size={14} /> New case study
        </Link>
      </div>

      {loading ? (
        <div className="text-sm text-[color:var(--color-muted)]">Loading…</div>
      ) : rows.length === 0 ? (
        <div className="card-elevated rounded-2xl p-10 text-center text-[color:var(--color-muted)] text-sm">
          No case studies yet. Deep-dive your best wins here.
        </div>
      ) : (
        <div className="card-elevated rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-[color:var(--color-muted)] border-b border-[color:var(--color-stroke)]">
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} className={clsx("border-b border-[color:var(--color-stroke)] last:border-0", !r.is_published && "opacity-60")}>
                  <td className="px-4 py-3 font-display font-bold">{r.title}</td>
                  <td className="px-4 py-3 text-[color:var(--color-muted)]">{r.client_name || "—"}</td>
                  <td className="px-4 py-3 text-[color:var(--color-muted)]">/{r.slug}</td>
                  <td className="px-4 py-3">
                    {r.is_published ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/15 text-green-300">published</span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-[color:var(--color-muted)]">draft</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button onClick={() => move(r, -1)} disabled={i === 0} className="w-8 h-8 rounded-md hover:bg-white/5 disabled:opacity-30 inline-flex items-center justify-center" aria-label="Move up"><ArrowUp size={14} /></button>
                      <button onClick={() => move(r, 1)} disabled={i === rows.length - 1} className="w-8 h-8 rounded-md hover:bg-white/5 disabled:opacity-30 inline-flex items-center justify-center" aria-label="Move down"><ArrowDown size={14} /></button>
                      <button onClick={() => togglePublish(r)} className="w-8 h-8 rounded-md hover:bg-white/5 inline-flex items-center justify-center" aria-label={r.is_published ? "Unpublish" : "Publish"}>
                        {r.is_published ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                      <Link href={`/admin/case-studies/${r.id}`} className="w-8 h-8 rounded-md hover:bg-white/5 inline-flex items-center justify-center" aria-label="Edit"><Pencil size={14} /></Link>
                      <button onClick={() => setConfirmDel(r)} className="w-8 h-8 rounded-md hover:bg-red-500/15 text-red-300 inline-flex items-center justify-center" aria-label="Delete"><Trash2 size={14} /></button>
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
            <div className="font-display font-bold text-lg mb-2">Delete this case study?</div>
            <p className="text-sm text-[color:var(--color-muted)] mb-6">This can&apos;t be undone.</p>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setConfirmDel(null)} className="pill pill-outline text-sm">Cancel</button>
              <button onClick={() => remove(confirmDel.id)} className="pill pill-red text-sm">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
