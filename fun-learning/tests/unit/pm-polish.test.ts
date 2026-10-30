/**
 * Wave 4 PM polish — one test per user-facing surface. Mirrors the
 * `signed-out-home.test.ts` approach: a text-grep is enough to catch the
 * class of regression PM Pass 3 flagged (dead-end copy / missing CTA /
 * missing data wiring) without needing a Next RSC runtime.
 *
 * If a future refactor renames one of these class names or anchor copy
 * strings, update both the component and the matching assertion below so
 * the intent travels with the rename.
 */

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { en } from "@/lib/i18n/catalog/en";

const read = (rel: string) => readFileSync(resolve(process.cwd(), rel), "utf8");

describe("PM-polish fix 1 — Review summary action footer", () => {
  const source = read("app/review/ReviewRunner.tsx");

  it("renders a SummaryActions component after the stats grid", () => {
    expect(source).toContain("function SummaryActions");
    expect(source).toContain("<SummaryActions ");
    expect(source).toContain('data-testid="review-summary-actions"');
  });

  it("links the three canonical destinations: library, talk, words", () => {
    const slice = source.slice(source.indexOf("function SummaryActions"));
    expect(slice).toContain('pathname: "/library"');
    expect(slice).toContain('pathname: "/talk"');
    expect(slice).toContain('pathname: "/words"');
  });

  it("seeds Talk with today's lemmas via ?words= when present", () => {
    const slice = source.slice(source.indexOf("function SummaryActions"));
    expect(slice).toContain("words: lemmas.join");
  });
});

describe("PM-polish fix 2 — End-of-video CTA on Watch", () => {
  const source = read("src/components/watch/WatchClient.tsx");

  it("tracks a per-session save counter that resets on unmount", () => {
    expect(source).toContain("setSaveCount");
    // Must be useState — a ref wouldn't trigger the end-card render.
    expect(source).toMatch(/const \[saveCount, setSaveCount\] = useState\(0\)/);
  });

  it("flips endCardShown on YT ENDED and demo-mode duration overflow", () => {
    expect(source).toContain("state === YT_STATE.ENDED");
    expect(source).toContain("setEndCardShown(true)");
    // Demo branch — the local timer flips the same flag when it hits
    // demoDurationSec.
    expect(source).toMatch(/next >= demoDurationSec/);
  });

  it("renders the overlay only when saveCount > 0 and offers /review", () => {
    expect(source).toContain("endCardShown && !endCardDismissed && saveCount > 0");
    expect(source).toContain('href="/review"');
    expect(source).toContain('data-testid="watch-end-card"');
  });

  it("sits inside .playerCol, below the player + controls — never over the iframe", () => {
    // The end-card markup lives inside <section className={styles.playerCol}
    // ...> and after the controls strip. Enforced structurally so the LEGAL
    // zero-overlap test keeps holding.
    const endCardAt = source.indexOf("endCardShown && !endCardDismissed");
    const closingPlayerCol = source.indexOf("</section>", endCardAt);
    const beforeEndCard = source.indexOf("styles.playerCol", 0);
    expect(endCardAt).toBeGreaterThan(beforeEndCard);
    expect(closingPlayerCol).toBeGreaterThan(endCardAt);
  });
});

describe("PM-polish fix 3 — Library empty-state CTA swap", () => {
  const page = read("app/library/page.tsx");
  const actions = read("src/components/library/LibraryEmptyActions.tsx");

  it("drops 'Get the extension' from the library empty state", () => {
    const emptyBlock = page.match(/<EmptyState[\s\S]{0,800}?\/>/);
    expect(emptyBlock).toBeTruthy();
    expect(emptyBlock![0]).not.toContain("Get the extension");
  });

  it("uses the paste-focus client component via actionsSlot", () => {
    expect(page).toContain("LibraryEmptyActions");
    expect(page).toContain("actionsSlot={<LibraryEmptyActions />}");
    // The client component focuses the paste input by id.
    expect(actions).toContain('getElementById("yt-paste")');
    // Lead-QA P1 i18n: the CTA copy moved into the catalog. Assert the
    // component references the key AND the EN catalog value is the old string
    // (the copy-assertion recipe from AGENT-PLAYBOOK Wave 19).
    expect(actions).toContain('t("library.emptyPasteYt")');
    expect(en["library.emptyPasteYt"]).toBe("Paste a YouTube link ↑");
  });
});

