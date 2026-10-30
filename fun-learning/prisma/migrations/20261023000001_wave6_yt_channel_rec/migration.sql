-- Wave 6 — YtChannelRec table.
--
-- Curated YouTube channel recommendations surfaced on /library. This is a
-- discovery catalogue only; Follow (userId, kind="youtube_channel",
-- externalId) remains the source of truth for who follows what. Each row
-- is lang-scoped per AGENT-PLAYBOOK non-negotiable #4.

CREATE TABLE "YtChannelRec" (
  "id"              TEXT NOT NULL PRIMARY KEY,
  "lang"            TEXT NOT NULL,
  "categorySlug"    TEXT NOT NULL,
  "channelId"       TEXT NOT NULL,
  "handle"          TEXT,
  "displayName"     TEXT NOT NULL,
  "blurb"           TEXT NOT NULL,
  "subscriberBand"  TEXT,
  "verified"        BOOLEAN NOT NULL DEFAULT false,
  "order"           INTEGER NOT NULL DEFAULT 0,
  "createdAt"       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt"       DATETIME NOT NULL
);

CREATE UNIQUE INDEX "YtChannelRec_lang_channelId_key"
  ON "YtChannelRec"("lang", "channelId");

CREATE INDEX "YtChannelRec_lang_categorySlug_idx"
  ON "YtChannelRec"("lang", "categorySlug");
