"use client";

import styles from "@/components/settings/Settings.module.css";

/**
 * Thin client wrappers that POST to Auth.js's own endpoints.
 * The scaffold agent owns `src/server/auth.ts`; we keep this UI-only.
 */

export function SignInButton() {
  return (
    <form action="/api/auth/signin/google" method="post">
      <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
        Sign in with Google
      </button>
    </form>
  );
}

export function SignOutButton() {
  return (
    <form action="/api/auth/signout" method="post">
      <button type="submit" className={styles.btn}>
        Sign out
      </button>
    </form>
  );
}
