/**
 * /words view model — pure helpers shared by the client explorer and tests
 * (Wave 17 popup parity). No React here.
 */

export interface WordRow {
  id: string;
  lemma: string;
  pos: string | null;
  state: "new" | "learning" | "known" | "mastered" | string;
  createdAt: string; // ISO
  /** Latest encounter time (ISO) — the extension sorts by this. */
  lastSeenAt?: string | null;
  /** How many times the learner met / saved this word (encounters). */
  seenCount?: number;
  /** Short meaning in the learner's native language. */
  gloss?: string | null;
  /** Up to 3 extra meanings (popup "synonyms"). */
  senses?: string[];
  cefr?: string | null;
  sceneLine?: string | null;
  sourceTitle?: string | null;
  sourcePlatform?: string | null;
  thumbnail?: string | null;
}

/**
 * English copy for this surface. Wave 14 owns the i18n catalog
 * (src/lib/i18n/catalog); these strings are listed in AGENT-PLAYBOOK.md
 * "Wave 17 popup parity" so they can be moved into it.
 */
export const WORDS_STR = {
  countsHeader: (total: number, known: number) =>
    `${total} saved · ${known} known`,
  searchPlaceholder: "Search words or meanings…",
  allPlatforms: "All platforms",
  sortRecent: "Recent",
  sortAlpha: "A–Z",
  sortSeen: "Most seen",
  seenTimes: (n: number) => (n === 1 ? "seen once" : `seen ${n} times`),
  savedOn: (d: string) => `Saved ${d}`,
  iKnowThis: "I know this",
  reactivate: "Reactivate",
  remove: "Remove",
  removedOne: (w: string) => `Removed “${w}”`,
  removedMany: (n: number) => `Removed ${n} words`,
  undo: "Undo",
  select: "Select",
  cancel: "Cancel",
  deleteSelected: (n: number) => (n === 0 ? "Remove" : n === 1 ? "Remove 1 word" : `Remove ${n} words`),
  selectHint: "Tap words to select them",
  exportCsv: "Export CSV",
  exportAnki: "Export for Anki",
  alsoMeans: "Also",
  knownHint: "Known words leave your daily review. Reactivate to bring one back.",
  actionFailed: "That didn't save. Check your connection and try again.",
} as const;

export type SortKey = "recent" | "alpha" | "seen";

function recency(r: WordRow): number {
  const t = Date.parse(r.lastSeenAt ?? "") || Date.parse(r.createdAt) || 0;
  return t;
}

export function sortWords(rows: WordRow[], key: SortKey): WordRow[] {
  const out = [...rows];
  if (key === "alpha") out.sort((a, b) => a.lemma.localeCompare(b.lemma));
  else if (key === "seen")
    out.sort((a, b) => (b.seenCount ?? 0) - (a.seenCount ?? 0) || recency(b) - recency(a));
  else out.sort((a, b) => recency(b) - recency(a));
  return out;
}

