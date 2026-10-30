/**
 * /sentences — saved sentences, tabbed by list (SPEC §10).
 *
 * Tabs: Favourites · Dictation · Speaking. A sentence can be in any
 * combination; the `lists` column is a comma-joined string.
 */

import { prisma } from "@/server/db";
import { getViewer } from "@/server/session";
import { getT, chromeLocale } from "@/server/i18n";
import { pageClientSlice, SENTENCES_KEY_PREFIXES } from "@/lib/i18n/catalog";
import { I18nProvider } from "@/lib/i18n/client";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { SentencesExplorer, type SentenceRow, type SentenceList } from "@/components/sentences/SentencesExplorer";
import { SentencesTabBar } from "@/components/sentences/SentencesTabBar";

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ tab?: string }>;
}

const VALID: SentenceList[] = ["favorite", "dictation", "speaking"];

function parseTab(raw?: string): SentenceList {
  if (!raw) return "favorite";
  const lower = raw.toLowerCase();
  if ((VALID as string[]).includes(lower)) return lower as SentenceList;
  return "favorite";
}

function safeJson(raw: string): Record<string, unknown> | null {
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Talk-corrections save the Sentence with a `[talk:<turnId>] ` prefix on
 * `translation` as a back-link to the source TurnBubble. The stored string
 * stays intact (so a future "jump back to Talk" wire can parse it); only the
 * rendered translation strips it, and we expose a `fromTalk` flag so the
 * row can carry a small chip.
 */
const TALK_TRACE_RE = /^\[talk:[^\]]+\]\s*/;

async function loadSentences(userId: string, lang: string): Promise<SentenceRow[]> {
  const rows = await prisma.sentence.findMany({
    where: { userId, lang },
    include: { source: true },
    orderBy: { createdAt: "desc" },
    take: 500,
  });
  return rows.map((s) => {
    const meta = s.source?.meta ? safeJson(s.source.meta) : null;
    const lists = s.lists
      .split(",")
      .map((x) => x.trim().toLowerCase())
      .filter(Boolean);
    const rawTranslation = s.translation ?? null;
    const fromTalk =
      lists.includes("source:talk") ||
      (rawTranslation ? TALK_TRACE_RE.test(rawTranslation) : false);
    const translation = rawTranslation ? rawTranslation.replace(TALK_TRACE_RE, "") : null;
    return {
      id: s.id,
      text: s.text,
      translation: translation && translation.length > 0 ? translation : null,
      lists,
      createdAt: s.createdAt.toISOString(),
      timestampSec: s.timestampSec,
      sourceTitle: s.source?.title ?? null,
      sourcePlatform: (meta?.platform as string | undefined) ?? null,
      thumbnail: (meta?.thumbnail as string | undefined) ?? null,
      fromTalk,
    };
  });
}

export default async function SentencesPage({ searchParams }: Props) {
  const resolved = (await searchParams) ?? {};
  const tab = parseTab(resolved.tab);
  const viewer = await getViewer();
  const t = getT(viewer);
  const locale = chromeLocale(viewer);
  const slice = pageClientSlice(locale, SENTENCES_KEY_PREFIXES);
  const nativeLang = viewer.user?.nativeLang ?? viewer.nativeLang ?? null;
  if (!viewer.userId) {
    return (
      <I18nProvider locale={locale} nativeLang={nativeLang} slice={slice}>
        <PageHeader eyebrow={t("sentences.eyebrow")} title={t("sentences.title")} />
        <EmptyState
          eyebrow={t("sentences.signedOutEyebrow")}
          title={t("sentences.signedOutTitle")}
          body={t("sentences.signedOutBody")}
          actions={[
            { href: "/account" as never, label: t("sentences.signIn") },
            { href: "/library" as never, label: t("sentences.browseLibrary"), variant: "secondary" },
          ]}
        />
      </I18nProvider>
    );
  }
  const rows = await loadSentences(viewer.userId, viewer.activeLang);
  const counts = countByList(rows);

  return (
    <I18nProvider locale={locale} nativeLang={nativeLang} slice={slice}>
      <PageHeader
        eyebrow={t("sentences.eyebrow")}
        title={t("sentences.title")}
        lede={t("sentences.lede")}
      />
      <SentencesTabBar counts={counts} />
      <SentencesExplorer rows={rows} mode={tab} lang={viewer.activeLang} />
    </I18nProvider>
  );
}

function countByList(rows: SentenceRow[]): Record<SentenceList, number> {
  const out: Record<SentenceList, number> = { favorite: 0, dictation: 0, speaking: 0 };
  rows.forEach((r) => {
    r.lists.forEach((l) => {
      if ((VALID as string[]).includes(l)) {
        out[l as SentenceList] += 1;
      }
    });
  });
  return out;
}
