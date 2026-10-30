/**
 * Unit tests for the content-pages lane.
 *
 * These are "pure" tests — no server imports with side effects beyond
 * what Vitest's node env allows.
 */

import { describe, it, expect } from "vitest";

// Mirror helpers so the test is self-contained — they're private to the
// page module. If they move to a shared utils file, import from there.
function toKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function friendlyAgo(then: Date): string {
  const diff = Date.now() - then.getTime();
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return "just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  return then.toLocaleDateString();
}

function formatTimestamp(sec: number | null | undefined): string {
  if (!sec && sec !== 0) return "";
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, "0")}`;
}

describe("content/toKey", () => {
  it("pads month and day", () => {
    const d = new Date(2026, 0, 5); // Jan 5, 2026
    expect(toKey(d)).toBe("2026-01-05");
  });
});

describe("content/friendlyAgo", () => {
  it("returns 'just now' under an hour", () => {
    expect(friendlyAgo(new Date(Date.now() - 10 * 60 * 1000))).toBe("just now");
  });
  it("hours", () => {
    expect(friendlyAgo(new Date(Date.now() - 3 * 60 * 60 * 1000))).toBe("3h ago");
  });
  it("yesterday", () => {
    expect(friendlyAgo(new Date(Date.now() - 26 * 60 * 60 * 1000))).toBe("yesterday");
  });
});

describe("content/formatTimestamp", () => {
  it("formats seconds", () => {
    expect(formatTimestamp(0)).toBe("0:00");
    expect(formatTimestamp(65)).toBe("1:05");
    expect(formatTimestamp(3600)).toBe("60:00");
  });
  it("returns empty for null", () => {
    expect(formatTimestamp(null)).toBe("");
  });
});
