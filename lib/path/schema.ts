import { z } from "zod";
import { CEFR, TAKE_KINDS } from "./constants";

// Shape of content/courses/<course>/course.json. One course is one language pair, so
// every human-readable string is in the course's native language and glosses need no
// per-language map. Objects are strict so a misspelled key fails instead of vanishing.
// Cross-course checks (unique ids, word refs) live in validate.ts.

const Id = z.string().regex(/^[a-z0-9][a-z0-9-]*$/, "must be lowercase letters, digits and dashes");
const Lang = z.string().regex(/^[a-z]{2}$/, "must be a two-letter language code");
const Text = z.string().min(1);

export const WordEntrySchema = z
  .object({
    term: Text,
    gloss: Text,
    romanization: z.string().optional(),
    audio: z.string().optional(),
  })
  .strict();

export const CueSchema = z
  .object({
    t: z.number().nonnegative(),
    target: Text,
    native: z.string(),
  })
  .strict();

export const ClipSchema = z
  .object({
    src: Text,
    durationSec: z.number().positive(),
    difficulty: z.number().int().min(1).max(100),
    cues: z.array(CueSchema).min(1),
  })
  .strict()
  .superRefine((clip, ctx) => {
    clip.cues.forEach((cue, i) => {
      if (i > 0 && cue.t <= clip.cues[i - 1].t) {
        ctx.addIssue({ code: "custom", path: ["cues", i, "t"], message: "cue times must strictly ascend" });
      }
      if (cue.t >= clip.durationSec) {
        ctx.addIssue({
          code: "custom",
          path: ["cues", i, "t"],
          message: `must be under the clip duration (${clip.durationSec}s)`,
        });
      }
    });
  });

const ColdOpenSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("dialogue"),
    lines: z.array(z.object({ speaker: Text, target: Text, native: z.string() }).strict()).min(1),
  }).strict(),
  z.object({ kind: z.literal("clip"), clip: ClipSchema }).strict(),
]);

export const TakeSchema = z.object({
  kind: z.enum(TAKE_KINDS),
  items: z.array(z.string()).optional(),
}).strict();

export const SceneSchema = z.object({
  id: Id,
  title: Text,
  coldOpen: ColdOpenSchema,
  words: z.array(z.string()).min(1),
  pattern: z.object({ title: Text, tip: Text }).strict().optional(),
  takes: z.array(TakeSchema).min(1),
}).strict();

export const QuestionSchema = z
  .object({
    prompt: Text,
    options: z.array(Text).min(2),
    answer: z.number().int().nonnegative(),
  })
  .strict()
  .superRefine((q, ctx) => {
    if (q.answer >= q.options.length) {
      ctx.addIssue({
        code: "custom",
        path: ["answer"],
        message: `must index one of the ${q.options.length} options`,
      });
    }
  });

// The pass mark is FINALE_PASS_PCT for every episode; supabase apply_events applies
// the same constant, so it is deliberately not configurable per episode.
export const FinaleSchema = z.object({
  questions: z.array(QuestionSchema).min(1),
}).strict();

export const EpisodeSchema = z.object({
  id: Id,
  theme: Text,
  title: Text,
  scenes: z.array(SceneSchema).min(1),
  finale: FinaleSchema,
}).strict();

export const SeasonSchema = z.object({
  id: Id,
  cefr: z.enum(CEFR),
  title: Text,
  canDo: z.array(Text).min(1),
  episodes: z.array(EpisodeSchema).min(1),
}).strict();

export const CourseSchema = z
  .object({
    _note: z.string().optional(), // free-form authoring note
    id: z.string().regex(/^[a-z]{2}-[a-z]{2}$/, 'must be "<native>-<target>", e.g. "hi-en"'),
    native: Lang,
    target: Lang,
    version: z.number().int().min(1),
    words: z.record(Id, WordEntrySchema),
    seasons: z.array(SeasonSchema).min(1),
  })
  .strict()
  .superRefine((c, ctx) => {
    if (c.id !== `${c.native}-${c.target}`) {
      ctx.addIssue({ code: "custom", path: ["id"], message: `must equal "${c.native}-${c.target}"` });
    }
  });

export type WordEntry = z.infer<typeof WordEntrySchema>;
export type Cue = z.infer<typeof CueSchema>;
export type Clip = z.infer<typeof ClipSchema>;
export type Take = z.infer<typeof TakeSchema>;
export type Scene = z.infer<typeof SceneSchema>;
export type Question = z.infer<typeof QuestionSchema>;
export type Finale = z.infer<typeof FinaleSchema>;
export type Episode = z.infer<typeof EpisodeSchema>;
export type Season = z.infer<typeof SeasonSchema>;
export type Course = z.infer<typeof CourseSchema>;
