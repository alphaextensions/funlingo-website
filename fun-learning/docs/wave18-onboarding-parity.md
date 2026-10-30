# Wave 18 — Onboarding parity (extension → web `/welcome`)

Ground truth: Funlingo extension **1.3.2** `dist/` —
`landing_onboarding.js` (the first-run modal), `firstTimeActivationInjector.js`
(the "You're all set!" card), `background.js` (install hook),
`src/styles/main.css` (`.onboarding-*`, `.prof-btn`, `.beginner-modal`,
`.learning-card` rules) and `i18n.js` (translations for 22 locales).

## 1. How the extension's first run actually flows

| # | Moment | Where | Trigger |
|---|---|---|---|
| 0 | Install | `background.js` `onInstalled` (`reason === "install"`) | Seeds `funlingo_native_language` from the browser UI language, `targetLanguages = [native, "en"]`, `funlingo_install_date`; opens a YouTube demo video tab (`MMmOLN5zBLY`). |
| 1 | Onboarding modal, step 1 — **Language Setup** | `landing_onboarding.js` → component `ja` with `showWelcomeHeader: true`, `showControlsStep: false` | Any supported platform page, if NOT `funlingo_onboarding_complete` AND NOT `hasConfiguredLanguages` AND NOT `funlingo_landing_onboarding_shown`. On a watch page it waits (≤5s) for the player button host to mount. |
| 2 | Onboarding modal, step 2 — **Learning Preferences** | same component | "Next Step" on step 1. |
| 2b | Mode picker (sub-modal of step 2) | component `oA` (`.beginner-modal`) | Opens when the learner picks **Beginner**; also via the sliders icon on the Beginner pill ("Change Mode"). |
| 3 | Step 3 — **Display Controls** | same component, only when `showControlsStep` is true | **Not shown in the first-run (landing) modal** — the landing renders with `showControlsStep: false`, so the first run is 2 steps ("Step 1 of 2", "Step 2 of 2") and step 2's button is **Save**. Step 3 only appears when the modal is reopened from the in-player settings. |
| 4 | **"You're all set!"** card | `firstTimeActivationInjector.js` | After `funlingo_onboarding_complete` is true and `funlingo_allset_popup_shown` is false, on a supported platform, if no video is already playing. One-shot. |

### Step 1 — Language Setup

- **Welcome header** (first run only): `logo/popup-logo.png` (56px tall, drop
  shadow) + subtext `onboarding.welcomeSubtext` — "Learn a language while
  watching the shows and movies you already love."
- Title `onboarding.languageSetup` — "Language Setup".
- **Native Language** (`onboarding.nativeLanguage`) — searchable dropdown
  (`.searchable-dropdown`): trigger shows the autonym; panel has a "Search
  language..." input (hard-coded English) and a list of ~120 languages,
  autonym labels via `Intl.DisplayNames`, matched on autonym / code / English
  name, sorted by autonym. Default: first `navigator.languages` entry that is a
  supported UI locale, else `en`.
- **Learning Language** (`onboarding.learningLanguage`) — same dropdown.
  Default `en`.
- Changing **native** immediately switches the extension UI locale to that
  language (unless "Show app in English" is on) — the modal re-renders in the
  new language live.
- Button `onboarding.nextStep` — "Next Step". Also triggers a translation
  prefetch for the chosen pair.

### Step 2 — Learning Preferences

- Title `onboarding.learningPreferences`; label `onboarding.proficiencyLevel`
  — "Proficiency Level".
- Three pill buttons: `proficiency.beginner` / `proficiency.intermediate`
  (with a small second line `onboarding.recommended` — "(Recommended)") /
  `proficiency.advanced`. Default **Intermediate**. Stored values are the
  literal strings `"Beginner" | "Intermediate" | "Advance"`.
- Picking **Beginner** pauses the video and opens the **mode picker**: three
  cards — 🧩 Standard Mode (default), A↔अ Active Mode (transliteration; hidden
  for unsupported pairs and ja/ko/zh natives), 📖 Casual Mode (full-sentence
  translation) — each with a live mini caption preview built from "All of
  them look like butterflies." / "look", and a "Continue" button. The
  Beginner pill then shows the chosen mode name + a sliders "Change Mode" icon.
- Button `onboarding.save` — "Save". Plays a 900 Hz sine beep (0.3 s).

### Step 3 — Display Controls (not part of first run)

Captions Enabled/Disabled segmented control for *this platform*, "Show Native
Language" switch, "Extension Overlay" switch. All per-platform player
settings; toggles play `funlingoPlayToggleSound`.

### Chrome around every step

- `Step {current} of {total}` top-right (12px uppercase).
- Back arrow button top-left from step 2 (`onboarding.goBack`).
- Progress bar (85% wide, 12px, gradient `#e05aec → #d63cc0`, animated
  `gradientFlow`, width = step/total).
- Modal: 360px wide, `linear-gradient(135deg, #0f0f14, #1a1a24)`, radius 18,
  border white/10%, scrim `rgba(0,0,0,.55)`. Steps slide in (`slideIn .3s`).
- Primary button: 50px tall pill-ish (radius 12), `--funlingo-gradient`
  (`#cf30da → #bc1d99`, 90deg), lift on hover.
- Selected proficiency pill: `#630c77` with purple glow.

### Skip behaviour

There is **no skip button**. Clicking the scrim closes the modal for that
page view only — nothing is stored, so it comes back on the next eligible
page load until the learner saves.

### What gets stored (`chrome.storage.local`) on Save

