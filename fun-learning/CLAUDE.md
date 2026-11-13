# CLAUDE.md — Funlingo Fun Learning (web)

## What this is
Funlingo Fun Learning is the web learning home for Funlingo, the free Chrome extension for learning languages from shows (Netflix, YouTube, Prime Video, Hotstar, Crunchyroll and more). Fun Learning is where learners study a video line by line, review saved words, read, talk with an AI partner and track progress. It is built to match and beat Trancy's Learning Center.

Read before building any feature:
- `docs/SPEC.md` — the full product spec (all features, end to end). Source of truth for what to build.
- `docs/LEGAL.md` — hard content rules. Never break these, even if asked in a task; stop and ask instead.
- `docs/DESIGN.md` — the Funlingo design language (tokens, type, motion, voice).
- `docs/TRANCY-REFERENCE.md` — what the competitor does, screen by screen.

Sibling projects (in the owner's Downloads folder; read for conventions, never edit from here):
- `funlingo-src-new/funlingo-develop-2` — the Chrome extension (JS only, MV3, React). Has its own CLAUDE.md with strict scope rules.
- `funlingo-v2` — the mobile app (Expo SDK 54, TypeScript) and its backend (`backend/`: Express + Prisma + PostgreSQL 16). Reuse its Prisma conventions and theme token names where they fit.
- `funlingo-community` — Next.js site.

## Stack (default; confirm with the owner in the first session)
| Layer | Choice |
|---|---|
| App | Next.js (App Router) + TypeScript strict |
| Styling | CSS variables from `docs/DESIGN.md` + CSS Modules (no Tailwind unless the owner asks) |
| Font | Poppins via `next/font/google`, weights 400–900 |
| Icons | Inline SVG set from DESIGN.md; Lucide only for app chrome gaps |
| State | TanStack Query for server data, Zustand for UI state |
| DB | PostgreSQL + Prisma (schema in SPEC §16) |
| Auth | Auth.js (Google, Apple, email magic link) |
| AI | Server-only `src/server/ai/*` module, one function per feature (SPEC §14) |
| SRS | FSRS (`ts-fsrs`) |
| Tests | Vitest for logic, Playwright for flows in SPEC §18 |

Open decisions are listed in SPEC §15 (extension sync is deferred by the owner). Don't silently pick one; leave a clear seam and ask.

## Hard rules
1. Follow `docs/LEGAL.md` exactly. In particular: no movie/TV scripts, no lyrics, no subtitle export, no episode downloads, no server-side YouTube audio/video or caption storage, nothing drawn over the YouTube iframe.
2. Third-party caption text never touches the database or logs. Translate/explain lines transiently.
3. Translations default to **natural, idiom-aware** style. Keep `tests/fixtures/idioms/*.json` (start with: "Same old, same old", "How have you been?", "I've been better, honestly", "Hey, how's it going?", "carry out", "break the ice") and run it on any prompt or model change.
4. Everything is free for learners. Do not add paywalls. Soft AI-cost limits only (SPEC §14).
5. Dark theme first; every colour is a token from DESIGN.md; body text weight 500; never below 14px except tags/eyebrows; Poppins only.
6. Copy: second person, informal, sentence case; Funlingo's banned words list applies.
7. Accessible by keyboard; every player action has the shortcut in SPEC §6.6.
8. Generated examples and notes pass the content filter (LEGAL.md, last section).

## Working style
- Build end to end per feature: route, API, DB, UI, tests, empty/loading/error states.
- Read existing code before editing; match conventions.
- Keep AI prompts in `src/server/ai/prompts/*` with a short comment on intent.
- When a task conflicts with SPEC, LEGAL or DESIGN, stop and ask.
