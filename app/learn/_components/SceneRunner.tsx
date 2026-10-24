"use client";

import * as React from "react";
import { primeVoices, stopSpeaking } from "@/app/_components/speak";
import { track } from "@/app/_components/track";
import { findEpisode } from "@/lib/path/course";
import { makeEvent } from "@/lib/path/events";
import { speechLocale } from "@/lib/path/langs";
import { sceneStatus } from "@/lib/path/progress";
import type { Course, Take } from "@/lib/path/schema";
import { buildGuessItems, buildListenItems, scoreTakes } from "@/lib/path/takes";
import { RunnerFrame } from "./RunnerFrame";
import { ChoiceTake } from "./takes/ChoiceTake";
import { PatternTake } from "./takes/PatternTake";
import { ShadowTake } from "./takes/ShadowTake";
import { WatchTake } from "./takes/WatchTake";
import { WordLabTake } from "./takes/WordLabTake";
import { PrimaryLink, SecondaryLink } from "./ui";
import { usePath } from "./usePath";

export default function SceneRunner({ course, episodeId, sceneId }: { course: Course; episodeId: string; sceneId: string }) {
  const { state, hydrated, record } = usePath();
  const found = findEpisode(course, episodeId);
  const episode = found?.episode;
  const sceneIndex = episode?.scenes.findIndex((s) => s.id === sceneId) ?? -1;
  const scene = episode?.scenes[sceneIndex];
  const bcp = speechLocale(course.target);
  const base = `/learn/${course.id}/${episodeId}`;

  const [takeIndex, setTakeIndex] = React.useState(0);
  const [results, setResults] = React.useState<(number | null)[]>([]);
  const [finalScore, setFinalScore] = React.useState<number | null>(null);
  const started = React.useRef(false);

  const guessItems = React.useMemo(() => (scene ? buildGuessItems(course, scene) : []), [course, scene]);
  const listenItems = React.useMemo(() => (scene ? buildListenItems(course, scene) : []), [course, scene]);

  // Locked is judged once, on arrival; finishing earlier scenes mid-visit doesn't matter here.
  const locked =
    !!episode && !!scene && hydrated && !started.current && sceneStatus(course, episode, sceneIndex, state) === "locked";

  React.useEffect(() => {
    if (!scene || !hydrated || locked || started.current) return;
    started.current = true;
    primeVoices();
    record([makeEvent("scene_started", course.id, scene.id, { content_version: course.version })]);
    track("path_scene_start", { course: course.id, scene: scene.id });
  }, [course, scene, hydrated, locked, record]);

  React.useEffect(() => () => stopSpeaking(), []);

  const finishTake = React.useCallback(
    (take: Take, score: number | null) => {
      if (!scene) return;
      const index = takeIndex;
      record([makeEvent("take_done", course.id, `${scene.id}:${index}`, score === null ? { kind: take.kind } : { kind: take.kind, score })]);
      const nextResults = [...results, score];
      setResults(nextResults);
      if (index < scene.takes.length - 1) {
        setTakeIndex(index + 1);
        return;
      }
      const total = scoreTakes(nextResults);
      record([makeEvent("scene_done", course.id, scene.id, { score: total, content_version: course.version })]);
      track("path_scene_done", { course: course.id, scene: scene.id, score: total });
      setFinalScore(total);
    },
    [course, scene, takeIndex, results, record],
  );

  if (!episode || !scene) return null;
  if (!hydrated) return <RunnerFrame exitHref={base} steps={scene.takes.length} current={0}>{null}</RunnerFrame>;

  // Opened a locked scene directly (old link, typed URL): send them to the path.
  if (locked) {
    return (
      <RunnerFrame exitHref={base} steps={scene.takes.length} current={0}>
        <h1 className="text-[24px] font-bold">This scene opens after the one before it.</h1>
        <p className="mt-2 text-[16px]" style={{ color: "var(--text-dim)" }}>
          Play the earlier scenes first, or take the finale to skip ahead.
        </p>
        <div className="mt-6">
          <PrimaryLink href={base}>Go to the episode</PrimaryLink>
        </div>
      </RunnerFrame>
    );
  }

  if (finalScore !== null) {
    const nextScene = episode.scenes[sceneIndex + 1];
    const scored = results.some((r) => r !== null);
    return (
      <RunnerFrame exitHref={base} steps={scene.takes.length} current={scene.takes.length}>
        <h1 className="text-[30px] font-bold leading-[1.15]">Scene complete</h1>
        <p className="mt-2 text-[17px]" style={{ color: "var(--text-dim)" }}>
          {scored ? `You got ${finalScore}% of the questions right in “${scene.title}”.` : `You finished “${scene.title}”.`}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {nextScene ? (
            <PrimaryLink href={`${base}/${nextScene.id}`}>Play the next scene</PrimaryLink>
          ) : (
            <PrimaryLink href={`${base}/finale`}>Take the finale</PrimaryLink>
          )}
          <SecondaryLink href={base}>Back to the episode</SecondaryLink>
        </div>
      </RunnerFrame>
    );
  }

  const take = scene.takes[takeIndex];
  const done = (score: number | null) => finishTake(take, score);

  return (
    <RunnerFrame exitHref={base} steps={scene.takes.length} current={takeIndex}>
      <div key={takeIndex}>
        {take.kind === "watch" && <WatchTake scene={scene} bcp={bcp} onDone={done} />}
        {take.kind === "wordlab" && <WordLabTake course={course} scene={scene} bcp={bcp} onDone={done} />}
        {take.kind === "guess" && <ChoiceTake items={guessItems} mode="guess" bcp={bcp} onDone={done} />}
        {take.kind === "listen" && <ChoiceTake items={listenItems} mode="listen" bcp={bcp} onDone={done} />}
        {take.kind === "pattern" && <PatternTake scene={scene} onDone={done} />}
        {take.kind === "shadow" && <ShadowTake scene={scene} bcp={bcp} onDone={done} />}
      </div>
    </RunnerFrame>
  );
}
