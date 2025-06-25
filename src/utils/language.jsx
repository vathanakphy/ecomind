import { createContext, useContext, useState } from 'react';
import { translations } from '../data/language';

const LanguageContext = createContext();

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

export function useLanguage() {
  return useContext(LanguageContext);
}
