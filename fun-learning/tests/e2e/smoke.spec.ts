import { test, expect } from "@playwright/test";

test("Home renders with hero, dark theme, and nav rail", async ({ page, context }) => {
  // Wave 18: a first visit to / redirects to /welcome; mark it done.
  await context.addCookies([{ name: "fl_welcome", value: "done", url: "http://localhost:3000" }]);
  await page.goto("/");

  // Hero text
  await expect(page.getByText("Fun", { exact: true })).toBeVisible();
  await expect(page.getByText("Learning", { exact: true })).toBeVisible();

  // Dark theme: computed body background matches --fl-bg (#0a0813 -> rgb(10, 8, 19))
  const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(bg).toBe("rgb(10, 8, 19)");

  // Rail renders at desktop width (viewport is ≥1200px by default for Desktop Chrome).
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(page.getByRole("link", { name: "Home" }).first()).toBeVisible();
});
