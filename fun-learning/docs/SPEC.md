# Funlingo Fun Learning — Product Spec

Status: full scope, built end to end (no phases).
Owner: Funlingo. Last updated: 15 Oct 2026.
Companion files: `CLAUDE.md` (build rules), `docs/DESIGN.md` (visual language), `docs/LEGAL.md` (hard content rules), `docs/TRANCY-REFERENCE.md` (what we studied and why).

---

## 1. What we are building

Funlingo Fun Learning is the web home for everything a learner does around the shows and videos they watch. The Chrome extension is where learners pick up words while watching Netflix, YouTube, Prime Video, Hotstar, Crunchyroll and others. Fun Learning is where they come back to: study a video properly, review what they saved, read, talk with an AI partner, and see their progress.

It is built to match and beat Trancy's Learning Center (learn.trancy.org). See `docs/TRANCY-REFERENCE.md` for the teardown.

### Positioning, in one line each
- **Free.** Everything Trancy charges for, Funlingo gives for $0. Usage caps exist only to control AI cost and are generous.
- **Natural translations.** Every line is translated the way a person would say it, idioms included. Trancy's default Google translations get common phrases wrong ("Same old, same old" becomes nonsense, "I've been better" flips meaning). This is our most visible advantage.
- **Your shows, not just YouTube.** Words saved on any of the extension's platforms land in one deck, each with the scene it came from.
- **Culture, not just words.** Culture notes explain why a line is funny, rude, regional or a reference. This is the Cultural Context Engine.
- **Corrections that teach.** The AI partner points out mistakes kindly and recaps them. Trancy's does not correct at all.

### Who it is for
Learners who already watch content in a language they are learning. Beginners to upper-intermediate (CEFR A1–B2) are the core; C1+ is served by the same tools. Interface in 21 locales. Learning languages: start with English, Spanish, Japanese, Korean, French, German, Hindi; the system must not assume English is the target.

---

## 2. Navigation and information architecture

Desktop: a narrow left icon rail plus a content area and, on most pages, a right context panel. Mobile web (≥360px): bottom tab bar with Home, Library, Review, Talk, More.

| Rail item | Route | Contains |
|---|---|---|
| Home | `/` | Dashboard |
| Library | `/library` | Tabs: YouTube, Podcasts, Show Packs, Sentence Packs |
| Talk | `/talk` | AI conversation practice |
| Read | `/read` | Books: My shelf, Classics, Graded readers |
| Words | `/words` | Word bank and word lists |
| Sentences | `/sentences` | Saved sentences: Favourites, Dictation, Speaking |
| Review | `/review` | Daily review session (flashcards, game, dictation, shadowing) |
| Progress | `/progress` | Stats and history |
| Settings | `/settings` | Account, languages, translation, voices, shortcuts, extension |

Global, everywhere:
- **Search & discover** (`⌘K` / `Ctrl+K`): one modal for videos, channels, podcasts, shows, packs, books and your own words.
- **Paste a link**: a `+` button opens a field that accepts a YouTube URL or ID, a podcast RSS/Apple/Spotify-show link, or a supported streaming URL (which deep-links to the platform with the extension).
- **Quick lookup**: a dictionary field in the top bar ("type a word to look up").
- Extension status chip: "Extension on" / "Install the extension" with a one-tap path.

---

## 3. Onboarding

Goal: under 60 seconds to the first useful screen.

1. **Sign in**: Google, Apple, email magic link. If the extension is installed and signed in, offer "Continue as <name>".
2. **Languages**: "I speak" (native, pre-filled from browser locale) and "I'm learning".
3. **Level**: four plain choices (Just starting / I know basics / I can follow simple shows / I watch without subtitles sometimes) mapped to A1/A2/B1/B2. Optional 2-minute placement game (guess-the-meaning with 12 words across frequency bands) that sets the level more precisely.
4. **What you like watching**: chips (anime, K-drama, Bollywood, true crime, comedy, tech, cooking, sports, news, kids…). Seeds recommendations.
5. **Daily goal**: 5 / 10 / 20 minutes, or "words reviewed per day" 10 / 20 / 40.
6. **Extension**: detect it; if missing, show the install card (Chrome Web Store), skippable.

