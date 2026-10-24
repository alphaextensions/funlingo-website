import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { validateCourse } from "./validate";

const COURSES = join(process.cwd(), "content", "courses");
const courseDirs = existsSync(COURSES)
  ? readdirSync(COURSES, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name)
  : [];
const load = (dir: string) => JSON.parse(readFileSync(join(COURSES, dir, "course.json"), "utf8"));
// The fixture lives outside content/ so it is never published as a real course.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sample = (): any => JSON.parse(readFileSync(join(__dirname, "__fixtures__", "sample-course.json"), "utf8"));

function errorsOf(json: unknown): string[] {
  const r = validateCourse(json);
  if (r.ok) throw new Error("expected the course to be invalid");
  return r.errors;
}

describe("validateCourse", () => {
  it("accepts the sample course", () => {
    const r = validateCourse(sample());
    expect(r.ok ? [] : r.errors).toEqual([]);
  });

  it.each(courseDirs)(
    "accepts content/courses/%s/course.json",
    (dir) => {
      const r = validateCourse(load(dir));
      expect(r.ok ? [] : r.errors).toEqual([]);
    },
  );

  it("rejects a per-episode pass mark, which the server would not honour", () => {
    const c = sample();
    c.seasons[0].episodes[0].finale.passPct = 80;
    expect(errorsOf(c).join("\n")).toMatch(/finale: .*passPct/);
  });

  it("rejects a duplicate scene id", () => {
    const c = sample();
    const scenes = c.seasons[0].episodes[0].scenes;
    scenes[1].id = scenes[0].id;
    expect(errorsOf(c).join("\n")).toMatch(/seasons\[0\]\.episodes\[0\]\.scenes\[1\]\.id: duplicate id/);
  });

  it("rejects the reserved scene id 'finale', which is a route segment", () => {
    const c = sample();
    c.seasons[0].episodes[0].scenes[0].id = "finale";
    expect(errorsOf(c).join("\n")).toMatch(/scenes\[0\]\.id: .*reserved/);
  });

  it("rejects an id shared by an episode and a scene", () => {
    const c = sample();
    c.seasons[0].episodes[0].scenes[0].id = c.seasons[0].episodes[0].id;
    expect(errorsOf(c).join("\n")).toMatch(/duplicate id/);
  });

  it("rejects a scene word that is not in the course word list", () => {
    const c = sample();
    c.seasons[0].episodes[0].scenes[0].words.push("nope");
    expect(errorsOf(c).join("\n")).toMatch(/seasons\[0\]\.episodes\[0\]\.scenes\[0\]\.words\[\d+\]: unknown word "nope"/);
  });

  it("rejects subtitle cues that do not ascend", () => {
    const c = sample();
    const cues = c.seasons[0].episodes[0].scenes[1].coldOpen.clip.cues;
    cues[0].t = 5;
    cues[1].t = 3;
    expect(errorsOf(c).join("\n")).toMatch(/coldOpen\.clip\.cues\[1\]\.t: .*ascend/);
  });

  it("rejects a cue at or past the clip duration", () => {
    const c = sample();
    const clip = c.seasons[0].episodes[0].scenes[1].coldOpen.clip;
    clip.cues[clip.cues.length - 1].t = clip.durationSec;
    expect(errorsOf(c).join("\n")).toMatch(/duration/);
  });

  it.each([0, 101, 12.5])("rejects clip difficulty %s", (difficulty) => {
    const c = sample();
    c.seasons[0].episodes[0].scenes[1].coldOpen.clip.difficulty = difficulty;
    expect(errorsOf(c).join("\n")).toMatch(/coldOpen\.clip\.difficulty/);
  });

  it("rejects an answer index outside the options", () => {
    const c = sample();
    const q = c.seasons[0].episodes[0].finale.questions[0];
    q.answer = q.options.length;
    expect(errorsOf(c).join("\n")).toMatch(/finale\.questions\[0\]\.answer: /);
  });

  it("rejects a malformed course id", () => {
    const c = sample();
    c.id = "hindi-en";
    expect(errorsOf(c).join("\n")).toMatch(/^id: /m);
  });

  it("rejects an unknown take kind", () => {
    const c = sample();
    c.seasons[0].episodes[0].scenes[0].takes[0].kind = "karaoke";
    expect(errorsOf(c).join("\n")).toMatch(/takes\[0\]\.kind/);
  });

  it("rejects a misspelled key instead of silently dropping it", () => {
    const c = sample();
    c.seasons[0].episodes[0].finale.passPCT = 85;
    expect(errorsOf(c).join("\n")).toMatch(/finale: .*passPCT/);
  });

  it("allows a top-level _note for authors", () => {
    const c = sample();
    c._note = "draft";
    expect(validateCourse(c).ok).toBe(true);
  });

  it("rejects something that is not a course at all", () => {
    expect(errorsOf(null).length).toBeGreaterThan(0);
    expect(errorsOf("course").length).toBeGreaterThan(0);
  });
});
