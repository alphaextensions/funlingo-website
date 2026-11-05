/**
 * Wave 5 content seeding — persists compiled Talk topics + lessons into Prisma.
 *
 * Source: Funlingo extension's bundled catalogs — Funlingo-authored content
 * (data/seed/situations.json + situations-2.json). LEGAL.md: safe to persist
 * (our own writing, not third-party captions).
 *
 * Idempotent — reruns upsert by (TalkTopic.id, TalkLesson.id). Those ids are
 * deterministic (`topic:v2:{localeTag}:{situationSlug}` /
 * `lesson:v2:{localeTag}:{situationSlug}:{lessonSlug}`), so re-running after a
 * data refresh updates the row in place rather than appending.
 *
 * Run:
 *   pnpm tsx scripts/seed-talk.ts
 */

import { PrismaClient } from "@prisma/client";
import { SEEDED_TOPICS, SEEDED_TOPIC_LANG } from "../src/lib/talk/seedCatalog";

const prisma = new PrismaClient();

async function main() {
  let topicCount = 0;
  let lessonCount = 0;

  for (let i = 0; i < SEEDED_TOPICS.length; i += 1) {
    const topic = SEEDED_TOPICS[i]!;
    const lang = SEEDED_TOPIC_LANG[topic.id] ?? "en";

    await prisma.talkTopic.upsert({
      where: { id: topic.id },
      update: {
        slug: topic.slug,
        lang,
        category: topic.category,
        title: topic.title,
        emoji: topic.emoji,
        order: i,
      },
      create: {
        id: topic.id,
        slug: topic.slug,
        lang,
        category: topic.category,
        title: topic.title,
        emoji: topic.emoji,
        order: i,
      },
    });
    topicCount += 1;

    for (let j = 0; j < topic.lessons.length; j += 1) {
      const lesson = topic.lessons[j]!;
      await prisma.talkLesson.upsert({
        where: { id: lesson.id },
        update: {
          slug: lesson.slug,
          topicId: topic.id,
          title: lesson.title,
          scene: lesson.scene,
          roles: JSON.stringify({ ai: lesson.aiRole, user: lesson.userRole }),
          tasks: JSON.stringify(lesson.tasks),
          shadowSentences: JSON.stringify(lesson.shadowSentences),
          order: j,
        },
        create: {
          id: lesson.id,
          slug: lesson.slug,
          topicId: topic.id,
          title: lesson.title,
          scene: lesson.scene,
          roles: JSON.stringify({ ai: lesson.aiRole, user: lesson.userRole }),
          tasks: JSON.stringify(lesson.tasks),
          shadowSentences: JSON.stringify(lesson.shadowSentences),
          order: j,
        },
      });
      lessonCount += 1;
    }
  }

  console.log(`[seed-talk] Upserted ${topicCount} topics, ${lessonCount} lessons.`);
  const perLang: Record<string, number> = {};
  for (const t of SEEDED_TOPICS) {
    const lang = SEEDED_TOPIC_LANG[t.id] ?? "en";
    perLang[lang] = (perLang[lang] ?? 0) + 1;
  }
  console.log("[seed-talk] Per-lang topic counts:", perLang);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