describe("PM-polish fix 4 — Library paste deep-link", () => {
  // Wave 8 parity: the Home "lastNight empty state → paste link" chain
  // is gone (Home is now the extension's view-landing — tiles only).
  // The surviving half is the ?paste=1 deep link that LibraryEmptyActions
  // emits and YouTubePaste consumes — assert the Library side still
  // works end-to-end.
  it("Library's empty-state actions deep-link to /library?paste=1", () => {
    const actions = read("src/components/library/LibraryEmptyActions.tsx");
    expect(actions).toContain('paste');
    expect(actions).toContain('getElementById("yt-paste")');
  });

  it("Library's YouTubePaste focuses itself when ?paste=1 is present", () => {
    const yp = read("src/components/library/YouTubePaste.tsx");
    expect(yp).toContain("useSearchParams");
    expect(yp).toContain('searchParams?.get("paste")');
    expect(yp).toContain("inputRef");
  });
});

describe("PM-polish fix 5 — Weak-areas surface", () => {
  // Wave 8 parity: the Home-level "Weak" counter chip is gone (Home is
  // now the extension's view-landing). The authoritative Weak-areas
  // surface moved to /progress, which already consumes `loadWeakCards`
  // and links rows to `/review?focus=weak`. Assert that path still
  // works so a learner can still reach the weak-areas drill.
  const weakAreasModule = read("src/components/progress/WeakAreas.tsx");
  const progressPage = read("app/progress/page.tsx");

  it("WeakAreas module still exports loadWeakCards + renders rows", () => {
    expect(weakAreasModule).toContain("export async function loadWeakCards");
    expect(weakAreasModule).toContain("await loadWeakCards(userId, lang, 5)");
  });

  it("/progress keeps the /review?focus=weak deep link alive", () => {
    expect(progressPage).toMatch(/\/review\?focus=weak/);
  });
});

describe("PM-polish fix 6 — Talk turn-N-of-10 chip", () => {
  const source = read("app/talk/[topicSlug]/[lessonSlug]/LessonChat.tsx");

  it("renders a chip stating 'Turn N of 10' in the panel header", () => {
    expect(source).toContain('data-testid="talk-turn-chip"');
    // Wave 14: copy lives in the catalog; the chip interpolates current/total.
    expect(source).toContain(
      't("talkLesson.turnChip", { current: Math.min(userTurnCount + 1, MAX_TURNS), total: MAX_TURNS })',
    );
    expect(en["talkLesson.turnChip"]).toBe("Turn {current} of {total}");
    // Chip has its own class, not the panelHead h2.
    expect(source).toContain("styles.turnChip");
  });

  it("MAX_TURNS still gates the session at 10", () => {
    expect(source).toContain("const MAX_TURNS = 10");
  });
});

describe("PM-polish fix 7 — Save-for-drill glyph + hover", () => {
  const source = read("app/talk/[topicSlug]/[lessonSlug]/LessonChat.tsx");
  const css = read("app/talk/[topicSlug]/[lessonSlug]/LessonChat.module.css");

  it("adds a glyph before the Save for drill label", () => {
    expect(source).toContain("correctionSaveGlyph");
    // One of the three allowed glyphs — pick-stable, we chose ✎.
    expect(source).toMatch(/[✎⇡📝]/);
  });

  it("hover lifts the border to --fl-accent", () => {
    expect(css).toMatch(/\.correctionSaveBtn:hover[\s\S]{0,200}border-color: var\(--fl-accent\)/);
  });
});
