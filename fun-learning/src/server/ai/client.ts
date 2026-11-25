/**
 * Groq (OpenAI-compatible) client.
 *
 * All AI calls go through this shared client. No feature agent should call
 * OpenAI/Groq SDKs directly — add functions under `src/server/ai/*` instead,
 * so cost caps + the content filter + the Confidential<T> contract are
 * centralised.
 *
 * See AGENT-PLAYBOOK "Stack" row for the model choices. Env: GROQ_API_KEY.
 */

import OpenAI from "openai";

/**
 * Lazy singleton — constructing OpenAI at module load throws when GROQ_API_KEY
 * is absent, which blows up `next build`'s static page-data collection pass.
 * A lazy singleton defers the key check until the first real call.
 *
 * INTENTIONALLY NOT EXPORTED. Only `invoke.ts` is allowed to reach the raw
 * client — every other call site goes through `invokeJson` / `invokeStream`
 * so cost caps + the content filter + the `Confidential<T>` boundary stay
 * centralised. Code that imports `groq` from this module bypasses all three.
 *
 * If you need direct access to a Groq shape `invokeJson` / `invokeStream`
 * don't expose, add a wrapper there instead.
 */
let _client: OpenAI | null = null;
function getClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: process.env.GROQ_API_KEY ?? "missing-groq-key",
    });
  }
  return _client;
}

/**
 * Package-private access for `src/server/ai/invoke.ts` only. The underscore
 * prefix + explicit name make a `rg groq` sweep still catch any accidental
 * reach-around; add a wrapper to `invoke.ts` instead.
 * @internal
 */
export function __internal_getGroqClient(): OpenAI {
  return getClient();
}

/** Default model — "a native speaker would say it" quality for translation,
 *  wordCard, cultureNotes, sentenceAnalysis, talkTurn, correctTurn. */
export const MODEL_SMART = "llama-3.3-70b-versatile" as const;

/** Cheap bulk model — use for high-volume batches like batch-translateLines
 *  or examples where quality tolerance is lower. */
export const MODEL_FAST = "llama-3.1-8b-instant" as const;

export type GroqModel = typeof MODEL_SMART | typeof MODEL_FAST;
