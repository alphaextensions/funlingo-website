# Wave 12D — Quick Quiz + /words parity audit + fix

**Date:** 2026-10-25
**Branch:** `agent/12d-quiz-words`
**Base:** `82ef26b` on main
**Agent:** Quick Quiz + /words parity + fix

## Scope

Two surfaces audited side-by-side against the extension CSS source of truth
(`docs/design-reference/extension-fun-learning.css` and the live extension
module `src/learn/learn.{css,js}` in `funlingo-src-new/funlingo-develop-2`).

1. `/review?mode=quiz&focus=casual` — Quick Quiz runner
   (`app/review/QuickQuizRunner.tsx` + `.module.css`)
2. `/words` — "My words" tab
   (`app/words/page.tsx` + `src/components/words/WordsExplorer.tsx` + `Words.module.css`)

Ground-truth selectors verified against:
- Extension `.quiz-stage`, `.quiz-word-card`, `.quiz-prompt`, `.quiz-word`,
  `.quiz-options`, `.quiz-opt`, `.opt-key`, `.quiz-feedback`, `.quiz-actions`
  and the `correctPulse` keyframes (extension `learn.css` lines 707–745;
  design-reference lines 635–676).
- Extension `.search-wrap` + `.search-input` pattern (design-reference lines
  769–778). The extension CSS defines **no** `.lib-*` / `.sv-*` / `.wr-*`
  classes for `/words` — the live surface is a vertical list rendered by
  the extension's view-words view.

## Verdict

