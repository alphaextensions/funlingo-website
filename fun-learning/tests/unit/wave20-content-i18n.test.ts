/**
 * Wave 20 — Talk + Library SEED-CONTENT i18n (PM review 2026-10-29 P1 #2).
 *
 * The last "language is still a barrier" gap: the small, bounded set of
 * seed-content strings a non-English native must READ to use the product —
 * Talk scene categories/blurbs/lesson names + Library taxonomy labels — now
 * render in the learner's NATIVE language. Study content, learning-language
 * topic titles, and brand stay as-is.
 *
 * This file covers: the new key families exist + are translated in all 12
 * locales; the render-time mapping helpers (English → native, with a safe
 * English fallback for unmapped topics); the client-bundle discipline (these
 * keys never bloat the global <25 KB slice); and a real Hindi-rendered /talk.
 */

import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CATALOGS,
  bindT,
  clientSlice,
  pageClientSlice,
  LIBRARY_KEY_PREFIXES,
} from "@/lib/i18n/catalog";
import { en } from "@/lib/i18n/catalog/en";
import {
  localizeTalkCategory,
  localizeTalkBlurb,
  localizeLessonTitle,
  localizeLessonScene,
  localizeLibraryCategory,
  situationSlugFromTopicId,
} from "@/lib/i18n/contentLocalize";

const LOCALES = ["en", "hi", "es", "ja", "zh", "ar", "fr", "de", "pt", "ko", "it", "tr"];

// The full key set this pass added.
const CONTENT_KEYS = Object.keys(en).filter(
  (k) => k.startsWith("talkContent.") || k.startsWith("library.cat."),
);

describe("Wave 20 — new content key families", () => {
  it("adds the expected count (6 categories + 8 blurbs + 48 lesson title/scene + 10 taxonomy)", () => {
    expect(CONTENT_KEYS.filter((k) => k.startsWith("talkContent.cat.")).length).toBe(6);
    expect(CONTENT_KEYS.filter((k) => k.startsWith("talkContent.blurb.")).length).toBe(8);
    expect(
      CONTENT_KEYS.filter((k) => k.startsWith("talkContent.") && (k.endsWith(".title") || k.endsWith(".scene"))).length,
    ).toBe(48);
    expect(CONTENT_KEYS.filter((k) => k.startsWith("library.cat.")).length).toBe(10);
  });

  it("every content key is translated in every locale (non-empty, not the raw key)", () => {
    for (const lang of LOCALES) {
      for (const k of CONTENT_KEYS) {
        const v = CATALOGS[lang]![k];
        expect(v, `${lang} ${k}`).toBeTruthy();
        expect(v, `${lang} ${k}`).not.toBe(k);
      }
    }
  });

  it("a non-English locale actually differs from English for visible content", () => {
    for (const lang of ["hi", "es", "ja", "ar"]) {
      for (const k of ["talkContent.cat.food", "talkContent.blurb.restaurant", "library.cat.society-culture"]) {
        expect(CATALOGS[lang]![k], `${lang} ${k}`).not.toBe(en[k as keyof typeof en]);
      }
    }
  });

  it("hyphenated slug keys survive the generator (title + scene present)", () => {
    for (const k of [
      "talkContent.airport.check-in.title",
      "talkContent.taxi.on-the-way.scene",
      "talkContent.hotel.during-stay.title",
      "library.cat.language-learning",
      "library.cat.tv-film",
    ]) {
      expect(CATALOGS.hi![k], k).toBeTruthy();
    }
  });
});

