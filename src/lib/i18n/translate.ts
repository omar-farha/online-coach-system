import type { Dictionary } from "./dictionaries/en";

type DotPaths<T, Prefix extends string = ""> = {
  [K in keyof T & string]: T[K] extends string
    ? `${Prefix}${K}`
    : DotPaths<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

export type TranslationKey = DotPaths<Dictionary>;

function getPath(dict: Dictionary, path: string): string {
  const parts = path.split(".");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = dict;
  for (const part of parts) {
    value = value?.[part];
  }
  return typeof value === "string" ? value : path;
}

export function createTranslator(dict: Dictionary) {
  return function t(key: TranslationKey, vars?: Record<string, string | number>): string {
    let text = getPath(dict, key);
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(`{${k}}`, String(v));
      }
    }
    return text;
  };
}
