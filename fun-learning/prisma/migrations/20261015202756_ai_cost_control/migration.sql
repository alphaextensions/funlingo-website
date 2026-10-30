-- CreateTable
CREATE TABLE "BudgetMeter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "yearMonth" TEXT NOT NULL,
    "scope" TEXT NOT NULL,
    "inputTokens" INTEGER NOT NULL DEFAULT 0,
    "outputTokens" INTEGER NOT NULL DEFAULT 0,
    "microUsdSpent" INTEGER NOT NULL DEFAULT 0,
    "callCount" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "UserAiWallet" (
    "userId" TEXT NOT NULL PRIMARY KEY,
    "day" TEXT NOT NULL,
    "tokensUsedToday" INTEGER NOT NULL DEFAULT 0,
    "callsToday" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserAiWallet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AiCallCounter" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "scope" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "bucket" TEXT NOT NULL,
    "windowKey" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BudgetMeter_yearMonth_scope_key" ON "BudgetMeter"("yearMonth", "scope");

-- CreateIndex
CREATE INDEX "AiCallCounter_scope_windowKey_idx" ON "AiCallCounter"("scope", "windowKey");

-- CreateIndex
CREATE UNIQUE INDEX "AiCallCounter_scope_kind_bucket_windowKey_key" ON "AiCallCounter"("scope", "kind", "bucket", "windowKey");
