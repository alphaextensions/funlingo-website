"use client";

/**
 * Searchable language dropdown — web port of the extension's
 * `.searchable-dropdown` (trigger shows the autonym; panel = search input +
 * list, matched on autonym / code / English name).
 *
 * The trigger and the options are siblings (no button-in-button). Keyboard:
 * Enter/Space/ArrowDown opens, arrows move, Enter picks, Escape closes
 * (and does NOT bubble to the modal's Escape-to-skip).
 */

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { filterLanguages, sortedByLabel, type LangOption } from "@/lib/onboarding/flow";
import { useT } from "@/lib/i18n/client";
import styles from "./welcome.module.css";

function englishName(code: string): string {
  try {
    return new Intl.DisplayNames(["en"], { type: "language" }).of(code) ?? code;
  } catch {
    return code;
  }
}

interface Props {
  label: string;
  value: string;
  options: LangOption[];
  onSelect: (value: string) => void;
}

export function LangDropdown({ label, value, options, onSelect }: Props) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const id = useId();
  const listId = `${id}-list`;
  const labelId = `${id}-label`;

  const sorted = useMemo(() => sortedByLabel(options), [options]);
  const shown = useMemo(() => filterLanguages(sorted, query, englishName), [sorted, query]);
  const current = options.find((o) => o.value === value)?.label ?? value.toUpperCase();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => {
      document.removeEventListener("mousedown", onDown);
      clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      const i = shown.findIndex((o) => o.value === value);
      setActive(i >= 0 ? i : 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, query]);

  function close(refocus = true) {
    setOpen(false);
    setQuery("");
    if (refocus) triggerRef.current?.focus();
  }

  function pick(v: string) {
    onSelect(v);
    close();
  }

  return (
    <div className={styles.langRow} ref={rootRef}>
      <span id={labelId} className={styles.rowLabel}>
        {label}
      </span>
      <div className={styles.dropdown}>
        <button
          ref={triggerRef}
          type="button"
          className={styles.dropdownSelected}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-labelledby={`${labelId} ${id}-value`}
          onClick={() => (open ? close(false) : setOpen(true))}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" && !open) {
              e.preventDefault();
              setOpen(true);
            }
          }}
        >
          <span id={`${id}-value`}>{current}</span>
          <span className={styles.caret} aria-hidden="true" />
        </button>
        {open ? (
          <div className={styles.dropdownPanel}>
            <input
              ref={inputRef}
              type="text"
              className={styles.dropdownSearch}
              placeholder={t("onboarding.searchLanguage")}
              aria-label={`${label}: ${t("onboarding.searchLanguage")}`}
              role="combobox"
              aria-expanded="true"
              aria-controls={listId}
              aria-activedescendant={shown[active] ? `${id}-opt-${shown[active].value}` : undefined}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  e.stopPropagation();
                  close();
                } else if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((a) => Math.min(a + 1, shown.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => Math.max(a - 1, 0));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  if (shown[active]) pick(shown[active].value);
                } else if (e.key === "Tab") {
                  close(false);
                }
              }}
            />
            <ul id={listId} role="listbox" aria-labelledby={labelId} className={styles.dropdownList}>
              {shown.length === 0 ? (
                <li className={styles.dropdownEmpty} role="presentation">
                  {t("onboarding.noMatch")}
                </li>
              ) : (
                shown.map((o, i) => (
                  <li
                    key={o.value}
                    id={`${id}-opt-${o.value}`}
                    role="option"
                    aria-selected={o.value === value}
                    data-active={i === active ? "true" : undefined}
                    className={styles.dropdownOption}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => pick(o.value)}
                  >
                    <span lang={o.value}>{o.label}</span>
                    {o.value === value ? (
                      <svg className={styles.optCheck} viewBox="0 0 24 24" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : null}
                  </li>
                ))
              )}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
