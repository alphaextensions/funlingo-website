# Wave 15 — Extension JS behaviour inventory (Fun Learning)

**Source read in full:** `dist/learn.js` from `extension/zips/Funlingo-1.3.2.zip`
(465 KB; 423 KB is the i18n dictionary on one line; the remaining ~1,250
lines of logic were de-minified with esbuild and read top to bottom),
plus `learn/slang-audio.js`, `learn/learn-pills.js`,
`learn/learn-bootstrap.js`, `learn/learn.html` (drawer markup) and
`learn/learn.css` (`data-motion` rules). `learn_analytics.js` was checked
too: it is analytics only (GA iframe + event counters), with nothing the
learner sees.

Status key: **PRESENT** = already in the web app before Wave 15 ·
**PORTED** = added in Wave 15 · **N/A** = not web-feasible or doesn't apply
(reason given).

## 1. Sounds (`$e` object, WebAudio, gated by `I.sound`)

| # | Event | Extension parameters | Web status |
|---|---|---|---|
| S1 | `tap` | sine, 700→1000 Hz exp ramp over 70 ms; gain 0→0.05 linear in 5 ms, exp→1e-4 at 70 ms; stop at +110 ms | PORTED `src/lib/feedback/sound.ts` `playTap` |
| S2 | `flip` | 45 ms white noise, envelope `exp(-i/(0.18·N))`, bandpass 2500 Hz Q 9, gain 0.06 | PORTED `playFlip` |
| S3 | `correct` | C5/E5/G5 (523.25/659.25/783.99) 35 ms apart; each = sine (peak 0.055, decay to 220 ms) + triangle ×2 (peak 0.012, decay to 154 ms), attack 6 ms, stop at +270 ms | PORTED `playCorrect` |
| S4 | `wrong` | sine 220→165 Hz (peak 0.05, attack 12 ms) + sine 110→82 Hz (peak 0.03, attack 15 ms) over 280 ms; decay to 1e-4 at 320 ms; stop at 360 ms | PORTED `playWrong` |
| S5 | AudioContext lifecycle | created lazily on first cue (`Xe()`), `webkitAudioContext` fallback, `resume()` if suspended, null when sound off | PORTED `getAudioContext()` |
| S6 | `complete` | **does not exist in the extension** | PORTED as web-only cue that reuses the `correct` chime as-is (no new tone made up) |

## 2. Haptics (`Je(pattern)`, gated by `I.haptics`)

| # | Event | Pattern | Web status |
|---|---|---|---|
| H1 | tap | `12` | PORTED `src/lib/feedback/haptics.ts` |
| H2 | flip | `10` | PORTED |
| H3 | correct | `[15,30,15,30,20]` | PORTED |
| H4 | wrong | `[40,50,40]` | PORTED |
| H5 | feature detection | `navigator.vibrate && …` in try/catch | PORTED `canVibrate()`; silent no-op on iOS and desktop |

## 3. Where cues fire (extension → web)

