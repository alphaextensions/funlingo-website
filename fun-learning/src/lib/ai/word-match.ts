/**
 * Wave 9 — honest word-level comparison between an ASR transcript and a
 * reference sentence. Replaces the fake phoneme-level "pronunciation
 * score" with a plain, defensible claim:
 *
 *   "Did the learner say roughly these words, roughly in this order?"
 *
 * We tokenize both strings, align them with a lightweight LCS-based
 * matcher (classic diff algorithm — the same core edit as git-diff), and
 * return a flat ordered list of {word, state} chips the UI can render
 * directly. The output deliberately has NO per-phoneme fields, NO 0-100
 * "accuracy" number, and NO phonetic tips — all three were claims we
 * couldn't back up with on-device Whisper.
 *
 * Scripts with no whitespace (zh / ja / th) use their own tokenizers:
 *   - `Intl.Segmenter` with `granularity: "word"` is used for zh, ja, ko,
 *     and th when available. On older engines without `Intl.Segmenter` we
 *     fall back to a per-character tokenization (over-aggressive but
 *     non-silent).
 *   - Latin / Cyrillic / Devanagari / Arabic are whitespace-tokenized.
 *
 * This module is pure, synchronous, and safe to run on both the client and
 * the server.
 */

export type MatchState = "match" | "miss" | "extra";

export interface WordChip {
  word: string;
  state: MatchState;
}

export interface WordMatchResult {
  words: WordChip[];
  matchedCount: number;
  /** Number of reference tokens (so UI can say "7 of 8 words matched"). */
  totalCount: number;
}

// Languages that typically don't delimit words with whitespace.
const CJK_LANGS = new Set(["zh", "ja", "ko", "th"]);

function primaryLang(lang: string | undefined | null): string {
  if (!lang) return "en";
  return lang.toLowerCase().split(/[-_]/)[0];
}

/**
 * Tokenize a sentence for a given language, lower-cased and with simple
 * punctuation stripped. Returns the raw tokens in order — downstream match
 * logic handles de-duplication.
 */
export function tokenize(text: string, lang: string): string[] {
  const primary = primaryLang(lang);
  const trimmed = (text ?? "").trim();
  if (!trimmed) return [];
  if (CJK_LANGS.has(primary)) {
    return segmentCjk(trimmed, primary);
  }
  return segmentWhitespace(trimmed);
}

function segmentWhitespace(text: string): string[] {
  const stripped = text
    // Keep letters, marks (combining), numbers, and whitespace from any
    // script. The `u` flag is safe here — all our target browsers / Node
    // supports it.
    .replace(/[^\p{L}\p{M}\p{N}\s'’]/gu, " ")
    .toLowerCase();
  // Remove possessive apostrophes but keep contractions ("don't").
  return stripped
    .split(/\s+/)
    .map((t) => t.replace(/^['’]+|['’]+$/g, ""))
    .filter(Boolean);
}

function segmentCjk(text: string, lang: string): string[] {
  const stripped = text.replace(/[^\p{L}\p{M}\p{N}\s]/gu, "");
  // Modern browsers + Node 18+ ship Intl.Segmenter. We prefer it; the
  // alternative is per-grapheme which is still non-silent.
  const Segmenter = (
    globalThis as unknown as {
      Intl?: {
        Segmenter?: new (
          lang: string,
          opts: { granularity: "word" },
        ) => { segment(input: string): Iterable<{ segment: string; isWordLike?: boolean }> };
      };
    }
  ).Intl?.Segmenter;
  if (Segmenter) {
    const seg = new Segmenter(lang, { granularity: "word" });
    const out: string[] = [];
    for (const piece of seg.segment(stripped)) {
      const chunk = piece.segment.trim();
      if (!chunk) continue;
      // Keep every chunk Intl marks as word-like; for Japanese kana / kanji
      // this includes particles like "は" which is what we want (word-level
      // match should credit the particle).
      if (piece.isWordLike ?? true) out.push(chunk.toLowerCase());
    }
    return out;
  }
  // Fallback: a per-character tokenization for CJK is "too strict", but
  // non-silent. Collapse runs of digits so numbers stay together.
  const out: string[] = [];
  let numRun = "";
  for (const ch of stripped) {
    if (/\s/.test(ch)) continue;
    if (/[0-9]/.test(ch)) {
      numRun += ch;
      continue;
    }
    if (numRun) {
      out.push(numRun);
      numRun = "";
    }
    out.push(ch.toLowerCase());
  }
  if (numRun) out.push(numRun);
  return out;
}

/**
 * Classic Longest-Common-Subsequence table. Returns the backtracked
 * alignment as a sequence of operations: "equal" (a token present in both
 * at this position), "miss" (reference-only — the learner didn't say it)
 * and "extra" (hypothesis-only — the learner said something that isn't in
 * the reference).
 *
 * We prefer this over Smith-Waterman because the inputs are short (typical
 * sentence: 5–20 tokens), the sequences aren't biological, and LCS gives
 * the exact "in order" semantics the UI promises.
 */
function alignLcs(
  reference: string[],
  hypothesis: string[],
): WordChip[] {
  const r = reference.length;
  const h = hypothesis.length;
  // dp[i][j] = length of LCS of reference[0..i) and hypothesis[0..j)
  const dp: number[][] = Array.from({ length: r + 1 }, () =>
    new Array<number>(h + 1).fill(0),
  );
  for (let i = 1; i <= r; i++) {
    for (let j = 1; j <= h; j++) {
      if (reference[i - 1] === hypothesis[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  // Backtrack.
  const out: WordChip[] = [];
  let i = r;
  let j = h;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && reference[i - 1] === hypothesis[j - 1]) {
      out.unshift({ word: reference[i - 1], state: "match" });
      i--;
      j--;
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      out.unshift({ word: hypothesis[j - 1], state: "extra" });
      j--;
    } else if (i > 0) {
      out.unshift({ word: reference[i - 1], state: "miss" });
      i--;
    }
  }
  return out;
}

/**
 * Compare an ASR transcript against a reference sentence. Returns an
 * ordered list of chips the UI renders as "match / miss / extra" plus the
 * numeric counts for the one-line summary ("7 of 8 words matched").
 */
export function wordMatch(
  transcript: string,
  reference: string,
  lang: string,
): WordMatchResult {
  const refTokens = tokenize(reference, lang);
  const hypTokens = tokenize(transcript, lang);
  const words = alignLcs(refTokens, hypTokens);
  const matchedCount = words.filter((w) => w.state === "match").length;
  return {
    words,
    matchedCount,
    totalCount: refTokens.length,
  };
}
