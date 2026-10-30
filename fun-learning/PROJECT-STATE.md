# Fun Learning (web) — Project State

Single source of truth for current status. Update after every merge/release.

## What this is
Next.js (App Router) + TypeScript web companion to the Funlingo Chrome extension.
Goal: match AND beat Trancy's Learning Center, and match the extension's Fun
Learning page exactly — design, feel, AND behavior. Everything free for learners.

## Current state — 2026-10-25

**Main is at the "5-wave extension-parity" milestone.** Build clean,
`pnpm vitest run --no-file-parallelism` → **375/375 passing**, no conflict markers.

Latest main commit: `4cefe6c Merge Wave 14: UI-text i18n catalog`.

### The 5 parity waves (all merged)
- **Wave 14 — UI-text i18n catalog.** The interface chrome (nav labels, buttons,
  counters like "12 phrases", empty states, page titles) now renders in the
  learner's NATIVE language, not the learning language or English. This was
  Jay's core complaint ("if native is Hindi, why does it say '12 phrases'?").
  - 231 chrome strings × 12 locales (en, hi, es, ja, zh, ar, fr, de, pt, ko, it, tr).
  - Catalogs stay server-side (~164KB); each page ships only the viewer's locale
    (~6.5KB en / ~11.3KB hi).
  - Chrome keyed on nativeLang → uiLocale → en. Learning lang never decides chrome.
  - No-catalog langs (mr/gu/ur/he) keep their own fonts + RTL, fall back to English.
  - Files: `src/lib/i18n/catalog/`, `src/lib/i18n/catalog.ts`, `src/lib/i18n/client.tsx`,
    `src/server/i18n.ts`; generator in `scripts/i18n/`; tests `tests/unit/wave14-i18n.test.ts`.
  - KNOWN: ~186/lang strings are LLM translations marked `// TODO: native review`
    (ar/ko/tr lowest confidence). To fix a translation: edit a file in
    `scripts/i18n/gen/` + rerun the generator (no code change).
- **Wave 15 — JS-behavior parity.** Click sounds (WebAudio) + haptics
  (navigator.vibrate) on taps; Sound/Haptics/Animations/RTL settings; Animations-off
  kills deck-flip transition. `src/lib/feedback/`, FlashcardDeck.
- **Wave 16 — Watch player parity.** Word card (TTS, phrase/root/examples,
  save/remove, self-test, burst), pause-on-card/hover, replay + pause-after,
  ±10s, remembered speed, save-line, deck highlight, nudges.
- **Wave 17 — Popup parity.** Words page select-mode / graduate / remove-with-undo;
  per-LANGUAGE voice picker (replaces the old single global voice); recently-watched
  row on Library. `src/components/settings/VoicePicker.tsx`, `src/lib/voice/prefs.ts`,
  `src/lib/words/{state,view}.ts`, `src/server/words/load.ts`, `src/server/library/recent.ts`.
- **Wave 18 — /welcome onboarding** (extension parity).

### Other key fixes landed this session
- **Language pills bug** (Jay hit "can't change native language, shows an error"):
  signed-out users had no session so every pill save 401'd and rolled back. Now
  signed-out choice is stored in cookies `fl_native` / `fl_learning` (1yr, lax) and
  `getViewer` reads them. `src/components/LangPills.tsx`, `src/server/session.ts`.
- **Native topic titles**: `seedCatalog.ts` uses each lang's native `title` (not
  titleEn), dropped the `(Language)` suffix.
- **Per-tile hues restored** to the extension's literal vibe hexes (a prior DS-token
  swap had wrongly mapped them): cReplay #ec4899, cQuiz #fbbf24, cLessons #2dd4bf,
  cSlang #a78bfa (lavender, not magenta), cLibrary #d678f0. `app/learn/learn.module.css`.

## Architecture notes
- DB: Prisma + SQLite (`prisma/dev.db`). User.nativeLang / activeLearningLang /
  uiLocale; free-form Prefs JSON blob (shape + helpers in `src/server/prefs.ts`:
  buildPrefsPatch / mergePrefsJson).
