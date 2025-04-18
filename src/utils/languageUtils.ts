// src/utils/languageUtils.ts
export const getApiLanguageCode = (language: string): string => {
    return language === 'es' ? 'es-ES' : 'en-US';
  };
  
  export const getFlagEmoji = (language: string): string => {
    return language === 'es' ? '🇪🇸' : '🇺🇸';
  };
  
  export const getLanguageName = (language: string): string => {
    return language === 'es' ? 'Español' : 'English';
  };