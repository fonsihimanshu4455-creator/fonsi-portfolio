"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, Eye } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Field, Input, Textarea } from "@/components/admin/Field";
import ImageUpload from "@/components/admin/ImageUpload";

const EMPTY = {
  slug: "",
  title: "",
  excerpt: "",
  cover_image_url: "",
  body_markdown: "",
  tags: [],
  reading_time: null,
  seo_title: "",
  seo_description: "",
  is_published: false,
  published_at: null,
};

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function PostEditor({ postId = null }) {
  const router = useRouter();
  const supabase = createClient();
  const [post, setPost] = useState(EMPTY);
  const [tagsInput, setTagsInput] = useState("");
  const [loading, setLoading] = useState(!!postId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!postId || !supabase) return;
    (async () => {
      const { data } = await supabase.from("blog_posts").select("*").eq("id", postId).maybeSingle();
      if (data) {
        setPost(data);
        setTagsInput((data.tags || []).join(", "));
      }
      setLoading(false);
    })();
  }, [postId]);

  const onTitleChange = (v) => {
    setPost((p) => ({
      ...p,
      title: v,
      slug: p.slug || slugify(v),
    }));
  };

  const wordCount = (post.body_markdown || "").trim().split(/\s+/).filter(Boolean).length;
  const readingTime = Math.max(1, Math.round(wordCount / 220));

  const save = async ({ publish = null } = {}) => {
    if (!supabase) return;
    setError("");
    setSaving(true);
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    const payload = {
      slug: post.slug || slugify(post.title),
      title: post.title,
      excerpt: post.excerpt || null,
      cover_image_url: post.cover_image_url || null,
      body_markdown: post.body_markdown || "",
      tags,
      reading_time: readingTime,
      seo_title: post.seo_title || null,
      seo_description: post.seo_description || null,
    };
    if (publish === true) {
      payload.is_published = true;
      payload.published_at = post.published_at || new Date().toISOString();
    } else if (publish === false) {
      payload.is_published = false;
    } else {
      payload.is_published = post.is_published;
    }

    let result;
    if (postId) {
      result = await supabase.from("blog_posts").update(payload).eq("id", postId).select().maybeSingle();
    } else {
      result = await supabase.from("blog_posts").insert(payload).select().maybeSingle();
    }
    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }
    if (!postId && result.data) {
      router.replace(`/admin/blog/${result.data.id}`);
      return;
    }
    setPost((p) => ({ ...p, ...payload }));
  };

  if (!supabase) return <div className="rounded-xl border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-200">Supabase is not configured.</div>;
  if (loading) return <div className="text-sm text-[color:var(--color-muted)]">Loading…</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="w-9 h-9 rounded-full border border-[color:var(--color-stroke)] flex items-center justify-center hover:border-[color:var(--color-red)]">
            <ArrowLeft size={14} />
          </Link>
          <h1 className="font-display text-2xl font-extrabold">
            {postId ? "Edit post" : "New post"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {post.is_published && post.slug && (
            <Link href={`/blog/${post.slug}`} target="_blank" className="pill pill-outline text-sm">
              <Eye size={14} /> View
            </Link>
          )}
          <button onClick={() => save({ publish: false })} disabled={saving} className="pill pill-outline text-sm">
            <Save size={14} /> {post.is_published ? "Save & unpublish" : "Save draft"}
          </button>
          <button onClick={() => save({ publish: true })} disabled={saving} className="pill pill-red text-sm">
            {saving ? "Saving…" : post.is_published ? "Save & keep published" : "Publish"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-200">{error}</div>
      )}

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div className="card-elevated rounded-2xl p-6 space-y-4">
          <Field label="Title">
            <Input value={post.title || ""} onChange={(e) => onTitleChange(e.target.value)} placeholder="How I scaled a D2C brand to 4x ROAS" />
          </Field>
          <Field label="Slug (URL)">
            <Input value={post.slug || ""} onChange={(e) => setPost({ ...post, slug: slugify(e.target.value) })} placeholder="scaled-d2c-to-4x-roas" />
          </Field>
          <Field label="Excerpt (shown in list + social previews)">
            <Textarea rows={2} value={post.excerpt || ""} onChange={(e) => setPost({ ...post, excerpt: e.target.value })} />
          </Field>
          <Field label="Body (markdown)">
            <Textarea
              rows={20}
              value={post.body_markdown || ""}
              onChange={(e) => setPost({ ...post, body_markdown: e.target.value })}
              placeholder={"## Intro\n\nStart writing here. Markdown supported:\n\n- **bold**\n- *italic*\n- [links](https://…)\n- `code`\n\n```js\nconsole.log('hello');\n```"}
              className="w-full rounded-lg border border-[color:var(--color-stroke)] bg-[color:var(--color-surface)] px-3 py-2 text-sm outline-none focus:border-[color:var(--color-red)] resize-y font-mono leading-relaxed"
              style={{ minHeight: "400px" }}
            />
          </Field>
          <div className="text-xs text-[color:var(--color-muted)]">
            {wordCount} words · ~{readingTime} min read
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-elevated rounded-2xl p-5 space-y-4">
            <ImageUpload value={post.cover_image_url} onChange={(v) => setPost({ ...post, cover_image_url: v })} label="Cover image" />
          </div>
          <div className="card-elevated rounded-2xl p-5 space-y-4">
            <Field label="Tags (comma-separated)">
              <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="ads, saas, funnels" />
            </Field>
            <Field label="SEO title (optional)">
              <Input value={post.seo_title || ""} onChange={(e) => setPost({ ...post, seo_title: e.target.value })} />
            </Field>
            <Field label="SEO description (optional)">
              <Textarea rows={2} value={post.seo_description || ""} onChange={(e) => setPost({ ...post, seo_description: e.target.value })} />
            </Field>
          </div>
        </div>
      </div>
    </div>
  );
}
