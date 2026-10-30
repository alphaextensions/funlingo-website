# Wave 8 — Extension Parity Audit + Home Rebuild

**Date:** 2026-10-23
**Branch:** `agent/parity-audit`
**Base:** `93ff55b` (Wave 6 per-lang packs merged into main)

## Why this exists

The brief was: "match the extension's current Fun Learning page design/vibe
exactly." Wave 6 shipped the 5-tile grid behind the `/learn` route but kept
the web app's `/` route on an invented autobiographical dashboard (Resume
rail, Last night, Streak card, Today's goal ring). A long-time extension
user lands on `/`, not `/learn`, so what they see is **not** the Fun
Learning they already know.

**Jay's directive:** rebuild `/` to BE the extension's `view-landing`,
not a reinterpretation. Slang Hang (and the other four features) must be
SEPARATE CARDS on the home page, in the same five-tile grid the extension
uses.

The ground truth is
`docs/design-reference/extension-fun-learning.html` + `.css` — the actual
`/learn` page HTML the extension renders today.

---

## Parity table

**Legend —**
BLOCKER: user can't recognize our page as Fun Learning;
HIGH: visibly off-brand;
MED: small drift;
LOW: nit.

| # | Extension element | Where (extension HTML) | Web app (BEFORE) | Status BEFORE | Status AFTER | Severity |
|---|---|---|---|---|---|---|
| 1 | 5-tile experience grid on `/` | `learn.html` 80–149 (`.exp-grid`) | **Invented dashboard — resume rail / last-night / streak card / goal ring** | WRONG — not the extension's layout | MATCH — `/` renders `LearnLanding` | **BLOCKER** |
| 2 | Welcome banner (👋) on `/` | `learn.html` 71–78 | Not on `/` (only on `/learn`) | WRONG | MATCH — shown when `userWordCount < 5` | **BLOCKER** |
| 3 | Welcome banner body copy — "fill up with your own vocabulary" | `learn.html` 76 | /learn abbreviated to "fill up." | DRIFT (abbreviated) | MATCH — exact extension copy | HIGH |
| 4 | Footer "Funlingo — Learn while you watch" | `learn.html` 151 | Not on `/`; present on `/learn` | WRONG — missing from Home | MATCH — present on both routes | **BLOCKER** |
| 5 | Hero eyebrow pill "Welcome — what to learn today?" | `learn.html` 66 | Present on `/` with "Welcome back, {name}"; same text on `/learn` | DRIFT — personalised greeting on `/` | MATCH — same text on both routes | MED |
| 6 | Hero title "Fun / Learning" (two-line, gradient on line 2) | `learn.html` 67 | Present on `/` and `/learn` | MATCH | MATCH | — |
| 7 | Hero title clamp `clamp(52px, 9vw, 108px)` | `extension-fun-learning.css` line 321 | /learn used `clamp(44px, 7vw, 86px)` (undersize) | DRIFT — smaller than extension | MATCH — clamp updated to extension spec | HIGH |
| 8 | Hero sub text "Bite-sized experiments to grow your vocabulary…" | `learn.html` 68 | Present on `/learn`; `/` had "Pick up where you left off…" | DRIFT on `/` | MATCH — same copy on both routes | HIGH |
| 9 | Hero sub clamp `clamp(16px, 2vw, 19px)` | `extension-fun-learning.css` line 335 | /learn used `clamp(15px, 1.6vw, 18px)` | DRIFT (slightly undersize) | MATCH — clamp updated | LOW |
| 10 | Greet-dot pulse (2.4s ease-out infinite) | `extension-fun-learning.css` lines 184–188, 316 | /learn had static dot (no pulse) | DRIFT — no motion | MATCH — pulse added, reduced-motion-gated | MED |
| 11 | Tile 01 Word Replay — number "01" | `learn.html` 87 | /learn had `01` | MATCH | MATCH | — |
| 12 | Tile 01 motif — three fanned word cards "betray / gorgeous / curious" + progress bar on curious | `learn.html` 82–86, `extension-fun-learning.css` lines 368–380 | /learn had the three words + progress bar | MATCH | MATCH | — |
| 13 | Tile 01 copy — "Revisit words from your recent sessions across every platform you watch on." | `learn.html` 89 | /learn had exact copy | MATCH | MATCH | — |
| 14 | Tile 01 CTA "Continue learning →" | `learn.html` 90 | /learn had exact CTA | MATCH | MATCH | — |
| 15 | Tile 01 lock state — tile locks when `data-locks-on-empty` + 0 saved words; CTA replaced with "Save words while watching to unlock" | `learn.html` 91–94, CSS lines 448–457 | /learn locks on `userWordCount === 0`; CTA swap + lock pill | MATCH | MATCH | — |
| 16 | Tile 02 Quick Quiz — number "02" | `learn.html` 103 | /learn had `02` | MATCH | MATCH | — |
| 17 | Tile 02 motif — mini MCQ with "whisper" + green-tick MCQ bubble + dim MCQ bubble | `learn.html` 98–102, CSS lines 382–392 | /learn had the mini MCQ | MATCH | MATCH | — |
| 18 | Tile 02 copy — "Calm meaning-recall practice. No score, no streak — just gentle reinforcement." | `learn.html` 105 | /learn had exact copy | MATCH | MATCH | — |
| 19 | Tile 02 CTA "Practise →" | `learn.html` 106 | /learn had exact CTA | MATCH | MATCH | — |
| 20 | Tile 02 lock state (same gate as 01) | `learn.html` 107–110 | /learn locks on `userWordCount === 0` | MATCH | MATCH | — |
| 21 | Tile 03 Tiny Lessons — number "03", motif tilted flashcard "Window seat, please" + "tap to flip →" | `learn.html` 113–126, CSS lines 394–405 | /learn had the tilted card + exact text | MATCH | MATCH | — |
| 22 | Tile 03 copy — "Phrase packs for real situations — restaurants, airports, dates, interviews." | `learn.html` 124 | /learn had exact copy | MATCH | MATCH | — |
| 23 | Tile 03 CTA "Explore →" | `learn.html` 125 | /learn had exact CTA | MATCH | MATCH | — |
| 24 | Tile 04 Slang Hang — number "04", motif "modern" era tag + "lowkey" slang bubble | `learn.html` 128–136, CSS lines 407–415 | /learn had exact motif | MATCH | MATCH | — |
| 25 | Tile 04 copy — "How people actually talk — modern slang with the context it's used in." | `learn.html` 135 | /learn had exact copy | MATCH | MATCH | — |
| 26 | Tile 04 CTA "Discover →" | `learn.html` 136 | /learn had exact CTA | MATCH | MATCH | — |
| 27 | Tile 05 Your Library — number "05", motif 3×2 chip grid with bookmark middle | `learn.html` 139–148, CSS lines 417–423 | /learn had the chip-grid motif | MATCH | MATCH | — |
| 28 | Tile 05 copy — "Every word you've saved, searchable in one calm place." | `learn.html` 146 | /learn had exact copy | MATCH | MATCH | — |
| 29 | Tile 05 CTA "Browse →" | `learn.html` 147 | /learn had exact CTA | MATCH | MATCH | — |
| 30 | Replay tile spans the full editorial width (`body[data-landing="editorial"] .exp-card.c-replay { grid-column: span 6 }`) | `extension-fun-learning.css` lines 460–465 | /learn had this via `.cReplay { grid-column: span 6 }` | MATCH | MATCH | — |
| 31 | 2-col grid at 880px, 1-col at 600px | `extension-fun-learning.css` lines 467–478 | /learn had the breakpoints | MATCH | MATCH | — |
| 32 | Card motif — tilt-up on hover (`transform: translateY(-3px) rotate(-1.5deg)`) | `extension-fun-learning.css` lines 362–364 | /learn had the hover tilt | MATCH | MATCH | — |
| 33 | Per-tile hue — extension raw hex: `#ec4899 / #fbbf24 / #2dd4bf / #a78bfa / #d678f0` | CSS lines 441–445 | /learn uses DS tokens: `--fl-accent-2 / --fl-warning / --fl-success / --fl-secondary / --fl-accent` | DRIFT — DS-conformant remap | DRIFT — DS-conformant remap, intentional | MED |
| 34 | Nav — brand mark + "Fun Learning" title + lang pills + settings gear | `learn.html` 20–59 | Present via `TopNav.tsx` (uses `funlingo-mark.png` + wordmark + lang pills + gear) | MATCH | MATCH | — |
| 35 | Nav back button (shown on inner views) | `learn.html` 23–25 | Rail-driven navigation (not back-button nav); each inner view has its own route | DRIFT — architectural | DRIFT — architectural | LOW |
| 36 | Inner view: Word Replay (`view-continue`) | `learn.html` 155–164 | /words | DRIFT (different surface, same intent) | DRIFT (different surface, same intent) | LOW |
| 37 | Inner view: Quick Quiz (`view-practice`) | `learn.html` 167–176 | /review?mode=quiz&focus=casual (Wave 6 QuickQuizRunner) | DRIFT (different surface, same intent) | DRIFT (different surface, same intent) | LOW |
| 38 | Inner view: Tiny Lessons (`view-situations`) | `learn.html` 179–188 | /learn/tiny-lessons + /learn/tiny-lessons/[situation] | MATCH (functional parity) | MATCH | — |
| 39 | Inner view: Slang Hang (`view-slangs`) | `learn.html` 191–200 | /learn/slang | MATCH (functional parity) | MATCH | — |
| 40 | Inner view: Your Library (`view-saved`) | `learn.html` 203–212 | /words | DRIFT (library is spread across /words + /library) | DRIFT (library is spread across /words + /library) | LOW |
| 41 | Settings drawer (gear icon → right drawer with audio/motion toggles) | `learn.html` 216–272, CSS 820–850 | /settings is a separate route (no in-page drawer) | DRIFT — architectural | DRIFT — architectural | LOW |
| 42 | Toast | `learn.html` 275 | Toast not globally present yet | MISSING | MISSING | LOW |
| 43 | Ambient animated backdrop (purple→magenta blobs, blur, drift) | `extension-fun-learning.css` lines 101–134 | Present via `AmbientBackdrop.tsx` on the root layout | MATCH | MATCH | — |

