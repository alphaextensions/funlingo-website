"use client";

/**
 * Centralised keyboard shortcut dispatcher for the Watch route.
 *
 * Covers SPEC §6.6 (every player action has a key). Shortcuts are IGNORED
 * when the user is typing in an input/textarea or inside an open word card
 * (we don't want "S" to save a word while they're searching).
 *
 * Shortcuts are declared as a map so the "/" help overlay can read them.
 */

import { useEffect } from "react";

export interface ShortcutAction {
  key: string;
  label: string;
  run: (ev: KeyboardEvent) => void;
}

// `labelKey` resolves against the Wave 14 i18n catalog (`watch.sc*`) so the
// help overlay reads in the viewer's native language. The `key` column is the
// physical key name and stays as-is.
export const SHORTCUT_HELP: { key: string; labelKey: string }[] = [
  { key: "Space", labelKey: "watch.scPlayPause" },
  { key: "A / ← | D / →", labelKey: "watch.scPrevNext" },
  { key: "Shift+← / Shift+→", labelKey: "watch.scBackFwd" },
  { key: "S", labelKey: "watch.scReplay" },
  { key: "Cmd/Ctrl+S", labelKey: "watch.scSaveLine" },
  { key: "Q", labelKey: "watch.scAutoPause" },
  { key: "M / Shift+↑↓", labelKey: "watch.scMuteVol" },
  { key: "J", labelKey: "watch.scSpeed" },
  { key: "Shift+,  Shift+.", labelKey: "watch.scSlowerFaster" },
  { key: "K", labelKey: "watch.scToggleTranslation" },
  { key: "P / Enter", labelKey: "watch.scRecord" },
  { key: "↑", labelKey: "watch.scPlayRec" },
  { key: "R", labelKey: "watch.scLoop" },
  { key: "1 / 2 / 3", labelKey: "watch.scModes" },
  { key: "Shift+1/2/3", labelKey: "watch.scSegmentation" },
  { key: "F", labelKey: "watch.scFullscreen" },
  { key: "+ / -", labelKey: "watch.scFontSize" },
  { key: "[ / ] / \\", labelKey: "watch.scSidebar" },
  { key: "Cmd/Ctrl+C", labelKey: "watch.scCopyLine" },
  { key: "Esc", labelKey: "watch.scCloseCard" },
  { key: "/", labelKey: "watch.scShortcutList" },
];

function isTypingTarget(el: EventTarget | null): boolean {
  if (!(el instanceof HTMLElement)) return false;
  const tag = el.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (el.isContentEditable) return true;
  // Open word-card popups focus-trap their own buttons, so a tap on their
  // close/save button is a button — ignore the whole subtree:
  if (el.closest("[data-fnl-wordcard]")) return true;
  return false;
}

export interface KeyboardHandlers {
  togglePlay: () => void;
  prevLine: () => void;
  nextLine: () => void;
  repeatLine: () => void;
  toggleAutoPause: () => void;
  toggleMute: () => void;
  speedCycle: () => void;
  slower: () => void;
  faster: () => void;
  toggleTranslation: () => void;
  loop: () => void;
  setMode: (m: "default" | "focus" | "cinema") => void;
  fullscreen: () => void;
  fontBigger: () => void;
  fontSmaller: () => void;
  toggleSidebar: () => void;
  sidebarWider: () => void;
  sidebarNarrower: () => void;
  copyLine: () => void;
  saveLine: () => void;
  openHelp: () => void;
  /** Wave 16 — extension reading-mode "Rewind / Forward 10s". */
  back10?: () => void;
  forward10?: () => void;
}

export function useWatchKeyboard(h: KeyboardHandlers) {
  useEffect(() => {
    function onKey(ev: KeyboardEvent) {
      if (isTypingTarget(ev.target)) return;
      const k = ev.key;
      const shift = ev.shiftKey;
      const meta = ev.metaKey || ev.ctrlKey;

      // Help overlay (/) and Escape (handled per-popup) first.
      if (k === "/" && !meta) {
        ev.preventDefault();
        h.openHelp();
        return;
      }

      // Cmd/Ctrl+S → save current line
      if (meta && (k === "s" || k === "S")) {
        ev.preventDefault();
        h.saveLine();
        return;
      }
      if (meta && (k === "c" || k === "C")) {
        // Copy line — allow native copy fallback too; call handler to show toast.
        h.copyLine();
        return;
      }

      switch (k) {
        case " ":
          ev.preventDefault();
          h.togglePlay();
          return;
        case "ArrowLeft":
          ev.preventDefault();
          if (shift && h.back10) h.back10();
          else h.prevLine();
          return;
        case "ArrowRight":
          ev.preventDefault();
          if (shift && h.forward10) h.forward10();
          else h.nextLine();
          return;
        case "a":
        case "A":
          ev.preventDefault();
          h.prevLine();
          return;
        case "d":
        case "D":
          ev.preventDefault();
          h.nextLine();
          return;
        case "s":
        case "S":
          ev.preventDefault();
          h.repeatLine();
          return;
        case "q":
        case "Q":
          ev.preventDefault();
          h.toggleAutoPause();
          return;
        case "m":
        case "M":
          ev.preventDefault();
          h.toggleMute();
          return;
        case "j":
        case "J":
          ev.preventDefault();
          h.speedCycle();
          return;
        case ",":
          if (shift) {
            ev.preventDefault();
            h.slower();
            return;
          }
          return;
        case ".":
          if (shift) {
            ev.preventDefault();
            h.faster();
            return;
          }
          return;
        case "k":
        case "K":
          ev.preventDefault();
          h.toggleTranslation();
          return;
        case "r":
        case "R":
          ev.preventDefault();
          h.loop();
          return;
        case "1":
          ev.preventDefault();
          h.setMode("default");
          return;
        case "2":
          ev.preventDefault();
          h.setMode("focus");
          return;
        case "3":
          ev.preventDefault();
          h.setMode("cinema");
          return;
        case "f":
        case "F":
          ev.preventDefault();
          h.fullscreen();
          return;
        case "+":
        case "=":
          ev.preventDefault();
          h.fontBigger();
          return;
        case "-":
        case "_":
          ev.preventDefault();
          h.fontSmaller();
          return;
        case "[":
          ev.preventDefault();
          h.sidebarNarrower();
          return;
        case "]":
          ev.preventDefault();
          h.sidebarWider();
          return;
        case "\\":
          ev.preventDefault();
          h.toggleSidebar();
          return;
        case "Tab":
          // Tab is NOT consumed here — accessibility priority. Mode toggle
          // via Tab is not in the SPEC (only 1/2/3). We let the browser do
          // its normal focus cycling.
          return;
        default:
          return;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [h]);
}
