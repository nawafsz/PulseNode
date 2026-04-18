"use client";
import { createContext, useContext, useMemo, useState } from "react";
import { DEFAULT_LOCALE, isRtl, normalizeLocale, type Locale, t as translate } from "@/lib/i18n";

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const fromDom = document.documentElement.dataset.locale;
  if (fromDom) return normalizeLocale(fromDom);
  try {
    return normalizeLocale(window.localStorage.getItem("mindlink.locale"));
  } catch {
    return DEFAULT_LOCALE;
  }
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => getInitialLocale());

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof document !== "undefined") {
      document.documentElement.lang = next === "zh" ? "zh-CN" : next;
      document.documentElement.dir = isRtl(next) ? "rtl" : "ltr";
      document.documentElement.dataset.locale = next;
    }
    try {
      window.localStorage.setItem("mindlink.locale", next);
    } catch {}
  };

  const value = useMemo<I18nContextValue>(() => {
    return {
      locale,
      setLocale,
      t: (key) => translate(locale, key),
    };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: (key: string) => translate(DEFAULT_LOCALE, key),
    } satisfies I18nContextValue;
  }
  return ctx;
}

