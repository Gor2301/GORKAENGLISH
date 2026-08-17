export const locales = ['es', 'en', 'ru'] as const;
export const defaultLocale = 'es' as const;

export type Locale = typeof locales[number];