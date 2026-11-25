import type { Course, Episode, Season } from "./schema";

// Pure lookups over a parsed course; safe to import from client components.

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
