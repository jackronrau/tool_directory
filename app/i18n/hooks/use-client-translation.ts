'use client';

import { useTranslation as useTranslationBase } from 'react-i18next';
import { useParams } from 'next/navigation';
import { type Locale, defaultNS } from '../settings';

export function useClientTranslation(ns = defaultNS) {
  const params = useParams();
  const lang = params?.lang as Locale;
  return useTranslationBase(ns, { lng: lang });
}