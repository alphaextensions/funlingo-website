# Funlingo Learning Path — research & plan

**Status:** draft for review · **Date:** 2026-10-24 · **Branch:** `feat/learning-path`

Goal: give Funlingo a structured learning path in the spirit of Rosetta Stone's unit view
(https://www.rosettastone.com/learning-path/unit), rebuilt around what makes Funlingo different:
learning from **real video with dual subtitles**, calm and fun, never studious.

---

## 1. What Rosetta Stone actually does (walked through live, Spanish LatAm)

**Unit grid.** `/learning-path/unit` shows 20 pastel cards, each "UNIT n + topic + Start":
Language Basics · Greetings & Introductions · Work & School · Shopping · Travel · Past & Future ·
Friends & Social Life · Dining & Vacation · Home & Health · Life & World · Everyday Things ·
Places & Events · Tourism & Recreation · Professions & Hobbies · At Home & Around Town ·
Style & Personal Wellness · Business & Industry · Arts & Academics · Emergency Situations ·
Family & Community.

**Inside a unit** (`/learning-path/unit/1`). A left sidebar with a % complete, and a winding
path of nodes drawn over a full-bleed lifestyle photo. Unit 1 has **4 lessons**, and each
lesson holds 8–11 activities:

| Lesson | Activities, in order |
|---|---|
| Basic sentences | Fundamentals 1–3 · Intro to pronunciation · Intro to common words · Intro to language patterns · Intro to reading · Intro to writing |
| Everyday items | Fundamentals 1–3 · Pronunciation continued · More language patterns · More common words · Reading practice · Writing continued · **Review** · Intro to speaking |
| Colors and sizes | Fundamentals 1–3 · Pronunciation practice · Common words continued · Language patterns continued · Intro to listening · Reading continued · More writing · **Review** · Speaking continued |
| Clothing and quantities | Fundamentals 1–3 · More pronunciation · More speaking · Language patterns practice · Common words practice · Listening practice · More reading · Writing practice · **Review** · Speaking practice · **Review** · **Milestone** |

The pattern:

- **"Fundamentals" is the core.** It teaches by immersion: a picture plus native audio plus the
  target text, with no translation. The first activity asks for your voice type to tune speech
  recognition, then plays "¡Hola!" over photos of people waving, then "una niña" over a photo of
  a girl. A progress bar runs across the top.
- **Skill activities ramp up across the unit:** "Intro to X" → "X continued" → "X practice" →
  "More X". The order is pronunciation, common words, language patterns (grammar), reading,
  writing, speaking and listening.
- **Reviews** come at lesson ends. A **Milestone** closes the unit: a simulated conversation in a
  real-life scene, with a pass mark of about 75%. Rosetta's school placement passes you through
  reviews at 85% or more.
- **Around the path:** Chat Missions, Flashcards, Sapphire Studio, Tutoring, TruAccent speech
  scoring, Stories and Phrasebook.
- **Known weaknesses:** core lessons are long (about 30 minutes), there is no central review hub
  (you redo lessons to review), there are no grammar explanations, and the stock-photo content
  feels generic.

## 2. What everyone else does (summary of competitor research)

| Product | Path shape | Lesson | Review | Checkpoint | Progress metric |
|---|---|---|---|---|---|
| Rosetta Stone | Level → Unit → 4 lessons → activities | ~30 min core | per-lesson Review | Milestone conversation | ticks / % |
| Duolingo | Section → Unit → node (linear) | 3–5 min | review nodes woven into path + Practice Hub | Unit review, Legendary | Duolingo Score 0–160 → CEFR |
| Babbel | CEFR level → course → lesson | 5–10 min | Review Manager (SRS) | — / certificate | lessons, level |
| Busuu | CEFR level → chapter → lesson | short | word strength weak/med/strong | level test → certificate | study-plan ETA |
| Memrise (2024) | Scenarios with shared vocab | short | SRS + native clips | — | 31 levels from words/videos |
| Dreaming Spanish | **hours-based** levels 1–7 | any video | none | — | **input hours** (0/50/150/300/600/1000/1500) |
| LingQ | known-word levels | any | SRS on saved words | — | **known words** |
| Migaku | none (extension) | any | FSRS cards from **sentence mining** | — | known words, per-video **comprehension %** |
| Language Reactor / Lingopie / FluentU | none or a weak leveled library | any | SRS deck from saved words | — | saved words |

**Table stakes:**

- a visible, mostly linear path with themed units named by what you'll be able to do
- 5–10 minute lessons
- placement or test-out
- SRS review mixed into the path
- an end-of-unit checkpoint
- CEFR labels with can-do statements
- some speaking feedback
- short in-context grammar tips

**Where the market is moving:**

- Duolingo's "mini-units": learn a little, then use it at once in a story, a listening task or a
  call.
- Goal-bound AI role-play, not open chat (Babbel Speak, MemBot, Duolingo Video Call).
- Progress counted as input (hours, known words, "% of this video you'd understand").

**The gap nobody fills:** video tools (Language Reactor, Migaku, Lingopie) have **no path**, and
path apps (Rosetta, Duolingo, Babbel) have **no real video**. No one links free Netflix or
YouTube watching back to a structured path. That gap is Funlingo's to take.

Sources: Rosetta Stone education and enterprise blogs and support site; blog.duolingo.com (path
redesign, intermediate mini-units, Practice Hub); babbel.com/how-babbel-works and the Babbel Speak
press release; busuu.com courses and help pages; memrise.com relaunch posts; Dreaming Spanish
roadmap; LingQ statistics help; Migaku basics; Webb & Rodgers 2009 on vocabulary coverage of
film and TV; Roediger & Karpicke 2006 on retrieval practice; FSRS documentation. Single-source
claims were flagged during research. The main ones are Rosetta's lesson durations, Duolingo's
test-out rule and Busuu's checkpoint mechanics.

## 3. Where Funlingo stands today (both repos)

**This repo (website).**

- A static Next.js export with no accounts, no backend and no persistence.
- The learning features are two home-page demos: the Guess-the-meaning game
  (`sections/home/GuessGame.tsx`, `gameData.ts`) and the hover-to-save subtitle player
  (`sections/home/FunlingoPlayer.tsx`, `scenes.ts`).
- `/roadmap` (`app/roadmap/roadmap-content.tsx`) lists these as in progress: SRS review deck
  (i7) and streaks & goals (i9). AI conversation practice is planned (i11).

**`../funlingo-app` (Expo mobile app).** This is where a path can actually live.

- **Learn tab** (`src/screens/learn/`):
  - Daily Pills
  - 4 drills: ListenChoose, MatchUp, FillGap, Shadowing
  - Tiny Lessons: 9 themed packs (`src/learn/packs.ts`) over 56 situations and about 672
    phrases per language in `src/learn/data/situations.*.json` (en, es, fr, de, ja, ko, hi)
  - Slang Hang
- **Watch tab:** YouTube player with dual subtitles, tap-to-save, and a catalog of 114 videos
  that carry no level tags.
- **Review:** a Leitner SRS (`src/review/srs.ts`, boxes 0–5) and Anki export.
- **Storage:** everything is local in AsyncStorage. The Express and Prisma backend exists but
  runs only locally, and auth is mocked.
- **Two constraints the path must respect:**
  1. `CLAUDE.md` says *"No flags, streaks, XP — this is not Duolingo."*
     `learnProgressStore` is deliberately not a streak or XP system.
  2. `docs/caption-data-decision.md` (OPEN, blocks store submission) shows that the YouTube
     captions bundled in the app carry ToS risk. **Path lessons must not be built on scraped
     YouTube captions.**

**Already in place:** themed packs (proto-units), phrase content in 7 languages, four drill
types, shadowing, SRS, a word bank, a dual-subtitle player and a mini-game. Most of the
*activities* exist. What's missing is the **spine**: sequence, units, checkpoints and progress.

## 4. The Funlingo take: "Seasons & Episodes"

The brand is *"a night in with a good show"* (`.playwright-mcp/design/DESIGN-SYSTEM.md`). So the
path is a **TV series** and not a school course. That makes it unique, on-brand, and calm by
design.

| Rosetta Stone | Funlingo | What it is |
|---|---|---|
| Level (CEFR) | **Season** | Season 1 = A1, Season 2 = A2, Season 3 = B1 … Each has a can-do trailer, e.g. *"By the finale you can order food and follow a slow vlog."* |
| Unit (20) | **Episode** | One real-life theme, about 45–60 min total, spread over a week. Seeded from the app's 9 packs and Rosetta's 20 themes. |
| Lesson (4 per unit) | **Scene** | 3–4 per episode, each 5–8 min. Duolingo-style mini-unit: learn a little, use it at once. |
| Activity | **Take** | 1–2 min steps inside a scene (below). |
| Review | **Recap** | "Previously on…": SRS-due words from this and earlier episodes, interleaved. |
| Milestone | **Finale** | An unseen clip on the theme: comprehension, then a short role-play opposite a character from it. Pass mark about 75%. |
| — (new) | **Out in the Wild** | An extension quest: "Spot 5 of this episode's words in anything you watch this week." The extension highlights the episode's words on YouTube and Netflix. |

### Anatomy of a Scene (each "take" reuses something we already have)

1. **Cold open.** A 20–40 s clip with dual subtitles and hover-a-word glosses. Reuses the
   FunlingoPlayer and WatchPlayer pattern.
2. **Word lab.** 6–10 key words from the clip, each a context card (sentence + clip audio +
   still). Reuses the WordCard component and save-to-word-bank.
3. **Guess it.** The guess-the-meaning game on those words. Reuses `GuessGame` and MatchUp.
4. **Pattern spotlight.** One grammar point shown through 3–5 lines from the clip, plus a
   two-line tip. New, but small.
5. **Shadow.** Repeat 2–3 lines in time with the speaker. Reuses `ShadowingScreen`; never
   fabricate an accent score.
6. **Listen blind.** Replay with subtitles off, then cloze or tap-tiles. Reuses FillGap and
   ListenChoose.

The difficulty ramp is **subtitle fading**, a mechanic only a subtitle product can offer:

- Season 1 runs with dual subtitles.
- Season 2 drops the native line by default (tap to reveal).
- Season 3 shows target-only subtitles.
- The Finale of Season 3+ runs with no subtitles at all.

### Progress without streaks or XP (respecting the app's rule)

Two calm meters, shown together at the top of the path:

- **Watch hours.** Time spent with target-language subtitles on, in the path and in the extension.
  Dreaming-Spanish-style milestones at 10 / 25 / 75 / 150 / 300 / 600 h.
- **Known words.** A word counts as Known when its SRS interval passes about 21 days, or when the
  user marks it. This fixes Dreaming Spanish's weakness that hours alone don't prove retention.

Both map to the Season and CEFR can-do statements. At each milestone a **"You can now watch…"**
shelf unlocks real shows at your vocabulary coverage (aiming for about 95% known words, per Webb
& Rodgers). Progress becomes *content you can now enjoy*, not points. There are no XP, no
leagues, no hearts and no guilt notifications. Episode ticks and a % ring, as Rosetta has, are
fine.

### Placement & skipping

- A **"Which season are you?"** 3-minute check: 3 clips of rising difficulty, each with 2
  comprehension questions. Score ≥85% to pass a season, matching Rosetta's review bar.
- **Test-out per episode:** take the Finale directly. Passing marks every Scene in the episode
  done.

## 5. Content strategy (the hard part)

**Where clips come from.** The existing YouTube caption route is a legal risk (see §3), so the
path's own clips must be **owned or licensed**:

- **Option A (recommended for v1):** short native-speaker clips we produce. Use 2–3 actors per
  language, shot on a phone, scripted from the `situations.*.json` phrases we already have. This
  costs roughly 20–40 clips per season per language.
- **Option B:** clips licensed under Creative Commons BY (Wikimedia, Vimeo CC), with our own
  subtitle tracks.
- **Option C (later):** partner creators who grant us rights to a clip and its captions in
  exchange for promotion.

Free-watching on YouTube and Netflix stays in the **extension**, where we never redistribute
captions. The path only *references* it through the Out in the Wild quests and the "You can now
watch" shelves (links, not content).

**Language pairs.** Start with **one pair**, then copy the template:

- **English for Hindi speakers** is the strategic wedge (`funlingo-app/docs/09`).
- **Spanish for English speakers** is the biggest market and the easiest to benchmark against
  Rosetta and Duolingo.

**Authoring format.** Content is JSON, validated by a schema and versioned in git, the same
approach as `situations.*.json`. The proposed schema:

```ts
type Course  = { id: "hi-en"; native: "hi"; target: "en"; seasons: Season[] };
type Season  = { id: string; cefr: "A1"|"A2"|"B1"|"B2"; title: I18n; canDo: I18n[]; episodes: Episode[] };
type Episode = { id: string; theme: string; title: I18n; scenes: Scene[]; finale: Finale; quest?: Quest };
type Scene   = { id: string; clip: Clip; words: WordRef[]; pattern?: Pattern; takes: Take[] };
type Clip    = { src: string; durationSec: number; difficulty: number /*1–100*/; subs: { t: number; target: string; native: I18n }[] };
type Take    = { kind: "watch"|"wordlab"|"guess"|"pattern"|"shadow"|"listen"; items?: string[] };
type Finale  = { clip: Clip; questions: Question[]; roleplay?: RoleplayScript; passPct: 75 };
```

**Per season per language:** about 8 episodes × 3–4 scenes = 24–32 clips, about 200–300 words
and about 8 grammar patterns. Every item gets a native-speaker review before it ships.

## 6. Where it lives — **website first** (decided 2026-10-24)

The owner decided v1 of the path ships on **getfunlingo.com**. The mobile app and the extension
join later and use the same accounts.

| Surface | Role |
|---|---|
| **Website** (this repo) | **Home of v1.** Public, indexable path pages (`/learn/...`), a scene player, accounts, sync, review. |
| **Backend** | Supabase: auth, a Postgres database for *user progress only*, and Edge Functions for server-side secrets (§7). |
| **Chrome extension** | Phase 4. Signs in to the same Supabase project, then counts watch hours, highlights the current episode's words and feeds saved words into the same review deck. |
| **Mobile app** (`funlingo-app`) | Later. It uses `supabase-js` with AsyncStorage. Its local stores migrate in. Its bundled situation phrases are the seed content for Season 1 here. |

Because the path lives on the website, the app's "no streaks or XP" rule doesn't bind it
directly. We still keep the calm design of §4 (hours and known words, no XP) unless the owner
says otherwise.

## 7. Accounts & backend plan

### 7.1 What the website has today, and what changes

- `next.config.ts` sets `output: "export"`, so the whole site is static HTML in `out/`. There are
  no API routes, no middleware and no server. Both `vercel.json` and a Netlify-style
  `public/_redirects` exist, so **confirm which host serves production**.
- There are no accounts and no storage beyond the `funlingo-theme` key in `localStorage`.
- `app/privacy-policy/privacy-content.tsx` currently promises *"we do not store personal data,
  your information stays on your device"* and *"We do not use cookies or third-party analytics"*.
  The first becomes false the day accounts launch. The second is already at odds with the GA4
  tag in `app/analytics.tsx`. **The policy must be rewritten before launch** (see 7.8).
- There is no test tooling (`package.json` has only dev, build, start and lint scripts).

### 7.2 Recommendation: keep the site static, add Supabase

| Option | How | Pros | Cons |
|---|---|---|---|
| **A. Supabase + static export (recommended)** | Path pages stay static. Progress is read and written from the browser with `supabase-js`, protected by Postgres row-level security (RLS). Server secrets live in Supabase Edge Functions. | No server to run. Keeps `output: "export"`, the 34-locale static pages and the SEO setup unchanged. Auth covers Google, email and Apple, and works in a Chrome extension and React Native too, so one account spans web, extension and app. Postgres matches the app's existing Prisma schema. | Vendor dependency. RLS policies must be right, so they need tests. The free tier pauses after 7 idle days, so production needs Pro. |
| B. Next.js server mode + Auth.js + Neon/Prisma | Drop `output: "export"` and add route handlers and middleware on Vercel. | One codebase, full control, server-side auth gating. | Changes how the whole site deploys, including 34 locales and 55 blog posts. We'd hand-build sessions, CSRF protection, email sending, and token auth for the extension and app. |
| C. Deploy `funlingo-app/backend` (Express + Prisma) | Host it on Fly/Render; the website calls it. | Code exists. | Auth is mocked (`X-User-Id` header), the schema has no path concepts, and it's one more server to run, secure and keep up. |
| D. Firebase | Auth + Firestore. | Mature auth. | Document store: progress analytics, joins and the Postgres schema the app already has all fit worse. |

**Why A.** The path's *content* is static. It's JSON in git, compiled into pages at build time.
Only *per-user state* needs a backend. That matches "static site + backend-as-a-service" exactly.

**Cost** (third-party sources, check on supabase.com/pricing):

- **Free tier:** about 50k MAU and 500 MB database. Projects pause after 7 days of no activity,
  so it's fine for dev but not for production.
- **Pro:** about $25/month plus compute, with about 100k MAU and 8 GB database. Use Pro for
  production.
- **Team:** $599/month, and only needed for SOC 2 or SSO.

### 7.3 Accounts: sign-in methods & flow

- **Methods:**
  - **Google** (one tap). Most Chrome-extension users have a Google account.
  - **Email one-time code.** A 6-digit code is better than a magic link: it works when the email
    opens on a different device, and inside in-app browsers.
  - **Apple:** add later, when the iOS app needs it.
- **Guest-first.** Anyone can open the path and play Season 1 Episode 1 with no account.
  Progress is kept in `localStorage`. After the **first completed Scene**, a soft prompt appears:
  *"Save your progress — sign in."* It's dismissible and shows at most once per session. On
  sign-in the guest progress **merges** into the account (7.5).
- **Onboarding after first sign-in:** pick your native language and the language you're learning
  (pre-filled from the guest session or the URL), then an optional 3-minute placement check, then
  a daily-minutes goal.
- **Account page** (`/account`):
  - display name, languages, daily goal, email preferences
  - **Download my data** (JSON)
  - **Delete my account** (an Edge Function deletes the auth user, and everything else goes by
    `ON DELETE CASCADE`)
  - sign out of all devices
- **Session handling:**
  - `supabase-js` keeps the session in `localStorage` and refreshes it automatically.
  - Use the PKCE flow. `/auth/callback` is a static page that exchanges the code in the browser.
  - No server middleware is needed: pages are public, and data is protected by RLS.
- **Abuse:**
  - Supabase's built-in auth rate limits.
  - Cloudflare Turnstile (supported natively) on email sign-up.
  - A custom SMTP sender (Resend or Postmark) on `getfunlingo.com` with SPF, DKIM and DMARC.
    Supabase's default mailer is heavily rate-limited and not meant for production.
- **Google OAuth setup:**
  - consent screen named "Funlingo", with links to the privacy policy and terms
  - authorized domains: getfunlingo.com and the Supabase project domain
  - basic scopes (email, profile) need no Google security review

### 7.4 Data model (Postgres, all tables RLS: `user_id = auth.uid()`)

Content IDs (`course_id` like `hi-en`, and `episode_id` / `scene_id`) are **stable strings from
the content JSON**. Content isn't stored in the DB. Each progress row records the
`content_version` it was earned against.

```sql
profiles        (id uuid PK → auth.users ON DELETE CASCADE, display_name, native_lang, ui_locale,
                 daily_goal_min int default 10, timezone, email_opt_in bool, created_at, updated_at)

enrollments     (user_id, course_id, started_at, current_episode_id,
                 placement jsonb,                       -- {season, score, taken_at}
                 PRIMARY KEY (user_id, course_id))

scene_progress  (user_id, course_id, scene_id, status text check in ('started','done'),
                 best_score smallint, attempts int, content_version int,
                 first_done_at, updated_at,
                 PRIMARY KEY (user_id, course_id, scene_id))

finale_attempts (id uuid PK, user_id, course_id, episode_id, score smallint, passed bool,
                 answers jsonb, created_at)

events          (id uuid PK,                            -- client-generated → idempotent
                 user_id, course_id, kind text,         -- 'take_done','scene_done','watch_tick',...
                 ref text, payload jsonb, client_ts, created_at)
                 -- append-only log: sync source of truth + analytics (drop-off per take)

saved_words     (id uuid PK, user_id, course_id, term, lemma, gloss jsonb,
                 context jsonb,                         -- {sentence, clip_id, t, still_url}
                 source text check in ('path','extension','app'),
                 created_at, UNIQUE (user_id, course_id, lemma))

review_cards    (word_id PK → saved_words ON DELETE CASCADE, user_id,
                 due timestamptz, stability real, difficulty real, reps int, lapses int,
                 state smallint, last_review timestamptz, known_marked bool default false)

review_logs     (id uuid PK, user_id, word_id, rating smallint, reviewed_at, elapsed_days real,
                 scheduled_days real)                   -- keeps FSRS re-tunable later

watch_daily     (user_id, course_id, day date, seconds int, source text,
                 PRIMARY KEY (user_id, course_id, day, source))
```

**Derived values** (SQL views or RPCs, never stored twice):

- **Known words** = `review_cards` where `stability >= 21` or `known_marked`.
- **Watch hours** = `sum(watch_daily.seconds)`.
- **Episode %** = completed scenes ÷ the scene count from the content JSON.

**Review scheduling.** Use FSRS through the `ts-fsrs` library, running in the browser. It's an
upgrade on the app's Leitner boxes. Keeping the review logs means the FSRS parameters can be
re-tuned later.

**Mapping to the app's Prisma schema** (for the later merge):

- `Word` maps to `saved_words` plus `review_cards`.
- `Session` maps to `watch_daily`.
- `User.dailyGoal` and `nativeLanguage` map to `profiles`.

### 7.5 Sync: local-first, then server

- **Every action writes locally first.** A `pathStore` (Zustand, persisted to `localStorage`)
  updates the UI immediately and adds an **event** with a client UUID to an outbox.
- **A sync worker flushes the outbox** when online and signed in:
  - It calls one Postgres RPC, `apply_events(events jsonb)`, inside a transaction.
  - The RPC inserts into `events` with `ON CONFLICT (id) DO NOTHING`, then updates
    `scene_progress`, `review_cards` and `watch_daily` from them.
  - Retries are safe because events are idempotent.
- **Merge rules** (guest → account, or two devices):
  - Completion is an OR.
  - Best score is the max.
  - Attempts are summed by distinct event IDs.
  - Review logs are a union ordered by time. The card state is **recomputed** from the logs, so
    there are no conflicting writes.
- **On load:** fetch the snapshot (`scene_progress`, `review_cards` due soon, totals), then apply
  any local events that haven't been flushed. Live (realtime) sync is unnecessary for v1.

### 7.6 Server-side functions (Supabase Edge Functions, Deno)

| Function | Why it must be on a server | Phase |
|---|---|---|
| `delete-account` | Needs the service-role key | 2 |
| `export-data` | Bundle all of a user's rows as a JSON download | 2 |
| `roleplay` (Finale AI partner) | Holds the Claude API key. A scripted role-play goes first; AI comes later. | 3+ |
| `pronounce` | Proxies Azure pronunciation assessment, so we never fake scores | 3+ |
| `weekly-email` (cron) | Optional "your week in Funlingo" digest; respects `email_opt_in` | 4 |

### 7.7 How the website code changes

```
app/learn/page.tsx                              course picker + season map (static, indexable)
app/learn/[course]/page.tsx                     season & episode list (static)
app/learn/[course]/[episode]/page.tsx           episode path view (static shell, progress client-side)
app/learn/[course]/[episode]/[scene]/page.tsx   scene runner (client component)
app/learn/review/page.tsx                       due-cards review (client)
app/login/page.tsx, app/auth/callback/page.tsx, app/account/page.tsx
content/courses/<course>/*.json                 path content + zod schema (lib/path/schema.ts)
lib/supabase/client.ts                          browser client (public anon key only)
lib/path/{store,sync,fsrs,progress}.ts          local store, outbox sync, scheduling, derived stats
supabase/migrations/*.sql, supabase/functions/* schema, RLS, RPCs, edge functions (in this repo)
```

**Static routing:** `generateStaticParams` builds every course, episode and scene page from
the content JSON, so `output: "export"` stays as it is.

**SEO pages:** episode pages are indexable ("Learn English for Hindi speakers — Episode 2:
Greetings"). Add them to `public/sitemap.xml`.

**UI chrome:** English first. `LOCALIZED_PATHS` stays `["/"]` for v1. The *glosses* inside the
path follow the learner's native language, which comes from the content and is independent of
the URL locale.

**Reuse:** `sections/home/GuessGame.tsx` and `FunlingoPlayer.tsx` become path "takes", refactored
to accept content as props. The design tokens in `app/globals.css` carry over.

**Env and secrets:**

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are safe to expose, because RLS
  enforces access.
- The service-role key lives only in Edge Function secrets.
- Separate **dev** and **prod** Supabase projects; deploy previews use dev.

**Analytics:** extend `app/_components/track.ts` with path funnel events (`scene_start`,
`take_done`, `scene_done`, `signup_prompt_shown`, `signup_done`, `finale_pass`).

### 7.8 Privacy, legal, trust

- **Privacy policy:** rewrite for accounts. Cover what is stored (email, name, languages,
  progress, saved words, watch time), why, where (Supabase region; pick EU or US deliberately),
  retention, deletion and export, sub-processors (Supabase, the email provider, Google sign-in,
  GA4, Crisp), and fix the existing cookies/analytics wording.
- **Terms of Service:** add them. Minimum age 13 (16 in the EU without parental consent), and no
  kid-directed marketing.
- **Consent:** a consent banner for GA4 in the EU/UK, if one isn't already there.
- **User rights:** in-product deletion and export, as GDPR and CCPA require.
- **Breach basics:** RLS policy tests in CI, no service key in the client, and auth emails
  showing the sending device and time.

### 7.9 Testing

The repo has none today, so add:

- **Vitest** for the pure modules: schema validator, progress and merge reducers, FSRS wrapper,
  outbox.
- **Supabase local** (`supabase start`, Docker) plus SQL tests for RLS: a user can't read or write
  another user's rows, and anonymous users get nothing. Also test the `apply_events` RPC for
  idempotency and merge.
- **Playwright** end-to-end against a local Supabase: play as a guest, sign in, check the
  progress merged, reload on a second browser context, then delete the account.

## 8. Phased plan (website-first)

**Phase 0 — Decisions & setup (≈1 week)**

- Lock the decisions in §10.
- Confirm the production host (Vercel or Netlify).
- Create dev and prod Supabase projects, the Google OAuth client and SMTP on getfunlingo.com.
- Commit `supabase/migrations` with tables, RLS and the RPC, plus RLS tests.
- Write the content schema (zod) and the Season 1 outline for the pilot pair.
- Design: path map, episode view, scene runner, sign-in sheet and account page. Use Claude
  Design mockups (DesignSync project), light and dark, mobile width.

**Phase 1 — Guest path MVP (≈2–3 weeks), no accounts yet**

- `/learn` routes and static pages built from the content JSON.
- Season 1 content from the app's situation phrases plus TTS audio, the same pipeline as
  `scripts/generate-game-audio.mjs`.
- Scene runner with these takes: Cold open (dialogue card), Word lab, Guess it, Pattern,
  Listen-choose and Shadow (browser speech recognition where available, word-match only).
- `pathStore` with the local outbox and the episode % ring.
- Vitest plus a Playwright smoke test.
- Ship it publicly: it's useful and indexable without an account.

**Phase 2 — Accounts & sync (≈2 weeks)**

- Sign in with Google and email code, then onboarding.
- Sync worker and `apply_events`; merge guest progress on sign-in.
- `/account` page with export and delete Edge Functions.
- Privacy policy and terms rewritten, and the consent banner.
- End-to-end tests for the guest → account merge and for deletion.

**Phase 3 — Review, Finale, placement (≈2–3 weeks)**

- `saved_words` plus FSRS `review_cards`, the `/learn/review` page, and Recap nodes in the path.
- Known-words and watch-hours meters.
- Finale with comprehension questions and a scripted role-play, using Rosetta's pass marks
  (75% for a Finale, 85% to place out).
- Placement check and per-episode test-out.

**Phase 4 — Video, extension & app link (≈4–6 weeks, gated on content)**

- Self-produced or licensed clips on a video CDN (Cloudflare Stream, Bunny or R2), not Supabase
  Storage, because of egress cost. Subtitle fading by Season.
- **Extension:**
  - sign in through `chrome.identity.launchWebAuthFlow` → Supabase, or receive the session
    from the website via `externally_connectable`
  - write `watch_daily` and `saved_words`
  - highlight the current episode's words; Out in the Wild quests
- **Mobile app:** move to `supabase-js` and migrate its AsyncStorage word bank and review state
  into `saved_words` and `review_cards`.
- **Growth:** roadmap entry in `app/roadmap/roadmap-content.tsx`, a "Funlingo vs Rosetta Stone"
  comparison page, a blog post, and a homepage CTA into `/learn`.

**Rough total to an account-backed web path with review:** about 7–9 weeks of engineering,
plus content production running alongside.

## 9. Success metrics

- **Activation:** % of `/learn` visitors who finish Scene 1 in their first session (target 40% or
  more).
- **Sign-up:** % of guests who finished a Scene and then created an account (target 25% or more).
- **Retention:** D7 and D30 return rate of signed-in path learners.
- **Depth:**
  - Episodes completed per active user per week
  - Finale pass rate (aim for 60–80%; outside that band the content is mis-levelled)
- **Learning:** Known words gained per week, SRS recall rate, and the share of path users who
  also log extension watch hours (flywheel health).
- **Quality:** drop-off by take type, which tells us which activities are boring.

## 10. Open decisions (need the owner's call)

**Decided:** v1 lives on the website (2026-10-24).

1. **Backend:** Supabase with the static site kept as is (recommended, §7.2), or Next.js server
   mode with Auth.js?
2. **Production host:** Vercel or Netlify? Both configs are in the repo.
3. **Sign-in methods:** Google plus an email code at launch (recommended), or Google only?
4. **Data region:** EU or US? This affects the privacy policy and latency for India and Europe.
5. **Streaks and XP:** keep the calm design with no XP (recommended)?
6. **Pilot pair:** English for Hindi speakers (wedge) or Spanish for English speakers (market)?
7. **Clip source for Season 1:** self-produced (recommended), CC-licensed, or creator
   partnerships?
8. **Pricing:** Season 1 free, later seasons premium (fits `docs/09`'s "evergreen free, premium
   catalog")? If later seasons are paid, payments (Stripe) join Phase 4.
9. **Extension accounts:** does the shipped extension already have any sign-in? Its repo isn't
   on this machine, so I couldn't check.
10. **Naming:** keep the TV metaphor (Season / Episode / Scene / Finale)?

## 11. Risks

- **Accounts change our privacy posture.** The site currently promises it stores no personal
  data. The policy and terms rewrite (§7.8) and the RLS tests (§7.9) block the Phase 2 launch.
- **Supabase lock-in.** It's plain Postgres underneath, so `pg_dump` can move it anywhere. Keep
  business logic in SQL RPCs and `lib/path/*`, not in vendor-specific features.
- **Content cost dominates.** Engineering is about 7–9 weeks. Each new language pair and season
  is mostly authoring and native review. Mitigation: one pair, one season, prove retention first.
- **YouTube ToS.** Never build path lessons on scraped captions. Keep free-watching in the
  extension.
- **Speech scoring credibility.** Word-match only until there is a real pronunciation API
  (Azure, behind a backend). Never show fake accent scores.
- **Scope creep toward "Duolingo clone".** The test for every feature: does it get the learner
  watching real content sooner?
