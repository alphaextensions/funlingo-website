/**
 * Central AI invocation helper. Every public function in
 * `src/lib/ai/index.ts` eventually funnels through here.
 *
 * This is the only place in the codebase that:
 *   - calls `assertCanCall` BEFORE the Groq request (cost caps),
 *   - unwraps `Confidential<T>` just before sending to Groq,
 *   - applies the safety `filter` to every output,
 *   - records real-cost reconciliation to the wallet + monthly meter.
 *
 * Feature agents never call `groq.chat.completions.create` directly — add a
 * new prompt file + a thin wrapper in `src/lib/ai/index.ts` instead.
 */

import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { __internal_getGroqClient } from "./client";
import { assertCanCall, recordCall, refundReservation } from "./limits";
import { filterDeep, filter } from "./safety/filter";
import {
  RateLimitError,
  SafetyFilterError,
  type ChatMessage,
  type PromptModule,
} from "./types";
import { logger } from "@/server/logging/scrubber";

export interface InvokeArgs<TInput, TOutput> {
  module: PromptModule<TInput>;
  input: TInput;
  userId: string;
  ipHash?: string;
  /** Characters of unwrapped input text — used by `maxInputTokens` guard
   *  without logging the text itself. */
  inputChars: number;
  /** Parse the raw model text into a structured output. */
  parse: (raw: string) => TOutput;
}

export async function invokeJson<TInput, TOutput>(
  args: InvokeArgs<TInput, TOutput>,
): Promise<TOutput> {
  const { module, input, userId, ipHash, inputChars, parse } = args;

  await assertCanCall({
    scope: module.name,
    userId,
    ipHash,
    inputChars,
    rateLimit: module.rateLimit,
  });

  const reservedTokens = Math.ceil(inputChars / 4) * 2;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), module.rateLimit.timeoutMs);

  try {
    const messages = module.prompt(input) as ChatMessage[];
    const resp = await __internal_getGroqClient().chat.completions.create(
      {
        model: module.rateLimit.model,
        messages: messages as ChatCompletionMessageParam[],
        response_format:
          module.responseFormat === "json" ? { type: "json_object" } : undefined,
        temperature: 0.3,
      },
      { signal: controller.signal },
    );
    clearTimeout(timeout);

    const raw = resp.choices[0]?.message?.content ?? "";
    const parsed = parse(raw);

    const safety = filterDeep(parsed);
    if (!safety.ok) {
      logger.warn({ scope: module.name, violated: safety.violated },
        "Safety filter rejected AI output");
      throw new SafetyFilterError(safety.violated);
    }

    await recordCall({
      scope: module.name,
      userId,
      model: module.rateLimit.model,
      inputTokens: resp.usage?.prompt_tokens ?? reservedTokens / 2,
      outputTokens: resp.usage?.completion_tokens ?? reservedTokens / 2,
      reservedTokens,
    });
    return parsed;
  } catch (err) {
    clearTimeout(timeout);
    if (err instanceof RateLimitError || err instanceof SafetyFilterError) throw err;
    await refundReservation({ userId, reservedTokens });
    throw err;
  }
}

/** Streaming version used by `translateLines` and `talkTurn`. Each chunk is
 *  parsed via `parseChunk` and filtered independently so a bad token can't
 *  slip past. The final iteration also records the real cost.
 */
export async function* invokeStream<TInput, TChunk>(args: {
  module: PromptModule<TInput>;
  input: TInput;
  userId: string;
  ipHash?: string;
  inputChars: number;
  /** Parses a delta string into zero or more structured chunks. The function
   *  is responsible for buffering across deltas (e.g. NDJSON lines). */
  parseChunk: (buffered: string) => { emit: TChunk[]; remaining: string };
}): AsyncIterable<TChunk> {
  const { module, input, userId, ipHash, inputChars, parseChunk } = args;

  await assertCanCall({
    scope: module.name,
    userId,
    ipHash,
    inputChars,
    rateLimit: module.rateLimit,
  });

  const reservedTokens = Math.ceil(inputChars / 4) * 2;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), module.rateLimit.timeoutMs);

  let outputTokensApprox = 0;
  try {
    const messages = module.prompt(input) as ChatMessage[];
    const stream = await __internal_getGroqClient().chat.completions.create(
      {
        model: module.rateLimit.model,
        messages: messages as ChatCompletionMessageParam[],
        stream: true,
        response_format:
          module.responseFormat === "json" ? { type: "json_object" } : undefined,
        temperature: 0.3,
      },
      { signal: controller.signal },
    );

    let buffer = "";
    for await (const part of stream) {
      const delta = part.choices[0]?.delta?.content ?? "";
      if (!delta) continue;
      outputTokensApprox += Math.ceil(delta.length / 4);
      buffer += delta;
      const { emit, remaining } = parseChunk(buffer);
      buffer = remaining;
      for (const chunk of emit) {
        const safety = filterDeep(chunk);
        if (!safety.ok) {
          logger.warn({ scope: module.name, violated: safety.violated },
            "Safety filter rejected streamed chunk — abandoning rest");
          throw new SafetyFilterError(safety.violated);
        }
        yield chunk;
      }
    }

    // Flush any trailing content once the stream ends.
    const { emit } = parseChunk(buffer + "\n");
    for (const chunk of emit) {
      const safety = filterDeep(chunk);
      if (!safety.ok) throw new SafetyFilterError(safety.violated);
      yield chunk;
    }

    await recordCall({
      scope: module.name,
      userId,
      model: module.rateLimit.model,
      inputTokens: Math.ceil(inputChars / 4),
      outputTokens: outputTokensApprox,
      reservedTokens,
    });
  } catch (err) {
    if (!(err instanceof RateLimitError || err instanceof SafetyFilterError)) {
      await refundReservation({ userId, reservedTokens });
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

/** Shared safe-string tag — anywhere a free-form string flows into a model
 *  response (not a structured field), callers can run it through `filter()`
 *  before accepting it. invokeJson/invokeStream already do this; this export
 *  is for one-off call sites. */
export { filter };