| # | Extension trigger | Cue | Web status (file) |
|---|---|---|---|
| W1 | Landing tile click / Enter / Space (`ee`) | tap + `scale(0.97)` for 110 ms | PORTED `app/learn/LearnLanding.tsx` (`data-fx="tap"` + `data-fx-press`, handled in `FeedbackBoot`) |
| W2 | Locked tile click | tap + toast "Save words while watching to unlock" | PORTED (`data-fx-toast`); before this the locked tile did nothing |
| W3 | Nav back / brand | tap | PORTED `TopNav.tsx` brand (`data-fx`); the web has no in-hub back button, and the tiny-lesson back link got `data-fx` |
| W4 | Native / learning language change | tap | PORTED `LangPills.tsx` |
| W5 | Gear opens the drawer | tap | PORTED `TopNav.tsx` gear link (the drawer is the Settings page on web) |
| W6 | Drawer close / scrim | tap | N/A: the web uses a full Settings page, so there's no drawer to close |
| W7 | Drawer toggles (`Me`) | tap after the change | PORTED `FeedbackSettings.tsx` |
| W8 | Voice select change | tap | PORTED `FeedbackSettings.tsx` |
| W9 | Situation tile click | tap | PORTED `app/learn/tiny-lessons/page.tsx` |
| W10 | Deck back link | tap | PORTED `[situation]/page.tsx` back link |
| W11 | Flashcard flip (click, Enter, Space) | flip | PORTED `FlashcardDeck.tsx` `toggleFlip` |
| W12 | Deck Prev / Next buttons | tap | PORTED `FlashcardDeck.tsx` |
| W13 | Deck ←/→ keys | none (navigation only) | PRESENT (keys); no cue, same as the extension |
| W14 | Deck swipe, \|dx\| > 60 px | none, navigation only | PORTED `FlashcardDeck.tsx` touch handlers; the click that follows a swipe is swallowed so the card doesn't also flip |
| W15 | Quiz answer | correct / wrong | PORTED `QuickQuizRunner.tsx` |
| W16 | Quiz Skip / Next | tap | PORTED |
| W17 | Word Replay platform dropdown | tap | Equivalent PORTED: `/words` state filter chips tap |
| W18 | Listen button | speech only, no cue | PRESENT (`SlangAudioButton`) |
| W19 | Web-only: Review grade buttons | tap | PORTED `GradeRow.tsx` |
| W20 | Web-only: Guess-the-meaning drill | correct / wrong | PORTED `GuessMeaning.tsx` |
| W21 | Web-only: Dictation check | correct / wrong | PORTED `Dictation.tsx` |
| W22 | Web-only: Review flashcard "Show answer" | flip | PORTED `drills/Flashcard.tsx` |
| W23 | Web-only: Review session summary | complete | PORTED `ReviewRunner.tsx` |
| W24 | Web-only: Quick Quiz summary | complete | PORTED |
| W25 | Web-only: reaching the last card of a deck | complete (once per deck) | PORTED `FlashcardDeck.tsx` |
| W26 | Web-only: `/words` row expand | tap | PORTED `WordsExplorer.tsx` |
| W27 | Web-only: Talk send | tap | PORTED `LessonChat.tsx` |

## 4. Settings drawer (`funLearningPrefs` in chrome.storage.local)

| # | Option | Key · default | Web status |
|---|---|---|---|
| P1 | Sound effects ("Taps, flips, quiz chimes") | `sound` · `true` | PORTED: Settings → Audio & feedback; Prefs.json + localStorage |
| P2 | Haptics ("Subtle vibration on supported devices") | `haptics` · `true` | PORTED; shows a note when the device can't vibrate |
| P3 | Voice ("For Listen buttons"): Auto + every voice, natural/neural first then A→Z, plus a disabled "No voices available for {lang}" row | `voicePref` · `"auto"` | PORTED. Deliberate change: the chosen voice is only used when its language matches the text (the extension would read Japanese in an English voice) |
| P4 | Animations ("Ambient glow, flips, transitions") | `motion` · `true` | PRESENT as the Motion toggle (stored but **never applied on page load**: `data-motion="on"` was hard-coded). PORTED: the layout now applies it on first paint, and it was moved into Motion & display |
| P5 | RTL preview ("Mirror layout for Arabic / Urdu") | `rtl` · `false` | PORTED: forces `<html dir="rtl">`; when off, the dir from the UI locale is restored |
| P6 | Drawer footnote ("These controls are new in this revamp…") | — | N/A: copy about the extension revamp; not true on the web |
| P7 | Pref keys removed (`nativeLocale`, `learningVariant`, `funLearningLanguageOverride`), from learn-bootstrap.js | — | N/A: chrome.storage migration shim; the web keeps languages on the User row |
| P8 | Sound off also mutes Listen buttons (`if (!I.sound) return`; slang-audio shows the loading state for 180 ms) | — | PORTED `SlangAudioButton.tsx` |

## 5. Motion (`body[data-motion]`, `prefers-reduced-motion`)

| # | Behaviour | Web status |
|---|---|---|
| M1 | `data-motion="off"` stops the ambient orbs | PRESENT `globals.css` |
| M2 | …stops the greeting / eyebrow pulse dots | PRESENT |
| M3 | …stops the flashcard flip transition (`.fc-inner{transition:none}`) | PORTED `FlashcardDeck.module.css` (also the progress fill) |
| M4 | …stops the shimmer, empty-state emoji and dropdown animations | N/A: the web has no shimmer or dropdown menu; the EmptyState emoji has no animation |
| M5 | `window.scrollTo({behavior: motion ? smooth : auto})` on view change | N/A: the web uses real route navigation (Next resets the scroll) |
| M6 | `prefers-reduced-motion` gates | PRESENT everywhere; the new toast and Skip button are gated too |
| M7 | Quiz correct pulse | PRESENT (reduced-motion gate); PORTED: the Animations toggle now stops it |
| M8 | Tile press `scale(0.97)` | PORTED; skipped when motion is off or reduced |

