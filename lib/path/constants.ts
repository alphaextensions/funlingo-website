// Pass marks follow Rosetta Stone's: 75% on a unit Milestone, 85% to place out.
export const FINALE_PASS_PCT = 75;
export const PLACEMENT_PASS_PCT = 85;

export const TAKE_KINDS = ["watch", "wordlab", "guess", "pattern", "shadow", "listen"] as const;
export const CEFR = ["A1", "A2", "B1", "B2"] as const;

export type TakeKind = (typeof TAKE_KINDS)[number];
export type CefrLevel = (typeof CEFR)[number];
