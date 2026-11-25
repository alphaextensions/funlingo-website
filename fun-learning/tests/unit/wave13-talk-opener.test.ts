/**
 * Wave 13 PM BLOCKER-22 — the Talk opener is a real line, not a template.
 *
 * The old opener was
 *   `(${scene}) ${aiRole}: Hi there — what can I do for you?`
 * which rendered the scene + role as if they were part of the AI's words.
 * Wave 13 ships a hand-authored `opener` string per lesson in the catalog
 * (`src/lib/talk/topics.ts` for hardcoded topics, `src/lib/talk/
 * seedCatalog.ts` for every seeded situation × locale), used verbatim.
 *
 * This test pins the API shape AND spot-checks that every lesson in the
 * compiled catalog has a non-template opener.
 */

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { TALK_TOPICS, HARDCODED_TOPICS } from "@/lib/talk/topics";
import { SEEDED_TOPICS } from "@/lib/talk/seedCatalog";

function src(path: string): string {
  return readFileSync(resolve(process.cwd(), path), "utf8");
}

describe("Wave 13 B-22 — Talk opener is a hand-authored line", () => {
  const chat = src("app/talk/[topicSlug]/[lessonSlug]/LessonChat.tsx");

  it("does NOT contain the old `(${scene}) ${aiRole}` template", () => {
    // The three literal strings that used to compose the opener:
    expect(chat).not.toMatch(/`\(\$\{scene\}\) \$\{aiRole\}:/);
    expect(chat).not.toContain("${scene}");
    expect(chat).not.toContain("${aiRole}");
    // And the literal boilerplate the template emitted:
    expect(chat).not.toContain("Hi there — what can I do for you?");
  });

  it("LessonChat accepts an `opener` prop and uses it verbatim", () => {
    expect(chat).toContain("opener: string");
    // The opener bubble reads from props.opener (no transformation).
    expect(chat).toMatch(/text:\s*props\.opener/);
  });

  it("every hard-coded lesson has a non-empty, non-generic opener", () => {
    for (const topic of HARDCODED_TOPICS) {
      for (const lesson of topic.lessons) {
        expect(
          lesson.opener,
          `hardcoded ${topic.slug}/${lesson.slug} missing opener`,
        ).toBeTruthy();
        expect(lesson.opener.length).toBeGreaterThan(8);
        // Must not contain the old template fragments:
        expect(lesson.opener).not.toContain("${scene}");
        expect(lesson.opener).not.toContain("${aiRole}");
        expect(lesson.opener).not.toMatch(/^\(/); // no "(scene) role: …"
      }
    }
  });

  it("every seeded lesson has a non-template opener", () => {
    // Spot-check a sampling across situations; the shape of the opener
    // must survive the seedCatalog compilation.
    expect(SEEDED_TOPICS.length).toBeGreaterThan(0);
    for (const topic of SEEDED_TOPICS) {
      for (const lesson of topic.lessons) {
        expect(
          lesson.opener,
          `seeded ${topic.id}/${lesson.slug} missing opener`,
        ).toBeTruthy();
        expect(lesson.opener).not.toMatch(/^\(/);
        expect(lesson.opener).not.toContain("${");
      }
    }
  });

  it("TALK_TOPICS merged catalog has openers across every lesson", () => {
    for (const topic of TALK_TOPICS) {
      for (const lesson of topic.lessons) {
        expect(typeof lesson.opener).toBe("string");
        expect(lesson.opener.length).toBeGreaterThan(0);
      }
    }
  });

  it("the deep-route page threads `opener` into LessonChat", () => {
    const page = src("app/talk/[topicSlug]/[lessonSlug]/page.tsx");
    expect(page).toContain("opener={lesson.opener}");
  });
});
