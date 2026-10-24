"use client";

import * as React from "react";
import type { Scene } from "@/lib/path/schema";
import { PrimaryButton } from "../ui";
import { TakeHeading, type TakeProps } from "./shared";

// One grammar point, in two lines, next to the scene lines that use it.
export function PatternTake({ scene, onDone }: TakeProps & { scene: Scene }) {
  const pattern = scene.pattern;

  // A pattern take without a pattern has nothing to show; move on.
  React.useEffect(() => {
    if (!pattern) onDone(null);
  }, [pattern, onDone]);
  if (!pattern) return null;

  const examples = scene.coldOpen.kind === "dialogue" ? scene.coldOpen.lines.slice(0, 3) : [];

  return (
    <div>
      <TakeHeading title={pattern.title} />
      <div className="rounded-[24px] border p-6" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
        <p className="text-[17px] leading-[1.6]">{pattern.tip}</p>
        {examples.length > 0 && (
          <ul className="mt-5 grid gap-2 border-t pt-5" style={{ borderColor: "var(--border)" }}>
            {examples.map((line, i) => (
              <li key={i} className="text-[15px] leading-[1.45]">
                <span className="font-semibold">{line.target}</span>{" "}
                <span style={{ color: "var(--text-dim)" }}>{line.native}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="mt-6">
        <PrimaryButton onClick={() => onDone(null)}>Got it</PrimaryButton>
      </div>
    </div>
  );
}
