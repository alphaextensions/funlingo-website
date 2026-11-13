/**
 * Wave 15 — English UI strings introduced by the JS-behaviour parity port.
 *
 * TEMPORARY local constant: Wave 14 owns the i18n catalog
 * (`src/lib/i18n/catalog`). At merge, move each entry into that catalog
 * under the listed extension key and replace the import. Values are copied
 * verbatim from the extension's `learn.*` English dictionary (learn.js).
 */
export const FEEDBACK_STRINGS = {
  /** learn.audioFeedback */
  audioFeedback: "Audio & feedback",
  /** learn.motionDisplay */
  motionDisplay: "Motion & display",
  /** learn.soundEffects */
  soundEffects: "Sound effects",
  /** learn.soundEffectsDesc */
  soundEffectsDesc: "Taps, flips, quiz chimes",
  /** learn.haptics */
  haptics: "Haptics",
  /** learn.hapticsDesc */
  hapticsDesc: "Subtle vibration on supported devices",
  /** web-only: shown under Haptics when navigator.vibrate is missing */
  hapticsUnsupported: "Your device doesn't support vibration, so this does nothing here.",
  /** learn.voice */
  voice: "Voice",
  /** learn.voiceDesc */
  voiceDesc: "For Listen buttons",
  /** learn.voiceAuto */
  voiceAuto: "Auto (best available)",
  /** slang-audio.js `empty` */
  voiceEmpty: "No voices available for {lang}",
  /** learn.animations */
  animations: "Animations",
  /** learn.animationsDesc */
  animationsDesc: "Ambient glow, flips, transitions",
  /** learn.rtlPreview */
  rtlPreview: "RTL preview",
  /** learn.rtlPreviewDesc */
  rtlPreviewDesc: "Mirror layout for Arabic / Urdu",
  /** web-only: signed-out note under the feedback group */
  savedOnDevice: "Saved on this device. Sign in to keep them everywhere.",
  /** learn.saveToUnlock */
  saveToUnlock: "Save words while watching to unlock",
  /** learn.skip */
  skip: "Skip",
  /** learn.correct */
  correct: "Correct!",
  /** learn.correctAnswer */
  correctAnswer: "Correct answer: {answer}",
} as const;

export function fmt(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (m, k: string) => (k in vars ? vars[k]! : m));
}
