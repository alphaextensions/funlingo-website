import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import type { Course } from "./schema";
import { buildGuessItems, buildListenItems, matchRatio, normalizeWords, scoreTakes, seededShuffle } from "./takes";
import { validateCourse } from "./validate";

function course(): Course {
  const r = validateCourse(JSON.parse(readFileSync(join(__dirname, "__fixtures__", "sample-course.json"), "utf8")));
  if (!r.ok) throw new Error(r.errors.join("\n"));
  return r.course;
}

const C = course();
const SCENE = C.seasons[0].episodes[0].scenes[0];

describe("seededShuffle", () => {
  const items = Array.from({ length: 10 }, (_, i) => i);

  it("returns the same order for the same seed", () => {
    expect(seededShuffle(items, "a")).toEqual(seededShuffle(items, "a"));
  });

  it("returns a different order for a different seed", () => {
    expect(seededShuffle(items, "a")).not.toEqual(seededShuffle(items, "b"));
  });

  it("keeps every item and leaves the input alone", () => {
    const copy = [...items];
    expect([...seededShuffle(items, "x")].sort((a, b) => a - b)).toEqual(items);
    expect(items).toEqual(copy);
  });
});

describe("buildGuessItems", () => {
  it("asks one question per scene word, target term as the prompt", () => {
    const items = buildGuessItems(C, SCENE);
    expect(items.map((i) => i.prompt)).toEqual(SCENE.words.map((w) => C.words[w].term));
    expect(items.map((i) => i.answer)).toEqual(SCENE.words.map((w) => C.words[w].gloss));
  });

  it("offers the answer exactly once among at most four distinct options", () => {
    for (const item of buildGuessItems(C, SCENE)) {
      expect(item.options.filter((o) => o === item.answer)).toHaveLength(1);
      expect(new Set(item.options).size).toBe(item.options.length);
      expect(item.options.length).toBeLessThanOrEqual(4);
      expect(item.options.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("borrows distractors from other scenes when a scene has one word", () => {
    const lonely = { ...SCENE, words: [SCENE.words[0]] };
    const [item] = buildGuessItems(C, lonely);
    expect(item.options).toHaveLength(4);
  });

  it("is stable across calls", () => {
    expect(buildGuessItems(C, SCENE)).toEqual(buildGuessItems(C, SCENE));
  });
});

describe("buildListenItems", () => {
  it("offers target-language terms as options", () => {
    const terms = new Set(Object.values(C.words).map((w) => w.term));
    for (const item of buildListenItems(C, SCENE)) {
      expect(item.options.every((o) => terms.has(o))).toBe(true);
      expect(item.options).toContain(item.answer);
      expect(item.prompt).toBe(item.answer);
    }
  });
});

describe("scoreTakes", () => {
  it("averages scored takes and skips unscored ones", () => {
    expect(scoreTakes([50, null, 100])).toBe(75);
  });

  it("gives full marks when nothing was scored", () => {
    expect(scoreTakes([null])).toBe(100);
    expect(scoreTakes([])).toBe(100);
  });
});

describe("shadow matching", () => {
  it("ignores case, accents and punctuation", () => {
    expect(normalizeWords("¿Dónde está el baño?")).toEqual(["donde", "esta", "el", "bano"]);
    expect(matchRatio("¿Dónde está el baño?", "donde esta el bano")).toBe(1);
  });

  it("scores the share of expected words heard", () => {
    expect(matchRatio("un café, por favor", "un café")).toBe(0.5);
  });

  it("returns zero for an empty line", () => {
    expect(matchRatio("", "x")).toBe(0);
  });
});
