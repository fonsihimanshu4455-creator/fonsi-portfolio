"use client";

import ImageUpload from "./ImageUpload";
import { RotateCcw } from "lucide-react";

function NumInput({ label, value, onChange, min, max, step = 1 }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-wider text-[color:var(--color-muted)] mb-1">
        {label}
      </span>
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          const n = Number(e.target.value);
          onChange(Number.isFinite(n) ? n : 0);
        }}
        className="w-full rounded-lg border border-[color:var(--color-stroke)] bg-[color:var(--color-surface)] px-2 py-1.5 text-sm outline-none focus:border-[color:var(--color-red)]"
      />
    </label>
  );
}

export default function CharacterField({
  label,
  hint,
  url,
  onUrlChange,
  settings,
  onSettingsChange,
}) {
  const s = settings || {};
  const scale = Number.isFinite(s.scale) ? s.scale : 100;
  const offsetX = Number.isFinite(s.offsetX) ? s.offsetX : 0;
  const offsetY = Number.isFinite(s.offsetY) ? s.offsetY : 0;
  const update = (patch) => onSettingsChange({ ...s, ...patch });
  const reset = () => onSettingsChange({});

  return (
    <div className="rounded-xl border border-[color:var(--color-stroke)] p-5 space-y-4 bg-[color:var(--color-bg-2)]/40">
      <ImageUpload value={url} onChange={onUrlChange} label={label} />
      {hint && <p className="text-xs text-[color:var(--color-muted)] -mt-2">{hint}</p>}
      <div className="grid grid-cols-3 gap-2">
        <NumInput label="Scale %" value={scale} min={20} max={300} step={5} onChange={(v) => update({ scale: v })} />
        <NumInput label="Offset X (px)" value={offsetX} min={-500} max={500} step={5} onChange={(v) => update({ offsetX: v })} />
        <NumInput label="Offset Y (px)" value={offsetY} min={-500} max={500} step={5} onChange={(v) => update({ offsetY: v })} />
      </div>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-1 text-xs text-[color:var(--color-muted)] hover:text-[color:var(--color-red)] transition-colors"
      >
        <RotateCcw size={11} /> Reset position & scale
      </button>
    </div>
  );
}
