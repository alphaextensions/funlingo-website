# Learning Path Phase 1 (Guest Path MVP) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A public, no-account learning path at `/learn`. It has static pages built from course JSON, a scene runner with six take types, a basic Finale with test-out, and progress kept in `localStorage` with an event outbox that is ready for Phase 2 sync.

**Architecture:**

- **Content:** course JSON in `content/courses/<id>/course.json` is validated at build time by `lib/path/catalog.ts`. An invalid course fails the build.
- **Pages:** the `app/learn/**` route segments are static, via `generateStaticParams`.
- **Client:** each page hands its slice of the course to a client component.
- **Logic:** all of it lives in pure, tested modules in `lib/path/`: progress reducer, quiz builders, shadow matching, event factory, and a store with injectable storage.
- **UI:** components live in `app/learn/_components/`.
- **Static export:** `output: "export"` is unchanged.

**Tech Stack:** Next 16 App Router (static export), React 19, TypeScript, zod, Vitest, the
browser Web Speech API (speech synthesis and recognition, both optional).

**Spec:** `docs/learning-path/2026-10-24-learning-path-plan.md` (§4 Seasons & Episodes and scene
anatomy, §7.5 sync, §7.7 website code, §8 Phase 1)

## Global Constraints

- **Static only.** No API routes, no server state, no Supabase calls in Phase 1.
- **Event and merge rules** must match `supabase/migrations/20261024000000_learning_path.sql`
  exactly:
  - event kinds: `scene_started`, `take_done`, `scene_done`, `finale_done`
  - merge: completion is an OR, `best_score` is the max, attempts are counted per distinct event
    id, `first_done_at` is the earliest
  - scores are integers 0–100
- **Pass marks:** a Finale passes at `FINALE_PASS_PCT` (75). Passing a Finale marks every scene
  in that episode done (test-out).
- **Calm design (§4).** No XP, no streaks, no hearts, no guilt copy. Progress shows as episode %
  rings and ticks.
- **Never fake a pronunciation score.** Shadow only shows a word-match ratio, and only when speech
  recognition is available. Otherwise it's a self-check.
- **`localStorage` is optional.** All access goes through try/catch. The page works, without
  persistence, when storage throws.
- **Draft content stays out of search.** `/learn` pages carry `robots: { index: false }` until
  content passes native review. They're not linked from the navbar yet.
- **Visual language:** follow `.playwright-mcp/design/DESIGN-SYSTEM.md`.
  - tokens: `--bg`, `--surface`, `--text`, `--text-dim`, `--border`, `--chip`, `--pink`,
    `--pink-soft`, `--grad`
  - Poppins, inside `.fnl-root`, with `Navbar` and `FooterSection`
  - light and dark both work, and nothing scrolls sideways at 375px
- **Reserved scene id:** `"finale"`, because it's a static route segment.

## Review Focus

1. **Corrupt or old-shape `localStorage` data** (non-JSON, wrong version). Expect a reset to an
   empty state without crashing. *Task 2 test.*
2. **Course content edited after progress exists** (a scene removed, or a new one added). Expect
   that unknown scene keys are ignored and the episode % counts only scenes that still exist.
   *Task 2 test.*
3. **A browser without speech synthesis or recognition** (Firefox, Safari). Expect text-only
   takes and a self-check for Shadow, with no thrown errors. *Task 3 test, plus a manual check in
   Task 5.*
4. **Scenes with fewer than 4 words**, where there aren't enough distractors. Expect the quiz to
   pull distractors from other scenes in the course and never repeat the right answer as a
   distractor. *Task 3 test.*
5. **Reloading in the middle of a scene.** Expect the scene to restart cleanly with no duplicate
   `scene_done`. *Task 5, manual check.*

---

### Task 1: Catalog — load and validate courses at build time

**Files:**
- Create: `lib/path/catalog.ts`, `lib/path/catalog.test.ts`
- Modify: `lib/path/validate.ts` (reject scene id `finale`), `lib/path/validate.test.ts`

