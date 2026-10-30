import styles from "./Progress.module.css";

export interface HeatmapDay {
  date: string; // YYYY-MM-DD
  value: number; // minutes + reviews
}

/**
 * ActivityHeatmap — 5 months per SPEC §4. Columns are weeks (Sun→Sat).
 * Level 0..4 chosen by quantile of non-zero days.
 */
export function ActivityHeatmap({ days }: { days: HeatmapDay[] }) {
  const byDate = new Map(days.map((d) => [d.date, d.value]));
  const nonZero = days.map((d) => d.value).filter((v) => v > 0).sort((a, b) => a - b);
  const q = (p: number) => {
    if (nonZero.length === 0) return 0;
    return nonZero[Math.min(nonZero.length - 1, Math.floor(nonZero.length * p))];
  };
  const t1 = q(0.25);
  const t2 = q(0.5);
  const t3 = q(0.75);

  function level(v: number): 0 | 1 | 2 | 3 | 4 {
    if (!v) return 0;
    if (v > t3) return 4;
    if (v > t2) return 3;
    if (v > t1) return 2;
    return 1;
  }

  const today = startOfDay(new Date());
  const start = new Date(today.getTime());
  start.setMonth(today.getMonth() - 4);
  start.setDate(1);
  // Walk forward week by week, grouping by month label.
  const weeks: { month: number; year: number; days: (HeatmapDay | null)[] }[] = [];
  const cursor = new Date(start);
  cursor.setDate(cursor.getDate() - cursor.getDay()); // back up to Sunday
  while (cursor <= today) {
    const week: (HeatmapDay | null)[] = [];
    for (let d = 0; d < 7; d += 1) {
      const key = toKey(cursor);
      const inRange = cursor >= start && cursor <= today;
      week.push(inRange ? { date: key, value: byDate.get(key) ?? 0 } : null);
      cursor.setDate(cursor.getDate() + 1);
    }
    weeks.push({ month: week[0]?.date ? new Date(week[0].date).getMonth() : -1, year: week[0]?.date ? new Date(week[0].date).getFullYear() : 0, days: week });
  }

  const monthLabels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  // Attach a month label when the week is the first of its month.
  let prevMonth = -1;
  const labelled = weeks.map((w) => {
    const label = w.month !== prevMonth ? monthLabels[w.month] : "";
    prevMonth = w.month;
    return { ...w, label };
  });

  return (
    <section className={styles.heatmapWrap} aria-label="Activity heatmap">
      <header className={styles.heatHead}>
        <h3 className={styles.heatTitle}>Last 5 months</h3>
        <div className={styles.heatLegend}>
          <span className={styles.lv0} /> less
          <span className={styles.lv1} />
          <span className={styles.lv2} />
          <span className={styles.lv3} />
          <span className={styles.lv4} /> more
        </div>
      </header>
      <div className={styles.heatGrid}>
        <div className={styles.dayLabels} aria-hidden="true">
          <span />
          <span>Mon</span>
          <span />
          <span>Wed</span>
          <span />
          <span>Fri</span>
          <span />
        </div>
        <div className={styles.weeks}>
          {labelled.map((w, i) => (
            <div key={i} className={styles.monthRow}>
              <span className={styles.monthLabel}>{w.label}</span>
              <span style={{ height: 0 }} />
              {w.days.map((d, di) => (
                <HeatmapCell key={di} day={d} level={d ? level(d.value) : 0} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeatmapCell({ day, level }: { day: HeatmapDay | null; level: 0 | 1 | 2 | 3 | 4 }) {
  if (!day) return <span style={{ visibility: "hidden" }} className={styles.cell} />;
  const lvClass =
    level === 0
      ? styles.cell
      : level === 1
        ? `${styles.cell} ${styles.cellLv1}`
        : level === 2
          ? `${styles.cell} ${styles.cellLv2}`
          : level === 3
            ? `${styles.cell} ${styles.cellLv3}`
            : `${styles.cell} ${styles.cellLv4}`;
  return (
    <span
      className={lvClass}
      role="img"
      aria-label={`${day.date}: ${day.value} units`}
      title={`${day.date}: ${day.value} units`}
    />
  );
}

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function toKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
