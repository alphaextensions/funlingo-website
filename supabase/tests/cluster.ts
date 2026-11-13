import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import pg, { type Pool, type PoolConfig } from "pg";

function pgBin(name: string): string {
  if (process.env.PG_BIN) return join(process.env.PG_BIN, name);
  try {
    const dir = execFileSync("pg_config", ["--bindir"], { encoding: "utf8" }).trim();
    if (existsSync(join(dir, name))) return join(dir, name);
  } catch {
    // fall through to PATH
  }
  return name;
}

function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.once("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const { port } = srv.address() as { port: number };
      srv.close(() => resolve(port));
    });
  });
}

/** Boots a throwaway Postgres cluster listening only on a Unix socket in a temp dir. */
export async function startCluster(): Promise<{ host: string; port: number; stop(): Promise<void> }> {
  const dir = mkdtempSync(join(tmpdir(), "fnl-pg-"));
  const data = join(dir, "data");
  const port = await freePort();
  execFileSync(pgBin("initdb"), ["-D", data, "-U", "postgres", "-A", "trust", "--no-locale", "-E", "UTF8"], {
    stdio: "ignore",
  });
  execFileSync(
    pgBin("pg_ctl"),
    ["start", "-w", "-D", data, "-l", join(dir, "pg.log"), "-o", `-p ${port} -k ${dir} -c listen_addresses=''`],
    { stdio: "ignore" },
  );
  return {
    host: dir,
    port,
    async stop() {
      try {
        execFileSync(pgBin("pg_ctl"), ["stop", "-m", "immediate", "-D", data], { stdio: "ignore" });
      } finally {
        rmSync(dir, { recursive: true, force: true });
      }
    },
  };
}

export function poolFor(db: { host: string; port: number }): Pool {
  const config: PoolConfig = { host: db.host, port: db.port, user: "postgres", database: "postgres", max: 4 };
  return new pg.Pool(config);
}

export async function applySql(pool: Pool, files: string[]): Promise<void> {
  for (const file of files) {
    try {
      await pool.query(readFileSync(file, "utf8"));
    } catch (err) {
      throw new Error(`applying ${file}: ${(err as Error).message}`);
    }
  }
}

