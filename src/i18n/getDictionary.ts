import 'server-only';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ar: () => import('./dictionaries/ar.json').then((module) => module.default),
  fa: () => import('./dictionaries/fa.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;
export const locales: Locale[] = ['en', 'ar', 'fa'];
export const defaultLocale: Locale = 'en';

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries[defaultLocale]();
};
