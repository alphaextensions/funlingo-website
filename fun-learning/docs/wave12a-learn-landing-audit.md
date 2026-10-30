# Wave 12A — /learn landing visual-parity audit

Compared `app/learn/LearnLanding.tsx` + `app/learn/learn.module.css` against the
extension ground truth `docs/design-reference/extension-fun-learning.html` +
`extension-fun-learning.css` (section `#view-landing`), element by element.

Both pages were rendered at a 1440x900 viewport; computed styles were read via
in-browser `getComputedStyle` and `getBoundingClientRect`. The extension CSS
was served out of `public/_ref/` so it ran under the same browser engine as
our Next.js dev server at `http://localhost:3737/learn`.

Signed-out viewer (userWordCount = 0) was used so the first-run welcome
banner + lock pills on tiles 01+02 both render, matching the extension's
`body[data-firstrun="true"]` first-paint.

**Severity key:**
- **P0** — visible rendering drift from the extension (fix now)
- **P1** — intentional Wave 4 DS migration (keep)
- **P2** — minor copy / markup drift, no visible effect
- **OK** — parity confirmed

## Element-by-element parity table

| # | Element | Extension (ref) | Ours (`/learn`) | Severity | Status |
|---|---|---|---|---|---|
| 1 | Hero `.hero` padding | `var(--s-24) 0 var(--s-16)` | same | OK | kept |
| 2 | Hero `h1` font-size at 1440px | `108px` (clamp 52/9vw/108) | `108px` | OK | kept |
| 3 | Hero `h1` line-height | `0.92` (99.36px) | `0.92` (99.36px) | OK | kept |
| 4 | Hero `h1` letter-spacing | `-0.035em` | same | OK | kept |
| 5 | Hero `h1 .l2` gradient fill | `linear-gradient(100deg,accent,secondary 60%,accent-2)` | same via DS tokens | OK | kept |
| 6 | Hero two-line layout (`display:flex;flex-direction:column`) | yes | yes | OK | kept |
| 7 | Greet pill text | "Welcome — what to learn today?" | identical string | OK | kept |
| 8 | Greet pill padding | `7px 14px` | `7px 14px` | OK | kept |
| 9 | Greet pill background | `var(--fl-surface-1)` | same (`rgba(255,255,255,0.043)`) | OK | kept |
| 10 | Greet dot pulse animation | `pulse 2.4s ease-out infinite` | `learnGreetPulse 2.4s ease-out infinite` (same shadow math, new DS pink glow) | OK | kept |
| 11 | Greet dot — `prefers-reduced-motion` gating | not gated | gated in a `@media (prefers-reduced-motion: no-preference)` block | OK (improvement) | kept |
| 12 | Sub copy | "Bite-sized experiments to grow your vocabulary — built from the words you meet while watching." | identical | OK | kept |
| 13 | Sub `max-width: 46ch` | 548px | 560px (minor Poppins metric diff) | OK | kept |
| 14 | Welcome banner render trigger | `body[data-firstrun="true"]` | `userWordCount < 5` (test-pinned) | P2 | kept (test enforced) |
| 15 | Welcome banner emoji | `.w-emoji { font-size: 54px }` 👋 | `.welcomeEmoji { font-size: 54px }` 👋 | OK | kept |
| 16 | Welcome banner `h3` | 22px/800/-0.01em "Welcome to Fun Learning" | 22px/800/-0.01em "Welcome to Fun Learning" | OK | kept |
| 17 | Welcome body copy | "Two of these grow with you: as you bookmark words while watching, Word Replay and Quick Quiz fill up with your own vocabulary. Until then, dive into Tiny Lessons and Slang Hang — they're ready right now." | identical (React escapes `'` to `’`) | OK | kept |
| 18 | Welcome banner radial-gradient | `rgba(178,24,209,0.18)` (old-palette magenta) | `color-mix(oklab, var(--fl-secondary) 18%, transparent)` → `oklab(0.485 ... /0.18)` (new DS deep-magenta) | P1 (Wave 4) | kept |
| 19 | Grid shape | `grid-template-columns: repeat(6,1fr); gap: var(--s-6)` | same | OK | kept |
| 20 | 01 Word Replay — span | `grid-column: span 6`, `min-height: 200px` | same | OK | kept |
| 21 | 01 Word Replay — `h3` font-size | `32px` (via `data-landing=editorial`) | `32px` unconditional (we never set `data-landing`) | OK | kept |
| 22 | 02–05 — spans | `grid-column: span 3`, `min-height: 240px` | same | OK | kept |
| 23 | Card hues | ext hex: c-replay `#ec4899`, c-quiz `#fbbf24`, c-lessons `#2dd4bf`, c-slang `#a78bfa`, c-library `#d678f0` | DS tokens: `--fl-accent-2` `#EC4DB0`, `--fl-warning` `#F5A623`, `--fl-success` `#16B57F`, `--fl-secondary` `#9A1C8E`, `--fl-accent` `#E0319E` | P1 (Wave 4) | kept — most noticeable shift is c-slang (purple → deep magenta) and c-lessons (teal → green). Intentional per the Wave 4 "DS tokens only, no raw hex" rule. |
| 24 | Hover `translateY(-4px)` on `.card` | always on | gated in `prefers-reduced-motion: no-preference` | OK (improvement) | kept |
| 25 | Hover transition on `.motif` (`translateY(-3px) rotate(-1.5deg)`) | always on | gated in `prefers-reduced-motion: no-preference` | OK (improvement) | kept |
| 26 | Motif container size | `150x104` | `150x104` | OK | kept |
| 27 | Motif position | `top:20px; inset-inline-end:20px; position:absolute` | same | OK | kept |
| 28 | 01 motif (fanned words `betray`/`gorgeous`/`curious` + accent bar on `mw-1`) | 3 stacked `.mw` cards, tilt deltas -8°/+4°/-2°, opacities .45/.85/1 | same tilt / opacity ladder, accent bar in `--card-hue` | OK | kept |
| 29 | 02 motif (quiz) — `.q-word "whisper"` + two `.q-opt` (`q-ok` with ✓ tick + `q-dim`) | yes | yes | OK | kept |
| 30 | 02 motif — `.q-opt-text` is empty | yes (empty span intentional) | yes | OK | kept |
| 31 | 02 motif — tick `color: #06310f` (dark green on green bg) | hex literal | `color: var(--fl-bg)` (dark purple-black) | P2 | kept (no `--fl-success-contrast` token; swap when the DS adds one) |
| 32 | 03 motif (`.l-card` tilted `-4deg`, "Window seat, please", two underlines, "tap to flip →") | yes | yes | OK | kept |
| 33 | 03 motif — `.l-tap` color | `var(--card-hue)` | `var(--card-hue)` (resolves to DS green) | OK (depends on card-hue, see #23) | kept |
| 34 | 04 motif (`.s-era` "modern" pill + `.s-bubble` "lowkey") | yes | yes | OK | kept |
| 35 | 04 motif — `.s-era` text color | `#efe2fb` (pale purple) | `var(--fl-text)` | P2 | kept (close enough on the deeper-magenta bubble) |
| 36 | 05 motif — chip grid | `.motif-library { grid-template-columns: repeat(3,1fr); gap: 7px; width: 124px }` BUT `.exp-card .motif { width: 150px }` wins on specificity, so RENDERED width is 150px | `.motifLibrary { width: 124px }` won against our `.motif { width:150px }` in CSS Modules (equal specificity, later-declared wins) → rendered 124px | **P0** | **FIXED** — removed the `width:124px` + `margin-inline-start:auto` dead-code overrides so the parent `.motif` 150px rule owns the width, matching the extension's rendered chip grid |
| 37 | 05 motif — chip squares, bookmark on 3rd chip in card-hue colour | yes | yes | OK | kept |
| 38 | `.x-num` typography | 12px / 600 / `--fl-text-3` / letter-spacing 0.08em | same (class renamed `.xnum` in CSS Modules; selector `.exp-card .x-num` in ext) | OK | kept |
| 39 | Tile `h3` typography (`.exp-card h3`) | 26px / 800 / -0.02em / `margin:auto 0 8px` | same (`.h` class) | OK | kept |
| 40 | Tile body `p` | 13.5px / line-height 1.5 / max-width 32ch | same | OK | kept |
| 41 | `.try` CTA pill | 9px/16px padding, 13px / 600, `color-mix(--card-hue 26%, --fl-surface-2)` bg, `--card-hue 40%` border | same, with DS-token-mapped card hues | OK | kept |
| 42 | `.try` hover (`gap 11px`, `--card-hue 40%` bg) | always | always (CSS transition on `gap`+`background` not gated — fine) | OK | kept |
| 43 | `.lock-hint` pill — 01 + 02 when `userWordCount == 0` | shown via `body[data-firstrun="true"] .exp-card.locked .lock-hint` | shown via `.card.locked .lockHint { display: inline-flex }` (default inherited from base) | OK | kept — confirmed `display: flex` on tiles 01+02 and `display: none` on 03/04/05 |
| 44 | `.lock-hint` copy | "Save words while watching to unlock" | identical | OK | kept |
| 45 | Locked card opacity | `0.82` + `cursor:not-allowed` | same | OK | kept |
| 46 | Locked card suppresses `.try` | `body[data-firstrun="true"] .exp-card.locked .try { display:none }` | `.card.locked .try { display: none }` (ungated by first-run) | OK | kept — matches "lock whenever count === 0" per Wave 8 tests |
| 47 | Breakpoint @ 880px: 2-col grid, replay spans 2 | yes | yes | OK | kept |
| 48 | Breakpoint @ 600px: 1-col grid, motif scaled 0.92 | yes | yes | OK | kept |
| 49 | Footer `.fl-footer` copy | "Funlingo — Learn while you watch" | identical | OK | kept |
| 50 | Footer typography | 13px / `--fl-text-3`, 48px top padding, top border | 13px / `--fl-text-3`, 48px top padding, top border | OK | kept |
| 51 | Locked tile `role="button"` + `aria-disabled="true"` | ext: `tabindex="0" role="button"` without aria-disabled | ours: `role="button" tabIndex=0 aria-disabled="true" aria-label` | OK (a11y improvement) | kept |
| 52 | Lang-scoping on UserWord count | n/a in the static extension | `prisma.userWord.count({ where: { userId, lang } })` — non-negotiable #4 | OK | kept |

## Severity counts

- **P0 fixed in this pass:** 1 (row 36 — library-tile motif width)
- **P1 kept (Wave 4 DS migration — intentional drift):** 2 (rows 18, 23)
- **P2 flagged, left as-is:** 3 (rows 14, 31, 35) — all low-impact copy / contrast tweaks that depend on future DS additions or a product call
- **OK (parity confirmed, nothing to do):** 46

## What was fixed

**Row 36 — `.motifLibrary` chip grid width**
`app/learn/learn.module.css`

- Removed the `width: 124px` + `margin-inline-start: auto` overrides on
  `.motifLibrary`. In the extension CSS those overrides are dead code — the
  `.exp-card .motif { width: 150px }` descendant selector wins on
  specificity, so the ext library tile renders at **150px wide**. Porting
  to CSS Modules collapses both selectors to the same specificity, so the
  later-declared `.motifLibrary { width: 124px }` was winning and we were
  rendering a visibly narrower chip grid than the extension.
- After the fix the library tile measures **150px × 104px** with chips
  that fill the row the way an extension user is used to seeing them.
- Verified in-browser via `getBoundingClientRect` and visual screenshot.

## What was flagged, not fixed

**Row 14 — welcome-banner trigger threshold.**
Extension gates on `body[data-firstrun="true"]` (a single boolean flipped
once per install). Ours triggers on `userWordCount < 5`. The Wave 6 /
Wave 8 ext-parity tests (`tests/unit/ext-parity.test.ts:76` and
`tests/unit/signed-out-home.test.ts:50`) assert the `< 5` literal, so
changing the trigger would break the test suite without a product decision.
A tighter "show only when count === 0" trigger would be more faithful to
the extension's semantics — leave for a product call.

**Row 18 — welcome-banner radial-gradient hue.**
Extension uses `rgba(178,24,209,0.18)` (old-palette magenta `#b218d1`).
Ours uses `color-mix(in oklab, var(--fl-secondary) 18%, transparent)` with
`--fl-secondary = #9A1C8E`. That's the Wave 4 DS migration — the file's
own docstring says "No raw hex" and the project rule in `/CLAUDE.md`
confirms "every colour is a token from DESIGN.md". The hue shifts a touch
cooler but reads correctly on the dark surface. **Keep.**

**Row 23 — card hues.**
Same story: `--card-hue` on each tile now resolves to a DS token
(`--fl-accent-2`, `--fl-warning`, `--fl-success`, `--fl-secondary`,
`--fl-accent`) instead of the extension's old raw hex. The most visible
shifts are the c-slang tile (`#a78bfa` purple → `#9A1C8E` deep magenta)
and c-lessons (`#2dd4bf` teal → `#16B57F` green). This is the single
largest visual difference between the two renders and it is intentional
per Wave 4. **Keep.**

**Row 31 — Quick-Quiz tick colour.**
Extension uses the hex literal `#06310f` (dark green text on the green
pill). The DS doesn't yet publish a success-contrast token, so ours uses
`var(--fl-bg)` (`#0E0816`, dark purple-black). Reads fine on the pale
green pill; swap to `--fl-success-contrast` whenever the DS adds one.

**Row 35 — Slang `.s-era` pill text colour.**
Extension uses `#efe2fb` (pale purple). Ours uses `var(--fl-text)` which
is slightly less tinted. Keep — the deeper-magenta bubble background it
sits in is tolerant of the shift and no DS token matches `#efe2fb`.

## Verification

- `pnpm test` — 231/231 passing (ran before + after the fix; same count).
- `pnpm build` — clean compile; `/learn` route size unchanged at **878 B**
  (first-load JS 110 kB).
- In-browser `getBoundingClientRect` on `/learn`:
  - Hero `h1` 108px / line-height 99.36px — matches ext.
  - 01 Replay 1124×221 (span 6 under IconRail); 02–05 550×240 (span 3) — matches ext proportions.
  - All five motifs now report **150 × 104** — matches ext.
  - Lock hints: `display: flex` on tiles 01 + 02, `display: none` on 03/04/05 — matches ext first-run rendering.
- Footer string, welcome-banner headline, greet string, hero title spans,
  Quick-Quiz route (`/review?mode=quiz&focus=casual`) all byte-identical to
  the extension copy.
