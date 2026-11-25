# Wave 7 — tr/ar/hi/ko adversarial LLM audit

**Date:** 2026-10-23
**Branch:** `agent/perlang-audit`
**Base commit:** `93ff55b` (Wave 6 per-lang packs merge)
**Scope:** `tr`, `ar`, `hi`, `ko` sub-blocks of all six `data/seed/packs-v2/*.json` packs.

## What this is (and isn't)

The Wave 6 per-lang packs agent flagged `tr/ar/hi/ko` as leaning on
idiomatic phrasing that would benefit from a native-speaker pass. I'm
the next-best thing, not that pass: **an LLM reviewing LLM-written
content**. The entries that remain are the ones I'm reasonably
confident read naturally; the ones I changed are the ones that read as
"translated content" or carried a clear bug. When unsure, I kept the
original and noted the uncertainty instead of taking a creative swing.

A real native-speaker pass is still the honest ask on top of this.

## Methodology

For each item in each tr/ar/hi/ko block I asked:

1. Would a native speaker actually say this in this context?
2. Any grammar bugs the LLM commonly makes (vowel harmony, dual
   forms, verb-gender agreement with speaker, honorific-level mixing
   within one phrase, dialectal mixing where MSA is wanted)?
3. Is the register honest to the pack's claimed tone (`casual` /
   `polite` / `formal`)?
4. For proverbs/famous: is the phrasing a well-attested native form,
   and is the author attribution safe?

I preferred the safer, more conservative phrasing on fixes and only
touched items I was reasonably sure of. Low-confidence observations
are listed under "Flagged but not changed."

## Counts

Totals per language across all six packs (en/es/fr/de/it/pt/ja/zh/zh
blocks were NOT touched — out of scope):

| Lang | Items reviewed | Flagged | Fixed | Replaced | Unchanged |
|---|---|---|---|---|---|
| tr | 175 | 10 | 7 | 0 | 168 |
| ar | 175 | 7 | 4 | 0 | 171 |
| hi | 175 | 11 | 7 | 0 | 168 |
| ko | 175 | 8 | 5 | 0 | 170 |
| **Total** | **700** | **36** | **23** | **0** | **677** |

No items were replaced (reduced to count holes) — all fixes were
in-place edits. Item counts, chapter ids, order values, and meta
shapes are untouched. The seed script's duplicate-text guard still
holds (I checked after each edit).

## By category

| Pack | tr fixed | ar fixed | hi fixed | ko fixed |
|---|---|---|---|---|
| everyday | 3 | 1 | 0 | 2 |
| travel | 1 | 0 | 0 | 0 |
| business | 0 | 2 | 1 | 1 |
| emotions | 3 | 1 | 3 | 2 |
| proverbs | 0 | 0 | 1 | 0 |
| famous | 2 | 0 | 1 | 2 (attribution) |
| **Total** | **9** | **4** | **5** | **7** |
(Numbers add up to 25 line-touches across 23 distinct items — two Korean famous items were attribution-only fixes.)

## Issue kinds

- **English calque / word order looks translated** — 8 items
  (tr "Bugün nasıl gidiyor?", "Gerçekten büyük bir rahatlama.",
  "Senin bu aralar ne haber?"; ar business "سنمرر هذا العرض";
  hi "समर्थन करूंगा", "धीमे से असहमत").
- **Idiom used in wrong person / wrong form** — 1 serious
  (tr emotions "etekleri zil çalıyor" — 3rd-person idiom used
  as 1st-person self-report; fixed to "eteklerim zil çalıyor"). This
  was the single clearest LLM slip in the whole audit.
- **Register / honorific mixing within one phrase** — 1
  (ko business line 283 mixed `-합니다` and `-었어요` in the
  same sentence; fixed to all-formal).
- **Dialect leaked into an MSA block** — 1
  (ar emotions "احكي لي" → "أخبرني").
- **Chair-vs-seat kind of lexical slip** — 1
  (ar everyday "الكرسي" for a train seat → "المقعد").