**Interfaces:**
- Produces:
  - `loadCourses(dir = "content/courses"): Course[]`: reads `*/course.json` and returns the
    courses sorted by id. On the first invalid course it throws
    `Error("<dir>/course.json:\n" + errors.join("\n"))`. It returns `[]` when the directory is
    missing.
  - `getCourse(id): Course | undefined`.
  - `findEpisode(course, episodeId): { season: Season; episode: Episode; index: number } | undefined`.
- Both are server-only (they use `node:fs`) and are imported only by `page.tsx` files.

- [ ] **Step 1: Write failing tests.**
  - `loadCourses` on a temp dir holding the fixture returns 1 course.
  - It throws with a message containing the file path and `unknown word` for a broken copy.
  - It returns `[]` for a missing dir.
  - `findEpisode` finds `greetings` with `index 0`.
  - The validator rejects a scene id of `finale`.
- [ ] **Step 2:** Run `npx vitest run lib/path`. Expect FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run `npx vitest run lib/path`. Expect PASS.
- [ ] **Step 5:** Commit: `feat(path): course catalog loaded and validated at build time`.

### Task 2: Progress model, event factory, and store

**Files:**
- Create: `lib/path/events.ts`, `lib/path/progress.ts`, `lib/path/store.ts`, and the tests
  `lib/path/progress.test.ts` and `lib/path/store.test.ts`

**Interfaces:**
- **`events.ts`:**
  - `type PathEvent = { id: string; kind: "scene_started"|"take_done"|"scene_done"|"finale_done"; course_id: string; ref: string; payload: Record<string, unknown>; client_ts: string }`.
  - `makeEvent(kind, courseId, ref, payload, now = new Date(), id = crypto.randomUUID()): PathEvent`.
- **`progress.ts`:**
  - `type SceneState = { status: "started"|"done"; bestScore: number|null; attempts: number; firstDoneAt: string|null }`.
  - `type FinaleState = { bestScore: number; passed: boolean; attempts: number }`.
  - `type PathState = { v: 1; scenes: Record<string, SceneState>; finales: Record<string, FinaleState>; seen: string[] }`.
    `seen` holds applied event ids, which makes the reducer idempotent.
  - `emptyState()`.
  - `sceneKey(courseId, sceneId)` and `finaleKey(courseId, episodeId)`, both formatted as
    `"<course>/<id>"`.
  - `applyEvent(state, ev): PathState`: pure. It mirrors the SQL merge rules and ignores ids
    already in `seen`.
  - `episodeProgress(course, episode, state): { done: number; total: number; pct: number; finalePassed: boolean }`.
  - `sceneStatus(course, episode, sceneIndex, state): "locked"|"open"|"done"`.
    Scene 0 is always open. Scene n opens when scene n−1 is done or the Finale has passed.
  - `nextUp(course, state): { episodeId: string; sceneId: string | null } | null`.
    This is the first episode not fully done, and its first scene not done; `sceneId` is null
    when only the Finale remains.
  - `testOutEvents(course, episode, state, score, now): PathEvent[]`: one `scene_done` per
    scene not yet done, with the Finale's score.
- **`store.ts`:**
  - `createStore(storage: Pick<Storage,"getItem"|"setItem"> | null, key = "funlingo-path-v1")`
    returns `{ getState(): PathState; getOutbox(): PathEvent[]; record(evs: PathEvent[]): void; subscribe(fn): () => void; reset(): void }`.
  - It persists `{ state, outbox }`. The outbox is capped at 2000 events, dropping the oldest
    `take_done` first.
  - Bad or old-version JSON leads to `emptyState()`.
  - Any storage error is swallowed and the store stays in memory.
- **The rule mirrored from SQL:** `scene_done` sets status `done`,
  `bestScore = max(prev, score)`, `attempts + 1` and `firstDoneAt = min(prev, ts)`.
  `scene_started` creates only.