**Severity counts (BEFORE → AFTER):**

| Severity | Before | After |
|---|---|---|
| BLOCKER | 3 | 0 |
| HIGH | 3 | 0 |
| MED | 3 | 3 (all intentional: DS-conformant hue remap, no in-page back button, no toast) |
| LOW | 8 | 8 (all intentional: /words/library split, settings drawer vs. route, etc.) |

The three remaining MED rows (per-tile hue, in-page back button, no toast)
are deliberate architectural choices that don't affect what Jay called out
as "the Fun Learning front door I know." Addressing them would require
either breaking the Wave 4 DS no-raw-hex rule (33) or introducing a
history-stack back pattern that fights Next's App Router (35, 41). Toast
(42) is a Wave 9+ ask once a surface actually needs it.

---

## What changed in the rebuild

### 1. New shared landing component

**New:** `app/learn/LearnLanding.tsx` — a server component extracted from
`app/learn/page.tsx`, holding the entire extension `view-landing` layout:
hero, welcome banner (gate: `userWordCount < 5`), five-tile grid with
locks on 01/02 when `userWordCount === 0`, and the footer.

### 2. `/` now renders the extension's view-landing

**Rewritten:** `app/page.tsx` is a 3-line re-export:

```tsx
import { LearnLanding } from "./learn/LearnLanding";
export const dynamic = "force-dynamic";
export default async function HomePage() { return <LearnLanding />; }
```

