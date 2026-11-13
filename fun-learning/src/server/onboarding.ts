/**
 * Wave 18 — server side of the `/welcome` onboarding: the show-once gate used
 * by `/`, and the initial values `/welcome` pre-fills.
 */

import { getViewer, type Viewer } from "@/server/session";
import { getPrefs } from "@/server/prefs";
import {
  LEARNING_COOKIE,
  LEARNING_OPTIONS,
  LEVEL_COOKIE,
  NATIVE_COOKIE,
  NATIVE_OPTIONS,
  WELCOME_COOKIE,
  cefrToProficiency,
  pickFromAcceptLanguage,
  shouldShowWelcome,
  type Proficiency,
} from "@/lib/onboarding/flow";

interface Jar {
  welcome: string | null;
  native: string | null;
  learning: string | null;
  level: string | null;
  acceptLanguage: string | null;
}

async function readJar(): Promise<Jar> {
  try {
    const { cookies, headers } = await import("next/headers");
    const jar = await cookies();
    const h = await headers();
    return {
      welcome: jar.get(WELCOME_COOKIE)?.value ?? null,
      native: jar.get(NATIVE_COOKIE)?.value ?? null,
      learning: jar.get(LEARNING_COOKIE)?.value ?? null,
      level: jar.get(LEVEL_COOKIE)?.value ?? null,
      acceptLanguage: h.get("accept-language"),
    };
  } catch {
    return { welcome: null, native: null, learning: null, level: null, acceptLanguage: null };
  }
}

/** Gate for `/`. Never throws — on any failure, don't redirect. */
export async function needsWelcome(viewer?: Viewer): Promise<boolean> {
  try {
    const v = viewer ?? (await getViewer());
    const jar = await readJar();
    const prefs = v.userId ? await getPrefs(v.userId) : null;
    return shouldShowWelcome({
      welcomeCookie: jar.welcome,
      signedIn: Boolean(v.userId),
      hasLangCookies: Boolean(jar.native || jar.learning),
      prefsOnboarding: prefs?.onboarding,
      userHasNativeLang: Boolean(v.user?.nativeLang),
    });
  } catch {
    return false;
  }
}

export interface WelcomeInitial {
  signedIn: boolean;
  native: string;
  learning: string;
  proficiency: Proficiency;
}

const NATIVE_VALUES = NATIVE_OPTIONS.map((o) => o.value);
const LEARNING_VALUES = LEARNING_OPTIONS.map((o) => o.value);

/** Pre-fill for `/welcome`: saved choices, else browser language + "en" (extension defaults). */
export async function welcomeInitial(): Promise<WelcomeInitial> {
  const v = await getViewer();
  const jar = await readJar();
  const savedNative = v.user?.nativeLang ?? jar.native;
  const savedLearning = v.user?.activeLearningLang ?? jar.learning;
  const native =
    savedNative && NATIVE_VALUES.includes(savedNative)
      ? savedNative
      : pickFromAcceptLanguage(jar.acceptLanguage, NATIVE_VALUES, "en");
  const learning = savedLearning && LEARNING_VALUES.includes(savedLearning) ? savedLearning : "en";
  return {
    signedIn: Boolean(v.userId),
    native,
    learning,
    proficiency: cefrToProficiency(v.user?.level ?? jar.level),
  };
}
