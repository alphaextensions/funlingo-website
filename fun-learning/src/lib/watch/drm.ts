/**
 * Source types whose caption text is third-party and must never be
 * persisted (LEGAL.md "Rules for third-party content" + CLAUDE.md rule 2).
 * Shared by `/api/watch/saveWord` and `/api/watch/saveLine` — keep in sync
 * when new streaming platforms land.
 */
export const DRM_SOURCE_TYPES: ReadonlySet<string> = new Set([
  "youtube_video",
  "podcast_episode",
  "netflix",
  "prime",
  "hotstar",
  "crunchyroll",
]);

export function mayPersistLine(sourceType: string): boolean {
  return !DRM_SOURCE_TYPES.has(sourceType);
}