- All write POSTs wrapped in `withIdempotency`; all reads lang-scoped.
- Dev sign-in shortcut (non-prod only): `?dev_user=<cuid>&lang=<xx>`. NOTE: this
  localizes only the page BODY — nav/tabs/title stay English. Full-chrome Hindi test
  = signed-out with cookie `fl_native=hi`, or a real sign-in.

## Standing project rules
- Follow docs/LEGAL.md exactly (no scripts/lyrics/subtitle export/downloads).
- Dark theme first; colors are DESIGN.md tokens (except intentional tile vibe hexes);
  Poppins; body weight 500; nothing below 14px except tags/eyebrows.
- ALWAYS run tests serially: `pnpm vitest run --no-file-parallelism` (parallel flakes
  on shared DB state).
- Parity audits MUST read the extension's JAVASCRIPT (learn.js / shared_content.js /
  popup.js / i18n.js), not just its CSS/HTML — behavior + real translations live in JS.
- Agents read AGENT-PLAYBOOK.md first and append learnings.

## Review + fixes (2026-10-25)
Ran 4 parallel review agents (isolated worktrees/ports): Lead PM (edge cases +
cross-feature), QA-crash (correctness/500s), QA-honesty (shown-vs-true + Hindi
chrome), Design (extension parity + premium feel). Headline: counters all TRUE,
no raw keys leak, cross-feature plumbing honest (saved word → Words → Review →
Quiz, counts agree), RTL/Hindi chrome clean. Extension parity solid — all 5 tile
hues match literal hexes, Slang Hang correctly LAVENDER (magenta bug gone), decks
are single-card flip.

**Fixed on main (all verified, build clean, 375/375 tests):**
- P0 `e90eb5e` — sentence/show pack detail routes 404'd on colon ids (missing
  decodeURIComponent; 72/73 packs dead). Mirrors /read. Verified 200 + content.
- P1 `0aa89cc` — Progress "Reviews 7d" vs "0 in 30d" contradiction (two tables);
  both now from the same activity source. /read shelves now scoped to the
  learner's active learning lang (was all langs jumbled). /talk collapsed to one
  canonical topic per situation (seed stores es-ES/es-LA/es variants → showed 3×;
  24 es rows → 8, verified). Seeded data untouched.
- P1 `3b2f326` — Watch demo play button no longer collides with caption at
  <=560px (verified 375px). Empty-state glyph swapped from radial-spokes (read as
  a spinner, 5 surfaces) to a filled sparkle (verified /words).

## DECISIONS — RESOLVED by Jay 2026-10-26
- **Audio voice**: browser fix only (free). Shipped `eb0118e`: aggressively
  prefer neural/online voices + fix the first-click robotic-default race. No
  cloud TTS (would need a paid provider + key; conflicts with free-for-learners).
  Quality is still device-capped; guaranteed-natural-everywhere = future cloud TTS.
- **"Home" / "Fun Learning" nav**: MERGED into one Home entry `bdc4dbd` (/learn
  route still resolves). Did NOT build the SPEC Home dashboard (roadmap).
- **Light theme**: SHIPPED `bdc4dbd` — System/Light/Dark toggle in Settings
  (signed-in + signed-out), instant, per-device, no flash.
- **Sub-14px**: lang-pill value bumped 12.5→14px `bdc4dbd`. Tile text 13/13.5px
  kept as intentional extension-parity sizes (documented).
- **Tiny Lessons emoji icons**: KEEP — it's extension parity (the extension's own
  situations JSON ships emoji); "match the extension exactly" wins over DESIGN.md
  "no emoji". Documented, not changed.
- **Brand name "Fun Learning"**: stays English in every locale.
- **Scope of "close everything pending"**: localization + polish only. The big
  net-new features (word lists, show packs, podcast player, ⌘K/global tools) are
  explicitly ROADMAP, not this milestone.

## Wave 19 — content-surface i18n: MERGED 2026-10-26 (`a72fbe0`)
Closed the localization milestone. The deferred English-only surfaces now render
in the learner's native language (content stays in the learning language):
- Watch player (~185 watch.* keys), /settings (+ Appearance/Theme), /progress,
  /library (+ podcasts/sentence-packs/show-packs), /sentences, /welcome
  ("Skip for now"/"Start learning"), /words, and learn.welcomeBody (interpolates
  the translated tile names — no stranded English feature names).
