# Wave 12-F — Funlingo Design-System Compliance Audit

**Scope:** `/Users/r/Downloads/Funlingo/apps/fun-learning` (branch at `82ef26b`)
**Ground truth tokens:** `src/styles/tokens.css` + `docs/design-reference/funlingo-tokens.css`
**Mode:** read-only grep audit. No source edits.

Severity key: **BLOCKER** (hydration/accessibility breaker) · **HIGH** (visible brand drift) · **MED** (code hygiene / off-scale) · **LOW** (safe fallback literal, cosmetic polish).

---

## 1. Raw hex / rgba outside `tokens.css`

**Hits:** 13 hex + 9 rgba. Most are safe `var(--token, #literal)` fallbacks; a handful are real drift.

| File:line | Value | Covered by token? | Severity |
|---|---|---|---|
| `src/components/learn/FlashcardDeck.module.css:128` | `rgba(214, 120, 240, 0.12)` | **No — this is the SUPERSEDED old-palette tint (`#d678f0`)** | **HIGH** |
| `src/components/learn/FlashcardDeck.module.css:136` | `rgba(139, 92, 246, 0.16)` | **No — superseded old `#8b5cf6` tint** | **HIGH** |
| `app/review/QuickQuizRunner.module.css:159` | `color: #fff` | Yes → `var(--fl-on-accent)` | HIGH |
| `app/review/QuickQuizRunner.module.css:170` | `color: #fff` | Yes → `var(--fl-on-accent)` | HIGH |
| `app/review/QuickQuizRunner.module.css:164` | `color: #06310f` (dark-green chip text on success) | No token (bespoke contrast colour) | MED |
| `app/review/QuickQuizRunner.module.css:175` | `color: #3a0509` (dark-red chip text on wrong) | No token | MED |
| `app/review/QuickQuizRunner.module.css:189` | `rgba(22, 181, 127, 0)` (keyframe end-state) | Could be `transparent` | LOW |
| `app/layout.tsx:21–22` | themeColor `#0E0816` / `#FBF4FF` | Matches tokens — Next.js metadata needs literals; keep but comment that it mirrors `--fl-bg` | MED |
| `src/components/SlangAudioButton.module.css:8,14,41,49` | `#ffffff` + `rgba(154,28,142,0.6)` + `rgba(224,49,158,0.4)` — all inside `var(--…, fallback)` | Yes (fallback only) | LOW |
| `src/components/words/Words.module.css:257` | `#ffffff` fallback inside var() | Yes | LOW |
| `app/review/QuickQuizRunner.module.css:222, 294, 186` | fallbacks inside var() | Yes | LOW |
| `app/read/[bookId]/EpubReader.tsx:105, 110, 112` | fallbacks via `token("--fl-…", "#literal")` helper | Yes (fallbacks) | LOW |
| `app/layout.tsx:18` | hex in a code comment | n/a | LOW |

**Count:** 2 HIGH-brand (old palette), 2 HIGH (bare `#fff`), 3 MED, rest LOW.

---

## 2. Type-size drift

**DS integer scale:** 11 / 12 / 13 / 14 / 15 / 16 / 19 / 20 / 23 / 26 / 34 / 38 / 56 / 80, plus `clamp()` families.

**On-scale (fine):** 266 declarations across 11, 12, 13, 14, 15, 16, 20, 26, 56 px.
**Off-scale:** **65 declarations.** No `clamp()` usage anywhere in `.module.css` — every display size is a hard pixel number.

### Off-scale by bucket

