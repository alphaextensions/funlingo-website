# Wave 17 — Popup + saved-words parity audit

**Branch:** `agent/17-popup-parity` (base `7d21ce4` main)
**Ground truth:** Funlingo extension 1.3.2 `dist/popup/popup.html`, `dist/popup.js`
(app logic at byte offsets ~821k–911k: saved-words store `xo`, viewed words,
bookmarks render, settings handlers), `dist/quick-translate.js`, and
`dist/learn.js` (Saved "Your Library" view, Continue "Word Replay" view,
settings drawer `funLearningPrefs`).
**Our modules:** `/words`, `/sentences`, `/settings`, `/library`, `/progress`.

Status key:
- **PRESENT** — already in the web app (file:line).
- **PORTED** — missing before Wave 17, built in this wave.
- **NOT ALLOWED** — LEGAL.md forbids it.
- **N/A** — only makes sense inside a browser extension running on a
  third-party site (active tab, page overlay, per-site injection).
- **DEFERRED** — feasible and allowed, but blocked on another lane or a
  missing pipeline; reason given.

## A. Popup — Funlingo tab

| # | Feature | Extension behaviour | Storage key / default | Web app | Status |
|---|---|---|---|---|---|
| A1 | Fun Learning CTA | Opens `learn/learn.html`, focusing an existing tab | — | The web app *is* Fun Learning | N/A |
| A2 | Platform selector | 10 platforms (YouTube, Netflix, Prime, Hotstar, Apple TV, Coursera, Udemy, Crunchyroll, Tubi, Bilibili); switching re-renders history and opens / focuses that site | in-memory `T`, default `youtube` | No per-platform shell on the web | N/A (the *filter* meaning is ported as B9) |
| A3 | Now Playing card | Reads the active tab's `isVideoPage` state, equalizer badge, "Watching Series / Movie / Course / Anime" or channel name | `<platform>_current` | No active-tab concept | N/A |
| A4 | Recent Watches | Last 3 watched items for the platform, junk titles filtered, current video excluded, thumbnail fallback, "Watch again" opens it | `<platform>_history` | NO | PORTED → `/library` "Recently watched" (top 3 `VideoSession` rows for the active learning language, progress %, "Watch again") |
| A5 | Learning subtitle size | −/+ 8..50, default 19 (YouTube) / 21 (streaming) | `subtitleSettings.{youtube,streaming}.learningSize` | NO | DEFERRED — only the `/watch` dual-sub renderer can honour it; `/watch` is Wave 16's lane. Shipping a control that changes nothing would be a dishonest setting. Seam below. |
| A6 | Learning subtitle colour | colour picker | `subtitleSettings.learning.color` | NO | DEFERRED (same as A5) |
| A7 | Native subtitle size | −/+ 8..50, default 17 / 19 | `subtitleSettings.*.nativeSize` | NO | DEFERRED (same as A5) |
| A8 | Native subtitle colour | colour picker, default `#292929` | `subtitleSettings.native.color` | NO | DEFERRED (same as A5) |
| A9 | Caption opacity | −/+ step 5, 0..100, default 90 | `subtitleSettings.opacity` | NO | DEFERRED (same as A5) |
| A10 | Caption variant Light / Dark | radio, default dark, broadcast `applyTheme` to tabs | `theme` = `"dark"` | NO | DEFERRED (same as A5) |
| A11 | Show Funlingo Caption | per-platform overlay on/off | `funlingo_enabled_<platform>`, `buttonControlEnabled`, `showNativeCaptions_<platform>` | Overlay lives on third-party sites | N/A |
| A12 | Export subtitles | TXT/SRT dual-language transcript (commented out in 1.3.2) | — | — | NOT ALLOWED (LEGAL §3) |
| A13 | Disable on this site + disabled-sites list with Re-enable | per-host exclusion | `funlingo_site_exclusions` | — | N/A |
| A14 | Chat support | Crisp chat (commented out in 1.3.2) | — | — | N/A (disabled upstream) |
| A15 | Interface language | 22 locales, falls back to native language | `funlingo_interface_language`, `funlingo_english_mode` | PRESENT `src/components/settings/SettingsForm.tsx` (Interface select). Locale list differs (ours lacks nl / ro / sv / uk / pt-BR vs pt-PT / zh-CN vs zh-TW) | PRESENT (locale list alignment DEFERRED to Wave 14, which owns the i18n catalog — adding options with no strings would be a fake choice) |
| A16 | Footer: website link, LinkedIn, Instagram, version | — | — | Web chrome, not a learning feature | N/A |
| A17 | First-open tour flag | `funlingo_popup_tour_seen` | — | Onboarding lane (Wave 18) | N/A |

## B. Popup — Activity tab (Viewed words + Saved words) and the `xo` saved-words store

