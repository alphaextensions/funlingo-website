-- AlterTable
ALTER TABLE "Book" ADD COLUMN "coverUrl" TEXT;
ALTER TABLE "Book" ADD COLUMN "sourceUrl" TEXT;

-- CreateTable
CREATE TABLE "TalkTopic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "lang" TEXT,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "emoji" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "TalkLesson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "scene" TEXT NOT NULL,
    "roles" TEXT NOT NULL DEFAULT '{}',
    "tasks" TEXT NOT NULL DEFAULT '[]',
    "shadowSentences" TEXT NOT NULL DEFAULT '[]',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TalkLesson_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "TalkTopic" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TalkTurn" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "lessonId" TEXT,
    "role" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "translation" TEXT,
    "helpLevel" INTEGER NOT NULL DEFAULT 0,
    "correction" TEXT,
    "speechScore" TEXT,
    "at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "TalkTurn_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "TalkSession" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TalkTurn_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "TalkLesson" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TalkSession" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "lessonId" TEXT,
    "lang" TEXT NOT NULL,
    "difficulty" TEXT,
    "startedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" DATETIME,
    "report" TEXT,
    CONSTRAINT "TalkSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TalkSession_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "TalkLesson" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_TalkSession" ("difficulty", "endedAt", "id", "lang", "lessonId", "report", "startedAt", "userId") SELECT "difficulty", "endedAt", "id", "lang", "lessonId", "report", "startedAt", "userId" FROM "TalkSession";
DROP TABLE "TalkSession";
ALTER TABLE "new_TalkSession" RENAME TO "TalkSession";
CREATE INDEX "TalkSession_userId_lang_idx" ON "TalkSession"("userId", "lang");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "TalkTopic_slug_key" ON "TalkTopic"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "TalkLesson_topicId_slug_key" ON "TalkLesson"("topicId", "slug");

-- CreateIndex
CREATE INDEX "TalkTurn_sessionId_at_idx" ON "TalkTurn"("sessionId", "at");

-- CreateIndex
CREATE INDEX "Book_ownerUserId_idx" ON "Book"("ownerUserId");

-- CreateIndex
CREATE INDEX "Book_source_lang_idx" ON "Book"("source", "lang");
