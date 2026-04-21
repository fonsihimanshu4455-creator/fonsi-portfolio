"use client";

import { useState } from "react";
import { Upload, X } from "lucide-react";
import { uploadMedia } from "@/lib/supabase/storage";

export default function ImageUpload({ value, onChange, label = "Image" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      const { url } = await uploadMedia(file);
      onChange(url);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <label className="block text-xs uppercase tracking-wider text-[color:var(--color-muted)] mb-2">
        {label}
      </label>

      {value ? (
        <div className="relative inline-block">
          <img
            src={value}
            alt=""
            className="w-40 h-40 object-cover rounded-xl border border-[color:var(--color-stroke)]"
          />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[color:var(--color-red)] flex items-center justify-center text-white"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="block cursor-pointer">
          <div className="w-40 h-40 rounded-xl border border-dashed border-[color:var(--color-stroke)] flex flex-col items-center justify-center text-[color:var(--color-muted)] text-xs hover:border-[color:var(--color-red)] hover:text-[color:var(--color-red)] transition-colors">
            <Upload size={20} />
            <span className="mt-2">{uploading ? "Uploading…" : "Click to upload"}</span>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFile}
            disabled={uploading}
          />
        </label>
      )}

      <input
        type="text"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder="…or paste image URL"
        className="mt-2 w-full max-w-md rounded-lg border border-[color:var(--color-stroke)] bg-[color:var(--color-surface)] px-3 py-2 text-sm outline-none focus:border-[color:var(--color-red)]"
      />

      {error && <div className="mt-2 text-xs text-red-300">{error}</div>}
    </div>
  );
}
