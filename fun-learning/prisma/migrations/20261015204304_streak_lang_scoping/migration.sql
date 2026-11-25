/*
  Warnings:

  - The primary key for the `Streak` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `lang` to the `Streak` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Streak" (
    "userId" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "current" INTEGER NOT NULL DEFAULT 0,
    "best" INTEGER NOT NULL DEFAULT 0,
    "freezes" INTEGER NOT NULL DEFAULT 0,
    "lastActiveDate" DATETIME,

    PRIMARY KEY ("userId", "lang"),
    CONSTRAINT "Streak_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Streak" ("best", "current", "freezes", "lastActiveDate", "userId") SELECT "best", "current", "freezes", "lastActiveDate", "userId" FROM "Streak";
DROP TABLE "Streak";
ALTER TABLE "new_Streak" RENAME TO "Streak";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
