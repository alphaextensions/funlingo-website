"use client";

import * as React from "react";
import Link from "next/link";
import { X } from "lucide-react";

// Focused chrome for scenes and finales: a way out and a progress bar, nothing else.
export function RunnerFrame({
  exitHref,
  exitLabel = "Leave and go back to the episode",
  steps,
  current,
  children,
}: {
  exitHref: string;
  exitLabel?: string;
  steps: number;
  current: number;
  children: React.ReactNode;
}) {
  return (
    <div className="fnl-root min-h-screen overflow-x-hidden">
      <div className="max-w-[680px] mx-auto px-4 sm:px-6 pt-5 pb-16">
        <div className="flex items-center gap-4">
          <Link
            href={exitHref}
            aria-label={exitLabel}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
            style={{ background: "var(--chip)", borderColor: "var(--border)", color: "var(--text)" }}
          >
            <X size={18} />
          </Link>
          <div
            className="flex flex-1 gap-[6px]"
            role="progressbar"
            aria-label="Progress"
            aria-valuemin={0}
            aria-valuemax={steps}
            aria-valuenow={current}
          >
            {Array.from({ length: steps }, (_, i) => (
              <span
                key={i}
                className="h-[6px] flex-1 rounded-full"
                style={{ background: i < current ? "var(--grad)" : "var(--chip)" }}
              />
            ))}
          </div>
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
