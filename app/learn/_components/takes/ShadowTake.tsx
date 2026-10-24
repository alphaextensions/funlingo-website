"use client";

import * as React from "react";
import { Mic } from "lucide-react";
import type { Scene } from "@/lib/path/schema";
import { matchRatio, normalizeWords, SHADOW_MATCH_OK } from "@/lib/path/takes";
import { PrimaryButton, SecondaryButton } from "../ui";
import { SpeakButton, TakeHeading, type TakeProps } from "./shared";

const LINES = 3;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Recognition = any;

function recognitionCtor(): (new () => Recognition) | null {
  if (typeof window === "undefined") return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

// Repeat lines after the speaker. Where the browser can listen we show how many of
// the words it caught; it never scores accent, and the take is never graded.
export function ShadowTake({ scene, bcp, onDone }: TakeProps & { scene: Scene; bcp: string }) {
  const lines = (
    scene.coldOpen.kind === "dialogue" ? scene.coldOpen.lines.map((l) => l.target) : scene.coldOpen.clip.cues.map((c) => c.target)
  ).slice(0, LINES);
  const [i, setI] = React.useState(0);
  const [canListen, setCanListen] = React.useState(false);
  const [listening, setListening] = React.useState(false);
  const [heard, setHeard] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const recRef = React.useRef<Recognition>(null);
  const line = lines[i];
  const last = i === lines.length - 1;

  React.useEffect(() => setCanListen(recognitionCtor() !== null), []);
  React.useEffect(() => () => recRef.current?.abort?.(), []);

  const listen = () => {
    const Ctor = recognitionCtor();
    if (!Ctor) return;
    setHeard(null);
    setError(null);
    try {
      const rec = new Ctor();
      rec.lang = bcp;
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = (e: { results: { 0: { transcript: string } }[] }) => setHeard(e.results[0][0].transcript);
      rec.onerror = (e: { error?: string }) =>
        setError(e.error === "not-allowed" ? "Microphone access is off. Say the line out loud and carry on." : "Didn't catch that. Try again.");
      rec.onend = () => setListening(false);
      recRef.current = rec;
      setListening(true);
      rec.start();
    } catch {
      setListening(false);
      setError("Listening isn't available here. Say the line out loud and carry on.");
    }
  };

  const next = () => {
    if (last) onDone(null);
    else {
      setI((n) => n + 1);
      setHeard(null);
      setError(null);
    }
  };

  const ratio = heard !== null ? matchRatio(line, heard) : null;
  const total = normalizeWords(line).length;

  return (
    <div>
      <TakeHeading title="Say it like they do" hint={`Play the line, then say it out loud. ${i + 1} of ${lines.length}`} />
      <div className="rounded-[24px] border p-7 text-center" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <div className="flex justify-center">
          <SpeakButton key={i} text={line} bcp={bcp} label="Play the line" size={52} />
        </div>
        <p className="mt-5 text-[26px] min-[560px]:text-[30px] font-bold leading-[1.25]">{line}</p>
        {ratio !== null && (
          <p className="mt-4 text-[15px]" style={{ color: ratio >= SHADOW_MATCH_OK ? "#22c55e" : "var(--text-dim)" }}>
            {ratio >= SHADOW_MATCH_OK ? "Nice, that matched." : "Close. Try it once more."} We caught{" "}
            {Math.round(ratio * total)} of {total} words: “{heard}”
          </p>
        )}
        {error && (
          <p className="mt-4 text-[15px]" style={{ color: "var(--text-dim)" }}>
            {error}
          </p>
        )}
        {!canListen && (
          <p className="mt-4 text-[14px]" style={{ color: "var(--text-dim)" }}>
            Your browser can't listen, so say it out loud to yourself.
          </p>
        )}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        {canListen && (
          <SecondaryButton onClick={listen}>
            <Mic size={18} aria-hidden /> {listening ? "Listening…" : heard !== null ? "Say it again" : "Say it"}
          </SecondaryButton>
        )}
        <PrimaryButton onClick={next}>{last ? "Continue" : "Next line"}</PrimaryButton>
      </div>
    </div>
  );
}