Acceptance:
- Every step skippable except languages.
- Choices editable later in Settings.
- Copy follows Funlingo voice: second person, informal, sentence case.

---

## 4. Home

Layout: main column (feed) + right column (today).

Right column, top to bottom:
1. **Today's goal ring**: minutes or reviews toward the daily goal, with a one-tap "Start review" (due count shown).
2. **Streak calendar**: last 7 days, current streak, freeze tokens (earn 1 per 7-day streak, max 2).
3. **Review card**: Due / Learning / New counts; buttons "Review" (due cards) and "Learn new" (new cards up to the daily new limit).
4. **Counters**: Words, Sentences, Books in progress, Talk minutes. Each links to its page.
5. **Activity heatmap**: last 5 months, minutes per day.

Main column:
1. **Continue**: the last 3 things in progress across all sources (video at timestamp, book at page, talk lesson, show pack), each one tap to resume.
2. **From your shows**: words and lines saved in the extension in the last 7 days, grouped by show/episode, with "Review these".
3. **Culture note of the day**: one short note tied to something the user watched or a show in their interests.
4. **Word of the day**: from the user's learning words, shown with the scene it came from.
5. **Followed channels**: newest videos from followed YouTube channels (thumbnail, duration, channel, age, level badge).
6. **Podcasts**: newest episodes from followed shows.
7. **Talk**: 6 suggested lessons matched to level and interests.
8. **Show Packs**: packs for shows in the user's interests.

Empty states (new user) show a designed card per section explaining how to fill it ("Follow a channel to see new videos here").

---

## 5. Library

### 5.1 YouTube
- Feed of videos from followed channels, newest first, infinite scroll.
- Right panel: Featured (editorial picks, editable by the user), Favourites, History, Followed channels (with Manage: reorder, unfollow).
- Filters: language (auto from learning language), level (A1–C1 estimated from transcript vocabulary), duration (<5, 5–20, >20 min), has captions in learning language (required to study).
- Channel page: banner, avatar, description, Follow, video grid with Newest/Popular, level badges.
- "Paste a YouTube link" accepts any public video with captions in the learning language.
- Recommended channels by category in Search & discover (Learning English, TED, news, kids, cooking, tech, comedy…) per learning language.

### 5.2 Podcasts
- Discover by category (Comedy, News, Society & Culture, TV & Film, Technology, Kids & Family, History, Business…) and by search (Podcast Index API).
- Show page: art, title, publisher, episode count, description, Follow, episodes grid/list with Newest/Oldest.
- Episode card: title, date, duration, Play, Save for later, Description / AI summary tabs.
- No "download episode" button (see LEGAL.md).

### 5.3 Show Packs (replaces Trancy's Movie shelf)
A Show Pack is Funlingo-written study material about a show, **never its script or subtitles**.
- Pack page: show title, platform badges (where to watch), level, genre, short blurb.
- Contents, all original writing: 20–60 key words and phrases the show uses (with our own example sentences), slang and idioms explained, 5–15 culture notes (references, humour, regional speech), "before you watch" primer, episode-by-episode vocab lists keyed to episode numbers (not timestamps of dialogue).
- "Watch with Funlingo" deep-links to the episode on the user's own streaming account; the extension handles live subtitles there.
- Words from the pack can be added to the deck in one tap.
- Filters: platform, genre, level, language.

### 5.4 Sentence Packs
Funlingo-authored sentence decks for shadowing and dictation.
- Categories: Daily, Travel, Work, Exam prep, Small talk, Feelings, Food, Slang, Idioms, Stories.
- Pack page: chapters with sentence counts and "Practise" per chapter; progress per chapter.
- Users can create their own pack from saved sentences ("New pack").
- All translations natural (reviewed), never raw machine output.

---

