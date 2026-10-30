# Wave 12e — PM user-journey audit

**Reviewer:** PM USER-JOURNEY QA AGENT (read-only; no files edited).
**Branch base:** main @ `82ef26b`.
**Mode:** Code-reading + cross-reference against the extension HTML (`docs/design-reference/extension-fun-learning.html`) at `/Users/r/Downloads/Funlingo/apps/fun-learning/docs/design-reference/extension-fun-learning.html`.
**Fresh-learner scenarios walked:** signed-out → signed-in with 0 saved words → signed-in with 10 saved words.

Severity legend: **BLOCKER** / **HIGH** / **MED** / **DELIGHT**.

---

## Journey 1 — Land on `/`

**Code:** `app/page.tsx` → `app/learn/LearnLanding.tsx` (shared with `/learn`).

- **BLOCKER-1 — No sign-in affordance anywhere on the home.**
  `TopNav` renders brand mark + lang pills + a gear → `/settings`. There is NO visible "Sign in" button anywhere on `/`, `/learn`, or the global nav. A signed-out prospect who clicks any save-word, start-talk-session, start-review action will hit a 401 toast with no path to resolve it (`withIdempotency` returns `{error: "UNAUTHENTICATED"}` at `src/server/middleware/idempotency.ts:97`). This leaks across every journey below.

- **BLOCKER-2 — Primary action unclear for a cold prospect.**
  For a brand-new visitor (signed-out, 0 words), the home shows 5 tiles where **the biggest card (Word Replay) is locked** (`cReplay { grid-column: span 6 }` in `app/learn/learn.module.css:179`). The hero sub reads "built from the words you meet while watching" — but the only path to "watching" is `/watch/demo`, which is **not linked from the home at all**. A prospect reads the hero promise, sees the editorial-hero tile locked, and has no "Try the 30-second demo" CTA to make the promise concrete. The only entry into `/watch/demo` lives inside the `/review?mode=quiz` empty state. We lead with locked things rather than the differentiating action.

- **HIGH-3 — Signed-out visitors go through the same code path as signed-in-with-0-words.**
  `LearnLanding` forces `userWordCount = 0` when `viewer.userId` is null (`app/learn/LearnLanding.tsx:220-222`). That means an anonymous prospect sees the welcome banner identical to a signed-in first-run user — but anything they then do will fail server-side with 401. The copy doesn't tell them to sign in first.

- **DELIGHT-A — Two-line "Fun / Learning" hero + gradient on `Learning`** matches the extension's `view-landing` 1:1 (`learn.module.css:25-46`). A long-time extension user recognises the surface immediately.

- **DELIGHT-B — Welcome banner uses the extension's exact copy** ("Two of these grow with you… Until then, dive into Tiny Lessons and Slang Hang — they're ready right now."). Honest about which tiles need data vs. which are open.

**Will I stay? 50/50.** Hero copy carries weight, but the biggest tile is locked and there's no "try it" demo link. A cold visitor is likely to drift to Slang Hang (OK) rather than meet the differentiator (watching + saving).

---

## Journey 2 — Click tile 01 (Word Replay)

**Code:** `LearnLanding.tsx:76-93` (locked state when `userWordCount === 0`) → `/words`.

- **BLOCKER-4 — Locked tile is a dead click.**
  The locked tile renders as `<div role="button" aria-disabled="true" tabIndex={0}>` with **no onClick, no keydown handler, no CTA pointing to `/watch/demo`** (`LearnLanding.tsx:190-201`). The lock copy says "Save words while watching to unlock" but gives the learner no way to start watching. A thoughtful tap on this tile = silent no-op.

- **HIGH-5 — "Word Replay" name promises a replay/listen experience; destination is a plain searchable list.**
  Unlocked, the tile routes to `/words` — a vertical list of saved words with POS badge + state badge + 🔊 (`app/words/page.tsx` + Wave 11 WordsExplorer). The tile's extension-faithful name is "Word Replay" and the extension's `#view-continue` section is a "Words from your recent sessions — bookmarked ones rank first. Tap any word to hear it." play-oriented view. Our destination is just the word bank. Copy-honesty gap: the tile promises replay; the page delivers browse.

- **MED-6 — Lock-tile aria-label repeats "locked" twice.**
  `aria-label="${tile.title} — locked. Save words while watching to unlock."` with `aria-disabled="true"` already covered by screen reader (`LearnLanding.tsx:195`). Minor.