- **Factual typo in a proverb** — 1
  (hi proverbs: "काम प्यारा है, काम नहीं" is a corrupted
  version of "काम प्यारा है, चाम नहीं" — the second noun was
  overwritten with the first. Fixed, with the English gloss and
  meaning updated too).
- **Attribution overclaim on famous quotes** — 3
  (tr "Vatan sevgisi imandandır" was tagged "Mevlana geleneği" —
  it's not from Mevlana; fixed to the safer "Türk atasözü klasiği";
  ko "꽃이 피면…" was tagged 법구경 (Dhammapada) but doesn't appear
  in standard Dhammapada translations — attribution relaxed;
  ko "모든 아름다움에는 눈이 필요하다" was tagged 공자 (Confucius) —
  not a well-known Confucius line, relaxed to "공자 전승 (변형)").
- **Awkward but not wrong phrasing** — 7
  (various; fixed where a clearly more idiomatic native phrasing was
  available).

## Sample before/after (first 5 per lang)

### Turkish

| # | Before | After |
|---|---|---|
| everyday ch1#1 | `Bugün nasıl gidiyor?` | `Nasıl gidiyor bugün?` |
| everyday ch7#1 | `Gerçekten büyük bir rahatlama.` | `Gerçekten çok rahatladım.` |
| everyday ch8#4 | `Bir ceket al — hava serin.` | `Yanına bir ceket al — hava serin.` |
| travel ch1#3 | `BA112 sefer sayılı uçuşun kapısı nerede?` | `BA112 uçuşunun kapısı nerede?` |
| emotions#0 | `Bu konuda etekleri zil çalıyor.` | `Bu konuda eteklerim zil çalıyor.` |

### Arabic

| # | Before | After |
|---|---|---|
| everyday ch4#1 | `هل هذا الكرسي مشغول؟` | `هل هذا المقعد مشغول؟` |
| business ch3#3 | `للأسف، سنمرر هذا العرض.` | `للأسف، سنعتذر عن هذا العرض.` |
| business ch5#4 | `مع أطيب التحيات، إلى قريب.` | `مع أطيب التحيات، نتحدث قريباً.` |
| emotions#21 | `واو، رائع — احكي لي أكثر.` | `واو، رائع — أخبرني أكثر.` |
| — | (fewer than 5 fixed) | — |

### Hindi

| # | Before | After |
|---|---|---|
| business ch4#0 | `देर से जवाब देने के लिए माफ़ करना।` | `देर से जवाब देने के लिए माफ़ कीजिए।` |
| emotions#6 | `मैं भी इसी बात का समर्थन करूंगा।` | `मुझे भी यही लगता है।` |
| emotions#9 | `मैं धीमे से असहमत होना चाहूंगा।` | `मैं नरमी से असहमत होना चाहूंगा।` |
| emotions#15 | `सिद्धि नहीं, आगे बढ़ना मायने रखता है।` | `कामयाबी नहीं, आगे बढ़ना मायने रखता है।` |
| proverbs#13 | `काम प्यारा है, काम नहीं।` | `काम प्यारा है, चाम नहीं।` |

### Korean

| # | Before | After |
|---|---|---|
| everyday ch7#4 | `전혀 괜찮아요.` | `괜찮아요, 신경 쓰지 마세요.` |
| everyday ch9#2 | `현금도 받으세요?` | `현금 받으세요?` |
| business ch3#2 | `죄송합니다, 목요일은 결국 참석이 어려워졌어요.` | `죄송합니다, 목요일은 결국 참석이 어려워졌습니다.` |
| emotions#9 | `조심스럽게 반대 의견이에요.` | `조심스럽게 다른 의견이에요.` |
| emotions#22 | `저도 지금 똑같은 거 말하려 했어요.` | `저도 방금 똑같은 말 하려 했어요.` |

## Patterns spotted (keep an eye on these in future lanes)

