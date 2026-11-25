// Speaks a word in the learner's language: the pre-generated neural clip
// (<dir>/<audioKey>.mp3, from scripts/generate-game-audio*.mjs) when it exists,
// otherwise the browser's best matching speech-synthesis voice.
import { audioKey } from "@/sections/home/gameData";

let currentAudio: HTMLAudioElement | null = null;
let voicesLoaded = false;

const NATURAL_VOICE_HINTS = [
  "natural",
  "neural",
  "premium",
  "enhanced",
  "google",
  "microsoft",
  "samantha",
  "monica",
  "paulina",
  "amelie",
  "kyoko",
  "yuna",
  "anna",
];

function matchingVoiceScore(voice: SpeechSynthesisVoice, bcp: string) {
  const requested = bcp.toLowerCase();
  const requestedBase = requested.split("-")[0];
  const voiceLang = voice.lang.toLowerCase();
  const voiceName = voice.name.toLowerCase();
  let score = 0;

  if (voiceLang === requested) score += 50;
  else if (voiceLang.split("-")[0] === requestedBase) score += 35;
  else return -1;

  if (voice.localService) score += 8;
  if (voice.default) score += 2;
  if (NATURAL_VOICE_HINTS.some((hint) => voiceName.includes(hint))) score += 18;
  if (voiceName.includes("compact")) score -= 18;

  return score;
}

function bestFallbackVoice(bcp: string) {
  if (typeof speechSynthesis === "undefined") return undefined;
  const voices = speechSynthesis.getVoices();
  return voices
    .map((voice) => ({ voice, score: matchingVoiceScore(voice, bcp) }))
    .filter(({ score }) => score >= 0)
    .sort((a, b) => b.score - a.score)[0]?.voice;
}

// Browser fallback, used only when the pre-generated neural clip is missing or
// can't play (offline, blocked, etc). We choose the best language-matching
// voice available instead of relying on the browser default.
function speakFallback(text: string, bcp: string) {
  try {
    const u = new SpeechSynthesisUtterance(text);
    const voice = bestFallbackVoice(bcp);
    u.lang = bcp;
    if (voice) u.voice = voice;
    u.rate = 0.82;
    u.pitch = 1.04;
    u.volume = 1;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  } catch {
    /* unavailable */
  }
}

// Play the human-sounding pre-generated clip (public/audio/game/<key>.mp3,
// produced by scripts/generate-game-audio.mjs). Falls back to the browser's
// speech synthesizer if the file can't be played.
export function speak(text: string, bcp: string, dir = "/audio/game") {
  try {
    if (typeof speechSynthesis !== "undefined" && !voicesLoaded) {
      voicesLoaded = true;
      speechSynthesis.getVoices();
    }
    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    if (typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
    const audio = new Audio(`${dir}/${audioKey(bcp, text)}.mp3`);
    currentAudio = audio;
    audio.play().catch(() => speakFallback(text, bcp));
  } catch {
    speakFallback(text, bcp);
  }
}

/** Warms up the voice list; some browsers only populate it after a first call. */
export function primeVoices() {
  if (typeof speechSynthesis === "undefined") return;
  voicesLoaded = true;
  speechSynthesis.getVoices();
}

export function stopSpeaking() {
  currentAudio?.pause();
  currentAudio = null;
  if (typeof speechSynthesis !== "undefined") speechSynthesis.cancel();
}
