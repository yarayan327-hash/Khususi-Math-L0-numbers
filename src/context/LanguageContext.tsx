import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Translations,
  TRANSLATIONS,
  formatNumber,
  getNumberWord,
} from '../utils/translations';
import { sound } from '../utils/audio';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  formatNum: (num: number | string) => string;
  numberWord: (num: number) => string;
  dir: 'rtl' | 'ltr';
  isRTL: boolean;
  speak: (text: string) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
  };

  const isRTL = language === 'ar';
  const dir: 'rtl' | 'ltr' = isRTL ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', language);
  }, [dir, language]);

  const value: LanguageContextValue = {
    language,
    setLanguage,
    t: TRANSLATIONS[language],
    formatNum: (num: number | string) => formatNumber(num, language),
    numberWord: (num: number) => getNumberWord(num, language),
    dir,
    isRTL,
    speak: (text: string) => sound.speak(text, language),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
