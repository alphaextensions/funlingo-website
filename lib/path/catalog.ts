import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Course, Episode, Season } from "./schema";
import { validateCourse } from "./validate";

// Server-only: page.tsx files read the courses at build time. An invalid course
// throws, so a content mistake fails `next build` instead of shipping.

const DEFAULT_DIR = join(process.cwd(), "content", "courses");

export function loadCourses(dir: string = DEFAULT_DIR): Course[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && existsSync(join(dir, d.name, "course.json")))
    .map((d) => {
      const file = join(dir, d.name, "course.json");
      const result = validateCourse(JSON.parse(readFileSync(file, "utf8")));
      if (!result.ok) throw new Error(`${file}:\n${result.errors.join("\n")}`);
      return result.course;
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function getCourse(id: string): Course | undefined {
  return loadCourses().find((c) => c.id === id);
}

export function findEpisode(
  course: Course,
  episodeId: string,
): { season: Season; episode: Episode; index: number } | undefined {
  for (const season of course.seasons) {
    const index = season.episodes.findIndex((e) => e.id === episodeId);
    if (index >= 0) return { season, episode: season.episodes[index], index };
  }
  return undefined;
}
