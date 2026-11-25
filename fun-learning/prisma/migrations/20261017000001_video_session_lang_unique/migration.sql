-- VideoSession: swap the (userId, sourceId) key for (userId, sourceId, lang).
--
-- The 20261015204634_watch_lane migration created only a NON-unique index on
-- (userId, sourceId), while the Prisma schema declared it UNIQUE. That drift
-- let the DB hold duplicate rows and would have blocked any later
-- `prisma migrate dev` that tried to enforce the single-column key.
--
-- AGENT-PLAYBOOK non-negotiable #4 says a user studying the same source in
-- two languages must have independent VideoSession rows. So the fix is a
-- 3-column unique: (userId, sourceId, lang). This migration:
--   1. Deletes duplicate (userId, sourceId, lang) rows, keeping the newest
--      (latest lastPulseAt) if any exist.
--   2. Drops the old non-unique (userId, sourceId) index.
--   3. Creates the (userId, sourceId, lang) UNIQUE index that matches the
--      schema's @@unique declaration.

-- 1) Dedup — keep the row with the latest lastPulseAt per (userId, sourceId, lang).
DELETE FROM "VideoSession"
WHERE "id" NOT IN (
  SELECT "id"
  FROM "VideoSession" v1
  WHERE "lastPulseAt" = (
    SELECT MAX("lastPulseAt")
    FROM "VideoSession" v2
    WHERE v2."userId" = v1."userId"
      AND v2."sourceId" = v1."sourceId"
      AND v2."lang" = v1."lang"
  )
);

-- 2) Drop the old non-unique index.
DROP INDEX IF EXISTS "VideoSession_userId_sourceId_idx";

-- 3) Create the new UNIQUE index — Prisma names unique indexes <Table>_<cols>_key.
CREATE UNIQUE INDEX "VideoSession_userId_sourceId_lang_key" ON "VideoSession"("userId", "sourceId", "lang");
