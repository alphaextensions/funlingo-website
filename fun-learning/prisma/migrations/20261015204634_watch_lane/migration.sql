-- CreateTable
CREATE TABLE "VideoSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "positionSec" INTEGER NOT NULL DEFAULT 0,
    "durationSec" INTEGER,
    "percent" REAL NOT NULL DEFAULT 0,
    "mode" TEXT NOT NULL DEFAULT 'default',
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastPulseAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" DATETIME,
    CONSTRAINT "VideoSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "VideoSession_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CultureNoteCache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sourceId" TEXT NOT NULL,
    "lineHash" TEXT NOT NULL,
    "sourceLang" TEXT NOT NULL,
    "nativeLang" TEXT NOT NULL,
    "notesJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freshness" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "WordCardCache" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lemma" TEXT NOT NULL,
    "srcLang" TEXT NOT NULL,
    "tgtLang" TEXT NOT NULL,
    "cardJson" TEXT NOT NULL,
    "freshness" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "VideoSession_userId_lang_idx" ON "VideoSession"("userId", "lang");

-- CreateIndex
CREATE INDEX "VideoSession_userId_sourceId_idx" ON "VideoSession"("userId", "sourceId");

-- CreateIndex
CREATE INDEX "CultureNoteCache_sourceId_idx" ON "CultureNoteCache"("sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "CultureNoteCache_sourceId_lineHash_sourceLang_nativeLang_key" ON "CultureNoteCache"("sourceId", "lineHash", "sourceLang", "nativeLang");

-- CreateIndex
CREATE UNIQUE INDEX "WordCardCache_lemma_srcLang_tgtLang_key" ON "WordCardCache"("lemma", "srcLang", "tgtLang");