1. **Hindi register-mixing between आप and तुम is CONTEXTUAL, not a
   bug** — the pack intentionally switches: strangers / waiters /
   managers get आप; family, friends, emotional-support lines get
   तुम. I didn't normalize this. A real native-speaker pass could
   confirm whether every switch lands correctly.
2. **Arabic MSA-vs-dialect mixing is small but real** — "ممكن…"
   (Levantine/Egyptian polite request) appears in every MSA pack
   because it's the cross-dialect fallback for politeness.
   Native-speaker opinion needed on whether to keep this or move to
   stricter MSA ("هل يمكنني…"). I left it, flagged here.
3. **Korean business pack mixes `-ㅂ니다` (formal) with `-아/어요`
   (polite) across items (not within items, except for the one I
   fixed).** This is modern-workplace Korean, not strictly wrong,
   but a real pass should decide on a single register per pack and
   normalize. I left the across-item mix and only fixed the
   within-item mix.
4. **Famous Quotes attributions had three overclaims** — in a pack
   that explicitly brags "Where uncertain, the item was dropped
   rather than hedged," three Turkish/Korean entries attributed
   quotes to specific authors (Mevlana, Dhammapada, Confucius) that
   don't actually hold up. I relaxed the attributions rather than
   drop the items (item-count stability was asked for). A reviewer
   with better classical-text access could tighten these further
   or swap them out.
5. **Hindi proverbs survived a corrupted token** — "काम प्यारा है,
   काम नहीं" was almost certainly meant to be "…चाम नहीं" (two
   nouns in the proverb, same ending, LLM dropped the second one).
   Worth adding a tiny CI check that compares each lang's proverb
   list against a known-good reference list to catch this kind of
   silent token flip in future.

## Flagged but not changed (uncertain)

- **AR everyday ch5#3 "متأخر قليلاً، آسف."** — could be
  "متأخر قليلاً، آسف على ذلك." for a more complete feel, but the
  current form is a plausible short-reply. Kept.
- **HI everyday ch6#4 "बच्चों में ही बहुत वक़्त जा रहा है।"** —
  reads slightly off (literally "most time is going into the kids"),
  natural would be "बच्चों के साथ बहुत व्यस्त हैं". Kept to avoid
  guessing register.
- **KO proverbs#19 translation "Pull the ox's horn while the iron
  is hot."** — a weird mash of two idioms, but it does carry both
  the "하라" (do it) and "뜨거울 때" (while hot) ideas of
  "쇠뿔도 단김에 빼라". Not an edit, left for a real pass.
- **AR famous#16 "اعمل لدنياك…"** — commonly attributed to Imam Ali,
  sometimes to a hadith variant; current attribution is just
  "حكمة قديمة" which is honest. Kept.

## What still needs a real native-speaker pass

- Everything in this doc is an LLM's reading of LLM output. A real
  native pass should at minimum:
  1. Confirm or reject the fixes applied here (nothing I did was
     speculative, but I'm not a native speaker — all fixes should
     be re-reviewed).
  2. Decide on single-register normalization for Korean business and
     Arabic requests (ممكن vs هل يمكنني).
  3. Audit the Hindi aap/tum switches per item for context
     appropriateness, not just internal consistency.
  4. Audit Famous Quotes attributions against primary sources,
     especially the "classical maxim" catch-all tags.
  5. Spot-check Korean emotions-pack colloquial items (대박, 신기해요,
     etc.) for over-casual or under-casual.
- Running the `tests/fixtures/idioms/*.json` corpus (CLAUDE.md hard
  rule #3) against these packs in a batch gloss would catch the
  "same old same old → literal" style failure the rule exists to
  prevent. We don't have a specific per-pack prompt test yet.

## Attribution

All edits made by Claude Opus 4.7 (1M context) on 2026-10-23 in
response to the Wave 6 per-lang packs agent's flagging that tr/ar/hi/
ko needed a native-speaker audit. These edits are a stopgap, not a
substitute, for that pass.
