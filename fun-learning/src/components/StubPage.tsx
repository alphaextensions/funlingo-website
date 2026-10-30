import styles from "./StubPage.module.css";

export function StubPage({
  title,
  agent,
}: {
  title: string;
  agent: string;
}) {
  return (
    <section className={styles.wrap}>
      <div className={styles.card}>
        <span className={styles.eyebrow}>TBD</span>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.body}>
          This will be built by the <span className={styles.agent}>{agent}</span> agent.
        </p>
      </div>
    </section>
  );
}
