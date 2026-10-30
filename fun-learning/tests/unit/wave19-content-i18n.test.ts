/**
 * Wave 19 — content-surface i18n.
 *
 * Wave 14 built the UI-chrome catalog; Wave 19 folds the deferred
 * English-only string sources (watch player, settings, progress, sentences,
 * library, onboarding web-only, feedback, words) into it so a non-English
 * native sees those surfaces in their native language while the study
 * CONTENT stays in the language they're learning.
 *
 * The catalog key-parity / placeholder / brand contract across all 12 locales
 * is enforced by wave14-i18n.test.ts (it iterates the whole EN key set), so
 * this file covers the Wave 19-specific guarantees: the new key families
 * exist and are translated, the Watch route ships its big slice WITHOUT
 * bloating the global one, learn.welcomeBody no longer strands English
 * feature names, and real server-rendered page bodies come out in Hindi.
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CATALOGS,
  clientSlice,
  watchClientSlice,
  pageClientSlice,
  SETTINGS_KEY_PREFIXES,
  ONBOARDING_KEY_PREFIXES,
  SENTENCES_KEY_PREFIXES,
  t,
} from "@/lib/i18n/catalog";
import { en } from "@/lib/i18n/catalog/en";

const LOCALES = ["en", "hi", "es", "ja", "zh", "ar", "fr", "de", "pt", "ko", "it", "tr"];

describe("Wave 19 — new key families exist and are translated", () => {
  const sample = [
    "watch.glowHint",
    "watch.modeDefault",
    "watch.demoTryTitle",
    "settings.appearance",
    "settings.themeSystem",
    "progress.currentStreak",
    "sentences.tabFavorite",
    "library.videosTitle",
    "onboarding.skipForNow",
    "feedback.audioFeedback",
    "words.allPlatforms",
  ];

  it("defines each sampled key in English", () => {
    for (const k of sample) expect(en[k as keyof typeof en], k).toBeTruthy();
  });

  it("translates each sampled key in every locale (non-empty, not left as the raw key)", () => {
    for (const lang of LOCALES) {
      for (const k of sample) {
        const v = CATALOGS[lang]![k];
        expect(v, `${lang} ${k}`).toBeTruthy();
        expect(v, `${lang} ${k}`).not.toBe(k);
      }
    }
  });

  it("a non-English locale actually differs from English for a visible watch label", () => {
    // Guards against a locale silently falling back to English for the whole
    // new surface (which the parity test alone would not catch).
    for (const lang of ["hi", "es", "ja", "ar"]) {
      expect(CATALOGS[lang]!["watch.modeDefault"], lang).not.toBe(en["watch.modeDefault"]);
    }
  });
});

describe("Wave 19 — interpolation on new keys", () => {
  it("interpolates a word into the removed-from-saved toast", () => {
    expect(t("watch.removed", "en", { w: "break" })).toBe("Removed “break” from your words");
    expect(t("watch.removed", "hi", { w: "break" })).toContain("break");
  });

  it("keeps the demo banner's {lang} placeholder resolvable", () => {
    expect(t("watch.demoSignedInBanner", "en", { lang: "ES" })).toContain("ES");
    expect(t("watch.demoSignedInBanner", "hi", { lang: "ES" })).toContain("ES");
  });
});

describe("Wave 19 — learn.welcomeBody strands no English feature names", () => {
  it("uses {replay}/{quiz}/{lessons}/{slang} placeholders in every locale", () => {
    for (const lang of LOCALES) {
      const body = CATALOGS[lang]!["learn.welcomeBody"];
      for (const p of ["{replay}", "{quiz}", "{lessons}", "{slang}"]) {
        expect(body, `${lang} ${p}`).toContain(p);
      }
    }
  });

  it("does not hardcode the English tile names mid-sentence in a non-English locale", () => {
    for (const lang of ["hi", "ar", "ja", "zh", "ko"]) {
      const body = CATALOGS[lang]!["learn.welcomeBody"];
      expect(body, lang).not.toContain("Word Replay");
      expect(body, lang).not.toContain("Quick Quiz");
    }
  });

  it("renders naturally when the (translated) tile titles are interpolated", () => {
    const rendered = t("learn.welcomeBody", "hi", {
      replay: t("learn.replayTitle", "hi"),
      quiz: t("learn.quizTitle", "hi"),
      lessons: t("learn.lessonsTitle", "hi"),
      slang: t("learn.slangTitle", "hi"),
    });
    expect(rendered).not.toContain("{replay}");
    expect(rendered).not.toContain("{");
  });
});

describe("Wave 19 — client bundle discipline", () => {
  it("the GLOBAL client slice does NOT carry the ~185 watch.* keys", () => {
    const s = clientSlice("hi");
    const watchKeys = Object.keys(s).filter((k) => k.startsWith("watch."));
    expect(watchKeys).toEqual([]);
  });

  it("the WATCH slice carries watch.* keys plus the global chrome keys", () => {
    const s = watchClientSlice("hi");
    expect(s["watch.glowHint"]).toBeTruthy();
    expect(s["watch.modeDefault"]).toBeTruthy();
    // still includes shared chrome (nav) so nothing inside /watch renders raw.
    expect(s["nav.railTalk"]).toBeTruthy();
  });

  it("single-page surfaces are page-scoped, NOT in the global slice", () => {
    const g = clientSlice("hi");
    for (const k of ["settings.themeSystem", "sentences.tabFavorite", "feedback.audioFeedback", "onboarding.skipForNow"]) {
      expect(g[k], `global should not carry ${k}`).toBeUndefined();
    }
    // …but each reaches its own page slice (global chrome + the page's keys).
    expect(pageClientSlice("hi", SETTINGS_KEY_PREFIXES)["settings.themeSystem"]).toBeTruthy();
    expect(pageClientSlice("hi", SETTINGS_KEY_PREFIXES)["feedback.audioFeedback"]).toBeTruthy();
    expect(pageClientSlice("hi", SETTINGS_KEY_PREFIXES)["nav.railHome"]).toBeTruthy();
    expect(pageClientSlice("hi", ONBOARDING_KEY_PREFIXES)["onboarding.skipForNow"]).toBeTruthy();
    expect(pageClientSlice("hi", SENTENCES_KEY_PREFIXES)["sentences.tabFavorite"]).toBeTruthy();
  });

  it("every locale's global slice stays under 25 KB; the biggest page slice (watch) under 45 KB", () => {
    for (const lang of LOCALES) {
      const g = new TextEncoder().encode(JSON.stringify(clientSlice(lang))).length;
      const w = new TextEncoder().encode(JSON.stringify(watchClientSlice(lang))).length;
      expect(g, `global ${lang}`).toBeLessThan(25_000);
      expect(w, `watch ${lang}`).toBeLessThan(45_000);
    }
  });

  it("/words client keys (on the global provider) are present globally", () => {
    const g = clientSlice("hi");
    for (const k of ["words.allPlatforms", "words.sortRecent", "words.knownHint"]) {
      expect(g[k], k).toBeTruthy();
    }
  });
});

// ---------------------------------------------------------------------------
// Real server-rendered page bodies for a Hindi-native learner studying Spanish.
// These pages resolve copy with getT(viewer) (server), so the markup is Hindi
// with no I18nProvider needed.
// ---------------------------------------------------------------------------

const hindiViewer = {
  userId: null,
  user: null,
  activeLang: "es",
  nativeLang: "hi",
};

vi.mock("@/server/session", () => ({ getViewer: vi.fn(async () => hindiViewer) }));
vi.mock("@/server/db", () => ({
  prisma: {
    activity: { findMany: vi.fn(async () => []) },
    streak: { findUnique: vi.fn(async () => null) },
    userWord: { groupBy: vi.fn(async () => []), count: vi.fn(async () => 0) },
    sentence: { count: vi.fn(async () => 0), findMany: vi.fn(async () => []) },
    pack: { findMany: vi.fn(async () => []) },
    source: { findMany: vi.fn(async () => []) },
    follow: { findMany: vi.fn(async () => []) },
  },
}));
vi.mock("next/navigation", () => ({
  notFound: () => { throw new Error("NOT_FOUND"); },
  useRouter: () => ({ push() {}, replace() {}, back() {}, refresh() {}, prefetch() {} }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("Hindi-native learner — server-rendered page bodies", () => {
  beforeEach(() => vi.clearAllMocks());

  it("/progress (signed out): header + empty state are Hindi", async () => {
    const { default: ProgressPage } = await import("../../app/progress/page");
    const html = renderToStaticMarkup(await ProgressPage());
    expect(html).not.toContain("Your progress");
    expect(html).not.toContain("Sign in to see your streak and stats");
    expect(html).toContain(CATALOGS.hi!["progress.title"]);
    expect(html).toContain(CATALOGS.hi!["progress.signedOutTitle"]);
  });

  it("/sentences (signed out): header + empty state are Hindi", async () => {
    const { default: SentencesPage } = await import("../../app/sentences/page");
    const html = renderToStaticMarkup(
      await SentencesPage({ searchParams: Promise.resolve({}) }),
    );
    expect(html).not.toContain("Saved sentences");
    expect(html).not.toContain("Save a line while you watch");
    expect(html).toContain(CATALOGS.hi!["sentences.signedOutTitle"]);
  });

  it("/settings (signed out): body chrome is Hindi, English chrome gone", async () => {
    const { default: SettingsPage } = await import("../../app/settings/page");
    const html = renderToStaticMarkup(await SettingsPage());
    expect(html).not.toContain("Sign in to change your settings");
    expect(html).toContain(CATALOGS.hi!["settings.signedOutTitle"]);
    expect(html).toContain(CATALOGS.hi!["settings.appearance"]);
  });
});
