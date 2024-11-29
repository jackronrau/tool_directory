export const fallbackLng = 'en';
export const languages = ['en', 'zh'] as const;
export const defaultNS = 'common';

export type Locale = typeof languages[number];

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'htmlTag', 'cookie', 'navigator'],
    },
  };
}