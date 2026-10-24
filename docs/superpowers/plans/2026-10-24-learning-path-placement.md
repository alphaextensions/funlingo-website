# Learning Path Placement Check Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A short placement check at `/learn/<course>/placement`. It asks finale questions episode by episode, marks every episode the learner already knows as done (test-out), and points them at the first episode they don't know.

**Architecture:**

- **Logic:** pure, tested functions in `lib/path/placement.ts`. They build the steps, score them, and turn passed episodes into the same `finale_done` and `scene_done` events the store and Supabase `apply_events` already accept. No new event kind, no schema change.
- **UI:** one client runner in `RunnerFrame`, plus an entry card on the course page and the `/learn` home while the course hasn't been started.

**Tech Stack:** as in Phase 1 (Next static export, React 19, zod, Vitest).

**Spec:** `docs/learning-path/2026-10-24-learning-path-plan.md` §4, "Placement & skipping": "Which season are you?", rising difficulty, ≥85% passes, test-out marks scenes done.

## Global Constraints

- **Pass mark:** `PLACEMENT_PASS_PCT` (85), per episode.
- **Adaptive order:** episodes are asked in course order. The check stops at the first episode not passed.
- **Recording a pass:** `finale_done` with `{ score, answers, via: "placement" }`, plus `testOutEvents` for its unfinished scenes. Episodes whose finale is already passed are skipped; placement never lowers progress.
- **"I don't know"** is always offered and counts as wrong, so guessing doesn't place people too high.
- **No guilt copy.** Failing an episode is just "start here".
- **Reserved episode id:** `placement` (static route segment).

## Review Focus

1. **A learner who already passed some episodes** takes placement. Those episodes are skipped and nothing is downgraded. *Task 1 test.*
2. **A learner who passes every episode.** Expect "Season complete", no crash on a null start point. *Task 1 test plus a manual check.*
3. **An episode finale with a single question** (fewer than `PER_EPISODE`). Expect the step to use what exists. *Task 1 test.*
4. **Reloading mid-check.** Expect it to restart with nothing recorded until the end. *Manual check.*
5. **Answering "I don't know" on everything.** Expect placement at episode 1 with no events. *Task 1 test.*

---

### Task 1: Placement logic

**Files:**
- Create: `lib/path/placement.ts`, `lib/path/placement.test.ts`
- Modify: `lib/path/validate.ts` (reserve episode id `placement`), `lib/path/validate.test.ts`

**Interfaces:**
- `PER_EPISODE = 2`.
- `type PlacementStep = { episodeId: string; questions: Question[] }`.
- `buildPlacement(course): PlacementStep[]`: one step per episode, in course order. Each step is `seededShuffle(finale.questions, episodeId).slice(0, PER_EPISODE)`.
- `scoreStep(step, answers: (number | null)[]): number`: integer percentage, where `null` (don't know) counts as wrong.
- `stepPassed(score) = score >= PLACEMENT_PASS_PCT`.
- `placementEvents(course, state, results: { episodeId: string; score: number; answers: (number | null)[] }[], now): PathEvent[]`: covers only passed results whose finale isn't already passed.

- [ ] **Step 1: Write failing tests.**
  - The steps follow course order, with 2 questions from each episode's own finale, and are deterministic.
  - Scoring: 2/2 is 100, 1/2 is 50, and `[null, null]` is 0.
  - 85 passes and 84 doesn't.
  - Events:
    - Passing ep1 and ep2 gives `finale_done` with `via: "placement"` for both, plus `scene_done` events.
    - Applying them makes `nextUp` the first scene of ep3.
    - An already-passed episode adds nothing.
    - A failed result adds nothing.
  - A one-question finale gives a one-question step.
  - The validator rejects episode id `placement`.
- [ ] **Step 2:** Run `npx vitest run lib/path`. Expect FAIL.
- [ ] **Step 3:** Implement.
- [ ] **Step 4:** Run `npx vitest run lib/path`. Expect PASS.
- [ ] **Step 5:** Commit: `feat(path): placement check logic`.

### Task 2: Placement page and entry points

**Files:**
- Create: `app/learn/[course]/placement/page.tsx`, `app/learn/_components/PlacementRunner.tsx`
- Modify: `app/learn/_components/CourseMap.tsx`, `app/learn/_components/LearnHome.tsx`

**Screens and behaviour:**

- **Intro:** "Find your starting point". It says what will happen, offers Start, and links "I'm new to <language>" to episode 1.
- **Questions:** the label reads "Episode n, question k". There's a "Not sure" button, and the answer is revealed as in the finale.
- **After each step:**
  - On a pass, continue to the next episode.
  - On a fail, or after the last step, record the events for all passed steps in one batch and show the result.
- **Result:**
  - "Episodes 1–k are marked done. Start with episode k+1: <title>", with a button to that episode.
  - If every episode passed: "You placed out of the whole season", with a button to the season.
  - If none passed: "Start with episode 1".
- **Analytics:** `track("path_placement_done", { course, passed: k })`.
- **Entry points:**
  - On the course page, a card under the header ("Know some <language> already? Find your starting point") while no scene is done.
  - On `/learn`, a secondary link on the course card while the course hasn't been started.

- [ ] **Step 1:** Implement the page, the runner and the entry points.
- [ ] **Step 2:** Run `npm test`, `npx tsc --noEmit` and `npm run build`; expect all to succeed and `out/learn/en-es/placement.html` to exist.
- [ ] **Step 3:** Check in the browser:
  - all "Not sure" places you at episode 1 and records nothing
  - passing episodes 1–2 and failing 3 marks 1–2 complete and points to 3
  - the entry card disappears once progress exists
  - 375px in dark mode
- [ ] **Step 4:** Commit: `feat(learn): placement check page`.