## 6. Keyboard

| # | Shortcut | Web status |
|---|---|---|
| K1 | Escape: closes the drawer, else back one level (lesson → situations → landing) | PORTED: decks (`escapeHref`), the tiny-lessons index (`EscapeTo`), Quick Quiz → `/learn`. Review already uses Esc for its quit prompt (PRESENT, kept) |
| K2 | Quiz 1–4 picks an option | PORTED (the web had only 1–2) |
| K3 | Deck ←/→ | PRESENT |
| K4 | Flashcard Enter/Space flips | PRESENT |
| K5 | Tile Enter/Space opens it | PRESENT (links); PORTED for locked tiles (they now toast) |
| K6 | Platform dropdown: Escape closes, outside click closes | N/A: no dropdown (`/words` uses chips) |
| K7 | Language-pill search: Escape closes | N/A: the web uses native `<select>` pills |

## 7. Quiz logic

| # | Behaviour | Web status |
|---|---|---|
| Q1 | 4 options (up to 3 distractors, no duplicate meanings) | PORTED (the web had 2) |
| Q2 | Skip button before answering; Next after | PORTED Skip (Next was PRESENT) |
| Q3 | Feedback "Correct!" / "Correct answer: {answer}" | PORTED (replaced the "nothing logged" lines; the summary still says nothing was logged) |
| Q4 | The correct option is highlighted even when you pick wrong | PRESENT |
| Q5 | Options locked after answering | PRESENT |
| Q6 | Fewer than 3 words → "Save some words…" empty state | PRESENT (the web's own empty state) |
| Q7 | Pool of 40, new shuffled set + toast "New set — keep practising", then "You've practised every saved word" | N/A: the web quiz is a fixed round with a summary (Wave 6 design) |
| Q8 | Script-based word filter by learning language | PRESENT in spirit: the web filters UserWords by `lang` |
| Q9 | Listen button on the quiz word | NO, deferred: small, but outside this wave's scope |

## 8. Other JS behaviour

| # | Behaviour | Web status |
|---|---|---|
| O1 | Toast (`xe`), 2600 ms, warning dot | PORTED `FeedbackBoot` + `src/lib/feedback/toast.ts` |
| O2 | First-run: `data-firstrun` when 0 saved and <3 words; locks tiles | PRESENT (welcome when `<5`, tiles locked when 0, test-pinned) |
| O3 | Progress chip ("N words this week") | N/A: hidden in the extension's own CSS (`.progress-chip{display:none}`) |
| O4 | Empty states per view (emoji + copy) | PRESENT (web EmptyState) |
| O5 | Word grid: example sentence fetched in the background (4 at a time, 8 s timeout, cached) | N/A: needs the extension's `fetchSentence` background service; the web shows the saved scene line |
| O6 | Translating back-of-card meanings into the native language (+ shimmer, error toast) | N/A for this wave: needs the translate pipeline; flagged |
| O7 | Transliteration via AWS when scripts differ (+ shimmer) | N/A: extension background service |
| O8 | TTS voice ranking (Google +25, Microsoft +18, neural +12…), rate 0.92 | PRESENT `SlangAudioButton` (slang-audio.js ranking) |
| O9 | Example-sentence audio prefers server MP3 (`generateTTS`), falls back to speech | N/A: needs the extension background TTS |
| O10 | Speech stops on pagehide / visibilitychange | PRESENT |
| O11 | Live `chrome.storage.onChanged` resync | N/A: no extension sync (SPEC §15 deferred) |
| O12 | Search in Your Library | PRESENT (`/words` search) |
| O13 | Swipe-to-navigate deck | PORTED (W14) |

## Counts

Counted from the tables above (83 rows):

- **PORTED (new in Wave 15):** 47
- **PRESENT and PORTED (partly there, finished this wave):** 5 (P4, M7, K1, K5, Q2)
- **PRESENT (already done):** 16
- **N/A (not web-feasible or doesn't apply):** 14
- **NO (deferred):** 1 (Q9, Listen button on the quiz word)
