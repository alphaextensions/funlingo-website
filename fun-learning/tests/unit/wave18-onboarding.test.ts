/**
 * Wave 18 — /welcome onboarding (extension parity).
 */

import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  LEARNING_OPTIONS,
  NATIVE_OPTIONS,
  TOTAL_STEPS,
  cefrToProficiency,
  filterLanguages,
  isCefr,
  pickFromAcceptLanguage,
  proficiencyToCefr,
  shouldShowWelcome,
} from "@/lib/onboarding/flow";
import { EXT_LOCALES, extLocaleFor, tw, tx } from "@/lib/onboarding/strings";

const src = (p: string) => readFileSync(resolve(process.cwd(), p), "utf8");

describe("shouldShowWelcome gate", () => {
  const base = {
    welcomeCookie: null,
    signedIn: false,
    hasLangCookies: false,
    prefsOnboarding: undefined,
    userHasNativeLang: false,
  };
  it("shows for a brand-new signed-out visitor", () => {
    expect(shouldShowWelcome(base)).toBe(true);
  });
  it("never shows once fl_welcome is done or skipped", () => {
    expect(shouldShowWelcome({ ...base, welcomeCookie: "done" })).toBe(false);
    expect(shouldShowWelcome({ ...base, welcomeCookie: "skipped", signedIn: true })).toBe(false);
  });
  it("ignores a junk cookie value", () => {
    expect(shouldShowWelcome({ ...base, welcomeCookie: "yes" })).toBe(true);
  });
  it("treats existing LangPills cookies as already configured (ext hasConfiguredLanguages)", () => {
    expect(shouldShowWelcome({ ...base, hasLangCookies: true })).toBe(false);
  });
  it("signed-in: shows only when no prefs flag AND no saved native language", () => {
    expect(shouldShowWelcome({ ...base, signedIn: true })).toBe(true);
    expect(shouldShowWelcome({ ...base, signedIn: true, userHasNativeLang: true })).toBe(false);
    expect(shouldShowWelcome({ ...base, signedIn: true, prefsOnboarding: "done" })).toBe(false);
    expect(shouldShowWelcome({ ...base, signedIn: true, prefsOnboarding: "skipped" })).toBe(false);
  });
});

describe("proficiency ↔ CEFR", () => {
  it("maps the 3 extension pills onto SPEC §3's A1..B2 scale", () => {
    expect(proficiencyToCefr("beginner")).toBe("A1");
    expect(proficiencyToCefr("intermediate")).toBe("B1");
    expect(proficiencyToCefr("advanced")).toBe("B2");
  });
  it("round-trips and defaults to intermediate (Recommended)", () => {
    for (const p of ["beginner", "intermediate", "advanced"] as const) {
      expect(cefrToProficiency(proficiencyToCefr(p))).toBe(p);
    }
    expect(cefrToProficiency(null)).toBe("intermediate");
    expect(cefrToProficiency("Z9")).toBe("intermediate");
    expect(cefrToProficiency("c2")).toBe("advanced");
  });
  it("validates CEFR strings", () => {
    expect(isCefr("B1")).toBe(true);
    expect(isCefr("b1")).toBe(false);
    expect(isCefr("Intermediate")).toBe(false);
  });
});

describe("language search + defaults", () => {
  it("matches autonym, code and English name like the extension", () => {
    const en = (c: string) => ({ ja: "Japanese", hi: "Hindi" })[c] ?? c;
    expect(filterLanguages(LEARNING_OPTIONS, "日本", en).map((o) => o.value)).toEqual(["ja"]);
    expect(filterLanguages(LEARNING_OPTIONS, "JAPAN", en).map((o) => o.value)).toEqual(["ja"]);
    expect(filterLanguages(LEARNING_OPTIONS, "hi", en).map((o) => o.value)).toContain("hi");
    expect(filterLanguages(LEARNING_OPTIONS, "", en)).toHaveLength(LEARNING_OPTIONS.length);
    expect(filterLanguages(LEARNING_OPTIONS, "zzzz", en)).toHaveLength(0);
  });
  it("pre-fills native from Accept-Language, respecting q and the allowed list", () => {
    const allowed = NATIVE_OPTIONS.map((o) => o.value);
    expect(pickFromAcceptLanguage("hi-IN,hi;q=0.9,en;q=0.8", allowed)).toBe("hi");
    expect(pickFromAcceptLanguage("en;q=0.5,es;q=0.9", allowed)).toBe("es");
    expect(pickFromAcceptLanguage("xx-YY", allowed)).toBe("en");
    expect(pickFromAcceptLanguage(null, allowed)).toBe("en");
  });
  it("keeps the onboarding lists identical to the TopNav pills", () => {
    const nav = src("src/components/TopNav.tsx");
    for (const o of [...NATIVE_OPTIONS, ...LEARNING_OPTIONS]) {
      expect(nav).toContain(`{ value: "${o.value}", label: "${o.label}" }`);
    }
  });
});

