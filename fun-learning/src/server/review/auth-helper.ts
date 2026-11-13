/**
 * Resolve the user id for a review API request.
 *
 * Order of attempts:
 *   1. Auth.js session via `auth()`.
 *   2. In non-production builds, an `x-dev-user-id` header. This lets
 *      Playwright E2E tests and local scripts drive the API without a full
 *      Google OAuth round-trip. The user row must already exist (Prisma FK
 *      on ReviewLog / ReviewCardState).
 *
 * NEVER returns the dev fallback in production.
 */

export async function resolveReviewUserId(
  req: Request,
): Promise<string | null> {
  try {
    const { auth } = await import("@/server/auth");
    const session = await auth();
    const sessUserId = (session?.user as { id?: string } | undefined)?.id;
    if (sessUserId) return sessUserId;
  } catch {
    // ignore and fall through
  }

  if (process.env.NODE_ENV !== "production") {
    const dev = req.headers.get("x-dev-user-id");
    if (dev) return dev;
  }

  return null;
}
