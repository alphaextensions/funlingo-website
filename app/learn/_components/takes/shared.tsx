"use client";

import { Volume2 } from "lucide-react";
import { speak } from "@/app/_components/speak";

export const PATH_AUDIO_DIR = "/audio/path";

export type TakeProps = { onDone: (score: number | null) => void };

export function SpeakButton({ text, bcp, label = "Play audio", size = 40 }: { text: string; bcp: string; label?: string; size?: number }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => speak(text, bcp, PATH_AUDIO_DIR)}
      className="inline-flex shrink-0 items-center justify-center rounded-full border"
      style={{ width: size, height: size, background: "var(--chip)", borderColor: "var(--border)", color: "var(--pink)" }}
    >
      <Volume2 size={Math.round(size * 0.45)} />
    </button>
  );
}

export function TakeHeading({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-[22px] font-bold leading-[1.25]">{title}</h2>
      {hint && (
        <p className="mt-1 text-[15px]" style={{ color: "var(--text-dim)" }}>
          {hint}
        </p>
      )}
    </div>
  );
}