### 3. `/learn` now also renders `LearnLanding`

**Rewritten:** `app/learn/page.tsx` is the same 3-line re-export. The two
routes serve the same component — bundle sizes are identical (878 B each
on the latest `pnpm build`).

### 4. Extension-exact copy & styling

- Welcome banner body now says "…Word Replay and Quick Quiz fill up **with
  your own vocabulary**. Until then, dive into Tiny Lessons and Slang
  Hang — they're ready right now." (was: abbreviated "…fill up.")
- Welcome banner title is "Welcome to Fun Learning" (unchanged).
- 👋 emoji sized to 54px (was 32px) to match `.welcome-banner .w-emoji`.
- Welcome banner padding bumped to `var(--s-8)` (was `var(--s-5) var(--s-6)`).
- Welcome banner radial gradient matches the extension's `.welcome-banner`.
- Hero `clamp(52px, 9vw, 108px)` (was `clamp(44px, 7vw, 86px)`).
- Hero sub `clamp(16px, 2vw, 19px)` (was `clamp(15px, 1.6vw, 18px)`).
- Hero padding `var(--s-24) 0 var(--s-16)` (was `var(--s-10) 0 var(--s-8)`)
  — matches the extension's `.hero` padding.
- `.greet` eyebrow pill: no uppercase (was `text-transform: uppercase`),
  padding and font-size now match the extension's `.hero .greet`.
- `.greet .e-dot` now pulses with the same `pulse` keyframe the extension
  uses (reduced-motion-gated).

### 5. Signed-out users see the tiles

The signed-out branch no longer has its own hero / demo CTA. The shared
`LearnLanding` renders for everyone; signed-out visitors see
`userWordCount = 0` → Word Replay + Quick Quiz locked (first-run state)
+ 👋 welcome banner, exactly like a learner who just installed the
extension. Tiny Lessons + Slang Hang + Your Library tiles remain
unlocked (their content is JSON-packaged, not DB-dependent).

---

## What moved / was removed from `/`