## 6. The study player (core screen)

Used for YouTube videos, podcast episodes, Sentence Packs and the user's saved sentences. Route: `/watch/:sourceType/:id`.

### 6.1 Layout
- **Default**: media left (YouTube official embed, or podcast art), dual subtitles under the media, control bar at the bottom; right side panel.
- **Focus**: subtitles become the main stage (large type, centred); the media shrinks into the top of the side panel. Great for listening and reading practice.
- **Cinema**: media large, subtitles in a band **below** the player (never drawn over the YouTube iframe).
- Keyboard 1/2/3 switches layouts. Side panel toggle `\`, width `[` `]`.

### 6.2 Subtitles
- Two lines: learning language (top, `fnl-player-sub` pink on dark) and native language (below, dimmer).
- **Karaoke highlight**: the current word highlights as audio plays (colour or underline, user choice).
- **Word highlighting**: saved words (green dot), learning words (pink dashed underline), and phrase/collocation spans (dashed underline) pre-marked.
- Each track can be set to Show / Blur / Hide independently (self-test). Blur reveals on hover.
- Segmentation modes (Shift+1/2/3): by original captions, by sentence, by short phrase.
- Font size `+` / `-`; fonts and translation colour in settings.
- Translation style: **Natural** (default, idiom-aware AI) or **Literal** (word-for-word, for analysis). Natural translation streams in progressively with a small "translating 140/559" indicator.

### 6.3 Word and phrase lookup
Tap/click any word or phrase:
1. **Inline card** over the media: the phrase (lemma-aware: "carried out" → "carry out"), part of speech tag (phrasal verb, collocation, idiom), CEFR level, short meaning in native language, the line it appeared in with its translation, component words, Save (heart), Play audio.
2. **Side drawer** ("More"): IPA with US/UK (or regional) audio, all senses with native-language gloss + learning-language definition + example with audio, culture note if any, and **"In this video ×N"**: every line containing the word, with timestamps that jump the player. Also "Seen in your shows ×N" across all sources.
3. Saving a word stores the lemma, the exact line, the source, timestamp and translation as the user's personal encounter.

### 6.4 Side panel tabs
1. **Transcript** (count): timed lines with both languages; current line highlighted and auto-scrolled; each line has Copy, Save sentence (heart), Play from here.
2. **Words**: Saved / Learning / All in this source, with counts; tap opens the word drawer.
3. **Sentences**: lines saved from this source.
4. **Culture**: Funlingo culture notes for this source (idioms, references, humour, register), each anchored to a timestamp. Generated on demand and cached per source.
5. **Summary**: short AI summary in the native language plus key points with timestamps.
6. **Notes**: the user's free-text notes with timestamps (private).

### 6.5 Controls and modes
Bottom bar: loop range, line counter (`01 / 209` with A-B), previous line, play/pause, next line, mode-specific action, speed, volume, subtitle visibility, AI analysis, mode switcher.

Modes (switcher menu, remembers last used):
- **Watch & listen**: normal playback; optional auto-pause after each line (`Q`).
- **Shadow**: one line at a time; record yourself (`Enter` start/stop, `↑` play your recording, `R` loop line); pronunciation score per word (0–100) with colour, overall score, and tips for the worst sounds; compare waveform with original; history of attempts per line.
- **Dictate**: line audio plays; one input slot per word; native translation shown as optional hint; submit (`Enter`) grades word by word (wrong = red, missing = red underline), cursor jumps to first error; hint button reveals a letter-level diff and ghost text for missing words; case and punctuation ignored; typing sounds optional; accuracy and streak shown.
- **Quiz** (new, Funlingo's game): after each N lines (default 5) or at the end, a guess-the-meaning round using words from those lines: 4 options, real audio, shake on wrong, pips for progress, score screen. Correct answers feed the review deck.

AI sentence analysis (sparkle button): natural translation, grammar explanation in the native language, word-type colouring toggle, idioms flagged with plain meaning, "say it another way" alternatives at the learner's level.

### 6.6 Keyboard shortcuts
| Action | Key |
|---|---|
| Play/pause | Space |
| Previous / next line | A or ← / D or → |
| Repeat line | S |
| Auto-pause | Q |
| Mute / volume | M / Shift+↑↓ |
| Speed toggle / slower / faster | J / Shift+, / Shift+. |
| Toggle subtitles | K |
| Enter/exit recording mode | P |
| Start/stop recording | Enter |
| Play my recording | ↑ |
| Loop | R |
| Layouts | 1 / 2 / 3 |
| Segmentation | Shift+1 / 2 / 3 |
| Fullscreen | F |
| Font size | + / - |
| Sidebar width / toggle | [ ] / \ |
| Copy line / save line | Cmd/Ctrl+C / Cmd/Ctrl+S |
| Shortcut list | / |

### 6.7 Where text comes from (see LEGAL.md for the rules)
- **YouTube**: captions fetched in the learner's own browser (by the extension when installed, otherwise through the official embed's caption track where the player exposes it). Never fetched, stored or cached on our servers. If captions are unavailable, show "This video has no captions in <language>" with similar videos that do.
- **Podcasts**: if the feed publishes a transcript (Podcasting 2.0 `podcast:transcript`), use it. Otherwise speech-to-text is **an open legal decision** (see §15); until decided, podcasts without a published transcript play as audio-only with "Transcript not available".
- **Sentence Packs, Show Packs, Talk, Books**: our own or openly licensed text, stored normally.

---

## 7. Talk (AI conversation)

### 7.1 Topic browser
- ~120 topics in categories: Daily life, Travel, Food, Shopping, Work, School & exams, Social, Health, Culture. Each topic has 2–11 lessons.
- Funlingo-specific scenes alongside the generic ones: ordering at a chai stall, a Mumbai local train, a family WhatsApp call, a K-drama fan meetup, an anime convention, a cricket match chat, a Diwali visit, a Tokyo konbini, a Seoul café, a Madrid tapas bar. Scenes adapt to the learning language's culture.
- "From your shows": lessons generated around words and situations from shows the user watched recently.
- Right panel: total minutes, sessions, sentences spoken, streak; History.

### 7.2 Lesson setup (modal)
Scene paragraph, two roles (swap button), AI difficulty (Beginner / Intermediate / Advanced), 3–5 optional tasks (checklist that ticks itself when the user does them), Shadowing warm-up (≈25 sentences from the lesson), Start.

### 7.3 Conversation screen
- AI messages: learning-language text, native translation (toggle), replay audio, hide text (listening mode), save.
- User input: hold-to-talk mic (speech recognition) or text; "Translate to <learning language>" if the user types in their native language.
- **Help ladder** instead of one "AI Assistant" button: (1) Nudge (a hint of what to say), (2) Starter (first few words), (3) Full suggestion. Each level used is logged.
- **Inline corrections**: after each user turn, a small card under the message: "Try: I'm enjoying the sun" with the changed words highlighted and a one-line why. Tone is friendly, never red-pen. Off/on per user.
- Pronunciation score per user voice turn (word-level colours) when speaking.
- Settings: AI voice, AI speed, auto-translate, auto-play, hide AI text, corrections on/off, highlight saved/learning words.

### 7.4 End-of-session report
Duration, turns, tasks completed, corrections list (original → better, grouped by type: grammar, word choice, naturalness), new words used, pronunciation summary, 3 phrases to practise (one tap adds them to Sentences), "Try this lesson again at Advanced".

---

## 8. Read

### 8.1 Shelves
- **My shelf**: books in progress and finished; "Upload book" (EPUB, TXT; PDF text extraction) stored privately for that user only.
- **Classics**: public-domain books (Standard Ebooks, Project Gutenberg, Aozora Bunko for Japanese, and equivalents per language), with CEFR level estimates, genre filters, cover art from the source edition.
- **Graded readers**: openly licensed picture books (StoryWeaver, African Storybook, Book Dash, Global Digital Library, Let's Read / The Asia Foundation), levels 1–5, filter by publisher and language. StoryWeaver gives Hindi, Marathi, Gujarati, Tamil, Bengali and many more.
- Daily reading goal (default 20 min) with a ring and a weekly bar chart.

### 8.2 Reader
- Two-page spread on desktop, single page on mobile; picture books show illustration + text side by side.
- Tap word/phrase: same inline card as the player (meaning, example, breakdown, tags, save).
- Phrase underlines for collocations and phrasal verbs; saved/learning highlights.
- Toolbar: bilingual mode (paragraph translations, natural style), translation engine, learning mode toggle (highlights on/off), typography (font, size, line height, theme), fullscreen, table of contents, bookmarks.
- **Read aloud**: TTS of the current page with sentence highlight; speed control.
- Side panel: Words (this page / all), Sentences, Stats (percent read, time left from reading speed, unique words split known/learning/new/untracked, total words, saved sentences, bookmarks).
- Licence & credits page at the start and end of every openly licensed book (author, illustrator, translator, publisher, licence, link), as the licence requires.

---

## 9. Words

- **Word bank**: all saved words. Columns: encounter count, word, audio, IPA, meanings by part of speech, state (New / Learning / Known / Mastered), source chips (Netflix, YouTube, Book, Talk…), actions (master, favourite, details).
- Filters: state, source/platform, show, date saved, level. Sort: date, frequency, alphabetical, due date. Eye toggle hides meanings for self-testing.
- **Word lists**: Funlingo-built lists per learning language from openly licensed frequency data (e.g. SUBTLEX-style subtitle frequencies where licence allows, Wiktionary frequency lists, CEFR-aligned lists we write ourselves). Exam-oriented lists (IELTS/TOEFL/JLPT/TOPIK/DELE themes) only where we can build them ourselves. "Study this list" adds words to the deck at the daily new-card rate. Free.
- **Word detail page**: everything from the drawer plus the user's own encounters ("You saved this from <show>, episode 3", with the line), review history graph, notes, related words, culture notes.
- Import/export the user's own words (CSV, Anki).

---

## 10. Sentences

- Tabs: **Favourites**, **Dictation**, **Speaking**. A saved sentence can be in any combination.
- Sort by time or source; eye toggle; shuffle; "Practise all" opens the study player in the matching mode.
- Each sentence keeps its source and timestamp ("Play in context" jumps back to the moment, where the source allows).
- No hard cap for free users (soft limit for abuse only).

---

## 11. Review (spaced repetition)

- Scheduler: **FSRS** (open source) per card; cards are words and saved sentences.
- Daily session mixes formats, chosen by card state:
  - Flashcard: front = word + audio (+ the scene line with the word blanked, optional); reveal (tap/Enter, optional auto-reveal after 3 s); back = meanings by part of speech, **the user's own scene line first**, then 1–2 examples; grades Again / Hard / Good / Easy (arrow keys).
  - Guess-the-meaning (Funlingo game): 4 options, audio, shake on wrong.
  - Type it: hear the word or see the meaning, type the word.
  - Dictation and shadowing for sentence cards.
- Settings: daily new cards, daily review cap, auto-reveal, auto-play audio, include sentences, formats on/off.
- Session end: cards done, accuracy, time, streak, "next due tomorrow: N".
- Examples must be culturally careful (no examples linking groups to crime/terrorism, no stereotypes). Generated examples pass a content filter.

---

## 12. Progress

- Today, this week, all time: minutes by activity (watch, read, talk, review), words learned, sentences practised, pronunciation trend, dictation accuracy trend.
- Breakdown by source/platform and by show.
- Streak history, heatmap, milestones.
- History lists: videos, podcasts, books, talk sessions (each with delete; "Clear history").

---

## 13. Settings

- Account: name, avatar, email, sign-in methods, delete account (removes all personal data within 7 days), export my data (JSON/CSV).
- Languages: native, learning (multiple learning languages, one active), interface language (21 locales).
- Translation: Natural / Literal default, show translation by default, translation colour.
- Voices: AI voice per language, speed, my voice (for TTS of my lines).
- Theme: dark (default) / light / system.
- Study: daily goal, review limits, corrections on/off in Talk, typing sounds.
- Shortcuts: viewable list, a few rebindable.
- Extension: status, version, sync status, "open extension settings".
- Notifications: daily reminder (email/push), weekly progress email.

---

## 14. AI services (server-side)

All prompts and models live behind one internal `ai` module with per-feature functions, model choice per function, and caching. Never call a model from the client.

| Function | Input | Output | Cache |
|---|---|---|---|
| `translateLines` | lines + language pair + style | natural translations, idioms flagged | Funlingo-owned text: shared cache. Third-party captions: never server-cached; client may cache locally. |
| `wordCard` | word/phrase + sentence + pair + level | lemma, POS, CEFR, short meaning, senses, examples | shared by (lemma, pair) without the sentence |
| `cultureNotes` | source metadata + lines (ephemeral) | notes with anchors | Funlingo-owned sources only; for YouTube, cache only our note text + timestamps, not caption text |
| `sentenceAnalysis` | sentence + pair + level | translation, grammar note, word types, alternatives | per user, short TTL |
| `talkTurn` | lesson, history, difficulty | AI reply in role | none |
| `correctTurn` | user utterance + context | corrected version, diffs, reason, category | none |
| `talkReport` | session | report | stored with session |
| `summarize` | lines (ephemeral) | summary + key points | per user |
| `scoreSpeech` | audio + reference text | word scores, phoneme issues | none (audio deleted after scoring) |
| `examples` | lemma + level | 2 safe examples | shared, passes content filter |

Quality bar for translation: a native speaker would say it. Keep a regression set of idioms per language pair (start with the ones Trancy got wrong) and test every prompt/model change against it.

Cost control: per-user daily soft limits on Talk minutes, analyses and summaries, set high enough that normal learners never hit them; friendly message if they do.

---

## 15. Open decisions (decide before building the affected part)
1. **Extension ↔ Hub data sync** (deferred by owner): shared account and backend vs extension writing directly. The data model below is designed so either works.
2. **Backend**: extend the `funlingo-v2/backend` (Express + Prisma + Postgres) to serve web and mobile, or use Next.js route handlers with the same Prisma schema. Recommendation: one shared Postgres + Prisma schema; Hub API in Next.js route handlers; mobile keeps its Express API until merged.
3. **Podcast speech-to-text** for feeds without transcripts: legal review needed.
4. **Free-tier soft limits** for AI cost.
5. **Product name** in UI: "Funlingo Fun Learning" vs "Funlingo Learn" vs just "Funlingo".

---

## 16. Data model (Prisma-style, abbreviated)

```
User(id, email, name, avatarUrl, nativeLang, uiLocale, activeLearningLang, level, dailyGoal{type,value}, createdAt, deletedAt?)
LearningLanguage(userId, lang, level, startedAt)                       // multiple per user
Settings(userId, json)                                                  // translation style, voices, theme, review prefs

