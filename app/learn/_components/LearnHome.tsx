"use client";

import { FlagSvg } from "@/sections/home/flags";
import { langName } from "@/lib/path/langs";
import { episodeProgress, nextUp } from "@/lib/path/progress";
import type { Course } from "@/lib/path/schema";
import { LearnShell, PrimaryLink, ProgressBar, SecondaryLink } from "./ui";
import { usePath } from "./usePath";

export default function LearnHome({ courses }: { courses: Course[] }) {
  const { state, hydrated } = usePath();

  return (
    <LearnShell>
      <header className="max-w-[640px]">
        <h1 className="text-[34px] min-[560px]:text-[46px] font-bold leading-[1.08] tracking-[-0.02em]">
          Learn a language the way you watch a series.
        </h1>
        <p className="mt-4 text-[17px] leading-[1.6]" style={{ color: "var(--text-dim)" }}>
          Short scenes with real conversations and dual subtitles. Each episode ends with a finale that checks what
          you picked up. No account needed: your progress stays on this device.
        </p>
      </header>

      <section className="mt-12 grid gap-5">
        {courses.map((course) => {
          const episodes = course.seasons.flatMap((s) => s.episodes);
          const scenes = episodes.reduce((n, e) => n + e.scenes.length, 0);
          const done = episodes.reduce((n, e) => n + episodeProgress(course, e, state).done, 0);
          const pct = Math.round((done / scenes) * 100);
          const next = nextUp(course, state);
          const nextEpisode = next ? episodes.findIndex((e) => e.id === next.episodeId) + 1 : null;
          return (
            <article
              key={course.id}
              className="rounded-[28px] border p-6 min-[560px]:p-8"
              style={{ background: "var(--surface)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-3">
                <FlagSvg code={course.target} w={32} h={23} />
                <h2 className="text-[24px] font-bold">{langName(course.target)}</h2>
              </div>
              <p className="mt-2 text-[15px]" style={{ color: "var(--text-dim)" }}>
                For {langName(course.native)} speakers. {course.seasons.length === 1 ? "1 season" : `${course.seasons.length} seasons`}, {episodes.length} episodes, {scenes} scenes.
              </p>
              <div className="mt-6 flex flex-col min-[560px]:flex-row min-[560px]:items-center gap-5">
                <div className="flex-1">
                  <ProgressBar pct={pct} />
                  <p className="mt-2 text-[13px]" style={{ color: "var(--text-dim)" }}>
                    {done === 0 ? "Not started yet" : next ? `${done} of ${scenes} scenes done` : "Season complete"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <PrimaryLink href={`/learn/${course.id}`}>
                    {done === 0 ? "Start episode 1" : nextEpisode ? `Continue episode ${nextEpisode}` : "See the season"}
                  </PrimaryLink>
                  {hydrated && done === 0 && (
                    <SecondaryLink href={`/learn/${course.id}/placement`}>Find my starting point</SecondaryLink>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </LearnShell>
  );
}
