/**
 * Wave 17 regression guard: every `styles.X` a component uses must exist
 * in the CSS module it imports. /sentences silently lost all its styling
 * when the Wave 11 /words rewrite deleted classes it borrowed.
 */

import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = path.resolve(__dirname, "../..");

const PAIRS: Array<[string, string]> = [
  ["src/components/sentences/SentencesExplorer.tsx", "src/components/sentences/Sentences.module.css"],
  ["src/components/words/WordsExplorer.tsx", "src/components/words/Words.module.css"],
  ["src/components/library/RecentlyWatched.tsx", "src/components/library/Library.module.css"],
  ["src/components/settings/VoicePicker.tsx", "src/components/settings/Settings.module.css"],
];

describe("CSS module classes exist", () => {
  for (const [tsx, css] of PAIRS) {
    it(`${path.basename(tsx)} → ${path.basename(css)}`, () => {
      const src = readFileSync(path.join(ROOT, tsx), "utf8");
      const sheet = readFileSync(path.join(ROOT, css), "utf8");
      const used = new Set(Array.from(src.matchAll(/styles\.([A-Za-z0-9_]+)/g), (m) => m[1]!));
      const missing = [...used].filter((c) => !new RegExp(`\\.${c}(?![A-Za-z0-9_-])`).test(sheet));
      expect(missing).toEqual([]);
    });
  }

  it("no raw hex colours in Wave 17 CSS", () => {
    for (const css of [
      "src/components/sentences/Sentences.module.css",
      "src/components/words/Words.module.css",
      "src/components/library/Library.module.css",
    ]) {
      const sheet = readFileSync(path.join(ROOT, css), "utf8");
      expect(sheet.match(/#[0-9a-fA-F]{3,8}\b/g) ?? [], css).toEqual([]);
    }
  });
});