- [ ] **Step 1: Write failing tests.**
  - **Reducer:** the 60/90/70 case gives best 90 and attempts 3. A late `scene_started` doesn't
    downgrade `done`. Re-applying the same event is a no-op. A guest event with an earlier
    timestamp sets `firstDoneAt`.
  - **Finale:** 74 doesn't pass and 75 does. `testOutEvents` covers only scenes not yet done.
  - **Derived values:**
    - `episodeProgress` ignores keys for scenes that no longer exist in the content.
    - `sceneStatus` chain: scene 1 is locked until scene 0 is done, and everything is open after
      the Finale passes.
    - `nextUp` walks across episodes.
  - **Store:**
    - It round-trips through a fake storage.
    - `"{not json"` gives an empty state.
    - A `{v: 0}` payload gives an empty state.
    - A `setItem` that throws still updates memory.
    - The 2001st event drops the oldest `take_done`.
    - `subscribe` fires on `record`.
- [ ] **Step 2:** Run `npx vitest run lib/path`. Expect FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run `npx vitest run lib/path`. Expect PASS.
- [ ] **Step 5:** Commit: `feat(path): progress reducer, event factory and local store`.

### Task 3: Take logic — quizzes, scoring, shadow matching

**Files:**
- Create: `lib/path/takes.ts`, `lib/path/takes.test.ts`

**Interfaces:**
- **Shared type:** `type ChoiceItem = { prompt: string; answer: string; options: string[] }`.
- **`seededShuffle<T>(items: T[], seed: string): T[]`:** deterministic. Use FNV-1a over the seed
  feeding a mulberry32 PRNG, then Fisher–Yates.
- **`buildGuessItems(course, scene): ChoiceItem[]`:** one item per scene word.
  - The prompt is the target term.
  - The options are the gloss plus up to 3 distinct distractor glosses, from the same scene
    first and then the rest of the course.
  - Shuffled with seed `scene.id + wordId`.
- **`buildListenItems(course, scene): ChoiceItem[]`:** the same as Guess, but the prompt is the
  target term (spoken aloud) and the options are target terms.
- **`scoreTakes(results: (number | null)[]): number`:** the rounded mean of the non-null
  percentages, or 100 when every take was unscored.
- **`normalizeWords(text): string[]`:** lowercase, strip accents (NFD, then remove `\p{M}`),
  strip punctuation, split on whitespace.
- **`matchRatio(expected, heard): number`:** the share of expected words found in heard, 0..1.
- **`SHADOW_MATCH_OK = 0.6`.**

- [ ] **Step 1: Write failing tests.**
  - **Shuffle:** the same seed gives the same order; a different seed gives a different order
    on a 10-item list.
  - **Guess:**
    - one item per word
    - options include the answer exactly once, with no duplicate options
    - at most 4 options
    - a scene with 1 word still gets distractors from other scenes
  - **Listen:** the options are target terms.
  - **`scoreTakes`:** `[50, null, 100]` gives 75, and `[null]` gives 100.
  - **`matchRatio`:**
    - `("¿Dónde está el baño?", "donde esta el bano")` is 1
    - `("un café, por favor", "un café")` is 0.5
    - `("", "x")` is 0
- [ ] **Step 2:** Run `npx vitest run lib/path`. Expect FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run `npx vitest run lib/path`. Expect PASS.
- [ ] **Step 5:** Commit: `feat(path): take logic — quizzes, scoring, shadow matching`.

### Task 4: Season 1 draft content (English → Spanish)

**Files:**
- Create: `content/courses/en-es/course.json`

**What it contains:**

- **Course:** `id "en-es"`, `version 1`, and
  `_note: "DRAFT — needs native-speaker review before indexing"`.
- **Season 1 (A1)** has can-do statements and 4 episodes, each with 3 scenes and a 5-question
  Finale:
  1. `hola`: greetings and introductions
  2. `cafe`: ordering, prices, paying
  3. `donde`: asking the way and the metro
  4. `compras`: shopping, sizes, colours, checkout
