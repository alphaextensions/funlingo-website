-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "title" TEXT,
    "avatarUrl" TEXT,
    "lang" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Follow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ProgressSnapshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "positionSec" INTEGER,
    "page" INTEGER,
    "percent" REAL NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL,
    "finishedAt" DATETIME,
    CONSTRAINT "ProgressSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ProgressSnapshot_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HistoryEntry" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "lastOpenedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "HistoryEntry_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "HistoryEntry_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Favorite_sourceId_fkey" FOREIGN KEY ("sourceId") REFERENCES "Source" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kind" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "level" TEXT,
    "category" TEXT,
    "meta" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PackItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "packId" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL DEFAULT 0,
    "order" INTEGER NOT NULL DEFAULT 0,
    "kind" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "translation" TEXT,
    "audioUrl" TEXT,
    CONSTRAINT "PackItem_packId_fkey" FOREIGN KEY ("packId") REFERENCES "Pack" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "UserPackProgress" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "packId" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL DEFAULT 0,
    "itemsDone" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserPackProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserPackProgress_packId_fkey" FOREIGN KEY ("packId") REFERENCES "Pack" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "note" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CultureNote" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scope" TEXT NOT NULL,
    "refId" TEXT,
    "lang" TEXT NOT NULL,
    "nativeLang" TEXT NOT NULL,
    "anchor" TEXT,
    "kind" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Follow_userId_kind_idx" ON "Follow"("userId", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_userId_kind_externalId_key" ON "Follow"("userId", "kind", "externalId");

-- CreateIndex
CREATE INDEX "ProgressSnapshot_userId_updatedAt_idx" ON "ProgressSnapshot"("userId", "updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "ProgressSnapshot_userId_sourceId_key" ON "ProgressSnapshot"("userId", "sourceId");

-- CreateIndex
CREATE INDEX "HistoryEntry_userId_lastOpenedAt_idx" ON "HistoryEntry"("userId", "lastOpenedAt");

-- CreateIndex
CREATE UNIQUE INDEX "HistoryEntry_userId_sourceId_key" ON "HistoryEntry"("userId", "sourceId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_sourceId_key" ON "Favorite"("userId", "sourceId");

-- CreateIndex
CREATE INDEX "Pack_kind_lang_idx" ON "Pack"("kind", "lang");

-- CreateIndex
CREATE INDEX "PackItem_packId_chapter_order_idx" ON "PackItem"("packId", "chapter", "order");

-- CreateIndex
CREATE UNIQUE INDEX "UserPackProgress_userId_packId_chapter_key" ON "UserPackProgress"("userId", "packId", "chapter");

-- CreateIndex
CREATE INDEX "Bookmark_userId_bookId_idx" ON "Bookmark"("userId", "bookId");

-- CreateIndex
CREATE INDEX "CultureNote_scope_refId_lang_idx" ON "CultureNote"("scope", "refId", "lang");
