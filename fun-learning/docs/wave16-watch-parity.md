# Wave 16 — Watch-module parity (extension in-player JS → `/watch`)

Ground truth: Funlingo extension **1.3.2** (`extension/zips/Funlingo-1.3.2.zip`), walked file by file:
`shared_content.js` (in-video overlay React bundle — caption grid, word popup, subtitle-settings popup,
speed popover, reading mode, hover-pause toast, saved-word tooltip/self-test), `funlingo-subtitle-plus.js`
("More styles" panel), `funlingo-replay.js` (replay-line button + "Others" toggles), `funlingo-instant-tts.js`
(speechSynthesis voice scoring), `funlingo-word-popup.js` (save ding), `funlingo-save-fx.js` (save star/underline),
`funlingo-word-meta.js` + `wordmeta/*` (pinyin / reading / romanization / German gender), `youtube_content.js`
(YouTube wiring + caption status), `selection_content.js` + `funlingo-dual-v2.js` (website reader — not in-player).

Method: every `t("…")` key used in `shared_content.js` (119 keys) was resolved to its English string, every
`chrome.storage` key and default was listed, every `keydown` listener was read in context, and the React render
of each popup was read end to end. Earlier audits compared CSS/HTML only; this one is behaviour-first.

Legend — **Web?**: `yes` = feasible + allowed; `N/A` = only makes sense when drawing over a third-party player;
`not allowed` = LEGAL.md / CLAUDE.md forbids it; `deferred` = allowed but out of scope this wave (reason given).
"Ours (before)" = state of `main` @ 7d21ce4. "Status" = state after this wave.

## A. Word card (extension `word-hover-popup-mini`)

