# Learning Path Review Deck Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A spaced-repetition review deck at `/learn/<course>/review`. It holds every word from scenes the learner has finished, scheduled with FSRS, works without an account, and shows a "known words" count on the season page.

**Architecture:**

- **Reviews are events.** Each review is a new `word_reviewed` path event with `{ rating, term }`. It goes through the existing store and outbox: the same idempotency, multi-tab safety and Phase 2 upload.
- **Local state:** the reducer appends each review to `state.reviews["<course>/<wordId>"]`.
- **Card state is never stored.** It's replayed from those logs with ts-fsrs, fuzz off so the replay is deterministic. This is spec §7.5: "card state is recomputed from the logs, so there are no conflicting writes."
- **Server:** a new Supabase migration teaches `apply_events` the new kind. It upserts `saved_words` and inserts `review_logs`.

**Tech Stack:** ts-fsrs 5.4.2 (pinned), plus the Phase 1 stack and the Phase 0 SQL harness.

**Spec:** `docs/learning-path/2026-10-24-learning-path-plan.md`
- §4: progress as watch hours and known words; Recap
- §7.4: data model, and "Known words = stability ≥ 21 or known_marked"
- §7.5: merge rules and card state recomputed from logs
- §8 Phase 3

## Global Constraints

- **Words that enter the deck:** words of scenes with status `done` (including test-out), in course order, de-duplicated.
- **Ratings:** FSRS grades 1–4, labelled "Forgot", "Hard", "Got it", "Easy".
- **FSRS settings:** `fsrs({ enable_fuzz: false })` with default parameters.
- **Known:** a word is known when its replayed card has `stability >= 21`.
- **Session:** due reviews first, oldest due first, then new cards. At most `SESSION_MAX = 20` cards, and at most `NEW_PER_SESSION = 10` new ones.
- **Earlier migrations are never edited**, since they may already be pushed. Server changes go in a new migration.
- **Calm copy.** No streaks, and nothing like "you missed N reviews".

## Review Focus

1. **Old saved data without `reviews`:** expect it to load with empty reviews and keep its progress. *Task 2 test.*
2. **The same review event applied twice** (sync retry or two tabs): expect the log to be counted once. *Task 2 test, and a SQL test.*
3. **Logs that arrive out of order** (merge from two devices): expect a replay sorted by time to give the same card either way. *Task 1 test.*
4. **A word whose scene is later removed from content:** expect it to be left out of the deck, with no crash. *Task 1 test.*
5. **Nothing due:** expect a "caught up" screen with the next due time, or "finish a scene first" when the deck is empty. *Manual check in Task 3.*

---

### Task 1: Review logic (`lib/path/review.ts`)

**Interfaces:**
- `type ReviewLog = { id: string; rating: 1|2|3|4; at: string }`
- `KNOWN_STABILITY_DAYS = 21`, `SESSION_MAX = 20`, `NEW_PER_SESSION = 10`
- `deckWordIds(course, state): string[]`
- `cardFromLogs(logs: ReviewLog[]): Card | null`: null when there are no logs. It sorts by `at`, then replays `next()` starting from `createEmptyCard(first.at)`.
- `type DeckCard = { wordId: string; card: Card | null; due: Date }`
- `buildSession(course, state, now): DeckCard[]`
- `deckStats(course, state, now): { total: number; due: number; newCount: number; known: number; nextDue: Date | null }`
- `previewIntervals(logs, now): Record<1|2|3|4, Date>`: when each rating would schedule the card next.

**Tests:**
- The deck holds only words from done scenes; words of removed scenes are dropped.
- Replay gives the same result in either log order.
- "Got it" on a new card schedules it later than "Forgot".
- A card counts as known once its stability reaches 21 or more (build the logs by rating Easy repeatedly at each due date).
- Session ordering and both caps.
- `deckStats` counts total, due, new and known, and `nextDue` is the earliest future due date.

**Commit:** `feat(path): FSRS review deck logic`

### Task 2: Review events in the store and in Supabase

**Files:**
- `lib/path/events.ts`: add the kind.
- `lib/path/progress.ts`: `PathState.reviews`; the reducer branch; `emptyState` includes `reviews: {}`.
- `lib/path/store.ts`: old saved data without `reviews` gets `{}`.
- `supabase/migrations/20261025000000_review_events.sql`: `create or replace function apply_events` with the `word_reviewed` kind.

**The new event:** `word_reviewed`, with `ref` set to the word id (≤ 128 characters) and payload `{ rating: 1..4, term: string ≤ 200 }`.

**What `apply_events` does with it:**
1. Validates the rating and the term.
2. Inserts the event, so duplicates are skipped as usual.
3. Upserts `saved_words`, with `lemma` set to the word id, `term` from the payload and source `'path'`.
4. Inserts `review_logs` with `id` set to the event id, the rating, and `reviewed_at` set to the clamped `client_ts`.

**Tests:**
- Reducer: logs append, a duplicate id counts once, and unknown ratings are ignored.
- Store: an old blob with no `reviews` loads with its scenes kept.
- SQL:
  - two reviews of the same word create one `saved_words` row and two `review_logs` rows
  - re-sending changes nothing
  - a rating of 5 is rejected
  - a missing term is rejected
  - another user can't see the rows

**Commit:** `feat(path,db): review events in the local store and apply_events`

### Task 3: Review page and entry points

**Files:** `app/learn/[course]/review/page.tsx` and `app/learn/_components/ReviewRunner.tsx` (new). Modify `CourseMap.tsx` (review card and known-words meter), `LearnHome.tsx` (a "Review N words" link when any are due) and `SceneRunner.tsx` (the end card says how many words joined the deck).

**Card flow:**
1. The front shows the target term and a speak button; audio plays when the card appears.
2. "Show answer" reveals the gloss, the first scene line that contains the term, and four rating buttons, each with its interval ("in 10 min", "in 3 days").
3. Picking a rating records `word_reviewed` and moves to the next card.

**Done screen:** "All caught up", with "N words known" and "Next review in …". An empty deck shows "Finish a scene to start your deck".

**Reserved id:** add the episode id `review` to `RESERVED_EPISODE_IDS` in the validator, with a test.

**Checks:** `npm test`, `npx tsc --noEmit` and `npm run build` succeed. In the browser:
- finish a scene, and the deck appears
- review all cards, and the caught-up screen shows
- reload, and the reviewed cards are no longer due
- with two tabs open, both keep their logs
- 375px in dark mode

**Commit:** `feat(learn): review deck page`
