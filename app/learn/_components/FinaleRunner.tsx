"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { track } from "@/app/_components/track";
import { FINALE_PASS_PCT } from "@/lib/path/constants";
import { findEpisode } from "@/lib/path/course";
import { makeEvent } from "@/lib/path/events";
import { testOutEvents } from "@/lib/path/progress";
import type { Course } from "@/lib/path/schema";
import { ThemeArt } from "./art/ThemeArt";
import { RunnerFrame } from "./RunnerFrame";
import { PrimaryButton, PrimaryLink, SecondaryLink } from "./ui";
import { usePath } from "./usePath";

export default function FinaleRunner({ course, episodeId }: { course: Course; episodeId: string }) {
  const { state, record } = usePath();
  const found = findEpisode(course, episodeId);
  const [i, setI] = React.useState(0);
  const [answers, setAnswers] = React.useState<number[]>([]);
  const [picked, setPicked] = React.useState<number | null>(null);
  const [result, setResult] = React.useState<{ score: number; passed: boolean } | null>(null);
  if (!found) return null;

  const { episode, season, index } = found;
  const { questions } = episode.finale;
  const passPct = FINALE_PASS_PCT;
  const q = questions[i];
  const last = i === questions.length - 1;
  const base = `/learn/${course.id}/${episode.id}`;
  const nextEpisode = season.episodes[index + 1];

  const next = () => {
    if (picked === null) return;
    const all = [...answers, picked];
    if (!last) {
      setAnswers(all);
      setPicked(null);
      setI((n) => n + 1);
      return;
    }
    const correct = all.filter((a, qi) => a === questions[qi].answer).length;
    const score = Math.round((correct / questions.length) * 100);
    const passed = score >= passPct;
    record([
      makeEvent("finale_done", course.id, episode.id, { score, answers: all }),
      ...(passed ? testOutEvents(course, episode, state, score) : []),
    ]);
    track("path_finale_done", { course: course.id, episode: episode.id, score, passed });
    setResult({ score, passed });
  };

  const retry = () => {
    setI(0);
    setAnswers([]);
    setPicked(null);
    setResult(null);
  };

  if (result) {
    return (
      <RunnerFrame exitHref={base} steps={questions.length} current={questions.length}>
        {result.passed && <ThemeArt theme={episode.theme} rounded={24} aspect={3.4} className="mb-6 w-full h-[150px] min-[560px]:h-[190px]" />}
        <h1 className="text-[30px] font-bold leading-[1.15]">{result.passed ? "Passed. Episode complete." : "Almost there."}</h1>
        <p className="mt-2 text-[17px]" style={{ color: "var(--text-dim)" }}>
          {result.passed
            ? `You scored ${result.score}%. Every scene in “${episode.title}” is now marked done.`
            : `You scored ${result.score}%; ${passPct}% finishes the episode. Replay a scene or two, then try again.`}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {result.passed ? (
            nextEpisode ? (
              <PrimaryLink href={`/learn/${course.id}/${nextEpisode.id}`}>Start episode {index + 2}</PrimaryLink>
            ) : (
              <PrimaryLink href={`/learn/${course.id}`}>Back to the season</PrimaryLink>
            )
          ) : (
            <PrimaryButton onClick={retry}>Try the finale again</PrimaryButton>
          )}
          <SecondaryLink href={base}>Back to the episode</SecondaryLink>
        </div>
      </RunnerFrame>
    );
  }

  return (
    <RunnerFrame exitHref={base} steps={questions.length} current={i}>
      <p className="text-[15px] font-semibold" style={{ color: "var(--pink)" }}>
        Finale, question {i + 1} of {questions.length}
      </p>
      <h1 className="mt-2 text-[24px] min-[560px]:text-[28px] font-bold leading-[1.25]">{q.prompt}</h1>
      <div className="mt-6 grid gap-3">
        {q.options.map((option, oi) => {
          const state = picked === null ? "idle" : oi === q.answer ? "right" : oi === picked ? "wrong" : "idle";
          return (
            <button
              key={oi}
              type="button"
              disabled={picked !== null}
              onClick={() => setPicked(oi)}
              className="flex min-h-14 items-center justify-between gap-3 rounded-[16px] border px-5 py-3 text-left text-[16px] font-semibold"
              style={{
                background: state === "right" ? "rgba(34,197,94,.14)" : state === "wrong" ? "rgba(239,68,68,.12)" : "var(--surface)",
                borderColor: state === "right" ? "#22c55e" : state === "wrong" ? "#ef4444" : "var(--border)",
                color: "var(--text)",
                opacity: picked !== null && state === "idle" ? 0.55 : 1,
              }}
            >
              <span>{option}</span>
              {state === "right" && <Check size={18} color="#22c55e" aria-label="Correct" />}
              {state === "wrong" && <X size={18} color="#ef4444" aria-label="Not this one" />}
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {picked === null ? "" : picked === q.answer ? "Correct." : `Not quite. The answer is ${q.options[q.answer]}.`}
      </p>
      <div className="mt-6 flex gap-3 min-h-12">
        {picked !== null && <PrimaryButton onClick={next}>{last ? "See my score" : "Next question"}</PrimaryButton>}
        {i === 0 && picked === null && <SecondaryLink href={base}>Not now</SecondaryLink>}
      </div>
    </RunnerFrame>
  );
}
