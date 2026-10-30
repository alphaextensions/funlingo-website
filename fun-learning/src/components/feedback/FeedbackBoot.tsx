"use client";

/**
 * FeedbackBoot — Wave 15 JS-behaviour parity host. Mounted once in the root
 * layout. It:
 *
 *   1. Hydrates the feedback-prefs store (server Prefs.json when signed in,
 *      localStorage when signed out) and applies `motion` → body
 *      `data-motion` and `rtl` → <html dir> exactly like the extension's
 *      `G()` boot step.
 *   2. Delegates clicks for server components that can't attach handlers:
 *        data-fx="tap"          → fx.tap()
 *        data-fx-toast="…"      → toast (e.g. locked tiles' "save to unlock")
 *        data-fx-press          → 110 ms scale(0.97) press (extension `ee()`),
 *                                 skipped when motion is off / reduced.
 *   3. Hosts the global toast pill (extension `#toast`).
 */

import { useEffect, useRef, useState } from "react";
import {
  hydrateFeedbackPrefs,
  subscribeFeedbackPrefs,
  getFeedbackPrefs,
  type FeedbackPrefs,
} from "@/lib/feedback/prefs";
import { fx } from "@/lib/feedback";
import { TOAST_EVENT, showToast, type ToastDetail } from "@/lib/feedback/toast";
import styles from "./Feedback.module.css";

interface Props {
  signedIn: boolean;
  initial: Partial<FeedbackPrefs> | null;
  /** Server-computed dir from the UI locale; restored when RTL preview is off. */
  baseDir: "ltr" | "rtl";
}

function applyDom(p: FeedbackPrefs, baseDir: "ltr" | "rtl") {
  if (typeof document === "undefined") return;
  document.body.dataset.motion = p.motion ? "on" : "off";
  document.documentElement.dir = p.rtl ? "rtl" : baseDir;
}

export function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

export function FeedbackBoot({ signedIn, initial, baseDir }: Props) {
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: "", show: false });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prefs = hydrateFeedbackPrefs(initial, { signedIn });
    applyDom(prefs, baseDir);
    return subscribeFeedbackPrefs((p) => applyDom(p, baseDir));
  }, [initial, signedIn, baseDir]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target || typeof target.closest !== "function") return;
      const el = target.closest<HTMLElement>("[data-fx], [data-fx-toast], [data-fx-press]");
      if (!el) return;
      if (el.dataset.fx === "tap") fx.tap();
      const msg = el.dataset.fxToast;
      if (msg) showToast(msg);
      if (el.hasAttribute("data-fx-press") && getFeedbackPrefs().motion && !prefersReducedMotion()) {
        el.style.transform = "scale(0.97)";
        setTimeout(() => {
          el.style.transform = "";
        }, 110);
      }
    };
    // Locked tiles are role="button" divs — Enter/Space must behave like a click.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      const el = e.target as HTMLElement | null;
      if (!el || el.getAttribute("role") !== "button" || !el.dataset.fxToast) return;
      e.preventDefault();
      el.click();
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const onToast = (e: Event) => {
      const d = (e as CustomEvent<ToastDetail>).detail;
      if (!d?.message) return;
      setToast({ message: d.message, show: true });
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), d.duration);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      className={styles.toast}
      data-show={toast.show ? "true" : "false"}
      role="status"
      aria-live="polite"
      data-testid="fl-toast"
    >
      {toast.message && (
        <>
          <span className={styles.tDot} aria-hidden="true" />
          <span>{toast.message}</span>
        </>
      )}
    </div>
  );
}
