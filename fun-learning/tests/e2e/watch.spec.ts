/**
 * Watch route e2e test.
 *
 * ENFORCES docs/LEGAL.md:
 *   "Nothing drawn over the YouTube iframe, or anything that hides YouTube's
 *   branding, links or ads. Subtitles go beside or below the player."
 *
 * We assert that NO visible, interactive DOM element intersects the
 * iframe's bounding rect across all three layout modes (Default, Focus,
 * Cinema). Elements inside the iframe itself (cross-origin, not readable
 * from the parent) are excluded by construction.
 */

import { test, expect, type Page } from "@playwright/test";

test.describe("Watch route — overlay-free iframe", () => {
  test("iframe never has interactive DOM drawn over it in any mode", async ({
    page,
  }) => {
    await page.goto("/watch/demo");

    // The YouTube IFrame API may be blocked in a sandboxed test env. We
    // only need the iframe element to be present; its content loading is
    // not required to assert overlap-freeness.
    const player = page.locator("[data-fnl-yt-wrap]");
    await expect(player).toBeVisible();

    // Give the iframe a tick to be injected by the IFrame API script.
    await page.waitForFunction(
      () => !!document.querySelector("[data-fnl-yt-wrap] iframe"),
      { timeout: 10_000 },
    ).catch(() => {
      // Even if YT api didn't load (test env often blocks it), the wrap
      // itself defines the "no-overlay zone" we must respect.
    });

    for (const mode of ["default", "focus", "cinema"] as const) {
      // Press 1/2/3 to switch mode.
      const key = mode === "default" ? "1" : mode === "focus" ? "2" : "3";
      await page.keyboard.press(key);
      // Let the layout settle.
      await page.waitForTimeout(300);
      await assertNoOverlap(page, mode);
    }
  });

  test("keyboard shortcuts: mode switch via 1/2/3 toggles aria-pressed", async ({
    page,
  }) => {
    await page.goto("/watch/demo");
    const defaultBtn = page.getByRole("button", { name: /Default layout/i });
    const focusBtn = page.getByRole("button", { name: /Focus layout/i });
    const cinemaBtn = page.getByRole("button", { name: /Cinema layout/i });

    await expect(defaultBtn).toHaveAttribute("aria-pressed", "true");
    await page.keyboard.press("2");
    await expect(focusBtn).toHaveAttribute("aria-pressed", "true");
    await page.keyboard.press("3");
    await expect(cinemaBtn).toHaveAttribute("aria-pressed", "true");
    await page.keyboard.press("1");
    await expect(defaultBtn).toHaveAttribute("aria-pressed", "true");
  });

  test("shortcut help opens with / and closes with Esc", async ({ page }) => {
    await page.goto("/watch/demo");
    await page.keyboard.press("/");
    await expect(page.getByRole("dialog", { name: /Keyboard shortcuts/i })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: /Keyboard shortcuts/i })).toHaveCount(0);
  });
});

async function assertNoOverlap(page: Page, mode: string) {
  const wrap = await page.locator("[data-fnl-yt-wrap]").first();
  const wrapBox = await wrap.boundingBox();
  if (!wrapBox) throw new Error(`iframe wrap has no bounding box in ${mode} mode`);

  // Enumerate every visible interactive element on the page and verify
  // none intersect the wrap rect. We DELIBERATELY check the wrap, not the
  // raw iframe — the wrap defines the no-draw zone (position:relative with
  // overflow:hidden; the iframe fills it exactly).
  const overlaps = await page.evaluate(({ wrapRect }) => {
    const results: Array<{ selector: string; rect: DOMRect }> = [];
    const all = Array.from(document.querySelectorAll("*")) as HTMLElement[];
    for (const el of all) {
      // Skip the wrap and its descendants — they ARE the player region.
      if (el.closest("[data-fnl-yt-wrap]")) continue;
      // Only interactive elements count as "drawn over" for the LEGAL rule
      // (static text in a sibling column clearly cannot overlap because
      // its parent isn't absolutely positioned above the iframe; but we
      // sanity check all positioned elements too).
      const cs = getComputedStyle(el);
      if (cs.display === "none" || cs.visibility === "hidden") continue;
      if (cs.pointerEvents === "none") continue;
      const tag = el.tagName.toLowerCase();
      const isInteractive =
        tag === "button" ||
        tag === "a" ||
        tag === "input" ||
        tag === "textarea" ||
        tag === "select" ||
        el.hasAttribute("role") ||
        el.hasAttribute("tabindex");
      // Also check any element with position:absolute / fixed, since those
      // are the ones at risk of drifting over the iframe.
      const isPositioned = cs.position === "absolute" || cs.position === "fixed";
      if (!isInteractive && !isPositioned) continue;

      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) continue;
      const horizOverlap = r.left < wrapRect.right && r.right > wrapRect.left;
      const vertOverlap = r.top < wrapRect.bottom && r.bottom > wrapRect.top;
      if (horizOverlap && vertOverlap) {
        results.push({ selector: describe(el), rect: r });
      }
    }

    function describe(el: HTMLElement): string {
      const id = el.id ? `#${el.id}` : "";
      const cls = el.className && typeof el.className === "string"
        ? "." + el.className.toString().split(/\s+/).slice(0, 2).join(".")
        : "";
      return `${el.tagName.toLowerCase()}${id}${cls}`;
    }

    return results;
  }, { wrapRect: wrapBox });

  // In Cinema mode subtitles sit BELOW the player, not on it, so overlaps
  // should still be 0.
  if (overlaps.length > 0) {
    throw new Error(
      `Mode "${mode}" has ${overlaps.length} element(s) overlapping the YouTube iframe region (LEGAL violation):\n` +
        overlaps.map((o) => `  - ${o.selector}`).join("\n"),
    );
  }
  expect(overlaps.length).toBe(0);
}
