/**
 * Help ladder — pure state machine.
 *
 * SPEC §7.3 Help ladder: Nudge → Starter → Full suggestion. Three progressive
 * levels; each level reveals strictly more than the one before it. Logged
 * via TalkTurn.helpLevel so the end-of-session report can call it out.
 *
 * This module stays pure (no DB, no network) so it's easy to unit-test and
 * stays shared between server + client.
 */

export const HELP_LADDER_MAX = 3;

export type HelpLevel = 0 | 1 | 2 | 3;

export interface HelpState {
  level: HelpLevel;
}

export function initialHelpState(): HelpState {
  return { level: 0 };
}

/** Advance to the next help level. Clamped at HELP_LADDER_MAX. Pure. */
export function advanceHelp(state: HelpState): HelpState {
  const next = Math.min(state.level + 1, HELP_LADDER_MAX) as HelpLevel;
  return { level: next };
}

/** Reset after the user actually sends their next turn — the ladder restarts
 *  from Nudge for whatever they say after. */
export function resetHelp(): HelpState {
  return { level: 0 };
}

export function helpLabel(level: HelpLevel): string {
  switch (level) {
    case 0:
      return "Help";
    case 1:
      return "Nudge";
    case 2:
      return "Starter";
    case 3:
      return "Full suggestion";
  }
}

export function helpDescription(level: HelpLevel): string {
  switch (level) {
    case 0:
      return "Not sure what to say? Tap Help for a nudge.";
    case 1:
      return "A hint of what you could say.";
    case 2:
      return "The first few words to get you started.";
    case 3:
      return "A full suggestion, with a note on why.";
  }
}

/**
 * Build the client-side payload for the current help level, given a model
 * suggestion the server produced via `correctTurn` on the AI's last line.
 *
 * The server stays authoritative on the suggestion text — this function only
 * *trims* it down for levels 1 and 2 so a learner isn't handed the whole
 * answer before they've thought. Level 3 is the full suggestion verbatim.
 */
export function helpContentFor(
  level: HelpLevel,
  full: { suggestion: string; hint: string; reason: string },
): { title: string; body: string; reason?: string } | null {
  if (level === 0) return null;
  if (level === 1) {
    return { title: helpLabel(level), body: full.hint };
  }
  if (level === 2) {
    const words = full.suggestion.trim().split(/\s+/);
    const starter = words.slice(0, Math.min(3, Math.max(1, Math.ceil(words.length / 3)))).join(" ");
    return { title: helpLabel(level), body: `${starter}…` };
  }
  // level === 3
  return {
    title: helpLabel(level),
    body: full.suggestion,
    reason: full.reason,
  };
}

export const HELP_LADDER_SPEC = {
  HELP_LADDER_MAX,
  advanceHelp,
  resetHelp,
  helpContentFor,
} as const;