Source(id, type[youtube_video|podcast_episode|show|book|sentence_pack|talk_lesson|upload], externalId, title, lang, level?, durationSec?, meta json)
  // YouTube: id + title + channel + thumbnail only. NO caption text.
Follow(userId, kind[youtube_channel|podcast_show|show], externalId, createdAt, order)
Progress(userId, sourceId, positionSec|page, percent, updatedAt, finishedAt?)
History(userId, sourceId, lastOpenedAt)                                 // deletable
Favorite(userId, sourceId)

Lexeme(id, lang, lemma, pos, cefr?, ipa json, audio json)               // shared dictionary cache
WordCard(lexemeId, nativeLang, senses json, examples json, updatedAt)   // shared
UserWord(id, userId, lexemeId, state[new|learning|known|mastered], favorite, note, fsrs json, createdAt)
Encounter(id, userWordId, sourceId, platform, timestampSec?, line text, translation text, savedAt)
  // the user's own saved line: personal note, private to the user

Sentence(id, userId, sourceId?, text, translation, timestampSec?, lists[favorite|dictation|speaking], fsrs json)
ReviewLog(id, userId, cardType[word|sentence], cardId, format, grade, elapsedMs, at)

Pack(id, kind[sentence|show], lang, title, level, category, meta)       // Funlingo-authored
PackItem(id, packId, chapter, order, text, translation, audioUrl?, kind[sentence|word|phrase|culture])
UserPackProgress(userId, packId, chapter, itemsDone)

