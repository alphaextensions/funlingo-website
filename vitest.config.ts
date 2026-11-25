import { defineConfig } from "vitest/config";

// SKIP_DB_TESTS=1 runs only the pure tests, for machines without Postgres binaries.
const skipDb = process.env.SKIP_DB_TESTS === "1";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts", ...(skipDb ? [] : ["supabase/tests/**/*.test.ts"])],
    exclude: ["src/**", "out/**", "node_modules/**"],
    globalSetup: skipDb ? [] : ["supabase/tests/global-setup.ts"],
  },
});
