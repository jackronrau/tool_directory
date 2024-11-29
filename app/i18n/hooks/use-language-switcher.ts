'use client';

import { usePathname, useRouter } from 'next/navigation';
import { languages, type Locale, fallbackLng } from '../settings';

export function useLanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Find current language from path
  const currentLang = languages.find(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  ) || fallbackLng;

  const switchLanguage = (newLang: Locale) => {
    if (currentLang === newLang) return;

    let newPathname = pathname;
    
    // If switching to default language
    if (newLang === fallbackLng) {
      // Remove the current language prefix if it exists
      newPathname = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');
    } else {
      // If current path has no language prefix (is in default language)
      if (currentLang === fallbackLng) {
        newPathname = `/${newLang}${pathname}`;
      } else {
        // Replace current language prefix with new one
        newPathname = pathname.replace(`/${currentLang}`, `/${newLang}`);
      }
    }

    // Ensure we don't end up with double slashes
    newPathname = newPathname.replace(/\/+/g, '/');
    
    // Ensure we don't lose the root path
    if (newPathname === '') newPathname = '/';

    router.push(newPathname);
  };

  return {
    currentLang,
    switchLanguage,
    languages
  };
}