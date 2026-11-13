/*
  Warnings:

  - Made the column `lang` on table `Activity` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateTable
CREATE TABLE "ReviewCardState" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "cardType" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "due" DATETIME NOT NULL,
    "stability" REAL NOT NULL DEFAULT 0,
    "difficulty" REAL NOT NULL DEFAULT 0,
    "reps" INTEGER NOT NULL DEFAULT 0,
    "lapses" INTEGER NOT NULL DEFAULT 0,
    "state" INTEGER NOT NULL DEFAULT 0,
    "card" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReviewCardState_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Activity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "lang" TEXT NOT NULL,
    "minutesWatch" INTEGER NOT NULL DEFAULT 0,
    "minutesRead" INTEGER NOT NULL DEFAULT 0,
    "minutesTalk" INTEGER NOT NULL DEFAULT 0,
    "reviews" INTEGER NOT NULL DEFAULT 0,
    "words" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Activity" ("date", "id", "lang", "minutesRead", "minutesTalk", "minutesWatch", "reviews", "userId", "words") SELECT "date", "id", "lang", "minutesRead", "minutesTalk", "minutesWatch", "reviews", "userId", "words" FROM "Activity";
DROP TABLE "Activity";
ALTER TABLE "new_Activity" RENAME TO "Activity";
CREATE UNIQUE INDEX "Activity_userId_date_lang_key" ON "Activity"("userId", "date", "lang");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE INDEX "ReviewCardState_userId_lang_due_idx" ON "ReviewCardState"("userId", "lang", "due");

-- CreateIndex
CREATE UNIQUE INDEX "ReviewCardState_userId_cardType_cardId_key" ON "ReviewCardState"("userId", "cardType", "cardId");
