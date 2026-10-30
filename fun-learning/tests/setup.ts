/**
 * Vitest setup — loaded via vitest.config.ts `test.setupFiles`.
 *
 * Loads `.env` so DATABASE_URL (and other secrets) are available in the test
 * environment. Prisma resolves the file: URL relative to its schema file
 * (prisma/), so the default "file:./dev.db" lands at prisma/dev.db as expected.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const envPath = resolve(process.cwd(), ".env");
if (existsSync(envPath)) {
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    // Strip surrounding quotes.
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

// Belt-and-braces default so DB-touching tests fail with a helpful message
// instead of Prisma's "env var not found" when `.env` is missing.
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = "file:./dev.db";
}
