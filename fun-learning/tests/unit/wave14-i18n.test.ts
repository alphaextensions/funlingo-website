/**
 * Wave 14 — UI-text catalog.
 *
 * Covers the catalog contract (key parity, fallback chain, interpolation,
 * RTL, brand names, placeholder integrity), the nativeLang-vs-learningLang
 * discipline, the client-slice size guard, and real rendered markup for a
 * Hindi-native learner (Talk index + a Tiny Lessons situation page).
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { CATALOGS, SUPPORTED_LOCALES, clientSlice, normalizeLocale, t } from "@/lib/i18n/catalog";
import { en } from "@/lib/i18n/catalog/en";
import { isRtl } from "@/lib/i18n/rtl";
import { catalogLocale, chromeLocale, getT } from "@/server/i18n";

const LOCALES = ["en", "hi", "es", "ja", "zh", "ar", "fr", "de", "pt", "ko", "it", "tr"];
const placeholders = (s: string) =>
  [...s.matchAll(/\{[a-zA-Z0-9_]+\}/g)].map((m) => m[0]).sort().join(",");

describe("catalog shape", () => {
  it("ships exactly the 12 chrome locales", () => {
    expect([...SUPPORTED_LOCALES].sort()).toEqual([...LOCALES].sort());
  });

  it("every locale exports the same key set as English (no missing, no extras)", () => {
    const enKeys = Object.keys(en).sort();
    for (const lang of LOCALES) {
      const keys = Object.keys(CATALOGS[lang]!).sort();
      const missing = enKeys.filter((k) => !keys.includes(k));
      const extra = keys.filter((k) => !enKeys.includes(k));
      expect({ lang, missing, extra }).toEqual({ lang, missing: [], extra: [] });
    }
  });

  it("no locale has an empty value", () => {
    for (const lang of LOCALES) {
      for (const [k, v] of Object.entries(CATALOGS[lang]!)) {
        expect(v.trim(), `${lang} ${k}`).not.toBe("");
      }
    }
  });

  it("every translation keeps the English {param} placeholders verbatim", () => {
    for (const lang of LOCALES) {
      for (const [k, v] of Object.entries(CATALOGS[lang]!)) {
        expect(placeholders(v), `${lang} ${k}`).toBe(placeholders(en[k as keyof typeof en]));
      }
    }
  });

  it("brand names stay untranslated in every locale", () => {
    for (const lang of LOCALES) {
      const c = CATALOGS[lang]!;
      expect(c["nav.railLearn"], lang).toBe("Fun Learning");
      expect(c["learn.heroTitleLine1"], lang).toBe("Fun");
      expect(c["learn.heroTitleLine2"], lang).toBe("Learning");
      expect(c["app.title"], lang).toContain("Funlingo");
      expect(c["learn.footer"], lang).toContain("Funlingo");
    }
  });
});

describe("t() — fallback chain + interpolation", () => {
  it("interpolates {n} — 12 phrases in Hindi", () => {
    expect(t("tinyLessons.phrasesPlural", "hi", { n: 12 })).toBe("12 वाक्यांश");
    expect(t("tinyLessons.phrasesPlural", "en", { n: 12 })).toBe("12 phrases");
  });

  it("interpolates several params, any order", () => {
    expect(t("deck.counterIn", "en", { current: 3, total: 12, situation: "Airport" })).toBe(
      "3 / 12 in Airport",
    );
    expect(t("deck.counterIn", "ja", { current: 3, total: 12, situation: "空港" })).toBe("空港：3 / 12");
  });

  it("unknown lang → English", () => {
    expect(t("deck.navNext", "xx")).toBe("Next");
    expect(t("deck.navNext", null)).toBe("Next");
    expect(t("deck.navNext", undefined)).toBe("Next");
    expect(t("deck.navNext", "")).toBe("Next");
  });

  it("unknown key → the key itself, never throws", () => {
    expect(t("does.not.exist", "hi")).toBe("does.not.exist");
    expect(() => t("does.not.exist", "zz", { n: 1 })).not.toThrow();
  });

  it("a missing param stays visible as its placeholder (loud, not silent)", () => {
    expect(t("tinyLessons.phrasesPlural", "en")).toBe("{n} phrases");
  });

  it("regional / script tags collapse to the catalog locale", () => {
    expect(normalizeLocale("hi-IN")).toBe("hi");
    expect(normalizeLocale("pt_BR")).toBe("pt");
    expect(normalizeLocale("zh-Hans")).toBe("zh");
    expect(normalizeLocale("ES")).toBe("es");
    expect(normalizeLocale("mr")).toBe("en"); // no Marathi catalog yet
  });

  it("Arabic: returns the Arabic string and isRtl('ar') is true", () => {
    const explore = t("learn.ctaExplore", "ar");
    expect(explore).toBe("استكشف");
    expect(/[؀-ۿ]/.test(explore)).toBe(true);
    expect(isRtl("ar")).toBe(true);
  });
});

describe("nativeLang vs activeLearningLang discipline", () => {
  const hindiLearningJapanese = {
    user: { nativeLang: "hi", uiLocale: "hi", activeLearningLang: "ja" },
  } as unknown as Parameters<typeof getT>[0];

  it("chrome follows nativeLang, NOT the learning language", () => {
    expect(chromeLocale(hindiLearningJapanese)).toBe("hi");
    expect(getT(hindiLearningJapanese)("deck.navNext")).toBe("अगला");
  });

  it("falls back nativeLang → uiLocale → en, and never to activeLearningLang", () => {
    const uiOnly = { user: { nativeLang: null, uiLocale: "fr", activeLearningLang: "ja" } };
    const neither = { user: { nativeLang: null, uiLocale: "", activeLearningLang: "ja" } };
    expect(chromeLocale(uiOnly as never)).toBe("fr");
    expect(chromeLocale(neither as never)).toBe("en");
    expect(chromeLocale({ user: null } as never)).toBe("en");
  });

  it("keeps the RAW code for lang/dir/fonts even without a text catalog", () => {
    // A Marathi or Urdu native must keep their font stack / RTL direction.
    const urdu = { user: { nativeLang: "ur", uiLocale: "ur", activeLearningLang: "en" } };
    expect(chromeLocale(urdu as never)).toBe("ur");
    expect(isRtl(chromeLocale(urdu as never))).toBe(true);
    expect(catalogLocale(urdu as never)).toBe("en"); // text falls back to English
  });
});

describe("client slice (what ships to the browser)", () => {
  it("contains the keys client components render", () => {
    const s = clientSlice("hi");
    for (const k of ["nav.railTalk", "deck.navNext", "quiz.prompt", "talkLesson.send", "words.filterSaved", "read.tabClassics"]) {
      expect(s[k], k).toBeTruthy();
    }
    expect(s["deck.navNext"]).toBe("अगला");
  });

  it("excludes server-only chrome (page ledes, metadata)", () => {
    const s = clientSlice("hi");
    for (const k of ["talk.lede", "app.title", "words.lede", "read.lede", "learn.welcomeBody"]) {
      expect(s[k], k).toBeUndefined();
    }
  });

  it("stays small — one locale's slice is well under 25 KB of JSON", () => {
    for (const lang of LOCALES) {
      const bytes = new TextEncoder().encode(JSON.stringify(clientSlice(lang))).length;
      expect(bytes, lang).toBeLessThan(25_000);
    }
  });
});

// ---------------------------------------------------------------------------
// Rendered markup for a Hindi-native learner studying Spanish.
// ---------------------------------------------------------------------------

const hindiViewer = {
  userId: "u_hi",
  user: { id: "u_hi", nativeLang: "hi", uiLocale: "hi", activeLearningLang: "es" },
  activeLang: "es",
};

vi.mock("@/server/session", () => ({ getViewer: vi.fn(async () => hindiViewer) }));
vi.mock("@/server/db", () => ({
  prisma: {
    talkTopic: { findMany: vi.fn(async () => []) },
    user: { findUnique: vi.fn(async () => null) },
  },
}));
vi.mock("next/navigation", () => ({
  notFound: () => { throw new Error("NOT_FOUND"); },
  // Client components rendered server-side (e.g. Wave 15's EscapeTo) call these.
  useRouter: () => ({ push() {}, replace() {}, back() {}, refresh() {}, prefetch() {} }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("Hindi-native learner — rendered markup", () => {
  beforeEach(() => vi.clearAllMocks());

  it("/talk: chrome is Hindi, English chrome is gone", async () => {
    const { default: TalkIndexPage } = await import("../../app/talk/page");
    const html = renderToStaticMarkup(await TalkIndexPage({ searchParams: Promise.resolve({}) }));
    // English chrome must be absent…
    expect(html).not.toContain("Say it out loud.");
    expect(html).not.toMatch(/\b\d+ tasks\b/);
    expect(html).not.toContain("Pick a scene, choose a difficulty");
    // …and the Hindi equivalents present.
    expect(html).toContain("ज़ोर से बोलकर देखें।");
    expect(html).toMatch(/\d+ टास्क/);
    expect(html).toContain("एक सीन चुनें");
  });

  it("Tiny Lessons situation page: '12 phrases' style line is Hindi", async () => {
    const { listSituations } = await import("@/lib/learn/content");
    const first = listSituations("es")[0];
    expect(first, "expected at least one Spanish situation pack").toBeTruthy();
    const { default: TinyLessonPage } = await import("../../app/learn/tiny-lessons/[situation]/page");
    const html = renderToStaticMarkup(
      await TinyLessonPage({ params: Promise.resolve({ situation: first!.slug }) }),
    );
    const n = first!.phrases.length;
    expect(html).not.toContain(`${n} phrases`);
    expect(html).toContain(`${n} वाक्यांश`);
  });

  it("Tiny Lessons picker: per-tile phrase counts are Hindi", async () => {
    const { default: TinyLessonsIndex } = await import("../../app/learn/tiny-lessons/page");
    const html = renderToStaticMarkup(await TinyLessonsIndex());
    expect(html).not.toMatch(/\b\d+ phrases\b/);
    expect(html).toMatch(/\d+ वाक्यांश/);
    expect(html).toContain("छोटे पाठ"); // [ext] learn.situationsTitle in Hindi
  });
});
