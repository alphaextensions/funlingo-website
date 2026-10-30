# Learning Path Phase 0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Lay the repo foundations for the website learning path:

- the Supabase schema with row-level security
- the `apply_events` sync function
- tests that prove both
- the path content schema and its validator

**Architecture:**

- **Database:** plain SQL migrations live in `supabase/migrations/`, which is the Supabase CLI
  layout, so `supabase db push` later applies them unchanged. They are tested against a
  throwaway local Postgres cluster. A small shim stands in for Supabase's `auth` schema and its
  roles, so no Docker or Supabase CLI is needed.
- **Content:** path content is JSON in git, validated by a zod schema in `lib/path/`.
- **Site:** keeps `output: "export"` unchanged.

**Tech Stack:** Postgres 14+ SQL, Vitest, `pg` (node-postgres), zod, TypeScript 5.9, Next 16
(unchanged).

**Spec:** `docs/learning-path/2026-10-24-learning-path-plan.md` (§5 content schema, §7.4 data
model, §7.5 sync, §7.9 testing)

## Global Constraints

- **Site stays static.** `next.config.ts` keeps `output: "export"`. No API routes, no middleware.
- **Content IDs are stable strings** from the content JSON. Content is never stored in the DB.
  Progress rows carry `content_version`.
- **Every user table has RLS enabled.** The policy is `user_id = auth.uid()`; `profiles` uses
  `id = auth.uid()`. Anonymous users get nothing.
- **Progress writes (`scene_progress`, `watch_daily`, `finale_attempts`, `events`) go only through
  `apply_events`.** Clients have SELECT-only on those tables.
- **Merge rules:**
  - completion is an OR
  - `best_score` is the max
  - attempts are counted once per distinct event id
  - re-sending an event is a no-op
- **Pass marks:** Finale 75%, placement / test-out 85%.
- **Clip difficulty is 1–100.**
- **Ordering:** subtitle cue times ascend, and every cue falls within the clip's duration.
- **SQL compatibility:** must run on Postgres 14 (local) and Supabase's Postgres 15/17. Avoid
  `MERGE` and `NULLS NOT DISTINCT`.
- **Secrets:** the service-role key never appears in the repo or in client code.

## Review Focus

1. **One user reading or changing another's rows**, through tables or through `apply_events`.
   Expect zero rows or an error. *Task 2 test.*
2. **The same event batch sent twice** (retry after a timeout, or guest merge plus a second
   device). Expect attempts and watch seconds unchanged by the second send. *Task 2 test.*
3. **Malformed or hostile events:** an unknown kind, a score of 140, watch seconds of −5 or
   100000, a far-future `client_ts`, or a batch of 10,000 events. Expect them rejected or
   clamped and reported back, while the rest of the batch still applies. *Task 2 test.*
4. **An anonymous caller (no JWT) invoking `apply_events`.** Expect an error, and no rows.
   *Task 2 test.*
5. **Content with duplicate IDs, dangling word refs, or subtitle cues out of order.** Expect the
   validator to fail with a path to the bad node. *Task 3 test.*

---

### Task 1: Test harness — Vitest and a throwaway Postgres with a Supabase shim

**Files:**
- Create: `vitest.config.ts`, `supabase/tests/shim.sql`, `supabase/tests/pg.ts`, `supabase/tests/global-setup.ts`, `supabase/tests/harness.test.ts`
- Modify: `package.json` (add devDeps `vitest`, `pg`, `@types/pg`, and the scripts `"test": "vitest run"` and `"test:watch": "vitest"`), `.gitignore` (`.env*.local`)

**Interfaces:**
- Produces:
  - `startCluster(): Promise<{ connectionString: string; stop(): Promise<void> }>`: runs
    `initdb` into an `mkdtemp` directory, then `pg_ctl start` on a free port with a Unix socket
    in that directory. It finds the binaries through `PG_BIN`, else `pg_config --bindir`, else
    `PATH`.
  - `applySql(pool, files: string[])`.
  - `asUser<T>(pool, userId: string | null, fn: (c: PoolClient) => Promise<T>): Promise<T>`:
    runs `fn` in a transaction after `set local role authenticated` (or `anon` when `userId` is
    null) and `set local request.jwt.claims = '{"sub": userId}'`.
  - `createUser(pool, email): Promise<string>`: inserts into `auth.users` as superuser and
    returns the id.
  - `getPool(): Pool`: reads `process.env.TEST_DATABASE_URL`, which global setup provides.
