/**
 * English — the source-of-truth UI-text catalog for Fun Learning web.
 *
 * See `../catalog.ts` for how `t()` resolves keys and the fallback chain.
 * Keys follow the Funlingo extension's `area.purpose` convention; those
 * marked `[ext]` are the same key/value pair the extension already ships
 * (see docs/design-reference/extension-fun-learning.html). New keys cover
 * surfaces the extension doesn't have (Talk lesson, Words, Read, etc.).
 *
 * Rules for every locale file:
 *   - 2nd person, informal, sentence case (CLAUDE.md §6).
 *   - Preserve `{param}` placeholders VERBATIM.
 *   - Preserve brand names "Funlingo" and "Fun Learning" in every locale.
 *   - Fallback to `en` when a key is missing, then to the raw key — never throw.
 */

export const en = {
  // -------- app shell --------
  "app.title": "Fun Learning — Funlingo",
  "app.description": "The web learning home for Funlingo.",

  // -------- nav / chrome --------
  "nav.railHome": "Home",
  "nav.railLearn": "Fun Learning",
  "nav.railLibrary": "Library",
  "nav.railTalk": "Talk",
  "nav.railRead": "Read",
  "nav.railWords": "Words",
  "nav.railSentences": "Sentences",
  "nav.railReview": "Review",
  "nav.railProgress": "Progress",
  "nav.tabMore": "More",
  "nav.settings": "Settings", // [ext] learn.settings
  "nav.ariaPrimary": "Primary",
  "nav.ariaPrimaryMobile": "Primary (mobile)",
  "nav.brandAriaHome": "Fun Learning home",
  "nav.skipToContent": "Skip to main content",
  "nav.langLabelNative": "Native", // [ext] learn.langNative
  "nav.langLabelLearning": "Learning", // [ext] learn.langLearning
  "nav.langAriaNative": "Native language",
  "nav.langAriaLearning": "Learning language",
  "nav.langAriaGroup": "Languages",
  "nav.langError": "Couldn't save. Try again.",

  // -------- learn landing (/ and /learn) --------
  "learn.greeting": "Welcome — what to learn today?", // [ext]
  "learn.heroTitleLine1": "Fun", // [ext] — brand, do not translate
  "learn.heroTitleLine2": "Learning", // [ext] — brand, do not translate
  "learn.heroSub":
    "Bite-sized experiments to grow your vocabulary — built from the words you meet while watching.", // [ext]
  "learn.welcomeTitle": "Welcome to Fun Learning", // [ext]
  // Feature names are interpolated from the already-translated tile-title
  // keys so no English product names are stranded inside a localized sentence
  // (Wave 19). The call site passes {replay}/{quiz}/{lessons}/{slang}.
  "learn.welcomeBody":
    "Two of these grow with you: as you bookmark words while watching, {replay} and {quiz} fill up with your own vocabulary. Until then, dive into {lessons} and {slang} — they're ready right now.",
  "learn.footer": "Funlingo — Learn while you watch", // [ext]
  // Tile titles
  "learn.replayTitle": "Word Replay", // [ext] learn.continueTitle
  "learn.quizTitle": "Quick Quiz", // [ext] learn.practiceTitle
  "learn.lessonsTitle": "Tiny Lessons", // [ext] learn.situationsTitle
  "learn.slangTitle": "Slang Hang", // [ext] learn.slangsTitle
  "learn.libraryTitle": "Your Library", // [ext] learn.savedTitle
  // Tile bodies
  "learn.replayBody":
    "Revisit words from your recent sessions across every platform you watch on.", // [ext] learn.continueDesc
  "learn.quizBody":
    "Calm meaning-recall practice. No score, no streak — just gentle reinforcement.", // [ext] learn.practiceDesc
  "learn.lessonsBody":
    "Phrase packs for real situations — restaurants, airports, dates, interviews.", // [ext] learn.situationsDesc
  "learn.slangBody":
    "How people actually talk — modern slang with the context it's used in.", // [ext] learn.slangsDesc
  "learn.libraryBody":
    "Every word you've saved, searchable in one calm place.", // [ext] learn.savedDesc
  // Tile CTAs
  "learn.ctaContinue": "Continue learning", // [ext]
  "learn.ctaPractice": "Practise", // [ext]
  "learn.ctaExplore": "Explore", // [ext]
  "learn.ctaDiscover": "Discover", // [ext]
  "learn.ctaBrowse": "Browse", // [ext]
  // Locked state
  "learn.saveToUnlock": "Save words while watching to unlock", // [ext]
  "learn.lockedAria": "{title} — locked. Save words while watching to unlock.",

  // -------- talk index --------
  "talk.metaTitle": "Talk — Fun Learning",
  "talk.metaDesc": "Practise real conversations in your learning language.",
  "talk.eyebrow": "Talk",
  "talk.title": "Say it out loud.",
  "talk.lede":
    "Pick a scene, choose a difficulty, and we'll role-play it with you. The AI corrects you kindly after each turn — no red-pen vibes.",
  "talk.taskCountSingular": "1 task",
  "talk.taskCountPlural": "{n} tasks",
  "talk.signedOutEyebrow": "Signed out",
  "talk.signedOutTitle": "Sign in to start a scene",
  "talk.signedOutBody":
    "Talk logs each turn to your session so the end-of-scene report can show what you got right. Sign in and your scenes stick around.",
  "talk.actionSignIn": "Sign in",
  "talk.actionBrowseLibrary": "Browse the library",
  "talk.seededEyebrow": "Fresh from Review",
  "talk.seededCopy":
    "Pick any scene below and try working these into the conversation — your AI partner will nudge if you forget.",
  "talk.seededAria": "Suggested words for this session",

  // -------- talk lesson --------
  "talkLesson.breadcrumbRoot": "Talk",
  "talkLesson.eyebrow": "Scene",
  "talkLesson.youPlay": "You play",
  "talkLesson.aiPlays": "AI plays",
  "talkLesson.tryTo": "Try to…",
  "talkLesson.signedOutEyebrow": "Signed out",
  "talkLesson.signedOutTitle": "Sign in to practice this scene",
  "talkLesson.signedOutBody":
    "Talk logs each turn so your end-of-scene report can show what you got right. Sign in and your scenes stick around.",
  "talkLesson.browseTopics": "Browse the topic list",
  "talkLesson.readyHead": "Ready?",
  "talkLesson.readyLede":
    "You'll do about {n} turns. After that, we'll show what you did well and what to work on.",
  "talkLesson.difficultyLegend": "Difficulty",
  "talkLesson.diffBeginner": "Beginner",
  "talkLesson.diffIntermediate": "Intermediate",
  "talkLesson.diffAdvanced": "Advanced",
  "talkLesson.shadowSummary": "Warm up with shadowing (optional)",
  "talkLesson.startBtn": "Start lesson",
  "talkLesson.endBtn": "End lesson",
  "talkLesson.turnChip": "Turn {current} of {total}",
  "talkLesson.replyPlaceholder": "Type your reply…",
  "talkLesson.replyAria": "Your reply",
  "talkLesson.sending": "Sending…",
  "talkLesson.send": "Send",
  "talkLesson.mic": "Mic",
  "talkLesson.stopMic": "Stop mic",
  "talkLesson.helpAria": "Help: {label}",
  "talkLesson.correctionTry": "Try:",
  "talkLesson.correctionSaved": "Saved —",
  "talkLesson.correctionSavedLink": "review it later ↗",
  "talkLesson.saveForDrill": "Save for drill",
  "talkLesson.saving": "Saving…",
  "talkLesson.saveAria": "Save \"{text}\" to your drill sentences",
  "talkLesson.turnPending": "Give the AI a moment to finish — then try again.",
  "talkLesson.turnNotSaved": "This turn isn't saved yet.",
  "talkLesson.signInToSave": "Sign in to save.",
  "talkLesson.couldntSave": "Couldn't save.",
  "talkLesson.retry": "Retry",
  "talkLesson.retrying": "Retrying…",
  "talkLesson.retryAria": "Retry saving this correction",
  "talkLesson.pronunciation": "Pronunciation: {score}/100",
  "talkLesson.reportHead": "Nice session",
  "talkLesson.reportLede": "{lesson} · {minutes} min · {turns} turns",
  "talkLesson.recap": "Recap",
  "talkLesson.toWorkOn": "What to work on",
  "talkLesson.perfectRun": "Perfect run",
  "talkLesson.perfectBody": "No corrections this session — nicely done.",
  "talkLesson.threeToPractise": "Three to practise",
  "talkLesson.errNoLang": "Pick a learning language in Settings first.",
  "talkLesson.errUnauth": "Sign in to start a Talk session.",
  "talkLesson.errRate":
    "You've hit today's AI limit — rest your voice and come back in a few hours.",
  "talkLesson.errSafety":
    "The AI couldn't produce a reply that passed the safety filter. Try again.",
  "talkLesson.errDefault": "Something went wrong ({code}). Try again in a moment.",
  "talkLesson.voiceUnsupported": "Voice input not supported in this browser.",

  // -------- flashcard deck (slang + tiny lessons) --------
  "deck.navPrev": "Prev",
  "deck.navNext": "Next",
  "deck.navPrevAria": "Previous card",
  "deck.navNextAria": "Next card",
  "deck.hintText": "Tap the card to flip · ← / → to navigate",
  "deck.counterIn": "{current} / {total} in {situation}",
  "deck.counter": "{current} / {total}",
  "deck.cardAria": "Card {current} of {total}",
  "deck.tapForMeaning": "Tap for meaning",
  "deck.tapToSeeMeaning": "Tap to see meaning",
  "deck.tapToFlipBack": "Tap to flip back",
  "deck.hearInContext": "Hear it in context",
  "deck.hearPhrase": "Hear the phrase",
  "deck.inContext": "In context",
  "deck.literally": "Literally: {text}",
  "deck.slangTitle": "Slang Hang", // [ext] learn.slangsTitle
  "deck.lessonsTitle": "Tiny Lessons", // [ext] learn.situationsTitle
  "deck.expressionsPlural": "{n} expressions",
  "deck.hearAria": "Hear \"{text}\"",
  "deck.hearAriaExample": "Hear this example",
  "deck.hearAriaSlang": "Hear this slang",
  "deck.phraseAriaFront": "Phrase: {phrase}. {meaning}. Press Space or Enter to flip.",
  "deck.slangAriaFront": "Slang: {phrase}. {meaning}. Press Space or Enter to flip.",

  // -------- tiny-lessons picker --------
  "tinyLessons.metaTitle": "Tiny Lessons — Fun Learning",
  "tinyLessons.eyebrow": "Situations", // [ext] learn.eyebrowSituations
  "tinyLessons.title": "Tiny Lessons", // [ext] learn.situationsTitle
  "tinyLessons.lede":
    "Pick a situation, learn the phrases. Tap a card to reveal its meaning.",
  "tinyLessons.ariaGrid": "Tiny Lesson situations",
  "tinyLessons.phrasesSingular": "1 phrase",
  "tinyLessons.phrasesPlural": "{n} phrases",
  "tinyLessons.everydayPhrases": "Everyday phrases",
  "tinyLessons.emptyEyebrow": "Coming soon",
  "tinyLessons.emptyTitle": "No Tiny Lessons for this language yet",
  "tinyLessons.emptyBody":
    "Switch your learning language from the top-nav pill or come back after the next content drop.",
  "tinyLessons.emptyBack": "Back to Fun Learning",

  // -------- tiny-lessons situation page --------
  "situation.back": "← Tiny Lessons",
  "situation.ledeDefault": "Tap any card to reveal the meaning. Hit 🔊 to hear the phrase.",
  "situation.heroMeta": "{n} phrases · no scoring, no streak impact.",

  // -------- slang page --------
  "slang.metaTitle": "Slang Hang — Fun Learning",
  "slang.eyebrow": "How people really talk", // [ext] learn.eyebrowSlang
  "slang.lede":
    "Modern expressions with the context they're used in. The example stays in the learning language on purpose.", // [ext] learn.slangsViewDesc
  "slang.ledeShort": "Modern expressions with the context they're used in.",
  "slang.emptyEyebrow": "Coming soon",
  "slang.emptyTitle": "Slang Hang isn't ready in {lang} yet",
  "slang.emptyBody": "Pick another learning language in Settings or browse the English pack.",
  "slang.emptyBack": "Back to Fun Learning",

  // -------- review quick quiz --------
  "quiz.eyebrow": "Quick Quiz", // [ext] learn.practiceTitle
  "quiz.prompt": "What does this mean?",
  "quiz.pickPrompt": "Pick the matching meaning. Press 1–{n}.",
  "quiz.correct": "Correct!", // [ext-dev] learn.correct
  "quiz.correctAnswer": "Correct answer: {answer}", // [ext-dev] learn.correctAnswer
  "quiz.skip": "Skip", // [ext-dev] learn.skip
  "quiz.next": "Next →",
  "quiz.finish": "Finish →",
  "quiz.doneHead": "Nice round",
  "quiz.doneBody":
    "{correct} of {total} right. Nothing was logged — this one's just for the vibes.",
  "quiz.backToLearn": "Back to Fun Learning →",
  "quiz.emptyHead": "No words to practise",
  "quiz.emptyBody":
    "Save a few words while watching, then come back for a round.",
  "quiz.pickAria": "Pick the matching meaning",

  // -------- words --------
  "words.metaTitle": "Words — Fun Learning",
  "words.eyebrow": "Words",
  "words.title": "Your word bank",
  "words.lede":
    "Every word you saved while watching, with its meaning, the scene it came from and how often you've met it.",
  "words.startReview": "Start review",
  "words.tabMy": "My words",
  "words.tabLists": "Lists",
  "words.ariaTabs": "Word sections",
  "words.filterLabel": "State",
  "words.filterSaved": "Saved",
  "words.filterLearning": "Learning",
  "words.filterKnown": "Known",
  "words.filterMastered": "Mastered",
  "words.searchPlaceholder": "Search words or meanings…", // Wave 17 ext-parity copy
  "words.searchAria": "Search words",
  "words.countSingular": "{n} word",
  "words.countPlural": "{n} words",
  "words.countFiltered": "{filtered} of {total} words",
  "words.emptyNothingSavedEyebrow": "Nothing saved yet",
  "words.emptyNoMatchesEyebrow": "No matches",
  "words.emptySavedTitle": "Save a word while you watch",
  "words.emptyNoMatchesTitle": "Nothing matches those filters",
  "words.emptySavedBody":
    "Install the Funlingo extension, press a word while you watch anything, and it'll land here with the exact scene and line it came from.",
  "words.emptyNoMatchesBody": "Try clearing a filter or widening the search.",
  "words.actionBrowseLibrary": "Browse the library",
  "words.actionGetExtension": "Get the extension",
  "words.actionClearFilters": "Clear filters",
  "words.rowFrom": "From",
  "words.rowNoScene":
    "No scene attached yet. Save a word while watching to pin the exact line.",
  "words.rowReviewLink": "Review this word →",
  "words.rowDetailsAria": "Details for {word}",
  "words.rowPosAria": "part of speech: {pos}",
  "words.hearAria": "Hear \"{text}\"",
  "words.signedOutEyebrow": "Signed out",
  "words.signedOutTitle": "Save a word while you watch",
  "words.signedOutBody":
    "Sign in and install the Funlingo extension. Every word you press lands here with the exact scene, the line and the show it came from.",
  "words.actionSignIn": "Sign in",

  // -------- read --------
  "read.metaTitle": "Read — Fun Learning",
  "read.metaDesc":
    "A reading library: your uploads, classics and graded readers.",
  "read.eyebrow": "Read",
  "read.title": "Books, your way.",
  "read.lede":
    "Classics, graded readers, and your own uploads — all tappable, all glossed inline. Nothing we ship stores a book's text in the cloud.",
  "read.uploadBtn": "Upload an EPUB",
  "read.tabMyShelf": "My shelf",
  "read.tabClassics": "Classics",
  "read.tabGraded": "Graded readers",
  "read.ariaShelves": "Reading shelves",
  "read.emptyUploads":
    "Your shelf is empty — upload an EPUB to get started.",
  "read.emptyBooks": "No books here yet.",
  "read.signInToSee": "Sign in to see your uploads.",
  "read.signedOutShelfEyebrow": "My shelf",
  "read.signedOutShelfTitle": "Sign in to see your uploads",
  "read.signedOutShelfBody":
    "Your uploaded EPUBs stay on your device. Sign in so Fun Learning can remember which page you were on.",
  "read.actionSignIn": "Sign in",
  "read.actionBrowseClassics": "Browse classics",
  "read.unknownAuthor": "Unknown",

  // ======================================================================
  // Wave 19 — content-surface bodies (watch player, settings, progress,
  // sentences, library, onboarding web-only, feedback, words).
  // ======================================================================

  // -------- watch player chrome (Wave 16 W16 + inline strings) --------
  "watch.listen": "Hear it again",
  "watch.cardSettings": "Card settings",
  "watch.translations": "Meanings shown",
  "watch.cardSize": "Card size",
  "watch.pronounce": "Say the word when the card opens",
  "watch.on": "On",
  "watch.off": "Off",
  "watch.phrase": "Phrase",
  "watch.rootWord": "Root word",
  "watch.tapToReveal": "Tap to reveal — do you remember it?",
  "watch.iKnowThis": "I know this",
  "watch.markedKnown": "Marked as known — nice",
  "watch.removeSaved": "Remove from saved",
  "watch.removed": "Removed “{w}” from your words",
  "watch.example": "Example",
  "watch.definition": "In the language you're learning",
  "watch.subtitleSettings": "Subtitle settings",
  "watch.learningLine": "Learning line",
  "watch.nativeLine": "Translation line",
  "watch.size": "Size",
  "watch.color": "Color",
  "watch.show": "Show",
  "watch.blur": "Blur",
  "watch.hide": "Hide",
  "watch.blurHint": "Blurred lines reveal when you hover or focus them.",
  "watch.textSection": "Text",
  "watch.weight": "Weight",
  "watch.weightAuto": "Auto",
  "watch.weightRegular": "Regular",
  "watch.weightSemi": "Semi",
  "watch.weightBold": "Bold",
  "watch.lineSpacing": "Line spacing",
  "watch.removeBrackets": "Hide bracket cues",
  "watch.removeBracketsHint": "Hides [music], (laughs) and other cues in brackets.",
  "watch.others": "Playback",
  "watch.pauseAfterReplay": "Pause after replaying a line",
  "watch.hoverPause": "Pause while you hover the current line",
  "watch.voice": "Voice",
  "watch.voiceAuto": "Auto (best available)",
  "watch.voiceEmpty": "No voices for this language on your device",
  "watch.voicePreview": "Preview voice",
  "watch.close": "Close",
  "watch.colorDefault": "White",
  "watch.colorAccent": "Pink",
  "watch.colorWarning": "Amber",
  "watch.colorSuccess": "Green",
  "watch.colorMuted": "Soft",
  "watch.speed": "Playback speed",
  "watch.slower": "Slower",
  "watch.faster": "Faster",
  "watch.resetSpeed": "Reset to 1×",
  "watch.back10": "Back 10 seconds (Shift+←)",
  "watch.fwd10": "Forward 10 seconds (Shift+→)",
  "watch.replayLine": "Replay this line",
  "watch.saveLine": "Save this line",
  "watch.lineSaved": "Line saved",
  "watch.lineSavedToast": "Saved this line to your sentences",
  "watch.momentSavedToast": "Saved this moment — the heart stays on this line next time",
  "watch.couldNotSaveLine": "Couldn’t save that line",
  "watch.signInToSaveLine": "Sign in to save lines",
  "watch.hoverPauseTitle": "Paused while you hover the line",
  "watch.hoverPauseBody": "Move away from the line to keep watching.",
  "watch.neverShow": "Don’t show again",
  "watch.savedTooltip": "Words you save get highlighted in every video you watch",
  "watch.dismiss": "Dismiss",
  "watch.glowHint": "Tap any word to see what it means",
  // watch — inline WatchClient toasts / controls
  "watch.speedToast": "Speed {rate}×",
  "watch.autoPauseOn": "Auto-pause on",
  "watch.autoPauseOff": "Auto-pause off",
  "watch.loopOn": "Loop on",
  "watch.loopOff": "Loop off",
  "watch.sidebarWiderToast": "Sidebar wider (Content lane will persist)",
  "watch.sidebarNarrowerToast": "Sidebar narrower",
  "watch.lineCopied": "Line copied",
  "watch.couldNotSaveWord": "Could not save word",
  "watch.couldNotSaveWordOffline": "Could not save word (offline)",
  "watch.couldNotUpdateWord": "Couldn’t update that word — try again",
  "watch.signInToSaveWord": "Sign in to save “{lemma}”",
  "watch.signInArrow": "sign in →",
  "watch.addedToReview": "Added “{lemma}” to Review",
  "watch.seeAll": "see all →",
  "watch.ctrlAutoPause": "Auto-pause",
  "watch.ctrlLoop": "Loop",
  "watch.ctrlTranslation": "Translation",
  "watch.hideText": "Hide text",
  "watch.showText": "Show text",
  "watch.ariaPrevLine": "Previous line (A / ←)",
  "watch.ariaNextLine": "Next line (D / →)",
  "watch.ariaPause": "Pause (Space)",
  "watch.ariaPlay": "Play (Space)",
  "watch.ariaAutoPause": "Auto-pause after each line (Q)",
  "watch.ariaLoop": "Loop current line (R)",
  "watch.ariaToggleTranslation": "Toggle translation (K)",
  "watch.ariaToggleNative": "Toggle native caption",
  "watch.ariaShortcuts": "Keyboard shortcuts (press /)",
  "watch.ariaVideoPlayer": "Video player",
  "watch.ariaPlaybackControls": "Playback controls",
  "watch.ariaSubtitlesSection": "Subtitles",
  "watch.ariaCultureContext": "Culture context",
  // watch — demo banner / stage
  "watch.demoNoteAria": "Demo-clip note",
  "watch.demoSignedInBanner": "This demo clip is in English. Save any word and it lands in your {lang} deck — your home tiles unlock from there.",
  "watch.demoTryTitle": "Try the demo:",
  "watch.demoTryBody": "tap any word for a card, or play through — translations are bundled, nothing is logged.",
  "watch.demoSignIn": "Sign in to save →",
  "watch.demoSceneAria": "Fun Learning demo scene",
  "watch.demoTitle": "Try it — a 30-second demo",
  "watch.demoLabel": "Demo",
  "watch.demoPressPlay": "Press play to try tapping any word.",
  "watch.demoPause": "Pause demo",
  "watch.demoPlay": "Play demo",
  "watch.noYtTitle": "No YouTube video attached to this source.",
  "watch.noYtSub": "Watch surface still mounts dual subtitles + culture panel.",
  "watch.translatingCount": "translating {done}/{total}",
  // watch — end-of-video card
  "watch.endEyebrow": "Nice run",
  "watch.endSavedSingular": "You saved {n} word — review them now?",
  "watch.endSavedPlural": "You saved {n} words — review them now?",
  "watch.endOpenReview": "Open review →",
  "watch.endNotNow": "Not now",
  "watch.endDismissAria": "Dismiss end-of-video card",
  // watch — mode switcher
  "watch.modeDefault": "Default",
  "watch.modeFocus": "Focus",
  "watch.modeCinema": "Cinema",
  "watch.modeAria": "{label} layout (press {key})",
  "watch.modeGroupAria": "Layout mode",
  // watch — subtitle pane
  "watch.noCaptions": "No captions in your learning language.",
  "watch.noCaptionsBody":
    "Try a different video, or install the Funlingo Chrome extension to fetch captions when the player doesn’t expose them.",
  "watch.ariaSubtitles": "Subtitles",
  "watch.ariaDualSubtitles": "Dual subtitles",
  "watch.jumpToTs": "Jump to {ts}",
  "watch.learningLineHidden": "Learning line hidden",
  "watch.translatingEllipsis": "Translating…",
  "watch.translationRetry": "Translation unavailable — tap to retry",
  // watch — word card popup
  "watch.wordCardAria": "Word card for {word}",
  "watch.closeWordCardAria": "Close word card (Esc)",
  "watch.addWordBefore": "Add the word before",
  "watch.backToSingleWord": "Back to the single word",
  "watch.addWordAfter": "Add the word after",
  "watch.fewer": "{label} — fewer",
  "watch.more": "{label} — more",
  "watch.smaller": "{label} — smaller",
  "watch.bigger": "{label} — bigger",
  "watch.lookingUp": "Looking up this word…",
  "watch.inThisLine": "In this line",
  "watch.inThisVideo": "In this video ×{n}",
  "watch.couldNotLoadWord": "Could not load this word.",
  "watch.saved": "Saved",
  "watch.saveWordKey": "Save word (S)",
  "watch.signInToSaveArrow": "Sign in to save →",
  // watch — culture panel
  "watch.cultureAria": "Culture notes",
  "watch.cultureTitle": "Culture",
  "watch.explainAria": "Explain this line",
  "watch.thinking": "Thinking…",
  "watch.explainThis": "Explain this",
  "watch.cultureLoadError": "Could not load culture notes.",
  "watch.cultureEmptyDemo": "Culture notes come from the live AI — sign in to see them for this clip.",
  "watch.cultureEmpty":
    "Pause the video — we’ll pull up notes on idioms, references and regional speech for the line you’re on.",
  "watch.jumpToLine": "Jump to line {n}",
  "watch.jump": "Jump",
  "watch.kindIdiom": "Idiom",
  "watch.kindReference": "Reference",
  "watch.kindHumour": "Humour",
  "watch.kindRegister": "Register",
  "watch.kindNote": "Note",
  // watch — shortcut help
  "watch.shortcutsTitle": "Keyboard shortcuts",
  "watch.shortcutsCloseAria": "Close shortcuts (Esc)",
  "watch.scPlayPause": "Play / pause",
  "watch.scPrevNext": "Previous / next line",
  "watch.scBackFwd": "Back / forward 10 seconds",
  "watch.scReplay": "Replay line (save word inside a word card)",
  "watch.scSaveLine": "Save line",
  "watch.scAutoPause": "Auto-pause toggle",
  "watch.scMuteVol": "Mute / volume",
  "watch.scSpeed": "Speed toggle",
  "watch.scSlowerFaster": "Slower / faster",
  "watch.scToggleTranslation": "Toggle translation",
  "watch.scRecord": "Enter record mode / start-stop",
  "watch.scPlayRec": "Play my recording",
  "watch.scLoop": "Loop",
  "watch.scModes": "Default / Focus / Cinema",
  "watch.scSegmentation": "Segmentation mode",
  "watch.scFullscreen": "Fullscreen",
  "watch.scFontSize": "Font size",
  "watch.scSidebar": "Sidebar width / toggle",
  "watch.scCopyLine": "Copy line",
  "watch.scCloseCard": "Close inline card",
  "watch.scShortcutList": "Shortcut list",

  // -------- onboarding (web-only strings; Wave 18 WEB_EN) --------
  "onboarding.dialogLabel": "Welcome to Funlingo",
  "onboarding.skipForNow": "Skip for now",
  "onboarding.searchLanguage": "Search language…",
  "onboarding.noMatch": "No languages match",
  "onboarding.saveError": "Couldn't save. Try again.",
  "onboarding.saving": "Saving…",
  "onboarding.allSetSub": "Fun Learning is ready for your {learning}. Here's where to start:",
  "onboarding.allSetStep1": "Paste a YouTube link in Library to study it line by line",
  "onboarding.allSetStep3": "Tap any word to see what it means and save it",
  "onboarding.allSetCta": "Start learning",

  // -------- feedback / audio & motion settings (Wave 15) --------
  "feedback.audioFeedback": "Audio & feedback",
  "feedback.motionDisplay": "Motion & display",
  "feedback.soundEffects": "Sound effects",
  "feedback.soundEffectsDesc": "Taps, flips, quiz chimes",
  "feedback.haptics": "Haptics",
  "feedback.hapticsDesc": "Subtle vibration on supported devices",
  "feedback.hapticsUnsupported": "Your device doesn't support vibration, so this does nothing here.",
  "feedback.voice": "Voice",
  "feedback.voiceDesc": "For Listen buttons",
  "feedback.voiceAuto": "Auto (best available)",
  "feedback.voiceEmpty": "No voices available for {lang}",
  "feedback.animations": "Animations",
  "feedback.animationsDesc": "Ambient glow, flips, transitions",
  "feedback.rtlPreview": "RTL preview",
  "feedback.rtlPreviewDesc": "Mirror layout for Arabic / Urdu",
  "feedback.savedOnDevice": "Saved on this device. Sign in to keep them everywhere.",
  "feedback.statusSaved": "Saved",
  "feedback.statusSaveFailed": "Save failed",

  // -------- words explorer (Wave 17 WORDS_STR) --------
  "words.countsHeader": "{total} saved · {known} known",
  "words.allPlatforms": "All platforms",
  "words.platformLabel": "Platform",
  "words.sortLabel": "Sort",
  "words.sortRecent": "Recent",
  "words.sortAlpha": "A–Z",
  "words.sortSeen": "Most seen",
  "words.seenOnce": "seen once",
  "words.seenTimes": "seen {n} times",
  "words.savedOn": "Saved {d}",
  "words.actionIKnowThis": "I know this",
  "words.actionReactivate": "Reactivate",
  "words.actionRemove": "Remove",
  "words.removedOne": "Removed “{w}”",
  "words.removedMany": "Removed {n} words",
  "words.actionUndo": "Undo",
  "words.actionSelect": "Select",
  "words.actionCancel": "Cancel",
  "words.deleteSelectedZero": "Remove",
  "words.deleteSelectedOne": "Remove 1 word",
  "words.deleteSelectedMany": "Remove {n} words",
  "words.selectHint": "Tap words to select them",
  "words.selectedCount": "{n} selected",
  "words.selectAria": "Select {word}",
  "words.selectedBarAria": "Selected words",
  "words.exportCsv": "Export CSV",
  "words.exportAnki": "Export for Anki",
  "words.alsoMeans": "Also",
  "words.knownHint": "Known words leave your daily review. Reactivate to bring one back.",
  "words.actionFailed": "That didn't save. Check your connection and try again.",

  // -------- settings page + form --------
  "settings.eyebrow": "Settings",
  "settings.title": "Settings",
  "settings.lede": "Account, languages, appearance, shortcuts. Changes save as you go.",
  "settings.signedOutEyebrow": "Signed out",
  "settings.signedOutTitle": "Sign in to change your settings",
  "settings.signedOutBody": "Your language, your goal, your extension status — all here once you sign in.",
  "settings.signIn": "Sign in",
  "settings.runWelcome": "Run welcome setup",
  "settings.sectionsAria": "Settings sections",
  "settings.navAccount": "Account",
  "settings.navLanguages": "Languages",
  "settings.navGoal": "Daily goal",
  "settings.navAppearance": "Appearance",
  "settings.navFeedback": "Sound & motion",
  "settings.navVoice": "Listen voice",
  "settings.navExperimental": "Experimental",
  "settings.navShortcuts": "Shortcuts",
  "settings.navData": "My data",
  "settings.appearance": "Appearance",
  "settings.appearanceLede": "Dark is the default. Choose Light or Dark to pin it, or System to follow your device.",
  "settings.theme": "Theme",
  "settings.themeHint": "Applies instantly and is remembered on this device.",
  "settings.themeSystem": "System",
  "settings.themeLight": "Light",
  "settings.themeDark": "Dark",
  "settings.themeAria": "Theme",
  "settings.accountTitle": "Account",
  "settings.accountLede": "Who you are inside Fun Learning.",
  "settings.name": "Name",
  "settings.email": "Email",
  "settings.emailHint": "Change your sign-in email from your provider.",
  "settings.languagesTitle": "Languages",
  "settings.languagesLede": "Your native, your learning, and your interface language.",
  "settings.nativeLanguage": "Native language",
  "settings.learningLanguage": "Learning language",
  "settings.learningHint": "Review returns only cards in this language. Switch anytime.",
  "settings.interface": "Interface",
  "settings.welcomeSetup": "Welcome setup",
  "settings.welcomeSetupHint": "Walk through your languages and level again.",
  "settings.goalTitle": "Daily goal",
  "settings.goalLede": "Set a target, see it on Home. Change it any time.",
  "settings.goalType": "Goal type",
  "settings.goalReviews": "Reviews per day",
  "settings.goalMinutes": "Minutes per day",
  "settings.goalTarget": "Daily target",
  "settings.voiceTitle": "Listen voice",
  "settings.voiceLede": "Pick the voice the Listen buttons use for your learning language.",
  "settings.experimentalTitle": "Experimental",
  "settings.experimentalLede":
    "Features we’re testing. Honest pronunciation feedback runs entirely in your browser.",
  "settings.onDevice": "On-device pronunciation",
  "settings.onDeviceAria": "Use on-device pronunciation (beta)",
  "settings.onDeviceUnsupported": "Your browser doesn’t support on-device inference yet.",
  "settings.onDeviceHint":
    "Use on-device pronunciation (beta). Replaces the AI “score” with a word-match: what you said vs. what was written, no fake per-sound tips. First time loads a ~40 MB Whisper model into your browser from Hugging Face and caches it on your device — audio never leaves your machine after that. Accuracy is strong on English, Spanish, French, German, Japanese and Chinese; weaker on Hindi, Turkish and Arabic (that’s a Whisper-tiny limit, not ours).",
  "settings.shortcutsTitle": "Keyboard shortcuts",
  "settings.shortcutsLedePre": "Hit",
  "settings.shortcutsLedePost": "then any letter below to jump.",
  "settings.dataTitle": "My data",
  "settings.dataLede": "Download your deck or erase everything. Deletion runs within 7 days.",
  "settings.exportCsv": "Export CSV",
  "settings.exportJson": "Export JSON",
  "settings.deleteData": "Delete my data",
  "settings.deleteConfirm": "Delete your account and all data? This cannot be undone.",
  "settings.statusSaving": "Saving…",
  "settings.statusSaved": "Saved",
  "settings.statusSaveFailed": "Save failed",

  // -------- progress --------
  "progress.eyebrow": "Progress",
  "progress.title": "Your progress",
  "progress.signedOutEyebrow": "Signed out",
  "progress.signedOutTitle": "Sign in to see your streak and stats",
  "progress.signedOutBody":
    "Everything you watch, read and review feeds Progress — a 5-month heatmap, per-language breakdowns, and streak freezes.",
  "progress.signIn": "Sign in",
  "progress.lede":
    "Everything you watch, read and review in one view. Five months of history, per-language breakdown, streak freezes.",
  "progress.emptyEyebrow": "No activity yet",
  "progress.emptyTitle": "Review one card to light this up",
  "progress.emptyBody":
    "Progress fills in after your first review session. Start with a word or sentence you already saved.",
  "progress.startReview": "Start review",
  "progress.browseWords": "Browse my words",
  "progress.headlineAria": "Headline stats",
  "progress.currentStreak": "Current streak",
  "progress.streakValue": "{n}d",
  "progress.streakHintOne": "Best: {best}d · {freezes} freeze",
  "progress.streakHintMany": "Best: {best}d · {freezes} freezes",
  "progress.minutesWeek": "Minutes this week",
  "progress.minutesHint": "{n} all-time",
  "progress.reviews7d": "Reviews, 7d",
  "progress.reviews30Hint": "{n} in last 30 days",
  "progress.wordsSaved": "Words saved",
  "progress.wordsHintWeekOne": "1 word this week · {sentences} sentences too",
  "progress.wordsHintWeekMany": "{n} words this week · {sentences} sentences too",
  "progress.wordsHintNoWeek": "{sentences} sentences too",
  "progress.activityIn": "Activity in {lang}",
  "progress.freezeChipOne": "You have {n} freeze token ready for the next day you miss.",
  "progress.freezeChipMany": "You have {n} freeze tokens ready for the next day you miss.",
  "progress.byLanguage": "By learning language",
  "progress.perLangAria": "Per-language stats",
  "progress.saveWordForStats": "Save a word to see per-language stats.",
  "progress.langWords": "{n} words",

  // -------- sentences --------
  "sentences.eyebrow": "Sentences",
  "sentences.title": "Saved sentences",
  "sentences.signedOutEyebrow": "Signed out",
  "sentences.signedOutTitle": "Save a line while you watch",
  "sentences.signedOutBody":
    "Sign in and hit the heart on any line in the study player. It lands here with the scene it came from.",
  "sentences.signIn": "Sign in",
  "sentences.browseLibrary": "Browse the library",
  "sentences.lede":
    "Favourite, dictation and speaking lists in one place. Each sentence keeps the scene and show it came from.",
  "sentences.tabFavorite": "Favourites",
  "sentences.tabDictation": "Dictation",
  "sentences.tabSpeaking": "Speaking",
  "sentences.tabsAria": "Sentence lists",
  "sentences.itemsAria": "{n} items",
  "sentences.fromTalk": "From Talk",
  "sentences.fromTalkAria": "Saved from a Talk correction",
  "sentences.practiceLabel": "Practise in today's review",
  "sentences.searchPlaceholder": "Search your sentences or translations…",
  "sentences.searchAria": "Search sentences",
  "sentences.viewAria": "View",
  "sentences.viewList": "List",
  "sentences.viewListAria": "List view",
  "sentences.viewCards": "Cards",
  "sentences.viewCardsAria": "Card view",
  "sentences.sortAria": "Sort",
  "sentences.sortNewest": "Newest",
  "sentences.sortAlpha": "A–Z",
  "sentences.sortSource": "By show",
  "sentences.revealTranslations": "Reveal translations",
  "sentences.hideTranslations": "Hide translations",
  "sentences.shuffle": "Shuffle",
  "sentences.sourceLabel": "Source",
  "sentences.listenAria": "Listen to this sentence",
  "sentences.emptyEyebrow": "No sentences",
  "sentences.sourceEverywhere": "Everywhere",
  "sentences.countOne": "1 sentence",
  "sentences.countMany": "{n} sentences",
  "sentences.emptyTitleFavorite": "Save a line while you watch",
  "sentences.emptyTitleDictation": "Add a sentence to practise dictation",
  "sentences.emptyTitleSpeaking": "Add a sentence to practise speaking",
  "sentences.emptyBodyFavorite":
    "Press the heart on any line in the study player. Every favourite keeps the scene it came from.",
  "sentences.emptyBodyDictation":
    "Press the heart on a line in the study player and pick 'Dictation'. Each sentence shows up here with its scene and translation.",
  "sentences.emptyBodySpeaking":
    "Press the heart on a line in the study player and pick 'Speaking'. Record yourself, score your pronunciation, replay.",
  "sentences.browseSentencePacks": "Browse Sentence Packs",
  "sentences.saveOneWhileWatching": "Save one while you watch",

  // -------- library --------
  "library.eyebrow": "Library",
  "library.videosTitle": "Watch & study",
  "library.videosLede":
    "Videos from channels you follow, podcasts, Show Packs and Sentence Packs — everything with learning-language captions.",
  "library.videosEmptyEyebrow": "Nothing to watch yet",
  "library.videosEmptyTitle": "Follow a channel to see new videos here",
  "library.videosEmptyBody":
    "Pick a channel from Search & discover, or paste any YouTube link above. The extension picks up captions in your browser — nothing we have to download.",
  "library.videosAria": "Videos",
  "library.podcastsTitle": "Podcasts",
  "library.podcastsLede":
    "Episodes from shows you follow. Transcripts come from the show's own feed where the publisher provides one — nothing is downloaded.",
  "library.podcastsPasteAria": "Paste a podcast feed",
  "library.podcastsPastePlaceholder": "Paste an RSS, Apple or Spotify-show link…",
  "library.podcastsOpenShow": "Open show page",
  "library.podcastsEmptyEyebrow": "Nothing in your feed yet",
  "library.podcastsEmptyTitle": "Follow a podcast to see new episodes here",
  "library.podcastsEmptyBody":
    "Pick a show from Discover, or paste any RSS/Apple/Spotify link above. We only play audio — nothing is stored.",
  "library.podcastsBackToVideos": "Back to videos",
  "library.podcastsEpisodesAria": "Podcast episodes",
  "library.podcastsRecommendedAria": "Recommended podcasts",
  "library.podcastsRecommendedLede":
    "Hand-picked shows across news, culture, comedy and language learning. Open in any podcast app.",
  "library.podcastsRecommendedTitle": "Recommended for {lang}",
  "library.podcastsCategoriesAria": "Categories",
  "library.podcastsUnverified": "Not yet verified by Funlingo",
  "library.podcastsUnverifiedBadge": "unverified",
  "library.podcastsOpenFeed": "Open feed",
  "library.podcastsFindApple": "Find in Apple Podcasts",
  "library.sentencePacksTitle": "Sentence Packs",
  "library.sentencePacksLede":
    "Short, native-speaker sentences for shadowing and dictation. Pick a theme and practise a chapter at a time.",
  "library.sentencePacksEmptyEyebrow": "No packs here yet",
  "library.sentencePacksEmptyTitle": "Sentence Packs ship with your language",
  "library.sentencePacksEmptyBody":
    "Each pack is a theme — Daily, Travel, Work, Idioms, Stories — with translations we wrote, never raw machine output. You can also make one from your own saved sentences.",
  "library.sentencePacksOpenMine": "Open my sentences",
  "library.sentencePacksTryShow": "Try a Show Pack",
  "library.sentencePacksAria": "Sentence packs",
  "library.sentencePacksPractise": "Practise →",
  "library.sentencePacksNewFromSaved": "+ New pack from saved",
  "library.packSentencesCount": "{n} sentences",
  "library.showPacksTitle": "Show Packs",
  "library.showPacksLede":
    "Study the shows you love — vocab, slang and culture notes, written by us. We never ship the show's own script.",
  "library.showPacksEmptyEyebrow": "Nothing to study yet",
  "library.showPacksEmptyTitle": "Show Packs are on the way",
  "library.showPacksEmptyBody":
    "A Show Pack bundles key words, slang and culture notes about a show — all original, never the script. Follow a show from a Pack's page and the words land in your deck.",
  "library.showPacksTrySentence": "Try a Sentence Pack instead",
  "library.showPacksAria": "Show packs",
  "library.showPacksOpen": "Open pack →",
  "library.sectionsAria": "Library sections",
  "library.pdSentenceEyebrow": "Sentence Pack · {category}",
  "library.pdShowEyebrow": "Show Pack · {category}",
  "library.pdSignedOutEyebrow": "Signed out",
  "library.pdSignIn": "Sign in",
  "library.pdBackToPacks": "Back to packs",
  "library.pdSignInSentenceTitle": "Sign in to add these to Review",
  "library.pdSignInSentenceBody": "Sentence Packs drop short, native-speaker lines into your deck. Sign in and the first ten will land there in one tap.",
  "library.pdSignInShowTitle": "Sign in to open this pack",
  "library.pdSignInShowBody": "Show Packs save your progress across chapters. Sign in and your place in this pack will stick.",
  "library.pdSentenceLede": "{n} short, native sentences — translated by us, never raw machine output.",
  "library.pdShowLede": "{n} key words, slang notes and culture notes — written by us, never the show's script.",
  "library.pdEmptyEyebrow": "Pack still being written",
  "library.pdEmptySentenceTitle": "This pack has no sentences yet",
  "library.pdEmptySentenceBody": "Sentence Packs ship chapter by chapter. Pick another for now — this one will fill in soon.",
  "library.pdEmptyShowTitle": "This pack has no items yet",
  "library.pdEmptyShowBody": "Show Packs ship chapter by chapter. Check back soon — the first notes land as we write them.",
  "library.pdBrowseOther": "Browse other packs",
  "library.pdChapterNamed": "Chapter {n} · {name}",
  "library.pdChapter": "Chapter {n}",
  "library.pdMoreUnlockSentence": "+ {n} more unlock as you work through the first ten.",
  "library.pdBackToSentencePacks": "Back to Sentence Packs",
  "library.pdMoreCount": "+ {n} more",
  "library.pdMoreUnlockShow": "The rest of this pack unlocks as you work through the first chapter.",
  "library.pdStudyFirstScene": "Study the first scene",
  "library.pdAddToReview": "Add to Review",

  // -------- library: YouTube discovery (default-tab client sub-components) --------
  // Lead-QA P1: these were English-only chrome inside the default "YouTube"
  // discovery panel. "YouTube" stays a brand; category chip labels come from
  // data and are not keyed here.
  "library.ytPasteAria": "Paste a YouTube link",
  "library.ytPastePlaceholder": "Paste a YouTube link or video ID…",
  "library.ytPasteError":
    "That link doesn't look like a YouTube video. Paste a youtube.com/watch URL, a youtu.be link, or a bare 11-character video ID.",
  "library.ytPasteHint":
    "Any public video with captions in your learning language works. Nothing you paste leaves the browser.",
  "library.ytPasteOpening": "Opening…",
  "library.ytPasteOpen": "Open in study player",
  "library.channelsTitle": "Channels you might like",
  "library.channelsLede":
    "Hand-picked for {lang} learners. Follow to see new episodes in your feed.",
  "library.channelsFilterAria": "Filter by category",
  "library.channelsAll": "All",
  "library.channelFollow": "Follow",
  "library.channelFollowing": "Following",
  "library.channelVisit": "Visit on YouTube",
  "library.emptyBrowseShowPacks": "Browse Show Packs",
  "library.emptyPasteYt": "Paste a YouTube link ↑",

  // -------- review --------
  // Lead-QA P1: /review server page (getT) + ReviewRunner client (useT via the
  // global provider; "review." is in CLIENT_KEY_PREFIXES). "Fun Learning" and
  // "Quick Quiz" follow the app's existing naming.
  "review.eyebrow": "Review",
  "review.dailySessionTitle": "Daily session",
  "review.signedOutEyebrow": "Signed out",
  "review.signedOutTitle": "Sign in to start reviewing",
  "review.signedOutBody":
    "Your streak, card schedule and session summary all live on your account. Sign in and the deck remembers you.",
  "review.signIn": "Sign in",
  "review.browseLibrary": "Browse the library",
  "review.quizEyebrow": "Quick Quiz",
  "review.quizEmptyTitle": "Save a word first",
  "review.quizEmptyLede":
    "This drill works with the words you've already saved. Watch something and tap a word to save it, then come back here.",
  "review.quizDeckEyebrow": "Nothing to practise yet",
  "review.quizDeckTitle": "Your word deck is empty",
  "review.quizDeckBody":
    "Quick Quiz grows with you. As you bookmark words while watching, this round fills up with your own vocabulary.",
  "review.tryOnVideo": "Try it on a 30-second video",
  "review.backToFunLearning": "Back to Fun Learning",
  "review.nothingDueTitle": "Nothing due today",
  "review.nothingDueBody":
    "Great work — all your cards for {lang} are scheduled for later. Save a word while you watch, or come back tomorrow.",
  "review.eyebrowShort": "REVIEW",
  "review.headerEyebrow": "REVIEW · {lang}",
  "review.sessionDone": "SESSION DONE",
  "review.drillFlashcard": "Flashcard",
  "review.drillGuess": "Guess the meaning",
  "review.drillDictation": "Dictation",
  "review.drillShadow": "Shadowing",
  "review.drillSpeaking": "Speaking",
  "review.quitTitle": "Save progress and quit?",
  "review.quitBody":
    "Cards you've already graded are saved. You can pick up where you left off tomorrow.",
  "review.quitKeep": "Keep reviewing",
  "review.quitConfirm": "Save and quit",
  "review.summaryTitle": "Nice work.",
  "review.summaryBody":
    "You reviewed {total} {cardWord} in {lang} — {accuracy}% correct, roughly {minutes} {minuteWord}.",
  "review.cardSingular": "card",
  "review.cardPlural": "cards",
  "review.minuteSingular": "minute",
  "review.minutePlural": "minutes",
  "review.labelReviewed": "Reviewed",
  "review.labelAccuracy": "Accuracy",
  "review.labelDueTomorrow": "Due tomorrow",
  "review.labelNextUp": "Next up",
  "review.summaryFoot": "Tomorrow's suggested count: {n}.",
  "review.browseLibraryArrow": "Browse the library →",
  "review.talkAboutWords": "Talk about today's words →",
  "review.seeAllWords": "See all your words →",

  // -------- review drills (client, rendered inside ReviewRunner) --------
  // Served under the "reviewDrill." prefix via a PAGE-SCOPED <I18nProvider> on
  // /review (REVIEW_DRILL_KEY_PREFIXES + pageClientSlice), NOT the global
  // slice: these ~90 keys would push the Hindi global client slice over the
  // <25 KB guard (wave14/review-library tests). The /review provider still
  // carries the global chrome (review.*, quiz.*, nav.*) so ReviewRunner's own
  // labels keep resolving. Visible labels + aria/placeholder for GradeRow and
  // the five drills. Study CONTENT (lemmas, saved lines, sentences) stays in
  // the learning language.
  // GradeRow
  "reviewDrill.gradeAgain": "Again",
  "reviewDrill.gradeHard": "Hard",
  "reviewDrill.gradeGood": "Good",
  "reviewDrill.gradeEasy": "Easy",
  "reviewDrill.gradeGroupAria": "Grade this card",
  "reviewDrill.gradeBtnAria": "Grade {label} (press {shortcut})",
  // Flashcard
  "reviewDrill.flashHint": "Say the meaning in your head.",
  "reviewDrill.flashReveal": "Reveal",
  "reviewDrill.flashRevealAria": "Reveal meaning",
  "reviewDrill.flashSkipAria": "Skip this card for now",
  "reviewDrill.flashMeaning": "Meaning:",
  "reviewDrill.flashYourLine": "Your line",
  "reviewDrill.flashSavedLine": "Saved line",
  "reviewDrill.flashYourLineAria": "Your saved line",
  "reviewDrill.flashToday": "today",
  "reviewDrill.flashDaysAgoSingular": "{n} day ago",
  "reviewDrill.flashDaysAgoPlural": "{n} days ago",
  "reviewDrill.flashNoScene":
    "You haven't saved a scene for this word yet. Grade by memory.",
  "reviewDrill.flashRewatch": "Rewatch this scene",
  "reviewDrill.flashRewatchAria": "Rewatch this scene at {moment}{inTitle} in a new tab",
  "reviewDrill.flashRewatchMoment": "the saved moment",
  "reviewDrill.flashRewatchInTitle": " in {title}",
  // Dictation
  "reviewDrill.dictReplay": "Replay",
  "reviewDrill.dictReplayAria": "Replay audio",
  "reviewDrill.dictHint": "Hint",
  "reviewDrill.dictHintAria": "Reveal missing letters",
  "reviewDrill.dictHintDotsAria": "Hint — dots are letters you already have",
  "reviewDrill.dictTypeLabel": "Type what you heard",
  "reviewDrill.dictPlaceholder":
    "Type what you heard — case and punctuation don't matter.",
  "reviewDrill.dictCorrect": "Correct",
  "reviewDrill.dictWrong": "Not quite — the cursor jumped to the first difference.",
  "reviewDrill.dictCheck": "Check",
  "reviewDrill.dictShowText": "Show text",
  "reviewDrill.dictHideText": "Hide text",
  "reviewDrill.dictLettersRemainingSingular": "{n} letter remaining",
  "reviewDrill.dictLettersRemainingPlural": "{n} letters remaining",
  // Guess the meaning — the 4-option drill shows meanings in the learner's
  // NATIVE language, so the placeholder distractor pool is localized too (it
  // would stick out as obviously-wrong if left English beside a native gloss).
  "reviewDrill.guessFallbackMeaning": "the correct meaning",
  "reviewDrill.guessPool1": "a kind of fruit",
  "reviewDrill.guessPool2": "a small boat",
  "reviewDrill.guessPool3": "to look at something quickly",
  "reviewDrill.guessPool4": "a feeling of surprise",
  "reviewDrill.guessPool5": "to walk slowly",
  "reviewDrill.guessPool6": "a type of weather",
  "reviewDrill.guessPool7": "to make a loud sound",
  "reviewDrill.guessPool8": "a close friend",
  "reviewDrill.guessPool9": "a quiet moment",
  "reviewDrill.guessPool10": "to begin something new",
  "reviewDrill.guessPool11": "a sharp tool",
  "reviewDrill.guessPool12": "to listen carefully",
  // Shared drill controls (Shadowing + Speaking)
  "reviewDrill.playBtn": "Play",
  "reviewDrill.record": "Record",
  "reviewDrill.recordAgain": "Record again",
  "reviewDrill.tryAgain": "Try again",
  "reviewDrill.stop": "Stop",
  "reviewDrill.stopRecordAria": "Stop recording",
  "reviewDrill.scoring": "Scoring…",
  "reviewDrill.transcribing": "Transcribing on your device…",
  "reviewDrill.loadingEngine":
    "Loading pronunciation engine… (first time, ~5 s on your device).",
  "reviewDrill.errBudget": "You've hit today's AI budget. Try tomorrow.",
  "reviewDrill.errScore": "Could not score your audio. Grade yourself.",
  "reviewDrill.errMic": "Microphone access was blocked. Grade yourself.",
  "reviewDrill.enableOnDevice":
    "Enable on-device pronunciation in Settings for honest word-match scoring (beta).",
  "reviewDrill.transcribedAs": "Transcribed as",
  "reviewDrill.nothingPickedUp": "(nothing picked up — try again)",
  "reviewDrill.perWordMatchAria": "Per-word match",
  "reviewDrill.perWordAccuracyAria": "Per-word pronunciation accuracy",
  "reviewDrill.wordMatched": "matched",
  "reviewDrill.wordMissed": "missed",
  "reviewDrill.wordExtra": "extra word",
  "reviewDrill.encNothingCompare":
    "Nothing to compare against on this card — give it a go and grade yourself.",
  // Shadowing-specific
  "reviewDrill.shadowChipLocal": "Shadow it",
  "reviewDrill.shadowPlayAria": "Play reference audio",
  "reviewDrill.shadowRecordAria": "Start recording your voice",
  "reviewDrill.shadowNoRecord":
    "Your browser can't record audio here. Shadow the audio out loud and grade yourself below.",
  "reviewDrill.shadowEncZero":
    "Nothing matched that time — try again, or play the reference again before shadowing.",
  "reviewDrill.shadowEncPerfect": "Perfect run — all {total} words came through.",
  "reviewDrill.shadowEncGreat": "Great shadow — {matched} of {total} words matched.",
  "reviewDrill.shadowEncGood":
    "Good go — {matched} of {total} matched. Play it again and try once more?",
  "reviewDrill.shadowEncLow":
    "{matched} of {total} words matched. Play it again — try shadowing a touch slower.",
  // Speaking-specific
  "reviewDrill.speakChipLocal": "Say it out loud",
  "reviewDrill.speakRevealModel": "Reveal a model answer",
  "reviewDrill.speakPromptEmpty": "Say something you remember from this scene.",
  "reviewDrill.speakPrompt":
    "Imagine you're in the scene. Say your own version of: \"{sentence}\" ({lang})",
  "reviewDrill.speakRecordAria": "Start recording your answer",
  "reviewDrill.speakNoRecord":
    "Audio recording isn't available here. Speak the answer out loud and grade yourself below.",
  "reviewDrill.speakEncZero":
    "Nothing matched that time — try again, or reveal the model answer and read it aloud.",
  "reviewDrill.speakEncPerfect": "Nice run — all {total} words came through.",
  "reviewDrill.speakEncGreat": "Nice run — {matched} of {total} words matched.",
  "reviewDrill.speakEncGood":
    "Good go — {matched} of {total} words matched. One more pass?",
  "reviewDrill.speakEncLow":
    "{matched} of {total} words matched. Try again — speak a touch slower.",

  // -------- Talk SEED-CONTENT (render-time, keyed on the viewer's NATIVE lang) --------
  // Talk scene categories, situation blurbs, and lesson titles+scenes render in
  // the learner's native language. The study CONTENT (phrases, the AI chat) and
  // the learning-language topic titles stay as-is. Keyed on the catalog's stable
  // slugs (situationSlug + slot slug) so the mapping survives a re-seed. See
  // src/lib/i18n/contentLocalize.ts + src/lib/talk/seedCatalog.ts.

  // Categories (SITUATION_CATEGORIES)
  "talkContent.cat.dailyLife": "Daily life",
  "talkContent.cat.food": "Food",
  "talkContent.cat.health": "Health",
  "talkContent.cat.social": "Social",
  "talkContent.cat.travel": "Travel",
  "talkContent.cat.work": "Work",

  // Situation blurbs (SITUATION_BLURBS)
  "talkContent.blurb.restaurant": "Order, ask questions, and split the bill — without rehearsing.",
  "talkContent.blurb.airport": "Check in, make a connection, and sail through security.",
  "talkContent.blurb.taxi": "Say where you're going, agree on the fare, and be on your way.",
  "talkContent.blurb.hotel": "Check in, ask for what you need, and leave on good terms.",
  "talkContent.blurb.shopping": "Find your size, try things on, and pay without the awkward pause.",
  "talkContent.blurb.doctor": "Describe what's wrong clearly and ask the right questions back.",
  "talkContent.blurb.dating": "Open the chat, suggest a plan, and keep it light.",
  "talkContent.blurb.interview": "Walk in confident — introduce, answer, and ask a sharp question.",

  // Lesson titles + scenes (LESSON_SLOTS)
  "talkContent.restaurant.arriving.title": "Getting a table",
  "talkContent.restaurant.arriving.scene": "You've just walked in. Greet the host and get seated.",
  "talkContent.restaurant.ordering.title": "Ordering",
  "talkContent.restaurant.ordering.scene": "You're ready to order. Ask questions, mention anything you can't eat, and lock it in.",
  "talkContent.restaurant.wrapping-up.title": "The bill",
  "talkContent.restaurant.wrapping-up.scene": "The meal's done. Ask for the bill, split it if you need to, and wrap up warmly.",
  "talkContent.airport.check-in.title": "At check-in",
  "talkContent.airport.check-in.scene": "You're at the counter. Confirm your flight details, ask for a seat, and move on.",
  "talkContent.airport.security.title": "Security & gate",
  "talkContent.airport.security.scene": "You're through check-in. Ask what you can bring, find your gate, and keep moving.",
  "talkContent.airport.arriving.title": "Arrivals & baggage",
  "talkContent.airport.arriving.scene": "You've just landed. Find your bags, handle customs, and get out of the terminal.",
  "talkContent.taxi.hailing.title": "Flagging a ride",
  "talkContent.taxi.hailing.scene": "You've got a destination in mind. Agree on where you're going and roughly what it'll cost.",
  "talkContent.taxi.on-the-way.title": "On the way",
  "talkContent.taxi.on-the-way.scene": "You're on the move. Make small talk, ask for a detour, or ask them to slow down.",
  "talkContent.taxi.arriving.title": "Dropping off",
  "talkContent.taxi.arriving.scene": "You've arrived. Pay, say thanks, and remember the trunk.",
  "talkContent.hotel.check-in.title": "Check-in",
  "talkContent.hotel.check-in.scene": "You've just walked up to reception. Confirm your reservation and get your key.",
  "talkContent.hotel.during-stay.title": "During the stay",
  "talkContent.hotel.during-stay.scene": "You're settling in. Ask for the Wi-Fi, breakfast, and a late checkout.",
  "talkContent.hotel.checkout.title": "Check-out",
  "talkContent.hotel.checkout.scene": "You're on your way out. Settle the bill, store your bag, and head off.",
  "talkContent.shopping.finding.title": "Finding what you want",
  "talkContent.shopping.finding.scene": "You're on the floor. Ask where things are, what fits, and what colours you have.",
  "talkContent.shopping.trying.title": "Trying it on",
  "talkContent.shopping.trying.scene": "You've picked something up. Try it on, ask for a different size, and decide.",
  "talkContent.shopping.paying.title": "Paying",
  "talkContent.shopping.paying.scene": "You're done. Pay, ask about returns, and skip the plastic bag.",
  "talkContent.doctor.symptoms.title": "What's going on",
  "talkContent.doctor.symptoms.scene": "You're sat in the doctor's office. Explain what hurts and when it started.",
  "talkContent.doctor.advice.title": "Diagnosis & advice",
  "talkContent.doctor.advice.scene": "The doctor is explaining. Ask what to do, what to avoid, and when to come back.",
  "talkContent.doctor.prescription.title": "Prescription & follow-up",
  "talkContent.doctor.prescription.scene": "You're wrapping up. Get the dose right and book the next visit.",
  "talkContent.dating.opening.title": "Opening the chat",
  "talkContent.dating.opening.scene": "You've just met up. Break the ice without over-rehearsing.",
  "talkContent.dating.flow.title": "Keeping it going",
  "talkContent.dating.flow.scene": "The chat is flowing. Share a story, ask good follow-ups, be present.",
  "talkContent.dating.closing.title": "The soft close",
  "talkContent.dating.closing.scene": "The date's winding down. Say you had fun, make a loose plan, head off.",
  "talkContent.interview.opening.title": "The opener",
  "talkContent.interview.opening.scene": "You've just sat down. Introduce yourself and talk about what you do.",
  "talkContent.interview.answering.title": "The questions",
  "talkContent.interview.answering.scene": "They're asking. Give focused answers and show you've done the homework.",
  "talkContent.interview.closing.title": "Your turn to ask",
  "talkContent.interview.closing.scene": "They've handed you the mic. Ask one sharp question and wrap up.",

  // -------- Library taxonomy labels (render-time, NATIVE lang) --------
  // Podcast + YouTube-channel category labels, keyed on the seed slug. Rendered
  // on /library (channel chips) + /library/podcasts (category chips + cards).
  "library.cat.news": "News",
  "library.cat.society-culture": "Society & Culture",
  "library.cat.comedy": "Comedy",
  "library.cat.education": "Education",
  "library.cat.language-learning": "Language learning",
  "library.cat.tech": "Tech",
  "library.cat.business": "Business",
  "library.cat.easy-languages": "Easy Languages (language learning)",
  "library.cat.tv-film": "TV & Film",
  "library.cat.travel": "Travel",
} as const;

export type CatalogKey = keyof typeof en;
export type Catalog = Readonly<Record<string, string>>;
