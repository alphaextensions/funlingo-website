/**
 * Review smoke test — runs a 3-card session end-to-end against a fresh user,
 * exercising the Flashcard drill and the "lang scoping" veto test.
 *
 * The scaffold doesn't ship Auth.js plumbing for Playwright, so we drive
 * the UI via the `dev_user` query parameter (SSR fallback) + the
 * `x-dev-user-id` fetch header (API fallback). Both are gated on
 * NODE_ENV !== "production".
 *
 * Setup uses a direct Prisma seed call via a dedicated test-only API route
 * (`/api/test-seed`) which is only mounted when NODE_ENV !== "production".
 */

import { test, expect, request } from "@playwright/test";

test.describe("Review smoke", () => {
  test("runs a 3-card EN session end-to-end and shows the summary", async ({
    page,
    baseURL,
  }) => {
    // Seed a user with 3 EN cards + 2 JP cards (to also prove lang scoping).
    const api = await request.newContext({ baseURL });
    const seed = await api.post("/api/test-seed", {
      data: {
        label: `smoke_${Date.now()}`,
        words: [
          { lemma: "resilient", lang: "en", note: "able to bounce back" },
          { lemma: "serendipity", lang: "en", note: "a happy accident" },
          { lemma: "ubiquitous", lang: "en", note: "present everywhere" },
          { lemma: "こんにちは", lang: "ja", note: "hello (JP)" },
          { lemma: "ありがとう", lang: "ja", note: "thank you (JP)" },
        ],
      },
    });
    expect(seed.ok(), `seed failed: ${await seed.text()}`).toBe(true);
    const { userId } = (await seed.json()) as { userId: string };

    // Fetch the session API with lang=en — must return 3 EN cards and ZERO JP.
    const sessApi = await api.get(`/api/review/session?lang=en`, {
      headers: { "x-dev-user-id": userId },
    });
    expect(sessApi.ok()).toBe(true);
    const sess = (await sessApi.json()) as {
      count: number;
      cards: { lang: string }[];
    };
    expect(sess.count).toBe(3);
    for (const c of sess.cards) expect(c.lang).toBe("en");

    // Drive the UI. page.goto queues the dev identity.
    await page.goto(`/review?dev_user=${userId}&lang=en`);
    await expect(page.getByText(/REVIEW · EN/i)).toBeVisible();

    for (let i = 0; i < 3; i++) {
      // Each flashcard: Reveal (if visible) then press Good (3).
      const reveal = page.getByRole("button", { name: /reveal meaning/i });
      if (await reveal.isVisible()) {
        await reveal.click();
      }
      // Press the 3 shortcut for Good.
      await page.keyboard.press("3");
      // Give the API round-trip a beat.
      await page.waitForTimeout(400);
    }

    // Summary should show.
    await expect(page.getByTestId("review-summary")).toBeVisible();
    await expect(page.getByText(/Nice work\./i)).toBeVisible();

    // Clean up.
    await api.post("/api/test-seed/cleanup", {
      data: { userId },
    });
  });
});
