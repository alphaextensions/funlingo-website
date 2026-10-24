"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { track } from "@/app/_components/track";
import { langName } from "@/lib/path/langs";
import { buildPlacement, type PlacementResult, placementEvents, scoreStep, stepPassed } from "@/lib/path/placement";
import type { Course } from "@/lib/path/schema";
import { RunnerFrame } from "./RunnerFrame";
import { PrimaryButton, PrimaryLink, SecondaryButton, SecondaryLink } from "./ui";
import { usePath } from "./usePath";

type Phase = "intro" | "quiz" | "result";

// "Which episode should you start on?" Two finale questions per episode, in order,
// stopping at the first episode the learner doesn't know. Nothing is recorded until
// the end, so leaving halfway changes nothing.
export default function PlacementRunner({ course }: { course: Course }) {
  const { state, record } = usePath();
  const steps = React.useMemo(() => buildPlacement(course), [course]);
  const episodes = React.useMemo(() => course.seasons.flatMap((s) => s.episodes), [course]);
  const [phase, setPhase] = React.useState<Phase>("intro");
  const [stepIndex, setStepIndex] = React.useState(0);
  const [qIndex, setQIndex] = React.useState(0);
  const [picked, setPicked] = React.useState<number | null>(null);
  const [answers, setAnswers] = React.useState<(number | null)[]>([]);
  const [results, setResults] = React.useState<PlacementResult[]>([]);
  const exit = `/learn/${course.id}`;
  const language = langName(course.target);

  const step = steps[stepIndex];
  const question = step?.questions[qIndex];

  const finish = (all: PlacementResult[]) => {
    record(placementEvents(course, state, all));
    track("path_placement_done", { course: course.id, passed: all.filter((r) => stepPassed(r.score)).length });
    setResults(all);
    setPhase("result");
  };

  const answer = (choice: number | null) => {
    const stepAnswers = [...answers, choice];
    setPicked(null);
    if (qIndex < step.questions.length - 1) {
      setAnswers(stepAnswers);
      setQIndex((n) => n + 1);
      return;
    }
    const score = scoreStep(step, stepAnswers);
    const all = [...results, { episodeId: step.episodeId, score, answers: stepAnswers }];
    if (stepPassed(score) && stepIndex < steps.length - 1) {
      setResults(all);
      setAnswers([]);
      setQIndex(0);
      setStepIndex((n) => n + 1);
    } else {
      finish(all);
    }
  };

  if (phase === "intro") {
    return (
      <RunnerFrame exitHref={exit} steps={steps.length} current={0}>
        <h1 className="text-[30px] min-[560px]:text-[36px] font-bold leading-[1.15]">Find your starting point</h1>
        <p className="mt-3 text-[17px] leading-[1.6]" style={{ color: "var(--text-dim)" }}>
          You'll get two questions from each episode. Get both right and that episode is marked done, then we move on. The
          check stops at the first episode you're not sure about, so it takes three minutes at most.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <PrimaryButton onClick={() => setPhase("quiz")}>Start the check</PrimaryButton>
          <SecondaryLink href={`${exit}/${episodes[0].id}`}>I'm new to {language}</SecondaryLink>
        </div>
      </RunnerFrame>
    );
  }

  if (phase === "result") {
    const passed = results.filter((r) => stepPassed(r.score)).length;
    const startAt = passed < episodes.length ? episodes[passed] : null;
    return (
      <RunnerFrame exitHref={exit} steps={steps.length} current={steps.length}>
        <h1 className="text-[30px] font-bold leading-[1.15]">
          {startAt ? `Start with episode ${passed + 1}` : "You placed out of the whole season"}
        </h1>
        <p className="mt-3 text-[17px] leading-[1.6]" style={{ color: "var(--text-dim)" }}>
          {passed === 0
            ? `“${startAt?.title}” is the right place to begin.`
            : startAt
              ? `${passed === 1 ? "Episode 1 is" : `Episodes 1–${passed} are`} marked done. Next up: “${startAt.title}”.`
              : "Every episode is marked done. Replay any scene whenever you like."}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {startAt ? (
            <PrimaryLink href={`${exit}/${startAt.id}`}>Start episode {passed + 1}</PrimaryLink>
          ) : (
            <PrimaryLink href={exit}>See the season</PrimaryLink>
          )}
          {startAt && passed > 0 && <SecondaryLink href={exit}>See the season</SecondaryLink>}
        </div>
      </RunnerFrame>
    );
  }

  return (
    <RunnerFrame exitHref={exit} steps={steps.length} current={stepIndex}>
      <p className="text-[15px] font-semibold" style={{ color: "var(--pink)" }}>
        Episode {stepIndex + 1}, question {qIndex + 1} of {step.questions.length}
      </p>
      <h1 className="mt-2 text-[24px] min-[560px]:text-[28px] font-bold leading-[1.25]">{question.prompt}</h1>
      <div className="mt-6 grid gap-3">
        {question.options.map((option, oi) => {
          const look = picked === null ? "idle" : oi === question.answer ? "right" : oi === picked ? "wrong" : "idle";
          return (
            <button
              key={oi}
              type="button"
              disabled={picked !== null}
              onClick={() => setPicked(oi)}
              className="flex min-h-14 items-center justify-between gap-3 rounded-[16px] border px-5 py-3 text-left text-[16px] font-semibold"
              style={{
                background: look === "right" ? "rgba(34,197,94,.14)" : look === "wrong" ? "rgba(239,68,68,.12)" : "var(--surface)",
                borderColor: look === "right" ? "#22c55e" : look === "wrong" ? "#ef4444" : "var(--border)",
                color: "var(--text)",
                opacity: picked !== null && look === "idle" ? 0.55 : 1,
              }}
            >
              <span>{option}</span>
              {look === "right" && <Check size={18} color="#22c55e" aria-label="Correct" />}
              {look === "wrong" && <X size={18} color="#ef4444" aria-label="Not this one" />}
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {picked === null ? "" : picked === question.answer ? "Correct." : `Not quite. The answer is ${question.options[question.answer]}.`}
      </p>
      <div className="mt-6 flex flex-wrap gap-3 min-h-12">
        {picked !== null ? (
          <PrimaryButton onClick={() => answer(picked)}>Next</PrimaryButton>
        ) : (
          <SecondaryButton onClick={() => answer(null)}>Not sure</SecondaryButton>
        )}
      </div>
    </RunnerFrame>
  );
}