**Will I stay? Mostly no (cold prospect).** The headline tile is a lie-UI: locked + unclickable + unlinked.

---

## Journey 3 — Click tile 03 (Tiny Lessons) → situation → flip phrases

**Code:** `app/learn/tiny-lessons/page.tsx` → `app/learn/tiny-lessons/[situation]/page.tsx` → `PhraseCards.tsx` → `FlashcardDeck.tsx`.

- **HIGH-7 — No end-of-deck summary / "What next?" CTA.**
  `FlashcardDeck.tsx:177-203` renders Prev/Next buttons. On the last card the "Next" button is `disabled`. There is **no end-card** that says "You flipped through 8 phrases — try another situation / save to review / back to Fun Learning". The deck just ends with a greyed-out Next. Compared to the extension's loop pattern, our web stops dead. A prospect who finishes "Restaurant" is left to use the breadcrumb and self-navigate.

- **MED-8 — "Hear the phrase" label on the audio row is nice but there is no "Say it with me" / shadowing CTA like Trancy's.**
  The back face only exposes playback, not practice. Deliberate scope (practice lives in Review), but surfaces no bridge. A learner who flips through 8 phrases has no way to say "I want to drill these later" without manually saving each.

- **MED-9 — Reading flow depends on `speechSynthesis` voice quality.**
  `SlangAudioButton` picks a voice via a scored heuristic (`SlangAudioButton.tsx:51-77`). For Hindi, Arabic, Thai learners on Linux/certain Windows versions, there may be no native voice — the browser falls back to a robotic one. **Needs live verification** per locale.

- **DELIGHT-C — Single-card deck layout (Wave 10) feels real.**
  3D flip + progress bar + counter + "Tap for meaning" hint beats Trancy's grid of mini-cards. The reduced-motion fallback (opacity cross-fade) is thoughtful.

- **DELIGHT-D — Counter suffix "3 / 8 in Restaurant"** is a tiny bit of context that reads like a well-made card deck, not a scraped flashcard list.

**Will I stay? Yes.** Loop feels complete except the stop at the end.

---

## Journey 4 — Click tile 04 (Slang Hang) → flip slang → tap 🔊

**Code:** `app/learn/slang/page.tsx` → `SlangDeck.tsx` → `FlashcardDeck.tsx`.

- **HIGH-10 — Same end-of-deck dead-stop as Tiny Lessons.**
  No "You flipped through N slang — Save to drill / Next pack" CTA. Last card → disabled Next → done.

- **MED-11 — Back face stacks era badge + register badge + meaning + divider + example + audio row + hint.**
  That's six vertical regions in a ~340px-tall card (380px on narrow). `.fcBack` has `overflow: auto` (per Wave 10 playbook note). On a phone-width card, learners may hit a scrollbar inside the flashcard — bad feel. The example sentence (which is intentionally in the LEARNING language) competes with the meaning headline for visual priority. **Needs live verification at 360px width.**

- **MED-12 — "In context" label is in English on a Hindi/Arabic/Japanese learner's deck.**
  `SlangDeck.tsx:55` renders `<span className={fc.lbl}>In context</span>` next to a learning-lang example. A Hindi learner trying to read a Hindi slang example sees an English label leading it. Minor voice-drift from the extension's own locale handling.

- **DELIGHT-E — "Example stays in the learning language on purpose"** — bold, honest editorial decision, straight from the extension's `#view-slangs` copy.

- **Audio quality: needs live verification.** `speechSynthesis` behavior across locales is unknowable from the code.

**Will I stay? Mostly yes.** The deck has personality; the dead-stop at the end is the only thing that pulls me out.

---

## Journey 5 — Click tile 02 (Quick Quiz)

**Code:** `app/review/page.tsx` (mode=quiz branch) → `QuickQuizRunner.tsx`.

- **DELIGHT-F — Copy honesty across every microstate.**
  Prompt: "Pick the matching meaning. Press 1 or 2." Feedback: "Nothing's being logged — no streak impact." Summary: "N of M right. Nothing was logged — this one's just for the vibes." (`QuickQuizRunner.tsx:160-175`). This is a direct answer to the "fake per-word scores" problem — nothing is pretending to be more scientific than it is.

- **HIGH-13 — No skip / "I don't know" button on an unanswered card.**
  `QuickQuizRunner.tsx:195-216` renders only the two options. A learner who truly doesn't recognise the word has to pick a wrong meaning to advance. Trancy at least lets you reveal + move on. Add a muted "Skip →" link.

