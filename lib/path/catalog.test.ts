import { cpSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { findEpisode, loadCourses } from "./catalog";

const FIXTURE = join(__dirname, "__fixtures__", "sample-course.json");

function dirWith(course: unknown): string {
  const dir = mkdtempSync(join(tmpdir(), "fnl-courses-"));
  mkdirSync(join(dir, "en-es"));
  writeFileSync(join(dir, "en-es", "course.json"), JSON.stringify(course));
  return dir;
}

describe("loadCourses", () => {
  it("loads every valid course in the directory", () => {
    const dir = mkdtempSync(join(tmpdir(), "fnl-courses-"));
    mkdirSync(join(dir, "en-es"));
    cpSync(FIXTURE, join(dir, "en-es", "course.json"));
    const courses = loadCourses(dir);
    expect(courses.map((c) => c.id)).toEqual(["en-es"]);
  });

  it("fails loudly with the file path and the validation errors", () => {
    const broken = JSON.parse(readFileSync(FIXTURE, "utf8"));
    broken.seasons[0].episodes[0].scenes[0].words.push("nope");
    const dir = dirWith(broken);
    expect(() => loadCourses(dir)).toThrow(/en-es[\\/]course\.json:[\s\S]*unknown word "nope"/);
  });

  it("returns no courses when the directory does not exist", () => {
    expect(loadCourses(join(tmpdir(), "fnl-no-such-dir"))).toEqual([]);
  });
});

describe("findEpisode", () => {
  it("finds an episode with its season and position", () => {
    const [course] = loadCourses(dirWith(JSON.parse(readFileSync(FIXTURE, "utf8"))));
    const found = findEpisode(course, "greetings");
    expect(found?.index).toBe(0);
    expect(found?.season.id).toBe("s1");
    expect(findEpisode(course, "missing")).toBeUndefined();
  });
});