| # | Feature | What it does in the extension | Setting key / default | Shortcut | Ours (before) | Web? | Status |
|---|---|---|---|---|---|---|---|
| A1 | Open a word card | Hover (desktop) a word in the learning caption → card | — | — | Tap/click, `SubtitlePane.tsx:137` | yes | present (tap by design: touch + keyboard) |
| A2 | Auto-pronounce on open | Speaks the word with TTS when the card opens | `wordHoverSettings.enableTTS` = true ("Pronounce on click") | — | NO | yes (browser speechSynthesis, word only) | **ported** |
| A3 | Listen again | Speaker button replays the word | — | — | NO | yes | **ported** |
| A4 | Pause video while card is open | Pauses the player on open (`word-hover` reason), resumes on close if it was playing | — | — | NO | yes | **ported** |
| A5 | Translations list 1–3 | Shows N synonyms/translations; +/- stepper in card settings | `numTranslations` = 1 (max 3) | — | always 3 senses, `WordCardPopup.tsx:219` | yes | **ported** (stepper, default 3 to keep our richer card) |
| A6 | Card size 50–150 % | +/- 10 % stepper scales the card | `popupSize` = 130 | — | NO | yes | **ported** |
| A7 | Card settings menu | Gear → Translations / Size / Pronounce on-off | `wordHoverSettings` | — | NO | yes | **ported** |
| A8 | Phrase label | "Phrase: …" when the tap is part of a phrase | — | — | `isPhrase` returned but not shown | yes | **ported** (label + select several words to look up a phrase) |
| A9 | Root word | "Root word: …" (Tagalog root service) | — | — | lemma used as heading only | yes | **ported** (shows "Root word" when lemma ≠ tapped form; language-agnostic via AI lemma) |
| A10 | Pronunciation line | Transliteration / IPA respelling; zh pinyin, ja reading+romaji, ko romanization, de article + gender (`wordmeta/*`) | `funlingoWordMeta_v2` cache | — | NO | deferred | needs pinyin-pro/kuromoji/wanakana (~4 MB) or a `wordCard` prompt change (prompt change requires the idiom-fixture run with a live key) |
| A11 | Example + translation | "View example" → example with the word highlighted + its translation | — | — | example shown, no highlight, no translation | yes | **ported** (highlight + `exampleTranslation` + learner-language definition) |
| A12 | Save / remove saved word | Bookmark toggles save ↔ remove | `<platform>_bookmarkedWords` | — | save only; button disables | yes | **ported** (`POST /api/watch/wordState` action `unsave`) |
| A13 | Saved state on open | Card opens already "saved" if the lemma is in the deck | — | — | session-only | yes | **ported** (deck lemmas loaded per lang) |
| A14 | Saved-word self-test | Saved, not-graduated word: translation blurred, "Tap to reveal", then "I know this" graduates | `savedWord.*` | — | NO | yes | **ported** ("I know this" → `UserWord.state = known`) |
| A15 | Reveal/skip encounter log + auto-graduate | Records revealed/skipped per encounter; auto-graduates after N skips | `recordEncounter` | — | NO | deferred | analytics-style counter needs a schema field; manual graduate (A14) covers the learner-visible part |
| A16 | Save celebration | Star burst + green underline sweep on the saved word; ding | — | — | NO | yes | **ported** (CSS, reduced-motion gated); sound left as `// feedback: word-saved` for Wave 15 |
| A17 | Close × / Esc / outside click | — | — | Esc | ×/Esc, `WordCardPopup.tsx:137` | yes | present |
| A18 | Smart placement away from the video | Picks a side that avoids the video | — | — | fixed beside the pane | N/A | present (never over the iframe, LEGAL #6) |
| A19 | "In this video ×N" | (not in extension) | — | — | present `WordCardPopup.tsx:231` | — | ours only |

## B. Subtitle display (extension caption grid + `subtitle-styles-popup` + "More styles")

| # | Feature | What it does | Setting key / default | Shortcut | Ours (before) | Web? | Status |
|---|---|---|---|---|---|---|---|
| B1 | Dual subtitles (learning + native) | Two rows | `showNativeCaptions` = true | — | present `SubtitlePane.tsx:134-183` | yes | present |
| B2 | Toggle native row | — | `showNativeCaptions` | K (ours) | present `WatchClient.tsx:420` | yes | present |
| B3 | Learning row Show / Blur (hover to reveal) | Blur the learning line; hover reveals | `blurLearning_<platform>` = false | — | "Hide text" cover only | yes | **ported** (Show / Blur / Hide per track, SPEC §6.2) |
| B4 | Native row Blur (hover to reveal) | Same for native | `blurNative_<platform>` = false | — | NO | yes | **ported** |
| B5 | Learning size 12–36 px | Stepper | `subtitleSettings.youtube.learningSize` = 19 | +/- (ours, global) | global scale only | yes | **ported** (per-track px stepper; +/- still scales both) |
| B6 | Native size 12–36 px | Stepper | `…nativeSize` = 17 | — | NO | yes | **ported** |
| B7 | Learning / native colour | Colour pickers | `subtitleSettings.learning.color` / `.native.color` | — | NO | yes (swatches of `--fl-*` tokens — no free hex, DESIGN rule) | **ported** |
| B8 | Caption opacity 10–100 % | Caption box opacity | `subtitleSettings.opacity` | — | NO | N/A | box is over the video in the extension; our pane is a solid surface |
| B9 | Caption theme light / dark | Light/dark caption box | `theme` | — | NO | deferred | no light token set shipped in `tokens.css` yet (dark-first) |
| B10 | Text weight Regular/Semi/Bold | — | `funlingoSubtitlePlus.weight` = 0 (inherit) | — | NO | yes | **ported** |
| B11 | Line spacing 1.00–2.20 | — | `funlingoSubtitlePlus.lineHeight` = 1.35 | — | NO | yes | **ported** |
| B12 | Font family (8 fonts) | — | `funlingoSubtitlePlus.font` | — | NO | not allowed | CLAUDE.md rule 5: Poppins only |
| B13 | Vertical lift / safe margin | Moves overlay on the video | `vOffset` / `safeMargin` = 12 | — | — | N/A | positions an overlay on the video |
| B14 | Text edge none/shadow/outline + strength | Legibility over video | `fxStyle` = shadow, 90 | — | — | N/A | only needed over moving video |
| B15 | Background box colour/opacity/padding/radius | Box behind caption | `bgOn` = false | — | — | N/A | pane already has a surface |
| B16 | Remove bracket words | Hides `[music]`, `(laughs)`; drops all-bracket lines | `funlingoSubtitlePlus.removeBrackets` = false | — | NO | yes (display-only filter) | **ported** |
| B17 | Transliteration row + italic/bold/size/colour/blur | Active mode third row | `funlingoTranslit*` | — | NO | deferred | needs a transliteration service (extension uses an AWS lambda); not built |
| B18 | Karaoke "highlight spoken words" | Word-by-word highlight from YouTube word timings | `karaokeEffectEnabled` | — | NO | deferred | our `Caption` has no word timings; needs caption source change |
| B19 | Saved words highlighted in captions (all videos) | Lemma index highlight of every saved word | `funlingo-saved-word-highlight` | — | session saves only `SubtitlePane.tsx:141` | yes | **ported** (`GET /api/watch/saved?lang=`, lang-scoped) |
| B20 | "Save words to see them highlighted in future videos" tooltip | One-time hint | `savedWordTooltip` dismissed | — | NO | yes | **ported** (localStorage flag) |
| B21 | Word-glow nudge | After 15 s with no lookup, one word glows to teach tapping | `funlingo_word_glow_seen`, `funlingo_hover_discovered` | — | NO | yes | **ported** |
| B22 | Difficulty annotations (Standard mode) | Inline glosses on hard words by proficiency | `difficultyLevel`, `words-level.json` | — | NO | deferred (legal) | word-level list provenance unknown; LEGAL bans proprietary lists |
| B23 | Learning modes Standard / Casual / Active | Mixed / full sentence / transliteration | `learningMode` | — | Casual only | deferred | depends on B17 + B22 |
| B24 | Pause while hovering captions + one-time toast | Hovering the caption pauses; leaving resumes; "Never show again" | `funlingo_hover_pause_toast_dismissed` | — | NO | yes | **ported** (active line only; setting, default on) |
| B25 | Read line aloud (TTS) + karaoke | Speaker on the caption reads the line | `funLearningPrefs.voicePref` | — | NO | not allowed | LEGAL #1 bans "TTS read-outs" of subtitle tracks; YouTube clips can be TV/film. Word TTS (A2) is fine |
| B26 | Replay line button | Seeks to the cue start and plays | — | S (ours) | key only | yes | **ported** (button on the active line) |
| B27 | Pause after replaying a line | After a replay, pause at cue end | `funlingoReplayPauseAfter` = false | — | NO | yes | **ported** |
| B28 | Speak on hover | Master toggle for auto TTS | `funlingoSpeakOnHover` = true | — | NO | yes | **ported** (same toggle as A2) |
| B29 | Voice picker + preview | Pick a browser voice for the learning language; "Auto (best available)" | `funLearningPrefs.voicePref` = auto | — | NO | yes | **ported** |
| B30 | Subtitle settings panel (drag handle, Esc, outside click) | — | — | Esc | NO | yes | **ported** (popover under the controls, never over the iframe) |
| B31 | Swallow player keys while settings are open | k/j/l/m/f/c ignored | — | — | n/a | yes | **ported** (panel marked `data-fnl-wordcard`) |

## C. Playback controls

| # | Feature | What it does | Setting key / default | Shortcut | Ours (before) | Web? | Status |
|---|---|---|---|---|---|---|---|
| C1 | Speed popover | 0.25–2×, presets 0.5–1.5, slower/faster, reset to 1× | `funlingo_playback_speed` = 1 (per platform) | J / Shift+, / Shift+. (ours) | cycle 0.75–2, not saved | yes | **ported** (0.25–2 in YouTube's 0.25 steps; remembered) |
| C2 | Reading mode: rewind / forward 10 s | Buttons in transcript view | — | — | NO | yes | **ported** (buttons + Shift+←/→) |
| C3 | Reading mode transcript | Full timed transcript, click to seek | — | — | present (`SubtitlePane`) | yes | present |
| C4 | Auto-pause after each line | (ours) | — | Q | present `WatchClient.tsx:267` | — | present |
| C5 | Loop line | (ours) | — | R | present | — | present |
| C6 | Space resumes when paused by hover | — | — | Space | — | yes | **ported** (with B24) |
| C7 | Captions on/off per platform | Master switch | `funlingo_enabled_<platform>` | — | track toggles | yes | present |
| C8 | Onboarding modal, tour, rating prompt, "extension updated — reload", caption status chip, ad detection | Extension lifecycle | various | — | — | N/A | not study-player behaviour on the web |

## D. Save sentence (SPEC §6.4 / §6.6 — not in the extension overlay)

| # | Feature | Ours (before) | Status |
|---|---|---|---|
| D1 | Cmd/Ctrl+S "save line" | saved the line's first word (bug) `WatchClient.tsx:446` | **fixed** → saves the line |
| D2 | Save-line heart on every line | NO | **ported** `POST /api/watch/saveLine` — YouTube/DRM sources store sourceId + timestamp only (no caption text, LEGAL); own content stores a private `Sentence` |
| D3 | Saved lines marked in the transcript | NO | **ported** (timestamps from `GET /api/watch/saved`) |

## Counts

- Inventory rows: **61** (A 19 · B 31 · C 8 · D 3). C8 folds 7 extension-lifecycle items (onboarding, tour, rating, reload banner, caption status, ad detection, captions master switch UI) into one row.
- Present before this wave: **10** (A1, A17, A18, A19, B1, B2, C3, C4, C5, C7)
- Ported / fixed this wave: **37** (A 13 · B 18 · C 3 · D 3)
- Not allowed: **2** — B12 font family (CLAUDE.md rule 5, Poppins only); B25 caption-line TTS (LEGAL #1 "TTS read-outs" of subtitle tracks)
- N/A (only meaningful when drawing over a video, or extension lifecycle): **5** — B8, B13, B14, B15, C8
- Deferred: **7** — A10 pronunciation line (needs pinyin/kuromoji/wanakana or a prompt change + idiom run), A15 encounter log + auto-graduate (needs schema field), B9 light caption theme (no light tokens yet), B17 transliteration row (no transliteration service), B18 karaoke (no word timings in `Caption`), B22 difficulty annotations (word-list provenance — LEGAL), B23 learning modes (depends on B17 + B22). Also deferred: cross-device sync of watch prefs (they live in localStorage; `Prefs.json` is the seam).

## Where it lives

| Piece | File |
|---|---|
| Prefs (defaults, clamps, localStorage) | `src/lib/watch/prefs.ts` |
| Bracket filter, example highlight, saved-lemma match | `src/lib/watch/captionText.ts` |
| Word TTS (voice scoring, word-only) | `src/lib/watch/tts.ts` |
| English strings (for the Wave 14 catalog) | `src/lib/watch/strings.ts` |
| DRM / third-party gate shared by saveWord + saveLine | `src/lib/watch/drm.ts` |
| Subtitle settings + speed panels | `src/components/watch/WatchSettingsPanel.tsx` |
| Deck read (lemmas + saved-line times, lang-scoped) | `app/api/watch/saved/route.ts` |
| Remove saved word / "I know this" | `app/api/watch/wordState/route.ts` |
| Save line (timestamp-only for YouTube) | `app/api/watch/saveLine/route.ts` |
| Tests | `tests/unit/wave16-watch-parity.test.ts`, `tests/unit/wave16-watch-routes.test.ts` |