- **MED-14 — Distractor fallback pool is English-only.**
  `safeFallback` is `["a kind of fruit", "a small boat", "to look at something quickly", …]` (`QuickQuizRunner.tsx:67-75`). When the learner has only one saved word (common for a brand-new sign-up), the distractor comes from this English pool regardless of their native language. A Hindi native with a Spanish deck would see English-only distractors.

- **MED-15 — Empty-state CTA to `/watch/demo` is the ONLY home-grown way into the demo** (`app/review/page.tsx:239`). Great that it exists; bad that it's buried behind a specific empty state.

- **DELIGHT-G — Keyboard shortcuts (1/2 to pick, Enter/Space to advance) + non-color feedback state (correct/wrong data-state)** — passes WCAG non-color rule.

**Will I stay? Yes.** This drill feels calmer and more honest than every competitor.

---

## Journey 6 — Open `/watch/demo` → save a word → return to `/`

**Code:** `app/watch/[sourceId]/page.tsx` → `WatchClient.tsx` → `/api/watch/saveWord`.

- **BLOCKER-16 — `/watch/demo` is dead on arrival for signed-out visitors.**
  The server page falls back to a hard-coded `demo-user` object in memory when `auth()` returns no session (`page.tsx:62-83`), so the UI renders. But every write/AI call hits `withIdempotency` which returns 401 UNAUTHENTICATED (`src/server/middleware/idempotency.ts:96-98`). That means for a logged-out prospect:
    - Translations never populate ("translating 0 / 7 forever", then times out at 15s → shows a Retry button → fails again).
    - Tap a word → WordCard shows loading then an error.
    - Save a word → red toast "Could not save word" with **no sign-in CTA**.
  The entry-point we point every empty-state learner to is unusable without being signed-in first. **This is the single worst user-visible bug.**

- **BLOCKER-17 — Demo source lang is hard-coded `"en"`. If a logged-in learner's `activeLearningLang` is anything else, saving a word on `/watch/demo` fills their EN deck, not their active-lang deck. The home tiles 01/02 (gated on `activeLang`-scoped `userWordCount`) stay locked after a successful save.**
  `page.tsx:143-151` sets `lang: "en"`. `LearnLanding.countUserWords` filters by `(userId, activeLang)` (`LearnLanding.tsx:70`). So a signed-in Spanish learner can do the demo exactly as instructed, see "Added 'break' to Review", go back to `/`, and the Word Replay / Quick Quiz tiles will **still be locked** — because they just saved into EN, not ES. Lie-UI.

- **HIGH-18 — Save toast says "Added to Review — see all →" but the link points to `/words`, not `/review`.**
  `WatchClient.tsx:477-481`. Minor copy/destination mismatch (words bank vs. review session), but the toast promises "Review" and sends you to the word bank.

- **HIGH-19 — Translation-timeout retry button hangs on failure.**
  If AI calls 401 (signed-out) or 429 (rate-limit) or 500 the stream errors; the UI (`WatchClient.tsx:218-231`) exposes a retry per line. But the retry re-fires the same auth path with the same key, which 401s again. No "sign in to translate" affordance; no bulk retry.

- **MED-20 — End-of-video card "Nice run — you saved N words — review them now?" is lovely but it only renders when `saveCount > 0`.** For a learner who merely finished the clip (demo clip ends on its own), there's no "That's it — try a longer video or save something" CTA. The clip just stops.

- **DELIGHT-H — Demo-mode local playback timer** is a thoughtful affordance: no iframe, no third-party dependency, no legal risk, but the full word-tap / WordCard / caption-highlight flow still fires. Great for a self-contained demo (if the auth story were fixed).

**Will the loop close? For signed-out: NO. For signed-in with matching lang: YES. For signed-in with mismatched active-lang: NO.** This single journey hits two blockers.

---

## Journey 7 — Open `/talk/<topic>/<lesson>` → 3 turns → see end-of-scene report

**Code:** `app/talk/[topicSlug]/[lessonSlug]/page.tsx` → `LessonChat.tsx` → `/api/talk/sessions/*`.

- **BLOCKER-21 — Lesson route renders the full chat UI for signed-out visitors.**
  Only `/talk` (index) checks `viewer.userId` and shows an EmptyState. The deep route `/talk/[topicSlug]/[lessonSlug]/page.tsx` has NO signed-out branch — it just renders the LessonChat panel. The Start lesson button fires `/api/talk/sessions` → 401 → `startError` shows a generic "Something went wrong (UNAUTHENTICATED)". No sign-in link. For a learner who deep-links into a scene from a sibling site/promo, the surface claims to work and silently fails.