| # | Feature | Extension behaviour | Storage key / default | Web app | Status |
|---|---|---|---|---|---|
| B1 | Viewed words chips | Words you hovered/looked up, newest first; hover shows translation + 2 synonyms (live from tab, cached fallback, "Translation unavailable") | `<platform>_viewedWords` | NO per-user lookup log exists (WordCardCache is global) | DEFERRED — needs a per-user lookup model written by `/watch` (Wave 16) |
| B2 | Viewed words "Manage words" delete mode | Trash FAB → multi-select, red "{count} words selected", second tap deletes, ✕ cancels | same | — | PORTED as bulk "Select" mode on saved words (`/words`) — same pattern, applied to the list we do have |
| B3 | Counts header | `{total} saved • {graduated} graduated` | derived | NO (only "N words") | PORTED → `/words` header "{total} saved · {known} known" |
| B4 | Filter All / Active / Graduated | segmented filter | in-memory, default `all` | PRESENT (superset) — state chips Saved / Learning / Known / Mastered, `WordsExplorer.tsx` | PRESENT |
| B5 | Card: meaning + up to 3 synonyms | `synonyms[0..2]` or `translation` | `funlingo_saved_words[pair][lemma]` | Gloss was always `null` (`app/words/page.tsx` set `gloss: null`) | PORTED — meaning from the cached word card (`WordCardCache.shortMeaning`, falls back to the encounter translation) + up to 3 extra senses as chips |
| B6 | Card: example sentence with the word highlighted | `exampleSentence` (the line it was saved from) | same | PRESENT — scene line with `<mark>` on expand (only stored for non-DRM sources, per LEGAL) | PRESENT |
| B7 | Card: status marker active / graduated | badge | `graduated`, `graduatedAt` | PRESENT — state badge | PRESENT |
| B8 | Card: "seen N times" | `totalEncounters` | same | NO | PORTED — encounter count on the row |
| B9 | Card: language badge when several pairs | multi-pair only | — | We are lang-scoped by design (one learning language at a time) | N/A |
| B10 | "I know this" / "Reactivate" | graduate → stops highlighting + practice; reactivate clears skips | `graduated`, `consecutiveSkips` | NO | PORTED — `POST /api/words/state` (idempotent, lang-scoped). Known words are dropped from the FSRS daily queue so the button means what it says |
| B11 | Remove saved word (×) | removes from store + legacy bookmark mirror | — | NO | PORTED — remove with an 8-second Undo toast; `POST /api/words/delete` (idempotent, lang-scoped, also clears the word's review state) |
| B12 | Sort order | last encounter, else `savedAt`, newest first | — | `createdAt` desc only | PORTED — default "Recent" uses last encounter → save date; plus A–Z and Most seen |
| B13 | Saved date / source | `savedAt`, `savedFrom.{platform,videoId,timestamp}` | — | Source title + platform PRESENT on expand | PORTED saved date ("Saved 3 Oct") next to source |
| B14 | Pronunciation (listen) | TTS on word | — | PRESENT `SlangAudioButton` on every row | PRESENT |
| B15 | Re-saving a graduated word reactivates it | in `saveWord` | — | `app/api/watch/saveWord` | DEFERRED — `/api/watch/*` is Wave 16's lane; one-line change noted in playbook |
| B16 | Auto-graduate after 3 consecutive skips in videos | `recordEncounter` | `consecutiveSkips >= 3` | Highlight-skip only exists in the extension overlay | N/A |
| B17 | Lookup nudge "You've looked this up N times · Save" | hover store | `funlingo_hovered_words` | Word popup on `/watch` | DEFERRED (Wave 16) |
| B18 | Anki "Send to Anki" + CSV for manual import | commented out in 1.3.2 (AnkiConnect add-on 2055492159) | — | CSV/JSON of the full account in Settings only | PORTED — `/words` Export: CSV for this language + Anki-ready `.txt` (tab-separated, `#separator:tab` header). User's OWN saved words only; DRM scene lines are never stored so never exported |

## C. Popup — Translate tab (`quick-translate.js`)

| # | Feature | Extension behaviour | Storage key / default | Web app | Status |
|---|---|---|---|---|---|
| C1 | Type-to-translate box | ≤2000 chars, counter, Enter translates (Shift+Enter newline) | — | NO | DEFERRED — a new surface outside the five assigned modules; needs its own AI cost cap entry |
| C2 | Auto-detect / swap / target picker | — | `targetLanguages`, `funlingo_native_language` | NO | DEFERRED (C1) |
| C3 | Listen + Copy ("Copied!") | — | — | NO | DEFERRED (C1) |
| C4 | Word analysis + examples (3) + difficulty badge | — | — | NO | DEFERRED (C1; generated examples also need the LEGAL "report" button pipeline) |
| C5 | Recent lookups (15, delete each) | — | `qt_recent_lookups` | NO | DEFERRED (C1) |

## D. `learn.js` — Saved ("Your Library") and Continue ("Word Replay") views

| # | Feature | Extension behaviour | Storage | Web app | Status |
|---|---|---|---|---|---|
| D1 | Search by word or meaning | live filter, "No matches" state | in-memory | PRESENT `WordsExplorer.tsx` search (meaning search now works because B5 fills the meaning) | PRESENT |
| D2 | Sort newest first | `timestamp` desc | — | see B12 | PORTED (B12) |
| D3 | Difficulty dot | word length ≤5 easy / ≤8 medium / else hard | — | NO | PORTED as the real CEFR level from the word card when we have it (honest, not a length guess) |
| D4 | Platform badge per word | `platform` | — | Only on expand | PORTED — platform badge on the row |
| D5 | Example sentence fetched on demand | `fetchSentence` (8s timeout, 4 parallel) | `exampleCache` | NO | DEFERRED — generated examples need a "report" control (LEGAL, content safety); no report pipeline exists yet. Saved scene line covers the stored case (B6) |
| D6 | Listen with voice preference, rate 0.92 | `voicePref` | `funLearningPrefs.voicePref` = `"auto"` | Listen PRESENT; voice choice NO | PORTED — see E1 |
| D7 | Platform dropdown "All platforms" + count | Continue view | `selectedPlatform` | Sentences has a source filter; Words did not | PORTED — platform chips on `/words` ("All platforms" + each) |
| D8 | Viewed + saved combined list, saved first, top 80 | Continue view | `*_viewedWords`, `*_bookmarkedWords` | — | DEFERRED (needs B1 data) |
| D9 | Progress chip "N words this week" / "N words in your library" | landing | derived | `/progress` shows total only | PORTED — "Words saved" stat hint shows this week's count |
| D10 | Empty states ("Nothing saved yet", "Save words while watching to unlock") | — | — | PRESENT `WordsExplorer.tsx` empty state | PRESENT |

## E. `learn.js` settings drawer (`funLearningPrefs`)

| # | Setting | Default | Web app | Status |
|---|---|---|---|---|
| E1 | Voice (Auto = best available, or a named voice) | `"auto"` | NO | PORTED — Settings › Voice, per learning language, saved to `Prefs.json.voicePrefs` and mirrored to `localStorage["fl_voice_prefs"]`; `SlangAudioButton` uses it when the voice exists in this browser, else scores voices as before |
| E2 | Sound effects | `true` | — | Wave 15 owns (not duplicated) |
| E3 | Haptics | `true` | — | Wave 15 owns (not duplicated) |
| E4 | Animations (motion) | `true` | PRESENT `SettingsForm.tsx` Motion toggle | PRESENT |
| E5 | RTL preview | `false` | NO | DEFERRED — page direction is driven by `src/lib/i18n/rtl.ts` + layout, which Wave 14 is rewriting; a second dir switch would fight it |
| E6 | Native / learning language pickers | from `targetLanguages`, override `funLearningLanguageChoice` | PRESENT `LangPills` + Settings Languages | PRESENT |

## F. Our own modules — regressions found while auditing

| # | Finding | Status |
|---|---|---|
| F1 | `/sentences` used `.toolbar`, `.iconBtn`, `.wrap`, `.rowThumb`, `.rowActions`, `.sourceLine`, `.card`, `.grid` from `Words.module.css`; the Wave 11 rewrite deleted all of them, so the page rendered unstyled | FIXED — own `Sentences.module.css` |
| F2 | `/sentences` "Practise dictation / speaking" play button did nothing (no handler) | FIXED — it's now a link to the daily review, labelled honestly, plus a listen button |
| F3 | `/words` meaning column always empty (`gloss: null`) | FIXED (B5) |
| F4 | Settings side nav floated over the form on narrow screens | FIXED — sticky only at ≥920px |

## Counts (56 popup / learn-page features, sections A–E)

| Status | Count |
|---|---|
| PRESENT before Wave 17 | 9 |
| PORTED in Wave 17 | 17 |
| NOT ALLOWED (LEGAL) | 1 (subtitle export) |
| N/A (extension-only: active tab, page overlay, per-site) | 10 |
| Owned by another lane (Wave 15: sound effects, haptics) | 2 |
| DEFERRED (reason in row) | 17 — caption styles ×6 (needs /watch, Wave 16), Quick Translate ×5 (new surface + cost cap), viewed words / Word Replay / lookup nudge / re-save reactivates ×4 (need per-user lookup data from /watch), on-demand AI examples ×1 (needs LEGAL report button), RTL preview ×1 (Wave 14 owns dir) |

Plus 4 regressions in our own modules fixed (section F, and F4: the
Settings side nav was `position: sticky` in the one-column layout and
floated over the form while scrolling).

## Seam for Wave 16 (caption styles, A5–A10)

When `/watch` is ready to honour subtitle styling, store under
`Prefs.json.captionStyle = { learningSize: 19, nativeSize: 17, learningColor,
nativeColor, opacity: 90, variant: "dark" }` (extension defaults; streaming
sizes 21/19 don't apply on the web) and add the controls to Settings with a
live preview. Keep the extension's bounds: size 8..50 step 1, opacity
0..100 step 5.
