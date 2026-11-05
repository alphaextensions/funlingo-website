// Pure-ESM seed. Run with:  node scripts/seed-content.mjs
// Idempotent — rerun safely.
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: "seed@fun-learning.local" },
    update: {},
    create: {
      email: "seed@fun-learning.local",
      name: "Seed User",
      nativeLang: "en",
      activeLearningLang: "ja",
      uiLocale: "en",
      dailyGoalType: "reviews",
      dailyGoalValue: 20,
    },
  });

  const yt = await prisma.source.upsert({
    where: { id: "seed-yt-1" },
    update: {},
    create: {
      id: "seed-yt-1",
      type: "youtube_video",
      externalId: "dQw4w9WgXcQ",
      title: "A classic Japanese comedy sketch",
      lang: "ja",
      level: "B1",
      durationSec: 583,
      meta: JSON.stringify({
        channel: "Japanese TV",
        channelId: "UC-seed-channel",
        platform: "YouTube",
      }),
    },
  });

  await prisma.follow.upsert({
    where: {
      userId_kind_externalId: {
        userId: user.id,
        kind: "youtube_channel",
        externalId: "UC-seed-channel",
      },
    },
    update: {},
    create: {
      userId: user.id,
      kind: "youtube_channel",
      externalId: "UC-seed-channel",
      title: "Japanese TV",
      lang: "ja",
    },
  });

  await prisma.progressSnapshot.upsert({
    where: { userId_sourceId: { userId: user.id, sourceId: yt.id } },
    update: { positionSec: 184, percent: 0.316 },
    create: { userId: user.id, sourceId: yt.id, positionSec: 184, percent: 0.316 },
  });

  const seedWords = [
    { lemma: "面白い", pos: "adj", line: "この話は面白いですね。", translation: "This story is interesting." },
    { lemma: "初めまして", pos: "phrase", line: "初めまして、よろしくお願いします。", translation: "Nice to meet you." },
    { lemma: "難しい", pos: "adj", line: "日本語は難しいけど、楽しい。", translation: "Japanese is hard but fun." },
  ];
  for (const w of seedWords) {
    const existing = await prisma.userWord.findFirst({
      where: { userId: user.id, lemma: w.lemma, lang: "ja" },
    });
    const word =
      existing ??
      (await prisma.userWord.create({
        data: { userId: user.id, lemma: w.lemma, pos: w.pos, lang: "ja", state: "learning" },
      }));
    const encCount = await prisma.encounter.count({ where: { userWordId: word.id } });
    if (encCount === 0) {
      await prisma.encounter.create({
        data: {
          userId: user.id,
          userWordId: word.id,
          sourceId: yt.id,
          platform: "YouTube",
          lang: "ja",
          timestampSec: 65,
          line: w.line,
          translation: w.translation,
        },
      });
    }
  }

  const sentCount = await prisma.sentence.count({ where: { userId: user.id } });
  if (sentCount === 0) {
    await prisma.sentence.createMany({
      data: [
        {
          userId: user.id,
          sourceId: yt.id,
          lang: "ja",
          text: "この話は面白いですね。",
          translation: "This story is interesting.",
          timestampSec: 65,
          lists: "favorite,dictation",
        },
        {
          userId: user.id,
          sourceId: yt.id,
          lang: "ja",
          text: "もう一度言ってください。",
          translation: "Please say that again.",
          timestampSec: 120,
          lists: "speaking",
        },
      ],
    });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 60; i += 1) {
    const d = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
    const skip = (i % 3) === 1;
    if (skip) continue;
    await prisma.activity.upsert({
      where: { userId_date_lang: { userId: user.id, date: d, lang: "ja" } },
      update: {},
      create: {
        userId: user.id,
        date: d,
        lang: "ja",
        minutesWatch: 8 + (i % 5),
        reviews: 10 + (i % 7),
        words: (i % 4),
      },
    });
  }
  const seedLang = user.activeLearningLang ?? "en";
  await prisma.streak.upsert({
    where: { userId_lang: { userId: user.id, lang: seedLang } },
    update: { current: 5, best: 12, freezes: 1, lastActiveDate: today },
    create: { userId: user.id, lang: seedLang, current: 5, best: 12, freezes: 1, lastActiveDate: today },
  });

  await prisma.pack.upsert({
    where: { id: "seed-pack-sent-daily" },
    update: {},
    create: {
      id: "seed-pack-sent-daily",
      kind: "sentence",
      lang: "ja",
      title: "Daily Japanese: 50 everyday sentences",
      level: "A2",
      category: "Daily",
      meta: JSON.stringify({ blurb: "Hello, thanks, see you — the lines you use every day.", itemCount: 50 }),
    },
  });
  // Previously seeded an empty "Office slang from Aggretsuko" show pack (0
  // items) — it shipped a card that led to a blank pack. Remove it so it no
  // longer appears, and clean up any row a prior seed left behind.
  await prisma.packItem.deleteMany({ where: { packId: "seed-pack-show-aggretsuko" } });
  await prisma.pack.deleteMany({ where: { id: "seed-pack-show-aggretsuko" } });

  console.log("Seeded user:", user.email, user.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
