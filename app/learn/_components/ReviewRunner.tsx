"use client";

import * as React from "react";
import { primeVoices, speak, stopSpeaking } from "@/app/_components/speak";
import { track } from "@/app/_components/track";
import { makeEvent } from "@/lib/path/events";
import { speechLocale } from "@/lib/path/langs";
import { nextUp } from "@/lib/path/progress";
import { buildSession, type DeckCard, deckStats, previewIntervals, reviewKey, untilLabel } from "@/lib/path/review";
import type { Course } from "@/lib/path/schema";
import { normalizeWords } from "@/lib/path/takes";
import { RunnerFrame } from "./RunnerFrame";
import { PATH_AUDIO_DIR, SpeakButton } from "./takes/shared";
import { PrimaryButton, PrimaryLink, SecondaryLink } from "./ui";
import { usePath } from "./usePath";

const RATINGS = [
  { grade: 1, label: "Forgot" },
  { grade: 2, label: "Hard" },
  { grade: 3, label: "Got it" },
  { grade: 4, label: "Easy" },
] as const;

/** The first scene line that uses the word, to show it in context. */
function exampleFor(course: Course, term: string): { target: string; native: string } | null {
  const needle = normalizeWords(term).join(" ");
  if (!needle) return null;
  for (const season of course.seasons) {
    for (const episode of season.episodes) {
      for (const scene of episode.scenes) {
        const lines =
          scene.coldOpen.kind === "dialogue"
            ? scene.coldOpen.lines
            : scene.coldOpen.clip.cues.map((c) => ({ target: c.target, native: c.native }));
        const hit = lines.find((l) => ` ${normalizeWords(l.target).join(" ")} `.includes(` ${needle} `));
        if (hit) return { target: hit.target, native: hit.native };
      }
    }
  }
  return null;
}

