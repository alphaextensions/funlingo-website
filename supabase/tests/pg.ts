import type { Pool, PoolClient } from "pg";
import { inject } from "vitest";
import { poolFor } from "./cluster";

export { applySql, poolFor, startCluster } from "./cluster";

declare module "vitest" {
  export interface ProvidedContext {
    db: { host: string; port: number };
  }
}

let shared: Pool | undefined;

/** Superuser pool onto the cluster started by global-setup. */
export function getPool(): Pool {
  shared ??= poolFor(inject("db"));
  return shared;
}

/** Runs fn in a transaction as Supabase's `authenticated` role for userId, or as `anon` when null. */
export async function asUser<T>(pool: Pool, userId: string | null, fn: (c: PoolClient) => Promise<T>): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("begin");
    await client.query(userId ? "set local role authenticated" : "set local role anon");
    await client.query("select set_config('request.jwt.claims', $1, true)", [userId ? JSON.stringify({ sub: userId }) : ""]);
    const result = await fn(client);
    await client.query("commit");
    return result;
  } catch (err) {
    await client.query("rollback");
    throw err;
  } finally {
    client.release();
  }
}

export async function createUser(pool: Pool, email: string): Promise<string> {
  const { rows } = await pool.query("insert into auth.users (email) values ($1) returning id", [email]);
  return rows[0].id;
}
