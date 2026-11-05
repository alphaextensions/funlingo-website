/**
 * LearnLanding — shared "Fun Learning" extension-parity landing.
 *
 * Mirrors `docs/design-reference/extension-fun-learning.html` section
 * `#view-landing`: a greeting pill, two-line "Fun / Learning" hero, a
 * first-run welcome banner, a 5-tile experience grid and a one-line
 * footer. Used by BOTH `/` (web-app home) and `/learn` so a long-time
 * extension user sees the same front door regardless of which URL they
 * land on from the extension-to-web handoff.
 *
 * Tiles (order matches the extension exactly):
 *   01 Word Replay    → /words              (locked when 0 UserWords)
 *   02 Quick Quiz     → /review?mode=quiz   (locked when 0 UserWords)
 *   03 Tiny Lessons   → /learn/tiny-lessons
 *   04 Slang Hang     → /learn/slang
 *   05 Your Library   → /words
 *
 * Lang-scoped on the UserWord count — a learner's EN count must not
 * unlock the JP tiles. Non-negotiable #4.
 *
 * Signed-out visitors land here too — in that case `userWordCount` is
 * forced to 0 so Word Replay + Quick Quiz render in their locked state
 * (just like a first-run extension install) and the welcome banner is
 * shown. Tiny Lessons / Slang Hang remain fully usable without a sign-in.
 */

import Link from "next/link";
import { prisma } from "@/server/db";
import { getViewer } from "@/server/session";
import { getT } from "@/server/i18n";
import styles from "./learn.module.css";

