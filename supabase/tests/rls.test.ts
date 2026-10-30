import { beforeAll, describe, expect, it } from "vitest";
import { asUser, createUser, getPool } from "./pg";

const pool = getPool();
const TABLES = [
  "profiles",
  "enrollments",
  "scene_progress",
  "finale_attempts",
  "events",
  "saved_words",
  "review_cards",
  "review_logs",
  "watch_daily",
];

let a: string;
let b: string;

beforeAll(async () => {
  a = await createUser(pool, "rls-a@example.com");
  b = await createUser(pool, "rls-b@example.com");
});

describe("row-level security", () => {
  it("creates a profile when a user signs up", async () => {
    const { rows } = await pool.query("select id from profiles where id = $1", [a]);
    expect(rows).toHaveLength(1);
  });

  it("lets a user see only their own profile", async () => {
    const rows = await asUser(pool, a, async (c) => (await c.query("select id from profiles")).rows);
    expect(rows.map((r) => r.id)).toEqual([a]);
  });

  it("ignores a user's update to someone else's profile", async () => {
    const count = await asUser(
      pool,
      a,
      async (c) => (await c.query("update profiles set display_name = 'pwned' where id = $1", [b])).rowCount,
    );
    expect(count).toBe(0);
    const { rows } = await pool.query("select display_name from profiles where id = $1", [b]);
    expect(rows[0].display_name).not.toBe("pwned");
  });

  it("lets a user update their own profile", async () => {
    const count = await asUser(
      pool,
      a,
      async (c) => (await c.query("update profiles set daily_goal_min = 20 where id = $1", [a])).rowCount,
    );
    expect(count).toBe(1);
  });

  it.each(TABLES)("gives anonymous callers nothing from %s", async (table) => {
    await expect(asUser(pool, null, (c) => c.query(`select * from ${table}`))).rejects.toThrow(/permission denied/);
  });

  it.each(["scene_progress", "watch_daily", "finale_attempts", "events"])(
    "blocks direct writes to %s",
    async (table) => {
      await expect(
        asUser(pool, a, (c) => c.query(`insert into ${table} (user_id) values ($1)`, [a])),
      ).rejects.toThrow(/permission denied/);
    },
  );

  it.each(TABLES)("refuses TRUNCATE on %s, which would bypass RLS", async (table) => {
    await expect(asUser(pool, a, (c) => c.query(`truncate ${table} cascade`))).rejects.toThrow(/permission denied/);
  });

  it("refuses a review card that points at someone else's word", async () => {
    const wordOfB = await asUser(pool, b, async (c) =>
      (
        await c.query(
          "insert into saved_words (course_id, term, lemma, source) values ('hi-en', 'tea', 'tea', 'path') returning id",
        )
      ).rows[0].id,
    );
    await expect(
      asUser(pool, a, (c) => c.query("insert into review_cards (word_id) values ($1)", [wordOfB])),
    ).rejects.toThrow(/foreign key/);
  });

  it("lets a user save a word for themself", async () => {
    const rows = await asUser(pool, a, async (c) =>
      (
        await c.query(
          "insert into saved_words (course_id, term, lemma, source) values ('hi-en', 'hello', 'hello', 'path') returning user_id",
        )
      ).rows,
    );
    expect(rows[0].user_id).toBe(a);
  });

  it("refuses a saved word filed under another user", async () => {
    await expect(
      asUser(pool, a, (c) =>
        c.query(
          "insert into saved_words (user_id, course_id, term, lemma, source) values ($1, 'hi-en', 'x', 'x', 'path')",
          [b],
        ),
      ),
    ).rejects.toThrow(/row-level security/);
  });

  it("deletes every row of a user when the auth user is deleted", async () => {
    const c = await createUser(pool, "rls-c@example.com");
    await asUser(pool, c, async (cl) => {
      await cl.query("insert into enrollments (course_id) values ('hi-en')");
      await cl.query(
        "insert into saved_words (course_id, term, lemma, source) values ('hi-en', 'bye', 'bye', 'path')",
      );
      await cl.query(
        `select apply_events($1::jsonb)`,
        [
          JSON.stringify([
            { id: crypto.randomUUID(), kind: "scene_done", course_id: "hi-en", ref: "s1", payload: { score: 80, content_version: 1 }, client_ts: new Date().toISOString() },
            { id: crypto.randomUUID(), kind: "watch_tick", course_id: "hi-en", payload: { day: new Date().toISOString().slice(0, 10), seconds: 60, source: "path" }, client_ts: new Date().toISOString() },
          ]),
        ],
      );
    });
    await pool.query("delete from auth.users where id = $1", [c]);
    for (const table of TABLES) {
      const col = table === "profiles" ? "id" : "user_id";
      const { rows } = await pool.query(`select count(*)::int as n from ${table} where ${col} = $1`, [c]);
      expect(rows[0].n, table).toBe(0);
    }
  });
});
