"use client";

import * as React from "react";
import { speak } from "@/app/_components/speak";
import type { Scene } from "@/lib/path/schema";
import { PrimaryButton, SecondaryButton } from "../ui";
import { PATH_AUDIO_DIR, SpeakButton, TakeHeading, type TakeProps } from "./shared";

// The cold open: the scene's conversation, shown as dual subtitles one line at a time.
export function WatchTake({ scene, bcp, onDone }: TakeProps & { scene: Scene; bcp: string }) {
  const open = scene.coldOpen;
  const lines =
    open.kind === "dialogue"
      ? open.lines
      : open.clip.cues.map((c) => ({ speaker: "", target: c.target, native: c.native }));
  const [shown, setShown] = React.useState(1);
  const [english, setEnglish] = React.useState(true);
  const all = shown >= lines.length;

  const reveal = () => {
    const line = lines[shown];
    setShown((n) => n + 1);
    if (line) speak(line.target, bcp, PATH_AUDIO_DIR);
  };

  return (
    <div>
      <TakeHeading title={scene.title} hint="Listen to the conversation. Tap a line to hear it again." />
      {open.kind === "clip" && (
        <video src={open.clip.src} controls playsInline className="mb-5 w-full rounded-[18px]" style={{ background: "#000" }} />
      )}
      <ol className="grid gap-3" aria-live="polite">
        {lines.slice(0, shown).map((line, i) => (
          <li
            key={i}
            className="flex items-start gap-3 rounded-[18px] border p-4"
            style={{ background: "var(--surface)", borderColor: i === shown - 1 ? "rgba(236,77,176,.45)" : "var(--border)" }}
          >
            <SpeakButton text={line.target} bcp={bcp} label={`Play: ${line.target}`} size={36} />
            <div className="min-w-0">
              {line.speaker && (
                <p className="text-[12px] font-semibold" style={{ color: "var(--text-dim)" }}>
                  {line.speaker}
                </p>
              )}
              <p className="text-[19px] font-semibold leading-[1.35]">{line.target}</p>
              {english && (
                <p className="mt-[2px] text-[15px] leading-[1.4]" style={{ color: "var(--pink)" }}>
                  {line.native}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap gap-3">
        {all ? (
          <PrimaryButton onClick={() => onDone(null)}>Continue</PrimaryButton>
        ) : (
          <PrimaryButton onClick={reveal}>Next line</PrimaryButton>
        )}
        <SecondaryButton onClick={() => setEnglish((v) => !v)}>{english ? "Hide English" : "Show English"}</SecondaryButton>
      </div>
    </div>
  );
}
