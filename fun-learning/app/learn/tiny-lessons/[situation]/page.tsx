/**
 * /learn/tiny-lessons/[situation] — Wave 6 flashcards for one situation.
 *
 * Each phrase renders as a tap-to-flip card: front = phrase in the learning
 * language, back = meaning in English. 🔊 button speaks the phrase in the
 * learning language.
 */

import { notFound } from "next/navigation";
import Link from "next/link";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import { getSituation } from "@/lib/learn/content";
import { PageHeader } from "@/components/PageHeader";
import { PhraseCards } from "./PhraseCards";
import tinyStyles from "../tinyLessons.module.css";

export const dynamic = "force-dynamic";

export default async function TinyLessonPage({
  params,
}: {
  params: Promise<{ situation: string }>;
}) {
  const { situation } = await params;
  const viewer = await getViewer();
  const bundle = getSituation(viewer.activeLang, situation);
  if (!bundle) notFound();
  // Chrome = native lang. bundle.* (phrases, native title) = learning lang.
  const t = getT(viewer);

  return (
    <>
      <PageHeader
        eyebrow={<Link href="/learn/tiny-lessons" style={{ color: "inherit", textDecoration: "none" }} data-fx="tap">{t("situation.back")}</Link>}
        title={bundle.titleEn ?? bundle.title}
        lede={
          bundle.titleEn && bundle.title !== bundle.titleEn
            ? bundle.title
            : t("situation.ledeDefault")
        }
      />
      <div className={tinyStyles.phraseHero}>
        <span className={tinyStyles.phraseHeroIcon} aria-hidden="true">{bundle.icon}</span>
        <p style={{ margin: 0, color: "var(--fl-text-2)", fontSize: 14 }}>
          {t("situation.heroMeta", { n: bundle.phrases.length })}
        </p>
      </div>
      <PhraseCards
        lang={bundle.lang}
        phrases={bundle.phrases}
        situationTitle={bundle.titleEn ?? bundle.title}
      />
    </>
  );
}
