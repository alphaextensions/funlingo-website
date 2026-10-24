// Client-side progress events. The shape matches what supabase apply_events() accepts,
// so the Phase 2 sync worker can upload the outbox as-is.

export type PathEventKind = "scene_started" | "take_done" | "scene_done" | "finale_done";

export type PathEvent = {
  id: string;
  kind: PathEventKind;
  course_id: string;
  ref: string;
  payload: Record<string, unknown>;
  client_ts: string;
};

export function makeEvent(
  kind: PathEventKind,
  courseId: string,
  ref: string,
  payload: Record<string, unknown>,
  now: Date = new Date(),
  id: string = crypto.randomUUID(),
): PathEvent {
  return { id, kind, course_id: courseId, ref, payload, client_ts: now.toISOString() };
}
