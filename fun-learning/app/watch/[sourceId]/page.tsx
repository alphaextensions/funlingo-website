/**
 * Server component for /watch/[sourceId].
 *
 * Loads the Source + the authenticated user's active learning language.
 * Captions are NOT fetched here — they live in the client component's
 * session memory (LEGAL rule: no server-side caption caching).
 *
 * The URL param can be either:
 *   - A `cuid` for a Source row in Prisma.
 *   - A YouTube video id (11 chars, no "_" required). We lazy-create a
 *     Source row for it so VideoSession etc. have an FK target. Metadata
 *     is left empty; the Chrome extension or an admin can hydrate it
 *     later.
 *   - The literal "demo" — returns a bundled test video + captions so the
 *     end-to-end lane works without any seed data.
 */

import { notFound } from "next/navigation";
import { prisma } from "@/server/db";
import { auth } from "@/server/auth";
import { WatchClient } from "@/components/watch/WatchClient";
import type { Caption, SourceMeta, WatchPageData } from "@/lib/watch/types";
import { getViewer } from "@/server/session";
import { chromeLocale } from "@/server/i18n";
import { watchClientSlice } from "@/lib/i18n/catalog";
import { I18nProvider } from "@/lib/i18n/client";

export const dynamic = "force-dynamic";

const YT_ID = /^[A-Za-z0-9_-]{11}$/;

// A tiny bundled demo caption track in the public domain (NASA audio
// "we choose to go to the moon" paraphrase, OUR OWN WRITING for the test
// — not a copyrighted script). Used only for the /watch/demo route.
const DEMO_CAPTIONS: Caption[] = [
  { index: 0, startSec: 1, endSec: 4.5, text: "We choose to learn languages." },
  { index: 1, startSec: 4.5, endSec: 8.0, text: "Not because it is easy, but because it is fun." },
  { index: 2, startSec: 8.0, endSec: 12.0, text: "We break the ice with every new word." },
  { index: 3, startSec: 12.0, endSec: 16.5, text: "Same old, same old — until today." },
  { index: 4, startSec: 16.5, endSec: 20.5, text: "How have you been with your studies?" },
  { index: 5, startSec: 20.5, endSec: 25.0, text: "Honestly, I've been better, but I'll keep going." },
  { index: 6, startSec: 25.0, endSec: 30.0, text: "Carry out one more lesson, then take a break." },
];

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ sourceId: string }>;
  searchParams: Promise<{ t?: string }>;
}) {
  const { sourceId } = await params;
  const sp = await searchParams;
  // ?t=<seconds> overrides the per-user resume position so a learner clicking
  // "Rewatch this scene" from a Review flashcard lands at the saved moment.
  // Non-numeric or negative values are ignored.
  const tParam = sp.t ? Number.parseFloat(sp.t) : NaN;
  const explicitStartSec =
    Number.isFinite(tParam) && tParam >= 0 ? Math.floor(tParam) : null;

  // Resolve the user. In dev with no session, fall back to a sentinel
  // learner so the Watch surface renders — writes still fail at /api
  // without auth, which is fine.
  const session = await auth().catch(() => null);
  const userId = session?.user?.id ?? null;

  // getViewer() is request-cached and reads the fl_native/fl_learning cookies
  // for signed-out visitors — reuse it both for the sentinel learner below and
  // for the chrome locale further down.
  const viewer = await getViewer();

  let user = userId
    ? await prisma.user.findUnique({ where: { id: userId } })
    : null;
  if (!user) {
    user = {
      id: "demo-user",
      email: null,
      emailVerified: null,
      name: "Demo",
      image: null,
      // Signed-out: honour the cookie-chosen languages so the demo's bundled
      // translations (DEMO_TRANSLATIONS has hi/es/ar/…) actually show for a
      // non-English native — the audience they exist for (QA 2026-10-26).
      nativeLang: viewer.nativeLang,
      uiLocale: viewer.nativeLang,
      activeLearningLang: viewer.activeLang,
      level: "B1",
      dailyGoalType: null,
      dailyGoalValue: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    };
  }

  // Resolve the source.
  const source = await resolveSource(sourceId);
  if (!source) notFound();

  // Resume position (per-user, per-source, per-lang). A `?t=` query — e.g.
  // from "Rewatch this scene" on a Review flashcard — overrides the stored
  // resume so the learner lands at the exact saved moment.
  const resumePositionSec = explicitStartSec !== null
    ? explicitStartSec
    : userId && user.activeLearningLang
      ? await prisma.videoSession
          .findFirst({
            where: {
              userId,
              sourceId: source.id,
              lang: user.activeLearningLang,
            },
            orderBy: { lastPulseAt: "desc" },
            select: { positionSec: true },
          })
          .then((v) => v?.positionSec ?? 0)
          .catch(() => 0)
      : 0;

  const data: WatchPageData = {
    sourceId: source.id,
    source: {
      id: source.id,
      type: source.type,
      title: source.title,
      lang: source.lang,
      externalId: source.externalId,
      durationSec: source.durationSec,
      meta: parseMeta(source.meta),
    },
    user: {
      id: user.id,
      nativeLang: user.nativeLang ?? "en",
      // Wave 13 B-17: a signed-in Spanish learner on `/watch/demo` saves
      // into their active-lang deck ("es"), NOT the demo clip's own
      // "en". The home lock-tiles count UserWord rows by (userId,
      // activeLang), so a demo save under "en" would leave their
      // tiles locked forever. Keep activeLearningLang authoritative;
      // never fall back to source.lang when a user has one set.
      activeLearningLang: user.activeLearningLang ?? source.lang ?? "en",
      level: (user.level as "A1" | "A2" | "B1" | "B2" | "C1" | "C2") ?? "B1",
    },
    resumePositionSec,
    isSignedIn: userId !== null,
  };

  // Wave 19 — the Watch route carries its own i18n slice (global client keys
  // PLUS the ~155 watch.* keys) so the player chrome renders in the viewer's
  // NATIVE language without bloating every other page's slice. The chrome
  // locale comes from getViewer() (reads the fl_native cookie when signed
  // out), independent of the demo clip's own language. (viewer resolved above.)
  const locale = chromeLocale(viewer);
  const slice = watchClientSlice(locale);

  return (
    <I18nProvider
      locale={locale}
      nativeLang={viewer.user?.nativeLang ?? viewer.nativeLang ?? null}
      slice={slice}
    >
      <WatchClient data={data} />
    </I18nProvider>
  );
}

