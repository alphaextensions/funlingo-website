import { type Course, CourseSchema } from "./schema";

export type ValidationResult = { ok: true; course: Course } | { ok: false; errors: string[] };

/** ["seasons", 0, "episodes", 1] → "seasons[0].episodes[1]" */
export function formatPath(path: (string | number)[]): string {
  if (path.length === 0) return "(root)";
  return path.reduce<string>(
    (acc, seg) => (typeof seg === "number" ? `${acc}[${seg}]` : acc ? `${acc}.${seg}` : seg),
    "",
  );
}

/** Parses course JSON and checks what the schema alone cannot: unique ids and word refs. */
export function validateCourse(json: unknown): ValidationResult {
  const parsed = CourseSchema.safeParse(json);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.issues.map((i) => `${formatPath(i.path)}: ${i.message}`) };
  }

  const course = parsed.data;
  const errors: string[] = [];
  const seen = new Map<string, string>();
  const claim = (id: string, path: string) => {
    const first = seen.get(id);
    if (first) errors.push(`${path}.id: duplicate id "${id}" (first used at ${first})`);
    else seen.set(id, path);
  };

  course.seasons.forEach((season, si) => {
    const sp = `seasons[${si}]`;
    claim(season.id, sp);
    season.episodes.forEach((episode, ei) => {
      const ep = `${sp}.episodes[${ei}]`;
      claim(episode.id, ep);
      episode.scenes.forEach((scene, ci) => {
        const cp = `${ep}.scenes[${ci}]`;
        claim(scene.id, cp);
        scene.words.forEach((word, wi) => {
          if (!Object.hasOwn(course.words, word)) errors.push(`${cp}.words[${wi}]: unknown word "${word}"`);
        });
      });
    });
  });

  return errors.length ? { ok: false, errors } : { ok: true, course };
}
