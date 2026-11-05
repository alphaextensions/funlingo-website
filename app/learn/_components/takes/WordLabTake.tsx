"use client";

import * as React from "react";
import type { Course, Scene } from "@/lib/path/schema";
import { PrimaryButton } from "../ui";
import { SpeakButton, TakeHeading, type TakeProps } from "./shared";

// One card per scene word: the term, how it sounds, what it means.
export function WordLabTake({ course, scene, bcp, onDone }: TakeProps & { course: Course; scene: Scene; bcp: string }) {
  const [i, setI] = React.useState(0);
  const word = course.words[scene.words[i]];
  const last = i === scene.words.length - 1;

  return (
    <div>
      <TakeHeading title="Words from this scene" hint={`${i + 1} of ${scene.words.length}`} />
      <div
        className="rounded-[24px] border p-7 min-[560px]:p-10 text-center"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        <div className="flex justify-center">
          <SpeakButton key={scene.words[i]} text={word.term} bcp={bcp} label={`Play: ${word.term}`} size={52} />
        </div>
        <p className="mt-5 text-[32px] min-[560px]:text-[40px] font-bold leading-[1.15] break-words">{word.term}</p>
        {word.romanization && (
          <p className="mt-1 text-[15px]" style={{ color: "var(--text-dim)" }}>
            {word.romanization}
          </p>
        )}
        <p className="mt-3 text-[18px]" style={{ color: "var(--pink)" }}>
          {word.gloss}
        </p>
      </div>
      <div className="mt-6">
        <PrimaryButton onClick={() => (last ? onDone(null) : setI((n) => n + 1))}>{last ? "Continue" : "Next word"}</PrimaryButton>
      </div>
    </div>
  );
}
