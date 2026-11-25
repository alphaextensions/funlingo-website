# Fun Learning (web)

The web home for Funlingo learners. Next.js 15 + TypeScript + SQLite (via Prisma) + Auth.js v5 + Groq (OpenAI-compatible SDK).

See `AGENT-PLAYBOOK.md` for the owner's locked decisions and `docs/SPEC.md` for the full spec.

## Run locally

```bash
# 1. Install deps
pnpm install

# 2. Fill in env — Prisma reads `.env`, Next.js also reads `.env.local`
cp .env.example .env
# then edit .env — set AUTH_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, GROQ_API_KEY

# 3. First-time DB setup (creates prisma/dev.db)
pnpm prisma migrate dev

# 4. Dev server
pnpm dev
# → http://localhost:3000
```

## Scripts
| | |
|---|---|
| `pnpm dev` | Next.js dev server |
| `pnpm build` | Prisma generate + Next.js production build |
| `pnpm start` | Serve the production build |
| `pnpm test` | Vitest (unit) |
| `pnpm test:e2e` | Playwright flows |
| `pnpm test:idioms` | Idiom regression (stub) |

## Agent lanes
See `AGENT-PLAYBOOK.md` → "Agent lanes". Each feature agent builds on this scaffold.
