import type { PoolClient } from "pg";
import { beforeEach, describe, expect, it } from "vitest";
import { asUser, createUser, getPool } from "./pg";

const pool = getPool();
const COURSE = "hi-en";
const TODAY = new Date().toISOString().slice(0, 10); // UTC, as apply_events reads it

type Ev = { id: string; kind: string; course_id: string; ref?: string | null; payload: unknown; client_ts: string };
type Result = { applied: number; duplicates: number; rejected: { id: string; reason: string }[] };

function ev(kind: string, ref: string | null, payload: unknown, client_ts = new Date().toISOString()): Ev {
  return { id: crypto.randomUUID(), kind, course_id: COURSE, ref, payload, client_ts };
}

async function apply(c: PoolClient, batch: Ev[]): Promise<Result> {
  const { rows } = await c.query("select apply_events($1::jsonb) as r", [JSON.stringify(batch)]);
  return rows[0].r;
}

async function sendAs(user: string, batch: Ev[]): Promise<Result> {
  return asUser(pool, user, (c) => apply(c, batch));
}

async function scene(user: string, sceneId: string) {
  const { rows } = await pool.query(
    "select status, best_score, attempts, first_done_at from scene_progress where user_id = $1 and course_id = $2 and scene_id = $3",
    [user, COURSE, sceneId],
  );
  return rows[0];
}

let a: string;
let b: string;

beforeEach(async () => {
  a = await createUser(pool, "ev-a@example.com");
  b = await createUser(pool, "ev-b@example.com");
});

