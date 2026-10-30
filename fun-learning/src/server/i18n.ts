/**
 * Server-side UI-text helpers — Wave 14.
 *
 * THE RULE: UI chrome keys off the viewer's NATIVE language, never the
 * learning language. A Hindi-native learner studying Japanese sees Hindi
 * buttons around Japanese content. `activeLearningLang` drives CONTENT
 * (topics, packs, decks); `nativeLang` drives CHROME (labels, counters).
 *
 * Resolution order for the chrome locale:
 *   user.nativeLang → user.uiLocale → "en"
 * (LangPills writes nativeLang + uiLocale together, so they normally agree;
 * uiLocale is only a fallback for rows created before nativeLang existed.)
 *
 * Usage in a server component:
 *   const viewer = await getViewer();
 *   const t = getT(viewer);
 *   return <p>{t("talk.lede")}</p>;
 */

import type { Viewer } from "@/server/session";
import { bindT, normalizeLocale } from "@/lib/i18n/catalog";

/**
 * The viewer's chrome locale, RAW (e.g. "mr", "ur", "hi").
 *
 * Deliberately NOT normalised to the 12 catalog locales: `<html lang/dir>`
 * and the per-locale font overrides must still see "mr" / "gu" / "ur" /
 * "he" even though we have no text catalog for them yet (their chrome
 * TEXT falls back to English inside `t()`, but their fonts and RTL
 * direction must not). Use `catalogLocale()` when you need the catalog code.
 */
type ViewerLike = (Pick<Viewer, "user"> & Partial<Pick<Viewer, "nativeLang">>) | null | undefined;

export function chromeLocale(viewer: ViewerLike): string {
  const user = viewer?.user;
  // Signed-in: the user row. Signed-out: `viewer.nativeLang`, which
  // getViewer() fills from the `fl_native` cookie LangPills sets (Wave 15+).
  const raw = (user?.nativeLang ?? user?.uiLocale ?? viewer?.nativeLang ?? "").trim();
  return raw || "en";
}

/** The catalog locale (one of our 12 codes) for this viewer's chrome. */
export function catalogLocale(viewer: ViewerLike): string {
  return normalizeLocale(chromeLocale(viewer));
}

/** A `t(key, params?)` bound to the viewer's chrome (native) locale. */
export function getT(viewer: ViewerLike) {
  return bindT(catalogLocale(viewer));
}
