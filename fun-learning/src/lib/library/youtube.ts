/**
 * Parse any form a user might paste into the Library "paste a YouTube link"
 * input into a bare 11-char YouTube video id. Returns `null` when nothing
 * recognisable comes out so the UI can show inline error copy.
 *
 * Shapes we accept:
 *   - youtube.com/watch?v=<id>  (any query order; `watch?...&v=<id>&...`)
 *   - youtu.be/<id>
 *   - youtube.com/shorts/<id>
 *   - youtube.com/embed/<id>
 *   - youtube.com/live/<id>
 *   - a bare 11-char `[A-Za-z0-9_-]{11}` id
 *
 * `?si=...` and `?t=...` tails are ignored (they're tracking / seek params).
 */

const YT_ID_RE = /^[A-Za-z0-9_-]{11}$/;

export function parseYouTubeId(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // Bare id already.
  if (YT_ID_RE.test(trimmed)) return trimmed;

  // Try to parse as a URL. Allow `youtu.be/XYZ` without protocol.
  let url: URL | null = null;
  try {
    url = new URL(trimmed);
  } catch {
    try {
      url = new URL(`https://${trimmed}`);
    } catch {
      return null;
    }
  }

  const host = url.hostname.toLowerCase().replace(/^www\./, "");
  if (host === "youtu.be") {
    const id = url.pathname.slice(1).split("/")[0];
    return YT_ID_RE.test(id) ? id : null;
  }

  if (host.endsWith("youtube.com") || host === "youtube-nocookie.com") {
    // /watch?v=<id>
    const v = url.searchParams.get("v");
    if (v && YT_ID_RE.test(v)) return v;

    // /shorts/<id>, /embed/<id>, /live/<id>
    const parts = url.pathname.split("/").filter(Boolean);
    const KINDS = new Set(["shorts", "embed", "live", "v"]);
    if (parts.length >= 2 && KINDS.has(parts[0]) && YT_ID_RE.test(parts[1])) {
      return parts[1];
    }
  }

  return null;
}
