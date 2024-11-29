'use client';

import { I18nextProvider } from 'react-i18next';
import { useEffect, useState } from 'react';
import i18next from './client';
import { useParams } from 'next/navigation';
import type { Locale } from './settings';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [instance] = useState(i18next);
  const params = useParams();
  const lang = params?.lang as Locale;

  useEffect(() => {
    if (lang) {
      instance.changeLanguage(lang);
    }
  }, [lang, instance]);

  return (
    <I18nextProvider i18n={instance}>
      {children}
    </I18nextProvider>
  );
}