/**
 * Wave 15 — port of the extension's `xe(message, {duration})` toast.
 * A single global pill at the bottom of the viewport, auto-hides after
 * 2600 ms (extension default). The host lives in `FeedbackBoot`.
 */

export const TOAST_EVENT = "fl:toast";
export const TOAST_DEFAULT_MS = 2600;

export interface ToastDetail {
  message: string;
  duration: number;
}

export function showToast(message: string, opts: { duration?: number } = {}): void {
  if (typeof window === "undefined" || !message) return;
  const detail: ToastDetail = { message, duration: opts.duration ?? TOAST_DEFAULT_MS };
  window.dispatchEvent(new CustomEvent<ToastDetail>(TOAST_EVENT, { detail }));
}