- **BLOCKER-22 — The AI opener is a hard-coded template that works for no scene.**
  `openerFor(scene, aiRole) = `(${scene}) ${aiRole}: Hi there — what can I do for you?`` (`LessonChat.tsx:337-338`). Every scene — a bakery, a job interview, meeting a stranger — opens with the same "Hi there — what can I do for you?" prefixed by the literal scene string in parentheses and the raw aiRole descriptor. For a bakery scene the opener reads something like `(You are at a Parisian bakery. The baker greets you.) A patient baker who speaks slowly: Hi there — what can I do for you?` — this reads like a developer stub, not a conversation. First impression lost immediately.

- **HIGH-23 — The AI opener prepends scene + role text as if they're part of the AI's words.**
  Same source as blocker-22: those two fields are stage directions, not dialogue, but they render inside the AI's chat bubble. A prospect comparing us to Trancy (which hides stage directions) will mark this as unpolished.

- **HIGH-24 — Session auto-end at turn 10 is silent on failure.**
  `useEffect` auto-fires `endSession()` at `userTurnCount >= MAX_TURNS` (`LessonChat.tsx:299-303`). If the /end call 401s (signed-out) or times out, `report` stays null, the input stays disabled (`disabled={sending || sessionDone}` with `sessionDone = userTurnCount >= 10`), and the learner is stranded in a frozen chat with no error, no retry, no explanation.

- **MED-25 — "Help" button label changes name each level (`Hint` → `Prompt` → …).**
  Fine, but the button carries `aria-label={`Help: …`}` plus visible label — screen reader may double-announce. Not blocking.

- **MED-26 — Correction save-for-drill flow uses a `talkTurnId` that must be the server's id, not an optimistic one; the fallback error "Give the AI a moment to finish — then try again." is good but has no retry affordance below the message.**

- **MED-27 — Mic is browser-dependent (webkitSpeechRecognition only). Firefox + Safari get a one-line error toast with no fallback.**

- **DELIGHT-I — "Turn N of 10" chip + explicit "After 10 turns we'll show what you did well and what to work on"** sets the expectation up front. Non-surprise end.

- **DELIGHT-J — End-of-scene report** (when it actually fires, i.e. signed-in happy path) shows duration · turns, Recap, "What to work on" (corrections as `<del>wrong</del> → <b>right</b>`), and "Three to practise". Reads like a thoughtful kind coach, not a graded test.

- **DELIGHT-K — Save-correction-for-drill ("✎ Save for drill") lifts the AI's correction into the learner's `Sentence` deck.** This cross-feature wiring is a genuine Trancy-beater.

**Will I complete 3 turns + see the report? Signed-in happy path: Yes, and it's good. Signed-out: No — dead at Start.**

---

## Severity roll-up

| Severity | Count | Where |
|---|---|---|
| BLOCKER | 7 | J1 ×2 (sign-in CTA, missing demo link), J2 ×1 (locked tile dead click), J6 ×2 (401 wall + wrong-lang save), J7 ×2 (deep-route signed-out, hard-coded opener) |
| HIGH | 9 | J1 ×1, J2 ×1, J3 ×1, J4 ×1, J5 ×1, J6 ×2, J7 ×2 |
| MED | 10 | J2 ×1, J3 ×2, J4 ×2, J5 ×2, J6 ×1, J7 ×2 |
| DELIGHT | 11 | spread across J1, J3, J4, J5, J6, J7 |

### "Will this ship?" verdict

**Not yet.** The content, copy honesty, and card craft are genuinely best-in-class and already beat Trancy on tone — the deck, Quick Quiz, Talk end-report, and ambient brand all read as premium. But the entry-point auth story is broken end-to-end: a cold prospect lands on `/`, finds no sign-in CTA, clicks a locked tile with no click target, tries the demo and gets silently-failing AI, or deep-links into a Talk lesson and sees stage-directions-as-dialogue. Fix the four auth-wall / wrong-lang / dead-click BLOCKERs (and the Talk opener template) before Jay tests, and this becomes a confident ship.

---

Agent-playbook note (for the next PM/QA pass): the sign-in affordance gap and the demo-source-lang mismatch were not caught in Wave 8–11 QA because every automated test runs with a seeded dev user. Future audits should always walk at least one signed-out journey — the auth wall only shows up there.
