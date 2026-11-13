/**
 * Safety filter — every AI output passes through here before reaching callers.
 *
 * Rules live in `rules.yaml` for human review. The real slur list lives in the
 * `SLUR_PATTERNS` env var (newline-separated regex sources) so the full list
 * never sits in version control. See docs/LEGAL.md "Content safety for
 * generated text" and AGENT-PLAYBOOK rule 5.
 *
 * The entry points of every AI function (src/server/ai/invoke.ts) wrap the
 * model call in `filter(output)` — this cannot be opted out of.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import YAML from "yaml";

export type FilterCategory =
  | "slurs"
  | "group_crime"
  | "sexual"
  | "stereotypes"
  | "self_harm"
  | "pii";

export interface FilterRule {
  id: string;
  pattern: string;
  flags?: string;
  category: FilterCategory;
  note?: string;
}

export interface FilterResult {
  ok: boolean;
  violated: string[]; // rule ids
}

interface CompiledRule extends FilterRule {
  re: RegExp;
}

let CACHED_RULES: CompiledRule[] | null = null;

function loadRules(): CompiledRule[] {
  if (CACHED_RULES) return CACHED_RULES;

  const file = path.resolve(process.cwd(), "src/server/ai/safety/rules.yaml");
  const doc = YAML.parse(readFileSync(file, "utf8")) as { rules: FilterRule[] };

  const base: CompiledRule[] = doc.rules.map((r) => ({
    ...r,
    re: new RegExp(r.pattern, r.flags ?? "i"),
  }));

  // Merge runtime slur patterns from env (one regex source per line). Never
  // persisted in a VCS'd file.
  const slursEnv = process.env.SLUR_PATTERNS ?? "";
  const slurRules: CompiledRule[] = slursEnv
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith("#"))
    .map((pattern, i) => ({
      id: `slurs_env_${i + 1}`,
      pattern,
      flags: "iu",
      category: "slurs" as const,
      re: new RegExp(pattern, "iu"),
    }));

  CACHED_RULES = [...base, ...slurRules];
  return CACHED_RULES;
}

/** Apply the full ruleset to an output string. Fast path: short-circuit on
 *  the first match so a known-bad output doesn't scan the whole set. */
export function filter(output: string): FilterResult {
  const rules = loadRules();
  const violated: string[] = [];
  for (const r of rules) {
    r.re.lastIndex = 0;
    if (r.re.test(output)) {
      violated.push(r.id);
    }
  }
  return { ok: violated.length === 0, violated };
}

/** Recursively filter any string field inside a nested AI output. Useful for
 *  structured JSON responses (e.g. sentenceAnalysis). */
export function filterDeep(value: unknown): FilterResult {
  const violated = new Set<string>();
  walk(value);
  return { ok: violated.size === 0, violated: Array.from(violated) };

  function walk(v: unknown) {
    if (typeof v === "string") {
      const r = filter(v);
      r.violated.forEach((id) => violated.add(id));
    } else if (Array.isArray(v)) {
      v.forEach(walk);
    } else if (v && typeof v === "object") {
      Object.values(v as Record<string, unknown>).forEach(walk);
    }
  }
}

/** Reset the compiled-rules cache. Only used by tests that rewrite rules.yaml
 *  or SLUR_PATTERNS mid-run. */
export function __resetFilterCache(): void {
  CACHED_RULES = null;
}
