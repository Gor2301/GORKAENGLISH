'use client';

import { useState, useEffect } from 'react';
import { locales, defaultLocale, type Locale } from '@/i18n';

// Translation data
import esMessages from '@/messages/es.json';
import enMessages from '@/messages/en.json';
import ruMessages from '@/messages/ru.json';

const messages: Record<Locale, any> = {
  es: esMessages,
  en: enMessages,
  ru: ruMessages,
};

export function useTranslations(locale: Locale = defaultLocale) {
  return messages[locale] || messages[defaultLocale];
}

export function useLocale() {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    // Get locale from localStorage or browser
    const saved = localStorage.getItem('locale') as Locale;
    if (saved && locales.includes(saved)) {
      setLocale(saved);
    } else {
      // Try to get browser language
      const browserLang = navigator.language.split('-')[0] as Locale;
      if (locales.includes(browserLang)) {
        setLocale(browserLang);
      }
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    window.location.reload();
  };

  return { locale, changeLocale };
}