const Arrow = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M5 12h13M12 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LockIcon = (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect x="5" y="11" width="14" height="9" rx="2" stroke="currentColor" strokeWidth="2" />
    <path d="M8 11V8a4 4 0 018 0v3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

interface TileCommon {
  num: string;
  title: string;
  body: string;
  cta: string;
  variant: "cReplay" | "cQuiz" | "cLessons" | "cSlang" | "cLibrary";
  motif: JSX.Element;
}

interface UnlockedTile extends TileCommon {
  locked?: false;
  href: string;
}

interface LockedTile extends TileCommon {
  locked: true;
}

type Tile = UnlockedTile | LockedTile;

async function countUserWords(userId: string, lang: string): Promise<number> {
  // Lang-scoped per non-negotiable #4 — a learner's active-lang UserWord count
  // is what unlocks Word Replay + Quick Quiz. Cross-lang words elsewhere in
  // their deck don't count.
  try {
    return await prisma.userWord.count({ where: { userId, lang } });
  } catch {
    return 0;
  }
}

type T = ReturnType<typeof getT>;

/* Motif words (betray / whisper / lowkey / "Window seat, please") are
   decorative, aria-hidden sample vocabulary copied from the extension —
   illustration, not chrome, so they stay untranslated on purpose. */
function tiles(wordCount: number, t: T): Tile[] {
  const unlocked = wordCount > 0;
  return [
    {
      num: "01",
      variant: "cReplay",
      title: t("learn.replayTitle"),
      body: t("learn.replayBody"),
      cta: t("learn.ctaContinue"),
      locked: !unlocked ? true : undefined,
      href: "/words",
      motif: (
        <span className={`${styles.motif} ${styles.motifReplay}`} aria-hidden="true">
          <span className={`${styles.mw} ${styles.mw3}`}>betray</span>
          <span className={`${styles.mw} ${styles.mw2}`}>gorgeous</span>
          <span className={`${styles.mw} ${styles.mw1}`}>curious<span className={styles.bar}></span></span>
        </span>
      ),
    } as Tile,
    {
      num: "02",
      variant: "cQuiz",
      title: t("learn.quizTitle"),
      body: t("learn.quizBody"),
      cta: t("learn.ctaPractice"),
      locked: !unlocked ? true : undefined,
      href: "/review?mode=quiz&focus=casual",
      motif: (
        <span className={`${styles.motif} ${styles.motifQuiz}`} aria-hidden="true">
          <span className={styles.qWord}>whisper</span>
          <span className={`${styles.qOpt} ${styles.qOk}`}>
            <span className={styles.qOptText}></span>
            <span className={styles.tick}>✓</span>
          </span>
          <span className={`${styles.qOpt} ${styles.qDim}`}>
            <span className={styles.qOptText}></span>
          </span>
        </span>
      ),
    } as Tile,
    {
      num: "03",
      variant: "cLessons",
      title: t("learn.lessonsTitle"),
      body: t("learn.lessonsBody"),
      cta: t("learn.ctaExplore"),
      href: "/learn/tiny-lessons",
      motif: (
        <span className={`${styles.motif} ${styles.motifLessons}`} aria-hidden="true">
          <span className={styles.lCard}>
            <span className={styles.lPhrase}>Window seat, please</span>
            <span className={`${styles.lLine} ${styles.lLine1}`}></span>
            <span className={`${styles.lLine} ${styles.lLine2}`}></span>
            <span className={styles.lTap}>tap to flip →</span>
          </span>
        </span>
      ),
    } as Tile,
    {
      num: "04",
      variant: "cSlang",
      title: t("learn.slangTitle"),
      body: t("learn.slangBody"),
      cta: t("learn.ctaDiscover"),
      href: "/learn/slang",
      motif: (
        <span className={`${styles.motif} ${styles.motifSlang}`} aria-hidden="true">
          <span className={styles.sEra}>modern</span>
          <span className={styles.sBubble}>lowkey</span>
        </span>
      ),
    } as Tile,
    {
      num: "05",
      variant: "cLibrary",
      title: t("learn.libraryTitle"),
      body: t("learn.libraryBody"),
      cta: t("learn.ctaBrowse"),
      href: "/words",
      motif: (
        <span className={`${styles.motif} ${styles.motifLibrary}`} aria-hidden="true">
          <span className={`${styles.lc} ${styles.lcOn}`}></span>
          <span className={styles.lc}></span>
          <span className={`${styles.lc} ${styles.lcMark}`}>
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 3h12a1 1 0 011 1v17l-7-4-7 4V4a1 1 0 011-1z" /></svg>
          </span>
          <span className={styles.lc}></span>
          <span className={`${styles.lc} ${styles.lcOn}`}></span>
          <span className={styles.lc}></span>
        </span>
      ),
    } as Tile,
  ];
}

function TileCard({ tile, t }: { tile: Tile; t: T }) {
  const commonClass = `${styles.card} ${styles[tile.variant]}${tile.locked ? " " + styles.locked : ""}`;
  const inner = (
    <>
      {tile.motif}
      <span className={styles.xnum}>{tile.num}</span>
      <h3 className={styles.h}>{tile.title}</h3>
      <p className={styles.p}>{tile.body}</p>
      <span className={styles.try}>
        <span>{tile.cta}</span>
        {Arrow}
      </span>
      <span className={styles.lockHint}>
        {LockIcon}
        <span>{t("learn.saveToUnlock")}</span>
      </span>
    </>
  );
  if (tile.locked) {
    return (
      <div
        className={commonClass}
        role="button"
        aria-disabled="true"
        aria-label={t("learn.lockedAria", { title: tile.title })}
        tabIndex={0}
        data-testid={`learn-tile-${tile.variant}`}
        // Wave 15 — extension `ee()`: a locked tile taps + toasts
        // "Save words while watching to unlock" (handled by FeedbackBoot).
        data-fx="tap"
        data-fx-toast={t("learn.saveToUnlock")}
      >
        {inner}
      </div>
    );
  }
  return (
    <Link
      href={tile.href as never}
      className={commonClass}
      data-testid={`learn-tile-${tile.variant}`}
      // Wave 15 — extension `ee()`: tap cue + 110 ms scale(0.97) press.
      data-fx="tap"
      data-fx-press=""
    >
      {inner}
    </Link>
  );
}

/**
 * Shared landing. Both `app/page.tsx` and `app/learn/page.tsx` render
 * this so / and /learn ARE the extension's view-landing surface.
 */
export async function LearnLanding() {
  const viewer = await getViewer();
  const userWordCount = viewer.userId
    ? await countUserWords(viewer.userId, viewer.activeLang)
    : 0;
  const showWelcome = userWordCount < 5;
  // Chrome = viewer's native lang. The UserWord count above stays scoped
  // to the LEARNING lang (viewer.activeLang).
  const t = getT(viewer);
  const tileList = tiles(userWordCount, t);

  return (
    <section className={styles.wrap}>
      <div className={styles.hero}>
        <span className={styles.greet}>
          <span className={styles.greetDot} aria-hidden="true"></span>
          <span>{t("learn.greeting")}</span>
        </span>
        <h1>
          <span translate="no">{t("learn.heroTitleLine1")}</span>
          <span className={styles.l2} translate="no">{t("learn.heroTitleLine2")}</span>
        </h1>
        <p className={styles.sub}>{t("learn.heroSub")}</p>
      </div>

      {showWelcome && (
        <div className={styles.welcome} role="note" data-testid="learn-welcome">
          <div className={styles.welcomeEmoji} aria-hidden="true">👋</div>
          <div className={styles.welcomeBody}>
            <h3>{t("learn.welcomeTitle")}</h3>
            <p>
              {t("learn.welcomeBody", {
                replay: t("learn.replayTitle"),
                quiz: t("learn.quizTitle"),
                lessons: t("learn.lessonsTitle"),
                slang: t("learn.slangTitle"),
              })}
            </p>
          </div>
        </div>
      )}

      <div className={styles.grid} data-testid="learn-grid">
        {tileList.map((tile) => (
          <TileCard key={tile.num} tile={tile} t={t} />
        ))}
      </div>

      <div className={styles.footer}>{t("learn.footer")}</div>
    </section>
  );
}
