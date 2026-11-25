/**
 * Signed-out Home — Wave 8 parity reality.
 *
 * `/` IS the extension's view-landing (five-tile experience grid). The
 * signed-out branch has NO separate hero / CTA / empty-state of its
 * own — `LearnLanding` renders the same tiles for everyone and keeps
 * Word Replay + Quick Quiz locked (userWordCount coerced to 0 when no
 * viewer) exactly like a first-run extension install.
 *
 * This test is a text-only grep: a full RSC render would need a Next
 * runtime. If anyone reintroduces the invented dashboard surfaces at /,
 * the first assertion fails.
 */

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { en } from "@/lib/i18n/catalog/en";

const home = readFileSync(resolve(process.cwd(), "app/page.tsx"), "utf8");
const landing = readFileSync(
  resolve(process.cwd(), "app/learn/LearnLanding.tsx"),
  "utf8",
);

describe("signed-out Home — extension parity", () => {
  it("app/page.tsx renders LearnLanding and nothing else", () => {
    // `/` is a thin re-export of the shared landing. If the old
    // "Resume rail / streak card / goal ring" dashboard sneaks back,
    // this test fails on either side.
    expect(home).toContain("LearnLanding");
    expect(home).not.toMatch(/Resume rail|loadResume|loadStreak/);
    expect(home).not.toMatch(/Today's goal|GoalRing|freshChip/);
    expect(home).not.toContain("SignedOutHome");
  });

  it("coerces userWordCount to 0 for signed-out visitors", () => {
    // The lock gate on Word Replay + Quick Quiz is driven by this
    // count. Signed-out visitors must see those tiles LOCKED (first-run
    // state), matching an extension install the moment the learner
    // boots it.
    expect(landing).toMatch(
      /viewer\.userId\s*\?\s*await countUserWords[\s\S]{0,80}:\s*0/,
    );
  });

  it("renders the welcome banner for first-run (< 5 words)", () => {
    // Non-regression: a signed-out visitor sees the 👋 banner because
    // their count is 0 — which is < 5. Same as a first-run extension
    // learner.
    expect(landing).toMatch(/showWelcome\s*=\s*userWordCount\s*<\s*5/);
    expect(landing).toContain('t("learn.welcomeTitle")');
    expect(en["learn.welcomeTitle"]).toBe("Welcome to Fun Learning");
  });

  it("keeps the Tiny Lessons + Slang Hang tiles unlocked for everyone", () => {
    // These two tiles work without a sign-in — the content is JSON-
    // packaged, not DB-dependent. So the lock chip must NOT render on
    // them in the LearnLanding tile table.
    // Wave 14: slice on the catalog calls. Assert the markers exist first —
    // a missing marker makes slice() return "" and `not.toContain` would
    // then pass vacuously.
    const lessonsAt = landing.indexOf('t("learn.lessonsTitle")');
    const slangAt = landing.indexOf('t("learn.slangTitle")');
    const libraryAt = landing.indexOf('t("learn.libraryTitle")');
    expect(lessonsAt).toBeGreaterThan(-1);
    expect(slangAt).toBeGreaterThan(lessonsAt);
    expect(libraryAt).toBeGreaterThan(slangAt);
    const lessonsBlock = landing.slice(lessonsAt, slangAt);
    const slangBlock = landing.slice(slangAt, libraryAt);
    expect(lessonsBlock).not.toContain("!unlocked");
    expect(slangBlock).not.toContain("!unlocked");
  });
});