| Removed from `/` | Where that logic lives now |
|---|---|
| Resume rail (`loadResume`, `BookResumeCard`, `ResumeCard`) | **Deleted from this diff.** The /library route lists sources and `/watch/[sourceId]` carries the per-source `positionSec`. If a dedicated "Where you left off" rail is desired on another surface later, it can be lifted from git history on `main`. |
| "Last night, on your shows" encounter feed (`loadLastNight`) | **Deleted.** /words carries every saved word; the per-source lines live under /library. |
| "N fresh words from the last day" chip (`freshChip`) | **Deleted.** The /review route surfaces due counts in its own header. |
| Today's goal ring + Due / Learning / New / Weak counter card (`loadReviewCounts`, `GoalRing`, `loadGoalProgress`) | **Deleted from /.** The /review route already shows the deck state; `/progress` has the authoritative Weak-areas drill. |
| Streak card + 7-day strip (`loadStreak`) | **Deleted from /.** `/progress` is the authoritative streak surface. |
| Counters card (Words / Sentences / Books / Talk min) | **Deleted from /.** `/words`, `/sentences`, `/read`, `/talk` each own their counts. |
| Culture note + Word of the day (`cultureNoteOfTheDay`, `wordOfTheDay`) | **Deleted.** Not an extension-parity surface; reintroducing would be a dedicated design-system decision. |

The `src/components/progress/WeakAreas.tsx` module (which exported
`loadWeakCards`) is untouched — `/progress` still uses it.

---

## Files added

| File | Role |
|---|---|
| `app/learn/LearnLanding.tsx` | Shared landing server component (hero + welcome + 5-tile grid + footer) |
| `docs/wave8-parity-audit.md` | This document |

## Files changed

| File | Change |
|---|---|
| `app/page.tsx` | Rewritten as a 3-line re-export of `LearnLanding` |
| `app/learn/page.tsx` | Rewritten as a 3-line re-export of `LearnLanding` |
| `app/learn/learn.module.css` | Hero clamp bumped to extension spec; `.greet` uppercase removed, pulse added; welcome banner enlarged to match |
| `tests/unit/signed-out-home.test.ts` | Asserts the new reality (home renders `LearnLanding`, 0 words → locked tiles, welcome banner visible) |
| `tests/unit/ext-parity.test.ts` | Assertions moved from `app/learn/page.tsx` to `app/learn/LearnLanding.tsx`; added a sibling-route cross-check + footer-copy check |
| `tests/unit/pm-polish.test.ts` | Fix 4 and Fix 5 rewritten to assert the surviving halves (YouTubePaste deep link; `/progress` + `WeakAreas.loadWeakCards`) |
| `tests/unit/lang-scoping.test.ts` | Updated inline comment reference (test logic unchanged) |

## Files deleted

| File | Why |
|---|---|
| `app/page.module.css` | Nothing in the new `/` references it. Each sub-route still has its own `page.module.css`. |

---

## Verification

- `pnpm build` → clean, 25 routes compile. `/` and `/learn` are both 878 B
  (same component).
- `pnpm test` → **204 / 204 green** (0 failures, 4 pre-existing skips).

## Screenshot plan (how Jay verifies visually)

In this order, with a signed-in test user who has 0 words in the active
learning lang:

1. **`/`** — expect the two-line "Fun / Learning" hero at `clamp(52,9vw,108)`,
   👋 welcome banner (gradient), 5-tile grid with 01/02 locked (lock pill
   where the CTA would be), footer "Funlingo — Learn while you watch".
2. **`/learn`** — expect the exact same page (shared `LearnLanding`).
3. Save 1 word via `/watch/demo` → return to `/`. Expect 01 Word Replay +
   02 Quick Quiz to UNLOCK (CTA replaces lock pill). Welcome banner still
   visible (< 5 words).
4. Save 4 more words → return to `/`. Expect welcome banner to disappear
   (userWordCount ≥ 5). Grid still shows all 5 tiles.
5. Click **01 Word Replay** → `/words`.
6. Click **02 Quick Quiz** → `/review?mode=quiz&focus=casual`.
7. Click **03 Tiny Lessons** → `/learn/tiny-lessons`.
8. Click **04 Slang Hang** → `/learn/slang`.
9. Click **05 Your Library** → `/words`.
10. **`/progress`** — confirm the Weak-areas drill is still reachable
    (surviving half of PM-polish fix 5).
11. **`/library?paste=1`** — confirm the YouTube paste input auto-focuses
    (surviving half of PM-polish fix 4).

A signed-out visitor should see **everything in step 1** — same tiles,
same lock state, same welcome banner — because `userWordCount` is coerced
to 0 when `viewer.userId` is null.