- 429 new keys × 12 locales (en authored; 11 LLM-generated, // TODO: native review).
  Catalog now 659 en keys. Client-bundle discipline: big pages ship their slice via
  a nested I18nProvider (pageClientSlice); each page ships only the viewer's locale.
- Follow-up `9eca47c`: localized the demo hero title (watch.demoTitle) too.
- Build clean, 391/391 tests (was 375; +16 wave19). Self-verified in Hindi:
  /watch (डिफ़ॉल्ट/फ़ोकस/सिनेमा), /progress (आपकी प्रगति), /settings
  (दिखावट/थीम); no raw-key leaks; content stays Spanish/English.

## Final QA (2026-10-26) — ran, findings fixed
Adversarial Hindi walk + regression. Verdict: all 9 recent polish fixes HOLD,
build clean, tests green, no raw-key leaks, content/learning split correct. It
found 3 localization gaps — ALL FIXED on main:
- P1 `29ad944` — /watch/demo translations showed English for signed-out non-EN
  natives (sentinel user hardcoded nativeLang:en). Now follows the cookie langs;
  bundled hi/es/ar translations show.
- P1 `5ba8457` — pack DETAIL routes (sentence-packs/show-packs/[packId]) were
  100% English → wired through getT (25 new library.pd* keys).
- P1 `5ba8457` — LibraryTabs hardcoded English → server component via getT.
- P2 `5ba8457` — /welcome tab title localized (generateMetadata).
- P2 `bfea36b` — hi strings stranding 'Light/Dark/System' / 'Progress' now use
  the Hindi terms.
- 26 new keys × 12 locales. Build clean, 391/391 tests. Verified in Hindi.

Left for the native-review pass / next Lead QA (documented, low-risk):
- Other locales may strand brand/English words mid-sentence (e.g. appearanceLede)
  — sweep in the native-review pass.
- Learning-lang pills show English exonyms ("Spanish") not endonyms ("Español")
  — design decision.
- Pack-detail section aria-labels + talk sub-step labels (pre-existing gloss gap).

**Next Lead QA will re-check everything thoroughly after this implementation.**

## Design + PM review (2026-10-29) — on this session's changes
**Design: design-ship-ready — no P0, no P1, 4 P2s.** Localization layout survives
real translated text (DE long, AR RTL mirrored, HI Devanagari) with ZERO overflow;
tile hues exact (Slang lavender #a78bfa); light mode premium, no FOUC; sparkle
glyph + single-card decks confirmed.
**PM: chrome milestone ship-worthy; 3 P1s (close before "done").**

FIXED on main:
- PM P1 #1 `b293b78` — native/interface picker listed mr/gu (no catalog) + omitted
  pt/it/tr/zh (full catalogs). NATIVE_OPTIONS now = the 12 catalog locales.
- PM P1 #3 `b293b78` — sentences showed raw "ES" via lang.toUpperCase(); new
  langName() endonym helper ("Español") wired at /review, /library, /watch.
- Design P2 (contrast) `847cc1b` — light-mode --fl-text-3 #9A8AA6 (3.2:1, fails
  WCAG AA) → #6F5D82 (~5.9:1).
- Design P2 (mobile) `847cc1b` — watch mode-strip kbd hints pushed past 375px;
  hidden on <=480px (useless on touch), overflow gone.

FIXED (cont.):
- PM P1 #2 — Talk seed content + Library taxonomy localized `merge after c7427c7`
  (content pass, Wave 20): Talk categories/blurbs/lesson titles+scenes + podcast/
  channel taxonomy now render in the native language (render-time mapping via
  src/lib/i18n/contentLocalize.ts, keyed on stable slugs; study content + topic
  titles + brand stay as-is). 72 keys x 12 locales. 440/440 tests.
- Seed-honesty: two "50 short lines"/24-item pack titles corrected; empty ja
  "Office slang from Aggretsuko" pack removed (both in seed scripts — apply on
  re-seed).

REMAINING (minor / flagged):
- OUT OF SCOPE: the ~2,580 pack-item word glosses ("la neta → the truth") are
  study content + a data-model decision, not a translation pass.
- Minor design P2s: library 4-tab strip scroll fade/chevron at 375px; a German
  watch empty-state copy nit ("Dieser"→"Diese"); settings voice exonym "Spanish".
- Human native-speaker sign-off still clears all `// TODO: native review` tags.

## Lead QA final (2026-10-29) — PASSED (ship-with-caveats), P1s then fixed
Full adversarial dual-dimension pass. No P0, no crashes, no lies; build clean,
391/391 at the time; EVERY session fix re-verified holding; RTL/no-catalog clean;
Slang Hang lavender + tile hues confirmed. Found 2 P1s (pre-existing English-
chrome gaps, not regressions) — BOTH FIXED + merged `7871b1a`:
- /review was never wired to getT (main nav tab, English for non-EN natives).
- /library default "YouTube" discovery panel (paste box, channel recs, follow,
  empty actions) had no t().
Fix: 58 new keys (review.* x43, library.* x15) x 12 locales; review.* via global
CLIENT_KEY_PREFIXES, library.* via a new page-scoped LIBRARY_KEY_PREFIXES provider
on /library. Build clean, 409/409 tests (+18). Verified in Hindi (आज का सेशन,
चैनल जो आपको पसंद आ सकते हैं, स्टडी प्लेयर में खोलें); brand + YouTube stay English.
NOTE: these 58 keys are fresh LLM translations (// TODO: native review) — they
post-date the native-QA pass, so they still need the human native sign-off.
P2s from Lead QA (roadmap): /words/lists + /read/upload English; library taxonomy
chips; slang-card meanings (content gap); empty JA show pack; the 2 build warnings.

## Native-speaker translation QA (2026-10-28) — DONE `94b6875`
Ran a native-speaker-level review per language (11 reviewers: hi es fr de pt it
ja ko zh ar tr) against the English source. **403 corrections applied**, all
validated (keys exist, every {placeholder} preserved). Build clean, 391/391.
Per-language: hi 15, es 28, fr 20, de 30, pt 16, it 31, ja 40, ko 96, zh 24,
ar 26, tr 77. Fluency was already good; the fixes were overwhelmingly:
- cross-surface terminology drift (LLM lines diverged from the shipped [ext]
  feature names + nav labels) — unified;
- "Signed out"/"sign in" rendered 2-3 ways per language — standardized;
- register inconsistency in ko (합쇼체 vs 해요체) and tr (siz vs sen) across whole
  sections — harmonized (these had the most fixes, matching their flags);
- stranded English section/language names; a few calques + grammar/agreement/
  vowel-harmony errors.
Lines KEEP `// TODO: native review` — this LLM native-QA raises quality but is
NOT certified human sign-off (the honest limitation). A real native speaker is
still the final step to remove the tags.

### OPEN DECISION for Jay — brand name in the welcome title
learn.welcomeTitle is an `[ext]` string (the extension's OWN official
translation), and in every non-English locale the extension TRANSLATES the
"Fun Learning" brand (es "Aprendizaje Divertido", ja "楽しく学ぼう", etc.). This
conflicts with the assumed "brand stays English" default. It's a parity-vs-brand
call: keep the extension's localized brand, or override these [ext] strings to
keep "Fun Learning" English everywhere? Not changed (won't override the
extension's official strings without a decision).

## Pending / roadmap (NOT this milestone — scope confirmed with Jay)
- Native-speaker translation pass per language (LLM + TODO markers today; ar/ko/tr
  lowest confidence). Fix = edit scripts/i18n/gen/ + regenerate.
- Content build-out: word lists (0 built; Trancy ships 21), show packs (1 pack),
  podcasts (discovery-only, no in-app player), /talk signed-out discoverability.
- SPEC Home dashboard (streak/due/continue/heatmap) — Home currently = the tiles.
- Global tools (SPEC §2): ⌘K search, paste-a-link "+", word lookup, extension chip.
- P2 cosmetic: /words "My words N" tab badge (server count) lags the client's
  optimistic Remove; self-corrects on navigation. Fix = lift count to client or
  refresh after commit.
- Harvest the review agents' AGENT-PLAYBOOK.md appends from their worktrees into
  main's playbook (housekeeping).
