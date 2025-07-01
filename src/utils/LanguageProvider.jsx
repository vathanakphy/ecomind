import { useState } from 'react';
import LanguageContext from './LanguageContext';
import { translations } from '../data/language';

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('eng');

  const value = {
    language,
    setLanguage,
    result: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
