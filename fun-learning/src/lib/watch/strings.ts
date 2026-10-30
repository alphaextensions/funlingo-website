/**
 * Watch-player UI strings — now backed by the Wave 14 i18n catalog
 * (`src/lib/i18n/catalog`, keys `watch.*`) so they render in the viewer's
 * NATIVE language. Wave 19 folded the old English-only `W16` constant in.
 *
 * `buildW16(t)` returns the same object shape the Watch components already
 * consume (`W16.listen`, `W16.removed(word)`, `W16.colors[c]`, …), so the
 * call sites barely changed — they just build it from a bound translator
 * (`useT()` in a client component) instead of importing a frozen const.
 *
 * Copy: second person, informal, sentence case (CLAUDE.md rule 6).
 */

type T = (key: string, params?: Record<string, string | number>) => string;

export function buildW16(t: T) {
  return {
    // Word card
    listen: t("watch.listen"),
    cardSettings: t("watch.cardSettings"),
    translations: t("watch.translations"),
    cardSize: t("watch.cardSize"),
    pronounce: t("watch.pronounce"),
    on: t("watch.on"),
    off: t("watch.off"),
    phrase: t("watch.phrase"),
    rootWord: t("watch.rootWord"),
    tapToReveal: t("watch.tapToReveal"),
    iKnowThis: t("watch.iKnowThis"),
    markedKnown: t("watch.markedKnown"),
    removeSaved: t("watch.removeSaved"),
    removed: (w: string) => t("watch.removed", { w }),
    example: t("watch.example"),
    definition: t("watch.definition"),
    // Subtitle settings panel
    subtitleSettings: t("watch.subtitleSettings"),
    learningLine: t("watch.learningLine"),
    nativeLine: t("watch.nativeLine"),
    size: t("watch.size"),
    color: t("watch.color"),
    show: t("watch.show"),
    blur: t("watch.blur"),
    hide: t("watch.hide"),
    blurHint: t("watch.blurHint"),
    textSection: t("watch.textSection"),
    weight: t("watch.weight"),
    weightAuto: t("watch.weightAuto"),
    weightRegular: t("watch.weightRegular"),
    weightSemi: t("watch.weightSemi"),
    weightBold: t("watch.weightBold"),
    lineSpacing: t("watch.lineSpacing"),
    removeBrackets: t("watch.removeBrackets"),
    removeBracketsHint: t("watch.removeBracketsHint"),
    others: t("watch.others"),
    pauseAfterReplay: t("watch.pauseAfterReplay"),
    hoverPause: t("watch.hoverPause"),
    voice: t("watch.voice"),
    voiceAuto: t("watch.voiceAuto"),
    voiceEmpty: t("watch.voiceEmpty"),
    voicePreview: t("watch.voicePreview"),
    close: t("watch.close"),
    colors: {
      default: t("watch.colorDefault"),
      accent: t("watch.colorAccent"),
      warning: t("watch.colorWarning"),
      success: t("watch.colorSuccess"),
      muted: t("watch.colorMuted"),
    } as Record<string, string>,
    // Speed
    speed: t("watch.speed"),
    slower: t("watch.slower"),
    faster: t("watch.faster"),
    resetSpeed: t("watch.resetSpeed"),
    // Transport
    back10: t("watch.back10"),
    fwd10: t("watch.fwd10"),
    replayLine: t("watch.replayLine"),
    saveLine: t("watch.saveLine"),
    lineSaved: t("watch.lineSaved"),
    lineSavedToast: t("watch.lineSavedToast"),
    momentSavedToast: t("watch.momentSavedToast"),
    couldNotSaveLine: t("watch.couldNotSaveLine"),
    signInToSaveLine: t("watch.signInToSaveLine"),
    // Hover pause
    hoverPauseTitle: t("watch.hoverPauseTitle"),
    hoverPauseBody: t("watch.hoverPauseBody"),
    neverShow: t("watch.neverShow"),
    // Saved-word hint
    savedTooltip: t("watch.savedTooltip"),
    dismiss: t("watch.dismiss"),
    glowHint: t("watch.glowHint"),
  };
}

export type W16Strings = ReturnType<typeof buildW16>;
