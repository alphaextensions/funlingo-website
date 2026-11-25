/**
 * /account — session, connected providers, data export (SPEC §17).
 */

import { prisma } from "@/server/db";
import { getViewer } from "@/server/session";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { Card } from "@/components/Card";
import styles from "@/components/settings/Settings.module.css";
import { SignOutButton } from "@/components/account/AuthButtons";
import { SignInWithGoogleAction } from "./SignInWithGoogleAction";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const viewer = await getViewer();

  if (!viewer.userId || !viewer.user) {
    return (
      <>
        <PageHeader eyebrow="Account" title="Sign in" />
        <EmptyState
          eyebrow="Welcome"
          title="One tap, you're in"
          body="Fun Learning signs in with Google. Email magic links arrive in v2. Nothing you watch leaves your browser."
          actionsSlot={<SignInWithGoogleAction />}
        />
      </>
    );
  }

  const u = viewer.user;
  const accounts = await prisma.account.findMany({ where: { userId: u.id } });
  const sessions = await prisma.session.findMany({
    where: { userId: u.id },
    orderBy: { expires: "desc" },
    take: 5,
  });

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title={u.name ?? u.email ?? "Your account"}
        lede={u.email ?? "Signed in"}
      />
      <div className={styles.layout}>
        <nav className={styles.sideNav} aria-label="Account sections">
          <a href="#a-session" className={styles.sideLink}>Session</a>
          <a href="#a-providers" className={styles.sideLink}>Providers</a>
          <a href="#a-export" className={styles.sideLink}>Export</a>
        </nav>
        <div>
          <section id="a-session" className={styles.group}>
            <h3 className={styles.groupTitle}>Session</h3>
            <p className={styles.groupLede}>
              Signed in as <strong>{u.email ?? u.name ?? "a Fun Learning user"}</strong>.
              Sessions last long on purpose — Trancy signs out every 2–3 days; we don't.
            </p>
            <div className={styles.actions}>
              <SignOutButton />
            </div>
            {sessions.length > 0 && (
              <table className={styles.shortcutTable} aria-label="Active sessions">
                <tbody>
                  {sessions.map((s) => (
                    <tr key={s.id}>
                      <td>Session {s.id.slice(0, 6)}…</td>
                      <td>expires {new Date(s.expires).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <section id="a-providers" className={styles.group}>
            <h3 className={styles.groupTitle}>Connected sign-in</h3>
            <p className={styles.groupLede}>Add or remove how you sign in.</p>
            {accounts.length === 0 ? (
              <p className={styles.groupLede}>No linked providers yet.</p>
            ) : (
              <table className={styles.shortcutTable} aria-label="Providers">
                <tbody>
                  {accounts.map((a) => (
                    <tr key={a.id}>
                      <td>{capitalize(a.provider)}</td>
                      <td>{a.providerAccountId.slice(0, 8)}…</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>

          <section id="a-export" className={styles.group}>
            <h3 className={styles.groupTitle}>Export my data</h3>
            <p className={styles.groupLede}>
              Download your saved words and sentences as CSV or JSON. Anki-compatible CSV columns are included for one-click import.
            </p>
            <div className={styles.actions}>
              <a className={styles.btn} href="/api/export?what=words&format=csv">Words (CSV)</a>
              <a className={styles.btn} href="/api/export?what=sentences&format=csv">Sentences (CSV)</a>
              <a className={styles.btn} href="/api/export?what=all&format=json">Everything (JSON)</a>
            </div>
          </section>

          <Card eyebrow="One metric" title="The hub thesis">
            Save words while you watch, review them here. If that loop fires at
            least once a week, you&apos;re learning faster than reading alone.
          </Card>
        </div>
      </div>
    </>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
