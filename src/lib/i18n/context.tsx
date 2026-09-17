"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE, dirForLocale, type Locale } from "./config";
import en from "./dictionaries/en";
import ar from "./dictionaries/ar";
import { createTranslator, type TranslationKey } from "./translate";

const dictionaries = { en, ar };

interface LocaleContextValue {
  locale: Locale;
  dir: "rtl" | "ltr";
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      setLocaleState(next);
      document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`;
      document.documentElement.lang = next;
      document.documentElement.dir = dirForLocale(next);
      // Re-run Server Components on the current route with the new cookie,
      // without navigating away or losing the current page/route.
      router.refresh();
    },
    [locale, router]
  );

  const value = useMemo<LocaleContextValue>(() => {
    const dict = dictionaries[locale];
    return {
      locale,
      dir: dirForLocale(locale),
      setLocale,
      t: createTranslator(dict),
    };
  }, [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within a LocaleProvider");
  return ctx;
}