`funlingo_onboarding_complete: true`, `hasConfiguredLanguages: true`,
`targetLanguages: [native, learning]`, `funlingo_native_language`,
`funlingo_landing_onboarding_shown: true`, `funlingo_difficulty`
(`Beginner|Intermediate|Advance`), `funlingo_learning_mode`
(`Default|Active Learning|Casual Learning`).

### "You're all set!" card

Green check in a 56px circle (pop-in rotate animation), heading `fta.heading`
— "You're all set!", subtext `fta.subtext` — "Play any video and Funlingo will
add {learning} subtitles automatically.", a numbered 1-2-3 list
(`fta.pickVideo`, `fta.step2` "Subtitles appear in both {native} and
{learning}", `fta.hoverWord`), CTA `fta.startWatching` — "Start watching".
Sets `funlingo_allset_popup_shown`.

### Questions the extension does NOT ask

No daily goal, no interests / genres, no platforms, no sign-in, no "pin the
extension" step. (SPEC §3 lists sign-in, a 4-choice level, interests, daily
goal and an extension-detect card — see §3 below.)

## 2. Mapping to the web app

| Extension step / element | Web `/welcome` | Storage (signed-in → `/api/settings`) | Storage (signed-out → cookies) |
|---|---|---|---|
| Welcome header + subtext | **Ported** — `/brand/funlingo-lockup.png` + same translated subtext | — | — |
| Step 1 Native Language | **Ported** — searchable dropdown, same search rules, web language list (TopNav's native list) | `User.nativeLang` + `User.uiLocale` (same as the Native pill) | `fl_native` |
| Native change re-localises the modal live | **Ported** — modal strings follow the picked native language | — | — |
| Step 1 Learning Language | **Ported** — TopNav's learning list | `User.activeLearningLang` | `fl_learning` |
| Step 2 Proficiency (Beginner / Intermediate (Recommended) / Advanced, default Intermediate) | **Ported** | `User.level` — Beginner → `A1`, Intermediate → `B1`, Advanced → `B2` (SPEC §3 tops its scale at B2) | `fl_level` |
| Step 2 Beginner → mode picker (Standard / Active / Casual) | **Dropped** — these are caption-rendering modes for the extension's player overlay. The web `/watch` has no such modes, so offering the choice would store a setting nothing reads. Revisit if `/watch` gains annotation modes. | — | — |
| Step 3 Display Controls (captions per platform, show native, overlay) | **Dropped** — not in the extension's first run either, and every control is a per-streaming-platform overlay setting. | — | — |
| Step counter, back button, progress bar, slide-in, Save beep | **Ported** (`Step 1 of 2` / `Step 2 of 2`; beep left as `// feedback: onboarding-save` for the Wave 15 lane) | — | — |
| "Done" flags | **Ported** | `Prefs.json.onboarding = "done"` | `fl_welcome=done` |
| Scrim click closes (not stored) | **Changed** — web adds an explicit "Skip for now" button; scrim click and Esc do the same. Skip IS remembered (`skipped`) so `/` doesn't keep redirecting; reopen any time from Settings. | `Prefs.json.onboarding = "skipped"` | `fl_welcome=skipped` |
| "You're all set!" card | **Ported as the last screen** (check animation, heading, 1-2-3 list, CTA). Steps 1 and 3 + subtext + CTA are re-written for the web (pasting a YouTube link in Library, tapping words) because "play any video on this page" / "hover" are extension-only; step 2 reuses `fta.step2` verbatim. CTA lands on `/`. | — | — |
| Install hook opening a demo video | **Dropped** — extension-only. | — | — |
| Show-once gate (`onboarding_complete` / `hasConfiguredLanguages`) | **Ported** on `/` only: redirect to `/welcome` when no `fl_welcome` cookie, and (signed-out) no `fl_native`/`fl_learning` cookie yet, or (signed-in) no `Prefs.onboarding` and no `nativeLang` saved. Deep links are never hijacked. | | |

Reopen: Settings → Languages → "Welcome setup" (signed-in) and a secondary
"Run welcome setup" action on the signed-out Settings card. `/welcome`
itself always renders the flow, pre-filled with current choices.

## 3. Divergence from SPEC §3 (flagged, not built)

SPEC §3 describes a six-step onboarding (sign-in, languages, a 4-choice level
→ A1/A2/B1/B2, watch-interest chips, daily goal, extension detect). This wave
followed the owner's parity direction (same steps/order/look as the
extension), so sign-in, interests, daily goal and the extension card are NOT
in `/welcome`. Daily goal stays editable in Settings. Needs an owner call if
SPEC §3 should still win.

## 4. Strings

Translated strings come from the extension's own `dist/i18n.js` (22 locales,
extracted to `src/lib/onboarding/ext-strings.json` by
`scripts/extract-onboarding-strings.mjs`). Web-only strings (skip, search
placeholder, all-set lines rewritten for the web) are English-only in a
local const in `src/lib/onboarding/strings.ts` — listed in AGENT-PLAYBOOK
"Wave 18 onboarding" for the Wave 14 catalog lane.

## 5. Deliberate look deviations (found in QA)

- Modal is **380px** (extension 360px): at 360px "Intermediate" in Poppins
  14px truncated to "Intermed…". Long translations (de "Fortgeschritten")
  wrap with hyphenation instead of ellipsizing.
- Progress bar sits 52px from the top (extension 40px) so it clears the 46px
  back button.
- The overlay is portalled to `<body>`: AppShell's `.shell` is a `z-index:1`
  stacking context below the sticky TopNav/BottomTabs.
- Brand hexes map to tokens (see the header of `app/welcome/welcome.module.css`).