| Bucket | Count | Representative files |
|---|---|---|
| `9px` / `9.5px` (below floor) | 4 | `TopNav.module.css:116`, `learn.module.css:268,293,298` |
| `10px` / `10.5px` | 18 | `DrillChip.module.css:6`, `FlashcardDeck.module.css:148,239`, `Words.module.css:111,203`, `Library.module.css:110,355`, `Progress.module.css:92,115`, `ModeSwitcher.module.css:44`, `WordCardPopup.module.css:33`, `CulturePanel.module.css:43`, `ShelfTabs.module.css:137`, `reader.module.css:252`, `Shadowing.module.css:80`, `Speaking.module.css:92`, `Flashcard.module.css:114`, `LessonChat.module.css:170` |
| `11.5` / `12.5` / `13.5` / `14.5px` | 11 | `TopNav.module.css:123`, `FlashcardDeck.module.css:191,218,230`, `learn.module.css:125,367`, `tinyLessons.module.css:85`, `LessonChat.module.css:259` |
| `17px` | 8 | `Card.module.css:56`, `Settings.module.css:55`, `Progress.module.css:56,170`, `Library.module.css:123`, `tinyLessons.module.css:78`, `reader.module.css:112`, `Flashcard.module.css:89` |
| `18px` | 8 | `TopNav.module.css:71`, `Words.module.css:131`, `Library.module.css:325`, `WatchClient.module.css:158`, `upload.module.css:110`, `Shadowing.module.css:32`, `Dictation.module.css:74`, `talk/page.module.css:71` |
| `21` / `22px` | 10 | `EmptyState.module.css:37`, `FlashcardDeck.module.css:24,201`, `WordCardPopup.module.css:26,41`, `SubtitlePane.module.css:76`, `ShortcutHelp.module.css:25`, `WatchClient.module.css:19`, `learn.module.css:117`, `ReviewRunner.module.css:212` |
| `24` / `28px` | 3 | `StubPage.module.css:27`, `review/page.module.css:31`, `talk/page.module.css:59` |
| `32` / `36px` | 4 | `Progress.module.css:28`, `learn.module.css:180`, `Flashcard.module.css:22`, `GuessMeaning.module.css:25` |
| `40` / `42` / `48` / `50` / `54px` | 6 | `tinyLessons.module.css:72,119`, `ShelfTabs.module.css:95`, `learn.module.css:110`, `Shadowing.module.css:116`, `Speaking.module.css:128` |

**Severity:** HIGH overall (65 drift sites; display sizes above 26 should be `clamp()` families per DS; `9–10 px` is below the DS `--fs-tag:11px` floor and violates the CLAUDE.md rule "never below 14 px except tags/eyebrows"). The `.5 px` sizes are HIGH — sub-pixel rendering is a smell.

---

## 3. `prefers-reduced-motion` gaps

192 `transform:` / `transition:` lines across 36 `.module.css` files. 23 files use animations without an `@media (prefers-reduced-motion: no-preference)` gate or a `reduce` override. The global rule in `globals.css:185` only silences `.ambient` orbs — it does NOT blanket-silence module transforms.

### Transform-based hover/animation WITHOUT gate (actual lift / move animations)

| File:line | Animation | Severity |
|---|---|---|
| `src/components/Card.module.css:29` | `.card:hover { transform: translateY(-1px) }` — the universal glass card | **HIGH** (hits every clickable card in the app) |
| `src/components/settings/Settings.module.css:161,168` | iOS toggle thumb `transform: translateX(18px)` | MED |
| `app/review/drills/Shadowing.module.css:65` | `transform: translateY(-1px)` on button hover | MED |
| `app/review/drills/GradeRow.module.css:33,37` | `transform: translateY(-1px)` on grade row | MED |
| `app/review/drills/Dictation.module.css:50, 172` | `transform: translateY(-1px)` on hover (×2) | MED |
| `app/review/drills/Speaking.module.css:82` | `transform: translateY(-1px)` on record button hover | MED |

### Transition-only (color/background/border) without gate — LOW each

`FilterChip`, `IconRail`, `TabBar`, `SegmentedToggle`, `watch/ModeSwitcher`, `watch/ShortcutHelp`, `watch/SubtitlePane`, `Words` (border/background only), `Library` (border/background only), `talk/page.module.css`, `read/[bookId]/reader.module.css`. These change colour, not motion — reduce-motion is less critical. Still worth a single top-of-file `@media (prefers-reduced-motion: reduce) { * { transition: none !important } }` scope at `globals.css`.

