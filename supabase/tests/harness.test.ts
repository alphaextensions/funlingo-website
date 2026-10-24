import { describe, expect, it } from "vitest";
import { asUser, createUser, getPool } from "./pg";

describe("test harness", () => {
  it("auth.uid() returns the signed-in user's id", async () => {
    const pool = getPool();
    const id = await createUser(pool, "harness-a@example.com");
    const uid = await asUser(pool, id, async (c) => (await c.query("select auth.uid() as uid")).rows[0].uid);
    expect(uid).toBe(id);
  });

  it("auth.uid() is null for an anonymous caller", async () => {
    const pool = getPool();
    const uid = await asUser(pool, null, async (c) => (await c.query("select auth.uid() as uid")).rows[0].uid);
    expect(uid).toBeNull();
  });
});
