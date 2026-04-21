import { marked } from "marked";

marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false,
});

export function mdToHtml(md = "") {
  return marked.parse(md);
}

export function readingTime(md = "") {
  const words = md.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}
