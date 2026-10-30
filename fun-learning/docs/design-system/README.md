# Funlingo

Funlingo is a free Chrome extension (plus an Android app) that puts dual subtitles, instant word meanings and a vocabulary builder inside the shows people already watch. This system is the visual and interaction language behind getfunlingo.com and the in-player UI. Use it for anything Funlingo ships: the website, the extension, a learning hub, decks and docs.

## The feeling

Funlingo is a **consumer** product, not SaaS. The feeling is *a night in with a good show*: warm, playful, effortless. Never studious, never enterprise. Three rules settle most design questions:

1. **Show, don't tell.** Where a competitor writes a feature bullet, Funlingo builds a thing you can touch: the hover-a-word player, the guess-the-meaning game.
2. **Free is the loudest message.** It appears in the hero badge, the comparison table, the CTA and the FAQ. The word *free* is allowed to repeat; it is the positioning.
3. **Fun with restraint.** Playful colour and motion, but type stays legible and layouts stay calm. Nothing bounces, nothing springs, no confetti for its own sake.

## Voice and copy

- **Second person, informal, in every language** (tú, du, ты, तुम). Short declarative sentences.
- **Sentence case everywhere.** The only uppercase is the `eyebrow` (13px), `tag` (11px) status labels and footer column headers.
- **Headlines are two beats**, split by a hard line break: the first sets the scene, the second lands the claim. *Watch what you love. / Pick up the language.* · *Everything they charge for. / Yours for $0.*
- **One accent word** per hero headline, set in the gradient. Never two.
- **Answer first.** FAQ answers open with the answer ("Yes, completely." · "Nope."), then two sentences, then stop.
- **Say the price**: "Free forever", "Yours for $0".
- **Be fair to competitors.** Comparison tables carry a *partial* mark so Trancy and Immersive Translate get credit for what they do well.
- **Real proof only**: 4.8★ Chrome Web Store, 8 platforms, 100+ languages, $0, one cited study. Never ship a number without its source.
- **Emoji**: none in UI chrome; sparing in playful moments only (a game result).
- **Translate the idiom, never the words.**
- Words Funlingo does not use: leverage, empower, unlock your potential, revolutionise, seamlessly (as filler), sign up. It says *install*, *press play*, *tap a word*, *save it*.

## Colour

**Dark is the default theme.** Every themeable value is a token; never write a literal.

The brand is one gradient and its endpoints:

```css
--grad: linear-gradient(135deg, #BC22D6 0%, #9A1C8E 52%, #E0319E 100%);
```

(`fnl-purple` → `fnl-deep-magenta` → `fnl-pink-end`.) `--grad` fills every primary CTA, every badge, every active state, every big number, the Funlingo column header of a comparison table and the number chips on step cards.

- **Two backgrounds per page, no more.** `bg` and `bg2` alternate between sections instead of drawing borders everywhere.
- **Gradient text is rationed**: hero accent words and giant stats only. Never body copy, never a whole heading.
- **`pink-soft` is the wash** behind anything selected, active or highlighted.
- **The player stays dark in both themes** (`fnl-player-shell`, `fnl-player-bar`). A media player is a dark object; flipping it white breaks the illusion. The word popup over it is white in both themes.
- **No colour outside the palette.** Three exceptions: platform brand colours inside their own logo chips, `fnl-star` for ratings, `fnl-correct` for a right answer.
- `text-dim2` is below 4.5:1 on `bg`; use it only for large or non-essential meta text.

## Typography

**Poppins for everything**, weights 400–900, self-hosted woff2 in production (Google Fonts is an acceptable fallback). Sizes in tokens are the desktop maxima of fluid `clamp()` values: hero `clamp(52px, 5.6vw, 82px)`, section H2 `clamp(38px, 4.4vw, 56px)`, CTA H2 `clamp(40px, 5vw, 64px)`, giant stat `clamp(80px, 11vw, 140px)`.

Non-negotiables:
- **Body copy is weight 500, never 400.** At 400 it looks thin on the dark ground.
- **Never set text below 14px** (the 11–13px `tag` and `eyebrow` labels are the only exceptions).
- **Headlines always carry `letter-spacing: -.02em`.**
- CJK has no inter-word space: compose the hero as pre-text + accent word with no trailing space for zh-CN, zh-TW and ja. Pressure-test buttons against German and Vietnamese, not English.

## Space, shape, elevation

- **Radii are the most brand-defining shape choice.** Everything is generously round: from `r-chip-logo` (9px) to `r-hero` (36px), with `r-pill` at the top.
- Spacing runs 4 · 8 · 10 · 14 · 18 · 20 · 24 · 26 · 30 · 34 · 38 · 50 · 56 · 70 · 104px. Section padding `space-15` on desktop, `space-13` at ≤860px. Card padding 26–38px. Minimum tap target `tap-min` (44px).
- Four content widths, no fifth: `maxw-page`, `maxw-narrow`, `maxw-prose`, `maxw-copy`.
- **Layout is always flex or grid with `gap`**, never per-element margins between siblings.
- **Shadows are coloured, never grey**, and reserved for things that float: CTAs, the player, the game panel, the word popup, floating word bubbles. **Cards have no shadow at rest**; the 1px `border` separates.
- **No photography and no illustration.** Depth comes from four things only: ambient glow orbs (radial, 20–24% opacity, two per section maximum, bled off the edge), alternating flat backgrounds, backdrop blur in exactly two places (sticky nav at 16px, player platform chip at 6px), and a protection gradient inside the player so subtitles stay legible.

