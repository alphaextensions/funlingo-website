// Dictionary loader. Statically imports every locale JSON and deep-merges it
// over the English source of truth, so any missing/untranslated key falls back
// to English. Static imports keep this safe for `output: export`.

import { en, type Dictionary } from "./dictionaries/en";
import { DEFAULT_LOCALE } from "./config";

import ar from "./dictionaries/ar.json";
import bg from "./dictionaries/bg.json";
import ca from "./dictionaries/ca.json";
import zhCN from "./dictionaries/zh-CN.json";
import zhTW from "./dictionaries/zh-TW.json";
import hr from "./dictionaries/hr.json";
import cs from "./dictionaries/cs.json";
import da from "./dictionaries/da.json";
import nl from "./dictionaries/nl.json";
import enGB from "./dictionaries/en-GB.json";
import fr from "./dictionaries/fr.json";
import de from "./dictionaries/de.json";
import el from "./dictionaries/el.json";
import he from "./dictionaries/he.json";
import hi from "./dictionaries/hi.json";
import hu from "./dictionaries/hu.json";
import id from "./dictionaries/id.json";
import it from "./dictionaries/it.json";
import ja from "./dictionaries/ja.json";
import ko from "./dictionaries/ko.json";
import no from "./dictionaries/no.json";
import fa from "./dictionaries/fa.json";
import pl from "./dictionaries/pl.json";
import ptBR from "./dictionaries/pt-BR.json";
import ptPT from "./dictionaries/pt-PT.json";
import ro from "./dictionaries/ro.json";
import ru from "./dictionaries/ru.json";
import sk from "./dictionaries/sk.json";
import es from "./dictionaries/es.json";
import sv from "./dictionaries/sv.json";
import th from "./dictionaries/th.json";
import tr from "./dictionaries/tr.json";
import uk from "./dictionaries/uk.json";
import vi from "./dictionaries/vi.json";

// Partial dictionaries keyed by locale code.
const PARTIALS: Record<string, unknown> = {
  ar, bg, ca, "zh-CN": zhCN, "zh-TW": zhTW, hr, cs, da, nl, "en-GB": enGB,
  fr, de, el, he, hi, hu, id, it, ja, ko, no, fa, pl, "pt-BR": ptBR,
  "pt-PT": ptPT, ro, ru, sk, es, sv, th, tr, uk, vi,
};

function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function deepMerge<T>(base: T, override: unknown): T {
  if (!isObject(base) || !isObject(override)) {
    return (override === undefined ? base : (override as T));
  }
  const out: Record<string, unknown> = { ...base };
  for (const key of Object.keys(base)) {
    if (key in override) {
      out[key] = deepMerge(
        (base as Record<string, unknown>)[key],
        override[key]
      );
    }
  }
  return out as T;
}

export function getDictionary(locale: string): Dictionary {
  if (locale === DEFAULT_LOCALE) return en as Dictionary;
  const partial = PARTIALS[locale];
  return partial ? deepMerge(en as Dictionary, partial) : (en as Dictionary);
}

export type { Dictionary };
