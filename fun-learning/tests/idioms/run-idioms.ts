/**
 * Idiom regression harness — gates deploys per AGENT-PLAYBOOK rule 4.
 *
 * For each fixture pair in tests/fixtures/idioms/<pair>.json, calls
 * `translateLines` and scores each line:
 *
 *   full credit (1.0)   if ANY `expected_patterns` regex matches
 *   half credit (0.5)   if ANY `acceptable_patterns` regex matches
 *   zero                otherwise
 *
 * Pass threshold: ≥95% FULL CREDIT per pair. Partial credit is logged for
 * debugging but doesn't count toward the gate.
 *
 * No `GROQ_API_KEY` → runner EXITS SUCCESSFULLY with code 0 and prints a
 * clear banner so dev worktrees without credentials don't fail CI noise.
 * Any CI env that has a key WILL hit the gate.
 */

import fs from "node:fs";
import path from "node:path";
import { translateLines } from "@/lib/ai";
import { markConfidential } from "@/server/types/confidential";
import { ensureTestUser, cleanupTestUser } from "./test-utils";

type Fixture = {
  input: string;
  expected_patterns: string[];
  acceptable_patterns?: string[];
};

type PairResult = {
  pair: string;
  total: number;
  full: number;
  partial: number;
  misses: Array<{ input: string; got: string }>;
};

const FIXTURES_DIR = path.resolve(process.cwd(), "tests/fixtures/idioms");
const PASS_PCT = 0.95;

function parsePair(fileBase: string): [string, string] {
  const [src, tgt] = fileBase.replace(/\.json$/, "").split("-");
  return [src, tgt];
}

function matchAny(text: string, patterns: string[]): boolean {
  return patterns.some((p) => {
    try {
      return new RegExp(p).test(text);
    } catch {
      return false;
    }
  });
}

async function runPair(file: string, userId: string): Promise<PairResult> {
  const base = path.basename(file);
  const [src, tgt] = parsePair(base);
  const fixtures = JSON.parse(fs.readFileSync(file, "utf8")) as Fixture[];
  const lines = fixtures.map((f) => f.input);

  const translations: Record<number, string> = {};
  const iter = translateLines({
    lines: markConfidential(lines),
    sourceLang: src,
    targetLang: tgt,
    style: "natural",
    userId,
  });
  for await (const chunk of iter) {
    translations[chunk.index] = chunk.translation;
  }

  let full = 0;
  let partial = 0;
  const misses: PairResult["misses"] = [];

  fixtures.forEach((f, i) => {
    const got = translations[i] ?? "";
    if (matchAny(got, f.expected_patterns)) {
      full += 1;
    } else if (f.acceptable_patterns && matchAny(got, f.acceptable_patterns)) {
      partial += 1;
      misses.push({ input: f.input, got });
    } else {
      misses.push({ input: f.input, got });
    }
  });

  return { pair: `${src}-${tgt}`, total: fixtures.length, full, partial, misses };
}

async function main() {
  if (!process.env.GROQ_API_KEY) {
    console.log(
      "\n[idioms] GROQ_API_KEY not set — skipping idiom regression (xfail). " +
        "This is OK locally; CI with a key MUST enforce ≥95% per pair.\n",
    );
    process.exit(0);
  }

  const files = fs
    .readdirSync(FIXTURES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => path.join(FIXTURES_DIR, f))
    .sort();

  if (files.length === 0) {
    console.error("[idioms] No fixtures found in", FIXTURES_DIR);
    process.exit(2);
  }

  const userId = await ensureTestUser("idiom-harness");
  const results: PairResult[] = [];
  for (const file of files) {
    try {
      const r = await runPair(file, userId);
      results.push(r);
    } catch (err) {
      console.error("[idioms] pair failed:", file, err);
      results.push({
        pair: path.basename(file, ".json"),
        total: 0,
        full: 0,
        partial: 0,
        misses: [],
      });
    }
  }
  await cleanupTestUser(userId);

  let gateFailed = false;
  console.log("\n[idioms] Results:");
  for (const r of results) {
    const pct = r.total ? r.full / r.total : 0;
    const pass = pct >= PASS_PCT;
    console.log(
      `  ${r.pair}  full ${r.full}/${r.total} (${(pct * 100).toFixed(0)}%)  partial ${r.partial}  ${pass ? "PASS" : "FAIL"}`,
    );
    if (!pass) gateFailed = true;
    for (const m of r.misses) {
      console.log(`      miss: "${m.input}"  →  "${m.got}"`);
    }
  }

  if (gateFailed) {
    console.error(`\n[idioms] FAIL — below ${(PASS_PCT * 100).toFixed(0)}% per pair.\n`);
    process.exit(1);
  }
  console.log(`\n[idioms] PASS — all pairs ≥${(PASS_PCT * 100).toFixed(0)}%.\n`);
}

main().catch((err) => {
  console.error("[idioms] crashed:", err);
  process.exit(2);
});