## Motion

Ambient, not attention-seeking. Slow drifts and gentle pulses; no curve more dramatic than `ease-in-out`.

| Name | Use | Timing |
| --- | --- | --- |
| fnl-float | Floating word bubbles | 6–8.2s ease-in-out infinite, staggered |
| fnl-pulse | Live and status dots | 2s infinite, opacity .5 → 1 |
| fnl-mq | Testimonial and platform marquees | 32–46s linear, start paused until in view |
| fnl-subin | Subtitle line change | .45s ease, 14px rise |
| gg-shake | Wrong answer in the game | .4s, ±7px |
| micro | Hover, active, selection | .15s ease |
| theme | Theme cross-fade | .4s |
| collapse | FAQ open/close | .32s cubic-bezier(.4,0,.2,1) |

States: hover on a button is `filter: brightness(1.07)` plus `translateY(-1px)` (the gradient stays); press is `brightness(.97)`; a selected chip gets `pink-soft` fill, pink text and `ring-selected`; a highlighted subtitle word gets a 12% pink wash and a 2px dashed `fnl-pink` underline (30% while its popup is open); disabled is opacity only. `prefers-reduced-motion` cancels the lift.

## Signature interactions

- **The player.** Dual subtitles over a dark screen. Interesting words carry a dashed pink underline; hovering opens a white card with the word, part of speech, meaning, tappable pronunciation and a Save button. Saving drops the word into a "My Words" deck with a live count. Tooltips close after a 150ms delay so the pointer can travel into them.
- **The game.** A foreign word, four options, real speech synthesis, `gg-shake` on a wrong pick, progress pips, a score screen that leads to the CTA.

Both are demonstrations, not descriptions. A competitor writes "instant word meanings" as a bullet; Funlingo hands you a word to hover.

## Iconography

No icon font and no third-party icon library. Every glyph is hand-drawn inline SVG on a 24×24 grid in `currentColor`. Stroke 1.6 for hairline detail, 2 by default, 2.4 for chevrons, 3 for the check inside a gradient circle; the bookmark and speaker are solid fills. The set: globe, chevron, check, bookmark, speaker, speakerLoud, sun, moon. Draw anything new in the same idiom.

- **Flags** are geometric SVG rectangles on a 26×19 rounded box, never emoji flags.
- **Platform logos** sit in a 32–34px white chip (navy for Disney+) with `r-chip-logo`, the mark capped at 24px.
- Unicode used as icons, sparingly: ★ ratings, ✕ absent feature, → arrows, + FAQ toggle (rotated 45° open), ✓ shipped.

**The logo** lives in the Logos asset group: a rounded play-triangle containing a white *F*, filled with a vertical gradient from `fnl-purple` at the top to deep plum at the bottom, and the *Funlingo* wordmark, a heavy italic in the same gradient. Use the lockup (mark + wordmark) in navs and footers, 44–56px tall in the nav and 40–48px in the footer; the mark alone for app icons, favicons and the extension. Never recolour or re-draw it, and never place it on a mid-tone purple or pink that swallows the gradient.

## Components

The site build has 33 React components in five groups (core, icons, navigation, marketing, product). Their source is not in this system yet. Key specs to build to:

- **Button**: primary (`--grad` fill, white, weight 800, `shadow-cta`, `r-btn`), secondary (`surface`, 1.5px `border`), ghost (`chip`, 1px border), inverted (white on gradient, `fnl-ink` text). Sizes sm/md/lg/xl at 14/15/17/18px; minimum height `tap-min`. Every "Add to Chrome" button carries the Chrome swatch.
- **Card**: `surface`, 1px `border`, `r-card`–`r-card-lg`, 26–34px padding, no shadow.
- **Nav**: sticky, `nav` background under blur(16px), 1px bottom border. Logo, links, language switcher, theme toggle, CTA.
- **Comparison table**: grid `1.7fr 1fr 1fr 1fr`; the Funlingo column gets the gradient header and a `pink-soft` wash; ✓ is a gradient circle, partial a dim dash, absent ✕.
- **Product**: PlayerMock, WordPopup, MyWordsDeck, GuessGame.

## Internationalisation and responsive

21 locales, auto-detected, overridable by a globe switcher persisted to localStorage. Regional fallback en-GB → en, pt-PT → pt-BR, zh-TW → zh-CN. Arabic sets `dir="rtl"`; use logical properties. Reviews are prioritised by language, never filtered. Every string ships an English fallback.

Breakpoints: **860px** layout collapse (single column, nav links hide, bubbles go), **700px** chrome compaction (section padding 104 → 56, subtitles 29 → 21px, buttons full width), **560px** comparison table scrolls instead of crushing.
