import { notFound } from "next/navigation";
import Link from "next/link";
import type { Route } from "next";
import { findLesson } from "@/lib/talk/topics";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import { localizeLessonTitle, localizeLessonScene } from "@/lib/i18n/contentLocalize";
import { prisma } from "@/server/db";
import { EmptyState } from "@/components/EmptyState";
import { PageHeader } from "@/components/PageHeader";
import { LessonChat } from "./LessonChat";
import styles from "./page.module.css";

export default async function TalkLessonPage({
  params,
  searchParams,
}: {
  params: Promise<{ topicSlug: string; lessonSlug: string }>;
  searchParams: Promise<{ dev_user?: string; lang?: string }>;
}) {
  const { topicSlug, lessonSlug } = await params;
  const sp = await searchParams;
  const match = findLesson(topicSlug, lessonSlug);
  if (!match) notFound();
  const { topic, lesson } = match;

  // Dev-only ?dev_user= bypass (mirrors /talk index + /review page). Lets
  // us walk a signed-in lesson chat in local dev without Google OAuth.
  let viewer = await getViewer();
  if (
    !viewer.userId &&
    process.env.NODE_ENV !== "production" &&
    typeof sp.dev_user === "string" &&
    sp.dev_user.length > 0
  ) {
    const devUser = await prisma.user.findUnique({ where: { id: sp.dev_user } });
    if (devUser) {
      viewer = {
        userId: devUser.id,
        user: devUser,
        activeLang: sp.lang ?? devUser.activeLearningLang ?? "en",
        nativeLang: devUser.nativeLang ?? "en",
      };
    }
  }
  const lang = viewer.user?.activeLearningLang ?? "en";
  // Chrome = native lang; lesson content + LessonChat `lang` = learning lang.
  const t = getT(viewer);
  // Lesson name + scene render in the viewer's NATIVE language (seed content,
  // stored English, mapped at render time). Topic title stays in the learning
  // language. Falls back to the stored English for unmapped (hard-coded) topics.
  const lessonTitle = localizeLessonTitle(t, topic.id, lesson.slug, lesson.title);
  const lessonScene = localizeLessonScene(t, topic.id, lesson.slug, lesson.scene);

  // Wave 13 PM BLOCKER-21: the lesson deep-route used to render the full
  // LessonChat for signed-out visitors — Start → 401 → generic toast with
  // no recourse. Mirror the Talk index's signed-out treatment so a
  // learner who deep-links in from a sibling site sees a clear
  // sign-in CTA instead of a half-broken chat UI.
  if (!viewer.userId) {
    return (
      <>
        <PageHeader eyebrow={t("talkLesson.signedOutEyebrow")} title={t("talkLesson.signedOutTitle")} />
        <EmptyState
          eyebrow={topic.title}
          title={lessonTitle}
          body={t("talkLesson.signedOutBody")}
          actions={[
            { href: "/account" as Route, label: t("talk.actionSignIn") },
            { href: "/talk" as Route, label: t("talkLesson.browseTopics"), variant: "secondary" },
          ]}
        />
      </>
    );
  }

  return (
    <div className={styles.wrap}>
      <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
        <Link href="/talk">{t("talkLesson.breadcrumbRoot")}</Link>
        <span aria-hidden="true"> › </span>
        <span>{topic.title}</span>
        <span aria-hidden="true"> › </span>
        <span className={styles.breadCurrent}>{lessonTitle}</span>
      </nav>
      <header className={styles.header}>
        <div className={styles.headSide}>
          <span className={styles.eyebrow}>{t("talkLesson.eyebrow")}</span>
          <h1 className={styles.title}>{lessonTitle}</h1>
          <p className={styles.scene}>{lessonScene}</p>
          <dl className={styles.roles}>
            <div>
              <dt>{t("talkLesson.youPlay")}</dt>
              <dd>{lesson.userRole}</dd>
            </div>
            <div>
              <dt>{t("talkLesson.aiPlays")}</dt>
              <dd>{lesson.aiRole}</dd>
            </div>
          </dl>
          <section className={styles.tasks} aria-labelledby="task-head">
            <h2 id="task-head" className={styles.tasksHead}>
              {t("talkLesson.tryTo")}
            </h2>
            <ul>
              {lesson.tasks.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        </div>
        <LessonChat
          topicSlug={topic.slug}
          lessonSlug={lesson.slug}
          lessonId={lesson.id}
          lessonTitle={lessonTitle}
          lessonScene={lesson.scene}
          aiRole={lesson.aiRole}
          userRole={lesson.userRole}
          tasks={lesson.tasks}
          shadowSentences={lesson.shadowSentences}
          lang={lang}
          opener={lesson.opener}
        />
      </header>
    </div>
  );
}