**Severity:** 1 HIGH (Card), 5 MED, ~11 LOW.

### Keyframe `@keyframes` outside a gate

`QuickQuizRunner.module.css:184 correctPulse`, `FlashcardDeck.module.css` has its own `reduce` block (good), `Shadowing/Speaking` big-timer displays — the keyframe is defined globally but only triggered under a `@media (no-preference)` wrapper in `QuickQuizRunner.module.css:178`. OK.

---

## 4. Font-weight anti-patterns

Grep for `font-weight: 300` → **0 hits.** Grep for `font-weight: 400` → **0 hits.** 225 `font-weight` declarations total, all are 500 / 600 / 700 / 800 / 900 or `var(--fw-*)`.

**Clean.** No action needed in this section.

---

## 5. Missing `--fl-*` wrapping of common colours

Only two unwrapped-white occurrences, both in the quick-quiz runner:

- `app/review/QuickQuizRunner.module.css:159` — `color: #fff;` inside `.opt[data-state="correct"]`. Fix: `color: var(--fl-on-accent, #fff);` (matches the pattern already used in the same file at lines 222 and 294).
- `app/review/QuickQuizRunner.module.css:170` — identical issue in `.opt[data-state="wrong"]`.

**Severity:** HIGH (visible on every quiz result state; themeable via tokens, so a light-mode fix is one line).

Hex fallbacks inside `var()` elsewhere are LOW; they are the DS-recommended idiom.

---

## 6. Button-in-button / anchor-in-anchor hazard scan

**Totals:** 107 `<button|<a ` tags across `app/` + `src/components/`. 44 anchor/`<Link>` usages. 5 `role="button"` wrappers.

### `role="button"` on `<div>` (correct — chosen specifically to avoid button-nesting)

| File:line | Why it's a div-with-role | Verdict |
|---|---|---|
| `app/learn/LearnLanding.tsx:193` | Locked learn-tile — not interactive | OK |
| `src/components/learn/FlashcardDeck.tsx:143` | Flip trigger. Nests `SlangAudioButton` on the back face. Comment at line 17 explains. | OK |
| `src/components/words/WordsExplorer.tsx:262` | Row body. Nests `SlangAudioButton` in `.audioSlot`. Comment at line 238 explains. | OK |
| `src/components/Card.tsx:7` (prop) | Opt-in via prop; module CSS lifts on `card[role="button"]`. | OK |
| `app/learn/slang/SlangDeck.tsx`, `.../PhraseCards.tsx` | Rendered through `FlashcardDeck` above. | OK |

### Actual `<button>` inside `<button>` or `<a>` inside `<a>`

None found. Every nest-prone surface (flashcard flip, word row, slang/phrase card) deliberately uses `<div role="button">` with a documented `data-no-flip` / `data-no-expand` escape hatch. The lesson from the Wave 10 fix is codified in file-header comments in all three sites.

**Severity:** no BLOCKER. Clean.

---

## 7. `<SlangAudioButton>` safety

All 3 usages in the codebase live inside a `role="button"` row/card AND are wrapped in a container that carries a guard attribute:

| Usage | Container guard | Verdict |
|---|---|---|
| `app/learn/tiny-lessons/[situation]/PhraseCards.tsx:52–58` | `<div className={fc.bAudioRow} data-no-flip>` | OK |
| `app/learn/slang/SlangDeck.tsx:59–65` | `<div className={fc.bAudioRow} data-no-flip>` | OK |
| `src/components/words/WordsExplorer.tsx:281–287` | `<div className={styles.audioSlot} data-no-expand>` | OK |

The flip trigger (`FlashcardDeck.tsx:150–164`) and the row body (`WordsExplorer.tsx:252–267`) both check `target.closest("[data-no-flip]")` / `[data-no-expand]` on `onClick` and `onKeyDown`.

