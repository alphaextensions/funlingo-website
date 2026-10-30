/**
 * Wave 13 PM BLOCKER-21 — the Talk lesson deep route branches on sign-in.
 *
 * `/talk/[topicSlug]/[lessonSlug]/page.tsx` used to render the full
 * LessonChat for signed-out visitors; a Start click 401'd with no sign-in
 * CTA. Wave 13 adds an EmptyState branch mirroring the Talk index's
 * signed-out treatment.
 */

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { en } from "@/lib/i18n/catalog/en";

function src(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("Wave 13 B-21 — Talk lesson deep route has a signed-out branch", () => {
  const page = src("app/talk/[topicSlug]/[lessonSlug]/page.tsx");

  it("renders an EmptyState with sign-in CTA when viewer.userId is null", () => {
    expect(page).toContain("EmptyState");
    expect(page).toMatch(/if \(!viewer\.userId\)/);
    // Wave 14: copy lives in the catalog — assert the wiring + the EN value.
    expect(page).toContain('t("talkLesson.signedOutTitle")');
    expect(en["talkLesson.signedOutTitle"]).toBe("Sign in to practice this scene");
    expect(page).toContain('href: "/account" as Route, label: t("talk.actionSignIn")');
    expect(en["talk.actionSignIn"]).toBe("Sign in");
  });

  it("the signed-out branch returns BEFORE mounting LessonChat", () => {
    // Guard appears earlier in the file than LessonChat usage.
    const guardAt = page.indexOf("if (!viewer.userId)");
    const chatAt = page.indexOf("<LessonChat");
    expect(guardAt).toBeGreaterThan(-1);
    expect(chatAt).toBeGreaterThan(-1);
    expect(guardAt).toBeLessThan(chatAt);
  });

  it("gives learners a 'Browse the topic list' fallback as a secondary CTA", () => {
    expect(page).toContain('t("talkLesson.browseTopics")');
    expect(en["talkLesson.browseTopics"]).toBe("Browse the topic list");
    expect(page).toContain('variant: "secondary"');
  });

  it("explains WHY sign-in matters (talk logs session for end report)", () => {
    expect(page).toContain('t("talkLesson.signedOutBody")');
    expect(en["talkLesson.signedOutBody"]).toContain(
      "Talk logs each turn so your end-of-scene report can show what you got right.",
    );
  });
});
