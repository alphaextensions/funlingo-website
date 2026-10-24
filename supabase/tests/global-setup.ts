import { readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import type { TestProject } from "vitest/node";
import { applySql, poolFor, startCluster } from "./cluster";

const here = fileURLToPath(new URL(".", import.meta.url));
const root = join(here, "..");

export default async function setup(project: TestProject) {
  const cluster = await startCluster();
  const pool = poolFor(cluster);
  try {
    const migrations = readdirSync(join(root, "migrations"), { withFileTypes: true })
      .filter((f) => f.isFile() && f.name.endsWith(".sql"))
      .map((f) => join(root, "migrations", f.name))
      .sort();
    await applySql(pool, [join(here, "shim.sql"), ...migrations]);
  } catch (err) {
    await pool.end();
    await cluster.stop();
    throw err;
  }
  await pool.end();
  project.provide("db", { host: cluster.host, port: cluster.port });
  return () => cluster.stop();
}
