/**
 * Wave 13 PM BLOCKER-16 — `/watch/demo` works for signed-out visitors.
 *
 * The 12E PM audit found that a cold prospect landing on `/watch/demo`
 * silently failed everywhere: translations never populated (401 on every
 * AI call), word-tap errored, save-word showed a red "Could not save"
 * with no sign-in CTA. Wave 13 ships a bundled demo path: translations
 * come from `src/lib/watch/demoBundle.ts`, WordCardPopup reads bundled
 * cards, save-word short-circuits to a sign-in prompt.
 *
 * Text-grep style per `AGENT-PLAYBOOK.md` / `pm-polish.test.ts` — a full
 * RSC render would need a Next runtime.
 */

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { en } from "@/lib/i18n/catalog/en";

function src(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("Wave 13 B-16 — /watch/demo renders without 401 for signed-out", () => {
  const page = src("app/watch/[sourceId]/page.tsx");
  const watchClient = src("src/components/watch/WatchClient.tsx");
  const wordCard = src("src/components/watch/WordCardPopup.tsx");
  const culturePanel = src("src/components/watch/CulturePanel.tsx");
  const demoBundle = src("src/lib/watch/demoBundle.ts");

  it("the server page threads `isSignedIn` to WatchClient", () => {
    expect(page).toContain("isSignedIn: userId !== null");
  });

  it("demo bundle exports precomputed translations + word cards", () => {
    expect(demoBundle).toContain("export const DEMO_TRANSLATIONS");
    expect(demoBundle).toContain("export const DEMO_WORD_CARDS");
    expect(demoBundle).toContain("export function demoWordCard");
    expect(demoBundle).toContain("export function demoTranslationsFor");
  });

  it("demo bundle covers at least the 10 common demo lemmas", () => {
    // Keeps the bundle honest: a word-tap on any of these common demo
    // caption words lands on real content, not a placeholder. We match
    // the `lemma: "<word>"` payload (not the object key) so this test
    // tolerates either quoted or unquoted keys in the dictionary.
    const required = [
      "choose",
      "learn",
      "fun",
      "break",
      "ice",
      "same old",
      "today",
      "honestly",
      "carry out",
      "lesson",
    ];
    for (const w of required) {
      expect(demoBundle, `missing demo WordCard for "${w}"`).toContain(
        `lemma: "${w}"`,
      );
    }
  });

  it("WatchClient short-circuits translation API when demoMode is true", () => {
    // The translation path checks `demoMode` and reads from the bundle
    // instead of hitting /api/ai/translateLines.
    expect(watchClient).toContain("if (demoMode) {");
    expect(watchClient).toContain("demoTranslationsFor(data.user.nativeLang)");
  });

  it("WatchClient skips the session heartbeat for a signed-out demo", () => {
    // Heartbeats to /api/watch/session would 401 every 15s and spam the
    // console. The check must come before `setInterval`.
    expect(watchClient).toMatch(
      /if \(demoMode && !data\.isSignedIn\) return;[\s\S]{0,80}const beat = setInterval/,
    );
  });

  it("saveWord shows a sign-in prompt instead of hitting the API when signed-out", () => {
    // The save handler returns BEFORE the fetch when isSignedIn is false,
    // and surfaces an actionable toast (not a red error).
    const start = watchClient.indexOf("const saveWord = useCallback");
    const slice = watchClient.slice(start, start + 1200);
    expect(slice).toContain("if (!data.isSignedIn)");
    expect(slice).toContain('href: "/account"');
    // Wave 19: the copy moved into the i18n catalog. Assert the handler
    // references the catalog key + the EN value still reads "sign in →".
    expect(slice).toContain('t("watch.signInArrow")');
    expect(en["watch.signInArrow"]).toBe("sign in →");
    // The sign-in short-circuit sits above the fetch.
    const guardAt = slice.indexOf("if (!data.isSignedIn)");
    const fetchAt = slice.indexOf("fetch(\"/api/watch/saveWord\"");
    expect(guardAt).toBeGreaterThan(-1);
    expect(fetchAt).toBeGreaterThan(guardAt);
  });

  it("WordCardPopup reads a bundled card in demoMode (no /api/watch/wordCard)", () => {
    expect(wordCard).toContain("demoMode?: boolean");
    expect(wordCard).toContain("if (demoMode) {");
    expect(wordCard).toContain("demoWordCard(word)");
    expect(wordCard).toContain("demoWordCardFallback(word)");
  });

  it("WordCardPopup save button swaps copy for signed-out viewers", () => {
    // Wave 19: catalog-backed. Key referenced + EN value unchanged.
    expect(wordCard).toContain('t("watch.signInToSaveArrow")');
    expect(en["watch.signInToSaveArrow"]).toBe("Sign in to save →");
  });

  it("CulturePanel skips the /api/watch/culture call in demoMode", () => {
    expect(culturePanel).toContain("demoMode?: boolean");
    expect(culturePanel).toMatch(/if \(demoMode\)[\s\S]{0,40}return;/);
  });

  it("WatchClient passes demoMode + isSignedIn through to WordCardPopup", () => {
    const popupBlock = watchClient.slice(
      watchClient.indexOf("<WordCardPopup"),
    );
    expect(popupBlock).toContain("demoMode={demoMode}");
    expect(popupBlock).toContain("isSignedIn={data.isSignedIn}");
  });

  it("demo banner renders for /watch/demo (B-16 + B-17 copy)", () => {
    expect(watchClient).toContain('data-testid="watch-demo-banner"');
    // Signed-out copy carries a sign-in CTA (Wave 19: catalog-backed).
    expect(watchClient).toContain('t("watch.demoSignIn")');
    expect(en["watch.demoSignIn"]).toBe("Sign in to save →");
  });
});