export default function ReviewRunner({ course }: { course: Course }) {
  const { state, hydrated, record } = usePath();
  const bcp = speechLocale(course.target);
  const exit = `/learn/${course.id}`;
  const [queue, setQueue] = React.useState<DeckCard[] | null>(null);
  const [index, setIndex] = React.useState(0);
  const [revealed, setRevealed] = React.useState(false);
  const [reviewed, setReviewed] = React.useState(0);

  const start = React.useCallback(() => {
    setQueue(buildSession(course, state, new Date()));
    setIndex(0);
    setRevealed(false);
  }, [course, state]);

  // Build the first session once saved progress has loaded.
  React.useEffect(() => {
    if (hydrated && queue === null) {
      primeVoices();
      start();
    }
  }, [hydrated, queue, start]);

  const current = queue?.[index];
  const word = current ? course.words[current.wordId] : null;

  React.useEffect(() => {
    if (word) speak(word.term, bcp, PATH_AUDIO_DIR);
  }, [word, bcp]);
  React.useEffect(() => () => stopSpeaking(), []);

  const rate = React.useCallback(
    (grade: 1 | 2 | 3 | 4) => {
      if (!current || !word || !revealed) return;
      record([makeEvent("word_reviewed", course.id, current.wordId, { rating: grade, term: word.term })]);
      setReviewed((n) => n + 1);
      setRevealed(false);
      setIndex((i) => {
        if (queue && i + 1 >= queue.length) track("path_review_done", { course: course.id, reviewed: reviewed + 1 });
        return i + 1;
      });
    },
    [current, word, revealed, record, course.id, queue, reviewed],
  );

  // Space shows the answer; 1-4 rate it.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest("input, textarea")) return;
      if (e.key === " " && !revealed && current) {
        e.preventDefault();
        setRevealed(true);
      } else if (revealed && ["1", "2", "3", "4"].includes(e.key)) {
        rate(Number(e.key) as 1 | 2 | 3 | 4);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [revealed, current, rate]);

  if (!hydrated || queue === null) {
    return <RunnerFrame exitHref={exit} exitLabel="Leave and go back to the season" steps={1} current={0}>{null}</RunnerFrame>;
  }

  if (!current || !word) {
    const now = new Date();
    const stats = deckStats(course, state, now);
    const next = nextUp(course, state);
    const firstScene = next?.sceneId ? `${exit}/${next.episodeId}/${next.sceneId}` : exit;
    return (
      <RunnerFrame exitHref={exit} exitLabel="Leave and go back to the season" steps={Math.max(queue.length, 1)} current={queue.length}>
        {stats.total === 0 ? (
          <>
            <h1 className="text-[30px] font-bold leading-[1.15]">Your review deck is empty</h1>
            <p className="mt-3 text-[17px] leading-[1.6]" style={{ color: "var(--text-dim)" }}>
              Every scene you finish adds its words here, ready to review at the right time.
            </p>
            <div className="mt-8">
              <PrimaryLink href={firstScene}>Play a scene</PrimaryLink>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-[30px] font-bold leading-[1.15]">{stats.due > 0 ? "Round done" : "All caught up"}</h1>
            <p className="mt-3 text-[17px] leading-[1.6]" style={{ color: "var(--text-dim)" }}>
              {reviewed > 0 ? `You reviewed ${reviewed} ${reviewed === 1 ? "word" : "words"}. ` : ""}
              You know {stats.known} of {stats.total} words in your deck.
              {stats.due === 0 && stats.nextDue ? ` The next one is due ${untilLabel(stats.nextDue, now)}.` : ""}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {stats.due > 0 ? (
                <PrimaryButton onClick={start}>Review {stats.due} more</PrimaryButton>
              ) : (
                <PrimaryLink href={firstScene}>{next ? "Play the next scene" : "Back to the season"}</PrimaryLink>
              )}
              <SecondaryLink href={exit}>Back to the season</SecondaryLink>
            </div>
          </>
        )}
      </RunnerFrame>
    );
  }

  const now = new Date();
  const logs = state.reviews[reviewKey(course.id, current.wordId)] ?? [];
  const preview = previewIntervals(logs, now);
  const example = revealed ? exampleFor(course, word.term) : null;

  return (
    <RunnerFrame exitHref={exit} exitLabel="Leave and go back to the season" steps={queue.length} current={index}>
      <p className="text-[15px] font-semibold" style={{ color: "var(--pink)" }}>
        {current.card ? "Review" : "New word"}, {index + 1} of {queue.length}
      </p>
      <div
        className="mt-4 rounded-[24px] border p-7 min-[560px]:p-10 text-center"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex justify-center">
          <SpeakButton key={current.wordId} text={word.term} bcp={bcp} label={`Play: ${word.term}`} size={52} />
        </div>
        <h1 className="mt-5 text-[32px] min-[560px]:text-[40px] font-bold leading-[1.15] break-words">{word.term}</h1>
        {revealed && (
          <div aria-live="polite">
            <p className="mt-3 text-[20px] font-semibold" style={{ color: "var(--pink)" }}>
              {word.gloss}
            </p>
            {example && (
              <p className="mt-4 text-[15px] leading-[1.5]">
                <span className="font-semibold">{example.target}</span>{" "}
                <span style={{ color: "var(--text-dim)" }}>{example.native}</span>
              </p>
            )}
          </div>
        )}
      </div>

      <div className="mt-6">
        {!revealed ? (
          <PrimaryButton onClick={() => setRevealed(true)}>Show the meaning</PrimaryButton>
        ) : (
          <>
            <p className="mb-3 text-[14px]" style={{ color: "var(--text-dim)" }}>
              How well did you know it?
            </p>
            <div className="grid grid-cols-2 min-[560px]:grid-cols-4 gap-3">
              {RATINGS.map(({ grade, label }) => (
                <button
                  key={grade}
                  type="button"
                  onClick={() => rate(grade)}
                  aria-keyshortcuts={String(grade)}
                  className="flex min-h-16 flex-col items-center justify-center rounded-[16px] border px-3 py-2 text-[16px] font-semibold"
                  style={{
                    background: grade === 3 ? "var(--pink-soft)" : "var(--surface)",
                    borderColor: grade === 3 ? "rgba(236,77,176,.45)" : "var(--border)",
                    color: "var(--text)",
                  }}
                >
                  {label}
                  <span className="text-[12px] font-medium" style={{ color: "var(--text-dim)" }}>
                    {untilLabel(preview[grade], now)}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </RunnerFrame>
  );
}
