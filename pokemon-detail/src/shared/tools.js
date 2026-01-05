export function getBestImage(json) {
  return (
    json?.sprites?.other?.dream_world?.front_default ||
    json?.sprites?.other?.["official-artwork"]?.front_default ||
    json?.sprites?.front_default ||
    ""
  );
}

export function initials(name) {
  return (name || "?").slice(0, 2).toUpperCase();
}

export function clampPct(stat) {
  const v = Number(stat);
  if (!Number.isFinite(v)) return 0;
  
  const pct = Math.round((v / 200) * 100);
  return Math.max(0, Math.min(100, pct));
}