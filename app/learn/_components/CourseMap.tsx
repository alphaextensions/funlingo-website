"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { langName } from "@/lib/path/langs";
import { episodeProgress, nextUp } from "@/lib/path/progress";
import type { Course } from "@/lib/path/schema";
import { LearnShell, PrimaryLink, ProgressBar, SecondaryLink } from "./ui";
import { usePath } from "./usePath";

// The season page reads like a show's episode guide: big episode numbers, one row each.
export default function CourseMap({ course }: { course: Course }) {
  const { state, hydrated } = usePath();
  const next = nextUp(course, state);
  const notStarted = course.seasons.every((s) =>
    s.episodes.every((e) => {
      const p = episodeProgress(course, e, state);
      return p.done === 0 && !p.finalePassed;
    }),
  );
  let episodeNumber = 0;

  return (
    <LearnShell>
      <Link href="/learn" className="text-[14px] font-medium" style={{ color: "var(--text-dim)" }}>
        All courses
      </Link>

      {course.seasons.map((season, si) => (
        <section key={season.id} className="mt-6">
          <header className="grid gap-8 min-[760px]:grid-cols-[1fr_300px] items-start">
            <div>
              <p className="text-[15px] font-semibold" style={{ color: "var(--pink)" }}>
                {langName(course.target)}, season {si + 1}
              </p>
              <h1 className="mt-1 text-[34px] min-[560px]:text-[44px] font-bold leading-[1.1] tracking-[-0.02em]">
                {season.title}
              </h1>
              <span
                className="mt-4 inline-block rounded-full px-3 py-1 text-[13px] font-semibold"
                style={{ background: "var(--pink-soft)", color: "var(--pink)" }}
              >
                Level {season.cefr}
              </span>
            </div>
            <div className="rounded-[20px] border p-5" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
              <p className="text-[14px] font-semibold">By the season finale you can</p>
              <ul className="mt-3 grid gap-2">
                {season.canDo.map((line) => (
                  <li key={line} className="flex gap-2 text-[14px] leading-[1.45]" style={{ color: "var(--text-dim)" }}>
                    <Check size={16} className="mt-[2px] shrink-0" style={{ color: "var(--pink)" }} aria-hidden />
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </header>

          {si === 0 && hydrated && notStarted && (
            <div
              className="mt-8 flex flex-col min-[560px]:flex-row min-[560px]:items-center justify-between gap-4 rounded-[20px] border p-5"
              style={{ borderColor: "var(--border)", background: "var(--surface)" }}
            >
              <div>
                <p className="text-[16px] font-semibold">Know some {langName(course.target)} already?</p>
                <p className="mt-1 text-[14px]" style={{ color: "var(--text-dim)" }}>
                  A three-minute check marks the episodes you know as done.
                </p>
              </div>
              <SecondaryLink href={`/learn/${course.id}/placement`}>Find your starting point</SecondaryLink>
            </div>
          )}

          <ol className="mt-10 grid gap-4">
            {season.episodes.map((episode) => {
              episodeNumber += 1;
              const p = episodeProgress(course, episode, state);
              const isNext = next?.episodeId === episode.id;
              const complete = p.finalePassed;
              const label = complete ? "Watch again" : p.done > 0 ? "Continue" : "Start";
              return (
                <li
                  key={episode.id}
                  className="grid grid-cols-[64px_1fr] min-[560px]:grid-cols-[96px_1fr_auto] gap-x-5 gap-y-4 items-center rounded-[24px] border p-5 min-[560px]:p-6"
                  style={{
                    background: "var(--surface)",
                    borderColor: isNext ? "rgba(236,77,176,.55)" : "var(--border)",
                  }}
                >
                  <span
                    aria-hidden
                    className="text-[56px] min-[560px]:text-[80px] font-extrabold leading-none tracking-[-0.04em] text-center"
                    style={{ background: "var(--grad)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}
                  >
                    {episodeNumber}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium" style={{ color: "var(--text-dim)" }}>
                      Episode {episodeNumber}, {episode.scenes.length} scenes and a finale
                    </p>
                    <h2 className="mt-1 text-[20px] font-bold leading-[1.25]">{episode.title}</h2>
                    <div className="mt-3 flex items-center gap-3">
                      <div className="flex-1 max-w-[260px]">
                        <ProgressBar pct={complete ? 100 : p.pct} />
                      </div>
                      <span className="text-[13px]" style={{ color: "var(--text-dim)" }}>
                        {complete ? "Complete" : `${p.done}/${p.total} scenes`}
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 min-[560px]:col-span-1">
                    <PrimaryLink href={`/learn/${course.id}/${episode.id}`}>{label}</PrimaryLink>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </LearnShell>
  );
}
