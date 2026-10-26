import { describe, expect, it } from "vitest";
import { loadCourses } from "./catalog";
import { ART_THEMES, avatarLook, isMainCast } from "./art";

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

  it.each([
    ["Spanish", ["Ana", "Diego", "Sofía", "Leo"]],
    ["French", ["Camille", "Hugo", "Léa", "Malik"]],
  ])("keeps the %s course's four main characters visibly different", (_, cast) => {
    const keys = (cast as string[]).map(avatarLook).map((l) => `${l.skin}|${l.hair}|${l.style}`);
    expect(new Set(keys).size).toBe(4);
  });

  it("gives every main character a fixed look rather than a derived one", () => {
    for (const name of ["Camille", "Hugo", "Léa", "Malik"]) expect(isMainCast(name)).toBe(true);
    expect(isMainCast("Serveur")).toBe(false);
  });
});
