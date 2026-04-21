"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SingletonForm({ table, title, blank, renderForm }) {
  const [draft, setDraft] = useState(blank);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const supabase = createClient();

  useEffect(() => {
    (async () => {
      if (!supabase) return setLoading(false);
      const { data } = await supabase.from(table).select("*").eq("id", 1).maybeSingle();
      if (data) setDraft({ ...blank, ...data });
      setLoading(false);
    })();
  }, [table]);

  const save = async () => {
    setError("");
    setMsg("");
    setSaving(true);
    const payload = { ...draft, id: 1 };
    delete payload.updated_at;
    const { error } = await supabase.from(table).upsert(payload, { onConflict: "id" });
    if (error) setError(error.message);
    else setMsg("Saved.");
    setSaving(false);
    setTimeout(() => setMsg(""), 2000);
  };

  if (!supabase) {
    return (
      <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-200">
        Supabase is not configured. Add env vars and reload.
      </div>
    );
  }
  if (loading) return <div className="text-sm text-[color:var(--color-muted)]">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-extrabold">{title}</h1>
        <div className="flex items-center gap-3">
          {msg && <span className="text-xs text-green-300">{msg}</span>}
          <button onClick={save} disabled={saving} className="pill pill-red">
            <Save size={14} /> {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">
          {error}
        </div>
      )}

      <div className="card-elevated rounded-2xl p-6">{renderForm(draft, setDraft)}</div>
    </div>
  );
}