**Severity:** no BLOCKER. Clean.

---

## Counts summary

| Section | BLOCKER | HIGH | MED | LOW |
|---|---|---|---|---|
| 1. Raw hex/rgba | 0 | 4 | 3 | ~12 |
| 2. Type-size drift | 0 | 65 (bucketed above) | — | — |
| 3. Reduced-motion gaps | 0 | 1 | 5 | ~11 |
| 4. Font-weight anti-patterns | 0 | 0 | 0 | 0 |
| 5. `--fl-*` wrapping | 0 | 2 | 0 | 0 |
| 6. Button-in-button | 0 | 0 | 0 | 0 |
| 7. Audio-button safety | 0 | 0 | 0 | 0 |

**Headline:** 0 BLOCKERs. Hydration and interactive-nesting are clean (the Wave 10 lesson stuck). The real drift is in type scale (65 sites) and two palette-leftover `rgba()` tints on the flashcard back face.

---

## Top 10 most urgent fixes

1. **`src/components/learn/FlashcardDeck.module.css:128`** — swap `rgba(214,120,240,.12)` for `color-mix(in oklab, var(--fl-accent-2) 12%, transparent)` (or `var(--fl-pink-soft)`). It's the superseded palette and the back of every flashcard carries it.
2. **`src/components/learn/FlashcardDeck.module.css:136`** — same fix for `rgba(139,92,246,.16)` on the back face.
3. **`app/review/QuickQuizRunner.module.css:159, 170`** — replace bare `color: #fff` with `color: var(--fl-on-accent);` so quiz chips track light mode.
4. **`src/components/Card.module.css:28–36`** — wrap the `.card:hover { transform: translateY(-1px) }` block in `@media (prefers-reduced-motion: no-preference) { … }`. One file, universal impact.
5. **Type scale sweep — the 10 px / 9 px floor** (19 sites): bump each to `11px` (DS `--fs-tag`). Below-floor sizes read as noise and violate the CLAUDE.md "never below 14 px except tags/eyebrows" rule.
6. **Type scale sweep — half-pixel sizes** (11 sites: 9.5 / 10.5 / 11.5 / 12.5 / 13.5 / 14.5): snap each to the nearest DS integer. These produce sub-pixel aliasing.
7. **Type scale sweep — the `17px` cluster** (8 sites across Card, Settings, Progress, Library, tinyLessons, reader, Flashcard): snap to 16 or 19. 17 is the single most common off-scale integer.
8. **Type scale sweep — the `21 / 22 px` cluster** (10 sites): snap to 20 or 23. These are mostly flashcard-face headings and watch-mode subtitle sizes; they should use `--fs-h4` (`19px`) or `--fs-h3` (`23px`).
9. **Display sizes `40–54 px`** (6 sites) should become `clamp()` families (`--fs-h2`, `--fs-h3-lg`, `--fs-stat`) — currently they do not scale with viewport and will truncate on mobile narrow.
10. **Review-drill hover transforms** — add a `no-preference` gate (or a single `@media (reduce)` kill in `globals.css`) covering `Shadowing / GradeRow / Dictation / Speaking` button hovers (5 sites).

---

## Not actioned (confirmed clean)

- No font-weight 300 anywhere; no 400 body copy.
- No `<button>` nested in `<button>`, no `<a>` nested in `<a>`.
- Every `SlangAudioButton` sits inside a guarded container.
- Brand-colour rgba utilities (`--fl-accent-glow`, `--fl-secondary-glow`, `--fl-success-ring`, etc.) are consistently referenced via `var()`; the raw-rgba hits found are either safe fallbacks or the two flashcard tints in #1–2.
- `app/layout.tsx` themeColor hex values (`#0E0816`, `#FBF4FF`) are correct literals for the Next.js metadata API, which does not resolve CSS vars — leave as-is but keep the inline comment mirroring the token name.

---

*Audit generated 2026-10-25. Read-only. No source files were edited.*
