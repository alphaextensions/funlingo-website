// Registry for the path's illustrations: which episode themes have artwork, and how
// each dialogue character looks. The drawings live in app/learn/_components/art.

export const ART_THEMES = ["greetings", "food", "directions", "shopping", "family", "work", "time", "health"] as const;
export type ArtTheme = (typeof ART_THEMES)[number];

export const isArtTheme = (theme: string): theme is ArtTheme => (ART_THEMES as readonly string[]).includes(theme);

const SKIN = ["#F1C7A5", "#E0AC84", "#B97B54", "#7A4E33"];
const HAIR = ["#2B1B17", "#5B3A29", "#A0522D", "#1F1F2E", "#D9A35B"];
const BACKDROP = ["#BC22D6", "#E0319E", "#7C3AED", "#9A1C8E", "#F472B6", "#FB923C"];
export const HAIR_STYLES = ["short", "long", "bun", "curly"] as const;

export type AvatarLook = { skin: string; hair: string; style: (typeof HAIR_STYLES)[number]; backdrop: string };

// The recurring cast gets fixed looks so they stay recognisable from scene to scene.
const CAST: Record<string, AvatarLook> = {
  Ana: { skin: SKIN[0], hair: HAIR[2], style: "long", backdrop: BACKDROP[1] },
  Diego: { skin: SKIN[2], hair: HAIR[0], style: "short", backdrop: BACKDROP[2] },
  Sofía: { skin: SKIN[1], hair: HAIR[1], style: "curly", backdrop: BACKDROP[0] },
  Leo: { skin: SKIN[3], hair: HAIR[3], style: "short", backdrop: BACKDROP[5] },
  // French course
  Camille: { skin: SKIN[0], hair: HAIR[4], style: "bun", backdrop: BACKDROP[2] },
  Hugo: { skin: SKIN[1], hair: HAIR[1], style: "short", backdrop: BACKDROP[1] },
  Léa: { skin: SKIN[2], hair: HAIR[0], style: "long", backdrop: BACKDROP[5] },
  Malik: { skin: SKIN[3], hair: HAIR[0], style: "curly", backdrop: BACKDROP[0] },
};

export const isMainCast = (name: string) => Object.hasOwn(CAST, name);

function fnv1a(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** A stable look for any speaker name; everyone outside the main cast is derived from the name. */
export function avatarLook(name: string): AvatarLook {
  if (CAST[name]) return CAST[name];
  const h = fnv1a(name);
  return {
    skin: SKIN[h % SKIN.length],
    hair: HAIR[(h >>> 4) % HAIR.length],
    style: HAIR_STYLES[(h >>> 8) % HAIR_STYLES.length],
    backdrop: BACKDROP[(h >>> 12) % BACKDROP.length],
  };
}
