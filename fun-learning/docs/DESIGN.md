# Funlingo design language (summary for building)

The full system, with tokens, rules and logos, is saved as the **Funlingo** design system artifact on claude.ai. This file is the build-time summary; if they disagree, the artifact wins.

Logos: `public/brand/funlingo-lockup.png` (mark + wordmark), `funlingo-wordmark.png`, `funlingo-mark.png`. Never recolour or redraw them.

## Feeling
A night in with a good show: warm, playful, effortless. Never studious, never enterprise. Show, don't tell. Free is the loudest message. Fun with restraint: nothing bounces or springs, no confetti for its own sake.

## Colour (dark is the default theme)
```css
--grad: linear-gradient(135deg, #BC22D6 0%, #9A1C8E 52%, #E0319E 100%);
```
| Token | Dark | Light |
|---|---|---|
| --bg | #0E0816 | #FBF4FF |
| --bg2 | #140B20 | #FFFFFF |
| --surface | #1A1026 | #FFFFFF |
| --surface-2 | #221531 | #FBF2FE |
| --text | #F6EFFB | #1B0F26 |
| --text-dim | rgba(246,239,251,.64) | #675579 |
| --text-dim2 | rgba(246,239,251,.40) | #9A8AA6 |
| --border | rgba(255,255,255,.08) | rgba(27,15,38,.09) |
| --chip | rgba(255,255,255,.06) | #F4EAFB |
| --pink-soft | rgba(236,77,176,.14) | rgba(236,77,176,.10) |
| --nav | rgba(14,8,22,.78) | rgba(251,244,255,.82) |

Brand literals: purple #BC22D6, deep magenta #9A1C8E, pink end #E0319E, product pink #EC4DB0, magenta #C81FD4, ink #1B0F26, star #F5A623, correct #16B57F.
Player surfaces stay dark in both themes: shell #130C1F, control bar #0E0719, learning subtitle #F277C0, screen `radial-gradient(130% 110% at 72% 6%, #4A1F6E 0%, #2B1240 44%, #140A22 100%)`. The word popup is white in both themes.

Rules: `--grad` on every primary CTA, badge, active state and big number. Gradient text only for one hero accent word or giant stats. `--pink-soft` is the wash behind anything selected. Two backgrounds per page (`--bg`/`--bg2` alternating). No colour outside the palette except platform logo colours, the star, and the correct-answer green.

## Type
Poppins only (400–900). Body weight **500**, never 400. Never below 14px (except 11–13px uppercase tags/eyebrows). Headlines `letter-spacing: -.02em`. Hero `clamp(52px,5.6vw,82px)`/800, section H2 `clamp(38px,4.4vw,56px)`/800, H3 23px/700, body 16px/500, caption 14px/500, eyebrow 13px/900 uppercase .12em, tag 11px/800 uppercase .06em. For in-app screens (dense UI), use the smaller end: H1 28–34px, H2 22px, body 15–16px.

## Shape, space, depth
Radii: 9 (logo chip), 11 (inner controls), 14 (buttons), 16, 18 (popups), 22–24 (cards), 26 (player), 28 (big panels), 36 (CTA block), 999 (pills). Spacing scale 4·8·10·14·18·20·24·26·30·34·38·50·56·70·104. Tap target ≥ 44px. Layout with flex/grid `gap`, never sibling margins.
Cards: `--surface`, 1px `--border`, no shadow at rest. Shadows are coloured glows, only on floating things (CTAs, player, popups, game panel). No photography or illustration in chrome; depth from glow orbs (max two per section), alternating backgrounds, blur (sticky nav 16px, player chip 6px), and a protection gradient under subtitles.

## Motion
Slow and ambient. Hover: `brightness(1.07)` + `translateY(-1px)`; press `brightness(.97)`. Subtitle line change .45s ease with 14px rise. Wrong answer shake .4s ±7px. Micro .15s. No curve sharper than ease-in-out. Respect reduced motion.

## Interaction signatures
- Highlighted subtitle word: 12% pink wash + 2px dashed #EC4DB0 underline (30% wash while its popup is open).
- Tooltip/popup close delay 150ms.
- Selected chip: pink-soft fill, pink text, 3px ring rgba(236,77,176,.18).
- Disabled: opacity only.

## Icons
Hand-drawn inline SVG, 24×24, `currentColor`, stroke 2 (1.6 detail, 2.4 chevrons, 3 for the check in a gradient circle). If a library is needed for app chrome, use Lucide (matches the mobile app) at stroke 2. Flags are geometric SVGs, never emoji. Platform logos in a 32–34px white chip, radius 9.

## Voice
Second person, informal, sentence case everywhere. Headlines in two beats. Answer first. Say the price ("Free"). Say *install, press play, tap a word, save it*. Never: leverage, empower, unlock your potential, revolutionise, seamlessly, sign up. Emoji only in playful moments (game results), never in UI chrome.

## i18n
21 locales, English fallback baked in, RTL for Arabic via logical properties, no trailing space before the accent word for zh/ja, test layouts with German and Vietnamese strings.
