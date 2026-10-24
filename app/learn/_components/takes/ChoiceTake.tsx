"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { speak } from "@/app/_components/speak";
import type { ChoiceItem } from "@/lib/path/takes";
import { PrimaryButton } from "../ui";
import { PATH_AUDIO_DIR, SpeakButton, TakeHeading, type TakeProps } from "./shared";

// Multiple choice, used by two takes: "guess" shows the word and asks its meaning;
// "listen" only plays the word and asks which one it was.
export function ChoiceTake({
  items,
  mode,
  bcp,
  onDone,
}: TakeProps & { items: ChoiceItem[]; mode: "guess" | "listen"; bcp: string }) {
  const [i, setI] = React.useState(0);
  const [picked, setPicked] = React.useState<string | null>(null);
  const [correct, setCorrect] = React.useState(0);
  const item = items[i];
  const last = i === items.length - 1;

  // In listen mode each new question plays on its own (the learner has just clicked).
  React.useEffect(() => {
    if (mode === "listen" && item) speak(item.prompt, bcp, PATH_AUDIO_DIR);
  }, [mode, item, bcp]);

  if (!item) return null;

  const pick = (option: string) => {
    if (picked) return;
    setPicked(option);
    if (option === item.answer) setCorrect((n) => n + 1);
    if (mode === "guess") speak(item.prompt, bcp, PATH_AUDIO_DIR);
  };

  const next = () => {
    if (last) {
      onDone(Math.round((correct / items.length) * 100));
    } else {
      setI((n) => n + 1);
      setPicked(null);
    }
  };

  return (
    <div>
      <TakeHeading
        title={mode === "guess" ? "What does it mean?" : "Which one did you hear?"}
        hint={`${i + 1} of ${items.length}`}
      />
      <div
        className="rounded-[24px] border p-7 text-center"
        style={{ background: "var(--surface)", borderColor: "var(--border)" }}
      >
        {mode === "guess" ? (
          <p className="text-[30px] min-[560px]:text-[36px] font-bold leading-[1.2] break-words">{item.prompt}</p>
        ) : (
          <div className="flex justify-center">
            <SpeakButton key={i} text={item.prompt} bcp={bcp} label="Play the word again" size={64} />
          </div>
        )}
      </div>
      <div className="mt-5 grid gap-3 min-[560px]:grid-cols-2">
        {item.options.map((option) => {
          const isAnswer = option === item.answer;
          const state = !picked ? "idle" : isAnswer ? "right" : option === picked ? "wrong" : "idle";
          return (
            <button
              key={option}
              type="button"
              onClick={() => pick(option)}
              disabled={!!picked}
              className="flex min-h-14 items-center justify-between gap-3 rounded-[16px] border px-5 py-3 text-left text-[16px] font-semibold"
              style={{
                background: state === "right" ? "rgba(34,197,94,.14)" : state === "wrong" ? "rgba(239,68,68,.12)" : "var(--surface)",
                borderColor: state === "right" ? "#22c55e" : state === "wrong" ? "#ef4444" : "var(--border)",
                color: "var(--text)",
                opacity: picked && state === "idle" ? 0.55 : 1,
              }}
            >
              <span>{option}</span>
              {state === "right" && <Check size={18} color="#22c55e" aria-label="Correct" />}
              {state === "wrong" && <X size={18} color="#ef4444" aria-label="Not this one" />}
            </button>
          );
        })}
      </div>
      <div className="mt-6 min-h-12">
        {picked && <PrimaryButton onClick={next}>{last ? "Continue" : "Next"}</PrimaryButton>}
      </div>
    </div>
  );
}
