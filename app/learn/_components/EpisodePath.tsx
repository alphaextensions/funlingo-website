"use client";

import Link from "next/link";
import { Check, Lock, Play, Trophy } from "lucide-react";
import { FINALE_PASS_PCT } from "@/lib/path/constants";
import { findEpisode } from "@/lib/path/course";
import { episodeProgress, finaleKey, sceneStatus } from "@/lib/path/progress";
import type { Course } from "@/lib/path/schema";
import { LearnShell, PrimaryLink, ProgressRing } from "./ui";
import { usePath } from "./usePath";

// One episode as a vertical run of scenes ending in the finale.
export default function EpisodePath({ course, episodeId }: { course: Course; episodeId: string }) {
  const { state } = usePath();
  const found = findEpisode(course, episodeId);
  if (!found) return null;
  const { episode, index } = found;
  const p = episodeProgress(course, episode, state);
  const finale = state.finales[finaleKey(course.id, episode.id)];
  const nextScene = episode.scenes.find((_, i) => sceneStatus(course, episode, i, state) === "open");
  const base = `/learn/${course.id}/${episode.id}`;

  return (
    <LearnShell>
      <Link href={`/learn/${course.id}`} className="text-[14px] font-medium" style={{ color: "var(--text-dim)" }}>
        All episodes
      </Link>

      <header className="mt-6 flex items-start justify-between gap-6">
        <div>
          <p className="text-[15px] font-semibold" style={{ color: "var(--pink)" }}>
            Episode {index + 1}
          </p>
          <h1 className="mt-1 text-[32px] min-[560px]:text-[42px] font-bold leading-[1.1] tracking-[-0.02em]">
            {episode.title}
          </h1>
        </div>
        <ProgressRing pct={p.finalePassed ? 100 : p.pct} size={64} />
      </header>

      <div className="mt-6">
        {p.finalePassed ? (
          <PrimaryLink href={`/learn/${course.id}`}>Back to the season</PrimaryLink>
        ) : nextScene ? (
          <PrimaryLink href={`${base}/${nextScene.id}`}>{p.done === 0 ? "Play scene 1" : "Play the next scene"}</PrimaryLink>
        ) : (
          <PrimaryLink href={`${base}/finale`}>Take the finale</PrimaryLink>
        )}
      </div>

      <ol className="mt-10 relative">
        {episode.scenes.map((scene, i) => {
          const status = sceneStatus(course, episode, i, state);
          const body = (
            <>
              <span
                className="relative z-[1] flex h-11 w-11 shrink-0 items-center justify-center rounded-full border"
                style={
                  status === "done"
                    ? { background: "var(--grad)", borderColor: "transparent", color: "#fff" }
                    : status === "open"
                      ? { background: "var(--surface)", borderColor: "var(--pink)", color: "var(--pink)" }
                      : { background: "var(--surface)", borderColor: "var(--border)", color: "var(--text-dim)" }
                }
              >
                {status === "done" ? <Check size={20} /> : status === "open" ? <Play size={18} /> : <Lock size={16} />}
              </span>
              <span className="min-w-0">
                <span className="block text-[13px]" style={{ color: "var(--text-dim)" }}>
                  Scene {i + 1}
                  {status === "locked" ? ", opens after the scene before" : ""}
                </span>
                <span className="block text-[18px] font-semibold leading-[1.3]">{scene.title}</span>
              </span>
            </>
          );
          return (
            <li key={scene.id} className="relative pb-7">
              <span aria-hidden className="absolute left-[21px] top-11 bottom-0 w-[2px]" style={{ background: "var(--border)" }} />
              {status === "locked" ? (
                <div className="flex items-center gap-4 opacity-60">{body}</div>
              ) : (
                <Link href={`${base}/${scene.id}`} className="flex items-center gap-4 rounded-[16px] focus-visible:outline-2">
                  {body}
                </Link>
              )}
            </li>
          );
        })}
        <li>
          <Link
            href={`${base}/finale`}
            className="flex items-center gap-4 rounded-[20px] border p-4 -ml-[2px]"
            style={{ background: "var(--surface)", borderColor: p.finalePassed ? "var(--pink)" : "var(--border)" }}
          >
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
              style={{ background: "var(--grad)" }}
            >
              <Trophy size={20} />
            </span>
            <span className="min-w-0">
              <span className="block text-[18px] font-semibold">Finale</span>
              <span className="block text-[13px] leading-[1.45]" style={{ color: "var(--text-dim)" }}>
                {finale?.passed
                  ? `Passed with ${finale.bestScore}%. Episode complete.`
                  : `${episode.finale.questions.length} questions. Score ${FINALE_PASS_PCT}% to finish the episode, or take it now to skip ahead.`}
              </span>
            </span>
          </Link>
        </li>
      </ol>
    </LearnShell>
  );
}
