"use client";

import { createClient } from "./client";

const BUCKET = "media";

export async function uploadMedia(file) {
  const supabase = createClient();
  if (!supabase) throw new Error("Supabase not configured");
  if (!file) throw new Error("No file");

  const ext = file.name.split(".").pop();
  const safe = file.name.replace(/[^a-z0-9.\-_]/gi, "_").toLowerCase();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safe}`;

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
    contentType: file.type,
  });
  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return { url: data.publicUrl, path };
}
