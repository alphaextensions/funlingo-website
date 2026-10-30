# Wave 12C — Tiny Lessons parity + fix audit

**Branch.** `agent/12c-tiny-lessons` (worktree, base `82ef26b`).

**Routes audited.**
1. `/learn/tiny-lessons` — the situation picker (`app/learn/tiny-lessons/page.tsx` + `tinyLessons.module.css`).
2. `/learn/tiny-lessons/[situation]` — the detail deck (`PhraseCards.tsx` on top of the shared `FlashcardDeck`).

**Ground truth.** `docs/design-reference/extension-fun-learning.css` lines 681–702 (`.sit-grid` + `.sit-tile`) for the picker, and lines 707–764 (`.deck` + `.flashcard`) for the detail; the picker's `view-situations` section and the landing's `view-landing` block in `docs/design-reference/extension-fun-learning.html` for copy.

---

## 1. Picker (`/learn/tiny-lessons`)

Picker was last rebuilt in Wave 11 and already matched the extension. Audit confirms every bullet from the task spec is already honoured — kept as-is, no changes to the picker's CSS or route.

| Spec | Expected | Found (`tinyLessons.module.css`) | Status |
|---|---|---|---|
| Grid default | `repeat(4, 1fr)` | line 13: `grid-template-columns: repeat(4, 1fr)` | ok |
| Grid @ 880px | `repeat(2, 1fr)` | lines 100-102 | ok |
| Grid @ 480px | `1fr` | lines 104-106 | ok |
| Tile emoji size | 50px | line 72: `font-size: 50px` | ok |
| Tile emoji bounce on hover | `scale(1.14)` gated by `prefers-reduced-motion: no-preference` | lines 39-57: hover-transform rules + emoji scale sit inside `@media (prefers-reduced-motion: no-preference)` | ok |
| Tile title | 17px / 700 / `-0.01em` | lines 77-82 | ok |
| Tile sub | 11.5px / 500 / `--fl-text-3` | lines 84-89 | ok |
| Tile count | 12px / inline-flex / 6px gap | lines 91-98 | ok |
| Tile IA | emoji → title → sub → "N phrases" | `page.tsx` lines 65-72 — Link renders `.sitEmoji`, `.sitTitle`, `.sitSub`, `.sitCount` in that order | ok |
| Hover lift & shadow | `translateY(-4px)` + `--el-2`, gated by motion query, reduced-motion keeps the border + shadow | lines 39-64 | ok |
| Focus ring | 2px solid accent, 3px offset | lines 66-69 | ok |
| Lang scoping | `listSituations(viewer.activeLang)` | `page.tsx` line 26 | ok |
| Empty state | "No Tiny Lessons for this language yet" + CTA back to `/learn` | `page.tsx` lines 28-46 | ok |
| Eyebrow copy | "Situations" | `page.tsx` lines 32, 52 | ok |
| Lede copy | "Pick a situation, learn the phrases. Tap a card to reveal its meaning." | `page.tsx` lines 34, 54 — matches `view-situations` extension HTML line 184 verbatim | ok |

No code changes were needed on the picker. The CSS already carries the extension's `.sit-grid` + `.sit-tile` block byte-for-byte, so Wave 12C left it alone.

---

## 2. Detail deck (`/learn/tiny-lessons/[situation]`)

Four Wave-12B lessons applied here, plus three Tiny-Lessons-specific checks.

### Fix log