TalkTopic(id, lang?, category, title, emoji?, order)
TalkLesson(id, topicId, title, scene, roles json, tasks json, shadowSentences json)
TalkSession(id, userId, lessonId, difficulty, startedAt, endedAt, report json)
TalkTurn(id, sessionId, role[ai|user], text, translation, audioUrl?, correction json?, speechScore json?, at)

Book(id, source[standard_ebooks|gutenberg|storyweaver|…|upload], ownerUserId?, title, author, illustrator?, lang, level, licence, credits json, contentRef)
ReadingProgress(userId, bookId, location, percent, secondsRead, updatedAt)
Bookmark(userId, bookId, location, note)

CultureNote(id, scope[source|lexeme|show], refId, lang, nativeLang, anchor json, text, kind[idiom|reference|humour|register|custom])
Note(id, userId, sourceId, timestampSec?, text)
Activity(userId, date, minutesWatch, minutesRead, minutesTalk, reviews, words)
Streak(userId, current, best, freezes, lastActiveDate)
```

---

## 17. Non-functional requirements
- **Performance**: first contentful paint < 1.5 s on mid-range laptop; player interaction (word tap → card) < 150 ms with cached card, < 1.5 s on cache miss (show skeleton).
- **Accessibility**: WCAG 2.2 AA; full keyboard use; focus rings; subtitle text at least 4.5:1 contrast; respects `prefers-reduced-motion`.
- **i18n**: 21 UI locales with English fallback baked in; RTL for Arabic; CJK spacing rules (see DESIGN.md).
- **Responsive**: 360px to 1920px; player and reader usable on phone; bottom tab bar on mobile.
- **Privacy**: voice recordings deleted after scoring unless the user saves them; uploads private; delete-my-data honoured within 7 days; no third-party caption text stored server-side.
- **Analytics** (privacy-friendly): onboarding completion, daily active learning minutes, review completion, words saved per source, Talk session length, translation "report a bad translation" taps.
- **Quality**: "Report translation" on every line and card; reports feed the idiom regression set.

---

## 18. Acceptance checklist (end to end)
- [ ] New user signs in, sets languages and level, reaches Home in < 60 s.
- [ ] Pasting a YouTube link with learning-language captions opens the study player with dual natural subtitles; no caption text reaches our database.
- [ ] Tapping a word shows the inline card < 1.5 s and "In this video ×N" lists every occurrence with working jump links.
- [ ] Dictation grades word by word with hint diff; Shadow records, scores and replays; Quiz appears every 5 lines and feeds the deck.
- [ ] Focus and Cinema layouts never draw over the YouTube iframe.
- [ ] Podcast with a published transcript plays with karaoke highlight; one without shows "Transcript not available".
- [ ] A Show Pack contains only Funlingo-written content and deep-links to the user's streaming platform.
- [ ] Talk corrects "I am enjoy the sun" with a friendly inline fix and lists it in the end report.
- [ ] Reader opens a Classic and a Graded reader with licence credits shown; tapping words works; stats update.
- [ ] Words list filters by source/platform; word detail shows the user's own scene line.
- [ ] Review session schedules with FSRS and shows the user's own scene line first on the back of the card.
- [ ] The idiom regression set passes for every supported language pair before release.
- [ ] Everything works at 360px wide and in light and dark themes.
- [ ] No download button for episodes, no subtitle export, no movie scripts anywhere.
