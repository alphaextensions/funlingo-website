import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  // Match Next.js's automatic JSX runtime so tests can render real app
  // components (tsconfig's "jsx": "preserve" would otherwise make esbuild
  // emit classic React.createElement calls). Wave 14 markup tests.
  esbuild: { jsx: "automatic" },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
    exclude: ["tests/e2e/**", "node_modules/**"],
    setupFiles: ["tests/setup.ts"],
  },
});
