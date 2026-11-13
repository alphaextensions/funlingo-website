# Funlingo Hub — Pre-Build Review

**Reviewer panel:** 4 parallel agents (PM, UX, Engineering/QA, Competitive Validator against competitor-watch DB)
**Reviewed:** CLAUDE.md, SPEC.md, DESIGN.md, LEGAL.md, TRANCY-REFERENCE.md, design-system/*
**Date:** 2026-10-15

---

## The one line

**The spec is good but 2–3× too big, aims the positioning at the wrong competitor, and ships a destination without the bridge from the 500K extension users. Cut, re-aim, and build the bridge first.**

---

## Three findings all four agents independently converged on

### 1. The spec is OVER-SCOPED (all four flagged this)

Features with zero evidence of demand in the real competitor-complaint DB:
- **Reader** (Classics, Graded readers, EPUB upload) — not a single user review across LR/Trancy/IT asks for it
- **Show Packs** — same
- **Cultural Context Engine** (branded "culture notes") — same
- **AI corrections in Talk** — light interest only
- **Podcasts** — transcript legality unresolved AND no demand surfaced

Features valuable but expensive relative to the migration story:
- **Talk (§7)** — ~500 authored lessons + voice I/O + pronunciation scoring. Different audience from "study my shows." Highest per-minute AI cost. Trancy fixing it is a 1-week closable gap.
- **8-item rail IA** — UX agent says Words + Sentences are the same noun ("merge into `/saved`"); Progress is admin not a destination (fold into Home)

### 2. The handoff from the Extension doesn't exist (PM + UX + Validator)

The Hub thesis is "the 500K extension users come here to review." But:
- SPEC §15 lists extension sync as an **open decision**
- No in-extension nudge, no toast, no popup badge, no weekly email that drives a watcher back to the Hub
- UX agent's "one missing emotional moment" is literally this: *"the first time a word a learner saved on Netflix comes up for review in the Hub — with the paused frame thumbnail and the exact line"*

Without this, Hub traffic is organic SEO traffic, not the 500K base. **You'd be launching a bridge with no bridge.**

### 3. The positioning is aimed at the wrong competitor (Validator — unique find)

Spec frames the pitch around "beating Trancy." But the real pricing-complaint volume in 2,000+ scraped reviews:
- **Language Reactor: 59 paywall complaints**
- **Immersive Translate: 45**
- **Trancy: 5**

Trancy is NOT the pricing villain. **LR is.** Top three paywall gates users resent (verbatim):
1. *"the free version is too limited… if we could save 100 words at least for free"* (LR, ★3)
2. *"only 15 translations per month"* on LR Premium at $40/yr (LR, ★3)
3. *"we pay exact amount then why should hide two subtitles after one year"* (LR, 2026-07-13, ★1)

**Reframe:** "Everything LR *and* Trancy charges for — free." The LR migration is 10× bigger than the Trancy one.

Also: the spec says "natural idiom-aware translations is our most visible advantage." It's real but *secondary*. The louder complaint is **reliability** (translation latency, platform-specific breakage). Validator found 10+ LR Netflix outage complaints vs. 2 translation-quality complaints over the same window.

---

## Decisions Jay must make BEFORE a single line of code

| # | Decision | Why it blocks |
|---|---|---|
| 1 | **How does the extension hand off to the Hub?** Toast? Popup badge? Email? Deep link into `/review/<word_id>`? | The Hub's entire thesis depends on this. Must spec the in-extension change alongside the Hub, not after. |
| 2 | **What's the trimmed scope?** My rec from the panel: Review + /saved (Words+Sentences merged) + Watch (YouTube-only, Default layout, Natural translation, Culture) + Home + Settings. Defer Talk, Read, Podcasts, Show Packs, extra player modes. | ~70% scope cut makes the "no phases, end-to-end" plan actually shippable in a quarter rather than a year. |
| 3 | **Multi-language scoping on data model.** `UserWord/Sentence/Encounter/ReviewLog/Streak/Activity` currently lack `lang`. A user learning both JP + ES would get mixed cards. | Blocks DB schema. Add a `lang` column everywhere now; schema migration later is painful. |
| 4 | **AI cost ceiling and model** per function (`translateLines`, `wordCard`, `scoreSpeech`, `talkTurn`, `culture`). | Blocks launch of AI module and cost telemetry. "Soft limits only" is unimplementable without numbers. |
| 5 | **Font strategy for non-Latin scripts.** "Poppins only" silently breaks Hindi/Japanese/Korean/Arabic rendering — the pitch-deck screenshots will not match the Hindi UI. | Blocks DESIGN.md and the `--font-ui` token definition. |
| 6 | **Latency SLA for Natural translation.** Current complaint: *"the translation appears only while the speaker is still talking, or even after the speech has finished"* (Trancy ★2). | Blocks the AI module boundary — need a p95 budget to code against. |

---

## What to CUT from v1 (consolidated from PM + Validator)

| Cut | What signal brings it back later |
|---|---|
| **Talk** (§7) | ≥15% of post-onboarding users click an in-player "Talk about this scene" prompt and return within 7 days |
| **Reader** (§8) | ≥25% of Hub WAU who save words from video also open a book within 30 days |
| **Podcasts** (§5.2) | Podcasting 2.0 transcript coverage of top-100 learner-popular shows hits ~50% + transcript legality resolved |
| **Show Packs** (§5.1) | ≥5 users submit "please add my show" feedback OR a shippable pack gets ≥50 saves in week 1 |
| **Cultural Context Engine** as a standalone feature | A/B test: show culture note on 50% of flashcards → 7d retention delta ≥ +15% |
| **Shadow/Dictate/Quiz** extra player modes | Baseline Review feature usage shows demand for more variety |

---

## What to ADD to v1 (missing from the spec)

### From PM review
- **In-extension handoff flow** — spec it alongside the Hub, not after
- **First-class Yomitan/Anki export** — power users evangelise or churn; export must be a feature, not a buried setting

### From Validator (direct from user complaints)
- **Pinyin layer for Chinese** — recurring Trancy request
- **One-click Anki export from saved-word card** — verbatim Funlingo review ask (Apr 2026)
- **Loop/repeat a single subtitle** — 3 separate LR requests
- **Customizable keyboard shortcuts** — LR request (Apr 2026)
- **Purchasing-power-parity pricing** or regional free tier — Immersive IT/BR requests, relevant to Funlingo's Hindi/K-drama audience even if everything stays free (frame as a geo-aware default)
- **Separate subtitle styling for fullscreen vs. windowed**

### From UX
- **"Last night, on your shows"** — Home opens with user's own autobiography, not generic recommendations
- **Autobiographical flashcard back** — scene thumbnail + "You saved this on Netflix 3 days ago"
- **Merged `/saved` tab** replacing Words + Sentences
- **Scripted font stack**: Poppins (Latin) + Noto Sans Devanagari/JP/KR/Arabic/Thai, all weight-matched, self-hosted
- **State+shape pairing** for a11y (not red/green color alone for dictation grading)
- **Icon rail labels** at ≥1200px width with persistent `aria-label`

### From Engineering (free trust-win Trancy has gifted the market)
- **Persistent sign-in by default** (long-lived refresh token)
- **Local-first settings cache** that survives sign-out and auth failures
- **Never block UI on token refresh — degrade silently**

Trancy has had the "keeps logging out every 2-3 days" complaint for 14+ months, publicly, unfixed:
- *"it keep logging out/reset the whole settings by itself for every 2-3 days"* (Trancy, 2025-10-27)
- *"why should I relogin every day?"* (Trancy, 2026-08-07)

Not fixing this on Hub means we inherit the same complaint; fixing it is table stakes.

---

## Engineering must-haves (from QA agent — not optional)

### Top 5 silent failure modes
1. **Caption text leaking via logs/Sentry.** LEGAL forbids persisting captions; nothing says the AI module boundary must mark request/response bodies non-loggable. *Fix:* wrap every AI function input in `Confidential<T>` with a mandatory scrubber middleware; add a greppable canary line test.
2. **FSRS card-ID collision** between `UserWord.id` and `Sentence.id`. *Fix:* composite `(cardType, cardId)` unique everywhere; no polymorphic FK.
3. **AI cost drain.** "Soft limits" undefined → one attacker hits `translateLines` on 10K lines/min = runaway spend. *Fix:* per-function `{perUserDay, perIpHour, maxInputTokens, timeoutMs, model}` block in prompts dir, enforced *before* the model call, plus global monthly circuit breaker + per-user token wallet decremented synchronously.
4. **Caption-index caching trap.** `"In this video ×N"` is tempting to implement with a server-side cache → LEGAL violation. Spec must say "client session only."
5. **Idiom regression gate never runs.** Spec says "test every prompt change" but no CI job, no pass threshold, no blocker. *Fix:* `pnpm regression:idioms` must gate deploys at ≥95% per pair.

### 8 veto-level tests (one per feature) — if any fails, don't launch

1. **Caption privacy:** canary line sent to `translateLines` not in DB/logs/Sentry
2. **Study player:** cached word tap → inline card p95 < 150ms; `In this video ×N` works on every match
3. **Dictation:** case/punctuation ignored, cursor lands on first error, hint diff reveals missing letters only
4. **FSRS:** grading `UserWord#X` leaves `Sentence#X.fsrs` untouched (collision guard)
5. **Idiom regression:** "Same old, same old" / "I've been better" render approved natural phrase per supported pair; CI fails otherwise
6. **No overlay on YouTube iframe:** Playwright asserts zero DOM nodes with non-zero opacity overlap iframe rect in Focus & Cinema modes
7. **Cost cap:** 200 `translateLines` calls in 60s for one user → 429 + friendly copy; next AI call does not fire
8. **Multi-language scoping:** user with EN+JP, active EN → review returns zero JP cards; Streak/Activity counted per `lang`

### Data-model gap that will bite

**Idempotency keys on writes.** Save-word, save-sentence, review-grade, talk-turn — all POSTs retried by TanStack Query / flaky mobile networks. Spec needs `Idempotency-Key` header + `IdempotencyRecord(key, userId, response, createdAt)` table + UNIQUE on `(userId, clientRequestId)`. Without this: duplicated reviews corrupting FSRS state, inflated encounter counts, double-decrement of soft cost limits.

Honorable mention: 7-day delete cascade is unspecified for `UserWord/Sentence/Encounter/TalkSession/Note`.

---

## Build order (recommended by Engineering agent) — 2-week slice to ship first

### Week 1 — de-risk the stack, not the surface area
- **D1:** Next.js + Auth.js (Google + magic link) + Prisma (User, Source, UserWord, Encounter, Sentence, ReviewLog, IdempotencyRecord) + design tokens + dark theme
- **D2:** `src/server/ai/*` with `translateLines` + `wordCard`, including rate-limit fields, per-user cost wallet, logger scrubber, content-filter wrapper, idiom regression harness. **The single hardest piece. Do this before any screens.**
- **D3–4:** YouTube-only study player, Default layout, dual subs, streaming natural translation with viewport window, word tap → inline card
- **D5:** Save word → `UserWord + Encounter`; basic Words list

### Week 2 — close the loop
- **D6–7:** FSRS review (Flashcard + Guess-the-meaning), Home with goal ring + due counts
- **D8:** Talk — one topic, three lessons, Help ladder (exercises the "no-cache + expensive" AI path)
- **D9:** Onboarding, Settings (languages, delete-my-data stub), idiom regression gate wired to CI
- **D10:** Playwright suite for the 8 veto tests + 360px + light-theme + a11y pass

If this ships clean, Phase 2 (Read, Podcasts, Show Packs, extra player modes) is "scaling the pattern" not "inventing it."

---

## The one metric that defines whether Hub was worth it

**Extension-saved-word review rate**: % of words saved in the extension that get a Hub review event within 7 days of save.

- **Day 30:** ≥15%
- **Day 90:** ≥25%
- **Below 10% at day 90:** Hub did not become the review home for extension capture — which was the entire thesis. Shut down or rethink.

Set up telemetry for this metric on day 1 of launch, not later.

---

## Build-or-don't verdict (from the PM agent)

**Build — but at ~20% of this spec.** Review + /saved + lean Watch + Culture notes + Progress. Defer the rest until the metric moves.

PM agent flagged a higher-ROI alternative to consider: *"spend the saved engineering on the extension itself — one new streaming platform or materially better capture UX likely moves retention more than any single Hub screen in this spec."*

Worth a one-day think before committing: is Hub actually the highest-leverage next bet, or is the extension?

---

## Open questions back at you

1. **Scope cut: are you OK with my recommended ~20% v1** (Review + /saved + Watch + Home + Settings), deferring Talk, Read, Podcasts, Show Packs, Shadow/Dictate/Quiz, Discover?
2. **Positioning pivot:** reframe from "beat Trancy" to "beat LR + Trancy, free, actually works" — yes?
3. **Decide the handoff** before code: toast / badge / email / deep link? I can mock the 4 options into a 1-page comparison if useful.
4. **Font strategy:** OK with scripted stack (Poppins + Noto Sans variants, weight-matched)?
5. **Should engineering start on the 2-week slice above now, or wait for a sync-model decision from #1 (my rec: wait — the slice ships useless without the handoff)?**

Answer those 5 and this review becomes an actual build plan.
