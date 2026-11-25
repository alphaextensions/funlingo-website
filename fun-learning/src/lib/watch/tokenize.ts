/**
 * Caption-line tokenizer. Returns the line as a sequence of {word, isWord}
 * spans so the UI can render each word as a clickable button for word-tap.
 *
 * Works for Latin (English, Spanish, …), Devanagari (Hindi), Arabic, CJK
 * (Japanese kanji, Chinese), Korean Hangul. CJK sequences come back as a
 * single run that the renderer may further split by character if the
 * script-specific breaker warrants it; for v1 we tap the whole run.
 */

export function tokenize(text: string): { word: string; isWord: boolean }[] {
  const out: { word: string; isWord: boolean }[] = [];
  const re = /([\p{L}][\p{L}\p{M}\p{N}'’\-]*|[^\p{L}]+)/gu;
  for (const m of text.matchAll(re)) {
    const w = m[0];
    const isWord = /^[\p{L}]/u.test(w);
    out.push({ word: w, isWord });
  }
  return out;
}
