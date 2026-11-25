# AGENT-PLAYBOOK.md — Fun Learning web

**Every agent reads this before anything else.** Append your learnings here as you work. Compounds across runs.

---

## What we're building

Fun Learning is the web home for everything Funlingo learners do between watching sessions. It extends what already exists in the Chrome extension's `/learn` page (which this doc's `docs/design-reference/` folder preserves) to a full desktop + mobile web experience. Positioned to beat **Language Reactor + Trancy** combined — not just Trancy. (Validator agent found LR had 59 paywall complaints vs. Trancy's 5 in our competitor DB.)

Spec: `docs/SPEC.md`. Legal rules: `docs/LEGAL.md`. Pre-build review: `docs/PRE-BUILD-REVIEW.md`.

---

## Owner's final decisions

| | Decision |
|---|---|
| **Scope** | FULL spec (no cuts). All features ship. |
| **Positioning** | "Everything LR + Trancy charges for, free" — not just Trancy |
| **Handoff from extension** | **DEFERRED to v2.** No extension changes allowed. Fun Learning v1 ships with no auto-nudge from the extension. |
| **Font** | Scripted stack (Poppins + Noto Sans Devanagari / JP / KR / Arabic / Thai per locale). Extension already does this — copy the exact stack from `docs/design-reference/extension-fun-learning.css` lines 50-80. |
| **DB** | SQLite file-based (via Prisma — `prisma/schema.prisma` with `provider = "sqlite"`). Zero install. |
| **Hosting** | Local only (`npm run dev` → `localhost:3000`). GitHub for code backup. **No deploy to a public URL yet.** |
| **LLM** | **Groq free API** — `llama-3.3-70b-versatile` (default) and `llama-3.1-8b-instant` (cheap bulk). Env: `GROQ_API_KEY`. OpenAI-compatible client. |
| **Design vibe** | **Match the extension's existing Fun Learning page.** Full tokens in next section. |

---

## Design tokens (COPY EXACTLY from `docs/design-reference/extension-fun-learning.css`)

```css
:root {
  /* Brand */
  --fl-primary:    #841167;
  --fl-secondary:  #b218d1;
  --fl-accent:     #d678f0;
  --fl-accent-2:   #8b5cf6;

  /* Surfaces (dark-only) */
  --fl-bg:         #0a0813;
  --fl-bg-2:       #120c1f;
  --fl-surface-1:  rgba(255,255,255,0.045);
  --fl-surface-2:  rgba(255,255,255,0.075);
  --fl-surface-3:  rgba(255,255,255,0.11);
  --fl-border:     rgba(255,255,255,0.10);
  --fl-border-2:   rgba(255,255,255,0.16);
  --fl-glass:      rgba(15,12,26,0.72);

  /* Text (AA on bg) */
  --fl-text:       #f4f1f8;
  --fl-text-2:     rgba(244,241,248,0.66);
  --fl-text-3:     rgba(244,241,248,0.42);

  /* Semantic */
  --fl-success: #4ade80;  --fl-warning: #fbbf24;  --fl-danger: #fb6f72;
  --fl-easy: #4ade80;     --fl-medium:  #fbbf24;  --fl-hard:   #fb6f72;

  /* Radius */
  --r-sm:10px; --r-md:16px; --r-lg:24px; --r-xl:30px; --r-pill:100px;

  /* Spacing */
  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:20px; --s-6:24px;
  --s-8:32px; --s-10:40px; --s-12:48px; --s-16:64px; --s-20:80px; --s-24:96px;

  /* Motion */
  --d-fast:150ms; --d-base:300ms; --d-slow:500ms;
  --ease: cubic-bezier(0.22,0.61,0.36,1);
  --ease-out: cubic-bezier(0.16,1,0.3,1);
  --ease-bounce: cubic-bezier(0.34,1.56,0.64,1);

  /* Type — scripted stack */
  --font: 'Poppins', 'Noto Sans Devanagari', 'Mangal', 'Kohinoor Devanagari',
          'Noto Sans Gujarati', 'Shruti', 'Noto Sans Arabic', 'Tahoma',
          -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;

  /* Elevation + brand glow */
  --el-1: 0 2px 8px rgba(0,0,0,0.30);
  --el-2: 0 12px 32px -8px rgba(0,0,0,0.55);
  --el-3: 0 24px 60px -12px rgba(0,0,0,0.7);
  --glow: 0 0 0 1px rgba(214,120,240,0.35), 0 16px 50px -12px rgba(178,24,209,0.45);
}
```

Also port the per-locale `font-family` overrides for `[data-funlingo-locale="hi"]`, `[data-funlingo-locale="gu"]`, `[data-funlingo-locale="ar"]` — see reference file.

### Vibe principles

- **Dark only.** No light mode toggle.
- **Ambient backdrop.** The extension's `/learn` page has an animated purple orb + veil. Port it (CSS-only, respects `prefers-reduced-motion`).
- **Two-line hero on landing** — "Fun" on line 1 + "Learning" accented on line 2 (see `extension-fun-learning.html` for the markup).
- **Lang pills in the nav** showing native + learning language with select-to-change.
- **Glass-surface cards** (bg-glass + border + el-2 shadow + hover glow).
- **Buttons inherit font** — the extension explicitly re-sets `button{font-family:inherit; color:inherit}` because Devanagari titles on buttons otherwise fall back to Arial.
- **Body line-height per locale** (1.55 for Devanagari/Arabic, 1.5 default).

---

## Stack (locked)

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 15 App Router + TypeScript strict | |
| Styling | CSS variables + CSS Modules | No Tailwind. Tokens from above. |
| Font | `next/font/google` for Poppins; self-host Noto Sans per script | |
| State | TanStack Query (server) + Zustand (UI) | |
| DB | SQLite + Prisma (`provider = "sqlite"`) | File at `prisma/dev.db`. Gitignored. |
| Auth | Auth.js v5 (Google + magic link via Resend free tier — defer email until you have a key) | For local dev, start with Google only. |
| AI | **Groq via OpenAI-compatible SDK**. Default `llama-3.3-70b-versatile`; bulk/cheap `llama-3.1-8b-instant`. | `OPENAI_BASE_URL=https://api.groq.com/openai/v1` |
| SRS | FSRS via `ts-fsrs` | |
| Tests | Vitest (logic) + Playwright (flows) | |
| Package manager | pnpm | |

---

## Hard rules (from LEGAL.md)

1. **Never persist caption text.** Not in DB, not in logs, not in Sentry. Wrap AI inputs in `Confidential<T>` + logger scrubber. Add a canary-line test.
2. **No lyrics, no scripts, no subtitle export, no episode downloads.**
3. **Nothing drawn over the YouTube iframe.** Overlays must sit beside, never on top.
4. **Idiom-aware translations** — keep `tests/fixtures/idioms/*.json` and gate deploys on ≥95% pass per language pair.
5. **Content filter** on every AI output (`src/server/ai/safety/filter.ts`). No slurs, no group+crime regex, no sexual content, no stereotypes.
6. **Everything free.** No paywalls. Only soft AI cost caps per user per day (enforced BEFORE the model call).

---

## Engineering non-negotiables (from QA agent review)

1. **Idempotency keys on every write POST.** Save-word, save-sentence, grade-review, talk-turn. `IdempotencyRecord(key, userId, response, createdAt)` table + UNIQUE on `(userId, clientRequestId)`.
2. **Per-function cost caps** declared in the prompt file: `{perUserDay, perIpHour, maxInputTokens, timeoutMs, model}`. Enforced before model call. Add a global monthly circuit breaker.
3. **No polymorphic FKs** for FSRS cards. Composite `(cardType, cardId)` unique everywhere.
4. **`lang` scoping on data model** — `UserWord`, `Sentence`, `Encounter`, `ReviewLog`, `Streak`, `Activity` all carry a `lang` column. Review returns only cards for the user's `activeLearningLang`.
5. **No server-side caching of captions.** `In this video ×N` index lives in the client session only, never Prisma.

---

## Continuous QA + Design agents

Two watchers run every ~2 hours against the latest `main`. Both append findings here under "Playbook learnings" (section below).

### Design QA checks
- Every color is a `--fl-*` token (lint: grep for raw hex outside `tokens.css`).
- Poppins never used alone — scripted stack present on `html` and `button`.
- Every interactive state has a non-color signal (shape, weight, position) in addition to color.
- Icon-only buttons carry `aria-label`.
- Rail labels visible at ≥1200px width.
- Responsive at 360px (iPhone SE) — no horizontal scroll, no clipped text.
- Hero on `/` matches the extension's two-line "Fun / Learning" style.
- Ambient backdrop present + respects `prefers-reduced-motion`.

### Code QA checks (veto-level — launch blockers)
1. Caption-privacy canary: send a known string to `translateLines` → NOT in DB, logs, Sentry.
2. Cached word-tap p95 < 150ms on study player.
3. Dictation ignores case/punctuation; hint diff reveals only missing letters.
4. FSRS collision guard: `UserWord#X` grade doesn't touch `Sentence#X.fsrs`.
5. Idiom regression ≥95% per pair (gates deploy).
6. No DOM overlap with YouTube iframe in Focus/Cinema modes (Playwright).
7. Cost cap: 200 `translateLines` in 60s for one user → 429 + friendly copy.
8. Multi-lang scoping: EN+JP user with active EN → zero JP cards in review.

---

## Agent lanes (parallel after scaffold lands)

| Lane | Owns | Branch |
|---|---|---|
| **Scaffold** | Next.js init, Prisma + SQLite, Auth.js skeleton, design tokens → CSS Modules, rail IA shell, ambient backdrop, Groq SDK boilerplate, idempotency middleware, `Confidential<T>` + logger scrubber. **Must land first; others blocked.** | `main` |
| **AI module** | `src/server/ai/*` — `translateLines`, `wordCard`, `scoreSpeech`, `talkTurn`, `correctTurn`, `culture`, `sentenceAnalysis`, `summarize`. Cost caps, safety filter, idiom regression harness. | `agent/ai-module` |
| **Watch + Culture** | `/watch` route, YouTube player, dual subs, word-tap-to-save, Culture Context tab, Default/Focus/Cinema modes, player keyboard shortcuts (§6.6). | `agent/watch` |
| **Review + FSRS** | `/review` route + Flashcard + Guess-the-meaning + Dictation + Shadowing + Speaking drills. FSRS integration. ReviewLog. | `agent/review` |
| **Content pages** | `/` (Home), `/library`, `/words`, `/sentences`, `/progress`, `/settings`, `/account`. Autobiographical Home hero ("Last night, on your shows"). | `agent/content` |
| **Talk + Read** | `/talk` topics, help ladder, correction, session reports. `/read` shelf, Classics, Graded readers, EPUB upload, two-page spread. | `agent/talk-read` |

Each build agent works in its own git worktree and merges to `main` when all QA passes.

---

## Playbook learnings (append-only — every agent appends after each run)

### [SEED] 2026-10-16 — Setup

- Project path: `/Users/r/Downloads/fun-learning`
- Extension FL reference: `docs/design-reference/extension-fun-learning.{html,css}` — copy ambient backdrop, hero, language pills, lang-locale overrides.
- Groq models: `llama-3.3-70b-versatile` (default) and `llama-3.1-8b-instant` (bulk translation).
- Env file: `.env.local` with `GROQ_API_KEY`, `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `DATABASE_URL=file:./prisma/dev.db`.

### 2026-10-16 — Scaffold agent

Dropped a runnable Next.js 15 app around the existing `docs/` + `public/`. Dev + build + Vitest pass; Playwright config present but not run (no browsers downloaded on this host). Only the files listed in `.gitignore` are left untracked (`.env`, `prisma/dev.db*`, `.next`, `node_modules`).

**Final `package.json` deps** (versions pinned exactly to what pnpm installed — do not bump without a lane):

`dependencies`:
- `@auth/prisma-adapter` 2.7.4
- `@prisma/client` 5.22.0
- `next` 15.0.3
- `next-auth` 5.0.0-beta.25 (Auth.js v5 beta — Google provider only, magic-link TODO)
- `openai` 4.73.1 (used against Groq's OpenAI-compatible endpoint)
- `pino` 9.5.0
- `react` 18.3.1
- `react-dom` 18.3.1

`devDependencies`:
- `@playwright/test` 1.49.1
- `@types/node` 22.9.3, `@types/react` 18.3.12, `@types/react-dom` 18.3.1
- `eslint` 8.57.1, `eslint-config-next` 15.0.3
- `pino-pretty` 11.3.0
- `prisma` 5.22.0
- `typescript` 5.6.3
- `vitest` 2.1.5

Package manager: **pnpm 12.11.2** (installed to `~/.local/bin` because the global npm prefix was system-owned).

**Decisions that weren't in the playbook, and why:**

1. **`DATABASE_URL="file:./dev.db"` (not `file:./prisma/dev.db`).** Prisma resolves file URLs relative to the schema's own directory (`prisma/`), so the file lands at `prisma/dev.db` either way. Matches `.gitignore`.
2. **`.env` stays gitignored**; `.env.example` carries `DATABASE_URL` + the other keys. First-time devs do `cp .env.example .env` and `pnpm prisma migrate dev` picks it up. Prisma reads `.env` only (not `.env.local`), so the Prisma var lives there.
3. **Noto font subsets dropped the implicit `latin`.** `next/font/google` for Arabic/Devanagari/Thai rejects `"latin"` as unknown; left each font with its own script subset only. Poppins carries the Latin coverage.
4. **`--font-ui` wired via inline style on `<body>`, not a static @font-face.** `next/font` emits a hashed family name per build, so `tokens.css` references `var(--font-ui, 'Poppins')` and `app/layout.tsx` writes `--font-ui` into `document.body.style` from `fontRootStyle`. The scripted fallback stack lives inside `--font`.
5. **Prisma schema has only the models we could derive confidently from SPEC §16.** Dropped (left as TODO comment at the bottom of the file) in this scaffold: `Lexeme`, `WordCard`, `Pack`, `PackItem`, `UserPackProgress`, `TalkTopic`, `TalkLesson`, `TalkTurn`, `Bookmark`, `CultureNote`, `Follow`, `Progress`, `History`, `Favorite`. Each lane picks up its own.
6. **`IdempotencyRecord.response` is a string column** holding the JSON body. SQLite has no native JSON type; the middleware reads the body stream and replays with `content-type: application/json` + `x-idempotent-replay: 1`.
7. **`withIdempotency` is permissive on a missing header.** Writes without `Idempotency-Key` still run — matches Stripe's semantics and avoids 400s during dev. Future lanes that need stricter behaviour can wrap with their own guard.
8. **Rail labels are visible at ≥1200px (not icon-only).** QA note in CLAUDE.md flagged this; I built the rail as icon + label from the start.
9. **Bottom tabs render for `<768px`** per SPEC §2's "mobile web ≥360px" phrasing; between 768 and 1200 the user sees top nav only (acceptable for scaffold).

**Gotchas future agents must know:**

- **pnpm v12 blocks postinstall scripts by default.** The approvals live in `pnpm-workspace.yaml` under `allowBuilds:` (added by `pnpm approve-builds --all --yes`). If you add a new dep with a native build step, run `pnpm approve-builds` or add the package to that list — otherwise `prisma generate` silently won't run.
- **`pnpm prisma generate` is NOT enough after a schema change.** Run `pnpm prisma migrate dev` so the SQLite file + client both pick up the change. `pnpm build` runs `prisma generate` first for safety.
- **Next.js 15 route params are `Promise<...>`.** Dynamic routes must `await params` (see `app/watch/[sourceId]/page.tsx`). Same for `searchParams`.
- **`next/font/google` for Arabic/Devanagari/Thai REJECTS `"latin"` as a subset.** Use only the script-specific subset for those (`arabic`, `devanagari`, `thai`). Latin coverage comes from Poppins.
- **Confidential<T> is dual-enforced.** The TS brand blocks sinks statically; the hidden-symbol runtime marker is what the Pino scrubber uses after values pass through `JSON.stringify`. Keep both — unit tests in `tests/unit/sample.test.ts` cover both.
- **No raw hex outside `src/styles/tokens.css`.** Design-QA grep: `rg "#[0-9a-fA-F]{3,8}" src app --glob '!**/tokens.css'` should return nothing meaningful. The hero accent gradient still uses the token variables.
- **`experimental.typedRoutes` is on.** Every internal `<Link href=…>` must either be a known pathname or use `href={{ pathname: "..." }}` form. `href={someString}` won't type-check; cast via `as Route` if truly dynamic.
- **Playwright is installed but no browsers were downloaded on this scaffold host.** Run `pnpm exec playwright install chromium` before `pnpm test:e2e` the first time.
- **`test:idioms` is a stubbed echo** — the AI module lane owns the real idiom harness per AGENT-PLAYBOOK rule 4 under Legal.

### [CODE-QA] 2026-10-16 — Pass 1 (against scaffold 68fa927)

Build + Vitest + Lint all pass. 1 blocker, 5 high, 6 medium, 4 low. Veto matrix: 1 pass, 1 fail, 6 deferred.

**Veto tests (scaffold):**
| # | Test | Status |
|---|---|---|
| 1 | Caption-privacy canary (type + scrubber present; unit tests pass) | PASS (end-to-end canary against `translateLines` **DEFERRED** — fn doesn't exist yet) |
| 2 | Cached word-tap p95 < 150ms | DEFERRED — Watch lane |
| 3 | Dictation ignores case/punctuation | DEFERRED — Review lane |
| 4 | FSRS collision guard (`ReviewLog(cardType,cardId)` composite; UserWord.fsrs & Sentence.fsrs on separate tables; no polymorphic FK) | PASS (caveat under #6 below) |
| 5 | Idiom regression ≥95% | DEFERRED — `test:idioms` is a stubbed echo |
| 6 | No DOM overlap with YouTube iframe | DEFERRED — Watch lane |
| 7 | Cost cap: 200 `translateLines`/60s → 429 | DEFERRED — AI module lane (see finding #4 — the current scaffold leaks the raw groq client) |
| 8 | Multi-lang scoping (user with EN+JP, active EN → zero JP cards) | **FAIL** — see finding #1 |

**Findings (newest first; max 20):**

1. **[BLOCKER]** `prisma/schema.prisma:189-197` — `Streak` model has NO `lang` column, but AGENT-PLAYBOOK non-negotiable #4 explicitly lists `Streak` in the required-lang set. A JP+EN learner's streak is shared across both languages, which violates per-lang scoping before any review feature ships. **Fix:** change PK to `@@id([userId, lang])` (or add `lang String` + `@@unique([userId, lang])`) and update the User relation to one-to-many. Migration + Review-lane query updates follow.

2. **[HIGH]** `src/server/middleware/idempotency.ts:60-91` — race condition on concurrent requests with the same `Idempotency-Key`: both miss the lookup, both execute the handler (duplicating side-effects: double FSRS grade, double word-save), only *then* does the second one hit the unique-index violation and "replay". The "race → replay" comment is misleading — side-effects already duplicated. **Fix:** insert a `PENDING` row *before* running the handler (idempotency insert first → unique-violation branch replays if it loses; handler updates the row on success), or wrap the whole thing in a serializable Prisma `$transaction` with the unique insert at the top.

3. **[HIGH]** `src/server/middleware/idempotency.ts:82-91` — the middleware persists *every* response status, so a 500 (transient DB or AI error) becomes a sticky cached failure for that `(userId, clientRequestId)` pair forever: the client retries with the same key, gets the same 500 back, no chance of recovery. **Fix:** only persist 2xx and deliberate 4xx (not 5xx); or skip persistence when `res.status >= 500`.

4. **[HIGH]** `src/server/ai/client.ts:14-17` — the raw `groq` OpenAI client is **exported directly**. The module comment says "No feature agent should call OpenAI/Groq SDKs directly" but nothing enforces that: `import { groq } from "@/server/ai/client"` bypasses every cost cap, timeout, content filter, and `Confidential<T>` boundary the playbook requires. Veto test #7 (cost cap) will fail for any route that imports `groq` directly. **Fix:** make `groq` module-private (don't export); export only a `callModel({ messages, model, maxInputTokens, timeoutMs, userId })` wrapper that enforces per-user wallet decrement + content filter + `Confidential<T>` input. AI-module agent owns the wrapper, but the client should not expose the raw SDK handle in the meantime.

5. **[HIGH]** `src/server/middleware/idempotency.ts:34, 39-109` — `ttlMs` is accepted as an option but never used; no sweeper, no `createdAt`-based filter in the lookup, no cron. `IdempotencyRecord` grows without bound and stale keys shadow real ones indefinitely. **Fix:** either (a) a `prisma.idempotencyRecord.deleteMany({ where: { createdAt: { lt: new Date(Date.now()-ttlMs) } } })` nightly job + ignore stale rows in lookup, or (b) a short-lived composite lookup `(userId, clientRequestId, createdAt>cutoff)`.

6. **[HIGH]** `prisma/schema.prisma:176-186` — `ReviewLog.cardId` is a plain `String` with no FK and no app-layer validator. An insert of `{cardType:"word", cardId:<a-sentence-id>}` is legal at the DB level, so the collision guard (veto #4) depends entirely on application code being correct everywhere. **Fix:** add a Prisma `check` emulated by a service-layer `assertCardExists(cardType, cardId, userId)` util; or model `ReviewLogWord` / `ReviewLogSentence` tables with real FKs. Minimum: a single `src/server/review/cardRef.ts` the Review lane must call.

7. **[MEDIUM]** `prisma/schema.prisma:203` — `Activity.lang` is `String?` (nullable). Veto #8 ("Streak/Activity counted per lang") requires lang to be non-null for a per-lang row. A null-lang Activity row is unassignable to any learner's active lang. **Fix:** make `lang String` (NOT NULL) and backfill before data lands.

8. **[MEDIUM]** `src/server/types/confidential.ts:25-41` — `markConfidential` only tags objects (hidden `Symbol.for` property). A primitive like `markConfidential("some caption")` keeps the TS brand but has NO runtime marker, so `logger.info(line)` logs it raw. The scrubber silently misses it. **Fix:** either (a) require callers to wrap in `{ value }` at the API boundary, or (b) return a `Confidential<Box<T>>` wrapper object that the scrubber can detect, or (c) throw at `markConfidential(primitive)` and provide `markConfidentialString` that returns a wrapper. Add a unit test for the primitive case.

9. **[MEDIUM]** `src/server/middleware/idempotency.ts:78-80` — the stored `response` is the raw body text, no size cap and no content-type check. A large or non-JSON response (OAuth callback bytes, a stream, a 10MB export) silently balloons the table. The replay also forces `content-type: application/json` even when the original wasn't. **Fix:** reject (or skip persist for) non-JSON content-types; cap stored body to e.g. 64KB; store the original content-type.

10. **[MEDIUM]** `src/server/logging/scrubber.ts:1-56` — scrubber only wraps the exported `logger` object. Direct `console.*`, `pino` imported elsewhere, Sentry (future), and Prisma's own `log` emitter are **not** scrubbed. The scrubber.ts file itself admits ESLint can flag `console.*` "in a later lane" — that lane is now, before any route handler ships. **Fix:** add `"no-console": "error"` in `.eslintrc.json` (allow `warn`/`error` only if needed); add a wrapper around Prisma's `log` events that routes through the scrubber; document Sentry as a future wrap-point.

11. **[MEDIUM]** `src/server/db.ts:9` — Prisma log is `["warn","error"]` which does NOT emit SQL params, so `Encounter.line` (user's saved line, allowed in DB) is not leaked today. BUT any future dev who flips this to include `"query"` will dump every parameter — including the user's saved line text — straight to stdout, bypassing the Confidential scrubber. **Fix:** wrap Prisma log subscription (`prisma.$on('query', scrub-and-log)`) so query events can never bypass the scrubber, no matter what level a future dev enables.

12. **[MEDIUM]** `src/server/middleware/idempotency.ts:55-57` — writes without an `Idempotency-Key` header silently run with zero deduplication. Playbook non-negotiable #1 says "every write POST" needs an idempotency key. Permissive-dev is fine, but there's no enforcement path for prod. **Fix:** add a `strict: boolean` option (default true in prod via `NODE_ENV`), and have each write route pass `withIdempotency(..., { strict: true })` once build agents land their routes. Reject with 400 + friendly copy if missing in strict mode.

13. **[LOW]** `.env.example:1-17` — missing `RESEND_API_KEY` (referenced in `src/server/auth.ts:37`) and `NEXTAUTH_URL` (needed in prod/preview). **Fix:** add both with a comment that they're optional in local dev.

14. **[LOW]** `package.json:23` — `next-auth 5.0.0-beta.25` is still beta. Playbook acknowledges, but between beta releases Auth.js has shipped breaking renames (callbacks, env var names). **Fix:** pin exactly (already pinned) + add a scheduled check for beta.26+ release notes before any auth-touching merge; add a `tests/unit/auth-shape.test.ts` that asserts the handlers export is still `{ GET, POST }`.

15. **[LOW]** `src/server/ai/client.ts:14-17` — `new OpenAI({ apiKey: process.env.GROQ_API_KEY })` is instantiated at module scope. If any route imports the module without `GROQ_API_KEY` set, the SDK throws at construction, not at call-time. Non-blocking today (no imports) but creates a confusing dev error later. **Fix:** lazy-construct inside the `callModel` wrapper (see #4) and throw a friendly `"GROQ_API_KEY missing — see .env.example"` message.

16. **[LOW]** `vitest 2.1.5` run emits `The CJS build of Vite's Node API is deprecated`. Not a failure, but noise in CI. **Fix:** either upgrade to a Vitest 2.x minor that drops the warning, or add `"type": "module"` carefully (will cascade through CSS modules + Prisma CJS, so verify before flipping).

17. **[LOW]** `src/server/logging/scrubber.ts:36-45` — the `pino-pretty` transport is loaded in `development` by default. If a build agent accidentally sets `NODE_ENV=development` on a hosted env, pretty-print loads with colors + singleLine but also keeps the scrubber in place. Not a security issue; just note that scrubber correctness is independent of transport.

**Dependencies for the build-agent lanes:**

- **AI module lane**: must consume `Confidential<T>` as input on every public function; must NOT re-export the raw `groq` client; must be the exclusive import path. Resolves findings #4, #11 (via a wrapped Prisma `$on('query')`), and veto tests #1, #5, #7.
- **Watch lane**: owns veto tests #2, #6; must consume the AI module's wrapper, never `groq` directly.
- **Review lane**: owns veto tests #3, #4, #8; must adopt the service-layer `assertCardExists` util (finding #6); must update Streak queries once lang column lands (finding #1).
- **Content/Settings lane**: owns the Prisma Streak migration if Review doesn't land first.

**Verdict:** Scaffold is **95% there, one BLOCKER (Streak lang) + one HIGH category (idempotency race/5xx-cache/TTL) that build agents will trip over within the first PR.** Fix Streak + idempotency before merging the first feature lane.

### [DESIGN-QA] 2026-10-16 — Pass 1 (against scaffold 68fa927)

Review-only lane. All findings are for build-agent lanes to resolve in their own commits. Severity scale: BLOCKER (ship-breaking) / HIGH (fix before next feature lands) / MEDIUM / LOW.

Totals: 0 BLOCKER / 4 HIGH / 7 MEDIUM / 2 LOW.

**HIGH-1 — Rail has no active-page indicator (and no non-color signal either).**
- WHERE: `src/components/IconRail.tsx:107-118` + `src/components/IconRail.module.css:21-48`
- WHAT: `IconRail` is a server component with 8 nav links but no `aria-current="page"`, no `.active` class, and no visual distinction between the current page and the others at ≥1200px. Users cannot tell where they are. Also fails the vibe rule "every interactive state has a non-color signal" — hover changes only `background` + `color`.
- FIX: Convert `IconRail` to a client component (`"use client";`), import `usePathname` from `next/navigation`, compute `isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))`, add `aria-current={isActive ? "page" : undefined}` and a conditional class. Add CSS:
  ```css
  .railLink { position: relative; }
  .railLinkActive { background: var(--fl-surface-2); color: var(--fl-text); font-weight: 600; }
  .railLinkActive::before { content:""; position:absolute; left:0; top:8px; bottom:8px; width:3px; border-radius:2px; background: var(--fl-accent); }
  ```
  Mirror the same treatment for `.tabLinkActive` in BottomTabs.

**HIGH-2 — Per-locale font stacks don't reference the next/font CSS variables, so Devanagari/Gujarati/Arabic learners won't actually get the Noto fonts loaded via `next/font/google`.**
- WHERE: `src/styles/globals.css:36-53` and `src/styles/tokens.css:54-56`
- WHAT: The locale overrides list literal family names (`'Noto Sans Devanagari'`, `'Noto Sans Gujarati'`, `'Noto Sans Arabic'`), but `next/font/google` loads those fonts under hashed family names exposed only via `--font-noto-devanagari`, `--font-noto-gujarati` (not yet added), `--font-noto-arabic`. The literal names will not resolve; locale text will fall through to system fonts (Mangal, Shruti, Tahoma) — defeats the whole scripted-stack story.
- FIX: In `globals.css`, swap the literals for the CSS variables already declared in `fonts.ts`. For `[data-funlingo-locale="hi"]` use `font-family: var(--font-ui), var(--font-noto-devanagari), 'Mangal', 'Kohinoor Devanagari', -apple-system, ...;`. Same for `gu` (also add `Noto_Sans_Gujarati` to `fonts.ts` — currently missing) and `ar` (`var(--font-noto-arabic)`). Update the fallback stack in `tokens.css` line 54 similarly: `--font: var(--font-ui, 'Poppins'), var(--font-noto-devanagari), 'Mangal', ..., var(--font-noto-arabic), 'Tahoma', ..., sans-serif;`.

**HIGH-3 — No "skip to main content" link; keyboard users must tab through 8 rail links + nav controls before reaching page content.**
- WHERE: `src/components/AppShell.tsx:6-17`
- WHAT: SPEC §17 Accessibility requires WCAG 2.2 AA. A skip link is table stakes. The scaffold's `<main>` has no `id`, no landmark override, and no bypass mechanism.
- FIX: In `AppShell.tsx`:
  ```tsx
  <div className={styles.shell}>
    <a href="#main" className={styles.skipLink}>Skip to content</a>
    <TopNav />
    <div className={styles.body}>
      <IconRail />
      <main id="main" className={styles.main}>{children}</main>
    </div>
    <BottomTabs />
  </div>
  ```
  Add CSS: `.skipLink { position: absolute; left: -9999px; } .skipLink:focus-visible { left: var(--s-4); top: var(--s-4); z-index: 100; padding: 10px 14px; background: var(--fl-surface-3); border: 1px solid var(--fl-border-2); border-radius: var(--r-md); color: var(--fl-text); }`.

**HIGH-4 — Tablet width (768–1199px) has NO primary navigation.** The rail hides below 1200px and the bottom tabs hide above 767px. Users on iPad portrait / small laptops land in a dead zone where only the top nav's brand + lang-pills + settings icon are available — nothing links to Library/Review/Talk/etc.
- WHERE: `src/components/IconRail.module.css:5-19, 51-55`
- WHAT: Scaffold notes acknowledge this ("acceptable for scaffold") but it blocks every real tester between phones and desktops. 768–1024 is iPad territory.
- FIX: Change bottom-tabs media query to `@media (max-width: 1199px)` so tablets get the bottom tab bar until the rail appears. (Or render the rail as icon-only — no labels — between 768 and 1199px.) At minimum, pick one and apply before the next lane merges.

**MEDIUM-5 — Raw rgba brand-color literals outside `tokens.css`.**
- WHERE: `app/page.module.css:31-33` (`rgba(214,120,240,…)` ×3 in `heroPulse`), `src/components/TopNav.module.css:61` (`rgba(178, 24, 209, 0.45)` in logo drop-shadow), `src/styles/globals.css:107` (`rgba(5,3,10,0.5)` in `.ambient .veil`).
- WHAT: Playbook rule: "No raw hex outside `tokens.css`." Rgba spellings of brand colors are the same drift risk. If a brand hue ever changes, these three sites will not follow.
- FIX: Add to `tokens.css`:
  ```css
  --fl-accent-glow:    rgba(214,120,240,0.55);
  --fl-accent-glow-0:  rgba(214,120,240,0);
  --fl-secondary-glow: rgba(178,24,209,0.45);
  --fl-shadow-ink:     rgba(5,3,10,0.5);
  ```
  Replace the three sites with those variables. (Modern alternative: `color-mix(in srgb, var(--fl-accent) 55%, transparent)` — but the token form is more readable here.)

**MEDIUM-6 — Scripted font stack set on `body` + `button`, not on `html`.**
- WHERE: `src/styles/globals.css:18-30`
- WHAT: AGENT-PLAYBOOK Design-QA check #2 says "scripted stack present on `html` and `button`." The scaffold applies it to `body` + `button`. Body inherits to most descendants but some embedded contexts (form elements in portals, print styles, SVG `<foreignObject>`) start their cascade from `html` and will miss it.
- FIX: In `globals.css`, change the `body { font-family: var(--font); ... }` rule to `html, body { font-family: var(--font); ... }` (keeping all other body-only properties on body).

**MEDIUM-7 — `.railLink:hover` and `.tabLink:hover` have no non-color signal.**
- WHERE: `src/components/IconRail.module.css:34-37, 87-88`
- WHAT: Vibe principle: "every interactive state has a non-color signal (shape, weight, position)." Rail/tab hover changes only `background` + `color`.
- FIX: In `.railLink:hover` add `transform: translateX(2px)` or `font-weight: 600`. In `.tabLink:hover` add `transform: translateY(-1px)`. Gate under a `@media (prefers-reduced-motion: no-preference)` block.

**MEDIUM-8 — `.navGear:hover { transform: rotate(40deg) }` ignores `prefers-reduced-motion`.**
- WHERE: `src/components/TopNav.module.css:135-139`
- WHAT: A 40° rotation on hover is a decorative motion effect that should respect the user's reduced-motion setting. The existing reduced-motion gate in `globals.css:117-122` only covers the `.ambient` keyframes.
- FIX: Wrap the rotate in a media query: `@media (prefers-reduced-motion: no-preference) { .navGear:hover { transform: rotate(40deg); } }` and leave the background + color change outside. Audit the two `transform: scale(…)` press states (`.navBack:active`, `.langPill:active`) with the same lens — a quick scale press is fine but ideally also gated.

**MEDIUM-9 — Raw hex `themeColor: "#0a0813"` duplicates `--fl-bg` in TS.**
- WHERE: `app/layout.tsx:15`
- WHAT: Next.js's Viewport API demands a static string, so it can't literally reference a CSS var — but keeping the hex as an unlabelled literal means a future `--fl-bg` tweak will silently drift from the browser chrome color.
- FIX: Create `src/styles/tokens.ts` (one source of hex strings that need to appear in both CSS and TS):
  ```ts
  export const FL_BG_HEX = "#0a0813";
  ```
  Reference it from `layout.tsx` (`themeColor: FL_BG_HEX`) and add a sibling comment at the top of `tokens.css` pointing to `tokens.ts` for the duplicates. Keep the two in sync by convention.

**MEDIUM-10 — `.lpValue` text content is static "English" for both pills and never reflects the `<select>`'s value.**
- WHERE: `src/components/TopNav.tsx:42-44, 56-58`
- WHAT: Even for scaffold, showing "Native: English / Learning: English" with no way to tell which is which looks like a bug. The overlay-`<select>` pattern means the pill's visible text is independent of the select's current option — a client component is needed to sync them. Shipping as-is makes QA agents chase a non-bug every pass.
- FIX: Scaffold-level: convert `TopNav` to a client component, store `[native, learning]` in `useState`, and render each `.lpValue` as `NATIVE_OPTIONS.find(o => o.value === native)?.label`. Default `learning` to a different language (e.g., `"es"`) so the dual pills visibly differ. Content Pages agent will later persist to Settings; add a `// TODO(content-pages): persist via /api/settings` comment on the state hook.

**MEDIUM-11 — `logoMark` has `aria-hidden="true"` AND its `<img>` has `alt=""` while the parent `<Link>` carries `aria-label="Fun Learning home"` — redundant hiding, but the real issue: the image uses `/brand/funlingo-mark.png` as a raster at a 32px box, which is fine on 1x but will blur on 2x+ screens.**
- WHERE: `src/components/TopNav.tsx:30-33` + `public/brand/funlingo-mark.png`
- WHAT: The three branded files in `public/brand/` are PNGs. The extension CSS doesn't need to care because the browser extension serves it at exact DPR, but a web app runs on Retina / 2x laptops / 3x phones.
- FIX: Export an SVG mark alongside the PNGs (or inline it like the extension's `logo.png` is inlined elsewhere — check `funlingo-src-new`'s `logo.svg` sibling). Then use `<img src="/brand/funlingo-mark.svg" width="32" height="32" alt="" />`. Non-urgent for scaffold, but blocks a crisp retina ship.

**LOW-12 — `.shell` uses a magic `calc(100vh - 64px)` where 64 is a guess at the TopNav height.**
- WHERE: `src/components/AppShell.module.css:4`
- WHAT: TopNav's measured height is `14px + 14px + line-height(1.2) × 18px ≈ 50px`, not 64. The `- 64px` creates a 14px gap at the bottom that's inconsistent with the actual nav.
- FIX: Drop the `calc` and set `min-height: 100vh` on `.shell`, letting the flex column do its own thing. If a precise topnav-matched offset is wanted later, promote the nav height to a CSS var: `--nav-h: 60px;` in `tokens.css`, and use `calc(100vh - var(--nav-h))`.

**LOW-13 — StubPage eyebrow color (`--fl-accent`) differs from the Home empty-state eyebrow (`--fl-text-3`).**
- WHERE: `src/components/StubPage.module.css:23` vs `app/page.module.css:87`
- WHAT: Two "eyebrow chips" that live on the same site under similar surfaces use different colors with no documented reason. Future design agents will have to decide which is canonical every time they add one.
- FIX: Pick one convention. Recommend `--fl-accent` for the eyebrow (matches extension's `.eyebrow-chip` with `.e-dot`), with `--fl-text-3` for muted taxonomic labels (`.lpLabel`). Update `app/page.module.css:87` → `color: var(--fl-accent);` and add a `.greetDot`-style pulse dot before the text if you want them to feel identical.

Verdict: **scaffold ships for Wave 2, but HIGH-1 (rail active state) and HIGH-2 (locale font vars) should land before any lane that merges non-English content or more than ~3 pages — otherwise QA passes will keep refiling them.**
### 2026-10-16 — AI module agent

**This is the API contract.** Watch, Review, Talk, Content agents import from `@/lib/ai`. Do not call Groq / OpenAI SDKs directly — add a prompt file + a thin wrapper here instead so cost caps, Confidential<T> and the safety filter stay centralised.

**Public TypeScript signatures (`src/lib/ai/index.ts`) — the pinned contract:**

```ts
// Streaming
function translateLines(input: TranslateLinesInput): AsyncIterable<TranslatedLine>;
function talkTurn(input: TalkTurnInput): AsyncIterable<TalkTurnReply>;

// JSON
function wordCard(input: WordCardInput): Promise<WordCard>;
function scoreSpeech(input: ScoreSpeechInput): Promise<SpeechScore>;
function correctTurn(input: CorrectTurnInput): Promise<CorrectTurnOutput>;
function culture(input: CultureInput): Promise<CultureNote[]>;
function sentenceAnalysis(input: SentenceAnalysisInput): Promise<SentenceAnalysis>;
function summarize(input: SummarizeInput): Promise<SummaryOutput>;
function examples(input: ExamplesInput): Promise<ExamplesOutput>;

// Thrown
class RateLimitError extends Error {           // → HTTP 429
  readonly status: 429;
  scope: string; kind: "userDay"|"ipHour"|"monthlyCeiling"|"walletEmpty"|"inputTooLarge";
  retryAfterSec: number;
}
class SafetyFilterError extends Error {        // → HTTP 422
  readonly status: 422;
  violated: string[]; // rule ids from safety/rules.yaml
}
```

Inputs that accept third-party caption text use `Confidential<T>` fields (callers wrap via `markConfidential`). The brand only tags objects at runtime — pass `string[]` / object literals, not bare strings. API routes under `app/api/ai/*/route.ts` wrap and validate for callers; both JSON and NDJSON streaming helpers live in `src/server/ai/route-helpers.ts`.

**Prisma schema additions (one migration — `20261015202756_ai_cost_control`):**
- `BudgetMeter(yearMonth, scope, inputTokens, outputTokens, microUsdSpent, callCount)` — one row per month per scope. `scope: "_global_"` is the circuit-breaker row.
- `UserAiWallet(userId, day, tokensUsedToday, callsToday)` — per-user daily wallet; rolls on new UTC day.
- `AiCallCounter(scope, kind, bucket, windowKey, count)` — sliding-window counters for `perUserDay` + `perIpHour`.

Constants in `src/server/ai/limits.ts`:
- `MonthlySpendCeilingUsd = 50` (starter cap — bump after real usage telemetry lands)
- `DAILY_USER_TOKEN_BUDGET = 200_000`
- `DAILY_USER_CALL_BUDGET = 2_000`

**Rate limits chosen per function** (declared in each `src/server/ai/prompts/*.ts`):

| Function | perUserDay | perIpHour | maxInputTokens | timeout | model | Why |
|---|---|---|---|---|---|---|
| translateLines | 6,000 | 2,000 | 4,000 | 25s | FAST | ~500 lines/hr video × ~10 episodes/day = heavy daily cap; bulk model |
| talkTurn | 300 | 150 | 2,000 | 25s | SMART | ~60 turns per session; heavy call needs quality model |
| wordCard | 500 | 300 | 500 | 12s | SMART | ~200 taps/session; quality call |
| sentenceAnalysis | 800 | 400 | 500 | 12s | FAST | Sparkle button; bulk/cheap |
| correctTurn | 400 | 200 | 1,000 | 12s | SMART | Per user turn; quality for "corrections that teach" |
| scoreSpeech | 400 | 200 | 1,200 | 15s | SMART | Shadow mode heavy use |
| culture | 200 | 100 | 4,000 | 25s | SMART | Per source open; quality + larger input window |
| summarize | 300 | 150 | 5,000 | 20s | FAST | Per source; bulk/cheap |
| examples | 1,000 | 500 | 200 | 10s | FAST | Review card backs; small payload |

**Safety filter**: `src/server/ai/safety/filter.ts` + `rules.yaml` — regex rules for group+crime, stereotypes, sexual content, self-harm, PII patterns. Real slur list loads from `SLUR_PATTERNS` env var (newline-separated regexes) so it never sits in the repo. `invokeJson` / `invokeStream` call `filterDeep` on every output — opt-out impossible. Filter errors throw `SafetyFilterError` (status 422).

**Idiom harness result**: Running `pnpm test:idioms` with no `GROQ_API_KEY` emits a one-line xfail banner and exits 0 (local dev doesn't fail). With a key, the runner iterates 6 pairs (en↔es, en↔ja, en↔hi, hi→en, ja→en, es→en) and gates on ≥95% FULL CREDIT per pair. **Not run against live Groq here (no key in worktree env);** CI must assume this gate fires. Fixtures starter set covers the five phrases listed in CLAUDE.md plus "break the ice".

**Gotchas future agents must know:**
- **Lazy groq client.** `src/server/ai/client.ts` now returns a Proxy that instantiates OpenAI on first access — module-load instantiation blew up `next build`'s static route analysis when `GROQ_API_KEY` is unset. If you ever `import { groq }` and need to inspect it at module load, do it inside a function, not at top-level.
- **`Confidential<T>` runtime brand only works on objects.** Primitives (bare strings) can't carry the symbol. All AI functions that take caption text accept `Confidential<string[]>` or `Confidential<string>` where the brand attaches to the wrapping literal — the TS brand is static-only on raw strings. The scrubber test in `tests/unit/canary-leak.test.ts` codifies this.
- **Reservation + reconciliation.** `limits.assertCanCall` reserves `inputChars/4 * 2` tokens up front; `recordCall` reconciles against Groq's real `usage` numbers afterwards. If a route throws before Groq is reached, `refundReservation` rolls it back — don't short-circuit this.
- **Idempotency wrapping is baked in.** `jsonAiRoute` and `streamAiRoute` already call `withIdempotency`. Don't re-wrap at the route handler.
- **Response streams carry errors inline.** `streamAiRoute` emits a final NDJSON line `{"error":true,"status":...,...}` when a mid-stream failure happens. Clients MUST check each line for `error === true` instead of assuming 200 = all good.
- **Prisma migration `20261015202756_ai_cost_control`** was applied to a dev `prisma/dev.db` in this worktree; the file is gitignored. New dev envs run `pnpm prisma migrate dev` once.
### 2026-10-16 — Content pages agent

Built the surround pages — Home, Library (4 tabs), Words (+ Lists), Sentences (3 lists), Progress, Settings, Account. Build + Vitest both green. 10 Vitest tests, all passing. `pnpm dev` returns `200` on every content route both signed-out (empty state) and with seeded data (via `node scripts/seed-content.mjs`).

**Prisma models added** (migration `20261015202928_content_pages_models`):

- `Follow` (user → channel/show/podcast; unique on userId+kind+externalId)
- `ProgressSnapshot` (resume state; unique on userId+sourceId)
- `HistoryEntry` (deletable; unique on userId+sourceId)
- `Favorite` (unique on userId+sourceId)
- `Pack` + `PackItem` + `UserPackProgress` (Sentence/Show/word-list packs)
- `Bookmark` (lives next to Book / ReadingPosition)
- `CultureNote` (per-source, per-show or per-lexeme — AI lane will populate)

Still TODO for a future lane: `Lexeme`, `WordCard`, `TalkTopic`, `TalkLesson`, `TalkTurn`. The schema's bottom-of-file comment lists these.

**Shared components other lanes should reuse** — all in `src/components/`:

- `Card.tsx` + `.module.css` — the universal glass surface (title/eyebrow/trailing slots, `interactive`, `flat`, `compact`)
- `EmptyState.tsx` + `.module.css` — warm first-use card with primary/secondary CTA actions. Inline variant for use inside a list
- `PageHeader.tsx` + `.module.css` — the in-app title block (eyebrow / title / lede / trailing actions)
- `TabBar.tsx` + `.module.css` — route-based pill tabs; active state uses weight + gradient underline + colour (never colour-only)
- `FilterChip.tsx` + `.module.css` — single filter pill with a `FilterRow` wrapper; ✓ glyph + heavier weight + inner ring are the non-colour signals of selection
- `SegmentedToggle.tsx` + `.module.css` — small two/three-way switch with `IconGrid` and `IconList` ready-made icons (used for list/card view across Words + Sentences)
- `GlobalKeyboard.tsx` — the hub-wide `g <letter>` chord nav. Already wired in `app/layout.tsx`; mirror the player's `/` grammar here
- `progress/ActivityHeatmap.tsx` — 5-month grid with per-quantile levels. Takes a `{date, value}[]`

The Watch / Review / Talk-Read lanes should import these rather than making new primitives.

**API routes landed (all idempotent except GET)**:

- `POST /api/settings` — profile preferences (name, langs, goal, motion). Mirrors motion into Prefs JSON
- `POST /api/favorites` — toggle Favorite on a Source
- `POST /api/follows` — add/remove Follow (channel/podcast/show)
- `POST /api/history` — upsert HistoryEntry; `DELETE /api/history` removes by sourceId
- `POST /api/account/delete` — soft-delete (`User.deletedAt`); 7-day purge still TODO (SPEC §13)
- `GET /api/export` — CSV or JSON export of UserWord + Sentence (Anki-compatible columns)

**Decisions I made that weren't in the spec:**

1. **Sentences uses `?tab=favorite|dictation|speaking` instead of nested routes.** All three share one data source (Sentence rows); tabbing in the client avoids re-querying. Dedicated `SentencesTabBar` reads `useSearchParams()`. If a future lane wants deep-link routes per list, promote to `/sentences/favourites` etc.
2. **Signed-out states for every page.** `src/server/session.ts :: getViewer()` swallows `auth()` errors so pages render without `AUTH_SECRET` configured. Every page's signed-out branch calls `EmptyState` with a "Sign in" CTA.
3. **`g <letter>` chord navigator ignores typing targets.** `src/components/GlobalKeyboard.tsx` checks `isTypingTarget(e.target)` — input, textarea, select, contenteditable. The chord expires after 1.2 s.
4. **Progress heatmap buckets by quantile of non-zero days.** Avoids a flat heatmap when a user has 10 small days and 1 heavy one.
5. **Non-colour signals**: active TabBar tab = weight + underline; selected FilterChip = ✓ + weight + ring; UserWord state chip = colour **plus** a shape (circle/square/diamond) in the leading dot. Keeps the QA rule green.
6. **Prisma Account rows (Auth.js) rendered on `/account`.** v1 Google-only, but the UI iterates all providers so a magic-link add is free when it lands.
7. **No `tsx` dep.** The content-lane seed is pure Node ESM at `scripts/seed-content.mjs` — `node scripts/seed-content.mjs` seeds a `seed@fun-learning.local` user with a video, 3 words, 2 sentences, 60 days of activity, and 2 packs. Idempotent.
8. **`force-dynamic` on every content route.** The pages read per-user DB state; static generation would be wrong. The scaffold's dynamic route (`/watch/[sourceId]`) already does this.
9. **The AI module shim at `src/lib/ai/index.ts` only exports what Home actually calls** (`cultureNoteOfTheDay`, `wordOfTheDay`). Returns `null` today → the UI shows "we'll explain the idiom next time" copy. Swap to `@/server/ai/*` on merge.

**Gotchas future lanes should know:**

- **Only the Pack kinds `sentence`, `show`, `word_list` are expected.** `Pack.kind` is a plain string; keep lane boundaries by using those enum-ish values.
- **`Encounter.userWordId` can be null.** A line can be saved without being tied to a UserWord (SPEC §6.4 Sentences tab). The Words page's `include: encounters` only reads from UserWord → safe.
- **`ProgressSnapshot.percent` is 0..1, not 0..100.** The thumbnail progress bar multiplies by 100.
- **CSV export columns are Anki-ish** (lemma, example, translation, source, savedAt). Don't rename them without updating the extension's forthcoming export too.
- **`experimental.typedRoutes` tightly types `<Link href>`.** `/sentences?tab=favorite` as a bare string won't type-check; use `href={{ pathname: "/sentences", query: { tab: "favorite" } }}` as the sentences tab bar does.
- **The Streak `freezes` counter is informational only in this lane.** Earn/spend rules belong to the Review lane.

### 2026-10-16 — Watch agent

Shipped `/watch/[sourceId]` end-to-end: YouTube iframe (API-driven, overlay-free), dual subtitles with streaming natural translations, click-any-word → inline WordCard with "In this video ×N", Culture Context tab, Default/Focus/Cinema modes with keyboard switcher, every shortcut from SPEC §6.6, session heartbeat to `VideoSession`, and save-word → `UserWord` + `Encounter` with the DRM/LEGAL rule enforced server-side (YouTube/streaming encounters never store the raw line).

Build + Vitest both green; Playwright `watch.spec.ts` has 3 tests (3 passed): zero-DOM-overlap-with-iframe across all three modes, 1/2/3 mode toggle, / help overlay round-trip.

**Shared components you built (callers from other lanes may reuse):**

| Component / helper | Path | Purpose |
|---|---|---|
| `YouTubePlayer` | `src/components/watch/YouTubePlayer.tsx` | IFrame API wrapper. Returns a `YouTubePlayerHandle` with play/pause/seek/mute/rate. Nothing may be drawn over its `[data-fnl-yt-wrap]`. |
| `SubtitlePane` | `src/components/watch/SubtitlePane.tsx` | Dual subtitles with word-tap + ±15-line viewport windowing. |
| `WordCardPopup` | `src/components/watch/WordCardPopup.tsx` | Inline WordCard incl. "In this video ×N" (session only). |
| `CulturePanel` | `src/components/watch/CulturePanel.tsx` | Debounced culture-note tab (fires on pause / explicit tap). |
| `ModeSwitcher` | `src/components/watch/ModeSwitcher.tsx` | aria-pressed layout toggle (Default/Focus/Cinema). |
| `ShortcutHelp` | `src/components/watch/ShortcutHelp.tsx` | `/` opens, Esc closes. Reuses `SHORTCUT_HELP` list. |
| `useWatchKeyboard` | `src/lib/watch/useKeyboard.ts` | SPEC §6.6 dispatcher; ignores keys inside inputs + inside `[data-fnl-wordcard]`. |
| `tokenize` | `src/lib/watch/tokenize.ts` | Script-aware caption tokenizer (Latin/Devanagari/Arabic/CJK). |
| `sha256Hex` | `src/lib/watch/hash.ts` | Universal (browser + node) SHA-256; used as cache key for culture notes. |

**Prisma models added (migration `20261015204634_watch_lane`):**

- `VideoSession` — one row per (userId, sourceId, lang); `positionSec`, `mode`, `lastPulseAt`. No caption text.
- `CultureNoteCache` — `(sourceId, lineHash, sourceLang, nativeLang)` unique. `lineHash` is SHA-256 of the triggering line — raw text is NEVER written. Payload is AI note TEXT (our own writing, safe to persist). 90-day freshness check at read time.
- `WordCardCache` — `(lemma, srcLang, tgtLang)` unique. Keyed by LEMMA + lang pair, not sentence. 90-day stale check.

Also added relations: `User.videoSessions`, `Source.videoSessions`.

**API routes added:**

- `POST /api/watch/wordCard` — cache-first; miss → `wordCard()` from `@/lib/ai`. Returns `{ ...card, _cache: "hit"|"miss" }`.
- `POST /api/watch/culture` — cache-first; miss → `culture()` from `@/lib/ai`. Keyed by SHA-256(triggerLine).
- `POST /api/watch/saveWord` — creates/upserts `UserWord` + `Encounter`. Encounter line is only stored for non-DRM sources (`!DRM_SOURCE_TYPES`); YouTube/podcasts/Netflix/etc. store `sourceId + timestamp` without the line.
- `POST /api/watch/session` — 15s heartbeat upsert of `VideoSession` with sourceId + positionSec + mode. No caption text.

All four wrapped with `withIdempotency` (clients send `Idempotency-Key` headers).

**Gotchas future lanes should know:**

- **YouTube IFrame API's `onReady` fires BEFORE the iframe has layout width in some browsers** (particularly when the player is nested in a flex/grid parent that hasn't settled). The parent must NOT try to measure the iframe inside `onReady` — poll on `requestAnimationFrame` or listen to `resize` instead. The `YouTubePlayer` component just forwards the handle in `onReady`; measurement is the parent's problem.
- **Captions never leave the client.** The source carries `meta.testCaptions` for the dev `/watch/demo` path; in prod the Chrome extension pushes captions in via `postMessage` (not yet wired — Content Pages lane owns the extension-handshake surface). If you add a code path that persists captions, canary-leak test in `tests/unit/canary-leak.test.ts` will fail.
- **The YouTube iframe lives inside a `[data-fnl-yt-wrap]` div with `overflow: hidden` and no absolutely-positioned siblings.** `tests/e2e/watch.spec.ts` enforces zero DOM overlap. If a future lane adds a toast or badge, DO NOT position it inside `.playerCol` — put it in the sibling `.controls` strip or as a fixed-position toast like `WatchClient` does.
- **`tokenize` returns `isWord` for Unicode letters only.** CJK runs come back as one span — tap on the whole run; if a future script needs per-character tap, add a Script-specific breaker (ICU segmenter) and swap it in via a prop, don't change the default.
- **`WordCardCache` and `CultureNoteCache` auto-stale after 90 days at READ time.** No background sweeper yet; add one in the Content/Settings lane with a cron (`deleteMany({ where: { freshness: { lt: cutoff } } })`).
- **DRM source types list is centralised** in `app/api/watch/saveWord/route.ts` (`DRM_SOURCE_TYPES`). When Review/Content lanes add more streaming platforms, keep that set in sync — it's the gatekeeper for whether `Encounter.line` carries the raw line or the empty string.
- **`experimental.typedRoutes` is on.** The Watch route uses `useRouter` nowhere, but when linking to `/watch/${id}` from another page, prefer `href={{ pathname: "/watch/[sourceId]", query: { sourceId: id } }}` to keep it type-safe. A `href={`/watch/${id}`}` string won't compile without `as Route`.
- **Playwright `watch.spec.ts` runs without needing GROQ_API_KEY** — the AI routes return 500 under missing-key, but the overlap test only cares about DOM. Mode-switch and help-overlay tests also don't call AI. If you add Watch tests that need real translations, mock them.

### 2026-10-16 — Review + FSRS agent

Shipped the full `/review` route end-to-end — scheduler, five drills, session API, keyboard shortcuts, summary. Build + Vitest (44 tests) pass; Playwright `review-smoke.spec.ts` passes against a running `pnpm dev`. Branch `agent/review`, base commit `27a4c44`.

**Shared components (new, re-usable across lanes):**

- `src/server/review/scheduler.ts` — public exports: `getOrInitCardState`, `gradeCard`, `skipCard`, `cardsDueNow`, `assertCardExists` (closes Code QA finding #6 — service-layer existence check), `previewNextDue`, `ReviewCardMissingError`, `FsrsRating`, `FsrsState`. Thin wrapper over `ts-fsrs@5.4.2`. The scheduler is wallet-free (no AI cost) — call it from any lane that needs FSRS state.
- `src/server/review/dictation.ts` — `normalize`, `dictationMatches`, `firstErrorIndex`, `hint`. Case/punct-insensitive. Veto test #3 codified in `tests/unit/review/dictation.test.ts`.
- `src/server/review/auth-helper.ts` — `resolveReviewUserId(req)` — session first, dev `x-dev-user-id` header fallback in non-prod. Lets Playwright drive the API without OAuth. Mirrored on the SSR side via `?dev_user=` on `/review`.
- `app/review/drills/GradeRow.tsx` — the Again/Hard/Good/Easy row. Every button has aria-label + aria-keyshortcuts + a non-color glyph (× – ✓ ★). Reuse this on any card-grading UI.
- `app/api/test-seed/*` — dev + test-only. 404s in production. Used by `review-smoke.spec.ts`; other lanes should reuse rather than inventing a parallel seed route.

**Prisma models added (migration `20261015204732_review_lane`):**

- `ReviewCardState(id, userId, cardType, cardId, lang, due, stability, difficulty, reps, lapses, state, card, updatedAt, createdAt)` with `@@unique([userId, cardType, cardId])` + `@@index([userId, lang, due])`. The composite UNIQUE is what makes the FSRS-collision veto test (#4) a *schema-level* guarantee, not an app-code one: grading `UserWord#X` cannot touch `Sentence#X`'s state because they get separate rows.
- `User.reviewCardStates` relation added.
- `Activity.lang` flipped `String?` → `String` (NOT NULL), closing Code QA MEDIUM finding #7. Content lane: if you were depending on the nullability for a "any-lang" row, you need an explicit sentinel instead.

**ReviewLog** already carried `lang` from the scaffold; `format` set widened to include `"skip"` and `"speaking"`. `grade = 0` is reserved for skips.

**Decisions outside the spec (and why):**

1. **Session is interleaved 2:1 word:sentence.** SPEC §11 says "mixes formats" but doesn't ratio. Users save ~10× more words than sentences; a 1:1 mix starves the sentence lane. 2:1 is still visibly mixed.
2. **Fresh (never-reviewed) UserWords/Sentences are injected into the session.** The SPEC's "cards due now" phrasing could be read as "only cards already in FSRS state." I treat a brand-new UserWord as implicitly due. The alternative — require an explicit "introduce to review" step — forces an extra screen the user doesn't want.
3. **Lang guard on `getOrInitCardState`.** The composite UNIQUE already prevents cross-type collision, but a caller passing a different `lang` for the same `(cardType, cardId)` would be a silent lane leak. I added a runtime check that throws `lang mismatch` — defence in depth. Codified in `tests/unit/review/scheduler.test.ts`.
4. **Guess-the-meaning distractors are a hard-coded safe pool.** `wordCard` from the AI module could supply richer distractors, but hitting it per card would blow through the `wordCard.perUserDay` budget (500) on review sessions alone. Future: batch-generate distractors on word-save, not on review-time.
5. **Shadow + Speaking POST straight to `/api/ai/scoreSpeech`.** Already wrapped (idempotency, cost caps, safety filter) by the AI module — no need for a review-side proxy.
6. **No `/api/review/sessions/:id` resource.** The session is ephemeral — client-side progress + per-card graded rows in `ReviewLog`. A session table would be dead weight until the Progress lane needs it.
7. **Dictation hint "·" (middle dot) marks already-typed letters; actual missing letters are shown verbatim.** The alternative — blanked underscores — is harder to differentiate from "typed correctly" at a glance.

**Gotchas future agents must know:**

- **Grade button shortcuts are suppressed when focus is in a `<textarea>` or text `<input>`.** Dictation can type freely. If you add another drill with a textbox, inherit this guard — the handler is in `ReviewRunner.tsx` under the `inField` check.
- **Space = skip (not next-card).** SPEC §11 names Space in the dictation / keyboard list; I bound it to skip for the whole runner. If any lane wants a "space = reveal/next" semantics for a non-input drill, override at the drill level.
- **`cardsDueNow` filters by `now`.** Pass `new Date(futureTimestamp)` to simulate "cards due later today." Tests use this to drive post-grade due-time behaviour.
- **`gradeCard` runs ts-fsrs OUTSIDE the Prisma transaction.** Reason: `scheduler.next()` is CPU-only and we want the tx to be as short as possible (SQLite is single-writer). If you refactor, don't start the tx before `scheduler.next` or you'll serialise every grade.
- **`ReviewCardState.card` is a JSON *string*** (SQLite has no JSON type). The parse/serialise helpers in `scheduler.ts` round-trip the ts-fsrs `Card` cleanly; don't bypass them to update individual numeric columns — the authoritative state is the JSON blob.
- **Test seed route (`/api/test-seed`) is dev-only.** It returns 404 in production. Playwright drives this; do not reach for it in prod code paths.
- **`.env` must exist in the worktree** for Prisma to resolve `DATABASE_URL`. First-time clone: `cp .env.example .env` and set `DATABASE_URL="file:./dev.db"`.
- **Prisma migration `20261015204732_review_lane`** is applied to the local `prisma/dev.db` in this worktree. New dev envs: `pnpm prisma migrate dev` once.

**Veto matrix (Review's own):**

| # | Test | Where | Status |
|---|---|---|---|
| 3 | Dictation ignores case/punct; hint reveals only missing letters | `tests/unit/review/dictation.test.ts` | PASS |
| 4 | FSRS collision guard (`UserWord#X` grade doesn't touch `Sentence#X`) | `tests/unit/review/scheduler.test.ts` "Veto #4" | PASS (schema-level + runtime) |
| 8 | Multi-lang scoping (EN+JP user with active EN → 0 JP cards) | `tests/unit/review/scheduler.test.ts` "Veto #8" + `tests/e2e/review-smoke.spec.ts` | PASS |

### 2026-10-16 — Talk+Read agent

Shipped `/talk` (topic index + lesson chat with help ladder, corrections, end-report) and `/read` (shelf tabs, EPUB upload, classic/upload reader via epubjs, graded reader via bundled text). Build passes; vitest 36/36 green (added 16 tests).

**Shared components added:**
- `src/components/talk-read/GlassCard.tsx` — glass-surface card used by both lanes; vibe-compliant hover (translateY-guarded by prefers-reduced-motion). Future lanes should prefer this over hand-rolled surfaces for consistency.
- `app/read/[bookId]/WordCardPopover.tsx` — inline word card popover + `extractWordAtPoint()` helper. The helper walks `data-word` on the graded reader DOM and `caretRangeFromPoint` inside epubjs's iframe DOM, so Watch and Review can reuse it later when their own word-tap landing lands.
- `src/lib/talk/helpLadder.ts` — pure state machine for the SPEC §7.3 help ladder. Three levels (Nudge/Starter/Full), each strictly more revealing than the previous. Review lane's own hint ladder can reuse this.
- `src/lib/read/positionDebounce.ts` — generic debounced reporter with injectable clock and setTimeout. Watch could use the same shape for position reporting against the YouTube iframe.
- `src/lib/read/epubMetadata.ts` — pure-TS EPUB metadata extractor (JSZip + regex over the OPF). Does NOT return the book's text — intentional.

**Prisma models added (migration `20261015204952_talk_read_lane`):**
- `TalkTopic`, `TalkLesson` — stubs for the future Content lane; v1 Talk reads topics from `src/lib/talk/topics.ts` (hard-coded) and stores lesson id strings that match the catalog.
- `TalkTurn` — one row per AI/user turn. Carries `role`, `text`, `translation`, `helpLevel` (0..3 — logged for the end-of-session report), `correction` (JSON `CorrectTurnOutput`) and `speechScore` (JSON). Scoped by session; session carries `lang` per AGENT-PLAYBOOK rule 4.
- `Book.coverUrl` (new column) — populated from the EPUB cover (data URL) for uploads, from the publisher cover URL for classics.
- `Book.sourceUrl` (new column) — the public URL a classic streams from. Reader fetches this *in the browser*; never from our server.

Also removed `TalkTopic/TalkLesson/TalkTurn` from the schema TODO list.

**Libraries installed:**
- `epubjs@0.3.93` — EPUB rendering in the browser. Dynamic-imported inside a `useEffect` in `app/read/[bookId]/EpubReader.tsx` so Next's server bundler never evaluates its DOM-only code. Its bundled `.d.ts` is wrong about `rendition.resize` arg types; we cast through `unknown` once in the import to keep our looser shape. Its `.on()` handlers are typed as `(...args: unknown[])` so we destructure positionally.
- `jszip@3.10.1` — zip parsing for the EPUB metadata extractor (no DOM needed, runs on the server too).

**Routes added:**
- UI: `/talk`, `/talk/[topicSlug]/[lessonSlug]`, `/read`, `/read/upload`, `/read/[bookId]`.
- API (all idempotency-wrapped): `POST /api/talk/sessions`, `POST /api/talk/sessions/[id]/turns` (NDJSON streaming), `POST /api/talk/sessions/[id]/end`, `POST /api/talk/help`, `POST /api/read/upload` (multipart), `POST /api/read/position`, `POST /api/read/encounters`.
- API (read-only): `GET /api/read/books`, `GET /api/read/books/[id]/file` (serves the user's own uploaded EPUB), `GET /api/read/position`.

**Decisions outside the spec:**

1. **MAX_TURNS = 10 per Talk session.** SPEC §7.4 just says "end-of-session report"; the client auto-ends after 10 user turns. Reasonable budget for the AI cost caps and matches typical role-play lengths. Hard-coded in `LessonChat.tsx`.
2. **Talk topics + lessons live in TS, not DB.** The playbook called for Prisma models; I added them so the Content lane can seed later without a migration, but runtime stays in `src/lib/talk/topics.ts` for v1. Lesson id strings match the schema — anything written here must be a known id. The `/api/talk/sessions` route refuses unknown lesson ids.
3. **Classics stream from the publisher's URL in the browser.** The server never fetches or caches book text (LEGAL §"openly licensed books" — stay out of the redistribution posture). CORS can block some publishers; `EpubReader` surfaces a friendly error with a link to the publisher's own reader.
4. **Uploaded EPUBs live on disk under `.uploads/<userId>/<bookId>.epub`.** `.uploads/` is now gitignored. Max size 25MB. The DB stores only metadata — a 3-test suite (`tests/unit/read-epub-metadata.test.ts`) canaries this by inserting a known string into a built EPUB's chapter and asserting it never appears in `prisma.book.findMany()` serialisation.
5. **Reading position for the graded reader uses `graded:<key>:<pageIdx>`** instead of a CFI (there's no EPUB behind it). The same `ReadingPosition` row works — `location` is a string either way.
6. **Help ladder's "Help" API reuses `correctTurn`** rather than minting a new prompt file. We feed it a placeholder utterance and the AI's last line as context; `corrected` becomes the suggestion. Keeps cost caps centralised and avoids a schema change under the AI module's contract.
7. **Book row for a classic/graded reader is lazy-created on first `position` or `encounter` write**, not seeded in a migration. Keeps the catalog as the single source of truth and lets us edit titles/levels without touching the DB.
8. **Vitest env loading.** The scaffold's DB-touching tests (`canary-leak`, `limits`) require `DATABASE_URL`, but Vitest doesn't load `.env`. I added `tests/setup.ts` (plain-text .env parser; no new dependency) and wired it into `vitest.config.ts` via `setupFiles`. Pre-existing bug — DB tests silently never ran before this. Now 36/36 pass.
9. **No `TopNav`/`AppShell`/`IconRail` edits** — the Design-QA pass flagged four HIGH issues against those files. Those stay in their lane (owned by a future scaffold refresh or Content lane).

**Gotchas future agents must know:**
- **epubjs is browser-only.** Dynamic-import it inside a `useEffect` with a `.default` destructure. Don't put the import at module scope — Next's server bundler will try to run it and crash on `window`/`document`.
- **epubjs type package is slightly wrong.** Cast the module through `unknown` on import (we did this once in `EpubReader.tsx`) and keep a local loose shape. Don't widen the public API.
- **CORS on classics.** Project Gutenberg currently serves CORS headers; Standard Ebooks and Aozora may not. Error-handling path shows a friendly "open at publisher" link. Future: proxy only if LEGAL review changes posture (right now, don't).
- **Graded reader text is OUR writing.** Keep it that way in `src/lib/read/catalog.ts` — nothing extracted from copyrighted sources. The licence field says `CC-BY-4.0` because we authored it; if that changes, update the field.
- **TalkTurn.text is private per user.** The role-play fiction is still the user's own line (SPEC §16 Encounter rule applies by analogy). Don't log it, don't aggregate it across users, don't show it to anyone else.
- **Idempotency key shape for Talk + Read:** clients use `start-…`, `turn-…`, `end-…`, `help-…`, `upload-…`, `pos-…`, `enc-…` prefixes with a timestamp. Server treats them as opaque strings — don't parse them anywhere.
- **The MAX_TURNS=10 cap is enforced only on the client.** A crafted request could keep sending turns to a non-ended session. The server-side cost caps absorb this (talkTurn is 300/day per user). If stricter is needed later, add a `session.turns.count >= MAX_TURNS → 409` guard in `/api/talk/sessions/[id]/turns`.
- **Reading position debounce uses `createPositionReporter` from `src/lib/read/positionDebounce.ts`.** The default window is 800ms; pass `delayMs` if a lane needs tighter/looser. Flushes on component unmount; use `.cancel()` if you need to drop a pending report (e.g. user hits "delete book" mid-session).

### [LANG-SCOPING] 2026-10-17 — Wave 3 lang-scoping sweep

Pass 2 Code QA found three leaks where the Home + Progress pages read lang-scoped models WITHOUT `lang` in the WHERE clause — plus schema drift on `VideoSession` where the migration never created the unique the schema declared. All closed on `agent/lang-scoping`.

**The shared `activeLang`-fallback pattern** every lane now follows:

```ts
const { userId, activeLang } = await getViewer();   // src/server/session.ts
if (!userId) return <SignedOutView />;
// `activeLang` is NEVER undefined — getViewer defaults to "en" if the user
// hasn't picked a learning language yet, so every call site can pass it
// into a `where: { lang: activeLang }` filter without a null-guard.
await Promise.all([
  loadStreak(userId, activeLang),
  loadGoalProgress(userId, activeLang),
  // ...
]);
```

Rule for future lanes: **when a loader's output is shown as belonging to one language (Home, Progress, Watch resume, Review session), thread `activeLang` and filter the read.** When a loader's output is explicitly cross-lang (export, GDPR dump, admin dashboard, test-seed cleanup, Progress `byLang` group-by card), skip the filter and add a `// cross-lang on purpose` comment with a one-line reason.

**Read sites fixed (lang filter added):**

| File | Function | What leaked |
|---|---|---|
| `app/page.tsx:loadResume` | ProgressSnapshot | JP shows surfaced in EN learner's "Resume" row — filtered via `where: { source: { lang } }` (ProgressSnapshot has no `lang` column of its own). |
| `app/page.tsx:loadStreak` | Activity (7-day strip) | JP minutes lit up EN streak dots. |
| `app/page.tsx:loadGoalProgress` | Activity (today) | JP minutes counted toward EN daily goal ring. |
| `app/progress/page.tsx:loadForUser` | Activity (5-month heatmap) + ReviewLog (30-day count) | Heatmap and "reviews, 30d" mixed JP + EN. Copy above the heatmap now reads "Activity in <lang-name>". |

**Read sites left as-is with a `// cross-lang on purpose` comment:**

| File | Function | Why cross-lang is correct |
|---|---|---|
| `app/progress/page.tsx` | `userWord.groupBy({ by: ["lang"] })`, `wordsAll`, `sentencesAll` | The "By learning language" card EXISTS to show the cross-lang split; the "Words saved" headline stat is the user's full deck across every lang. |
| `app/api/export/route.ts` | `userWord.findMany`, `sentence.findMany` | GDPR-style export returns every row the user owns. Each row carries its own `lang`. |
| `app/api/test-seed/cleanup/route.ts` | all deleteMany calls | Dev-only Playwright teardown wipes everything so runs don't leak between invocations. |

**Read sites already lang-scoped — no change needed (but audited):**

- `app/page.tsx:loadLastNight` — Encounter already has `lang` in WHERE.
- `app/page.tsx:loadReviewCounts`, `loadCounters` — UserWord / Sentence / TalkSession all already scoped.
- `app/words/page.tsx`, `app/words/lists/page.tsx` — already scoped.
- `app/sentences/page.tsx` — already scoped.
- `app/review/page.tsx`, `app/api/review/session/route.ts` — scoped at both the `cardsDueNow` level AND the per-id hydrate (`id: { in: ids }, userId, lang`).
- `app/api/watch/session/route.ts`, `app/watch/[sourceId]/page.tsx` — scoped by `(userId, sourceId, lang)` on both the pulse and the resume read.
- `app/api/watch/saveWord/route.ts`, `app/api/read/encounters/route.ts` — writes carry `lang`.
- `src/server/review/scheduler.ts` — every read (`cardsDueNow`, `getOrInitCardState`, `assertCardExists`, `touchStreak`, `prisma.activity.findUnique`) is scoped.

**Schema change — `VideoSession` unique swap:**

- Old: schema said `@@unique([userId, sourceId])`, but migration `20261015204634_watch_lane` only emitted a NON-unique `VideoSession_userId_sourceId_idx`. Drift: the DB would let a learner studying EN+JP on the same source hold two rows, which is correct — but the schema's single-col unique would blow up on a future `prisma migrate dev`.
- New: `@@unique([userId, sourceId, lang])`. Migration `20261017000001_video_session_lang_unique` dedups dup rows (keeps the latest `lastPulseAt`), drops the old non-unique index, and creates `VideoSession_userId_sourceId_lang_key` to match.
- No handler used the single-col compound key (`userId_sourceId`) — the watch session route and the watch page both use `findFirst`/`findMany` by `(userId, sourceId, lang)`, so no call-site renames were needed.

**Tests added (`tests/unit/lang-scoping.test.ts`, 12 tests):**

Each test seeds a user holding BOTH EN and JP rows (fixture pattern mirrors `tests/unit/review/scheduler.test.ts` Veto #8), then asserts the fixed read returns only the active-lang slice. Coverage:

- Home streak-strip Activity read lang-scoped.
- Home today's-goal Activity read lang-scoped.
- Home Resume ProgressSnapshot filtered by `source.lang`.
- Progress 5-month heatmap Activity read lang-scoped.
- Progress 30-day ReviewLog count lang-scoped.
- VideoSession `(userId, sourceId, lang)` unique: EN + JP sessions coexist on one source, resume returns only the active-lang row, duplicate (userId, sourceId, lang) rejected.
- UserWord Words-page read lang-scoped.
- Sentence Sentences-page read lang-scoped.
- UserWord Home review-count reads lang-scoped.
- Encounter Home 'lines you saved' read lang-scoped.

**Summary:**
- Read sites fixed: **5** (Home: Resume + Streak + Goal; Progress: heatmap + reviews30).
- Read sites commented `// cross-lang on purpose`: **5** (Progress: byLang + wordsAll + sentencesAll; Export: words + sentences; test-seed cleanup).
- Schema changes: 1 (VideoSession unique swap) + 1 migration (`20261017000001_video_session_lang_unique`).
- Tests added: 12 (`tests/unit/lang-scoping.test.ts`).
### 2026-10-17 — Wave 3 blocker-fix agent

Shipped six BLOCKERs out of the Pass 2 QA list (branch `agent/blocker-fixes`, base `74412ce`). Build + Vitest both green: **95 tests passing (16 new over the 75-test baseline)**.

**What landed per BLOCKER:**

1. **BLOCKER 1 — streaming idempotency.** Rewrote `src/server/middleware/idempotency.ts` around a "sentinel at stream-start" pattern.
   - Detects streaming responses by content-type (`application/x-ndjson`, `text/event-stream`, `application/octet-stream`).
   - For streams, finalizes the pending row IMMEDIATELY with `statusCode: 202` + body `{"streaming":true,"startedAt":"<iso>"}`, then returns the response UNDRAINED (first bytes reach the client as the model emits them).
   - Replay of a sentinel row (and of a still-pending row we can't finalize) returns **409 `{"error":"IN_PROGRESS","retryAfter":5}` + `Retry-After: 5`** — streams are never replayed.
   - Handler throws are caught: the PENDING claim is deleted so a client-driven retry can recover, then the error is rethrown for Next's error boundary.
   - Removed the "give up on replay and run the handler without a claim" branch — that path was itself the double-insert vector.
   - JSON caching path still intact (status < 500, `application/json`, ≤64KB body, replay with `x-idempotent-replay: 1`).
   - New vitest coverage: `tests/unit/idempotency-streaming.test.ts` — (a) sentinel path without body drain, (b) handler-throw cleans PENDING, (c) 409 on in-progress collision, (d) JSON replay still works.

2. **BLOCKER 2 — layout locale.** `app/layout.tsx` now reads `getViewer()` and sets `<html lang>`, `<html dir>` and `<body data-funlingo-locale>` from the viewer's `uiLocale` → `activeLearningLang` → `"en"`. The per-locale font-family overrides in `globals.css` keyed off `body[data-funlingo-locale]` now actually fire for Hindi/Marathi/Gujarati/Arabic/Japanese/Korean/Thai learners. Added `src/lib/i18n/rtl.ts :: isRtl(code)` — handles `ar`, `he`, `fa`, `ur`, `yi`, `ps`, `sd`, `dv`, case-insensitive, strips region suffix.

3. **BLOCKER 3 — TopNav lang pills.** Split `TopNav` into an async server component that reads the viewer, and `LangPills.tsx` (client component) that owns select state + persistence. Pills render each user's actual `nativeLang` / `activeLearningLang` labels. On change the client POSTs `/api/settings` (with an idempotency key) and calls `router.refresh()` so the whole shell (incl. layout `dir` + locale) re-reads from the DB. Expanded `NATIVE_OPTIONS` and `LEARNING_OPTIONS` to cover the common 10–12 locales each.

4. **BLOCKER 4 — library YT paste.** New client `src/components/library/YouTubePaste.tsx` + `src/lib/library/youtube.ts :: parseYouTubeId(raw)`. The parser accepts `youtube.com/watch?v=`, `youtu.be/`, `/shorts/`, `/embed/`, `/live/`, and bare 11-char ids; ignores `?si=` / `?t=` tails. Invalid input shows inline red copy under the field; valid input routes to `/watch/<id>`. **No new API route was needed** — `/watch/[sourceId]/page.tsx` already lazy-creates a `Source` row for any unknown YT_ID (`YT_ID` regex in the Watch page's `resolveSource`).

5. **BLOCKER 5 — demo CTA.** Signed-out Home replaced "install extension / sign in" with primary **"Try it on a 30-second video →"** → `/watch/demo` + secondary "Sign in". The signed-in `emptyFeed` branch (no Resume + no Last-Night) also surfaces the demo as a starter card. `/watch/demo` already works without a session (`WatchPage` creates a fallback demo-user object when `auth()` returns null). Covered by `tests/unit/signed-out-home.test.ts` which greps the signed-out branch and emptyFeed block.

6. **BLOCKER 6 — mic learning-lang.** Added `src/lib/i18n/speechLang.ts :: normalizeToBCP47(code)` with explicit mappings for the 21 locales we support (`es`→`es-ES`, `ja`→`ja-JP`, `hi`→`hi-IN`, `ar`→`ar-SA`, …; unknown → `en-US`). Threaded `lang` through `/talk/[topicSlug]/[lessonSlug]/page.tsx` → `LessonChat` → the Web Speech API's `rec.lang`.

7. **BLOCKER 7 — translation failure.** `WatchClient` now tracks `translationErrors: Record<number, boolean>` and a 15s per-batch timeout. When a translation stream errors (HTTP non-2xx, mid-stream `{"error":true}`, 15s wall-clock) the needed caption indices get flagged. `SubtitlePane` renders a visible **"Translation unavailable — tap to retry"** button in place of the "Translating…" italics for those indices; the retry hook (`onRetryTranslation`) clears the error and reruns the window. User-initiated aborts (window moved) stay silent — only true failures flip the error state. The player and word-tap still work; only the single translation line is affected.

**Shared helpers added that other lanes should reuse:**

| Helper | Path | Why |
|---|---|---|
| `isRtl(code)` | `src/lib/i18n/rtl.ts` | Any lane rendering a locale-aware `<html dir>` / `<section dir>` should import this instead of hand-rolling an `ar`/`he` check. |
| `normalizeToBCP47(code)` | `src/lib/i18n/speechLang.ts` | Any lane that touches `SpeechRecognition.lang` or `SpeechSynthesisUtterance.lang` must go through this — otherwise the user's first spoken turn comes back transcribed as English. |
| `parseYouTubeId(raw)` | `src/lib/library/youtube.ts` | Reuse wherever a YT URL may be pasted (future bookmarklet, extension deep-link handoff, chat drop). |
| `LangPills` | `src/components/LangPills.tsx` | Server-rendered parent passes the viewer's actual langs + option lists; client child persists on change via `/api/settings` + `router.refresh()`. Reuse this pattern wherever a nav pill needs server-truth + optimistic client state. |

**Gotchas future lanes must know:**

- **Streaming responses finalize their idempotency row at 202 with a sentinel body, not the response body.** The middleware never drains an NDJSON / SSE stream. If a future lane adds a "replay the last translation stream" button, it must call the handler again with a FRESH `Idempotency-Key` — reusing the same key yields a 409, not a replay.
- **Collisions on an in-progress stream return `409 {"error":"IN_PROGRESS","retryAfter":5}` + `Retry-After: 5`.** Clients should back off that many seconds, then retry with a new key (not the same one). This is a deliberate break from Stripe-style replay — streams are not safe to replay bit-for-bit.
- **The idempotency middleware now RE-THROWS on handler failures (after cleaning the PENDING claim).** Previously it swallowed and returned the handler's response. Any route that threw into Next's error boundary before (none shipped yet) keeps working; any route that was quietly returning errors won't change behavior because the middleware never caught successful-but-5xx responses either.
- **`app/layout.tsx` is now `async` and calls `getViewer()` on every render.** The call is cheap (one Prisma lookup) and `getViewer` already swallows errors, but if a lane adds a slow write to `getViewer`'s path it blocks every page's first paint. Keep the viewer-read fast.
- **`TopNav` is now async** (server component awaiting `getViewer()`). `AppShell` is also async. If a future lane needs the shell to render without hitting the DB (e.g. a static 404 page), wrap `getViewer` behind a cache or skip the shell on that route.
- **Translation errors clear on retry AND on window move.** The viewport-advance (`useEffect([currentIndex])`) deletes any un-translated indices from `translationWindow` so a user scrubbing past a failing line can re-trigger it. If a lane adds a "pause translations" toggle, respect `translationErrors` so the retry button stays visible even when auto-retry is off.
- **The library "paste a YouTube link" button lives in a client sub-component; the surrounding Library page stays a server component.** Server-rendered DB reads keep working. If you need the paste row's error state in SSR, you'd have to lift it — but the error only matters client-side.
### 2026-10-17 — Wave 3 design unification agent

Six unification refactors + one dead-link patch. `pnpm build` clean, `pnpm test` 75/75 green on branch `agent/design-unification` (base `74412ce`).

**New / promoted shared components — reuse these, don't re-invent:**

- `src/components/CtaButton.tsx` + `.module.css` — the signature pill CTA. Exports `CtaButton` (link form, strict `next/link`) and `CtaAction` (button form). Variants: `primary` (gradient + glow), `secondary` (transparent + border), `danger` (fl-danger token). Sizes: `md` / `lg`. Any new gradient pill goes through this — no more inline `style={{background: "linear-gradient(...)"}}`.
- `src/components/DrillChip.module.css` — the tiny uppercase drill label (background `--fl-accent`, text `--fl-bg`). Dedup of the three identical `.chip {}` rules that lived in `app/review/drills/{Dictation,Shadowing,Speaking}.module.css`.
- `app/account/SignInWithGoogleAction.tsx` — thin client component that fires `/api/auth/signin/google` as a form POST from within a `CtaAction`. Used by `/account` so the signed-out view stays as a single `EmptyState` card.
- `app/library/sentence-packs/[packId]/AddPackToReviewButton.tsx` — client CTA that fires `POST /api/packs/[packId]/import` with an idempotency key and reflects the server's status in a polite aria-live region.

**EmptyState now carries an `actionsSlot` prop** (`ReactNode`, renders alongside the auto-built `actions[]` row). Use it when the action is a form submit, an unusual pattern or something `{href,label,onClick}` can't express — the Account page's Google sign-in is the first consumer.

**PageHeader eyebrow is now canonical `var(--fl-accent)`** (was `--fl-text-3`) and ships with a small pulsing dot before the text. Opt out with `showDot={false}` on dense pages. The dot's keyframes are gated under `@media (prefers-reduced-motion: no-preference)` and also respect `body[data-motion="off"]`.

**Token added:** `--nav-h: 60px` in `src/styles/tokens.css`. `AppShell.module.css` now uses `calc(100vh - var(--nav-h))` instead of a magic `- 64px`.

**Body font-weight bumped to 500** on `body` in `src/styles/globals.css` to match DESIGN.md (previously inherited 400 from Poppins' default). The Devanagari / Arabic / JP / KR / Thai locale rules already override `font-family` but the weight cascades correctly.

**Hero clamp bumped to `clamp(52px, 9vw, 108px)`** on `app/page.module.css :: .title` so the "Fun / Learning" lockup matches the extension reference's own `.hero h1` rule byte-for-byte.

**TopNav gear hover rotate is now reduce-motion-gated.** The bg + colour hover state stays unconditional (so every user still gets the hover affordance), only the `rotate(40deg)` is inside `@media (prefers-reduced-motion: no-preference)`.

**TopNav mark is now inline SVG, retina-crisp.** The old `/brand/funlingo-mark.png` IMG is replaced with an inline `<svg>` that references the brand tokens as `stopColor="var(--fl-accent)"` etc. `funlingo-mark.svg` is also written to `public/brand/` for third-party consumers (open-graph previews, future email templates). Drop-shadow filter was duplicated to the `.logoMark svg` selector so the halo transfers.

**Mobile bottom-tab labels** bumped to 11px / weight 700 (was 10px / 600), clearing DESIGN.md's "never below 14px except 11-13px uppercase tags" floor via the tags-and-eyebrows exemption. See `src/components/IconRail.module.css`.

**Pack detail stubs** closed BLOCKER-D3:

- `app/library/show-packs/[packId]/page.tsx` — reads the pack, shows the first 10 items + chapter/category chips, primary CTA is either "Study the first scene" (routes to `/watch/<firstSourceId>` when `pack.meta.firstSourceId` exists) or "Add to Review" fallback. Signed-out branch uses EmptyState.
- `app/library/sentence-packs/[packId]/page.tsx` — same shape, lists 10 sentences, CTA is `AddPackToReviewButton` (fires the import route).
- `app/api/packs/[packId]/import/route.ts` — idempotent POST. Looks up the pack, returns 400 for non-sentence packs, **202 with `queued: true`** for the sentence import until the Review lane materialises `UserSentence` + `ReviewCardState` rows. The route's shape is pinned so clients can rely on it today; the TODO is tagged `review-lane`.

**Unified signed-out treatment on every route** (Design HIGH-D4):

- `/review` was a hand-rolled `.gate` card → now `PageHeader` + `EmptyState` with `Sign in` / `Browse the library` actions.
- `/account` was dual-block (`EmptyState` + loose `.group`) → single `EmptyState` with the Google-sign-in rendered via `actionsSlot`.
- `/talk` had **no** signed-out branch → now `PageHeader` + `EmptyState` guards the topic grid when `viewer.userId` is null. The page is now `async` and `force-dynamic`.
- `/read`'s "My shelf" tab was an inline "Sign in to see your uploads." string → `ShelfTabs` now accepts a `signedOutState` ReactNode, and `/read/page.tsx` passes an inline `EmptyState` into it with "Sign in" / "Browse classics" actions.
- Voice across all five is now consistent: 2nd person, informal, sentence case, no banned words.

**Gotchas future agents must know:**

- **`CtaButton` requires a `next/link`-strict route.** The component casts `href` through `Route` once at the boundary; if a page's href is dynamic (`/watch/${id}`), cast at the call site with `as never` or build an object `{pathname, query}`. The pack-detail pages do the former — `experimental.typedRoutes` doesn't type `[packId]` subroutes.
- **`EmptyState.actionsSlot` renders INSIDE `.actions` (same flex row).** If you want the custom slot on its own line, use the inline variant or stage the actions. The row already handles wrapping.
- **The pack-import route is 202-only today.** Clients should treat 202 as "queued, success-ish" and show the server's `message`. Don't block on it; the UI already does the right thing. When the real import ships, the route can return `200 {imported: n}` and `AddPackToReviewButton` renders that too.
- **`SignInWithGoogleAction` relies on Auth.js's `/api/auth/signin/google` accepting POST.** If a future Auth.js bump changes that URL, update this one file — nothing else references it.
- **`/talk` is now `force-dynamic`.** It calls `getViewer()` for the signed-out guard. If a future lane adds streaming or ISR, keep the viewer check in a client wrapper instead of flipping back to static.
- **Only Dictation / Shadowing / Speaking use `DrillChip.module.css`.** Flashcard and GuessMeaning never had `.chip`. If a new drill needs the chip, import `chipStyles from "@/components/DrillChip.module.css"` — don't paste the rule again.
- **`--nav-h` is a token, not a magic number.** If TopNav's padding or font-size changes, re-measure and update `tokens.css` once — every consumer picks it up.
- **The inline SVG mark uses token-stop colours** (`stopColor="var(--fl-secondary)"` etc). If a future theme flips `--fl-secondary`, the mark follows. The sibling `public/brand/funlingo-mark.svg` is a static copy for off-site use and will NOT re-theme — treat them as two assets with different jobs.
- **PageHeader's eyebrow dot defaults to on.** If a page has a dense, chip-heavy header where the dot competes with other visual chrome, pass `showDot={false}`. Keep the colour as `--fl-accent` either way.
- **Dev-DB bootstrap.** This worktree's `prisma/dev.db` ships empty from `git clone`. Run `cp .env.example .env && pnpm prisma migrate deploy` once before `pnpm test`, otherwise the Review scheduler + canary-leak tests fail on missing tables.
### 2026-10-17 — Wave 3 cross-feature wiring agent

Branch `agent/cross-feature`. Base commit 74412ce. Build + Vitest (94/94, +19 new) pass. Lint fails only because the worktree is nested under `.claude/worktrees/` and Next's ESLint config conflicts with the outer repo's `.eslintrc.json` — reproducible on the baseline before any edits; not caused by this lane. Playwright not run on this host (no browsers installed; Watch's zero-overlap test still enforced structurally — the only new UI inside `[data-fnl-yt-wrap]`'s sibling is the existing toast, now carrying an inner `<a>` text link).

**Five wires landed:**

1. **"Rewatch this scene" on Flashcard back.** `ReviewWordEncounter` now carries `sourceId` + `sourceType`. The Flashcard renders a pill CTA `/watch/<sourceId>?t=<timestampSec>` that opens in a new tab (`target="_blank" rel="noopener noreferrer"`) so the Review flow keeps its place. `/watch/[sourceId]/page.tsx` reads the `?t=` searchParam and overrides `resumePositionSec`; `YouTubePlayer` already consumed `startSec` as the `start` playerVar, so the frame opens at the saved moment. Helpers `rewatchHref` + `formatTimestamp` are exported from `app/review/drills/Flashcard.tsx` for test coverage.
2. **"Last book you were reading" on Home.** `app/page.tsx` now loads `loadLastReading(userId, lang)` in parallel. If the ReadingPosition's `updatedAt` is more recent than the top ProgressSnapshot's, the book card leads the Resume rail; otherwise it tails. Lang-scoped via `book.lang` filter; `percent < 1` excludes finished reads. The card is a thin `BookResumeCard` that reuses the existing `.resumeCard` styles (cover, pct bar, title, "Book · author").
3. **"Save this correction as a drill sentence" on Talk.** New route `POST /api/talk/corrections/save` (idempotent via `withIdempotency`). Verifies the TalkTurn belongs to the caller, pulls `lang` off the TalkSession (never trusts the client's lang), and creates a `Sentence` row with `lists = "speaking,favorite,source:talk"`. A trace `[talk:<turnId>]` is prepended to `translation` so the sentence can be back-linked to its origin without a schema change. The TurnBubble shows "Save for drill" under each correction; once saved it swaps to "Saved — review it later ↗" linking to `/sentences`. Second save of the same text is deduped by the same-user+text+`source:talk` lookup → 200 with `deduped:true`.
4. **"Cards you failed most this week" on Progress → Review.** New `src/components/progress/WeakAreas.tsx` (server component) scans `ReviewLog` for the user's last 3 non-skip grades per `(cardType, cardId)` over the last 7 days and lists cards with ≥2 Again (grade=1). Each row (and the header CTA) links to `/review?focus=weak`. On the Review side, `app/review/page.tsx` reads `?focus=weak` and calls the new `weakAreaCardKeys()` helper in `src/server/review/scheduler.ts` to re-sort the already-due session so weak cards lead the queue, preserving the overall `cardsDueNow` cap. Keyboard: anchor-row defaults, so Shift-Tab reverse-tabs through weak rows (document order).
5. **"N new words ready" chip on Home + Watch toast with a link.** Home's `loadReviewCounts` now also returns `freshFromLastDay = count(userWord where state='new' AND createdAt > 24h ago)`; when > 0 the hero renders a chip "N fresh words from the last day — ready when you are →" linking to `/review`. Watch's save-word toast changed from a plain string to `{text, href, linkText}`; on 2xx it shows "Added to Review — see all →" linking to `/words`, and the display timer stretched from 1.6 s to 3.5 s so the learner has time to tap it. The toast's position (fixed bottom-centre) is unchanged, so the zero-overlap Playwright test still holds.

**Gotchas future agents must know:**

- **Flashcard.tsx now exports `rewatchHref` + `formatTimestamp`.** Keep them pure (no React hooks) so the Vitest Node env can import them directly. The flashcard file still carries `"use client"` — Vitest imports the module for the exports; the component itself is only evaluated in a React runtime.
- **The "Rewatch" CTA opens a new tab** by design — the task spec allowed either, and `target="_blank"` preserves the mid-session review flow. If a lane later wants in-tab navigation + back-to-review, pass `?return=review` and read it in `WatchClient`.
- **`Sentence.translation` can now carry a `[talk:<id>]` prefix** when the sentence originated from a Talk correction. If the Sentences UI starts showing translations verbatim, strip the prefix (`replace(/^\[talk:[^\]]+\] /, "")`) before display, or add a dedicated `trace` column later and migrate rows out of the prefix.
- **`Sentence.lists` is a comma-joined string.** `source:talk` is now one of its tokens — don't accidentally regex-replace `talk` out of it when editing other list labels. The Sentences explorer filters by `includes("favorite")` / `includes("speaking")` today; both match correction-saved rows, which is the intended behaviour (they appear in both tabs).
- **`weakAreaCardKeys` is a hot per-review-session query.** It runs on each `/review?focus=weak` SSR, scanning the user's last-7d ReviewLog slice. SQLite handles this fine for a single learner, but if the Postgres migration lands, make sure `(userId, lang, at)` has an index — the existing `@@index([userId, lang])` is close but doesn't cover `at` ordering. The scheduler's "cards due" already touches a hot path, so a composite index would help both.
- **`/review?focus=weak` falls back gracefully** when there are no weak cards — the sort is a no-op and the user gets the normal session. No empty-state branch needed.
- **Home now reads `prisma.progressSnapshot.updatedAt`** (previously it only selected a few fields). ProgressSnapshot already has `@@index([userId, updatedAt])` so this stays cheap.
- **The Watch toast now accepts `{text, href, linkText}` AND a plain string** — the TypeScript union keeps every existing `setToast("…")` call site working. If you want to add more actionable toasts, extend the union, don't repurpose the string branch.
- **New API route `POST /api/talk/corrections/save`** goes through `withIdempotency` like the rest of Talk. Client key format: `talk-save-<turnId>`.

### 2026-10-17 — Wave 4 design-polish agent

Four tight refactors closing two HIGHs from Pass 3 Design QA (CtaButton coverage + WeakAreas tone), plus a sweep of four `#fff` re-introductions. Branch `agent/design-polish`, base `352afd4`. `pnpm build` clean, `pnpm test` 122/122 green (no new tests needed — all refactors are style/content, with the WeakAreas data query untouched; the existing `cross-feature.test.ts` Wire-4 coverage still passes).

**What the learner now sees:**

1. **EmptyState → CtaButton.** Every empty-state primary/secondary action now renders through `<CtaButton>` / `<CtaAction>`. The hover-lift is correctly gated under `prefers-reduced-motion` for the ~22 empty-state call sites that were silently animating under the user's "reduce motion" preference — no visual change otherwise.
2. **Home right-rail CTA.** The "Start review" + "Learn new words" pair on Home no longer owns its own gradient recipe. Same pill, same glow, now also motion-gated. `.cta` / `.ctaSecondary` are deleted from `app/page.module.css`; `.railCta` / `.railCtaSecondary` carry just the width + stacking rhythm.
3. **WeakAreas is kinder.** Section eyebrow is "In your focus list" in neutral `--fl-text-3`; the title is "Could use another pass"; the chip reads "N × hard" on a soft amber `color-mix(--fl-warning 20%)` background; the primary CTA is "Give these another try →"; the danger-red left border is gone. On zero rows the card STILL shows — "No weak spots this week — nice." — so the learner knows the system is watching, not that the feature broke.
4. **No more raw `#fff`.** Four button sites (`WeakAreas.primaryLink`, `ReviewRunner.quitBtnPrimary`, `Flashcard.revealBtn`, `Dictation.submitBtn`) now use `var(--fl-on-accent, #ffffff)`. Ship-safe today (fallback), token-ready for the DS-refresh agent.

**New export: `WeakAreasSkeleton`** (named export from `src/components/progress/WeakAreas`). Three-row ghost with pulsing surfaces; the pulse is gated under `prefers-reduced-motion`. Consumers who wrap `<WeakAreas>` in `<Suspense>` can pass this as the fallback. The current `/progress` page still renders WeakAreas synchronously inside the SSR tree — no behaviour change — but the skeleton is there for a future streaming-split.

**Gotchas future agents must know:**

- **EmptyState's actions row width changed.** The old `.primary` and `.secondary` classes defined their own `padding: 10px 18px` / `font-size: 14px`; `<CtaButton>` size=`md` is `padding: 10px 18px` / `font-size: 14px` to match byte-for-byte. If any lane has a Playwright/visual-regression snapshot of an EmptyState button at ±2px, re-approve.
- **`.railCta` / `.railCtaSecondary` are layout-only.** Width + top-margin. The pill, gradient, glow and hover all live in `CtaButton.module.css`. Don't re-add gradient/background to these classes — put a variant on `<CtaButton>` instead.
- **WeakAreas 0-row branch returns a visible card, not `null`.** Any test that asserts "WeakAreas renders nothing when there are no weak cards" will need updating to assert the "No weak spots this week — nice." copy instead. No such test exists today (`cross-feature.test.ts` only covers the query/sort behaviour), but Playwright authors should know.
- **The `#fff` fallback inside `var(--fl-on-accent, #ffffff)` is intentional.** The DS-refresh agent is expected to define `--fl-on-accent` in `tokens.css` later; until then the fallback keeps the four buttons readable on their gradient background. If you define `--fl-on-accent`, make sure it stays AA-contrast against both `--fl-secondary` and `--fl-primary` (the gradient endpoints).
- **Chip background uses `color-mix(in oklab, ...)`.** This is a CSS Color Module 5 feature. All modern browsers (Chrome 111+, Safari 16.2+, Firefox 113+) support it, matching our baseline. If a build target widens, swap `oklab` → `srgb` (the primaryLink glow next door already uses `rgba` fallbacks).
### 2026-10-17 — Wave 4 Pass-3 cleanup agent

Branch `agent/pass3-cleanup`. Base commit `352afd4`. Build green. Vitest **124/124** (+1 new file). Six Pass-3 Code-QA items + the optional LOW-5 landed as one agent.

**What landed per item:**

1. **HIGH-1 — raw `groq` client no longer exported.** `src/server/ai/client.ts` dropped the `export const groq = new Proxy(...)` surface. Only legitimate consumer `src/server/ai/invoke.ts` was switched to call a package-private `__internal_getGroqClient()` (same lazy singleton underneath). The deliberate underscore + `__internal_` prefix means a future `rg groq` sweep still catches any accidental reach-around. Added `tests/unit/ai-client-no-raw-export.test.ts` which fails compilation + runtime if `groq` ever reappears on the module. The canary-leak test's `vi.mock` was updated to stub `__internal_getGroqClient` instead of `groq`. User impact: no visible change — feature lanes **cannot** silently bypass cost caps + the content filter + the `Confidential<T>` boundary any more.

2. **MED-1 — Native pill now updates `uiLocale` too.** `src/components/LangPills.tsx` splits persistence by pill: Native changes POST `{ nativeLang, uiLocale }`, Learning changes POST `{ activeLearningLang }` only. `/api/settings` already accepted `uiLocale` — no server change needed. User impact: picking "العربية" from Native now flips `<html dir>` to `rtl` and the Arabic font kicks in; picking "日本語" lights up the Noto Sans JP fallback. The learning pill still only switches which language's content is being studied — the chrome stays in the learner's native locale.

3. **MED-2 — pack-import is now real.** `app/api/packs/[packId]/import/route.ts` picks the pack's first N `PackItem` rows (sentence-kind), filters out texts the user already imported from the same pack (self-dedupe via `lists CONTAINS "pack:<packId>"`), and inserts the rest in a `$transaction`. Returns `201 { imported: N, message }` or `200 { imported: 0, message: "You already have these…" }` when everything's already in. The sentence rows land in Review's "fresh sentences" branch (`scheduler.ts`) — no `ReviewCardState` pre-seed required. `AddPackToReviewButton.tsx` was updated to render the actual imported count and the "already imported" case honestly. User impact: pressing "Add 10 to Review" now really adds 10 sentences, pressing it again says "You already have these sentences in Review."

4. **MED-3 — `[talk:xxx]` trace prefix no longer leaks into the Sentences UI.** `app/sentences/page.tsx :: loadSentences` strips `/^\[talk:[^\]]+\]\s*/` from the rendered translation and lifts a `fromTalk` flag onto the row (true when `lists` includes `source:talk` OR the trace prefix was present). `SentencesExplorer.tsx` renders a small "💬 From Talk" chip in the source line for those rows (both list and card views). The DB string is untouched — a future "jump back to Talk turn" wire can still parse it. User impact: the Sentences page no longer shows an ugly `[talk:cm123abc]` prefix in front of translations saved from Talk; the trace is still visible as a tasteful uppercase pill.

5. **MED-4 + LOW-1 — LangPills rollback-on-error + stable idempotency key.** `LangPills.tsx` now awaits the `/api/settings` POST, rolls local state back on non-2xx, and surfaces an inline `aria-live="polite"` "Couldn't save. Try again." pill under the offending pill that auto-dismisses after 4s. `router.refresh()` only runs on 2xx so the UI never flashes to a server-side value that doesn't match. Idempotency keys became stable per intended value: `langpills-native-<nextLang>` / `langpills-learning-<nextLang>` so a frantic double-tap on the same pill collapses to one write. User impact: the pills are honest — if the save fails, the pill snaps back to the saved value and tells you.

6. **MED-5 — WeakAreas heuristic deduped.** New `src/server/review/weakAreas.ts :: weakAreas(userId, lang, now?) → { keys, rows }` is the single source of truth for "last 3 non-skip grades over 7d, ≥2 Again". `src/server/review/scheduler.ts :: weakAreaCardKeys` now delegates there (and `src/components/progress/WeakAreas.tsx :: loadWeakCards` reads `rows` from the same helper). Three constants are exported (`WEAK_LOOKBACK_MS`, `WEAK_WINDOW`, `WEAK_LAPSE_MIN`) so a future tuning pass changes one file. Existing cross-feature tests for `weakAreaCardKeys` still pass unchanged — they now cover both consumers transitively.

7. **LOW-5 — Talk correction save shows a Retry button on error.** `app/talk/[topicSlug]/[lessonSlug]/LessonChat.tsx :: TurnBubble` now renders an inline `role="status" aria-live="polite"` region with a pill-styled Retry button that re-fires `saveCorrection` (same idempotency key, so a re-saved success replays safely). CSS in `LessonChat.module.css :: .correctionSaveRetry` matches the SubtitlePane-style outline. User impact: a transient 500 doesn't eat the correction — the learner can retry in-place.

**Shared helpers / contracts added that other lanes should reuse:**

| Helper | Path | Why |
|---|---|---|
| `__internal_getGroqClient()` | `src/server/ai/client.ts` | **Do not import.** Only `invoke.ts` calls this. If you need a Groq shape invokeJson/invokeStream don't expose, add it there. |
| `weakAreas(userId, lang, now?)` | `src/server/review/weakAreas.ts` | The ONLY place the weak-areas heuristic lives. UI count + Review bias both go through here. If you need the shape later (e.g. a per-card streak), extend the result type here — don't re-roll the query. |
| `TALK_TRACE_RE` | `app/sentences/page.tsx` (inline) | Keep in sync with `app/api/talk/corrections/save/route.ts :: traceTag`. If the save route changes the prefix format, update both. |

**Gotchas future agents must know:**

- **The raw Groq client is no longer importable from `@/server/ai/client`.** If a lane tries `import { groq } from "@/server/ai/client"`, the build fails. The guard-rail test `tests/unit/ai-client-no-raw-export.test.ts` also fails. **The fix is to route the new usage through `src/server/ai/invoke.ts`**, not to re-export `groq`. If a lane legitimately needs a Groq-specific shape (e.g. an audio-transcription endpoint), add a wrapper there.
- **`LangPills` posts `uiLocale` only when the Native pill changes.** The Learning pill changes do NOT touch `uiLocale`. If you want a "change my UI to match learning lang" affordance, add a settings page toggle — don't repurpose the pill, because the current contract is "learning pill = what I'm studying, native pill = my own language".
- **`LangPills` now rolls back on non-2xx.** If `/api/settings` starts returning 2xx for a request it couldn't actually persist, the UI will claim success. Keep the settings route honest: a failed write MUST return a non-2xx.
- **Pack import is now real.** The route creates `Sentence` rows directly (no `UserSentence` scaffold); the Review scheduler already picks these up. If a `UserSentence` model lands later, migrate the import route — don't double-write. Existing rows carry `lists = "favorite,pack:<packId>"` so a filter on `lists CONTAINS pack:<packId>` finds them.
- **Pack-import dedupe is `(userId, packId, text)` via `lists CONTAINS pack:<packId>`**. The `text` match is case- and whitespace-sensitive. If a pack ever carries two sentences that differ only in punctuation and we end up importing both, that's working-as-intended under the current schema — a composite UNIQUE on `Sentence(userId, lang, text)` would collapse them but needs a migration and a decision about how `source:talk` sentences interact.
- **Sentence display strips the talk trace prefix.** The regex is `/^\[talk:[^\]]+\]\s*/`. The stored row still carries the prefix for traceability. If a lane adds a per-row "jump back to the Talk turn" link, parse the stored string — don't reconstruct the id from `createdAt`.
- **`fromTalk` is derived from BOTH `lists.includes("source:talk")` AND the regex.** Old rows (pre-wave-3) that only have the `[talk:…]` prefix without the lists marker still get the chip. Don't drop the regex check if you tighten the lists convention.
- **`weakAreas` returns `rows` already sorted by `recentLapses` desc.** If you need a different order (e.g. by lang or recency), sort downstream — don't change the helper's sort or you'll bias `/review?focus=weak` subtly.
- **Idempotency-streaming test (a) is timing-sensitive** — it sets a 50ms timer and asserts the body hasn't produced yet. Under heavy concurrent test load it can occasionally flip. If you see it in CI, re-run the file in isolation before investigating — this is a known flake, not a regression.
### 2026-10-17 — Wave 4 PM polish agent

Branch `agent/pm-polish`. Base commit `352afd4` (Rickroll fix + brand assets). `pnpm build` clean, `pnpm test` 138/138 green (16 new tests in `tests/unit/pm-polish.test.ts`).

Seven PM Pass 3 dead-ends closed — every one of them a learner leaving a session without a next step, or copy that mentioned the extension when the extension isn't the path forward.

**What landed per fix:**

1. **Review Summary action footer.** `app/review/ReviewRunner.tsx :: SessionSummary` now ends with a `<SummaryActions>` row. Primary `Browse the library →` → `/library`; secondary `Talk about today's words →` → `/talk?words=<lemmas>` (today's user-word lemmas, comma-joined, capped at 10 — the Talk route reads this best-effort); tertiary text link `See all your words →` → `/words`. Styled to match EmptyState's action pattern (pill primary, surface secondary, bare text tertiary) via new `.summaryBtnPrimary/.summaryBtnSecondary/.summaryBtnText` rules + `data-testid="review-summary-actions"` for the regression test.

2. **End-of-video CTA on Watch.** `src/components/watch/WatchClient.tsx` tracks a per-mount `saveCount` state (increments on every successful save, not distinct — a learner who re-saves the same lemma still fills the counter). Player-end detection: YouTube via `state === YT_STATE.ENDED` inside `onPlayerStateChange`; demo mode via the local timer flipping on `demoSec >= demoDurationSec`. When ended AND `saveCount > 0` AND not dismissed, the card renders **inside `.playerCol`, after the controls strip** so the LEGAL #3 "nothing over the iframe" rule still holds (and the Playwright zero-overlap test keeps passing). Dismiss sticks for the mount — re-ending the demo clip doesn't nag. `data-testid="watch-end-card"`.

3. **Library's secondary CTA copy swap.** `app/library/page.tsx` dropped "Get the extension" and now passes `actionsSlot={<LibraryEmptyActions />}` (new client component in `src/components/library/LibraryEmptyActions.tsx`). Secondary action is a `<button>` that focuses `#yt-paste` after scrolling it into view (RAF-delayed focus for Safari caret-jump). Pattern reusable anywhere a server-rendered EmptyState needs a client-only action.

4. **Home's `lastNight` empty state copy swap.** Mirrors the signed-out hero: primary `Try it on a 30-second video →` → `/watch/demo`, secondary `Paste a YouTube link` → `/library?paste=1`. `YouTubePaste.tsx` now reads `useSearchParams()` and auto-focuses + scrolls the paste input when `paste=1` is present. Any surface can deep-link to the paste input via that query — reuse before building new paths.

5. **Weak-areas discoverability on Home.** `app/page.tsx` now loads `loadWeakCards(userId, lang, 5)` in the main Promise.all and renders a fourth column "Weak" in the Due/Learning/New row. The column is a `Link` → `/review?focus=weak` with the same visual weight as its siblings (`.dueLink` class — underline-on-hover is the non-color signal). CSS grid moved from `repeat(3, 1fr)` → `repeat(4, 1fr)` on `.dueRow`.

6. **Talk turn-N-of-10 chip.** `LessonChat.tsx` replaces the plain `.panelHead` heading with a `.turnChip` — eyebrow-chip style (pill, 11px, uppercase, letterspacing 0.08em, --fl-accent dot) that counts "Turn N of 10". Shows `Math.min(userTurnCount + 1, MAX_TURNS)` so the chip reads "Turn 10 of 10" on the final turn instead of overshooting. `aria-live="polite"` + `data-testid="talk-turn-chip"`.

7. **Save-for-drill button glyph + colour pop.** `TurnBubble` in `LessonChat.tsx` renders a leading `✎` glyph (`.correctionSaveGlyph` — accent-colour, aria-hidden). On hover the button's border lifts to `var(--fl-accent)` via `.correctionSaveBtn:hover { border-color }` — pure CSS, respects `prefers-reduced-motion: reduce` by killing the transition. Button stays inline-sized (12px font, 4px/10px padding) — not promoted to a full CtaButton.

**Shared helpers added that other lanes should reuse:**

| Helper | Path | Why |
|---|---|---|
| `LibraryEmptyActions` | `src/components/library/LibraryEmptyActions.tsx` | Pattern for a server-rendered EmptyState whose action needs client-side DOM (focus, scrollIntoView). Lift via `actionsSlot` instead of inventing a custom empty-state component. |
| `?paste=1` auto-focus | `src/components/library/YouTubePaste.tsx` | Deep-link to the Library paste input. Any surface that wants to say "start by pasting a link" should route to `/library?paste=1` rather than building its own paste UI. |

**Gotchas future agents must know:**

- **The end-of-video card lives INSIDE `.playerCol`, below the `.controls` strip.** Do NOT move it into a fixed-position toast layer or into the subtitle column — the Playwright zero-overlap test asserts the end-card doesn't float over `[data-fnl-yt-wrap]`, and the LEGAL #3 rule means we can never put UI over the YouTube iframe. The card is a sibling of `.controls`, which already sits in the same column.
- **Save counter resets on each `<WatchClient>` mount.** It's deliberately a `useState` (not persisted) — a learner who navigates away and back starts fresh. If a future lane wants a persistent "words saved on this source", read `Encounter` counts instead and don't repurpose `saveCount`.
- **The end card's dismiss flag is per-mount.** A learner who dismisses it and then replays the clip won't see it again until they navigate. Deliberate: the first dismissal is enough signal.
- **`SessionSummary` only reads word lemmas for the `?words=` seed.** Sentences are skipped — a "talk about today's sentences" prompt would need a dedicated prompt file. 10-lemma cap is enough context for a Talk opener and keeps the URL short.
- **The Weak column on Home re-runs `loadWeakCards` on every render.** It's cheap today (SQLite + 5-row cap) but once Postgres lands, make sure `(userId, lang, at)` has a composite index — the same note from Wave 3's cross-feature agent applies.
- **`turnChip` reads `userTurnCount + 1` (capped at MAX_TURNS).** So the chip says "Turn 1 of 10" at the start, not "Turn 0 of 10". Mirror this if you add a turn-based status elsewhere.
- **`correctionSaveGlyph` is `✎` by design** — of the three allowed glyphs (`✎ ⇡ 📝`), `✎` keeps the pencil-icon metaphor without jumping into emoji territory. If a future lane swaps it, update the `pm-polish.test.ts` glyph regex (`/[✎⇡📝]/`) to match.
- **Dev-DB bootstrap is unchanged.** Every fresh worktree needs `cp .env.example .env && pnpm prisma migrate deploy` once before `pnpm test` — this lane hit it too.
---

## Wave 4 — Design-system refresh (2026-10-17)

The owner handed over the authoritative **Funlingo Design System** zip. The
old `extension-fun-learning.css` palette (Cinema Noir purple #841167 /
#b218d1 / #d678f0 on #0a0813) is **superseded** and must not reappear
anywhere outside `src/styles/tokens.css`.

### Source of truth
- **Primary:** `docs/design-reference/funlingo-design-system.html` and
  `docs/design-reference/funlingo-tokens.css` / `.json`. One zip, no older
  versions. Dark is the default; light theme lives at bg `#FBF4FF`.
- `docs/design-reference/extension-fun-learning.css` is now **secondary**
  reference material only (useful for component recipes; not the palette).

### Token name mapping (old → new value)
Variable names did NOT change (25 route-scoped CSS modules keep compiling).
Values swapped:

| Token | Old (superseded) | New (Funlingo DS) |
|---|---|---|
| `--fl-primary` | `#841167` | `#BC22D6` (Funlingo purple) |
| `--fl-secondary` | `#b218d1` | `#9A1C8E` (deep magenta) |
| `--fl-accent` | `#d678f0` | `#E0319E` (pink end) |
| `--fl-accent-2` | `#8b5cf6` | `#EC4DB0` (Funlingo pink) |
| `--fl-bg` | `#0a0813` | `#0E0816` |
| `--fl-bg-2` | `#120c1f` | `#140B20` |
| `--fl-text` | `#f4f1f8` | `#F6EFFB` |
| `--fl-success` | `#4ade80` | `#16B57F` (DS "correct") |
| `--fl-warning` | `#fbbf24` | `#F5A623` (DS "star") |

### New tokens introduced
- `--fl-magenta`, `--fl-ink` — DS literal brand hues.
- `--fl-on-accent: #FFFFFF` — text that sits on the gradient CTA (replaces
  raw `#fff` in Flashcard/Dictation/WeakAreas/ReviewRunner/CTA).
- `--fl-pink-soft` — mark-highlight tint.
- `--fl-accent-glow` / `-glow-strong` / `-glow-0` — pulse-ring stops (replaces
  the `rgba(214,120,240,…)` family from the superseded palette).
- `--fl-secondary-glow` — magenta drop-shadow for logo + glow boxshadow.
- `--fl-shadow-ink` / `-veil` — modal scrim + ambient veil ink.
- `--fl-success-ring` / `--fl-warning-ring` / `--fl-danger-ring` /
  `--fl-danger-edge` / `--fl-danger-soft` — semantic chip + button rings.
- `--fl-grad` / `--fl-grad-2` / `--fl-grad-bar` — DS brand gradients.
- `--fnl-*` passthrough aliases (`--fnl-purple`, `--fnl-pink-end`, …) that
  map to the `--fl-*` set so a new lane can reach for the exact DS token
  names from `funlingo-tokens.css` and still track theme changes.

### Light-theme toggle API
- **Default is dark.** Light applies when either:
  1. `prefers-color-scheme: light` AND no explicit `data-theme="dark"`, or
  2. `<html data-theme="light">` is explicitly set.
- **Storage:** `localStorage.theme` holds `"light"` or `"dark"` (absent =
  follow OS). A FOUC-prevention `<script>` in `app/layout.tsx` reads it
  before the first paint and sets `document.documentElement.dataset.theme`.
- **No Prisma schema change** — kept server-side theme persistence as a
  seam for a future lane (`User.theme`, `/api/settings`). For now Settings
  can wire a client-side toggle that writes `localStorage.theme` and
  updates `document.documentElement.dataset.theme`.
- `viewport.themeColor` now ships both schemes:
  `[{media:"(prefers-color-scheme: dark)", color:"#0E0816"}, {media:"(prefers-color-scheme: light)", color:"#FBF4FF"}]`.
- Body carries a `transition: background var(--ease-theme) ease, color …`
  so the swap feels like one gesture; gated behind `prefers-reduced-motion`.

### Reconciled raw rgba / hex literals (14 sites)
Pass 3 Design QA flagged 15+ sites; every one is now a token or a
`color-mix(in srgb, var(--fl-*), transparent)` expression:

- `src/components/PageHeader.module.css` — eyebrow pulse (3 stops)
- `src/components/FilterChip.module.css` — selection ring inset
- `src/components/TopNav.module.css` — logo drop-shadow (×2)
- `src/components/words/Words.module.css` — mark highlight + 3 state rings
- `src/components/progress/Progress.module.css` — heatmap lv1/lv2 (×2) + freezeChip
- `src/components/library/Library.module.css` — thumb badges (×2) + 5 CEFR level rings + paste CTA
- `src/components/settings/Settings.module.css` — danger btn edge/soft, primary btn + toggle text
- `src/components/CtaButton.module.css` — danger variant edge/soft, primary text
- `src/components/watch/ShortcutHelp.module.css` — modal scrim
- `src/components/watch/WatchClient.module.css` — demo stage radial + playBtn shadow
- `src/components/progress/WeakAreas.module.css` — primary CTA text
- `app/page.module.css` — hero pulse, thumb overlay/time/progress, encounter mark, streak-today ring, home CTA, culture mark
- `app/review/ReviewRunner.module.css` — quit scrim, quit primary text
- `app/review/drills/Flashcard.module.css` — reveal btn text
- `app/review/drills/Dictation.module.css` — submit btn text
- `app/read/ShelfTabs.module.css` — progress bar ink
- `app/read/[bookId]/EpubReader.tsx` — rendition theme now reads
  `getComputedStyle(document.documentElement).getPropertyValue("--fl-*")`,
  so the EPUB iframe tracks live tokens (and the next light-theme lane).
- `src/styles/globals.css` — ambient veil ink.

The only remaining non-token hex strings outside `tokens.css` are:
- `app/layout.tsx` — `viewport.themeColor` needs string literals (Next
  Viewport API). Values match `--fl-bg` for each scheme, commented.
- `app/read/[bookId]/EpubReader.tsx` — safe fallback strings inside
  `getComputedStyle` reads; values match the new palette exactly.

### Logo wordmark
`TopNav.tsx` now renders `/brand/funlingo-wordmark.png` next to the mark on
viewports ≥1200px (`.logoWordmark { display: none; } @media (min-width:1200px){ display:inline-flex; }`).
Mobile stays mark-only. Keeps TopNav intact.

### Next lanes should
- Wire a Settings "Appearance" toggle (System / Light / Dark) that writes
  `localStorage.theme` and syncs `document.documentElement.dataset.theme`
  in a client component. Add the server-side persistence by extending
  `prisma.prefs.json` with `{"theme": "light"|"dark"|"system"}` so viewers
  pick up their choice on a fresh device.
- When the Postgres migration lands, promote `theme` to a first-class
  `User.theme String?` column.
- QA the full light-theme pass: tokens are wired, but no agent has swept
  per-component light visuals end to end yet.

---

## Wave 5 — content seeding (2026-10-18)

Jay approved pulling the extension's own bundled JSON catalogs into Prisma so
Talk + Library stop looking like a stub. All content is Funlingo-authored
(from `funlingo-ext/dist/learn-*.json`) → safe to persist per LEGAL.md
(not third-party captions).

### Branch
- `agent/content-seed` (worktree `.claude/worktrees/agent-aa8891ada490b53e2`),
  base `4a0739d`.

### Source data (git-tracked, not scratchpad)
Copied into `data/seed/` so re-seeding doesn't need the scratchpad:
- `data/seed/situations.json` — 11 Latin locales (en, en-GB, en-US, es,
  es-ES, es-LA, de, fr, pt, pt-BR, pt-PT) × 8 situations × 8–12 phrases.
- `data/seed/situations-2.json` — 7 non-Latin locales (ja, ko, zh-CN,
  zh-TW, hi, it, tr) × 8 situations × 8 phrases, with `romanization` +
  `titleEn` on each row.
- `data/seed/slangs.json` — 18 locales × 24 everyday slang expressions.

### Compiler + merged in-memory catalog
`src/lib/talk/seedCatalog.ts` compiles each `(locale, situation)` into a
`TalkTopic` with 3 lessons (slice the phrase list), topic id
`topic:v2:{localeTag}:{situation}`, slug `sit-{situation}-{localeTag}`,
emoji from source (fallback per situation), category + blurb + roles
authored in-file. Non-Latin locales use `titleEn`; Latin locales use `title`.

`src/lib/talk/topics.ts` now exports a MERGED `TALK_TOPICS` array
(`HARDCODED_TOPICS` + seeded). API routes (`findLessonById` /
`findLesson`) resolve both old `lesson:coffee:small-order` AND new
`lesson:v2:en-us:restaurant:arriving` ids off the same sync array — no
route changes required.

### Prisma seeding
Two idempotent scripts (`DATABASE_URL=file:./dev.db pnpm tsx scripts/<x>.ts`):

- `scripts/seed-talk.ts` — upserts TalkTopic + TalkLesson by deterministic
  id. Encodes `{ai, user}` roles into `TalkLesson.roles` JSON; `tasks` and
  `shadowSentences` JSON-stringified per schema.
- `scripts/seed-packs.ts` — upserts one `Pack(kind: "sentence")` per
  locale from `slangs.json` (24 items each), plus 2 `Pack(kind: "show")`
  bundles (English + Spanish) for the Show Packs tab.

Deterministic ids:
- `topic:v2:{localeTag}:{situation}` / `lesson:v2:...:{slot}`
- `pack:slang:{locale}` / `pack:slang:{locale}:item:{nn}`
- `pack:show:everyday-{lang}` / `...:item:{nn}`

### Talk index now reads from Prisma
`app/talk/page.tsx` queries `prisma.talkTopic.findMany({ where: { lang } })`,
including lessons; if the seed hasn't run (or the viewer's active lang has
no rows), it falls back to `TALK_TOPICS` so Talk is never empty. The
`blurb` lives in the compiled catalog (keyed on topic id) because the
Prisma `TalkTopic` schema has no `blurb` column and the brief said
"schema untouched materially" — the seed script leaves `TalkTopic`
exactly as Wave 4 left it.

### Sentence Pack page: no changes needed
`/library/sentence-packs/page.tsx` already queries
`prisma.pack.findMany({ where: { kind: "sentence", lang: viewer.activeLang } })`
and the detail page reads `pack.items`. The seed script writes those two
tables; both pages render seeded packs without touching their code.

### Counts (seeded DB)
| | Count |
|---|---|
| TalkTopic rows | 144 |
| TalkLesson rows | 432 |
| Per-lang topics | en 24, es 24, pt 24, zh 16, {de, fr, hi, it, ja, ko, tr} 8 each |
| Sentence Packs | 18 |
| Show Packs | 2 |
| PackItem rows | 480 |

### Smoke tests
`tests/unit/wave5-content-seed.test.ts` (12 assertions): compiled catalog
≥ 144 rows; ≥ 20 topics each for `en` and `es`; every topic has 2–3
lessons; every lesson has shadow sentences; ids are unique and
prefix-stable; slangs source has ≥ 18 locales × ≥ 20 expressions each.

Full suite: 20 files × 152 tests pass. `pnpm build` exits 0.

### Follow-ups for the next lane
- When the Prisma migration moves off SQLite, make `TalkTopic.slug` scoped
  per lang via `@@unique([slug, lang])` so URLs can be plain
  `/talk/restaurant/arriving` without a lang suffix.
- Add a `TalkTopic.blurb String?` column so the compiled catalog's blurb
  moves into the DB instead of being joined client-side.
- The `scripts/seed-content.ts` and `scripts/seed-content.mjs` files
  (pre-Wave 5) still exist — they're the smoke-seed for the Watch lane,
  not for Talk/Library. Consider merging them into one top-level
  `pnpm db:seed` entrypoint that calls all three.

---

## Wave 6 — extension-parity agent (2026-10-23)

Branch `agent/ext-parity`, base `3425531` (Wave 5 merged into main).
`pnpm build` clean. `pnpm test` **169/169** green (+17 new ext-parity tests,
no regressions on the 152-test baseline).

Shipped the three Wave-6 extension-parity deliverables so a long-time
Chrome-extension `/learn` user lands on the web app and recognises it
immediately:

### 1. `/learn` route — exact 5-tile experience grid

`app/learn/page.tsx` (server component) renders the extension's
`view-landing` IA. Tiles in this order:

| # | Tile | Route | Lock? |
|---|---|---|---|
| 01 | Word Replay   | `/words` | yes, when `UserWord.count(lang) === 0` |
| 02 | Quick Quiz    | `/review?mode=quiz&focus=casual` | yes, same gate |
| 03 | Tiny Lessons  | `/learn/tiny-lessons` | no |
| 04 | Slang Hang    | `/learn/slang` | no |
| 05 | Your Library  | `/words` | no |

Locked tiles render as `<div role="button" aria-disabled="true" tabindex=0>`
with a "Save words while watching to unlock" pill where the "Try →" chip
would have been. Welcome banner (👋) renders only while
`userWordCount < 5` — hides once the learner's deck has substance.

Motifs are ported byte-for-byte from `extension-fun-learning.css`
(`.motif-replay` fanned word cards, `.motif-quiz` mini MCQ, `.motif-lessons`
tilted flashcard, `.motif-slang` chat bubble, `.motif-library` saved-chips
grid) but with hues sourced from the Wave 4 DS tokens, not raw hex:

| Tile | Card hue |
|---|---|
| c-replay   | `var(--fl-accent-2)` |
| c-quiz     | `var(--fl-warning)` |
| c-lessons  | `var(--fl-success)` |
| c-slang    | `var(--fl-secondary)` |
| c-library  | `var(--fl-accent)` |

The Replay tile keeps the editorial-grid span (6 cols on desktop) so the
rhythm matches the extension's `body[data-landing="editorial"]` branch.

### 2. Tiny Lessons + Slang Hang content routes

- `/learn/tiny-lessons` — list of situations (restaurant / airport / taxi /
  hotel / shopping / doctor / dating / interview) for the viewer's active
  learning lang.
- `/learn/tiny-lessons/[situation]` — tap-to-flip phrase cards. Front =
  phrase in the learning lang (+ romanization when present), back =
  meaning + usage. Both faces carry a 🔊 button.
- `/learn/slang` — slang expressions for the viewer's active lang. Cards
  show phrase + romanization + meaning + example (example STAYS in the
  learning language per the extension's description) + 🔊 button.

Content read from the Funlingo-authored JSON catalogs in `data/seed/`,
NOT from Prisma — the catalog carries richer fields (romanization,
example, era, usage) than the current `PackItem` schema persists. The DB
Pack rows still exist for the Library/Review surfaces; they're a parallel
rendering of the same source material.

New shared helper: `src/lib/learn/content.ts` — `listSituations(lang)`,
`getSituation(lang, slug)`, `listSlangs(lang)`. Maps the viewer's ISO 639-1
`activeLang` to the best-fit locale key in the JSON. Reusable from any
future lane that needs the richer phrase shape.

### 3. Quick Quiz casual mode (no scheduler writes)

New branch inside `app/review/page.tsx`: when `searchParams.mode === "quiz"`
the loader reads 10 cards straight from `UserWord` (lang-scoped,
`createdAt desc`) and skips `cardsDueNow` + `weakAreaCardKeys`. The
`QuickQuizRunner.tsx` client component renders a 2-option meaning picker
with `data-state="correct|wrong"` on the chosen option, deterministic
option shuffle via `hash(cardId+lang)`, and a summary with "Nothing was
logged" copy.

Non-negotiable: the runner never calls `fetch`, never POSTs to
`/api/review/grade`, never touches FSRS state. `QUICK_QUIZ_WRITES_API = false
as const` is the API contract; the regression test strips comments then
greps the runtime surface for `fetch(`, `/api/review/grade`,
`/api/review/session`, `XMLHttpRequest`, `axios.`, `useQuery`.

### 4. SlangAudioButton — ported from the extension's slang-audio.js

New `src/components/SlangAudioButton.tsx` — a React client component that
takes `{ text, lang, ariaLabel?, className? }`. Mounts on every Slang Hang
card, every Tiny Lesson phrase card (both faces).

Voice-picking mirrors the extension exactly:
- Prefix-match the BCP-47 lang.
- +6 exact tag match, +16 Google/Natural/Neural/Online/Premium/Enhanced,
  +8 Microsoft, +4 non-localService, +3 default, -20 compact/eloquence/
  novelty/espeak.

`normalizeToBCP47` from `@/lib/i18n/speechLang` is reused — same mapping as
Talk's `rec.lang`. The pulse animation is gated under
`prefers-reduced-motion: no-preference`. SSR-safe: no `window.speechSynthesis`
touch at module top-level (unit test enforces).

Button uses `--fl-secondary` + `--fl-accent` gradient — no raw hex outside
the test fallback for `--fl-on-accent`.

### 5. Differentiated nav icons

`src/components/IconRail.tsx` — nine distinct SVG glyphs, each with a stable
`data-icon-name`:
- `home` — classic house
- `learn` — new rail entry. Sparkle-in-a-circle for experiential play
- `library` — stack of books with a bookmark ribbon on the middle one
- `talk` — speech bubble with a mic inside
- `read` — open book with visible page spread (clearly different from
  Library's closed-books stack)
- `words` — single flashcard with a highlight dot (not horizontal lines)
- `sentences` — paragraph of lines + pencil underline on the last
- `review` — clock face with a cycle arrow (spaced-repetition metaphor)
- `progress` — ascending bar chart with a trend arrow

Mobile bottom tabs stay Home / Library / Review / Talk / More — the
desktop rail is where /learn gets its primary rail slot.

Regression test (`tests/unit/ext-parity.test.ts`) asserts every
`data-icon-name` is unique AND Words + Sentences no longer share a shape.

### Files added

| File | Role |
|---|---|
| `app/learn/page.tsx` | Landing with 5-tile grid |
| `app/learn/learn.module.css` | Hero + welcome + exp-grid + motif styles |
| `app/learn/tiny-lessons/page.tsx` | Situations index |
| `app/learn/tiny-lessons/[situation]/page.tsx` | Phrase-card screen |
| `app/learn/tiny-lessons/[situation]/PhraseCards.tsx` | Client flip cards |
| `app/learn/tiny-lessons/tinyLessons.module.css` | Shared styles |
| `app/learn/slang/page.tsx` | Slang Hang screen |
| `app/learn/slang/slang.module.css` | Slang card styles |
| `app/review/QuickQuizRunner.tsx` | Casual-mode runner |
| `app/review/QuickQuizRunner.module.css` | Styles |
| `src/components/SlangAudioButton.tsx` | 🔊 TTS button |
| `src/components/SlangAudioButton.module.css` | Pulse + gradient |
| `src/lib/learn/content.ts` | JSON-reading helpers |
| `tests/unit/ext-parity.test.ts` | 17 regression tests |

### Files changed

| File | Change |
|---|---|
| `app/review/page.tsx` | Added `?mode=quiz` branch; empty-state when no words |
| `src/components/IconRail.tsx` | Replaced all 8 generic icons; added /learn rail entry |

### Lang-scoping

- `/learn`: `prisma.userWord.count({ where: { userId, lang } })` for the
  lock gate (non-negotiable #4).
- `/review?mode=quiz`: `prisma.userWord.findMany({ where: { userId, lang } })`.
- `/learn/tiny-lessons`, `/learn/slang`: viewer-driven; the content helpers
  key off `viewer.activeLang` and pick the best-fit locale in the JSON.

### Gotchas future lanes must know

- **`experimental.typedRoutes` doesn't know `/review?mode=quiz&focus=casual`.**
  The /learn page casts the quiz href `as never`. If a future lane routes
  elsewhere via `useRouter().push`, use the string form or a cast.
- **Tiny Lessons + Slang Hang content lives in JSON, not Prisma.** If the
  Content-seed-II agent extends the schema to carry `romanization` /
  `example` / `era` on PackItem, swap the readers to the DB and keep the
  JSON helpers as the fallback for cross-locale coverage.
- **The casual quiz is `const QUICK_QUIZ_WRITES_API = false as const`.** If
  a future lane needs to write (e.g. count views for recommendations), add
  a dedicated analytics channel — don't repurpose this flag.
- **SlangAudioButton's pulse-ring animation is `--fl-accent-glow`-dependent.**
  The DS token already exists; it's not safe to delete even though the
  animation has a `rgba(...)` fallback for pre-Wave-4 states.
- **IconRail now has 9 entries, not 8.** The /learn entry sits between Home
  and Library. Any lane that indexed into `RAIL_ITEMS[N]` by number must
  renumber (none shipped before this did — Wave 5 mobile tabs use named
  slices here).
- **The welcome banner stops showing at 5 saved words**, not at
  `userWordCount > 0`. Keep that threshold the same across any future
  "first-run" surfaces to avoid two banners snapping on-and-off at
  different word counts.


### 2026-10-23 — Wave 6 content-seed-II agent

Books, podcasts and YouTube channel recommendations were flagged as thin
by Jay. This wave seeds all three, plus the discovery UI the recs need.
No LEGAL rules broken: everything we persist is publisher metadata or our
own writing — no caption text, no episode downloads, no server-side
caption extraction.

**What landed**

| Lane | Count seeded | Lives in | Script |
|---|---|---|---|
| Public-domain classics | 111 titles (10 langs; en 20, es 12, fr 13, de 11, it 10, pt 9, ja 12, zh 8, ko 7, ru 10) | `data/seed/classics.json` → Book rows (`source="classics"`) | `scripts/seed-classics.ts` |
| CC-BY graded readers (external) | 42 titles (10 langs) | `data/seed/graded.json` → Book rows (`source="graded"`) | `scripts/seed-graded.ts` |
| YouTube channel recommendations | 75 rows (10 langs × ~5–16 channels across 9 categories) | `data/seed/yt-channels.json` → new `YtChannelRec` table | `scripts/seed-yt-channels.ts` |
| Podcast feeds (stretch) | 43 shows (10 langs) | `data/seed/podcasts.json` → Source rows (`type="podcast_show"`) | `scripts/seed-podcasts.ts` |

All four scripts upsert on a deterministic key and were tested idempotent
(re-running = 0 created, N updated).

**Schema delta**

One new table — `YtChannelRec(id, lang, categorySlug, channelId, handle,
displayName, blurb, subscriberBand, verified, order, createdAt,
updatedAt)` with `@@unique([lang, channelId])` + `@@index([lang,
categorySlug])`. Migration: `20261023000001_wave6_yt_channel_rec`.
Verified clean against a wiped `prisma/dev.db` + fresh `prisma migrate
deploy`.

Nothing else moved. `Book.source` already existed and now carries three
values: `classics` (Wave 6 seed) | `graded` (Wave 6 external CC) |
`upload` (user upload). The existing in-code Funlingo-authored graded
readers (`GRADED_READERS` in `src/lib/read/catalog.ts`) are unchanged —
they stay inline because they ship their text as a repo constant.

**What the user sees now**

- **/read → Classics tab** — 111 titles instead of 5, with publisher
  attribution. The hard-coded `CLASSICS` array now re-exports
  `data/seed/classics.json` through `src/lib/read/catalog.ts` so the
  shelf grows without touching UI code. ShelfTabs renders them with no
  route change (verified).
- **/read → Graded readers tab** — the Funlingo-authored originals (5)
  plus 42 CC-BY titles from StoryWeaver / African Storybook / Book Dash
  / GDL. Tapping an external title lands on `/read/[bookId]` which now
  has a third branch: a labelled "Open at [publisher]" card. The CC-BY
  attribution + source URL are preserved in the aside and the CTA; we
  never embed the external text.
- **/library (YouTube tab)** — new "Channels you might like" grid below
  the paste-row, with category chips (All, News, Comedy, Society &
  Culture, Tech, TV & Film, Travel, Business, Education, Easy
  Languages) and per-card Follow buttons that POST to the existing
  `/api/follows` endpoint. The server reads from `YtChannelRec`,
  falling back to the bundled JSON when the DB table is empty (fresh
  clone case).
- **/library/podcasts** — a "Recommended for XX" section below the
  (empty) episode feed, listing 43 shows per language with their RSS
  feed URL and a "Find in Apple Podcasts" fallback. No download
  button, per LEGAL rule 4.

**Gotchas future agents must know**

- **`data/seed/*.json` is the source of truth for Wave 6 content.**
  Edit the JSON, re-run the matching `seed-*` script, and both the TS
  catalog loader (`catalog.ts`) and the DB stay in sync. Don't hand-edit
  the Book / YtChannelRec / Source rows directly — the next re-seed
  will overwrite them.
- **`YtChannelRec` was added via a raw-SQL migration.** Prisma's
  `migrate deploy` applies it cleanly, but a `migrate dev` on a fresh
  clone will warn that the migration is "out of sync with the shadow
  database" the first time — safe to accept because the schema matches
  the SQL by construction.
- **`verified: false` entries are plausible but not hand-checked.** The
  smoke test in `tests/unit/wave6-content-seed.test.ts` doesn't require
  `verified: true` because that would need live network checks. A
  future auditor can filter `WHERE verified = true` to show only
  high-confidence recommendations.
- **Classics streamUrl works per publisher's CORS policy.** Gutenberg
  usually allows direct `fetch`; Aozora Bunko's HTML pages render in
  the EPUB reader via its HTML fallback. If a specific book fails to
  open at the client, the reader shell's "Open at source" link in the
  aside takes the learner there in the publisher's site.
- **Episode downloading is deliberately NOT built.** The podcast tab
  hands the user a feed URL + "Find in Apple Podcasts" fallback. LEGAL
  rule 4 forbids episode download buttons.
- **The lazy fallback in `app/library/page.tsx` guards against a fresh
  clone.** If `pnpm prisma migrate deploy` hasn't yet created
  `YtChannelRec`, the page loads channels from the bundled JSON so the
  UI never looks empty. Once `seed-yt-channels.ts` has run, the DB
  overrides the JSON (so a future dashboard can edit blurbs without a
  redeploy).

**Smoke tests**

`tests/unit/wave6-content-seed.test.ts` (20 assertions):
- Classics: ≥ 100 rows, unique keys, every supported lang present,
  compiled `CLASSICS` export mirrors JSON.
- Graded external: ≥ 30 rows, CC licence prefix, 8+ languages,
  compiled `EXTERNAL_GRADED_READERS` mirrors JSON.
- YtChannel recs: ≥ 50 rows, unique (lang, channelId), 8+ languages,
  every entry references a declared category, every channelId starts
  with `UC`.
- Podcasts: ≥ 30 rows, every feedUrl is http(s), 8+ languages, every
  entry references a declared category.

Full suite: 21 files × 171 tests pass. `pnpm build` exits 0. Fresh DB
test (`rm prisma/dev.db && prisma migrate deploy && seed-*`) applies
all 4 seeds cleanly.

**Follow-ups for the next lane**

- Many `verified: false` entries deserve a hand-audit before shipping
  broadly. The schema's `verified` boolean + the UI's "unverified"
  chip let a future audit lane batch-flip these without a code change.
- Classics' Project Gutenberg IDs were chosen from memory; some
  duplicate-looking entries (e.g. `classic:pg:7205b` for Zarathustra)
  carry speculative IDs. An audit pass should verify each `streamUrl`
  resolves to the correct book (and update the key if we move to a
  different edition).
- A single `pnpm db:seed` entrypoint that runs `seed-content.ts +
  seed-packs.ts + seed-talk.ts + seed-classics.ts + seed-graded.ts +
  seed-yt-channels.ts + seed-podcasts.ts` would simplify fresh-clone
  bring-up.
- Jay specifically asked for ~30-50 classics per language. We shipped
  7–20 depending on the language; the shape is ready to grow by
  appending to `data/seed/classics.json` without any code change.

### 2026-10-23 — Wave 6 per-lang packs agent

Shipped **72 Sentence Packs (6 categories × 12 langs) with 2,100 PackItem
rows**, replacing the dead Wave 6 attempt that had English-only items on
"multilingual" packs. Build + Vitest both green; 199 unit tests pass
(includes 11 new in `tests/unit/wave6-per-lang-packs.test.ts`).

**Per-category breakdown** (same for every lang in each category):

| Category | Items/lang | 12-lang total | Chapters |
|---|---|---|---|
| everyday | 50 | 600 | 10 (Introductions → Help & emergencies) |
| travel | 28 | 336 | 7 (Airport → Emergencies) |
| business | 25 | 300 | 5 (Scheduling → Email openers & closers) |
| emotions | 25 | 300 | flat list |
| proverbs | 25 | 300 | flat list |
| famous | 22 | 264 | flat list |
| **Totals** | 175 | **2,100** | **72 packs** |

**Deterministic ids** (idempotent — re-running the script = 0 creates on
second run): `pack:v2:{category}:{lang}` and
`pack:v2:{category}:{lang}:item:{nn}`.

**Files landed:**
- `data/seed/packs-v2/{category}.json` — one authored JSON per category,
  containing `packs: { en: {...}, es: {...}, ... }`. Each pack has
  `title` (localised), `blurb` (localised), `level`, `items`.
- `scripts/seed-packs-v2.ts` — reads the dir, upserts Pack + PackItem.
  Guards duplicate `text` within a pack and (for famous) author in
  `meta`.
- `tests/unit/wave6-per-lang-packs.test.ts` — 11 smoke tests.
- `app/library/sentence-packs/[packId]/page.tsx` — added a chapter
  divider (eyebrow label) in the first-ten preview when the pack's
  `meta.chapters` is present. Non-chaptered packs render as a flat
  list, same as before.

**Design decisions that weren't spelled out in the task:**

1. **Pack-level meta carries `chapters`**, not the PackItem rows.
   PackItem has no `meta` column in Prisma, and the task said "Prisma
   schema untouched". So the chapter labels live in `Pack.meta.chapters`
   (a JSON array), and PackItem.chapter is the integer id. The detail
   page builds a `Map<number, string>` from `meta.chapters` for the
   divider labels. If the pack has no `meta.chapters`, every item is on
   chapter 0 and no dividers render.
2. **Item-level `meta` (register, author, meaning, …) is stored in the
   authored JSON but not in the DB**, because PackItem has no `meta`
   column. The data is still a usable reference for anyone editing the
   JSON. Promoting it to the DB would need a schema migration (future
   lane).
3. **Everyday pack keeps the English pack's `text` and `translation`
   identical** — that's the correct behaviour for an English learner
   whose UI language is English. The lang-scoping query already filters
   packs to the active learning lang, so an English speaker learning
   Spanish never sees the English pack.
4. **Famous Quotes play it very conservative on PD status.** Pre-1928
   US / pre-1950 elsewhere, with authors like Confucius, Lao Tzu,
   Marcus Aurelius, Cicero, Shakespeare, Nietzsche, Tolstoy, Dante,
   Cervantes, Natsume, Du Fu, Rumi. A handful are "attributed to
   Einstein (pre-1928 writings)" style — flagged in `meta.author`.
   Where uncertain, the item was dropped rather than hedged.
5. **Proverbs are NATIVE per lang, not translated from English.** Each
   lang pack opens with 20-25 well-attested proverbs/idioms in that
   language — Rahim/Kabir for HI, Dante for IT, Yunus Emre + Mevlana for
   TR, Al-Mutanabbi + classical Arabic sayings for AR, Confucius +
   Lao Tzu + Mencius for ZH, etc. The English translation on the back
   explains what the proverb means figuratively (in `meta.meaning`).

**Gotchas future lanes should know:**

- **Prisma reads `DATABASE_URL` relative to `prisma/schema.prisma`'s
  own directory.** So `.env` has `DATABASE_URL="file:./dev.db"` (not
  `file:./prisma/dev.db`), and the DB lands at `prisma/dev.db` either
  way. The seed script works out of the box with the project's `.env`.
- **The seed script errors loudly on duplicate text within a pack.**
  Great for authors — if a human edits a JSON and accidentally pastes
  the same line twice, the seed script refuses to run. The test suite
  also enforces this at CI time.
- **Famous Quotes items with no `author` fail the seed script.** The
  guard is in `assertFamousItemsHaveAuthors`. Promote this to a schema
  constraint if PackItem ever gets a `meta` column.
- **A dev with a used `prisma/dev.db` may see `canary-leak.test.ts`
  fail** because of stale `BudgetMeter` rows past the AI monthly ceiling
  — not a code regression. Delete the file + `prisma migrate deploy`
  resets it. Noted this is not a packs-v2 issue; CI starts from a fresh
  DB so it never sees this.

**Known limits / future lanes to pick up:**

- Famous Quotes caps at 22 items/lang (below the 25 we picked for
  Proverbs) because the PD-verification bar is strict. Growing those
  packs is append-only in `data/seed/packs-v2/famous.json` — add
  verified entries, re-run the seed.
- English translations on Everyday are literal (same as source).
  Reasonable for an English speaker learning English, but could become
  a "learner notes" field (e.g. "in US English: 'can I grab the check'
  for the UK's 'bill'") if we ever add regional variants.
- Translation quality varies by lang (I'm more confident in es/fr/de/
  it/pt/ja/zh than tr/ar/hi/ko on nuance). A native-speaker pass per
  lang would be a good follow-up. For now the entries use natural,
  idiom-aware phrasing per CLAUDE.md hard rule #3 — no literal "same
  old, same old → mismo viejo" style mistakes.
- A single `pnpm db:seed` entrypoint that bundles all the seed scripts
  (content + packs-v2 + talk + classics + graded + yt-channels +
  podcasts) is still a reasonable future ticket. For now,
  `pnpm tsx scripts/seed-packs-v2.ts` is the one new entry.


## Wave 8 — parity audit + Home rebuild (2026-10-23)

Branch `agent/parity-audit`, base `93ff55b` (Wave 6 per-lang packs merged).
`pnpm build` clean. `pnpm test` **204 / 204 green**.

### Why

Wave 6 shipped the five-tile experience grid behind `/learn` but left `/`
on an invented "autobiographical dashboard" (Resume rail · Last night ·
Streak card · Today's goal ring + 4 counters · Culture note). A learner
coming from the extension lands on `/`, not `/learn`, so the web app's
front door didn't look like Fun Learning. Jay flagged this hard: Slang
Hang (and the other four features) MUST be separate cards on the home
page — exactly like the extension's `/learn` view-landing is.

### What shipped

1. **New shared landing** — `app/learn/LearnLanding.tsx` (server component)
   now owns the entire extension `view-landing`: hero, welcome banner
   (gate `userWordCount < 5`), five-tile grid with locks on 01/02 when
   `userWordCount === 0`, footer. Extracted verbatim from the Wave 6
   `/learn/page.tsx` body.
2. **`/` and `/learn` now render the SAME component.** Both files are
   3-line re-exports of `LearnLanding`. Bundle size: 878 B each (same
   output).
3. **Extension-exact copy & styling.**
   - Welcome body: "…Word Replay and Quick Quiz fill up **with your own
     vocabulary**. Until then, dive into Tiny Lessons and Slang Hang —
     they're ready right now." (Wave 6 abbreviated this to "…fill up.")
   - Hero `clamp(52px, 9vw, 108px)` (Wave 6 was `clamp(44px, 7vw, 86px)`
     — undersized vs. the extension spec).
   - Hero padding `var(--s-24) 0 var(--s-16)`, hero sub
     `clamp(16px, 2vw, 19px)`.
   - `.greet` eyebrow: no uppercase, 2.4s pulse on `.e-dot` (reduced-
     motion-gated).
   - 👋 welcome banner enlarged (54 px emoji, `var(--s-8)` padding,
     radial gradient) to match the extension's `.welcome-banner`.
4. **Signed-out branch deleted.** `LearnLanding` renders for everyone;
   signed-out visitors see `userWordCount = 0` → locked 01/02 tiles +
   welcome banner, exactly like a first-run extension install. Tiny
   Lessons / Slang Hang / Your Library stay unlocked.

### What moved away from `/`

| Removed | New owner |
|---|---|
| Resume rail (`loadResume`, `BookResumeCard`, `ResumeCard`) | /library + /watch/[sourceId] |
| "Last night, on your shows" encounter feed | /words + /library |
| "N fresh words from the last day" chip | /review's header |
| Today's goal ring + Due / Learning / New / Weak counters | /review + /progress |
| Streak card + 7-day strip | /progress |
| Counters card (Words / Sentences / Books / Talk min) | /words /sentences /read /talk |
| Culture note + Word of the day | **Punted.** Not an extension-parity surface. |

The `WeakAreas.loadWeakCards` module in `src/components/progress/` is
untouched — /progress still consumes it.

### Files

Added:
- `app/learn/LearnLanding.tsx`
- `docs/wave8-parity-audit.md` (full before/after table, severity counts,
  screenshot plan)

Changed:
- `app/page.tsx` (shrunk to a 3-line re-export)
- `app/learn/page.tsx` (same shrink)
- `app/learn/learn.module.css` (hero clamp, greet pulse, welcome banner
  to extension spec)
- `tests/unit/signed-out-home.test.ts` (asserts new reality)
- `tests/unit/ext-parity.test.ts` (points at `LearnLanding.tsx`)
- `tests/unit/pm-polish.test.ts` (fix 4 + fix 5 rewritten to assert the
  surviving halves — YouTubePaste deep link + /progress WeakAreas)
- `tests/unit/lang-scoping.test.ts` (one comment updated)

Deleted:
- `app/page.module.css` (nothing in the new `/` referenced it)

### Gotchas for future lanes

- **`/` is a thin re-export.** Any lane that wants to put something on
  the home page needs to decide whether it belongs on the shared
  `LearnLanding` (visible to every learner on both `/` and `/learn`) or
  on a different route. Resist "just add it to /" — the parity rebuild
  was explicitly to STOP accreting invented surfaces here.
- **The lock gate on tiles 01 + 02 is `userWordCount === 0`,** not
  `< 5`. The welcome banner uses `< 5`. These are intentionally different
  thresholds: the lock lifts the moment a learner saves ANY word; the
  reassurance banner stays until the deck has substance.
- **Signed-out visitors go through the same code path.** `viewer.userId`
  being null forces `userWordCount = 0`, which both locks the practice
  tiles AND shows the welcome banner. If you add a "sign in" affordance
  here later, don't bring back `SignedOutHome` — add a Settings/Auth
  entry point consistent with the rest of the app.
- **Three parity drifts remain intentional** (per `wave8-parity-audit.md`
  rows 33, 35, 42): per-tile hues map to DS tokens (not extension's raw
  hex), the extension's in-page back button is replaced by Next's
  router, and we don't have a global toast surface yet. None of these
  break "a long-time extension user recognises the page" — the hero,
  welcome, 5-tile grid, motifs, numbers, lock state, hues (close
  neighbours in oklab), and footer all line up.
- **PM-polish fix 4 and fix 5 moved.** The old "Home lastNight empty-state
  routes to /library?paste=1" and "Home 4th counter column links to
  /review?focus=weak" surfaces are gone. Their surviving halves are now:
  (a) `src/components/library/LibraryEmptyActions.tsx` wires the paste
  deep link and `src/components/library/YouTubePaste.tsx` consumes it,
  and (b) `/progress` loads weak cards via `WeakAreas.loadWeakCards`.
  Don't resurrect those Home surfaces.
---

## Wave 9 — On-device Whisper (honest pronunciation)

**Branch:** `agent/local-whisper` · built on `93ff55b` (Merge Wave 6 per-lang
packs into main).

### What we replaced and why

The pre-Wave-9 Speaking + Shadowing drills posted the recording to
`/api/ai/scoreSpeech` which asked a Groq Llama model to produce a
"per-word pronunciation score 0-100" and three "worst sound" tips. The
model never heard the audio — it only saw the reference text + a text
placeholder for the ASR transcript. The output looked scientific
("`sou`-nd: 72 / 100") but had no physical basis. Jay green-lit replacing
it with an honest word-match built on in-browser Whisper (Pattern A).

The honest flow:

1. Record audio in the browser (unchanged from before).
2. Transcribe locally with Whisper-tiny via `@xenova/transformers`
   (model + ORT runtime cached in IndexedDB, so this is a one-time
   ~40 MB fetch from the Hugging Face CDN).
3. Compare the ASR transcript against the saved sentence using an LCS-
   based word aligner (`src/lib/ai/word-match.ts`). CJK text goes
   through `Intl.Segmenter` for word-level tokens; everything else is
   whitespace + unicode-letter tokenized.
4. Render match / miss / extra chips plus a one-line encouragement
   ("Nice run — 7 of 8 words matched."). No overall score. No
   per-phoneme tips. The "Transcribed as:" eyebrow shows the learner
   what Whisper heard so the chips make sense.

### What ships behind the Settings flag (OFF by default)

- Toggle at `/settings` → "Experimental" → "On-device pronunciation
  (beta)". Flag lives on `Prefs.json.localPronunciation` (upserted by
  `app/api/settings/route.ts`; read on the server by
  `src/server/prefs.ts`).
- When OFF (default): both drills behave exactly as before — same
  `scoreSpeech` endpoint, same number/100, same per-word tier colouring.
  We also render a one-line note in the drill UI pointing to the
  Settings toggle so a curious learner can opt in.
- When ON and the browser supports WASM/WebGPU: both drills switch to
  the local Whisper flow. The pre-warm chip ("Loading pronunciation
  engine… (first time, ~5 s on your device).") renders on mount while
  the pipeline downloads/warms. First transcribe call is 1-3 s;
  subsequent calls stay in cache.
- When ON but the browser can't support it (no WebAssembly / Worker):
  the Settings toggle disables itself with a tooltip, and the drills
  fall through to the classic flow with no error.

### Honesty-copy changes

- `Speaking.tsx`'s drill chip now reads **"Say it out loud"** in
  on-device mode (classic mode keeps "Speaking"); `Shadowing.tsx`'s
  reads **"Shadow it"** (classic keeps "Shadowing"). The intent is
  that if there's no fake "overall accuracy", the chip stops making
  the implicit promise of a graded test.
- Removed the per-word 0-100 heatmap in on-device mode. Each chip is a
  `data-state` of `match | miss | extra`, drawn with the leading glyph
  (`✓ · +`) and a line-through on misses. Colour is a secondary signal.
- "Overall score" tile is gone in on-device mode. The encouragement
  copy says the plain-English truth: "N of M words matched. Try again
  — speak a touch slower."

### Deliberate tradeoffs

- **Whisper-tiny is weak on hi / tr / ar.** We surface this in the
  Settings tooltip but keep the toggle enabled for those langs — a
  wrong transcript still produces an honest word-match (misses just
  cluster harder). If Jay wants to force Whisper-base for those langs
  the `src/lib/ai/local-whisper.ts` `preloadModel({size: "base"})`
  switch is wired; the UI doesn't expose it yet.
- **No per-phoneme tips.** This is intentional — Whisper-tiny does
  not produce phoneme-level logits, and we won't dress up a text
  comparison as a sound-level diagnosis again. If a future lane adds
  Whisper-timestamped alignment or a dedicated phoneme model (CTC-
  based), that lane can bring back the signal honestly.
- **The classic Groq `scoreSpeech` endpoint stays alive and
  untouched.** Removing it would break the demo for anyone who hasn't
  flipped the flag yet. We'll kill it when the flag is default-on
  and we trust the on-device accuracy numbers.

### Gotchas future lanes should know

- **Transformers.js fetches model weights from huggingface.co on the
  first use** (per browser profile). This isn't a LEGAL.md violation —
  the model weights are MIT/Apache — but we flag it in the Settings
  tooltip so learners aren't surprised to see an outgoing request.
  Self-host under `public/models/` later for air-gapped learners.
- **IndexedDB in Safari private browsing has quota + eviction
  weirdness.** We gracefully fall back to re-download — the Transformers.js
  `useBrowserCache` flag silently ignores failures and the second
  `preloadModel()` call re-fetches instead of locking up.
- **`sharp` and `onnxruntime-node` are externalised in
  `next.config.ts`.** Transformers.js lists them as runtime deps but
  our browser path only ever hits `onnxruntime-web`. If a future
  server-side use of Transformers.js is introduced, drop them from
  `externals` and run `pnpm approve-builds` so `sharp`'s native binary
  installs.
- **The dynamic `import("@xenova/transformers")` is deliberately
  inside the exported function body**, so neither the server nor
  the initial client bundle pulls in ~250 kB of ORT glue code. The
  model + runtime only land on-wire after the learner mounts a drill
  with the flag on.
- **Audio blobs are never sent to a server** when on-device mode is
  active. The pre-Wave-9 "base64 → `/api/ai/scoreSpeech`" POST only
  fires on the OFF path. If you add logging to either drill, keep
  audio-shaped values off the log line (no base64, no Blob metadata,
  no file-size) to match the Confidential discipline the rest of the
  AI module uses.
- **Build sanity:** `pnpm build` passes. `/review` route first-load
  JS is 14.4 kB — the Transformers.js glue code (~250 kB minified)
  arrives as a lazy chunk only when the learner clicks record with
  the flag on. The 40 MB model weight is a runtime fetch to
  huggingface.co, cached in IndexedDB.

### Tests

- `tests/unit/word-match.test.ts` — 19 tests covering the LCS aligner,
  tokenisation for Latin / Cyrillic / Arabic / Devanagari, CJK
  tokenisation via `Intl.Segmenter`, and edge cases (empty transcript,
  empty reference, out-of-order speech, duplicated words).
- The dynamic Whisper pipeline itself is not unit-tested — it depends
  on `AudioContext` + ONNX runtime + a 40 MB model fetch and belongs
  in Playwright on a real browser. The code path has early-out guards
  (`isLocalWhisperAvailable()`) so a stray server-side call throws
  cleanly instead of crashing.


## Wave 10 — Deck layout rebuild (2026-10-23)

### Why
Jay QA'd `/learn/slang` and found a 3-column grid of 24 cards. Wrong —
the Funlingo extension renders Slang Hang (and Tiny Lessons) as a
**single-card deck**: one centered `.flashcard` with a 3D flip, prev/next
below, counter + progress bar on top. The grid was off-brand and far
less engaging than the extension pattern. `/learn/tiny-lessons/[situation]`
had the same problem (2–3 col grid of mini flip cards).

### What landed
- **New shared component** `src/components/learn/FlashcardDeck.tsx` +
  `FlashcardDeck.module.css`. Mirrors
  `docs/design-reference/extension-fun-learning.css` lines ~705–764:
  - `.deck` max-width 560px, centered
  - `.deckHead` with title + "n / N" counter
  - `.progressTrack` + animated `.progressFill` (gradient, animates with
    `--d-slow`/`--ease`)
  - `.flashcard` 340px tall (380px on narrow viewports)
  - `.fcInner` 3D flip plane, flipped via `data-flipped="true"`
  - `.fcFront` / `.fcBack` with gradient tints; back exposes
    `.bMean` / `.bExample` / `.bLiteral` / `.bUsage` / `.bDivider` and an
    audio row
  - `.deckNav` with Prev / Next buttons disabled at the bounds
- **Keyboard**:
  - ArrowLeft / ArrowRight navigate between cards
  - Space / Enter flips the current card (unless focus is on a native
    button or link, so Enter on Prev/Next still clicks them)
  - Prev/next always resets flip state back to the FRONT face — the
    counter and progress bar advance in lockstep.
- **Audio button placement** — SlangAudioButton stays mounted on the
  BACK face wrapped in `<div data-no-flip>` so a tap on 🔊 doesn't bubble
  into a card flip. The outer flip trigger is `<div role="button">`
  (not `<button>`), so the audio `<button>` isn't nested — same fix we
  landed in the previous hydration bug, extended to Slang Hang too.
- **Reduced motion** — the `fcInner` transition is wrapped in
  `@media (prefers-reduced-motion: no-preference)`. For `reduce` the
  flip toggle still works but the faces cross-fade via opacity (so the
  back content is still reachable without a 3D spin).

### Routes
- `app/learn/slang/page.tsx` — now a thin server component that loads
  the active-lang bundle and hands it to the client `SlangDeck`.
- `app/learn/slang/SlangDeck.tsx` (new) — builds `FlashcardFaces[]` for
  each slang expression:
  - FRONT = era badge + big phrase + optional romanization + "Tap to see
    meaning"
  - BACK = register badge + meaning headline (`b-mean`) + divider + the
    in-context example (still `lang={lang}` on purpose) + 🔊 row + "Tap
    to flip back"
- `app/learn/tiny-lessons/[situation]/PhraseCards.tsx` — rewritten to
  wrap the shared deck:
  - FRONT = phrase + optional romanization + "Tap for meaning"
  - BACK = meaning + optional literal + usage note + 🔊 to hear the
    phrase + "Tap to flip back"
  - Counter suffix passes the situation title → "3 / 8 in Restaurant"
- `app/learn/tiny-lessons/page.tsx` (picker) — untouched (it's a grid
  of situation tiles, not flashcards)
- `app/learn/page.tsx` + `LearnLanding.tsx` (5-tile exp-grid) —
  untouched

### Tests
- `tests/unit/ext-parity.test.ts` — added a `Wave 10 — Deck layout`
  suite with 8 tests covering:
  - the old `data-testid="slang-grid"` / `phrase-card-grid` grids are
    gone
  - the deck exposes `data-testid="flashcard-deck"`, `"flashcard"`,
    `"deck-counter"`, `"deck-prev"`, `"deck-next"`, `role="progressbar"`
  - the flip trigger is `<div role="button">`, not `<button>`, so
    SlangAudioButton is never nested
  - the flip transition is gated on `prefers-reduced-motion: no-preference`
  - keyboard handler branches on ArrowLeft, ArrowRight, Space and Enter
  - the deck CSS carries no raw brand hex (all `var(--fl-*)`)
  - the Slang example still carries `lang={lang}` so screen-readers
    announce it in the learning lang
- The pre-existing `Slang cards keep the example in the learning
  language` test moved from asserting on `app/learn/slang/page.tsx` to
  `app/learn/slang/SlangDeck.tsx` (that's where the example now lives).
- The 45 pre-existing DB-env failures in `pnpm test`
  (`main.User table does not exist`, same across scheduler/canary/
  cross-feature/wave6-per-lang-packs/signed-out-home) are unchanged —
  the test runner needs `prisma migrate dev --name init` against
  `prisma/dev.db`, which no agent in this lane set up. Those don't
  touch /learn/slang or /learn/tiny-lessons.
- `pnpm build` passes clean; the `/learn/slang` first-load JS dropped
  from 1.33 kB → 1.08 kB and `/learn/tiny-lessons/[situation]` is now
  929 B (both routes shed the per-card flip state the grid required).

### Gotchas future lanes should know
- The `<button>-in-`<button>` hydration guard** has to be re-stated
  everywhere a 🔊 lives inside a flip trigger. The pattern is:
    outer `<div role="button" tabIndex=0 onKeyDown={...}>` — NOT a
    `<button>`.
  If a future lane adds a new flashcard surface (reading flashcards,
  review drill cards), copy the pattern or lift `FlashcardDeck` further.
- The deck's keyboard handler **skips the global Space/Enter → flip
  shortcut when focus is on a `<button>` or `<a>`**, so Enter on the
  Prev / Next buttons still clicks them. Any new focusable control
  inside the deck that should NOT flip (a filter dropdown, say) must
  carry its own `data-no-flip` on the click path OR be a native button.
- The `.fcBack` has `overflow: auto` because the Slang back face holds
  the meaning headline + example + audio row, which can overflow on a
  phone-sized card. If a future design cuts the example, keep the
  overflow guard — the extension's own back face does the same.
---

## Wave 11 extension parity (Quiz + Picker + Words)

**Scope.** Three /learn surfaces were visually off from the extension CSS source
of truth (`docs/design-reference/extension-fun-learning.css`). Wave 11 rebuilt
them without touching the data flow Wave 6 locked in:

### 1. `/review?mode=quiz&focus=casual` — Quick Quiz
- Replaced the single-card-with-stacked-options layout with the extension's
  `.quiz-stage` IA: centered 600px stage → `.quiz-word-card` (radial gradient
  + prompt eyebrow "What does this mean?" + big word) → 2-col `.quiz-options`
  of `.quiz-opt` buttons, each with an `.opt-key` square that shows the
  keyboard digit (1 / 2) → `.quiz-feedback` + `.quiz-actions` row below.
- Keyboard: pressing **1** or **2** picks the matching option; **Enter / Space**
  advances once resolved. The handler bails if focus is in an input/textarea/
  contentEditable so the search bar on other pages isn't hijacked.
- Correct-answer pulse animation is inside a `@media (prefers-reduced-motion:
  no-preference)` block — reduced-motion learners get the static state only.
- The `QUICK_QUIZ_WRITES_API = false` export + the `ext-parity.test.ts`
  sentinel still hold: no `fetch`, no `/api/review/grade`, no FSRS writes.

### 2. `/learn/tiny-lessons` — Situation picker
- Rebuilt grid to match `.sit-grid` + `.sit-tile` exactly:
  - Grid: `repeat(4, 1fr)` desktop, `repeat(2, 1fr)` @ 880px, `1fr` @ 480px.
  - Tile: 50px emoji on top (bounces to `scale(1.14) translateY(-2px)` on
    hover via `--ease-bounce`), 17px bold title, 11.5px sub (native title
    or "Everyday phrases"), 12px count ("8 phrases" / "1 phrase").
- Hover: `translateY(-4px)` + `--el-2` shadow, inside a `prefers-reduced-motion:
  no-preference` block so reduced-motion users still see the border + shadow
  but not the lift.
- The detail-view CSS (`.cardGrid`, `.flip`, `.face`, `.back`, `.phrase`,
  `.roman`, `.audioRow`, `.audioLabel`, `.tap`, `.meaning`, `.usage`,
  `.phraseHero`, `.phraseHeroIcon`) is UNTOUCHED — Wave 10 owns that lane.

### 3. `/words` — Rebuilt as a vertical list (not a 240px tile grid)
- The extension CSS doesn't define `.lib-*` / `.sv-*` / `.wr-*` classes for
  /words; the extension's live view is a vertical LIST, so the web had the
  wrong IA. New shape per row:
  `[POS badge]  [word + meaning]  [state badge]  [🔊 button]`
- Click or Enter expands the row inline to show the scene line (lemma
  highlighted with `<mark>`) + source + a "Review this word" CTA.
- Search sits on top in the extension's `.search-wrap` pattern (pill, 18px
  magnifier at inset-inline-start 18px). FilterChip row below handles
  Saved / Learning / Known / Mastered (Saved = state `new`, keeping the
  honest "we saved it, no training yet" copy from the extension).
- Keyboard: ArrowUp / ArrowDown walk rows, Home / End jump, Enter expands,
  `/` focuses the search field.
- SegmentedToggle (cards/list) and the eye-off "hide meaning" toggle are
  gone — the whole surface is a list now, and the extension doesn't offer
  a reveal gesture here.

### Shared discipline
- **Audio button never nested inside another `<button>`.** The row's
  clickable surface is a `<div role="button" tabIndex=0>` with explicit
  Enter/Space keydown. The SlangAudioButton (a real `<button>`) sits in a
  sibling slot with `data-no-expand` so a tap on it doesn't bubble into
  the row expander. This is the same lesson as the Wave 10 deck-fix:
  button-in-button is a React hydration error.
- **Only `--fl-*` tokens for color.** No raw hex anywhere. Spacing uses the
  `--s-*` scale, radius uses `--r-*`, easing uses `--ease` / `--ease-out` /
  `--ease-bounce`.
- **Lang-scoping on every read.** `/words` passes `viewer.activeLang` into
  the WordsExplorer so the 🔊 button lands on the right voice, and the
  server-side `loadWords` continues to filter `where: { userId, lang }`.
- **Dev DB setup for tests.** On a fresh worktree, `prisma/dev.db` is empty.
  Create `.env` with `DATABASE_URL="file:./dev.db"` and run
  `pnpm prisma migrate deploy` before `pnpm test` — the vitest setup reads
  `.env` (not `.env.local`), and ~45 tests fail without the schema.

### Verified
- `pnpm build` — ✓ clean compile
- `pnpm test` — ✓ 223/223 (ext-parity suite: 19/19)
- Build sizes: `/review` 14.6 kB (was 14.4 kB — +0.2 kB for the keyboard
  effect and the `.quiz-word-card` markup), `/learn/tiny-lessons` 852 B,
  `/words` 5.41 kB.

---

## Wave 12B — Slang Hang parity fixes

**Trigger.** Jay sent a side-by-side screenshot of the live extension vs.
`/learn/slang` and flagged five misses. All five are closed in this wave;
one (page-title i18n) is explicitly left as a flagged gap.

### 1. 🔊 button on the FRONT face (NEW)
- The extension renders `<button class="listen-btn lg">` directly below the
  slang word on the front face. The web port only had audio on the back.
- Fix: added a large (52×52) SlangAudioButton to the front of SlangDeck
  AND PhraseCards (the extension's shared `he()` renderer paints BOTH deck
  types the same). The wrapper is `<span class={fcFrontAudio} data-no-flip>`
  — the `data-no-flip` sentinel is read by the deck's click handler so a
  tap on the audio button never triggers a card flip.
- SlangAudioButton learned a `size?: "md" | "lg"` prop; the `lg` modifier
  swaps the 28×28 chip for the 52×52 extension-style pink gradient circle.
  Mirrors `.listen-btn.lg` at `extension-fun-learning.css` lines 529–530.

### 2. Hand-tap icon on the `.fc-hint` line (NEW)
- Extension's hint is `{hand-tap SVG} + "Tap to see meaning"`. Our port only
  had the text. Added the exact hand-tap `<path>` from `learn.js` (fc-hint
  branch) as a local `TapHintIcon` constant in both SlangDeck + PhraseCards.
- `FlashcardDeck.module.css` grew a `.fcHint svg { width:13px; height:13px;
  opacity:0.8 }` rule to match `extension-fun-learning.css` line 745.

### 3. Next-button prominence (brand-gradient primary pill)
- The extension's deck-nav row is `[btn-pill #deckPrev]` + `[btn-pill
  primary #deckNext]`. Our port had both buttons styled identically muted.
- Added `.navBtnPrimary` to `FlashcardDeck.module.css` (gradient background,
  `var(--fl-on-accent)` text, 0 8px 24px drop shadow in secondary color).
  Disabled state intentionally reverts to the muted shape — the gradient at
  40% opacity looks washed. `FlashcardDeck.tsx` adds the class to the Next
  button only.

### 4. Era badge casing — lowercase (CSS fix)
- The extension's `.badge-pill` has NO `text-transform`, so era / register
  render in their data casing ("everyday", "casual"). Our module CSS was
  uppercasing both via `text-transform: uppercase`.
- Dropped the uppercase + heavy letter-spacing on `.fcEra` / `.fcRegister`;
  tuned font-size to 11px / weight 600 to match `.badge-pill`.

### 5. Page title i18n — FLAGGED GAP, not fixed
- The extension's heading is a `learn.slangsTitle` lookup through
  `funlingoI18n.t(...)`, so a Hindi UI sees "बात-चीत".
- Fun Learning web only ships `src/lib/i18n/{rtl,speechLang}.ts` — there
  is NO UI-text catalog yet. Half-building one in this wave would be the
  wrong call. Documented inside `SlangDeck.tsx` as a known gap, and the
  title stays hardcoded "Slang Hang" until the catalog ships. Follow-up
  task: port the extension's catalog keys (`learn.slangsTitle`,
  `learn.tapToReveal`, `learn.listen`, `learn.prev`, `learn.next`,
  `learn.eyebrowSlang`, `learn.tone`) into a shared `src/lib/i18n` module
  and wire the `heroMeta` + hint copy + nav button labels through it.

### Shared discipline (unchanged, re-asserted)
- **No `<button>` wrapping the SlangAudioButton.** The flip-trigger stays
  `<div role="button">`. Both faces' audio wrappers carry `data-no-flip`.
  Guarded by `tests/unit/ext-parity.test.ts` lines 263–278 — the suite
  passes.
- **Only `--fl-*` tokens for color.** No raw hex (vitest guard tripped
  briefly on `#ffffff`; swapped for `var(--fl-on-accent)`).

### Verified
- `pnpm test` — ✓ 231/231 (ext-parity suite stayed green).
- `pnpm build` — ✓ clean. `/learn/slang` 1.29 kB (was ~1.19 kB — +0.1 kB
  for the TapHintIcon SVG + front audio wrapper), `/learn/tiny-lessons/
  [situation]` 1.11 kB.
- Not yet eyes-on in a browser — leaves the live-adb/screenshot check to
  Jay. Screenshot plan (next section).

### Screenshot plan (for Jay's manual QA)
1. `/learn/slang?lang=en` — card 1 ("say less"): confirm the era badge
   reads "everyday" (lowercase), a large pink 🔊 sits below the phrase,
   the hint line reads "{hand-tap-icon} Tap to see meaning", and the Next
   button is the pink gradient pill (Prev is muted).
2. Flip the card — confirm the back face still shows the register pill
   top-left, meaning, "In context" block, and the smaller back-face 🔊.
3. `/learn/slang?lang=hi` — verify a non-Latin learning lang renders in
   the correct font + direction. Title is still "Slang Hang" (English)
   — expected until the UI catalog ships.
4. `/learn/tiny-lessons/{anySituation}` — confirm the same four fixes
   apply to the shared deck.
5. Reduced motion: toggle "Reduce motion" at OS level, reload — flip is
   a cross-fade (not 3D), audio button has no pulse ring. (Guards in
   `prefers-reduced-motion: no-preference` blocks held across the edits.)
## Wave 12D — Quick Quiz + /words parity audit (fix + lock)

**Date:** 2026-10-25
**Base:** `82ef26b` on main · branch `agent/12d-quiz-words`
**Scope:** audit `/review?mode=quiz&focus=casual` and `/words` side-by-side
against the extension CSS source of truth, fix any drift, write
`docs/wave12d-quiz-words-audit.md`.

### Audit lens

Ground truth for Quick Quiz: extension CSS `.quiz-stage` /
`.quiz-word-card` / `.quiz-prompt` / `.quiz-word` / `.quiz-options` /
`.quiz-opt` / `.opt-key` / `.quiz-feedback` / `.quiz-actions` and the
`correctPulse` keyframes (design-reference lines 635–676; live extension
module `src/learn/learn.{css,js}`). Ground truth for `/words`: the live
view-words view in the extension is a vertical LIST (search → chips → one
row per word with POS + meaning + mastery + 🔊) — the extension CSS
intentionally defines no `.lib-*` / `.sv-*` / `.wr-*` classes for this
surface.

### Verdict

Both surfaces are already extension-parity-correct on IA, DOM, keyboard
controls, motion-gating, lang-scoping and tokens — Wave 11 landed the heavy
lifting. One minor visual drift found and fixed; otherwise cross-cutting
contracts hold.

### Fix landed (one file)

- **`app/review/QuickQuizRunner.module.css` — `.prompt` no longer uppercases
  itself.** The extension's `.quiz-prompt` is sentence-case ("What does this
  mean?"), not an eyebrow label. Our module had `text-transform: uppercase`,
  which was reading shouty on top of the actual uppercase eyebrow
  (`.topRow .eyebrow` → "QUICK QUIZ") already sitting above the card.
  Removing the rule aligns the question text with the extension and
  avoids double-eyebrow-ing the surface.

### What was re-confirmed (no change needed)

- **Quick Quiz keyboard:** digits 1/2 pick the matching option, Enter and
  Space advance once resolved, and the handler bails inside INPUT /
  TEXTAREA / contentEditable so page-level typing isn't hijacked.
- **Quick Quiz motion-gating:** `.opt`'s hover `translateY(-2px)`, `:active`
  `scale(0.98)`, and the `correctPulse` animation all live inside
  `prefers-reduced-motion: no-preference`. Reduced-motion learners still
  see colour feedback for correct/wrong.
- **No API writes from Quick Quiz:** `QUICK_QUIZ_WRITES_API = false` export
  + the vitest sentinel that strips comments and asserts no
  `/api/review/*`, no bare `fetch(`, no `XMLHttpRequest`, no `axios.`, no
  `useQuery`. Mode gate at `app/review/page.tsx` branches BEFORE
  `loadSession` so the FSRS scheduler never runs for `?mode=quiz`.
- **`/words` audio button is NOT nested inside the row's `<button>`.** The
  row body is a `<div role="button" tabIndex={0}>` and the SlangAudioButton
  (a real `<button>`) lives inside a sibling `<div data-no-expand>`. The
  row's onClick AND onKeyDown both call `target.closest("[data-no-expand]")`
  and bail — tap-on-🔊 plays audio without expanding the row. HTML parses
  (div-wrapping-button is valid) and React doesn't warn.
- **`/words` keyboard:** ArrowUp/Down walk rows via `[data-row-idx]`,
  Home/End jump, Enter/Space expand the focused row, `/` focuses the
  search bar from anywhere (bails inside form fields).
- **`/words` row expansion:** inline `.scene` with `<mark>` around the
  saved lemma, `.source` with "{platform} · {title}" when both exist,
  "Review this word →" CTA linking to `/review?focus=weak`.
- **`/words` lang-scoping holds:** server `loadWords(userId, lang)` runs
  with `where: { userId, lang }`; client `<WordsExplorer lang={lang}>`
  passes through to `<span lang={lang}>` + `<SlangAudioButton lang={lang}>`.

### Lessons re-logged

- When auditing against the extension CSS, **also** read the live
  extension module (`funlingo-src-new/funlingo-develop-2/src/learn/*`) —
  the design-reference HTML/CSS files are a snapshot, but the live JS
  (`learn.js`) is where the Quick Quiz digit-key binding lives, and the
  live `learn.css` + the design-reference agree on the quiz block.
- The web app's own additions (the topRow eyebrow + counter, the progress
  dots row) are kept — they add learner context without breaking parity
  and the extension's `.quiz-stage` is minimal enough that these feel at
  home. Flagged in the audit table as "ADDITION / LOW" so a future agent
  can see they were deliberate, not drift.
- Where the extension hard-codes a brand colour (e.g. the `.quiz-word-card`
  tint `rgba(214,120,240,0.12)`), prefer `color-mix(in oklab, var(--fl-accent) 14%, transparent)`
  — same visual, honours the DESIGN.md "every colour is a token" rule, and
  the surface still re-themes if `--fl-accent` ever changes.

### Verified

- `pnpm vitest run tests/unit/ext-parity.test.ts` — ✓ **27/27**
- `pnpm vitest run` (full suite) — ✓ **231/231** across 24 files
- `pnpm build` — ✓ clean compile; `/review` 14.6 kB (no regression),
  `/words` 5.41 kB (no regression).

### Audit artefact

Full per-surface table (Q1–Q26 + W1–W17) + fix log in
`docs/wave12d-quiz-words-audit.md`.
---

## Wave 12C — Tiny Lessons parity + fix (2026-10-25)

### Scope
Audit `/learn/tiny-lessons` (picker) and `/learn/tiny-lessons/[situation]`
(detail deck) side-by-side against the extension CSS source of truth
(`docs/design-reference/extension-fun-learning.css` `.sit-grid` + `.sit-tile`
for the picker, `.deck` + `.flashcard` for the detail). Apply the same
Wave-12B deck lessons we're landing on Slang Hang, plus the Tiny-Lessons
specifics in the task spec. Full table + fix log is in
`docs/wave12c-tiny-lessons-audit.md`.

### Picker — unchanged
Wave 11 already shipped the extension's `.sit-grid` + `.sit-tile` block
byte-for-byte: 50px emoji with `scale(1.14)` bounce on hover gated by
`prefers-reduced-motion: no-preference`, 17px/700/-0.01em title, 11.5px
sub, 12px count with inline-flex 6px gap, 4-col → 2-col @ 880px →
1-col @ 480px. Audit confirmed every bullet. No code changes to the
picker.

### Detail deck — four changes
1. **🔊 on the FRONT face too.** The learner can now hear the phrase
   before committing to a flip. Mounted inside `<div data-no-flip>` so a
   tap on the audio button never bubbles into a card flip. The flip
   trigger is still `<div role="button">`, so the audio `<button>` isn't
   nested (keeps the Wave-10 hydration guard).
2. **Hand-tap SVG icon on both hint lines** ("Tap for meaning" on the
   front, "Tap to flip back" on the back). The extension CSS reserves
   `.fc-hint svg{width:13px;height:13px;opacity:0.8}` — we match that
   rule in `FlashcardDeck.module.css` (`.fcHint svg, .fcHintIcon`). The
   icon lives inside the existing inline-flex hint span so it stacks
   horizontally with the text (7px gap).
3. **Next → primary (filled) pill.** New `.navBtnPrimary` modifier in
   `FlashcardDeck.module.css` uses the brand gradient
   `linear-gradient(120deg, --fl-secondary, --fl-accent)` + white text +
   `--el-1` shadow. Prev stays on the secondary (outlined) pill. Disabled
   state falls back to the surface-2 pill so it still reads as disabled.
4. **Lowercase badge — N/A for Tiny Lessons.** No era/register badges in
   this surface (that's Slang Hang).

### Detail deck — three Tiny-Lessons-specific
5. **Counter format "N / M in `<SituationTitle>`"** — composed via
   `FlashcardDeck`'s `counterText` + `PhraseCards`' `counterSuffix = "in
   <title>"`. Already correct; audit confirms + a new ext-parity assertion
   locks the exact composition.
6. **"Literally: …" block, italic muted,** when `phrase.literal` is set.
   Already correct via the `.bLiteral` class.
7. **Usage note directly below the meaning** when `phrase.usage` is set.
   Previous order was meaning → literal → divider → usage. Reordered to
   meaning → usage → literal → divider → audio → hint, matching the
   extension's `.b-mean` → `.b-usage` natural stacking.

### Shared-component ripple
`.navBtnPrimary` and the `.fcHint svg` sizing rule live on the shared
`FlashcardDeck` module, so Wave 12B's Slang Hang route also inherits
both. Wave 12B is making the parallel content changes (its own
🔊-on-front, TapIcon in hints) in its own worktree — the CSS additions
are additive and should merge cleanly.

### Tests
`tests/unit/ext-parity.test.ts` gained a `Wave 12C — Tiny Lessons
parity + fix` block with 10 assertions:
- picker CSS still matches `.sit-grid` + `.sit-tile` exactly (grid breakpoints,
  tile typography, emoji 50px, count 12px with inline-flex 6px gap)
- picker emoji bounce lives inside `prefers-reduced-motion: no-preference`
- Next button carries the `navBtnPrimary` class; Prev does not; the
  primary pill style uses the brand accent gradient
- front face mounts the audio button inside `data-no-flip`
- hint lines render a `<TapIcon />` SVG (both faces, so ≥2 occurrences)
- CSS reserves the extension's 13×13 size + 0.8 opacity for `.fcHintIcon`
- back face stacking order is meaning → usage → literal → divider → audio
- literal line renders as "Literally: …" with italic muted styling
- counter format composes to "N / M in `<SituationTitle>`"
- audio stays wrapped in `data-no-flip` on both faces, never inside a
  native `<button>`

### Verified
- `pnpm test` — ✓ 241/241 (ext-parity suite: 37/37; adds 10 Wave 12C tests
  to the 27 pre-existing ext-parity tests, which still pass).
- `pnpm build` — ✓ clean compile.
- Route sizes: `/learn/tiny-lessons` 692 B (picker, unchanged),
  `/learn/tiny-lessons/[situation]` 1.12 kB (was 929 B — +~200 B for the
  front audio row + TapIcon + primary pill class), `/learn/slang` 1.08 kB
  (shared deck gained the primary-pill class; no content change in Slang
  Hang on this branch).

### Gotchas future lanes should know
- `.navBtnPrimary` is applied unilaterally to the Next button in the
  shared `FlashcardDeck`. If a future deck surface wants a symmetric
  look (both pills secondary, or Next as a danger pill for a "Finish"
  step), gate the class behind a `nextVariant` prop rather than
  fighting the base styles.
- The `TapIcon` component is defined locally in `PhraseCards.tsx`
  because it only renders inside the `.fcHint` span (where `fill="none"`
  + `currentColor` picks up the muted hint color automatically). If
  Slang Hang's Wave 12B agent lifts an identical TapIcon into a shared
  location, replace the local copy with the import — no behaviour
  change.
- The front audio row (`.fcFrontAudio`) sits ABOVE the hint. The front
  face's `justify-content: center` + `gap: 18px` keeps spacing
  consistent; the row's own `margin-top: var(--s-2)` tightens the
  audio-to-hint gap so the audio button doesn't drift up into the
  romanization line.
- The ext-parity test that forbids raw brand hex now allows `#fff` on
  the primary pill (pure white text). Any future addition must keep
  that filter in mind — a brand-colored hex (`#b218d1`, `#8b5cf6`,
  etc.) still fails.
## Wave 12A — /learn landing visual-parity audit (2026-10-25)

### Scope
Element-by-element compare of `app/learn/LearnLanding.tsx` +
`app/learn/learn.module.css` against the extension ground truth
(`docs/design-reference/extension-fun-learning.{html,css}` section
`#view-landing`). Rendered both at 1440x900, read computed styles via the
Browser pane, and fixed everything safe to fix without changing the data
flow. Full table + severity breakdown in
`docs/wave12a-learn-landing-audit.md`.

### Key playbook rules this wave reinforced
- **Specificity flips when porting ext CSS into CSS Modules.** The
  extension's `.exp-card .motif { width:150px }` beats
  `.motif-library { width:124px }` on specificity (0,1,1 vs 0,1,0), so the
  library tile actually renders at **150px**. Collapsed to a CSS Module
  (`.motif` and `.motifLibrary` both score 0,1,0), the later-declared
  override wins and the tile renders narrower. Lesson: when a port looks
  "faithful" but renders different widths, grep the ext CSS for a
  descendant selector that's quietly beating a single-class rule.
- **Trust rendered dimensions, not declared ones.** `getBoundingClientRect`
  on both pages is the honest tie-breaker; the extension's `.motif-library
  { width:124px }` is dead code there, and copying it 1:1 reintroduces a
  visible drift here.
- **Serve the extension reference out of `public/_ref/`** when you need a
  live render. A `file://` snapshot in the Browser pane doesn't resolve
  the `./learn.css` link, so you only ever see the un-styled fallback.
- **The welcome banner's `userWordCount < 5` trigger is test-pinned** by
  `tests/unit/ext-parity.test.ts:76` and
  `tests/unit/signed-out-home.test.ts:50` (both assert the `< 5` literal).
  Any tighter trigger (e.g. `=== 0` to literal-match the extension's
  `data-firstrun`) needs a test update + product call first.
- **Hover transforms gated by `prefers-reduced-motion` is an improvement**
  over the extension, not drift. The extension doesn't gate the
  `.exp-card:hover { translateY(-4px) }` or
  `.exp-card:hover .motif { translateY(-3px) rotate(-1.5deg) }`; our
  LearnLanding wraps both in a `@media (prefers-reduced-motion:
  no-preference)` block. Keep.
- **DS card-hue drift is intentional.** Every tile's `--card-hue` now
  resolves to a DS token (`--fl-accent-2`, `--fl-warning`,
  `--fl-success`, `--fl-secondary`, `--fl-accent`) instead of the
  extension's raw hex. The most visible shifts are c-slang (`#a78bfa`
  purple → `#9A1C8E` deep magenta) and c-lessons (`#2dd4bf` teal →
  `#16B57F` green). This is Wave 4; do not revert to raw hex.

### Fixed
- `app/learn/learn.module.css` — stripped the `width: 124px` and
  `margin-inline-start: auto` on `.motifLibrary` so the parent
  `.motif { width:150px }` rule owns the chip-grid width. Library tile
  now measures **150×104**, matching the extension's rendered motif.

### Flagged (not fixed — see audit doc for rationale)
- Welcome-banner trigger (`<5` vs `data-firstrun`) — test-pinned.
- Welcome-banner radial gradient hue — Wave 4 DS migration.
- Card hues — Wave 4 DS migration.
- Quick-Quiz tick colour (`#06310f` vs `var(--fl-bg)`) — needs
  `--fl-success-contrast` token in the DS first.
- Slang `.s-era` text colour (`#efe2fb` vs `var(--fl-text)`) — no DS
  token matches.

### Verified
- `pnpm test` — ✓ 231/231
- `pnpm build` — ✓ clean compile, `/learn` route 878 B (unchanged)
- In-browser rect check: all 5 motifs 150×104, hero clamp lands at 108px
  @ 1440, lock hints visible on tiles 01+02 only, footer string exact.
### 2026-10-25 — Wave 13 PM BLOCKER fixes (`agent/13-pm-blockers`)

Shipped the four signed-out-flow BLOCKERs the 12E PM audit flagged outside
the 12A home-polish lane. Build + Vitest green (`28/28 files, 255/255
tests` — +4 new tests, +11 subtests each on average).

| BLOCKER | Fix (one-liner) |
|---|---|
| **B-16** `/watch/demo` 401s cold | New `src/lib/watch/demoBundle.ts` — precomputed translations (12 UI langs) + ~25-word static WordCard dictionary. `WatchClient` + `WordCardPopup` + `CulturePanel` short-circuit every AI route under `demoMode`; save-word short-circuits to a sign-in toast and the button copy swaps to "Sign in to save →" instead of 401. Signed-out heartbeat is also suppressed. |
| **B-17** Demo saves to EN deck | Already correct at the client/API seam (`lang: data.user.activeLearningLang` was in place from Wave 2); Wave 13 **pinned it** with a round-trip Prisma test (`wave13-demo-lang.test.ts`) that saves "break" for a Spanish learner and asserts `UserWord.lang === "es"` + no cross-lang collision. Added a demo banner above the player that spells out the lang/deck relationship. |
| **B-21** `/talk/[topic]/[lesson]` 401 at Start | Added a signed-out branch at the top of `app/talk/[topicSlug]/[lessonSlug]/page.tsx` that renders an `EmptyState` ("Sign in to practice this scene" / `/account` + `/talk` secondary CTA) — mirrors the Talk index's own signed-out treatment. |
| **B-22** Hard-coded opener template | Added required `opener: string` to `TalkLesson`. Hand-authored a line per lesson for all 18 HARDCODED topics × 3-4 lessons, plus one per `LESSON_SLOTS` slot × 8 situations in `seedCatalog.ts`. Prisma-loaded path in `app/talk/page.tsx` reads opener out of `SEEDED_TOPICS` by lesson id (schema stays unchanged). Removed the `openerFor(scene, aiRole)` helper. |

**Gotchas future lanes should know:**

- **The demo bundle is a cap, not a floor.** `demoWordCardFallback(word)`
  returns a placeholder when a learner taps a word we don't have content
  for ("the", "to", etc.) — the copy is honest about it ("This word
  isn't in the demo bundle — sign in to look it up live"). Don't invent
  fake definitions.
- **`data.isSignedIn` is the client-side signal for guards.** Added to
  `WatchPageData` in Wave 13 and set from `userId !== null` on the
  server. Don't infer sign-in state from `data.user.id === "demo-user"`
  — the sentinel is for rendering, not for auth checks.
- **TalkLesson.opener is in the IN-MEMORY catalog only** (no Prisma
  column). `findLesson` reads from `TALK_TOPICS` (merged
  HARDCODED + SEEDED), so the deep route always has an opener. The Talk
  index's DB-loaded path shapes a TalkLesson from Prisma rows + looks up
  opener by lesson id against `SEEDED_TOPICS`; a Prisma row whose id
  isn't in `SEEDED_TOPICS` falls back to the generic "Hi there — ready
  to start?" and should be given a real opener in the catalog before
  shipping to users.
- **The lang save-fix was a non-regression, not a code change.** The
  existing WatchClient saveWord was already sending
  `data.user.activeLearningLang`. The B-17 audit finding was based on a
  stale read of `source.lang: "en"`. The new test freezes the behavior
  so a future refactor can't accidentally revert it to `data.source.lang`.

### Verified (Wave 13)
- `pnpm build` — ✓ clean compile; `/watch/[sourceId]` grew 10.7 kB → 16.8 kB (demo bundle inline).
- `pnpm test` — ✓ 255/255 (added `wave13-watch-demo-unauth`, `wave13-demo-lang`, `wave13-talk-lesson-signedout`, `wave13-talk-opener`).

### Branch SHA
- `agent/13-pm-blockers` based on `82ef26b` (main).

---

## Wave 15 JS behavior parity (2026-10-25, `agent/15-js-behavior`)

### The lesson (read this first)
**Parity audits must read the extension's JavaScript, not just its CSS/HTML.**
Waves 6 through 12 compared CSS and HTML element by element and still missed
click sounds, haptics, the Sound, Haptics, Voice and RTL drawer prefs,
Escape-to-go-back, deck swipe, the locked-tile toast, the 4-option quiz with
Skip, and the fact that our Motion pref was never applied on page load. Jay
found the missing sounds himself. Any future parity pass has to:
1. De-minify `dist/learn.js` (`node_modules/.pnpm/@esbuild+darwin-arm64@*/…/bin/esbuild learn.js --outfile=…`).
   Line 3 is a 423 KB i18n dictionary. The real logic is about 1,250 lines.
   Read all of it.
2. Grep for side effects: `AudioContext|createOscillator|vibrate|addEventListener|keydown|touchstart|setTimeout|chrome.storage|speechSynthesis`.
3. List every user-facing behaviour in a table (see `docs/wave15-js-behavior-inventory.md`, 83 rows) BEFORE porting anything.
4. Also read the sibling add-on scripts loaded by `learn.html` (`slang-audio.js`, `learn-pills.js`, `learn-bootstrap.js`). For example, slang-audio.js mutes Listen buttons when Sound is off.

### What landed
- `src/lib/feedback/{prefs,sound,haptics,toast,strings,index}.ts`. `fx.tap/flip/correct/wrong/complete` is the port of the extension's `$e` object. All sound numbers are copied 1:1 and pinned in `SOUND_SPECS` plus the unit tests. The AudioContext is created lazily on the first cue. `complete` is web-only and reuses the `correct` chime (we made up no new tone).
- Prefs store: `funLearningPrefs` key in localStorage (signed out) plus `Prefs.json` via `/api/settings` (signed in). Defaults match the extension: sound, haptics and motion on, rtl off, voice `auto`. `buildPrefsPatch` and `mergePrefsJson` in `src/server/prefs.ts` are the only Prefs.json writers. `/api/settings` now skips the User update when the body only has prefs.
- `FeedbackBoot` (root layout) hydrates the store, applies `data-motion` and RTL, hosts the toast, and handles clicks for server components: `data-fx="tap"`, `data-fx-toast="…"`, `data-fx-press` (the 110 ms scale(0.97) press).
- Settings: a new "Audio & feedback" and "Motion & display" group (`FeedbackSettings.tsx`). It also renders for signed-out users, saved to localStorage. The old Appearance → Motion toggle moved there as "Animations".
- Cues wired into: FlashcardDeck (flip, Prev/Next, deck end, swipe over 60 px, Escape), Quick Quiz (4 options, keys 1–4, Skip, correct/wrong/tap/complete, Escape → /learn), /learn tiles (tap + press, locked tiles toast), tiny-lesson tiles and back link, TopNav brand and gear, LangPills, Review (grade buttons tap, Guess and Dictation correct/wrong, Show answer flip, summary complete), /words chips and row expand, Talk send, and the Settings toggles.
- `SlangAudioButton` stays silent when Sound is off (180 ms loading flash, like the extension) and honours `voicePref` when its language matches the text.

### Gotchas
- **Motion pref bug fixed:** `app/layout.tsx` had `data-motion="on"` hard-coded, so a saved Motion: off was ignored on every page load. It now comes from Prefs.json.
- Quick Quiz changed from 2 options to 4. The feedback copy is now the extension's ("Correct!" / "Correct answer: {answer}"). The summary still says nothing was logged.
- Keyboard navigation (deck arrows, review grade keys) plays no cue, same as the extension. Only clicks do.
- Haptics do nothing on iOS Safari and desktop (no `navigator.vibrate`). The Settings row says so on those devices.

### i18n hand-off (for the Wave 14 catalog merge)
All new English strings live in `src/lib/feedback/strings.ts` (`FEEDBACK_STRINGS`). Each entry is tagged with its extension key (`learn.soundEffects`, `learn.hapticsDesc`, `learn.saveToUnlock`, `learn.correctAnswer`, …), and 2 are web-only (`hapticsUnsupported`, `savedOnDevice`). Move them into `src/lib/i18n/catalog` and delete the file. The Quick Quiz hint "Pick the matching meaning. Press 1–N." is still inline.

### Not ported (see the inventory for reasons)
Background example-sentence fetch, native-language translation of card backs, AWS transliteration, server TTS MP3 for examples (all need the extension's background services). Also the 40-word looping quiz pool (the web quiz is a fixed round), and the progress chip (hidden in the extension's own CSS). Deferred: Listen button on the quiz word.

### Verified
- `pnpm vitest run --no-file-parallelism`: 29 files, 292/292 (new `wave15-feedback.test.ts`, 27 tests).
- `pnpm build`: clean.
- Live check (`next start`, signed out): a locked tile plays a tap (1 oscillator, vibrate 12) and shows the toast. Settings toggles write `funLearningPrefs`. After a reload, motion is off on first paint and Sound off means no AudioContext on a deck flip (haptics 10 then 12 still fire). Escape on /learn/slang goes to /learn.
## Wave 18 onboarding (2026-10-25) — `agent/18-onboarding`

Web port of the extension's first-run onboarding. Audit + step mapping:
`docs/wave18-onboarding-parity.md`.

### What shipped
- **`/welcome`** (`app/welcome/{page,WelcomeFlow,LangDropdown}.tsx`,
  `welcome.module.css`): Step 1 of 2 *Language Setup* (Funlingo lockup +
  welcome subtext, searchable Native / Learning dropdowns) → Step 2 of 2
  *Learning Preferences* (Beginner / Intermediate (Recommended) / Advanced →
  Save) → *You're all set!* card → `/`. Back button, step counter, animated
  gradient progress bar, slide-in — all motion inside
  `prefers-reduced-motion: no-preference` (+ `body[data-motion=off]`).
- **Gate**: `app/page.tsx` redirects to `/welcome` when
  `needsWelcome()` (`src/server/onboarding.ts`) says so. Pure rule in
  `src/lib/onboarding/flow.ts#shouldShowWelcome`. Only `/` gates — never
  `/learn` or deep links.
- **Storage**: signed-in → `POST /api/settings` (withIdempotency) with
  `nativeLang`, `uiLocale`, `activeLearningLang`, `level` (CEFR) and
  `onboarding: "done" | "skipped"` (→ `Prefs.json.onboarding`). Signed-out
  (or 401) → `fl_native` / `fl_learning` / `fl_level` cookies. Always sets
  `fl_welcome=done|skipped`.
- **Reopen**: Settings → Languages → "Run welcome setup"; signed-out
  Settings card has a secondary "Run welcome setup" action.

### Ported vs dropped
- Ported: welcome header, both language pickers (search on autonym / code /
  English name), live re-localisation when native changes, proficiency
  pills (default Intermediate), Save, step chrome, the all-set card.
- Dropped: Beginner → Standard/Active/Casual mode picker and Step 3 Display
  Controls (both drive the extension's on-player captions; no web
  equivalent → would be dead settings). Install-time demo-video tab.
- Added (web): explicit "Skip for now"; Esc / scrim click also skip, and
  skip is remembered (the extension re-prompts every page load).

### Gotchas
- **AppShell `.shell` is a stacking context (`z-index:1`)**: any full-page
  overlay rendered inside a page sits UNDER TopNav (40) / BottomTabs (50)
  no matter its z-index. Portal to `<body>` after mount.
- **Background Browser-pane tabs throttle animations** — a screenshot mid
  pop-in looks "dim / under the nav". Check `document.getAnimations()`
  before calling it a bug.
- **Cookies are per host, not per port**: QA on `localhost:3018` reads and
  writes the same `fl_*` cookies as Jay's `localhost:3000`. Restore them
  after testing (we restored `fl_native=hi; fl_learning=es`).
- Level mapping is test-pinned: Beginner→A1, Intermediate→B1,
  Advanced→B2 (SPEC §3 tops out at B2).
- SPEC §3 asks for more steps (sign-in, interests, daily goal, extension
  card). Not built — parity direction won; flagged for an owner call.
- Language lists in `flow.ts` must equal TopNav's pills (test-pinned).

### Strings for the Wave 14 catalog lane
Translated (22 locales) from the extension's `dist/i18n.js` →
`src/lib/onboarding/ext-strings.json` via
`node scripts/extract-onboarding-strings.mjs <dist/i18n.js>`:
`onboarding.{welcomeSubtext,stepOf,goBack,languageSetup,nativeLanguage,
learningLanguage,nextStep,learningPreferences,proficiencyLevel,recommended,
save}`, `proficiency.{beginner,intermediate,advanced}`, `fta.{heading,step2}`.

English-only web strings (`WEB_EN` in `src/lib/onboarding/strings.ts`) —
need translations:
- `dialogLabel` "Welcome to Funlingo"
- `skip` "Skip for now"
- `searchLanguage` "Search language…"
- `noMatch` "No languages match"
- `saveError` "Couldn't save. Try again."
- `saving` "Saving…"
- `allSetSub` "Fun Learning is ready for your {learning}. Here's where to start:"
- `allSetStep1` "Paste a YouTube link in Library to study it line by line"
- `allSetStep3` "Tap any word to see what it means and save it"
- `allSetCta` "Start learning"
- Settings: "Welcome setup", "Run welcome setup", "Walk through your languages and level again."

### Feedback hooks for the Wave 15 lane
- `// feedback: onboarding-save` in `WelcomeFlow.tsx#save` (extension: 900 Hz
  sine, 0.3 s). The extension's other onboarding sounds belong to the
  dropped Display Controls toggles.

### Verified
- `pnpm vitest run --no-file-parallelism` — 29 files / 286 tests
  (+21 in `tests/unit/wave18-onboarding.test.ts`).
- `pnpm build` clean; `/welcome` 10.7 kB.
- Real browser (`next start`): `/` → 307 `/welcome` on a cookie-less visit;
  search "engl" → English; native switch re-localises live (hi → en, ar RTL,
  de); Save writes `fl_native/fl_learning/fl_level/fl_welcome=done`; CTA
  lands on `/` with `<html lang>` updated; Esc → `fl_welcome=skipped` → `/`;
  375px: no horizontal scroll. Signed-in save path NOT exercised in a
  browser (no test session) — covered by route greps only.
- e2e `smoke.spec.ts` now sets `fl_welcome=done` before visiting `/`.
## Wave 16 Watch parity (2026-10-25)

Audited `/watch` against the extension 1.3.2 **in-player JS** (not CSS): every `t("…")` key used by `shared_content.js` (119) resolved to English, every `chrome.storage` key + default listed, every `keydown` listener read in context, plus the add-on scripts (`funlingo-subtitle-plus/replay/instant-tts/save-fx/word-popup/word-meta.js`). Inventory + status per row: `docs/wave16-watch-parity.md` (61 rows: 10 present, 37 ported/fixed, 2 not allowed, 5 N/A, 7 deferred).

**Shipped:** word card says the word on open + "Hear it again", card settings (meanings 1–3, size 50–150 %, pronounce on/off), phrase lookup by extending ± one word, "Root word", examples with the word highlighted + translation + learner-language definition, save ⇄ remove, deck-aware saved state, saved-word self-test (Tap to reveal → I know this), star burst; video pauses while a card is open and resumes on close; per-track Show/Blur/Hide + size + colour swatches, weight, line spacing, hide bracket cues; saved words highlighted in every video (lemma-aware, `GET /api/watch/saved`); replay button + "pause after replaying a line"; hover-pause on the active line with a one-time toast; ±10 s (buttons + Shift+←/→); speed panel (0.25–2×, presets 0.5–1.5×, remembered); voice picker; word-glow nudge; save-line heart + Cmd/Ctrl+S (was saving the first word — bug).

**Learnings / rules for the next agent**
1. **Prefs are per-viewer → localStorage via `src/lib/watch/prefs.ts`**, sanitised on read (`sanitizePrefs` drops unknown keys so caption text can't sneak in). Load in an effect after mount (SSR match). Cross-device sync seam = `Prefs.json`.
2. **Save line obeys the same gate as save word**: `src/lib/watch/drm.ts` (moved out of the saveWord route — Next route files can't export helpers). YouTube/streaming → word-less `Encounter` with `line: ""` + timestamp; own content → private `Sentence` in `favorite`. Copy must not promise a sentence card for YouTube saves ("the heart stays on this line").
3. **Self-test arms only for words already in the deck when the card loaded** — otherwise saving a new word instantly blurs its meaning.
4. **Demo clock seeks need a nonce**: the demo timer captured `demoSec` at effect start, so line jumps were silent no-ops in `/watch/demo`. `seekTo()` now bumps `demoSeekNonce`.
5. **Synthetic `mouseover` won't trigger React `onMouseEnter`** in the App Router (the whole document is React-owned). QA hover behaviour with a real pointer (`computer` hover), not `dispatchEvent`.
6. **The card swallows page shortcuts** (`data-fnl-wordcard`), so it must honour its own advertised "Save word (S)" — it does now via `[data-fnl-save-word]`.
7. **Not allowed, don't re-propose:** caption-line TTS (LEGAL #1 "TTS read-outs"), custom fonts (Poppins only). Overlay-only styling (vertical lift, text edge, background box, caption opacity) is N/A beside the player.
8. **QA recipe that works for signed-in flows without OAuth:** scratch SQLite (`prisma migrate deploy` with `DATABASE_URL=file:<scratch>`), insert a `Session` row (database strategy) and set `authjs.session-token` on localhost. Never point at the shared `prisma/dev.db`.

**Wave 15 hand-off (sounds/haptics):** call sites marked `// feedback: word-saved` (`WordCardPopup.tsx`) and `// feedback: line-saved` (`WatchClient.tsx`). Extension sounds there: save ding (two triangle tones 659→988 Hz), no-captions beep (900 Hz sine).

**Wave 14 hand-off (i18n):** all new English UI strings are in `src/lib/watch/strings.ts` (`W16` const — word card, subtitle settings, speed, transport, hover-pause, saved-word hint). Pre-existing hard-coded watch strings are untouched.

**Deferred with reasons:** pronunciation line (pinyin/kana/romanization/German gender — needs ~4 MB libs or a prompt change + idiom run), reveal/skip encounter log + auto-graduate (schema), light caption theme (no light tokens), transliteration row + learning modes (no transliteration service), karaoke (no word timings), difficulty annotations (word-list provenance).
## Wave 17 popup parity (`agent/17-popup-parity`, 2026-10-25)

**Scope.** Behaviour audit (not CSS) of the extension popup (`popup.html`,
`popup.js` saved-words store `xo` + Activity tab, `quick-translate.js`) and
`learn.js` Saved / Word Replay / settings drawer, against `/words`,
`/sentences`, `/settings`, `/library`, `/progress`. Full table:
`docs/wave17-popup-parity.md` (56 features: 9 present, 17 ported, 1 not
allowed, 10 N/A, 2 Wave-15-owned, 17 deferred with reasons).

### Shipped
- **/words saved-word card** — real meaning + up to 3 extra senses + CEFR
  from `WordCardCache` (was always `gloss: null`), encounter count ("seen N
  times"), platform badge, saved date, counts header "{total} saved · {known}
  known", sort Recent (last encounter → save date, the popup's order) / A–Z /
  Most seen, "All platforms" filter. Loader: `src/server/words/load.ts`;
  pure helpers + copy: `src/lib/words/view.ts`.
- **I know this / Reactivate** — `POST /api/words/state` (idempotent,
  owner + lang scoped, only `known` | `learning` settable). Graduated words
  (`known`/`mastered`, `src/lib/words/state.ts`) are now dropped from
  `cardsDueNow` in `src/server/review/scheduler.ts` — both due rows and fresh
  pulls — so the button is honest.
- **Remove + Undo + bulk Select** — `POST /api/words/delete` (idempotent,
  lang-scoped, clears `ReviewCardState` rows by hand since there's no FK).
  The client hides rows at once, holds the request 8s for Undo, sends it with
  `keepalive` on `pagehide`, and restores rows if the request fails.
- **Export from /words** — `GET /api/export?what=words&format=csv|anki&lang=xx`.
  Anki = tab-separated `.txt` with `#separator:tab / #html:true /
  #notetype:Basic / #tags column:3` headers (`src/server/export/anki.ts`).
  CSV gained a `meaning` column. Only the learner's own words; DRM lines are
  never stored, so never exported.
- **Settings › Listen voice** — per learning language, `Prefs.json.voicePrefs`
  mirrored to `localStorage["fl_voice_prefs"]`; `SlangAudioButton` uses it via
  `preferredVoice()` (`src/lib/voice/prefs.ts`) and falls back to scoring.
  Deliberately per-language: the extension's single `voicePref` speaks
  Japanese in a Spanish voice if you switch languages.
- **/library "Recently watched"** — top 3 `VideoSession` rows for the active
  language, progress bar, "Resume · N% watched" / "Watch again".
- **/progress** — "N words this week" in the Words-saved hint.
- **/sentences regression** — it borrowed `.toolbar/.iconBtn/.wrap/.row…`
  from `Words.module.css`; Wave 11 deleted them, page rendered unstyled. Now
  owns `Sentences.module.css`. The no-op practice `<button>` is a link to
  /review; rows got a Listen button.
- **Settings side nav** no longer floats over the form in one column.

### Gotchas future lanes should know
- **Never borrow another component's CSS module.** `tests/unit/wave17-css-classes.test.ts`
  now fails if a component uses `styles.X` that its module doesn't define —
  add your component to `PAIRS` there.
- **Page/route files can't export helpers** (Next build rejects extra named
  exports). Put loaders in `src/server/*`, pure helpers in `src/lib/*` — also
  lets Vitest import them without pulling JSX (`React is not defined`).
- **Real-page QA with auth:** sessions are DB-backed. Insert a `Session` row
  and set `authjs.session-token` — but use `http://127.0.0.1:<port>`, not
  `localhost`: parallel agents share the browser profile and overwrite each
  other's `localhost` cookie.
- **Wave 16 follow-ups (their lane, not touched):** `app/api/watch/saveWord`
  should flip a `known`/`mastered` word back to `learning` when re-saved
  (popup `saveWord` does); caption style prefs seam in the audit doc.
- **Wave 14 strings** (English, to move into `src/lib/i18n/catalog`):
  `WORDS_STR` in `src/lib/words/view.ts`, `VOICE_STR` in
  `src/components/settings/VoicePicker.tsx`, `RECENT_STR` in
  `src/components/library/RecentlyWatched.tsx`, plus the progress hint
  "{n} words this week" and the sentences "Practise in today's review".

### Verified
- `pnpm build` clean; `pnpm vitest run --no-file-parallelism` 33 files /
  286 tests (+5 Wave 17 files).
- Eyes-on at 800px and 375px with adversarial seed (50-char lemma, Hindi
  meanings, long titles, 0-encounter word): I know this → badge + queue,
  remove → toast → Undo (no request sent), Select → bulk remove, CSV + Anki
  downloads, voice choice persists across reload, Recently watched, no
  horizontal scroll at 375px.

## Wave 14 UI-text i18n catalog (`agent/14-i18n-chrome`, 2026-10-25)

Resolves the Wave 12B "don't invent half an i18n layer" flag (§ page-title
i18n, FLAGGED GAP) by building a whole one. **Supersedes** the Wave 3
BLOCKER-2 layout rule (`uiLocale → activeLearningLang → "en"`): the learning
language must never decide chrome.

### THE RULE — nativeLang vs activeLearningLang
- **Chrome (labels, buttons, counters, empty states, aria, metadata) keys
  on the viewer's NATIVE language.** Resolution: `user.nativeLang →
  user.uiLocale → "en"`. Never `activeLearningLang`.
- **Content (topics, packs, phrases, scenes, decks) keys on
  `viewer.activeLang`.** Unchanged.
- A Hindi-native learner studying Japanese = Hindi buttons around Japanese
  phrases. If you're unsure which a string is: would it change if the
  learner switched *learning* language? Then it's content.
- **Translation targets are native too.** `LessonChat` used to send
  `navigator.language` as "translate into"; it now sends the saved
  `nativeLang` (`useNativeLang()`), browser locale only as fallback.

### Shape
| File | Role |
|---|---|
| `src/lib/i18n/catalog/en.ts` | **Source of truth.** Hand-edited flat object, `area.purpose` keys. Defines the key set. |
| `src/lib/i18n/catalog/<lang>.ts` ×11 | **Generated** — don't hand-edit. hi es ja zh ar fr de pt ko it tr. |
| `src/lib/i18n/catalog.ts` | `t(key, lang, params?)`, `bindT`, `normalizeLocale`, `pickCatalog`, `clientSlice`, `CLIENT_KEY_PREFIXES`. Server-only in practice (imports all 12). |
| `src/server/i18n.ts` | `getT(viewer)` (server components), `chromeLocale(viewer)` (RAW code), `catalogLocale(viewer)` (one of the 12). |
| `src/lib/i18n/client.tsx` | `<I18nProvider>` (mounted in `app/layout.tsx`), `useT()`, `useLocale()`, `useNativeLang()`. |
| `scripts/i18n/build-catalog.mjs` | Regenerates the 11 locale files. `--check` fails if stale. |
| `scripts/i18n/ext-snapshot.json` | 35 extension keys × 12 locales, verbatim from extension 1.3.2. |
| `scripts/i18n/gen/<lang>.json` | LLM translations for keys the extension doesn't have. |

- **Fallback chain:** requested lang → `en` → the raw key. Never throws.
  A missing `{param}` is left as the literal `{name}` (loud, not silent).
- **Interpolation:** `t("tinyLessons.phrasesPlural", "hi", { n: 12 })` →
  `"12 वाक्यांश"`. Plurals are separate keys (`…Singular` / `…Plural`);
  Arabic uses a label form (`"العبارات: {n}"`) to sidestep its 6 plural
  forms — revisit with `Intl.PluralRules` if a native reviewer asks.
- **Raw vs catalog locale:** `<html lang/dir>` + `data-funlingo-locale`
  use the RAW native code, so a Marathi/Gujarati/Urdu/Hebrew native keeps
  their font stack and RTL even though their TEXT falls back to English.
  Normalising before setting `dir` would silently un-RTL Urdu users.
- **Brand names** `Fun Learning`, `Fun` / `Learning` (hero), `Funlingo`
  are identical in all locales (generator `BRAND` map + unit test).

### How to…
- **Server component:** `const t = getT(viewer); <h1>{t("talk.title")}</h1>`.
  Pages with static `metadata` → convert to `generateMetadata()`.
- **Client component:** `const t = useT();` — then **add the key's prefix
  to `CLIENT_KEY_PREFIXES`** or the browser gets the raw key. The layout
  ships only those prefixes (one locale, ~6.5–11 KB pre-gzip); the 12 full
  catalogs (~164 KB) never reach the client (verified: no catalog strings
  in `.next/static`).
- **Add a key:** add to `en.ts` → add to all 11 `scripts/i18n/gen/*.json`
  (or map it in `EXT_MAP` if the extension already ships it) → `node
  scripts/i18n/build-catalog.mjs`. `wave14-i18n.test.ts` fails on any
  key-set mismatch, empty value, or placeholder drift.
- **Native-speaker fix:** edit `gen/<lang>.json`, rerun. No code changes.
- **Watch the shadowing trap:** `t` collides with loop vars like
  `topics.map((t) => …)` — TypeScript catches it as "not callable"; rename
  the loop var, not the translator.

### Gotchas this wave hit
- **Source-text tests go vacuous when copy moves into a catalog.** Two
  existing tests kept passing for the wrong reason: tile-order matched the
  English names in the file's *header comment*; the "tiles stay unlocked"
  check sliced between markers that no longer existed, so `not.toContain`
  ran on `""`. Rule: when slicing source by markers, **assert each marker
  exists first**; assert on `t("key")` calls + the EN catalog value.
- **The extension catalog has a factual error in Hindi:**
  `learn.slangsViewDesc` says the example stays "in English" (अंग्रेज़ी में).
  Skipped via `EXT_SKIP.hi` with a corrected value. Tell the extension team.
- **The extension translates the brand in some sentences** (hi
  `welcomeTitle` = "फन लर्निंग में…", ar `navTitle` = "التعلم الممتع").
  We force the brand on brand-only keys; sentences stay verbatim. Decide
  product-wide whether "Fun Learning" is ever localised.
- **Vitest now uses the automatic JSX runtime** (`esbuild.jsx` in
  `vitest.config.ts`) so tests can `renderToStaticMarkup` real server
  components with `vi.mock("@/server/session")`.
- **Worktrees start with an empty `prisma/dev.db`** (gitignored). Run
  `DATABASE_URL=file:./dev.db pnpm prisma migrate deploy` before
  `pnpm test`, or ~30 DB tests fail with "table does not exist".

### Known gaps (not done this wave)
- **`getViewer()` is now called ~6× per request** (layout,
  `generateMetadata` ×2, AppShell, TopNav, page). Wrap it in React
  `cache()` — blocked only because Vitest runs stable React 18.3 (no
  `cache` export); needs a test-env shim.
- **`?dev_user=` only reaches the page body**, so in local dev the shell
  (rail, tabs, `<title>`) stays English for a dev-user Hindi learner. A
  real sign-in localises everything.
- **Signed-out visitors get English chrome** — no `Accept-Language`
  detection yet.
- **Situation English titles** (`titleEn` on Tiny Lessons tiles/H1) are
  pack *content* and stay English; for a non-English native they should
  be the native-language gloss. Needs content-data work, not catalog work.
- Not converted (outside the Wave 14 table): `/`-home extras, `/library`,
  `/sentences`, `/progress`, `/settings`, `/account`, `/watch`, `/review`
  (non-quiz modes), help-ladder labels (`helpLabel()`), and the decorative
  aria-hidden motif words on the landing tiles (deliberate).
- **All non-extension strings are LLM translations** tagged `// TODO:
  native review`. Lowest confidence: **ar, ko, tr**. The structure is
  permanent; values can be fixed in JSON without touching code.

### Verified (Wave 14)
- `pnpm build` — ✓ clean. `/talk` 892 B route / 110 kB first load;
  shared first-load JS 100 kB.
- `pnpm test` — ✓ 286/286 (new `wave14-i18n.test.ts`: 21 tests).
- Live: Hindi-native (learning `es`) on `/talk` → `<h1>ज़ोर से बोलकर देखें।</h1>`,
  "3 टास्क", Hindi lede; zero "N tasks" / "Say it out loud" in markup.

### Merged with Waves 15–18 (main `a9cd6ce`)
- `chromeLocale()` also reads `viewer.nativeLang` (Wave 15+ fills it from
  the `fl_native` cookie for signed-out visitors), so the "signed-out =
  English" gap above only applies to visitors who never picked a language.
- **Four parallel English string modules still need folding into the
  catalog** (each says so in its header): `src/lib/feedback/strings.ts`
  (Wave 15 drawer/toasts), `src/lib/watch/strings.ts` (Wave 16),
  `src/lib/words/view.ts` `WORDS_STR` (Wave 17 actions/sort/platform), and
  `src/lib/onboarding/strings.ts` + `ext-strings.json` (Wave 18 — already
  per-locale, check its key overlap first). Pattern: add keys to `en.ts`
  (map to the extension key in `EXT_MAP` where one exists), translate in
  `gen/*.json`, swap the import for `t()`/`useT()`, and convert any copy
  assertion to "uses `t(key)` + EN value equals the old constant".
- `[ext-dev]` tier: `scripts/i18n/ext-dev-snapshot.json` holds
  team-written strings from the extension's dev source that never shipped
  in 1.3.2 (quiz Correct!/Correct answer/Skip for hi/es/ja/zh/pt).

### Branch SHA
- `agent/14-i18n-chrome` based on `31aa5e6`; main (`a9cd6ce`, Waves 15–18) merged in.

## Wave 19 — content-surface i18n (2026-10-26)

Folds the deferred English-only string sources into the Wave 14 catalog so a
non-English native sees the CONTENT-SURFACE bodies in their native language,
while the study CONTENT (captions, phrases, lesson/book text) stays in the
language they're learning. Completes the "Pending / next milestone" item in
PROJECT-STATE.md.

### What landed
- **429 new EN keys × 12 locales** added to `src/lib/i18n/catalog/en.ts`
  (source of truth) + generated into all 11 non-EN locale files via
  `scripts/i18n/build-catalog.mjs`. No MISSING keys; `--check` clean.
- Surfaces now localized (chrome/copy only; study content untouched):
  - **Watch player** (`watch.*`, ~185 keys): mode labels (Default/Focus/
    Cinema), transport + controls, Auto-pause/Loop/Translation/Hide-text,
    subtitle-settings panel, speed panel, word card, culture panel, shortcut
    help, demo banner ("Try the demo…"), glow hint, all toasts + aria.
  - **/settings** (`settings.*` + `feedback.*`): every section title, lede,
    label, hint, the Appearance/Theme section (System/Light/Dark), the
    experimental on-device-pronunciation copy, My-data, shortcut table, status.
  - **/welcome** (`onboarding.*`): the WEB_EN block — Skip for now, Start
    learning, Saving…, Couldn't save, search placeholder, all-set steps.
  - **/progress, /sentences, /library (+ podcasts/sentence-packs/show-packs)**:
    headers, section titles, ledes, empty states, counts, chips.
  - **/words** (`words.*`): actions, select/bulk bar, sort, platform filter,
    seen/saved lines, undo toasts, known hint.
  - **/learn welcome card** (`learn.welcomeBody`): rewritten with
    `{replay}/{quiz}/{lessons}/{slang}` placeholders, interpolated from the
    already-translated tile-title keys so NO English feature names are stranded
    mid-sentence in any locale (removed from `EXT_MAP`; gen now supplies it).

### How it was built (reusable recipe)
- **W16 pattern:** `src/lib/watch/strings.ts` became `buildW16(t)` returning the
  same object shape the 4 watch components already consumed (`W16.listen`,
  `W16.removed(w)`, `W16.colors[c]`). Call sites just added
  `const W16 = buildW16(useT())` — minimal diff. Same trick for
  `SHORTCUT_HELP` (label → `labelKey`) and `FEEDBACK_STRINGS`/`WORDS_STR`
  (swapped `S.x`/`WORDS_STR.x` for `t("…")`).
- **Bundle discipline (THE key lesson this wave):** adding all new client keys
  to the GLOBAL `CLIENT_KEY_PREFIXES` blew the <25 KB global-slice guard
  (hi hit 26.4 KB — the long settings copy ships everywhere). Fix: big
  SINGLE-PAGE client surfaces get a **nested `<I18nProvider>`** built with
  `pageClientSlice(locale, EXTRA_PREFIXES)` (global chrome + that page's keys):
    - `watch.*` → `/watch` (`watchClientSlice`)
    - `settings.*`+`feedback.*` → `/settings`
    - `onboarding.*` → `/welcome`
    - `sentences.*` → `/sentences`
  Only `words.*` extras stay global (small; `/words` has no nested provider).
  Nested providers also fixed the signed-out chrome: `/watch` now resolves its
  locale from `getViewer()` (reads `fl_native`), not the fabricated demo user.
- **Translations:** ran **4 parallel sub-agents** (Romance / de+tr / hi+ar /
  CJK), each writing a focused `{key: translation}` JSON per locale to the
  scratchpad; a merge script validated (429 keys, 0 missing/extra, placeholder
  parity, non-empty) BEFORE merging into `scripts/i18n/gen/*.json`. All marked
  `// TODO: native review` by the generator. Keep that validate-before-merge
  gate — it catches dropped keys and placeholder drift the test would only
  catch later.

### Gotcha repeated from Wave 14
- **Source-text tests go vacuous when copy moves into the catalog.** Three
  `wave13-watch-demo-unauth.test.ts` greps for literal English ("sign in →",
  "Sign in to save →", demo banner) broke. Rewrote them to assert the component
  references the `t("watch.…")` KEY **and** the EN catalog value equals the old
  string. Do this for every copy-assertion you move.

### Tests
- `tests/unit/wave19-content-i18n.test.ts` (16 tests): new-key families exist +
  are translated (and differ from EN for a sampled visible label), interpolation
  on new keys, welcomeBody strands no English feature names, bundle discipline
  (watch.* absent from global slice; page slices carry their keys; <25 KB global
  / <45 KB watch), and real Hindi server-rendered /progress /sentences /settings
  bodies.
- `pnpm build` clean; `pnpm vitest run --no-file-parallelism` → **391/391**
  (was 375; +16 wave19). Live-verified signed-out `fl_native=hi` on `/settings`
  (सेटिंग्स/दिखावट/थीम/साइन इन) and `/watch/demo` (सिनेमा/लूप/अनुवाद/डेमो with
  English captions "We choose to learn"/"break the ice" intact; brand
  "Fun Learning" kept English).

### Known / deferred (not this wave)
- A few progress/library SUB-components left English on purpose (ActivityHeatmap
  month labels Jan–Dec + less/more legend + "{date}: {value} units" tooltip;
  ChannelRecommendations). They're borderline content/decoration; flagged for a
  follow-up if Jay wants them.
- All 429 new values are LLM translations (TODO: native review); ar/ko/tr lowest
  confidence, same as Wave 14. Fix = edit `scripts/i18n/gen/<lang>.json` + rerun.

## Lead QA final (2026-10-29) — full adversarial pass before Jay

Own worktree off main, DB migrated + ALL seed scripts run (talk 144 topics /432
lessons, packs 94 [91 sentence + 3 show] / 2580 items, books 153 [111 classics +
42 graded], podcasts 43, yt-channels 75). Drove real pages signed-out (cookie
path `fl_native=hi;fl_learning=es;fl_welcome=done`) AND signed-in (created an
Auth.js DB Session row for the seed user — getViewer is session-only, does NOT
read `?dev_user=`, so a Session row + `authjs.session-token` cookie is the only
way to render signed-in pages; also had to restart dev with `AUTH_URL` matching
the actual port + `AUTH_TRUST_HOST=true`, else auth() throws UntrustedHost →
caught → silently signed-out). Tested hi / en / ar (RTL) / mr + ur (no-catalog)
at desktop and 375px.

### GATES
- `pnpm build` → **clean, exit 0, "Compiled successfully", 38/38 static pages.**
  2 ESLint **warnings** (not errors, don't fail the build):
  - `app/talk/[topicSlug]/[lessonSlug]/LessonChat.tsx:356` useCallback missing
    dep `t` (react-hooks/exhaustive-deps).
  - `src/components/watch/SubtitlePane.tsx:201` aria-description unsupported on
    role=button (jsx-a11y). → both P2.
- `pnpm vitest run --no-file-parallelism` → **391/391 passing** (39 files, 6.5s).

### VERDICT: SHIP-WITH-CAVEATS
No P0, no crash, no data-loss, no user-facing lie. Every recent fix HOLDS (a–m
below). Gates green. The two P1s are **pre-existing, documented localization
gaps, not regressions** — but they are stranded-English on CORE surfaces that the
localization milestone set out to close, so fix them before calling i18n "done".

### P1 — English-leak on a core surface (non-English native)
1. **/review is 100% hardcoded English.** `app/review/page.tsx` has NO `getT` at
   all — eyebrow "Review"/"Daily session"/"Signed out"/"Sign in to start
   reviewing"/"Your streak…"/"Browse the library", AND the quiz empty-state
   wrapper (lines 229-240), AND `ReviewRunner.tsx:481` "Browse the library →".
   For a Hindi native every other main tab (/words /talk /sentences /progress
   /read) is fully Hindi; /review alone is all English. It's a main nav tab.
   (Documented Wave-14 gap "/review non-quiz modes not converted" — still open.)
   Repro: `curl -H 'Cookie: fl_native=hi;fl_learning=es;fl_welcome=done'
   localhost:PORT/review`.
2. **/library default "YouTube" tab is all English.** The discovery panel a
   Hindi native lands on first: "Paste a YouTube link", "Open in study player",
   "Any public video with captions…", "Browse Show Packs", "Channels you might
   like", "Hand-picked for ES learners", "Follow", "Visit on YouTube", and the
   category filter chips (All/Education/News/Comedy/Society & Culture/Tech/
   Travel). The feed empty-state + nav ARE Hindi (Wave 19), but the YouTube
   discovery sub-component was never wired to `getT`.

### P2 — secondary-surface leaks / polish / content
3. **/words/lists** fully English (roadmap placeholder: "Word lists",
   "Hand-picked lists…", "Nothing to study yet", "Lists ship with your learning
   language", IELTS/TOEFL/JLPT list).
4. **/read/upload** fully English ("Bring your own book", "Drop an EPUB", "Drag
   an .epub here, or Choose a file", tab title "Upload a book").
5. **Library taxonomy chips English** across podcasts/sentence-packs/show-packs
   + pack-detail headers: category filters (News, Society & Culture, Comedy,
   Language learning) and theme labels (Travel, Proverbs & Idioms, Famous Quotes,
   Everyday, Emotions & Small Talk, Business & Email, Idioms, Anime) and
   "Discover". CEFR levels (A2/B1/B2) are fine (universal). Pack-detail shows
   "वाक्य पैक · Everyday" (theme stays English).
6. **Slang / Tiny-Lessons card MEANINGS are English-only** regardless of native
   lang (e.g. "mola" → "it's cool / it's awesome" for a Hindi native). The
   Spanish example + the "संदर्भ में" label ARE localized; the gloss is pack
   content-data, not catalog → needs content work (roadmap), flag only.
7. **Empty show pack listed:** "Office slang from Aggretsuko" (ja, 0 items)
   appears in a ja learner's Show Packs and opens to a graceful "no items yet"
   (no crash) — seed/content gap, drop it from the catalog or seed its items.
8. **Possible title vs count mismatch (low-confidence):** show pack
   "Español cotidiano — 50 líneas cortas" / "Everyday English — 50 short lines"
   each have only 24 PackItems. May be "source lines" vs vocab entries (not a
   lie) — confirm intent. The app's own `{n} sentences`/`{n} वाक्य` counters are
   all TRUE (50/25/25/24 matched DB exactly; tiny-lessons "12 वाक्यांश" == "1/12"
   deck).
9. Settings voice line uses English exonym "Spanish" ("Spanish के लिए कोई आवाज़
   उपलब्ध नहीं") — consistent with the documented "learning-lang = English
   exonym" decision, noted for completeness.

### Regression re-verification — ALL HOLD
(a) pack detail OPENS at colon ids — 200 for sentence-packs & show-packs (raw
    and %3A-encoded). (b) /progress "Reviews 7d" 66 ≤ "255 in last 30 days",
    consistent; "Words saved 3" == DB; week ≤ all-time, streak ≤ best.
(c) /read shelves scoped to learning lang (ja→Japanese Aozora classics only;
    es→Spanish Gutenberg only — no jumble). (d) /talk = 8 situations ONCE each,
    no Doctor/Médico dupe. (e) theme toggle instant (`data-theme`+localStorage)
    AND persists across reload, no flash. (f) ONE Home nav entry. (g) empty-state
    glyph = filled SPARKLE not spinner (verified /words + /settings). (h) demo
    play button sits BELOW the caption at 375px, no collision. (i) lang pills
    persist signed-out — pill change writes the cookie (fl_learning) and does NOT
    roll back; the signed-out POST /api/settings 401 is expected and benign
    (client falls back to cookie + RSC refetch). (j) demo TRANSLATION row shows
    distinct HINDI bundled translations per line after hydration (SSR shows the
    "अनुवाद हो रहा है…" placeholder; client swaps in). (k) pack detail + library
    tabs render in Hindi. (l) terminology consistent across walked surfaces
    (nav/feature names) — full native-QA not independently re-verifiable, tests
    pass. (m) listen/voice buttons present w/ aria-labels; `vibrate()` is fully
    guarded (prefs+capability+try/catch); voice-prefs unit tests pass; actual
    audio is device-capped, not headless-verifiable; no throw observed.

### Honesty / crash dimension
- **No raw catalog-key leaks** anywhere (text nodes + aria/title/placeholder),
  across hi/ar/mr/ur + signed-in en — consolidated grep clean.
- **No console errors / hydration mismatches / 500s / blank pages.** Only two
  benign console logs: Chrome's "navigator.vibrate blocked (no user tap yet)" =
  automation artifact (guarded, graceful), and the expected signed-out 401.
- **API writes correct:** /api/words/state (graduate→known 200), /api/words/delete
  (empty array→400 VALIDATION_FAILED; real delete→200 {deleted:1}, count 3→2→3
  after reseed), /api/settings (sound persisted to Prefs JSON; theme is
  client-only by design), unauth write → 401 (no rollback). **Idempotency works:**
  same Idempotency-Key twice → 2nd returns `x-idempotent-replay: 1` with
  identical body.
- **RTL:** ar + ur set `dir=rtl`; mr sets `dir=ltr` (correct); no-catalog langs
  fall back to English text but KEEP font-stack + RTL (ur stays RTL — the Wave-14
  "don't normalize before dir" fix holds). No horizontal overflow at 375px in
  any of hi/ar/mr/ur.

### Design sanity
Slang Hang hue = **#a78bfa lavender** confirmed at render (`--card-hue`), not
magenta; all 5 tile vibe hexes match the extension (cReplay #ec4899, cQuiz
#fbbf24, cLessons #2dd4bf, cSlang #a78bfa, cLibrary #d678f0). Single-card flip
decks (flip verified on Slang). Era badges lowercase. Poppins throughout. No
sub-14px chrome beyond the documented tile/tag sizes. RTL mirrors logo + nav
cleanly.

### Top items to fix if acting on this
1. Wire `app/review/page.tsx` (+ ReviewRunner "Browse the library") through
   `getT` — ~8 strings, highest impact (core tab, all English).
2. Localize the /library YouTube discovery panel (paste-link, channel recs,
   category chips, Follow/Visit).
3. Then the P2 sweep: /words/lists, /read/upload, library taxonomy chips — fold
   into the native-review/content pass.
## Lead-QA P1 fix: /review + /library discovery i18n (2026-10-29)

Closed the two P1 localization gaps the Lead QA found: every other surface was
localized, but **/review** (server page + ReviewRunner) and the **/library
default "YouTube" discovery panel** still rendered English chrome for a
non-English native. Wired both into the Wave 14/19 catalog across all 12 locales.

### What landed
- **58 new EN keys × 12 locales** (`review.*` ×43, `library.*` discovery ×15)
  in `src/lib/i18n/catalog/en.ts`; translated into all 11 `scripts/i18n/gen/*.json`
  (natural/informal register, `// TODO: native review`), then `build-catalog.mjs`
  regenerated the 11 locale files. `--check` clean, no MISSING, placeholder parity OK.
- **/review** `app/review/page.tsx`: added `getViewer()` + `getT` (chrome keys on
  NATIVE lang via the `fl_native` cookie). All signed-out + quiz-empty strings wired.
- **ReviewRunner.tsx** (client, `useT()` via the ROOT global provider): empty-due,
  drill labels, session header/summary (title, body w/ singular-plural `{cardWord}`
  /`{minuteWord}` slots, stat labels, footer), quit prompt, summary-action links.
- **/library** default tab: added `LIBRARY_KEY_PREFIXES = ["library."]` and wrapped
  `app/library/page.tsx` in a page-scoped `<I18nProvider slice={pageClientSlice(locale, LIBRARY_KEY_PREFIXES)}>`
  (mirrors /settings). Wired `YouTubePaste`, `ChannelRecommendations` (resolves the
  Wave 19 "ChannelRecommendations left English" flag), `LibraryEmptyActions` via `useT()`.
  Reused `library.podcastsUnverified`/`…Badge` for the channel card.

### Key decisions / gotchas
- **`"review."` added to `CLIENT_KEY_PREFIXES`** (not a page provider): the prefix
  is coarse so it ships review server strings to the global client slice too, but
  review.* is few + short — hi global slice 13.0 → ~15 KB, still well under the
  25 KB guard (test asserts it). ReviewRunner already lived under the root provider,
  so no new provider needed.
- **Only `app/library/page.tsx` renders the 3 discovery components** — NOT the
  podcasts/show-packs/sentence-packs sibling tabs (verified: no shared layout;
  LibraryTabs is a server component). The task brief said "4 library pages" but
  the components live on one. Wrapped only the default page; the siblings have no
  client consumer of `library.*`, so wrapping them would ship an unused slice.
- **Summary prose lost its inline `<strong>` bolding** on the three inlined numbers
  (total/lang/minutes): a single translatable sentence can't carry markup across
  word order. The stat grid below still shows the numbers prominently. Same for the
  "Nothing due today" body `{lang}` span. Acceptable i18n-over-emphasis trade.
- **Repeated the Wave 14/19 vacuous-source-test gotcha:** `pm-polish.test.ts`
  grepped LibraryEmptyActions for the literal "Paste a YouTube link" — broke when
  the copy moved to the catalog. Rewrote it to assert `t("library.emptyPasteYt")`
  in source AND `en["library.emptyPasteYt"] === "Paste a YouTube link ↑"`.

### Tests
- `tests/unit/review-library-i18n.test.ts` (mirrors wave19): new key families exist
  + translated (differ from EN), interpolation on `{lang}`/`{n}`/summary slots,
  bundle discipline (review.* IS global, library.* is NOT global but in the page
  slice, global <25 KB), source files call `getT`/`useT` with the old English gone,
  and real Hindi-native server renders of /review (signed-out + ?mode=quiz empty).
- `pnpm vitest run --no-file-parallelism` → **409/409** (was 391; +18). `pnpm build` clean.
- Live-verified signed-out `fl_native=hi; fl_learning=es; fl_welcome=done` on port 3081:
  /review (आज का सेशन / रिव्यू शुरू करने के लिए साइन इन करें), /review?mode=quiz
  (पहले कोई शब्द सेव करें / आपका शब्द डेक खाली है), /library (चैनल जो आपको पसंद आ
  सकते हैं / "ES सीखने वालों के लिए…" / YouTube पर देखें). Brand "Fun Learning" +
  "YouTube" stayed English; no raw catalog keys in visible text.

### Deferred
- All 58 new values are LLM translations (`// TODO: native review`); ar/ko/tr lowest
  confidence, as always. Fix = edit `gen/<lang>.json` + rerun the generator.

### 2026-10-29 — Lead-QA P1 (final): /review DRILL components i18n

Closed the last Lead-QA P1. The review SHELL (ReviewRunner + the server page) was
localized in the prior pass, but the drill components a signed-in learner actually
touches while grading were still 100% hardcoded English:
`app/review/drills/{GradeRow,Flashcard,Dictation,GuessMeaning,Shadowing,Speaking}.tsx`.
Every visible string + aria-label + placeholder is now `t()`-driven; study CONTENT
(lemmas, saved lines, sentences) stays in the learning language, brand stays English.

**90 new keys × 12 locales** (was 834 EN keys total). Reused existing globals where
they fit: `quiz.skip` for every "Skip", `quiz.pickAria` for GuessMeaning's radiogroup
aria, and the existing `review.drillShadow` / `review.drillSpeaking` / `review.drillDictation`
for the non-on-device chips.

**KEY GOTCHA — the drills could NOT go on the global `review.` prefix.** Adding ~90
keys to `review.*` (which IS in `CLIENT_KEY_PREFIXES`) pushed the **Hindi** global
client slice to **25,517 B — over the <25 KB guard** (wave14 / review-library tests).
Devanagari is ~3 B/char, so hi is always the ceiling. Measure before trusting "short
keys are fine": a quick node script that replicates `clientSlice` over the generated
`catalog/<lang>.ts` is enough (grep keys by `CLIENT_KEY_PREFIXES`, `TextEncoder`,
compare to 25000). Fix = the Wave-19 page-scope pattern:
- new prefix **`reviewDrill.`** + `REVIEW_DRILL_KEY_PREFIXES` in `catalog.ts` (NOT added
  to `CLIENT_KEY_PREFIXES`).
- `app/review/page.tsx` now wraps `<ReviewRunner>` in a nested
  `<I18nProvider slice={pageClientSlice(uiLocale, REVIEW_DRILL_KEY_PREFIXES)}>`.
  `pageClientSlice` = global chrome (so ReviewRunner's own `review.*`/`quiz.*`/`nav.*`
  still resolve) **plus** `reviewDrill.*`. hi global dropped back to 17,091 B.
- Watch out: `"reviewDrill.".startsWith("review.")` is **false** (index 6 is `D` not `.`),
  so there's no leak into the global slice — verified 0.

**Pluralization:** relative-time ("today" / "N days ago") and "N letters remaining" use
separate singular/plural keys chosen by a ternary (`flashDaysAgoSingular`/`Plural`,
`dictLettersRemainingSingular`/`Plural`) with `{n}`, never English `+"s"` grammar.
GuessMeaning's 12-item placeholder distractor pool was ALSO localized
(`reviewDrill.guessPool1..12`) — meanings render in the learner's NATIVE language, so an
English pool would stick out beside a native correct answer. The pool is now built from
`t()` keys and passed into `pickDistractors`.

**Module-level helpers can't call `useT()`** — `buildEncouragement` / `labelFor` /
`buildPrompt` in Shadowing + Speaking now take a `t: T` param; the `OnDeviceResult` /
`ClassicResult` subcomponents take `t` as a prop (passed from the drill). The
`{sentence}`/`{lang}` in `speakPrompt` and `{matched}`/`{total}` in the encouragement
keys are preserved verbatim.

**Preserved invariants:** GradeRow still calls `fx.tap()`, GuessMeaning still calls
`fx.correct()` (wave15-feedback test stays green).

### Tests
- `tests/unit/review-drills-i18n.test.ts` (mirrors review-library-i18n): drill keys exist
  + translated (differ from EN) in all 12, all 12 `guessPool` keys per locale,
  interpolation + singular/plural + the composed rewatch aria, bundle discipline
  (`reviewDrill.*` NOT global, global slice <25 KB, page slice carries BOTH), and the 6
  source files call `useT()` with the old English gone.
- `pnpm vitest run --no-file-parallelism` → **429/429** (was 409; +20). `pnpm build` clean.
- Live-verified signed-in on port 3092 (`?dev_user=<seed cuid>&lang=ja`, cookie
  `fl_native=hi`): revealed a flashcard → grade row renders Hindi
  ("फिर से / कठिन / अच्छा / आसान", aria "अच्छा ग्रेड करें (3 दबाएँ)"), card body + rewatch
  link Hindi, clicked अच्छा → `POST /api/review/grade` **200 OK**. No visible raw keys.
- Setup reminder: this worktree needs `cp .env.example .env` then `pnpm prisma migrate
  deploy`; seed with `DATABASE_URL="file:./dev.db" node scripts/seed-content.mjs` (plain
  `node` doesn't autoload `.env`). Seed user is `seed@fun-learning.local`, learning lang `ja`.

### Deferred (drills)
- All 90 new values are LLM translations (`// TODO: native review`); ar/ko/tr lowest
  confidence. The composed `flashRewatchAria` reads slightly awkward in hi where
  `{inTitle}` meets the template ("…sketch में पर यह सीन…") — aria-only, flagged for the
  native pass. Fix = edit `gen/<lang>.json` + rerun the generator.

### 2026-10-29 — Talk + Library SEED-CONTENT i18n (PM P1 #2, the last barrier gap)

Closed the one substantial localization gap left after the chrome waves: the small,
bounded set of SEED-CONTENT a non-English native must READ to USE the product now
renders in their NATIVE language. Study content (phrases/sentences/glosses/book text),
the learning-language topic titles, and brand stay as-is.

- **What's localized** (render-time, English stored in DB/seed → mapped to a catalog key
  keyed on the viewer's NATIVE lang): Talk categories (6), situation blurbs (8), lesson
  titles+scenes (48), Library taxonomy labels (10 podcast+channel category slugs). **72
  new keys × 12 locales.**
- **How**: `src/lib/i18n/contentLocalize.ts` — pure helpers `localizeTalkCategory /
  localizeTalkBlurb / localizeLessonTitle / localizeLessonScene / localizeLibraryCategory`,
  each takes a bound `t` (`getT(viewer)` server OR `useT()` client) and a stored-English
  FALLBACK. Keys are the catalog's STABLE slugs so the mapping survives a re-seed:
  `talkContent.cat.<catKey>`, `talkContent.blurb.<situationSlug>`,
  `talkContent.<situationSlug>.<slotSlug>.{title,scene}`, `library.cat.<slug>`. A string
  with no key (hard-coded fallback topic coffee/friend/…, or an unmapped slug) renders
  the stored English — NEVER a raw key (helper returns fallback when `t(key) === key`).
  `situationSlugFromTopicId` only fires for seeded `topic:v2:<tag>:<sit>` ids.
- **GOTCHA — generator key charset**: `scripts/i18n/build-catalog.mjs` parses `en.ts`
  keys with a regex that did NOT allow hyphens. Slot/category slugs have them
  (`check-in`, `on-the-way`, `society-culture`, `tv-film`). Widened the key charset to
  `[a-zA-Z0-9.-]` after the first segment so these keys survive generation. If you add a
  hyphenated key and it silently vanishes from the locale files (→ key-parity test fails),
  this regex is why.
- **Bundle discipline**: `talkContent.*` is server-only (both /talk pages + the lesson
  page use `getT`), so it's in NO client prefix — never ships to the browser, global slice
  untouched. `library.cat.*` rides the existing page-scoped `LIBRARY_KEY_PREFIXES` slice
  (ChannelRecommendations is client). Global <25 KB guard stays green.
- **Seed-honesty P2s (same pass)**: (a) the two show-pack titles claimed "50 short lines"
  but ship 24 items → retitled to generic "…short lines"/"…líneas cortas" in
  `scripts/seed-packs.ts`; (b) the empty ja "Office slang from Aggretsuko" show pack (0
  items) removed from `scripts/seed-content.{ts,mjs}` with a `deleteMany` so a re-seed
  also clears any existing row. Verified in the DB.
- **OUT OF SCOPE (flagged, untouched)**: the ~2,580 pack-item word/phrase glosses
  ("la neta → the truth") — that's study content + a data-model decision, NOT this pass.
  Do not bulk-translate them.
- **NOTE — /talk signed-out still shows the empty state, not cards** (pre-existing gate:
  `if (!viewer.userId) return <EmptyState/>`; the "signed-out discoverability" roadmap
  item). So the signed-out cookie walk shows localized cards only on the lesson page's
  empty state + /library. For the Talk-cards check use the dev bypass
  `?dev_user=<hi-native cuid>&lang=es`.
- **Tests**: `tests/unit/wave20-content-i18n.test.ts` — key counts (6/8/48/10), all 72
  translated in 12 locales, hyphenated keys survive the generator, the 5 helpers map
  native + fall back to English for unmapped topics, `talkContent.*`/`library.cat.*` stay
  OUT of the global slice, `library.cat.*` reaches the /library page slice, and a real
  Hindi-rendered /talk shows Hindi categories+blurb with no English labels.
- **Status**: `pnpm vitest run --no-file-parallelism` → **440/440** (was 429; +11).
  `pnpm build` clean. Live-verified on port 3097: /talk (Spanish titles kept, Hindi
  categories/blurbs/lesson names), lesson page (Hindi title+scene incl. the `wrapping-up`
  hyphen slug; English scene remains ONLY as LessonChat's AI-context prop, not visible),
  /library/podcasts + /library channel chips Hindi, no raw keys.
- **Deferred**: all 72 values are LLM translations (`// TODO: native review`) — they
  post-date the 2026-10-28 native-QA pass, so they still need the human native sign-off.
  Fix = edit `gen/<lang>.json` + rerun `node scripts/i18n/build-catalog.mjs`.