async function resolveSource(sourceId: string) {
  // 1) Demo path — always works, no DB write, no third-party video.
  //    The player renders a branded "Demo mode" panel; captions auto-advance
  //    from a local timer so word-tap / WordCard / save-word all exercise
  //    their real code paths without an iframe (and without pretending any
  //    particular video is ours to show).
  if (sourceId === "demo") {
    return {
      id: "demo",
      type: "fun_learning_demo",
      title: "Try it — a 30-second demo",
      lang: "en",
      externalId: null,
      durationSec: 32,
      meta: JSON.stringify({
        demoMode: true,
        channel: "Fun Learning",
        testCaptions: DEMO_CAPTIONS,
      } satisfies SourceMeta),
    };
  }

  // 2) Try direct id lookup (cuid).
  const direct = await prisma.source.findUnique({ where: { id: sourceId } });
  if (direct) return direct;

  // 3) If sourceId looks like a YouTube video id, look up by externalId,
  //    else lazy-create a bare Source so the user can start studying it.
  if (YT_ID.test(sourceId)) {
    const existing = await prisma.source.findFirst({
      where: { type: "youtube_video", externalId: sourceId },
    });
    if (existing) return existing;
    const created = await prisma.source.create({
      data: {
        type: "youtube_video",
        externalId: sourceId,
        // We only store YouTube metadata (LEGAL §Rules for third-party
        // content). The extension or an admin may hydrate the title later.
        title: `YouTube ${sourceId}`,
        lang: "en",
        meta: JSON.stringify({ youtubeId: sourceId } satisfies SourceMeta),
      },
    });
    return created;
  }

  return null;
}

function parseMeta(raw: string | null): SourceMeta {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as SourceMeta;
  } catch {
    return {};
  }
}
