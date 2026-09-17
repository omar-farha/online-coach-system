import { cookies } from "next/headers";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, dirForLocale, type Locale } from "./config";
import en from "./dictionaries/en";
import ar from "./dictionaries/ar";
import { createTranslator } from "./translate";

const dictionaries = { en, ar };

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get(LOCALE_COOKIE)?.value;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

/** For Server Components: `const { t, locale, dir } = await getTranslator();` */
export async function getTranslator() {
  const locale = await getLocale();
  return {
    locale,
    dir: dirForLocale(locale),
    t: createTranslator(dictionaries[locale]),
  };
}