- **Each scene:**
  - a coherent dialogue cold open of 4–6 lines in neutral Latin-American Spanish, with English
    lines
  - 4–6 words or phrases, with English glosses
  - takes: `watch`, `wordlab`, `guess`, `listen`, `shadow`
  - one scene per episode adds `pattern` with a short tip

- [ ] **Step 1:** Run `npx vitest run lib/path`. The "accepts content/courses/en-es" case must
  PASS. The catalog-glob test from Task 3 of Phase 0 validates it.
- [ ] **Step 2:** Commit: `content(path): draft Season 1 for English → Spanish`.

### Task 5: `/learn` UI — course map, episode path, scene runner, finale

**Files:**
- Create:
  - `app/_components/speak.ts`
  - `app/learn/page.tsx`
  - `app/learn/[course]/page.tsx`
  - `app/learn/[course]/[episode]/page.tsx`
  - `app/learn/[course]/[episode]/[scene]/page.tsx`
  - `app/learn/[course]/[episode]/finale/page.tsx`
  - `app/learn/_components/{usePath.ts, LearnShell.tsx, CourseMap.tsx, EpisodePath.tsx, SceneRunner.tsx, FinaleRunner.tsx, ProgressRing.tsx}`
  - `app/learn/_components/takes/{WatchTake,WordLabTake,ChoiceTake,PatternTake,ShadowTake}.tsx`
- Modify:
  - `sections/home/GuessGame.tsx`: import `speak` from `app/_components/speak.ts` (moved, not
    rewritten)
  - `app/_components/track.ts`: no change, but use it for `path_scene_start`,
    `path_scene_done`, `path_finale_done`

**Interfaces:**
- Consumes: Tasks 1–3.
- **`speak(text: string, bcp: string, dir = "/audio/game"): void`:** moved verbatim from
  GuessGame. It tries `<dir>/<audioKey>.mp3`, then falls back to speech synthesis.
- **`usePath()`:** `useSyncExternalStore` over one module-level
  `createStore(window.localStorage)`. The server snapshot is `emptyState()`. It returns
  `{ state, record }`.
- **Pages:**
  - Each page is a server component.
  - `generateStaticParams` comes from `loadCourses()`.
  - Each page passes the course (or episode, or scene) to a client component and sets
    `robots: { index: false, follow: false }` in its metadata.
- **Scene runner:**
  - A segmented progress bar has one segment per take.
  - Recording: `scene_started` on mount, `take_done` per take, `scene_done` with `scoreTakes`
    and `content_version` at the end.
  - The end card shows "Scene complete", the score for scored takes, and a "Next scene" or
    "Finale" button.
- **Finale runner:**
  - Each question gets an answer.
  - Score is `round(correct / total * 100)`, recorded as `finale_done`.
  - On a pass, it also records `testOutEvents`.
  - The result card says "Passed — episode complete" or "Almost — review the scenes and try
    again". No guilt copy.

- [ ] **Step 1:** Load the frontend-design skill and design within the tokens above. The look
  follows the TV metaphor:
  - the course page is a season header plus episode cards, like a streaming "episodes" list
    with a progress bar under each
  - the episode page is a vertical scene timeline ending in a Finale node
- [ ] **Step 2:** Implement the pages and components.
- [ ] **Step 3:** Run `npm test`, `npx tsc --noEmit` and `npm run build`; expect all to succeed.
  Then check that `out/learn/en-es/hola/hola-1.html` (or the equivalent) exists.
- [ ] **Step 4:** Check by hand in the browser pane at desktop and 375px, in light and dark:
  - finish one scene, reload, and see progress kept
  - take the Finale and pass, and see the episode at 100%
  - break `localStorage` in the JS console (`localStorage.setItem("funlingo-path-v1","{x")`),
    reload, and see no crash
  - check the home GuessGame still plays audio
- [ ] **Step 5:** Commit: `feat(learn): guest learning path — course map, episodes, scene runner, finale`.
