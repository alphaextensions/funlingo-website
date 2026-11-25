"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * GlobalKeyboard — the hub-wide `g <key>` chord navigator.
 *
 * - `g h` → /       (Home)
 * - `g l` → /library
 * - `g w` → /words
 * - `g s` → /sentences
 * - `g p` → /progress
 * - `g r` → /review
 * - `g t` → /talk
 * - `g d` → /read   (SPEC §6.6 reserves `R` for loop in the player)
 *
 * Ignores keypresses when focus is inside an input, textarea, select,
 * or any contenteditable surface — so typing in a filter field never
 * fires a nav chord. The chord expires 1.2 s after the leading `g`.
 */
const MAP: Record<string, string> = {
  h: "/",
  l: "/library",
  w: "/words",
  s: "/sentences",
  p: "/progress",
  r: "/review",
  t: "/talk",
  d: "/read",
};

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName.toLowerCase();
  if (tag === "input" || tag === "textarea" || tag === "select") return true;
  if (target.isContentEditable) return true;
  return false;
}

export function GlobalKeyboard() {
  const router = useRouter();

  useEffect(() => {
    let armed = false;
    let timer: ReturnType<typeof setTimeout> | null = null;

    function disarm() {
      armed = false;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }

    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;
      const key = e.key.toLowerCase();
      if (!armed) {
        if (key === "g") {
          armed = true;
          timer = setTimeout(disarm, 1200);
        }
        return;
      }
      // Armed: resolve the chord.
      const dest = MAP[key];
      disarm();
      if (dest) {
        e.preventDefault();
        router.push(dest as never);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      disarm();
    };
  }, [router]);

  return null;
}
