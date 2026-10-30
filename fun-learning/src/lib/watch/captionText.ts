/**
 * Display-only caption text helpers (Wave 16). Nothing here stores or sends
 * text anywhere — it only changes what the subtitle pane paints.
 */

/**
 * Port of the extension's "Remove bracket words" (`funlingo-subtitle-plus.js`):
 * strips `[music]`, `(laughs)`, `{sfx}` spans. Unbalanced openers hide to the
 * end of the line, like the extension. Returns `null` when nothing readable
 * (letters/digits) is left, so the caller can drop the whole line.
 */
export function stripBracketCues(text: string): string | null {
  let depth = 0;
  let out = "";
  for (const ch of text) {
    if (ch === "[" || ch === "(" || ch === "{") {
      depth++;
      continue;
    }
    if (ch === "]" || ch === ")" || ch === "}") {
      if (depth > 0) depth--;
      continue;
    }
    if (depth === 0) out += ch;
  }
  const cleaned = out
    .replace(/\s+([,.!?;:])/g, "$1")
    .replace(/\s{2,}/g, " ")
    .trim()
    .replace(/^[-–—:,\s]+/, "")
    .trim();
  return /[\p{L}\p{N}]/u.test(cleaned) ? cleaned : null;
}

/**
 * Find where `needle` (a word or lemma) appears in `haystack`, so the word
 * card can highlight it inside its example sentence (extension
 * `highlight-word`). Case-insensitive; prefers whole-word matches for
 * Latin-script needles, falls back to substring (CJK has no spaces).
 * Also understands the extension's `{word}` marker format.
 */
export function highlightRanges(
  haystack: string,
  needle: string,
): { text: string; hit: boolean }[] {
  if (!haystack) return [];
  if (haystack.includes("{") && haystack.includes("}")) {
    return haystack
      .split(/\{(.*?)\}/)
      .filter((s, i) => s.length > 0 || i % 2 === 1)
      .map((s, i) => ({ text: s, hit: i % 2 === 1 }));
  }
  const n = needle.trim();
  if (!n) return [{ text: haystack, hit: false }];
  const esc = n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const latin = /^[\p{Script=Latn}'’\- ]+$/u.test(n);
  // For Latin words, also catch simple inflections ("run" → "running").
  const re = latin
    ? new RegExp(`(?<![\\p{L}])(${esc}[\\p{L}]{0,4})(?![\\p{L}])`, "giu")
    : new RegExp(`(${esc})`, "giu");
  const parts: { text: string; hit: boolean }[] = [];
  let last = 0;
  for (const m of haystack.matchAll(re)) {
    const start = m.index ?? 0;
    if (start > last) parts.push({ text: haystack.slice(last, start), hit: false });
    parts.push({ text: m[0], hit: true });
    last = start + m[0].length;
  }
  if (last < haystack.length) parts.push({ text: haystack.slice(last), hit: false });
  return parts.length ? parts : [{ text: haystack, hit: false }];
}

/**
 * Lemma-aware "is this caption token a saved word?" check — the web port of
 * the extension's saved-word lookup index. Tries the token itself, then a
 * few cheap suffix strips (English/Romance plurals and verb endings).
 * Returns the matching saved lemma or null.
 */
export function matchSavedLemma(
  token: string,
  saved: ReadonlySet<string>,
): string | null {
  const t = token.toLowerCase().replace(/[’']/g, "'");
  if (saved.size === 0 || !t) return null;
  if (saved.has(t)) return t;
  const candidates: string[] = [];
  if (t.endsWith("ies") && t.length > 4) candidates.push(t.slice(0, -3) + "y");
  if (t.endsWith("es") && t.length > 3) candidates.push(t.slice(0, -2));
  if (t.endsWith("s") && t.length > 3) candidates.push(t.slice(0, -1));
  if (t.endsWith("ing") && t.length > 5) {
    candidates.push(t.slice(0, -3), t.slice(0, -3) + "e");
    if (t.length > 6 && t[t.length - 4] === t[t.length - 5]) candidates.push(t.slice(0, -4));
  }
  if (t.endsWith("ed") && t.length > 4) {
    candidates.push(t.slice(0, -2), t.slice(0, -1));
    if (t.length > 5 && t[t.length - 3] === t[t.length - 4]) candidates.push(t.slice(0, -3));
  }
  for (const c of candidates) if (saved.has(c)) return c;
  return null;
}
