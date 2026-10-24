import { describe, expect, it } from "vitest";
import { loadCourses } from "./catalog";
import { ART_THEMES, avatarLook } from "./art";

describe("theme art", () => {
  it("has an illustration for every episode theme in the courses", () => {
    for (const course of loadCourses()) {
      for (const season of course.seasons) {
        for (const episode of season.episodes) {
          expect(ART_THEMES, `${course.id}/${episode.id}`).toContain(episode.theme);
        }
      }
    }
  });
});

describe("avatarLook", () => {
  it("gives the same character the same look every time", () => {
    expect(avatarLook("Barista")).toEqual(avatarLook("Barista"));
  });

  it("keeps the four main characters visibly different", () => {
    const looks = ["Ana", "Diego", "Sofía", "Leo"].map(avatarLook);
    const keys = looks.map((l) => `${l.skin}|${l.hair}|${l.style}`);
    expect(new Set(keys).size).toBe(4);
  });
});