describe("strings — reuse the extension's own translations", () => {
  it("ships the extension's 22 onboarding locales", () => {
    expect(EXT_LOCALES).toHaveLength(22);
    expect(tx("en", "onboarding.languageSetup")).toBe("Language Setup");
    expect(tx("en", "onboarding.stepOf", { current: 1, total: TOTAL_STEPS })).toBe("Step 1 of 2");
  });
  it("resolves web codes to extension locales", () => {
    expect(extLocaleFor("zh")).toBe("zh_CN");
    expect(extLocaleFor("zh-TW")).toBe("zh_TW");
    expect(extLocaleFor("pt")).toBe("pt_BR");
    expect(extLocaleFor("hi-IN")).toBe("hi");
    expect(extLocaleFor("th")).toBe("en"); // no extension translation → English
  });
  it("translates (Hindi / Spanish) and falls back to English", () => {
    expect(tx("es", "onboarding.welcomeSubtext")).toMatch(/idioma/);
    expect(tx("hi", "proficiency.beginner")).toBe("शुरुआती");
    expect(tx("th", "onboarding.save")).toBe("Save");
  });
  it("fills {native}/{learning} in the reused all-set step", () => {
    expect(tx("en", "fta.step2", { native: "Hindi", learning: "Spanish" })).toBe(
      "Subtitles appear in both Hindi and Spanish",
    );
    expect(tw("allSetSub", { learning: "Spanish" })).toContain("Spanish");
  });
});

describe("wiring", () => {
  it("/ redirects to /welcome via the gate, still rendering LearnLanding", () => {
    const home = src("app/page.tsx");
    expect(home).toContain("LearnLanding");
    expect(home).toMatch(/needsWelcome\(\)\)\s*redirect\("\/welcome"\)/);
    // /learn must NOT gate (deep links are never hijacked).
    expect(src("app/learn/page.tsx")).not.toContain("needsWelcome");
  });
  it("Settings can reopen /welcome (signed-in and signed-out)", () => {
    expect(src("src/components/settings/SettingsForm.tsx")).toContain('href="/welcome"');
    expect(src("app/settings/page.tsx")).toContain('href: "/welcome"');
  });
  it("/api/settings is idempotent and validates level + onboarding", () => {
    const route = src("app/api/settings/route.ts");
    expect(route).toContain("withIdempotency");
    expect(route).toContain("INVALID_LEVEL");
    expect(route).toContain("INVALID_ONBOARDING");
    // onboarding is persisted via the shared buildPrefsPatch() helper
    // (merged with Wave 15's prefs refactor) rather than an inline write.
    expect(route).toContain("buildPrefsPatch");
  });
  it("flow sends an idempotency key, stores cookies signed-out, leaves the feedback hook", () => {
    const flow = src("app/welcome/WelcomeFlow.tsx");
    expect(flow).toContain('"idempotency-key"');
    expect(flow).toContain("// feedback: onboarding-save");
    expect(flow).toMatch(/setCookie\(NATIVE_COOKIE/);
    expect(flow).toMatch(/setCookie\(WELCOME_COOKIE, "skipped"/);
    // Dropped extension steps stay dropped (no dead settings).
    const code = flow.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
    expect(code).not.toMatch(/Active Learning|Casual Learning|Display Controls|displayControls/);
  });
  it("CSS uses tokens only and gates motion", () => {
    const css = src("app/welcome/welcome.module.css").replace(/\/\*[\s\S]*?\*\//g, "");
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(css).not.toMatch(/rgba?\(/);
    expect(css).toContain("prefers-reduced-motion: no-preference");
    // every animation declaration lives inside the reduced-motion gate
    const gate = css.indexOf("prefers-reduced-motion: no-preference");
    const before = css.slice(0, gate);
    expect(before).not.toMatch(/animation:/);
  });
  it("no button inside a button in the flow", () => {
    for (const f of ["app/welcome/WelcomeFlow.tsx", "app/welcome/LangDropdown.tsx"]) {
      const s = src(f);
      // crude structural check: between each <button and its </button>, no other <button
      const re = /<button\b[\s\S]*?<\/button>/g;
      for (const m of s.match(re) ?? []) {
        expect(m.slice(7)).not.toMatch(/<button\b/);
      }
    }
  });
});
