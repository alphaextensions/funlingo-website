/**
 * Lead-QA P1 — /review + /library "YouTube" discovery i18n.
 *
 * Two surfaces still rendered English chrome for a non-English native while
 * every other surface was localized:
 *   1. /review — the server page (now getT) and ReviewRunner (useT via the
 *      root global provider; "review." added to CLIENT_KEY_PREFIXES).
 *   2. /library default "YouTube" tab — the client discovery sub-components
 *      (YouTubePaste, ChannelRecommendations, LibraryEmptyActions), wired via
 *      a page-scoped <I18nProvider slice={pageClientSlice(LIBRARY_KEY_PREFIXES)}>.
 *
 * Whole-catalog key-parity / placeholder / brand invariants are enforced by
 * wave14-i18n.test.ts across all 12 locales; this file covers the P1-specific
 * guarantees: the new keys exist + are translated, interpolation works, the
 * client-bundle discipline holds, the source files call t()/getT (no stranded
 * English), and a real Hindi-native render of /review comes out in Hindi.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import {
  CATALOGS,
  clientSlice,
  pageClientSlice,
  LIBRARY_KEY_PREFIXES,
  CLIENT_KEY_PREFIXES,
  t,
} from "@/lib/i18n/catalog";
import { en } from "@/lib/i18n/catalog/en";

const LOCALES = ["en", "hi", "es", "ja", "zh", "ar", "fr", "de", "pt", "ko", "it", "tr"];
const ROOT = resolve(__dirname, "../..");
const read = (p: string) => readFileSync(resolve(ROOT, p), "utf8");

describe("P1 — new review/library keys exist and are translated", () => {
  const sample = [
    "review.eyebrow",
    "review.dailySessionTitle",
    "review.signedOutTitle",
    "review.quizEyebrow",
    "review.nothingDueTitle",
    "review.sessionDone",
    "review.drillGuess",
    "review.labelReviewed",
    "review.browseLibraryArrow",
    "library.ytPasteAria",
    "library.ytPasteError",
    "library.channelsTitle",
    "library.channelFollow",
    "library.channelVisit",
    "library.emptyBrowseShowPacks",
  ];

  it("defines each sampled key in English", () => {
    for (const k of sample) expect(en[k as keyof typeof en], k).toBeTruthy();
  });

  it("translates each sampled key in every locale (non-empty, not the raw key)", () => {
    for (const lang of LOCALES) {
      for (const k of sample) {
        const v = CATALOGS[lang]![k];
        expect(v, `${lang} ${k}`).toBeTruthy();
        expect(v, `${lang} ${k}`).not.toBe(k);
      }
    }
  });

  it("a non-English locale actually differs from English for a visible label", () => {
    for (const lang of ["hi", "es", "ja", "ar"]) {
      expect(CATALOGS[lang]!["review.dailySessionTitle"], lang).not.toBe(en["review.dailySessionTitle"]);
      expect(CATALOGS[lang]!["library.channelsTitle"], lang).not.toBe(en["library.channelsTitle"]);
    }
  });

  it("keeps the brand English inside translated strings", () => {
    for (const lang of LOCALES) {
      expect(CATALOGS[lang]!["review.backToFunLearning"], lang).toContain("Fun Learning");
      expect(CATALOGS[lang]!["library.channelVisit"], lang).toContain("YouTube");
    }
  });
});

describe("P1 — interpolation on new keys", () => {
  it("resolves {lang} in the channel lede and the nothing-due body", () => {
    expect(t("library.channelsLede", "en", { lang: "ES" })).toContain("ES");
    expect(t("library.channelsLede", "hi", { lang: "ES" })).toContain("ES");
    expect(t("review.nothingDueBody", "hi", { lang: "JA" })).toContain("JA");
  });

  it("resolves the summary body counts + singular/plural word slots", () => {
    const one = t("review.summaryBody", "en", {
      total: 1,
      cardWord: t("review.cardSingular", "en"),
      lang: "ES",
      accuracy: 100,
      minutes: 1,
      minuteWord: t("review.minuteSingular", "en"),
    });
    expect(one).toBe("You reviewed 1 card in ES — 100% correct, roughly 1 minute.");
    const many = t("review.summaryBody", "hi", {
      total: 7,
      cardWord: t("review.cardPlural", "hi"),
      lang: "ES",
      accuracy: 80,
      minutes: 3,
      minuteWord: t("review.minutePlural", "hi"),
    });
    expect(many).not.toContain("{");
    expect(many).toContain("7");
  });

  it("resolves {n} in the summary footer", () => {
    expect(t("review.summaryFoot", "hi", { n: 9 })).toContain("9");
    expect(t("review.summaryFoot", "hi", { n: 9 })).not.toContain("{n}");
  });
});

describe("P1 — client bundle discipline", () => {
  it("exposes review.* on the GLOBAL slice (ReviewRunner reads it there)", () => {
    expect(CLIENT_KEY_PREFIXES).toContain("review.");
    const g = clientSlice("hi");
    expect(g["review.sessionDone"]).toBeTruthy();
    expect(g["review.drillGuess"]).toBeTruthy();
  });

  it("keeps the ~95 library.* keys OUT of the global slice", () => {
    const g = clientSlice("hi");
    const libKeys = Object.keys(g).filter((k) => k.startsWith("library."));
    expect(libKeys).toEqual([]);
  });

  it("serves library.* through the /library page slice (global chrome + library.*)", () => {
    const s = pageClientSlice("hi", LIBRARY_KEY_PREFIXES);
    expect(s["library.ytPasteAria"]).toBeTruthy();
    expect(s["library.channelsTitle"]).toBeTruthy();
    expect(s["library.podcastsUnverified"]).toBeTruthy(); // reused by the channel card
    expect(s["nav.railHome"]).toBeTruthy(); // still carries shared chrome
  });

  it("every locale's global slice stays under 25 KB even with review.* added", () => {
    for (const lang of LOCALES) {
      const g = new TextEncoder().encode(JSON.stringify(clientSlice(lang))).length;
      expect(g, `global ${lang}`).toBeLessThan(25_000);
    }
  });
});

describe("P1 — source files call t()/getT, no stranded English", () => {
  it("/review server page uses getT and drops its hardcoded English", () => {
    const src = read("app/review/page.tsx");
    expect(src).toContain("getT");
    expect(src).toContain('t("review.dailySessionTitle")');
    expect(src).toContain('t("review.quizEyebrow")');
    expect(src).not.toContain('title="Daily session"');
    expect(src).not.toContain('eyebrow="Quick Quiz"');
    expect(src).not.toContain('label: "Sign in"');
  });

  it("ReviewRunner (client) uses useT for the summary + drills + quit prompt", () => {
    const src = read("app/review/ReviewRunner.tsx");
    expect(src).toContain('from "@/lib/i18n/client"');
    expect(src).toContain('t("review.sessionDone")');
    expect(src).toContain('t("review.drillGuess")');
    expect(src).toContain('t("review.quitTitle")');
    expect(src).toContain('t("review.browseLibraryArrow")');
    // Old hardcoded strings are gone.
    expect(src).not.toContain(">SESSION DONE<");
    expect(src).not.toContain(">Nice work.<");
    expect(src).not.toContain("Save progress and quit?");
    expect(src).not.toContain("Browse the library →");
  });

  it("the 3 library discovery components use useT", () => {
    for (const f of [
      "src/components/library/YouTubePaste.tsx",
      "src/components/library/ChannelRecommendations.tsx",
      "src/components/library/LibraryEmptyActions.tsx",
    ]) {
      const src = read(f);
      expect(src, f).toContain('from "@/lib/i18n/client"');
      expect(src, f).toContain("useT()");
    }
    const yt = read("src/components/library/YouTubePaste.tsx");
    expect(yt).toContain('t("library.ytPasteOpen")');
    expect(yt).not.toContain('"Open in study player"');
    const ch = read("src/components/library/ChannelRecommendations.tsx");
    expect(ch).toContain('t("library.channelsTitle")');
    expect(ch).toContain('t("library.channelFollow")');
    expect(ch).toContain('t("library.channelVisit")');
    expect(ch).not.toContain('aria-label="Channels you might like"');
    expect(ch).not.toContain("Visit on YouTube");
  });

  it("the /library page wraps the discovery tab in an I18nProvider page slice", () => {
    const src = read("app/library/page.tsx");
    expect(src).toContain("LIBRARY_KEY_PREFIXES");
    expect(src).toContain("I18nProvider");
    expect(src).toContain("pageClientSlice");
  });

  it('keeps "YouTube" a brand in the catalog source (not machine-translated)', () => {
    // The EN strings keep YouTube; translations preserve it (asserted above).
    expect(en["library.ytPasteAria"]).toContain("YouTube");
  });
});

// ---------------------------------------------------------------------------
// Real server render of /review for a Hindi-native learner studying Spanish.
// ---------------------------------------------------------------------------
const hindiViewer = { userId: null, user: null, activeLang: "es", nativeLang: "hi" };

vi.mock("@/server/session", () => ({ getViewer: vi.fn(async () => hindiViewer) }));
vi.mock("@/server/auth", () => ({ auth: vi.fn(async () => null) }));
vi.mock("@/server/prefs", () => ({ getPrefs: vi.fn(async () => ({ localPronunciation: false })) }));
vi.mock("@/server/db", () => ({
  prisma: {
    user: { findUnique: vi.fn(async () => null) },
    userWord: { findMany: vi.fn(async () => []) },
    sentence: { findMany: vi.fn(async () => []) },
  },
}));
vi.mock("@/server/review/scheduler", () => ({
  cardsDueNow: vi.fn(async () => []),
  weakAreaCardKeys: vi.fn(async () => new Set()),
}));
vi.mock("next/navigation", () => ({
  notFound: () => { throw new Error("NOT_FOUND"); },
  useRouter: () => ({ push() {}, replace() {}, back() {}, refresh() {}, prefetch() {} }),
  usePathname: () => "/review",
  useSearchParams: () => new URLSearchParams(),
}));

describe("P1 — Hindi-native /review server render", () => {
  beforeEach(() => vi.clearAllMocks());

  it("signed out: header + empty state are Hindi, English chrome gone", async () => {
    const { default: ReviewPage } = await import("../../app/review/page");
    const html = renderToStaticMarkup(await ReviewPage({ searchParams: Promise.resolve({}) }));
    expect(html).not.toContain("Daily session");
    expect(html).not.toContain("Sign in to start reviewing");
    expect(html).toContain(CATALOGS.hi!["review.dailySessionTitle"]);
    expect(html).toContain(CATALOGS.hi!["review.signedOutTitle"]);
  });

  it("?mode=quiz with an empty deck: quiz empty state is Hindi", async () => {
    const { default: ReviewPage } = await import("../../app/review/page");
    const html = renderToStaticMarkup(
      await ReviewPage({ searchParams: Promise.resolve({ mode: "quiz", dev_user: "u1", lang: "es" }) }),
    );
    expect(html).not.toContain("Save a word first");
    expect(html).not.toContain("Your word deck is empty");
    expect(html).toContain(CATALOGS.hi!["review.quizEmptyTitle"]);
    expect(html).toContain(CATALOGS.hi!["review.quizDeckTitle"]);
  });
});
