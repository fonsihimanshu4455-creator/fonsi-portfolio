"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { Eye, EyeOff, Star, StarOff, Trash2, Mail, Phone, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const STATUSES = ["new", "contacted", "proposal", "won", "lost"];

export default function LeadsAdmin() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // all / unread / starred / <status>
  const [expanded, setExpanded] = useState(null);
  const [confirmDel, setConfirmDel] = useState(null);

  const supabase = createClient();

  const load = async () => {
    if (!supabase) return;
    setLoading(true);
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    setRows(data || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const update = async (id, patch) => {
    await supabase.from("leads").update(patch).eq("id", id);
    load();
  };
  const remove = async (id) => {
    await supabase.from("leads").delete().eq("id", id);
    setConfirmDel(null);
    load();
  };

  const filtered = rows.filter((r) => {
    if (filter === "all") return true;
    if (filter === "unread") return !r.is_read;
    if (filter === "starred") return r.is_starred;
    return r.status === filter;
  });

  const counts = {
    all: rows.length,
    unread: rows.filter((r) => !r.is_read).length,
    starred: rows.filter((r) => r.is_starred).length,
  };

  if (!supabase) {
    return (
      <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-200">
        Supabase is not configured.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold">Leads</h1>
          <p className="text-sm text-[color:var(--color-muted)] mt-1">
            Inquiries submitted through the website.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="text-[color:var(--color-muted)]">Total: {counts.all}</span>
          <span className="text-[color:var(--color-red)]">Unread: {counts.unread}</span>
          <span className="text-yellow-300">Starred: {counts.starred}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "unread", "starred", ...STATUSES].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={clsx("pill text-xs", filter === f ? "pill-red" : "pill-outline")}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-sm text-[color:var(--color-muted)]">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="card-elevated rounded-2xl p-10 text-center text-[color:var(--color-muted)] text-sm">
          No leads to show here.
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((r) => {
            const isOpen = expanded === r.id;
            return (
              <div
                key={r.id}
                className={clsx(
                  "card-elevated rounded-2xl transition-colors",
                  !r.is_read && "border-[color:var(--color-red)]/40"
                )}
              >
                <button
                  onClick={() => {
                    setExpanded(isOpen ? null : r.id);
                    if (!r.is_read) update(r.id, { is_read: true });
                  }}
                  className="w-full text-left p-5 flex items-start gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      {!r.is_read && <span className="w-2 h-2 rounded-full bg-[color:var(--color-red)]" />}
                      <div className="font-display font-bold truncate">{r.name}</div>
                      <span className="text-xs text-[color:var(--color-muted)]">·</span>
                      <a href={`mailto:${r.email}`} onClick={(e) => e.stopPropagation()} className="text-xs text-[color:var(--color-muted)] hover:text-[color:var(--color-red)]">
                        {r.email}
                      </a>
                      {r.service && (
                        <>
                          <span className="text-xs text-[color:var(--color-muted)]">·</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-[color:var(--color-red)]/15 text-[color:var(--color-red)]">{r.service}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-[color:var(--color-text)]/85 mt-2 line-clamp-2">{r.message}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[color:var(--color-muted)]">
                      <span>{new Date(r.created_at).toLocaleString()}</span>
                      {r.budget && <span>· {r.budget}</span>}
                      <span>· <span className="uppercase tracking-wider">{r.status}</span></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => { e.stopPropagation(); update(r.id, { is_starred: !r.is_starred }); }}
                      className="w-8 h-8 rounded-md hover:bg-white/5 inline-flex items-center justify-center"
                      aria-label={r.is_starred ? "Unstar" : "Star"}
                    >
                      {r.is_starred ? <Star size={14} className="fill-yellow-400 text-yellow-400" /> : <StarOff size={14} />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); update(r.id, { is_read: !r.is_read }); }}
                      className="w-8 h-8 rounded-md hover:bg-white/5 inline-flex items-center justify-center"
                      aria-label={r.is_read ? "Mark unread" : "Mark read"}
                    >
                      {r.is_read ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setConfirmDel(r); }}
                      className="w-8 h-8 rounded-md hover:bg-red-500/15 text-red-300 inline-flex items-center justify-center"
                      aria-label="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-[color:var(--color-stroke)] px-5 py-4 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4 text-sm">
                      <Meta label="Email"><a href={`mailto:${r.email}`} className="hover:text-[color:var(--color-red)] inline-flex items-center gap-1"><Mail size={12} />{r.email}</a></Meta>
                      {r.phone && <Meta label="Phone"><a href={`tel:${r.phone}`} className="hover:text-[color:var(--color-red)] inline-flex items-center gap-1"><Phone size={12} />{r.phone}</a></Meta>}
                      {r.service && <Meta label="Service">{r.service}</Meta>}
                      {r.budget && <Meta label="Budget">{r.budget}</Meta>}
                      {r.referrer && <Meta label="Referrer"><span className="inline-flex items-center gap-1 truncate"><ExternalLink size={12} />{r.referrer}</span></Meta>}
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-wider text-[color:var(--color-muted)] mb-1">Message</div>
                      <p className="text-sm whitespace-pre-wrap text-[color:var(--color-text)]/90">{r.message}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap pt-2">
                      <span className="text-xs uppercase tracking-wider text-[color:var(--color-muted)] mr-1">Status:</span>
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          onClick={() => update(r.id, { status: s })}
                          className={clsx("pill text-xs", r.status === s ? "pill-red" : "pill-outline")}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {confirmDel && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="card-elevated rounded-2xl p-6 max-w-sm w-full">
            <div className="font-display font-bold text-lg mb-2">Delete this lead?</div>
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

function Meta({ label, children }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-[color:var(--color-muted)] mb-1">{label}</div>
      <div>{children}</div>
    </div>
  );
}