describe("Wave 20 — render-time mapping helpers", () => {
  const t = bindT("hi");

  it("localizes a Talk category and falls back to English for an unmapped one", () => {
    expect(localizeTalkCategory(t, "Food")).toBe(CATALOGS.hi!["talkContent.cat.food"]);
    expect(localizeTalkCategory(t, "Daily life")).toBe(CATALOGS.hi!["talkContent.cat.dailyLife"]);
    expect(localizeTalkCategory(t, "Totally Unknown")).toBe("Totally Unknown");
  });

  it("derives the situation slug only from a seeded v2 topic id", () => {
    expect(situationSlugFromTopicId("topic:v2:es:restaurant")).toBe("restaurant");
    expect(situationSlugFromTopicId("topic:v2:zh-cn:airport")).toBe("airport");
    expect(situationSlugFromTopicId("topic:coffee")).toBeNull();
  });

  it("localizes blurb / lesson title / scene by stable slug, English fallback otherwise", () => {
    const EN_BLURB = "Order, ask questions, and split the bill — without rehearsing.";
    expect(localizeTalkBlurb(t, "topic:v2:es:restaurant", EN_BLURB)).toBe(
      CATALOGS.hi!["talkContent.blurb.restaurant"],
    );
    // Hard-coded fallback topic (no content key) keeps the stored English.
    expect(localizeTalkBlurb(t, "topic:coffee", "Walk up and order.")).toBe("Walk up and order.");

    expect(localizeLessonTitle(t, "topic:v2:es:airport", "check-in", "At check-in")).toBe(
      CATALOGS.hi!["talkContent.airport.check-in.title"],
    );
    expect(localizeLessonScene(t, "topic:v2:es:taxi", "on-the-way", "You're on the move.")).toBe(
      CATALOGS.hi!["talkContent.taxi.on-the-way.scene"],
    );
    // Unmapped slug → English fallback, never a raw key.
    expect(localizeLessonTitle(t, "topic:v2:es:restaurant", "no-such-slot", "Fallback")).toBe("Fallback");
  });

  it("localizes a Library taxonomy label, English fallback for an unknown slug", () => {
    expect(localizeLibraryCategory(t, "society-culture", "Society & Culture")).toBe(
      CATALOGS.hi!["library.cat.society-culture"],
    );
    expect(localizeLibraryCategory(t, "made-up-slug", "Made Up")).toBe("Made Up");
  });
});

describe("Wave 20 — client-bundle discipline", () => {
  it("content keys stay OUT of the global client slice (keeps the <25 KB guard green)", () => {
    for (const lang of LOCALES) {
      const g = clientSlice(lang);
      const leaked = Object.keys(g).filter(
        (k) => k.startsWith("talkContent.") || k.startsWith("library.cat."),
      );
      expect(leaked, lang).toEqual([]);
      const bytes = new TextEncoder().encode(JSON.stringify(g)).length;
      expect(bytes, `global ${lang}`).toBeLessThan(25_000);
    }
  });

  it("library.cat.* reaches the page-scoped /library slice", () => {
    const s = pageClientSlice("hi", LIBRARY_KEY_PREFIXES);
    expect(s["library.cat.society-culture"]).toBeTruthy();
    expect(s["library.cat.easy-languages"]).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// Real server-rendered /talk for a Hindi-native learner studying Spanish.
// Empty DB → falls back to the in-memory TALK_TOPICS (hard-coded + seeded).
// ---------------------------------------------------------------------------

const hindiViewer = {
  userId: "u_hi",
  user: { id: "u_hi", nativeLang: "hi", uiLocale: "hi", activeLearningLang: "es" },
  activeLang: "es",
  nativeLang: "hi",
};

vi.mock("@/server/session", () => ({ getViewer: vi.fn(async () => hindiViewer) }));
vi.mock("@/server/db", () => ({
  prisma: {
    talkTopic: { findMany: vi.fn(async () => []) },
    user: { findUnique: vi.fn(async () => null) },
  },
}));
vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("NOT_FOUND");
  },
  useRouter: () => ({ push() {}, replace() {}, back() {}, refresh() {}, prefetch() {} }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

describe("Wave 20 — Hindi /talk cards show localized category + blurb", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders Hindi categories (and no English category labels)", async () => {
    const { default: TalkIndexPage } = await import("../../app/talk/page");
    const html = renderToStaticMarkup(await TalkIndexPage({ searchParams: Promise.resolve({}) }));
    // Hindi categories present…
    expect(html).toContain(CATALOGS.hi!["talkContent.cat.dailyLife"]);
    expect(html).toContain(CATALOGS.hi!["talkContent.cat.food"]);
    // …English category labels gone.
    expect(html).not.toContain(">Daily life<");
    expect(html).not.toContain(">Food<");
    // A Hindi blurb is present too.
    expect(html).toContain(CATALOGS.hi!["talkContent.blurb.restaurant"]);
  });
});
