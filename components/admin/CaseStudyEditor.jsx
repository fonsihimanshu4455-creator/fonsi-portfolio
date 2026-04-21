"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye, Plus, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Field, Input, Textarea } from "@/components/admin/Field";
import ImageUpload from "@/components/admin/ImageUpload";

const EMPTY = {
  slug: "",
  title: "",
  client_name: "",
  industry: "",
  hero_image_url: "",
  summary: "",
  challenge_md: "",
  strategy_md: "",
  execution_md: "",
  metrics: [],
  gallery_urls: [],
  testimonial_quote: "",
  testimonial_author: "",
  seo_title: "",
  seo_description: "",
  is_published: false,
  order: 0,
};

function slugify(s) {
  return s.toLowerCase().trim().replace(/['"]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function CaseStudyEditor({ caseId = null }) {
  const router = useRouter();
  const supabase = createClient();
  const [cs, setCs] = useState(EMPTY);
  const [loading, setLoading] = useState(!!caseId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!caseId || !supabase) return;
    (async () => {
      const { data } = await supabase.from("case_studies").select("*").eq("id", caseId).maybeSingle();
      if (data) {
        setCs({
          ...EMPTY,
          ...data,
          metrics: Array.isArray(data.metrics) ? data.metrics : [],
          gallery_urls: data.gallery_urls || [],
        });
      }
      setLoading(false);
    })();
  }, [caseId]);

  const onTitleChange = (v) => setCs((p) => ({ ...p, title: v, slug: p.slug || slugify(v) }));

  const addMetric = () => setCs({ ...cs, metrics: [...cs.metrics, { label: "", before: "", after: "" }] });
  const updateMetric = (i, patch) => {
    const next = [...cs.metrics];
    next[i] = { ...next[i], ...patch };
    setCs({ ...cs, metrics: next });
  };
  const removeMetric = (i) => setCs({ ...cs, metrics: cs.metrics.filter((_, idx) => idx !== i) });

  const addGallery = (url) => setCs({ ...cs, gallery_urls: [...cs.gallery_urls, url] });
  const removeGallery = (i) => setCs({ ...cs, gallery_urls: cs.gallery_urls.filter((_, idx) => idx !== i) });

  const save = async ({ publish = null } = {}) => {
    if (!supabase) return;
    setError("");
    setSaving(true);
    const payload = {
      slug: cs.slug || slugify(cs.title),
      title: cs.title,
      client_name: cs.client_name || null,
      industry: cs.industry || null,
      hero_image_url: cs.hero_image_url || null,
      summary: cs.summary || null,
      challenge_md: cs.challenge_md || null,
      strategy_md: cs.strategy_md || null,
      execution_md: cs.execution_md || null,
      metrics: cs.metrics,
      gallery_urls: cs.gallery_urls,
      testimonial_quote: cs.testimonial_quote || null,
      testimonial_author: cs.testimonial_author || null,
      seo_title: cs.seo_title || null,
      seo_description: cs.seo_description || null,
      order: cs.order || 0,
    };
    if (publish === true) {
      payload.is_published = true;
      payload.published_at = cs.published_at || new Date().toISOString();
    } else if (publish === false) {
      payload.is_published = false;
    } else {
      payload.is_published = cs.is_published;
    }

    let result;
    if (caseId) {
      result = await supabase.from("case_studies").update(payload).eq("id", caseId).select().maybeSingle();
    } else {
      result = await supabase.from("case_studies").insert(payload).select().maybeSingle();
    }
    setSaving(false);
    if (result.error) { setError(result.error.message); return; }
    if (!caseId && result.data) { router.replace(`/admin/case-studies/${result.data.id}`); return; }
    setCs((p) => ({ ...p, ...payload }));
  };

  if (!supabase) return <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-200">Supabase is not configured.</div>;
  if (loading) return <div className="text-sm text-[color:var(--color-muted)]">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/admin/case-studies" className="w-9 h-9 rounded-full border border-[color:var(--color-stroke)] flex items-center justify-center hover:border-[color:var(--color-red)]"><ArrowLeft size={14} /></Link>
          <h1 className="font-display text-2xl font-extrabold">{caseId ? "Edit case study" : "New case study"}</h1>
        </div>
        <div className="flex items-center gap-2">
          {cs.is_published && cs.slug && (
            <Link href={`/case-studies/${cs.slug}`} target="_blank" className="pill pill-outline text-sm"><Eye size={14} /> View</Link>
          )}
          <button onClick={() => save({ publish: false })} disabled={saving} className="pill pill-outline text-sm">
            <Save size={14} /> {cs.is_published ? "Save & unpublish" : "Save draft"}
          </button>
          <button onClick={() => save({ publish: true })} disabled={saving} className="pill pill-red text-sm">
            {saving ? "Saving…" : cs.is_published ? "Save & keep published" : "Publish"}
          </button>
        </div>
      </div>

      {error && <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">{error}</div>}

      <div className="space-y-6">
        <div className="card-elevated rounded-2xl p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title"><Input value={cs.title || ""} onChange={(e) => onTitleChange(e.target.value)} /></Field>
            <Field label="Slug"><Input value={cs.slug || ""} onChange={(e) => setCs({ ...cs, slug: slugify(e.target.value) })} /></Field>
            <Field label="Client name"><Input value={cs.client_name || ""} onChange={(e) => setCs({ ...cs, client_name: e.target.value })} /></Field>
            <Field label="Industry"><Input value={cs.industry || ""} onChange={(e) => setCs({ ...cs, industry: e.target.value })} /></Field>
          </div>
          <Field label="Summary (shown in hero + social previews)">
            <Textarea rows={2} value={cs.summary || ""} onChange={(e) => setCs({ ...cs, summary: e.target.value })} />
          </Field>
          <ImageUpload value={cs.hero_image_url} onChange={(v) => setCs({ ...cs, hero_image_url: v })} label="Hero image" />
        </div>

        <div className="card-elevated rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-bold">Metrics (before / after)</h2>
            <button onClick={addMetric} className="pill pill-outline text-xs"><Plus size={12} /> Add metric</button>
          </div>
          {cs.metrics.length === 0 ? (
            <p className="text-xs text-[color:var(--color-muted)]">No metrics added. Click Add metric.</p>
          ) : (
            <div className="space-y-3">
              {cs.metrics.map((m, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 items-end">
                  <Field label="Label"><Input value={m.label || ""} onChange={(e) => updateMetric(i, { label: e.target.value })} placeholder="ROAS" /></Field>
                  <Field label="Before"><Input value={m.before || ""} onChange={(e) => updateMetric(i, { before: e.target.value })} placeholder="1.2x" /></Field>
                  <Field label="After"><Input value={m.after || ""} onChange={(e) => updateMetric(i, { after: e.target.value })} placeholder="4.6x" /></Field>
                  <button onClick={() => removeMetric(i)} className="w-9 h-9 rounded-md hover:bg-red-500/15 text-red-300 inline-flex items-center justify-center" aria-label="Remove"><X size={14} /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card-elevated rounded-2xl p-6 space-y-4">
          <Field label="The Challenge (markdown)">
            <Textarea rows={6} value={cs.challenge_md || ""} onChange={(e) => setCs({ ...cs, challenge_md: e.target.value })} />
          </Field>
          <Field label="The Strategy (markdown)">
            <Textarea rows={6} value={cs.strategy_md || ""} onChange={(e) => setCs({ ...cs, strategy_md: e.target.value })} />
          </Field>
          <Field label="Execution (markdown)">
            <Textarea rows={6} value={cs.execution_md || ""} onChange={(e) => setCs({ ...cs, execution_md: e.target.value })} />
          </Field>
        </div>

        <div className="card-elevated rounded-2xl p-6 space-y-4">
          <h2 className="font-display font-bold">Gallery</h2>
          {cs.gallery_urls.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {cs.gallery_urls.map((url, i) => (
                <div key={i} className="relative group">
                  <img src={url} alt="" className="w-full aspect-square object-cover rounded-lg border border-[color:var(--color-stroke)]" />
                  <button onClick={() => removeGallery(i)} className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[color:var(--color-red)] text-white flex items-center justify-center"><X size={12} /></button>
                </div>
              ))}
            </div>
          )}
          <ImageUpload value="" onChange={(v) => v && addGallery(v)} label="Add image to gallery" />
        </div>

        <div className="card-elevated rounded-2xl p-6 space-y-4">
          <h2 className="font-display font-bold">Testimonial (optional)</h2>
          <Field label="Quote"><Textarea rows={3} value={cs.testimonial_quote || ""} onChange={(e) => setCs({ ...cs, testimonial_quote: e.target.value })} /></Field>
          <Field label="Author"><Input value={cs.testimonial_author || ""} onChange={(e) => setCs({ ...cs, testimonial_author: e.target.value })} placeholder="Aarav Mehta, Founder" /></Field>
        </div>

        <div className="card-elevated rounded-2xl p-6 space-y-4">
          <h2 className="font-display font-bold">SEO overrides</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="SEO title"><Input value={cs.seo_title || ""} onChange={(e) => setCs({ ...cs, seo_title: e.target.value })} /></Field>
            <Field label="Display order"><Input type="number" value={cs.order ?? 0} onChange={(e) => setCs({ ...cs, order: parseInt(e.target.value) || 0 })} /></Field>
          </div>
          <Field label="SEO description"><Textarea rows={2} value={cs.seo_description || ""} onChange={(e) => setCs({ ...cs, seo_description: e.target.value })} /></Field>
        </div>
      </div>
    </div>
  );
}
