"use client";

/**
 * EscapeTo — Wave 15 port of the extension's Escape handler (`te()` →
 * `ae()`): on a Fun Learning sub-view, Escape goes back one level. Renders
 * nothing. Ignores Escape while typing in a field or when another handler
 * already consumed it.
 */

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function EscapeTo({ href }: { href: string }) {
  const router = useRouter();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || e.defaultPrevented) return;
      const t = e.target as HTMLElement | null;
      const tag = t?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || t?.isContentEditable) return;
      e.preventDefault();
      router.push(href as never);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [href, router]);
  return null;
}