| # | Change | Rationale | Where |
|---|---|---|---|
| 1 | **🔊 audio button on the FRONT face** too, wrapped in `<div data-no-flip>`. | A learner should be able to hear a phrase before committing to flip — flipping-then-tapping is two gestures where one is enough. Mirrors the Wave 12B Slang Hang lesson. The outer flip-trigger stays a `<div role="button">` so the native `<button>` audio button isn't nested (hydration-safe). | `app/learn/tiny-lessons/[situation]/PhraseCards.tsx` — new `.fcFrontAudio` row with `SlangAudioButton` + "Hear it" label. New CSS class `.fcFrontAudio` + `.fcFrontAudioLabel` in `FlashcardDeck.module.css`. |
| 2 | **Hand-tap icon** inside both "Tap for meaning" and "Tap to flip back" hint spans. | The extension CSS reserves `.fc-hint svg{width:13px;height:13px;opacity:0.8}` (line 745). A plain-text "Tap for meaning" is less obviously an action. The icon lands inside the existing `.fcHint` span which already uses `display: inline-flex; gap: 7px` so the SVG + text stack horizontally. | `PhraseCards.tsx` ships a `<TapIcon />` component rendered inside both face hints. `FlashcardDeck.module.css` adds `.fcHint svg, .fcHintIcon` sizing to match the extension. |
| 3 | **Promote Next to the primary (filled) pill**; keep Prev on the secondary (outlined) pill. | "Forward" is the dominant action in a deck — equal pills bury it. New `.navBtnPrimary` modifier uses `linear-gradient(120deg, --fl-secondary, --fl-accent)` + white text + `--el-1` shadow, same brand gradient the extension uses on `.toggle.on` and primary CTAs. Disabled state falls back to the surface-2 pill so it still reads as "disabled". | `FlashcardDeck.module.css` adds `.navBtnPrimary` block. `FlashcardDeck.tsx` applies both classes to the Next `<button>`. Prev `<button>` is untouched. |
| 4 | **Lowercase badge if any.** | N/A for Tiny Lessons — the picker has no era/register badges (those are Slang Hang). The "N phrases" count on tiles already uses sentence-case ("3 phrases"). No change needed. | — |
| 5 | **Counter format `N / M in <SituationTitle>`.** | The shared `FlashcardDeck` composes `${index+1} / ${total} ${counterSuffix}`, and `PhraseCards.tsx` passes `counterSuffix = "in <SituationTitle>"`. The spec was already matched by Wave 10 (`PhraseCards.tsx` line 67 of the pre-12C file) — audit confirms it. | `PhraseCards.tsx` `counterSuffix` + `FlashcardDeck.tsx` `counterText`. |
| 6 | **"Literally: …" block on back face, italic muted,** when the phrase has `literal`. | `.bLiteral` is `font-size: 13px; color: var(--fl-text-3); font-style: italic` — matches the extension's `.fc-back .b-literal`. The TSX gates the `<p>` on `p.literal && …`. Already correct — audit confirms. | `PhraseCards.tsx` back face + `FlashcardDeck.module.css` `.bLiteral`. |
| 7 | **Usage note directly below meaning** when the phrase has `usage`. | Previous Wave-10 order was meaning → literal → divider → usage. Reordered to meaning → usage → literal → divider → audio → hint, which matches the extension's natural `.b-mean` (`margin-top:4px`) → `.b-usage` (`margin-top:6px`) stacking. The usage is the "when do I use this" context — it belongs next to the meaning, not after a divider. | `PhraseCards.tsx` back face. |

### Still-correct bits (regression floor)

* **No `<button>`-in-`<button>`.** Both audio mounts sit inside `data-no-flip` wrappers; the deck trigger stays `<div role="button">`.
* **`prefers-reduced-motion`.** Picker emoji bounce + tile lift, the deck's 3D flip transition, and the `navBtnPrimary` pill all respect the reduce query.
* **Lang scoping.** `getSituation(viewer.activeLang, situation)` on the server; `lang={lang}` on the phrase `<h3>` and on both audio mounts so screen-readers + TTS land on the right voice.
* **Design tokens only.** The only non-token hex in `FlashcardDeck.module.css` is `#fff` on the primary pill text (allowed — pure white, not a brand hex).
* **No scoring / streak writes.** The route is still a thin server component feeding JSON catalogs into a client deck; no `/api/*` from the deck.

### Shared `FlashcardDeck` ripple

The `.navBtnPrimary` modifier and the `.fcHint svg` sizing rule live on the shared `FlashcardDeck` module, so Wave 12B's Slang Hang route also gains the primary Next pill and the 13×13 tap-icon slot. Wave 12B is making the parallel content changes (its own 🔊-on-front, TapIcon in hints) in its own worktree — the CSS additions are additive and should merge cleanly.

---

## Verified

* `pnpm test` — 241/241 pass (ext-parity suite: 37/37, including 10 new Wave 12C assertions).
* `pnpm build` — clean. Route sizes:
  - `/learn/tiny-lessons` 692 B (picker, unchanged).
  - `/learn/tiny-lessons/[situation]` 1.12 kB (was 929 B — +~200 B for the front audio row, TapIcon, and primary-pill class).
  - `/learn/slang` 1.08 kB (shared deck gained the primary-pill class but no content change here).

## Known gotchas future lanes should know

* `.navBtnPrimary` is applied unilaterally to the Next button in the shared `FlashcardDeck`. If a future deck surface wants a symmetric look (both pills secondary, or Next as a danger pill for a "Finish" step), gate the class behind a `nextVariant` prop rather than fighting the base styles.
* The `TapIcon` component is defined locally in `PhraseCards.tsx` because it only renders inside the `.fcHint` span (where `fill="none"` + `currentColor` picks up the muted hint color automatically). If Slang Hang's Wave 12B agent lifts an identical TapIcon into a shared location, replace the local copy with the import — no behaviour change.
* The front audio row (`.fcFrontAudio`) sits ABOVE the hint in the vertical stack. The front face's `justify-content: center` + `gap: 18px` keeps spacing consistent; the row's own `margin-top: var(--s-2)` tightens the audio-to-hint gap so the audio button doesn't drift up into the romanization line.
