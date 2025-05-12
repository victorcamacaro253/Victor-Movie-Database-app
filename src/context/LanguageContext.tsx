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
    'News': 'News',
    'language.detected': 'We\'ve set your language to {language} based on your location ({country}). You can change this anytime.',
    'tv_shows.title': 'TV Shows',
    'tv_shows.subtitle': 'Browse popular TV shows from around the world',
    'tv_shows.no_results': 'No TV shows found matching your criteria',
    'filters.category': 'Category',
    'filters.year': 'Year',
    'filters.sort_by': 'Sort By',
    'error.fetch_tv_shows': 'Failed to fetch TV shows',
     'news.title': 'Entertainment News',
    'news.subtitle': 'Stay updated with the latest from Hollywood, TV industry, and celebrity world',
    'news.loading': 'Loading latest entertainment news...',
    'news.error.loading': 'Failed to load news',
    'news.tryAgain': 'Try Again',
    'news.tabs.all': 'All News',
    'news.tabs.film': 'Film',
    'news.tabs.tv': 'TV',
    'news.tabs.entertainment': 'Entertainment',
    'news.sections.film.title': '🎬 Film Industry News',
    'news.sections.film.subtitle': 'Latest production updates, box office results, and studio news',
    'news.sections.tv.title': '📺 TV Industry News',
    'news.sections.tv.subtitle': 'Streaming wars, ratings, renewals and cancellations',
    'news.sections.entertainment.title': '🌟 Entertainment News',
    'news.sections.entertainment.subtitle': 'Celebrity updates, events, awards and red carpet moments',
    'news.newsletter.title': 'Stay Updated',
    'news.newsletter.subtitle': 'Get the latest entertainment news delivered to your inbox',
    'news.newsletter.placeholder': 'Your email address',
    'news.newsletter.button': 'Subscribe',
    'boxOffice.title': 'Box Office Rankings',
    'boxOffice.daily': 'Daily (US) Box Office',
    'boxOffice.weekend': 'Weekend (US) Box Office',
    'boxOffice.domestic': 'Domestic (US) Box Office',
    'boxOffice.worldwide': 'Worldwide Box Office',
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
    'News' : 'Noticias',
    'language.detected': 'Hemos establecido tu idioma en {language} según tu ubicación ({country}). Puedes cambiarlo cuando quieras.',
    'tv_shows.title': 'Series de TV',
    'tv_shows.subtitle': 'Explora series populares de todo el mundo',
    'tv_shows.no_results': 'No se encontraron series que coincidan',
    'filters.category': 'Categoría',
    'filters.year': 'Año',
    'filters.sort_by': 'Ordenar por',
    'error.fetch_tv_shows': 'Error al cargar las series',
      'news.title': 'Noticias de Entretenimiento',
    'news.subtitle': 'Mantente actualizado con lo último de Hollywood, la industria de la TV y el mundo de las celebridades',
    'news.loading': 'Cargando las últimas noticias de entretenimiento...',
    'news.error.loading': 'Error al cargar las noticias',
    'news.tryAgain': 'Intentar de nuevo',
    'news.tabs.all': 'Todas',
    'news.tabs.film': 'Cine',
    'news.tabs.tv': 'TV',
    'news.tabs.entertainment': 'Entretenimiento',
    'news.sections.film.title': '🎬 Noticias de Cine',
    'news.sections.film.subtitle': 'Últimas actualizaciones de producciones, resultados de taquilla y noticias de estudios',
    'news.sections.tv.title': '📺 Noticias de TV',
    'news.sections.tv.subtitle': 'Guerras de streaming, ratings, renovaciones y cancelaciones',
    'news.sections.entertainment.title': '🌟 Noticias de Entretenimiento',
    'news.sections.entertainment.subtitle': 'Actualizaciones de celebridades, eventos, premios y momentos en la alfombra roja',
    'news.newsletter.title': 'Mantente Actualizado',
    'news.newsletter.subtitle': 'Recibe las últimas noticias de entretenimiento en tu correo',
    'news.newsletter.placeholder': 'Tu dirección de correo',
    'news.newsletter.button': 'Suscribirse',
     'boxOffice.title': 'Ranking de Taquilla',
    'boxOffice.daily': 'Taquilla Diaria (EEUU)',
    'boxOffice.weekend': 'Taquilla de Fin de Semana (EEUU)',
    'boxOffice.domestic': 'Taquilla Nacional (EEUU)',
    'boxOffice.worldwide': 'Taquilla Mundial',
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