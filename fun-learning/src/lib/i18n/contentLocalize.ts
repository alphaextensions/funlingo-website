/**
 * Render-time localization for a small, bounded set of SEED-CONTENT strings
 * that a non-English native must read to USE the product — not the study
 * content itself.
 *
 * These surfaces are stored in English in the DB / compiled seed catalog and
 * mapped English → catalog key at render time, keyed on the viewer's NATIVE
 * language (via a `t` already bound to that locale — `getT(viewer)` server-side
 * or `useT()` client-side). Study content (the actual phrases/sentences/book
 * text/word glosses), topic titles in the learning language, and brand names
 * stay as-is.
 *
 * Covered (PM review 2026-10-29 P1 #2 — the last "language is still a barrier"
 * gap):
 *   • Talk scene categories           → talkContent.cat.<categoryKey>
 *   • Talk situation blurbs            → talkContent.blurb.<situationSlug>
 *   • Talk lesson titles + scenes      → talkContent.<situationSlug>.<slotSlug>.{title,scene}
 *   • Library taxonomy labels          → library.cat.<slug>
 *
 * Keys are the STABLE slugs the catalog already uses (situationSlug + slot
 * slug; podcast/channel category slug), so the mapping survives a re-seed. A
 * string with no matching catalog key falls back to the stored English, so a
 * hard-coded fallback topic (coffee/friend/…) or a future situation that lacks
 * a key simply renders English — never a raw key.
 */

/** A `t(key, params?)` already bound to the viewer's native locale. */
export type BoundT = (key: string, params?: Record<string, string | number>) => string;

/**
 * Resolve a catalog key, falling back to a stored English value when the key
 * is absent. `t()` returns the raw key on a miss (contains a dot, never a real
 * value), so `v === key` is a reliable "missing" signal.
 */
function resolve(t: BoundT, key: string, fallback: string): string {
  const v = t(key);
  return v === key ? fallback : v;
}

/* ----------------------------- Talk ------------------------------------- */

/** English category (from SITUATION_CATEGORIES) → catalog key. */
const CATEGORY_KEY: Readonly<Record<string, string>> = {
  "Daily life": "talkContent.cat.dailyLife",
  Food: "talkContent.cat.food",
  Health: "talkContent.cat.health",
  Social: "talkContent.cat.social",
  Travel: "talkContent.cat.travel",
  Work: "talkContent.cat.work",
};

/**
 * Recover the stable situation slug from a compiled topic id.
 * Seeded ids are `topic:v2:<localeTag>:<situationSlug>`; the hard-coded
 * fallback catalog uses `topic:<slug>` (no v2) and has no content keys, so it
 * returns null and the caller keeps the stored English.
 */
export function situationSlugFromTopicId(id: string): string | null {
  const parts = id.split(":");
  if (parts[0] === "topic" && parts[1] === "v2" && parts.length >= 4) {
    return parts.slice(3).join(":");
  }
  return null;
}

export function localizeTalkCategory(t: BoundT, englishCategory: string): string {
  const key = CATEGORY_KEY[englishCategory];
  return key ? resolve(t, key, englishCategory) : englishCategory;
}

export function localizeTalkBlurb(t: BoundT, topicId: string, englishBlurb: string): string {
  const sit = situationSlugFromTopicId(topicId);
  return sit ? resolve(t, `talkContent.blurb.${sit}`, englishBlurb) : englishBlurb;
}

export function localizeLessonTitle(
  t: BoundT,
  topicId: string,
  lessonSlug: string,
  englishTitle: string,
): string {
  const sit = situationSlugFromTopicId(topicId);
  return sit ? resolve(t, `talkContent.${sit}.${lessonSlug}.title`, englishTitle) : englishTitle;
}

export function localizeLessonScene(
  t: BoundT,
  topicId: string,
  lessonSlug: string,
  englishScene: string,
): string {
  const sit = situationSlugFromTopicId(topicId);
  return sit ? resolve(t, `talkContent.${sit}.${lessonSlug}.scene`, englishScene) : englishScene;
}

/* ----------------------------- Library ---------------------------------- */

/**
 * Localize a Library taxonomy label by its stable slug (podcast + YouTube
 * channel category slugs, e.g. "society-culture", "language-learning"). Falls
 * back to the English label shipped in the seed JSON.
 */
export function localizeLibraryCategory(t: BoundT, slug: string, englishLabel: string): string {
  return resolve(t, `library.cat.${slug}`, englishLabel);
}