- **Shim contents:**
  - `auth` schema with an `auth.users(id uuid pk default gen_random_uuid(), email text)` table
  - `auth.uid()` reads `request.jwt.claims->>'sub'`
  - NOLOGIN roles `anon`, `authenticated` and `service_role`
  - `grant usage on schema public, auth` to those roles
  - **Supabase's real default** `alter default privileges in schema public grant all on tables
    to anon, authenticated, service_role`, so migrations must revoke on their own.
- **Global setup** starts one cluster, applies the shim and then every
  `supabase/migrations/*.sql` in name order, and stops the cluster at teardown. If no Postgres
  binaries are found it throws, unless `SKIP_DB_TESTS=1`.
- **Vitest settings:** `environment: "node"`, `include: ["lib/**/*.test.ts", "supabase/tests/**/*.test.ts"]`, `exclude: ["src/**", "out/**", "node_modules/**"]`.

- [ ] **Step 1:** Write `harness.test.ts`:
  - `auth.uid()` returns the id inside `asUser(pool, id, …)`.
  - `auth.uid()` is null inside `asUser(pool, null, …)`.
- [ ] **Step 2:** Run `npm test`. Expect FAIL: the harness doesn't exist yet.
- [ ] **Step 3:** Implement the shim, `pg.ts`, `global-setup.ts` and `vitest.config.ts`, and
  install the devDeps.
- [ ] **Step 4:** Run `npm test`. Expect the harness tests to PASS. Then check that
  `ps aux | grep "[p]ostgres -D .*vitest"` shows no leftover cluster.
- [ ] **Step 5:** Commit: `test: vitest + throwaway postgres harness with supabase auth shim`.

### Task 2: Schema, RLS and `apply_events`

**Files:**
- Create: `supabase/migrations/20261024000000_learning_path.sql`, `supabase/tests/rls.test.ts`, `supabase/tests/apply-events.test.ts`, `.env.example`

**Interfaces:**
- Consumes: Task 1's `getPool`, `asUser` and `createUser`.
- Produces the tables (column lists exactly as spec §7.4) `profiles`, `enrollments`,
  `scene_progress`, `finale_attempts`, `events`, `saved_words`, `review_cards`, `review_logs` and
  `watch_daily`, plus:
  - **`handle_new_user()`:** a trigger after insert on `auth.users` that creates the `profiles`
    row.
  - **Owner policies:**
    - `profiles`: SELECT and UPDATE.
    - `enrollments`, `saved_words`, `review_cards` and `review_logs`: SELECT, INSERT, UPDATE and
      DELETE, with `user_id` defaulting to `auth.uid()`.
    - `scene_progress`, `watch_daily`, `finale_attempts` and `events`: SELECT only.
  - **Grants:** revoke all on every table from `anon`. Revoke INSERT, UPDATE and DELETE from
    `authenticated` on the four RPC-only tables.
  - **`apply_events(batch jsonb) returns jsonb`:** `SECURITY DEFINER`,
    `set search_path = public, pg_temp`, execute granted to `authenticated` only. It returns
    `{"applied": int, "duplicates": int, "rejected": [{"id": text, "reason": text}]}`.
- **What `apply_events` does:**
  - **Input:** an array of up to 500 events
    `{id: uuid, kind, course_id, ref, payload, client_ts}`. More than 500 raises
    `batch too large`.
  - **Caller:** `auth.uid()` being null raises `not authenticated`. The `user_id` is always
    `auth.uid()` and is never read from the payload.
  - **Timestamps:** `client_ts` is clamped to `now()` when it's in the future.
  - **Duplicates:** insert into `events` with `on conflict (id) do nothing`. Side effects run
    only when that insert happened; otherwise the event counts as a duplicate.
  - **Effects by kind:**

    | Kind | `ref` | Payload | Effect |
    |---|---|---|---|
    | `scene_started` | scene id | `{content_version}` | Create the `scene_progress` row with status `started` if it doesn't exist |
    | `scene_done` | scene id | `{score 0..100, content_version}` | Upsert: status `done`, `best_score = greatest(...)`, `attempts + 1`, `first_done_at = coalesce(existing, client_ts)` |
    | `take_done` | `scene_id:take_index` | `{kind, score?}` | Logged only |
    | `watch_tick` | — | `{day 'YYYY-MM-DD', seconds 1..3600, source in ('path','extension','app')}` | Add `seconds` to that day's `watch_daily` row |
    | `finale_done` | episode id | `{score 0..100, answers}` | Insert into `finale_attempts` with `id = event id` and `passed = score >= 75` |

  - **Invalid events:** an unknown kind or an out-of-range value is added to `rejected` with a
    reason, and is not stored. The rest of the batch still applies.

- [ ] **Step 1:** Write `rls.test.ts` (users A and B from `createUser`):
  - Creating a user creates a profile.
  - A sees only their own profile. A's update of B's profile changes 0 rows.
  - `anon` sees 0 rows in every table.
  - A's direct `insert into scene_progress` throws `permission denied`.
  - A can insert a `saved_words` row for themself, but not one with `user_id = B` (RLS
    violation).
  - Deleting `auth.users` A cascades to every table.
- [ ] **Step 2:** Write `apply-events.test.ts`:
  - **Basic effects:**
    - `scene_done` score 60, then 90, then 70 gives `best_score 90` and `attempts 3`.
    - `scene_started` after `scene_done` keeps status `done`.
  - **Duplicates and merge:**
    - Sending the same batch twice returns `applied 0, duplicates n` the second time, and
      attempts are unchanged.
    - A guest batch merged after a device batch gives the union of both.
  - **Watch time:** two `watch_tick`s for the same day sum their seconds.
  - **Rejections:**
    - A score of 140, seconds of −5 or 100000, and kind `hack` all land in `rejected`.
    - The valid sibling events in the same batch still apply.
  - **Clamping:** a future `client_ts` is stored as at most `now()`.
  - **Limits and access:**
    - A batch of 501 events raises.
    - `anon` gets an error.
    - B can't see A's events afterwards.
  - **Finale:** `finale_done` 74 is not passed, 75 is.
- [ ] **Step 3:** Run `npm test`. Expect FAIL: the relations don't exist yet.
- [ ] **Step 4:** Write the migration. Use `plpgsql` with a loop over
  `jsonb_array_elements(batch)` and a `begin … exception` block per event, so a bad cast only
  rejects that one event. Also write `.env.example` with `NEXT_PUBLIC_SUPABASE_URL=` and
  `NEXT_PUBLIC_SUPABASE_ANON_KEY=`.
- [ ] **Step 5:** Run `npm test`. Expect all tests to PASS.
- [ ] **Step 6:** Commit: `feat(db): learning-path schema, RLS and apply_events sync RPC`.

### Task 3: Content schema and validator

**Files:**
- Create: `lib/path/constants.ts`, `lib/path/schema.ts`, `lib/path/validate.ts`, `lib/path/validate.test.ts`, `content/courses/sample/course.json`
- Modify: `package.json` (add dependency `zod`, and the script `"validate:content": "vitest run lib/path"`)

**Interfaces:**
- **`constants.ts`:**
  - `FINALE_PASS_PCT = 75`
  - `PLACEMENT_PASS_PCT = 85`
  - `TAKE_KINDS = ["watch","wordlab","guess","pattern","shadow","listen"] as const`
  - `CEFR = ["A1","A2","B1","B2"] as const`
- **`schema.ts`** exports the zod schemas and their inferred types: `Course`, `Season`,
  `Episode`, `Scene`, `Clip`, `Cue`, `Take`, `Finale`, `Question` and `WordEntry`. They follow
  spec §5, with these Phase 1 decisions:
  - **Course:** `{ id: /^[a-z]{2}-[a-z]{2}$/, native, target, version: int>=1, words: Record<wordId, WordEntry>, seasons }`.
  - **WordEntry:** `{ term, gloss, romanization?, audio? }`. Glosses are in the course's
    `native` language only.
  - **Scene:** `coldOpen` is a union: `{ kind: "dialogue", lines: {speaker, target, native}[] }`
    or `{ kind: "clip", clip: Clip }`. Phase 1 has no video, so it uses `dialogue`.
  - **Clip:** `{ src, durationSec>0, difficulty int 1..100, cues: {t>=0, target, native}[] }`.
  - **Take:** `{ kind: TakeKind, items?: string[] }`.
  - **Finale:** `{ questions: Question[] min 1, passPct: default FINALE_PASS_PCT }`.
  - **Question:** `{ prompt, options: string[] min 2, answer: int index into options }`.
  - **IDs:** seasons, episodes and scenes all carry `id: string` matching
    `/^[a-z0-9][a-z0-9-]*$/`.
  - **Scene words:** `words: string[]`, each a key into `course.words`.
- **`validate.ts`:**
  - `validateCourse(json: unknown): { ok: true; course: Course } | { ok: false; errors: string[] }`.
  - It runs the zod parse, then cross-checks:
    - IDs are unique across seasons, episodes and scenes.
    - Every scene word ID exists in `course.words`.
    - Cue times strictly ascend, and every `t` is under `durationSec`.
    - Every `answer` is less than `options.length`.
  - Each error string starts with a JSON path, e.g.
    `seasons[0].episodes[1].scenes[0].words[2]: unknown word "hola"`.

- [ ] **Step 1:** Write `validate.test.ts`:
  - `content/courses/sample/course.json` is valid.
  - Every `content/courses/*/course.json` file is valid (picked up by a glob, so future courses
    are covered automatically).
  - Each of these fails with an error containing its path and keyword: a duplicate scene ID
    (`duplicate id`), an unknown word ref (`unknown word`), cues `[5, 3]` (`ascend`), a cue at
    `t = durationSec` (`duration`), difficulty 0 and 101, `answer: 3` with 3 options, and a bad
    course ID `"hindi-en"`.
  - An omitted `passPct` defaults to 75.
- [ ] **Step 2:** Run `npm test -- lib/path`. Expect FAIL: the modules don't exist yet.
- [ ] **Step 3:** Implement `constants.ts`, `schema.ts` and `validate.ts`, and write the sample
  course: 1 season (A1), 1 episode, 2 scenes (one with a `dialogue` cold open, one with a `clip`
  cold open), 6 words, and a Finale with 2 questions. Use English → Spanish placeholder content,
  marked `"_note": "fixture, not real course content"`.
- [ ] **Step 4:** Run `npm test`. Expect everything to PASS. Run `npx tsc --noEmit`; expect no
  new errors. Run `npm run build`; expect it to succeed and `out/` to still be static.
- [ ] **Step 5:** Commit: `feat(path): content schema, validator and sample course fixture`.

---

## Manual setup for the owner (cannot be automated from here)

These need the owner's accounts. They are listed in the final hand-off, not executed:

1. **Supabase projects:** create `funlingo-dev` (Free) and `funlingo-prod` (Pro), and pick the
   region (decision §10.4).
2. **Apply the migrations:** `npx supabase login`, then
   `npx supabase link --project-ref <ref>`, then `npx supabase db push`.
3. **Google OAuth client:** create it in Google Cloud and add the redirect
   `https://<ref>.supabase.co/auth/v1/callback`. Then enable Google in Supabase Auth.
4. **Email:** set up a Resend or Postmark sender on getfunlingo.com (SPF, DKIM, DMARC) and enter
   the SMTP details in Supabase Auth.
5. **Environment variables:** put the URL and anon key in the hosting env vars. Confirm whether
   production runs on Vercel or Netlify.
6. **Pilot pair:** decide it, so the real Season 1 outline can be written.
