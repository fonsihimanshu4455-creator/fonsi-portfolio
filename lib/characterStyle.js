// Small helper: convert a {scale, offsetX, offsetY} settings object to a
// CSS style for character images. All fields are optional — defaults are
// scale=100 (no change), offsetX=0, offsetY=0.

export function characterStyle(settings) {
  const s = settings || {};
  const scale = Number.isFinite(s.scale) ? s.scale / 100 : 1;
  const x = Number.isFinite(s.offsetX) ? s.offsetX : 0;
  const y = Number.isFinite(s.offsetY) ? s.offsetY : 0;
  if (scale === 1 && x === 0 && y === 0) return undefined;
  return {
    transform: `translate(${x}px, ${y}px) scale(${scale})`,
    transformOrigin: "center bottom",
  };
}
