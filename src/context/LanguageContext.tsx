// src/context/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en'], params?: Record<string, string>) => string;
  detectedCountry?: string;
  isDetectingLocation: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    'discover.title': 'Discover Movies & TV Shows',
    'discover.subtitle': 'Browse popular content from around the world',
    'popular.movies': 'Popular Movies',
    'now.playing': 'Now Playing Movies',
    'upcoming.movies': 'Upcoming Movies',
    'no.movies': 'No movies available',
    'search.results': 'Search Results for',
    'no.results': 'No results found',
    'searching': 'Searching...',
    'view.all': 'View All',
    'favorites': 'Favorites',
    'movies': 'Movies',
    'tv.shows': 'TV Shows',
    'home': 'Home',
    'language.detected': 'We\'ve set your language to {language} based on your location ({country}). You can change this anytime.',
  },
  es: {
    'discover.title': 'Descubre Películas y Series',
    'discover.subtitle': 'Explora contenido popular de todo el mundo',
    'popular.movies': 'Películas Populares',
    'now.playing': 'Películas en Cines',
    'upcoming.movies': 'Próximos Estrenos',
    'no.movies': 'No hay películas disponibles',
    'search.results': 'Resultados de búsqueda para',
    'no.results': 'No se encontraron resultados',
    'searching': 'Buscando...',
    'view.all': 'Ver Todo',
    'favorites': 'Favoritos',
    'movies': 'Películas',
    'tv.shows': 'Series',
    'home': 'Inicio',
    'language.detected': 'Hemos establecido tu idioma en {language} según tu ubicación ({country}). Puedes cambiarlo cuando quieras.',
  }
};

export const LanguageProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('language') as Language) || 'en';
  });
  const [detectedCountry, setDetectedCountry] = useState<string>();
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('language')) {
      detectLanguageFromLocation();
    }
  }, []);

  const detectLanguageFromLocation = async () => {
    setIsDetectingLocation(true);
    try {
      // First try browser language
    /*  const browserLanguage = navigator.languages?.[0]?.split('-')[0];
      if (browserLanguage === 'es') {
        setLanguage('es');
        return;
      }*/

      // Fallback to IP geolocation
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      
      if (data.error) {
        console.error('IPAPI Error:', data.reason);
        return;
      }

      console.log('Geolocation data:', data); // Debug log

      setDetectedCountry(data.country_name);
      
      // Spanish-speaking countries
      const spanishSpeakingCountries = [
        'ES', 'MX', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC', 
        'GT', 'CU', 'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 
        'CR', 'PA', 'UY', 'GQ'
      ];

      if (spanishSpeakingCountries.includes(data.country_code)) {
        setLanguage('es');
        toast.info(
          t('language.detected', {
            language: 'Spanish',
            country: data.country_name
          }),
          { autoClose: 5000 }
        );
      }
    } catch (error) {
      console.error('Error detecting language:', error);
    } finally {
      setIsDetectingLocation(false);
    }
  };

  const t = (key: keyof typeof translations['en'], params?: Record<string, string>) => {
    let translation = translations[language][key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        translation = translation.replace(`{${k}}`, v);
      });
    }
    return translation;
  };

  const handleSetLanguage = (lang: Language) => {
    localStorage.setItem('language', lang);
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: handleSetLanguage, 
      t,
      detectedCountry,
      isDetectingLocation
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};