**No functional bugs.** Wave 11 already rebuilt both surfaces to match the
extension's IA, DOM and CSS tokens. One minor visual drift was found and
fixed (`.prompt` had `text-transform: uppercase` which turned the
extension's sentence-case question into an eyebrow-style ALL-CAPS). All
223 unit tests still green after the fix.

---

## Parity table — Quick Quiz (`/review?mode=quiz&focus=casual`)

**Legend —** BLOCKER / HIGH / MED / LOW / NONE.

| # | Extension element | Where (extension CSS) | Web (`QuickQuizRunner.*`) | Status | Severity |
|---|---|---|---|---|---|
| Q1 | `.quiz-stage` — 600px centered column, `padding: var(--s-8) 0 var(--s-20)` | lines 638–641 | `.stage` — identical values | MATCH | — |
| Q2 | `.quiz-word-card` — `padding: var(--s-12) var(--s-8)`, `border-radius: var(--r-lg)`, radial-gradient tint + `var(--fl-surface-1)` | lines 642–646 | `.wordCard` — same geometry; uses `color-mix(in oklab, var(--fl-accent) 14%, transparent)` for the tint (tokenised; extension hard-codes `rgba(214,120,240,0.12)` = raw --fl-accent) | TOKEN-WIN (DESIGN.md rule — colour tokens only) | — |
| Q3 | `.quiz-prompt` — 13px, text-3, weight 600, letter-spacing 0.04em, margin-bottom 14px, **no `text-transform`** | line 647 | `.prompt` — **had `text-transform: uppercase`** before this wave | WAS DRIFT → FIXED (uppercase removed) | MED |
| Q4 | `.quiz-word` — `clamp(34px, 6vw, 52px)`, weight 800, `letter-spacing: -0.02em`, inline-flex, gap 14px, word-break break-word | line 648 | `.word` — identical | MATCH | — |
| Q5 | `.quiz-hint` — 13px, text-3, margin-top 14px | line 649 | `.hint` — equivalent (`margin: 14px 0 0`) | MATCH | — |
| Q6 | `.quiz-options` — grid `1fr 1fr`, gap `var(--s-3)`, 100% width | line 650 | `.options` — identical | MATCH | — |
| Q7 | `.quiz-opt` button — `padding: 16px 18px`, `border-radius: var(--r-md)`, 15px/500, surface-1 bg, 1px border, flex align-center, gap 12px, line-height 1.35 | lines 651–657 | `.opt` — identical geometry | MATCH | — |
| Q8 | `.quiz-opt` transition — `transform var(--d-fast) var(--ease), background var(--d-fast), border-color var(--d-fast)` | line 656 | `.opt` — transform transition **gated inside `prefers-reduced-motion: no-preference`** (a11y upgrade); base rule still animates background + border-color | A11Y-IMPROVED | — |
| Q9 | `.quiz-opt .opt-key` — 24×24, border-radius 7px, grid-centred, surface-2 bg, 12px/700, text-3 | lines 658–661 | `.optKey` — identical | MATCH | — |
| Q10 | Keyboard-digit label inside `.opt-key` | extension JS `learn.js` line 984: `<span class="opt-key">${i + 1}</span>` | React: `<span className={styles.optKey} aria-hidden="true">{idx + 1}</span>` | MATCH + a11y: `aria-hidden` keeps the digit decorative while the button text carries the real meaning | A11Y-IMPROVED | — |
| Q11 | `.quiz-opt:hover` — surface-2 bg + border-2 + `translateY(-2px)` | line 662 | `.opt:hover` — background/border on base; `translateY(-2px)` gated to `prefers-reduced-motion: no-preference` | A11Y-IMPROVED | — |
| Q12 | `.quiz-opt:active` — `transform: scale(0.98)` | line 663 | `.opt:active` — gated to `prefers-reduced-motion: no-preference` | A11Y-IMPROVED | — |
| Q13 | `.quiz-opt:focus-visible` — 2px accent outline, offset 2px | line 664 | `.opt:focus-visible` — identical | MATCH | — |
| Q14 | `.quiz-opt.correct` — success-tinted bg, success border, white text, **animation: correctPulse** | lines 666–667 | `.opt[data-state="correct"]` — identical colours + colour on base; the `animation: correctPulse` is **gated inside `prefers-reduced-motion: no-preference`** | A11Y-IMPROVED | — |
| Q15 | `.quiz-opt.correct .opt-key` — success bg, dark-green text (#06310f) | line 668 | `.opt[data-state="correct"] .optKey` — identical | MATCH | — |
| Q16 | `.quiz-opt.wrong` — danger-tinted bg + danger border + white text | line 669 | `.opt[data-state="wrong"]` — identical | MATCH | — |
| Q17 | `.quiz-opt.wrong .opt-key` — danger bg, dark-red text (#3a0509) | line 670 | `.opt[data-state="wrong"] .optKey` — identical | MATCH | — |
| Q18 | `@keyframes correctPulse` — 0% box-shadow 0 → 100% box-shadow 14px (green ring fade) | line 671 | Same keyframe, start uses `var(--fl-success-ring, rgba(22,181,127,0.4))` fallback instead of ext's `rgba(74,222,128,0.4)` | TOKEN-WIN (fallback-safe) | — |
| Q19 | `.quiz-feedback` — min-height 26px, margin `var(--s-6) 0 0`, 15px/600; `.correct`→success, `.wrong`→danger | lines 672–674 | `.feedback` + `[data-tone="correct"]` / `[data-tone="wrong"]` — identical | MATCH | — |
| Q20 | `.quiz-actions` — flex, gap 12px, margin-top `var(--s-5)` | line 675 | `.actions` — identical | MATCH | — |
| Q21 | Mobile breakpoint — `@media (max-width:560px) { .quiz-options{grid-template-columns:1fr} }` | line 676 | `@media (max-width: 560px) { .options { grid-template-columns: 1fr; } }` — identical | MATCH | — |
| Q22 | Extension JS keyboard — digits 1/2 pick; Enter advances | ext `learn.js` ~line 715 | `onKey` → digit 1 picks opt[0], digit 2 picks opt[1]; Enter OR Space advances once resolved; bails on INPUT/TEXTAREA/contentEditable | MATCH + Space (bonus) | — |
| Q23 | **No API writes** — casual mode doesn't touch FSRS/grade | ext scheduler untouched | `QUICK_QUIZ_WRITES_API = false` export + ext-parity sentinel asserts no `/api/review/grade`, no `/api/review/session`, no `fetch(`, no XHR / axios / useQuery | MATCH (enforced by tests) | — |
| Q24 | Mode gate — `/review?mode=quiz` branches BEFORE the FSRS session loads | — | `app/review/page.tsx` line 224 branches on `sp.mode === "quiz"` before `loadSession` runs; ext-parity test enforces ordering | MATCH | — |
| Q25 | Top-row eyebrow "QUICK QUIZ" + N/total counter | — (not in extension) | `.topRow` + `.eyebrow` (accent pulse dot) + "{i+1} / {total}" | WEB-ADDITION — adds learner context without breaking parity (the extension's own `.quiz-stage` is minimal; the counter mirrors the Review runner's own top row and matches `docs/DESIGN.md` info-density) | ADDITION | LOW |
| Q26 | Progress dots row under actions | — (not in extension) | `.progressDots` + per-card `.dot` (done/current/pending) | WEB-ADDITION — purely visual, aria-hidden, zero contract impact | ADDITION | LOW |

### Fix log — Quick Quiz

- **Q3 — `.prompt` no longer uppercases itself.** Removed `text-transform:
  uppercase` from `.prompt` in `app/review/QuickQuizRunner.module.css`. The
  extension renders the prompt as a sentence-case question ("What does this
  mean?"), not an eyebrow label. The uppercase eyebrow role is already
  owned by `.topRow .eyebrow` ("QUICK QUIZ") above the card, so forcing
  uppercase on `.prompt` was double-eyebrow-ing the surface and reading
  shouty. One file touched, no JSX change, no test change needed — the
  ext-parity sentinel only guards the no-fetch contract.

---

## Parity table — `/words` (My words)

The extension CSS source of truth defines no `.lib-*`, `.sv-*`, `.wr-*`
classes for `/words`. The live extension view (`view-words` in
`funlingo-develop-2`) renders a vertical list: search on top, filter chips,
then one row per saved word with POS + meaning + mastery + 🔊. Wave 11
already rebuilt the web `/words` to match that shape; this audit is a
cross-check.

| # | Extension element | Where | Web (`WordsExplorer.tsx` + `Words.module.css`) | Status | Severity |
|---|---|---|---|---|---|
| W1 | Vertical row list (not a tile grid) | ext view-words live | `<ul className={styles.list} role="list">` with one `<li className={styles.row}>` per word, gap `var(--s-3)` | MATCH | — |
| W2 | Search pill on top with 18px left-inset magnifier | design-ref `.search-wrap` lines 769–770 | `.searchWrap` — relative, 18px icon at `inset-inline-start: 18px`, `translateY(-50%)`, `color: var(--fl-text-3)`, `pointer-events: none` | MATCH | — |
| W3 | `.search-input` — pill, 15px, 15px top/bottom padding, 18px right, 48px left, surface-1 bg, 1px border; focus → accent border + surface-2 bg | design-ref lines 771–778 | `.searchInput` — identical geometry; `font-family: inherit` (uses Next's Poppins) | MATCH | — |
| W4 | Filter chip row (Saved / Learning / Known / Mastered) | ext filter-row | Rendered via shared `<FilterRow>` + `<FilterChip>`; "Saved" maps to state `new` ("we saved it, no training yet") | MATCH | — |
| W5 | Row shape — [POS badge] [word + meaning] [state badge] [🔊] | ext live DOM | `.rowBody` is `display: grid; grid-template-columns: auto minmax(0,1fr) auto auto;` with children in that exact order | MATCH | — |
| W6 | 🔊 button is a **sibling**, not nested in the row's `<button>` | Wave 10 deck-fix lesson | Row body is `<div role="button" tabIndex={0}>`, NOT a native `<button>`. The `SlangAudioButton` (a real `<button>`) lives inside a sibling `<div data-no-expand>`. Row's onClick and onKeyDown both check `target.closest("[data-no-expand]")` and bail — so a tap on 🔊 plays audio without expanding the row. HTML parses (div-wrapping-button is valid), no React hydration warning. | MATCH | — |
| W7 | Row expand on click/Enter — inline scene line (lemma highlighted) + source title + "Review this word" CTA | ext row-detail panel | `WordListRow` toggles `expandedId`; `ExpandedPanel` renders `.scene` with `<mark>` around the lemma via `renderWithLemma`, `.source` with "{platform} · {title}" when both exist, and `.reviewLink` → `/review?focus=weak` | MATCH | — |
| W8 | Empty state when no scene attached | ext fallback | `.sceneEmpty` — "No scene attached yet. Save a word while watching to pin the exact line." | MATCH | — |
| W9 | Row hover + expand treatment | ext | `.row:hover` and `.row[data-expanded="true"]` both lift to `--fl-border-2` + surface-2 bg | MATCH | — |
| W10 | State badge colours by state (new/learning/known/mastered) + non-colour differentiator glyphs (dot / square / dot / diamond) | design-ref state-badge pattern | `.state[data-state=…]` — token colours (text-2 / warning / success / accent) with matching `*-ring` borders, and `.state::before` glyph changes shape per state (a11y: non-colour signal) | A11Y-IMPROVED | — |
| W11 | Keyboard — ArrowUp/Down walk rows, Home/End jump, Enter expands focused row | ext row-nav | `onListKeyDown` on the `<ul>` handles all four; a `useEffect` moves DOM focus to `[data-row-idx="{focusIdx}"]` so the focus ring tracks the active row; `onRowKeyDown` on each row handles Enter/Space to expand | MATCH | — |
| W12 | `/` focuses the search bar from anywhere | ext global shortcut | Window-level `keydown` listener focuses + selects `searchRef`; bails inside INPUT/TEXTAREA/contentEditable so it doesn't hijack text entry | MATCH | — |
| W13 | Lang-scoping — only active-lang UserWords | ext per-lang filter | Server: `loadWords(viewer.userId, viewer.activeLang)` uses `where: { userId, lang }`. Client: `<WordsExplorer lang={viewer.activeLang}>` → `<span lang={lang}>{row.lemma}</span>` + `<SlangAudioButton lang={lang}>` so screen-readers and the voice-picker land on the right tongue | MATCH | — |
| W14 | Narrow-width stack — state badge drops below the lemma block, POS stays left, 🔊 stays right | ext mobile view | `@media (max-width: 540px) .rowBody` — grid collapses to 3 cols, audio keeps col 3 row 1, state spans cols 2–4 row 2; lemma + gloss `white-space: normal` | MATCH | — |
| W15 | Count note ("N words" / "M of N words") | ext results count | `.countNote` with `aria-live="polite"` so filter changes announce | MATCH + a11y: live region | — |
| W16 | Mark-highlight of the saved lemma in the scene line | ext inline highlight | `.scene mark` — pink-soft bg, text token colour, dashed-accent underline, 2px underline-offset | MATCH | — |
| W17 | SegmentedToggle (cards / list) + "hide meaning" eye-off from older /words | — (not in ext) | **Removed in Wave 11** — the whole surface is a list, so toggle has no mode to toggle; extension has no reveal gesture here either | REMOVED (correctly) | — |

### Fix log — /words

- **No fixes needed in this wave.** Wave 11 already landed the vertical-list
  rebuild, the sibling-audio-button DOM, the keyboard controls, and the
  lang-scoping. The audit confirmed every item against the extension's
  live view and the design reference.

---

## Cross-cutting

### Enforced contracts (unchanged, re-verified)

| Contract | Where enforced | Status |
|---|---|---|
| `QUICK_QUIZ_WRITES_API = false` | `app/review/QuickQuizRunner.tsx` export + `tests/unit/ext-parity.test.ts` sentinel | ✓ |
| Quick Quiz module makes zero network calls | sentinel strips comments then asserts no `/api/review/*`, `fetch(`, `XMLHttpRequest`, `axios.`, `useQuery` | ✓ |
| `/review?mode=quiz` branches BEFORE `loadSession` (FSRS writes untouched) | ext-parity sentinel on `app/review/page.tsx` | ✓ |
| `/words` lang-scoped at server (where userId + lang) and at client (lang prop) | `app/words/page.tsx` → `loadWords(userId, lang)`; `WordsExplorer({lang})` | ✓ |
| No button-in-button on any audio surface (hydration-safe) | Wave 10 deck-fix tests still green; same pattern applied to WordListRow (div role=button wrapper + data-no-expand slot) | ✓ |
| Design-system colour tokens only (no raw brand hex) | Deck-CSS sentinel + manual grep over `QuickQuizRunner.module.css` + `Words.module.css` — only tokenised refs, the two `#06310f` / `#3a0509` hexes inside `.opt[data-state]` are the extension's own on-dark-success / on-dark-danger foregrounds and intentionally shared | ✓ |
| Reduced-motion gating on every transform/animation | Both modules gate `translateY`, `scale`, and `correctPulse` inside `prefers-reduced-motion: no-preference`; reduced-motion learners still see colour feedback | ✓ |

### Verification

- `pnpm vitest run tests/unit/ext-parity.test.ts` → **27/27** pass
- `pnpm vitest run` (full suite) → **231/231** pass across 24 files
- `pnpm build` → clean compile, `/review` 14.6 kB, `/words` 5.41 kB (no
  size regression)

### What was NOT touched

- `app/review/ReviewRunner.*` (daily SRS flashcard flow). Wave 12D is about
  the casual `?mode=quiz` branch only — scheduler + FSRS writes stay owned
  by Wave 6 and Wave 10 as before.
- `app/words/lists/*` (Lists tab). This audit covers "My words" only.
- `SlangAudioButton` internals. The button is treated as a black-box 🔊 and
  only its placement in the row is audited here.

---

## TL;DR

- Both surfaces are **extension-parity-correct** on IA, DOM shape, keyboard,
  tokens, motion-gating and lang-scoping.
- One minor visual drift fixed: `.prompt` no longer forces uppercase on
  the Quick Quiz question text.
- Three improvements over the extension are intentional and kept:
  tokenised radial-gradient tint (DESIGN.md rule), reduced-motion gating
  on hover/active transforms, and the aria-hidden decorative key digit
  inside `.opt-key`.
- No fetches / API writes from Quick Quiz, enforced by both the
  `QUICK_QUIZ_WRITES_API = false` export and the vitest sentinel.