describe("apply_events", () => {
  it("keeps the best score and counts every attempt", async () => {
    const r = await sendAs(a, [
      ev("scene_done", "s1", { score: 60, content_version: 1 }),
      ev("scene_done", "s1", { score: 90, content_version: 1 }),
      ev("scene_done", "s1", { score: 70, content_version: 1 }),
    ]);
    expect(r).toEqual({ applied: 3, duplicates: 0, rejected: [] });
    expect(await scene(a, "s1")).toMatchObject({ status: "done", best_score: 90, attempts: 3 });
  });

  it("does not downgrade a finished scene when a late scene_started arrives", async () => {
    await sendAs(a, [ev("scene_done", "s1", { score: 80, content_version: 1 })]);
    await sendAs(a, [ev("scene_started", "s1", { content_version: 1 })]);
    expect(await scene(a, "s1")).toMatchObject({ status: "done", attempts: 1 });
  });

  it("treats a re-sent batch as duplicates and changes nothing", async () => {
    const batch = [
      ev("scene_done", "s1", { score: 50, content_version: 1 }),
      ev("watch_tick", null, { day: TODAY, seconds: 120, source: "path" }),
    ];
    await sendAs(a, batch);
    const again = await sendAs(a, batch);
    expect(again).toEqual({ applied: 0, duplicates: 2, rejected: [] });
    expect(await scene(a, "s1")).toMatchObject({ attempts: 1 });
    const { rows } = await pool.query("select seconds from watch_daily where user_id = $1", [a]);
    expect(rows[0].seconds).toBe(120);
  });

  it("merges a guest batch with a device batch", async () => {
    const earlier = new Date(Date.now() - 86_400_000).toISOString();
    await sendAs(a, [ev("scene_done", "s1", { score: 70, content_version: 1 })]);
    await sendAs(a, [
      ev("scene_done", "s1", { score: 95, content_version: 1 }, earlier),
      ev("scene_done", "s2", { score: 40, content_version: 1 }, earlier),
    ]);
    const s1 = await scene(a, "s1");
    expect(s1).toMatchObject({ status: "done", best_score: 95, attempts: 2 });
    expect(new Date(s1.first_done_at).toISOString()).toBe(earlier);
    expect(await scene(a, "s2")).toMatchObject({ status: "done", best_score: 40, attempts: 1 });
  });

  it("sums watch ticks for the same day", async () => {
    await sendAs(a, [
      ev("watch_tick", null, { day: TODAY, seconds: 300, source: "path" }),
      ev("watch_tick", null, { day: TODAY, seconds: 200, source: "path" }),
    ]);
    const { rows } = await pool.query("select seconds from watch_daily where user_id = $1 and day = $2", [a, TODAY]);
    expect(rows[0].seconds).toBe(500);
  });

  it("rejects bad events and still applies the good ones", async () => {
    const bad = [
      ev("scene_done", "s1", { score: 140, content_version: 1 }),
      ev("watch_tick", null, { day: TODAY, seconds: -5, source: "path" }),
      ev("watch_tick", null, { day: TODAY, seconds: 100000, source: "path" }),
      ev("watch_tick", null, { day: TODAY, seconds: 10, source: "tv" }),
      ev("hack", "s1", {}),
      ev("scene_done", null, { score: 50, content_version: 1 }),
    ];
    const good = ev("scene_done", "s9", { score: 55, content_version: 1 });
    const r = await sendAs(a, [...bad, good]);
    expect(r.applied).toBe(1);
    expect(r.rejected.map((x) => x.id).sort()).toEqual(bad.map((x) => x.id).sort());
    expect(r.rejected.every((x) => x.reason.length > 0)).toBe(true);
    expect(await scene(a, "s9")).toMatchObject({ best_score: 55 });
    expect(await scene(a, "s1")).toBeUndefined();
    const { rows } = await pool.query("select count(*)::int as n from events where user_id = $1", [a]);
    expect(rows[0].n).toBe(1);
  });

  it("rejects an event whose id is not a uuid", async () => {
    const r = await sendAs(a, [{ ...ev("scene_done", "s1", { score: 50, content_version: 1 }), id: "nope" }]);
    expect(r.rejected).toHaveLength(1);
  });

  it("clamps a future client timestamp to now", async () => {
    const future = new Date(Date.now() + 30 * 86_400_000).toISOString();
    const e = ev("scene_done", "s1", { score: 50, content_version: 1 }, future);
    await sendAs(a, [e]);
    const { rows } = await pool.query("select client_ts <= now() as ok from events where id = $1", [e.id]);
    expect(rows[0].ok).toBe(true);
    expect((await scene(a, "s1")).first_done_at <= new Date()).toBe(true);
  });

  it("refuses a batch over 500 events", async () => {
    const batch = Array.from({ length: 501 }, () => ev("take_done", "s1:0", { kind: "guess" }));
    await expect(sendAs(a, batch)).rejects.toThrow(/batch too large/);
  });

  it("refuses anonymous callers", async () => {
    await expect(
      asUser(pool, null, (c) => apply(c, [ev("scene_done", "s1", { score: 50, content_version: 1 })])),
    ).rejects.toThrow(/permission denied|not authenticated/);
  });

  it("files events under the caller even if the payload names someone else", async () => {
    await sendAs(a, [{ ...ev("scene_done", "s1", { score: 50, content_version: 1 }), user_id: b } as Ev]);
    expect(await scene(a, "s1")).toBeDefined();
    expect(await scene(b, "s1")).toBeUndefined();
  });

  it("hides one user's events from another", async () => {
    await sendAs(a, [ev("take_done", "s1:0", { kind: "guess" })]);
    const rows = await asUser(pool, b, async (c) => (await c.query("select * from events")).rows);
    expect(rows).toHaveLength(0);
  });

  it("rejects an oversized payload or ref", async () => {
    const fat = ev("take_done", "s1:0", { kind: "guess", blob: "x".repeat(5000) });
    const longRef = ev("take_done", "s".repeat(200), { kind: "guess" });
    const r = await sendAs(a, [fat, longRef]);
    expect(r.rejected.map((x) => x.id).sort()).toEqual([fat.id, longRef.id].sort());
    expect(r.rejected.every((x) => /too large|too long/.test(x.reason))).toBe(true);
  });

  it("rejects a watch day far from the event time", async () => {
    const r = await sendAs(a, [ev("watch_tick", null, { day: "9999-12-31", seconds: 60, source: "path" })]);
    expect(r.rejected).toHaveLength(1);
    const { rows } = await pool.query("select count(*)::int as n from watch_daily where user_id = $1", [a]);
    expect(rows[0].n).toBe(0);
  });

  it("caps a single day at 24 hours of watch time", async () => {
    const ticks = Array.from({ length: 30 }, () => ev("watch_tick", null, { day: TODAY, seconds: 3600, source: "path" }));
    await sendAs(a, ticks);
    const { rows } = await pool.query("select seconds from watch_daily where user_id = $1", [a]);
    expect(rows[0].seconds).toBe(86_400);
  });

  it("floors an ancient client timestamp so it cannot poison first_done_at", async () => {
    await sendAs(a, [ev("scene_done", "s1", { score: 50, content_version: 1 }, "1970-01-01T00:00:00Z")]);
    const { rows } = await pool.query(
      "select first_done_at >= now() - interval '1 year' - interval '1 minute' as ok from scene_progress where user_id = $1",
      [a],
    );
    expect(rows[0].ok).toBe(true);
  });

  it("rejects an event id that another user already used, instead of calling it a duplicate", async () => {
    const shared = ev("scene_done", "s1", { score: 50, content_version: 1 });
    await sendAs(a, [shared]);
    const r = await sendAs(b, [shared]);
    expect(r).toMatchObject({ applied: 0, duplicates: 0 });
    expect(r.rejected).toHaveLength(1);
  });

  it("rounds a fractional score instead of losing the attempt", async () => {
    const r = await sendAs(a, [ev("finale_done", "ep1", { score: 66.67, answers: [0, 1, 1] })]);
    expect(r.applied).toBe(1);
    const { rows } = await pool.query("select score from finale_attempts where user_id = $1", [a]);
    expect(rows[0].score).toBe(67);
  });

  it("saves a reviewed word once and keeps every review", async () => {
    const r = await sendAs(a, [
      ev("word_reviewed", "hola", { rating: 3, term: "hola" }),
      ev("word_reviewed", "hola", { rating: 1, term: "hola" }),
    ]);
    expect(r).toEqual({ applied: 2, duplicates: 0, rejected: [] });
    const words = await pool.query("select id, lemma, term, source from saved_words where user_id = $1", [a]);
    expect(words.rows).toHaveLength(1);
    expect(words.rows[0]).toMatchObject({ lemma: "hola", term: "hola", source: "path" });
    const logs = await pool.query("select rating from review_logs where user_id = $1 and word_id = $2 order by reviewed_at", [a, words.rows[0].id]);
    expect(logs.rows.map((x) => x.rating)).toEqual([3, 1]);
  });

  it("does not repeat a review when the batch is re-sent", async () => {
    const batch = [ev("word_reviewed", "hola", { rating: 4, term: "hola" })];
    await sendAs(a, batch);
    expect(await sendAs(a, batch)).toMatchObject({ applied: 0, duplicates: 1 });
    const { rows } = await pool.query("select count(*)::int as n from review_logs where user_id = $1", [a]);
    expect(rows[0].n).toBe(1);
  });

  it("rejects a review with a bad rating or no term", async () => {
    const bad = [
      ev("word_reviewed", "hola", { rating: 5, term: "hola" }),
      ev("word_reviewed", "hola", { rating: 0, term: "hola" }),
      ev("word_reviewed", "hola", { rating: 3 }),
      ev("word_reviewed", "hola", { rating: 3, term: "x".repeat(201) }),
    ];
    const r = await sendAs(a, bad);
    expect(r.rejected).toHaveLength(4);
    const { rows } = await pool.query("select count(*)::int as n from saved_words where user_id = $1", [a]);
    expect(rows[0].n).toBe(0);
  });

  it("keeps one user's reviews from another", async () => {
    await sendAs(a, [ev("word_reviewed", "hola", { rating: 3, term: "hola" })]);
    const rows = await asUser(pool, b, async (c) => (await c.query("select * from review_logs")).rows);
    expect(rows).toHaveLength(0);
  });

  it("marks a finale passed at 75 and failed at 74", async () => {
    const fail = ev("finale_done", "ep1", { score: 74, answers: [0, 1] });
    const pass = ev("finale_done", "ep1", { score: 75, answers: [0, 1] });
    await sendAs(a, [fail, pass]);
    const { rows } = await pool.query("select id, passed from finale_attempts where user_id = $1", [a]);
    const byId = Object.fromEntries(rows.map((r) => [r.id, r.passed]));
    expect(byId).toEqual({ [fail.id]: false, [pass.id]: true });
  });
});
