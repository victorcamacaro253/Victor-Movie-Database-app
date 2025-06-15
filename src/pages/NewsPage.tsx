// src/pages/NewsPage.tsx
import { useState, useEffect } from 'react';
import { Article } from '../api/news';
import { NewsSection } from '../components/newsSection';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Tab } from '@headlessui/react';
import img from '../../assets/images/hollywood3.jpg'

export default function NewsPage() {
  const { theme } = useTheme();
  const { t, language } = useLanguage(); // Add this line to use the language context
  const [filmNews, setFilmNews] = useState<Article[]>([]);
  const [tvNews, setTVNews] = useState<Article[]>([]);
  const [entertainmentNews, setEntertainmentNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  // Translations for tab categories
  const tabCategories = [
    t('news.tabs.all'),
    t('news.tabs.film'),
    t('news.tabs.tv'),
    t('news.tabs.entertainment')
  ];

  // Translations for section titles and subtitles
  const sectionTranslations = {
    film: {
      title: t('news.sections.film.title'),
      subtitle: t('news.sections.film.subtitle')
    },
    tv: {
      title: t('news.sections.tv.title'),
      subtitle: t('news.sections.tv.subtitle')
    },
    entertainment: {
      title: t('news.sections.entertainment.title'),
      subtitle: t('news.sections.entertainment.subtitle')
    }
  };

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        setLoading(true);
        const [film, tv, entertainment] = await Promise.all([
          fetch(`/.netlify/functions/getNews?type=film&limit=12&lang=${language}`).then(res => res.json()),
          fetch(`/.netlify/functions  /getNews?type=tv&limit=12&lang=${language}`).then(res => res.json()),
          fetch(`/.netlify/functions/getNews?type=entertainment&limit=12&lang=${language}`).then(res => res.json())
        ]);
        setFilmNews(film);
        setTVNews(tv);
        setEntertainmentNews(entertainment);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('news.error.loading'));
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, [language]); // Add language as a dependency to refetch news when language changes

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
        <p className={`mt-4 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {t('news.loading')}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <ErrorMessage message={error} />
        <button
          onClick={() => window.location.reload()}
          className={`mt-4 px-4 py-2 rounded-lg ${
            theme === 'dark' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          } transition-colors`}
        >
          {t('news.tryAgain')}
        </button>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Header */}
      <div className={`relative overflow-hidden ${
  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
}`}>
  {/* Background image with overlay for better text contrast */}
  <div className={`absolute inset-0 bg-cover bg-center z-0 ${
    theme === 'dark' ? 'opacity-60' : 'opacity-10'
  }`} 
  style={{ 
    backgroundImage: `url(${img})`,
    // Or use a local image: backgroundImage: "url('/images/news-hero-bg.jpg')"
  }}></div>
  
  {/* Semi-transparent overlay for better text readability - adjust as needed */}
  <div className={`absolute inset-0 ${
    theme === 'dark' ? 'bg-gray-900/60' : 'bg-white/30'
  } z-0`}></div>

  <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8 relative z-10">
    <div className="text-center">
      <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ${
        theme === 'dark' ? 'text-white' : 'text-gray-900'
      }`}>
        {t('news.title')}
      </h1>
      <p className={`mt-6 max-w-3xl mx-auto text-xl ${
        theme === 'dark' ? 'text-gray-100' : 'text-gray-800' // Slightly darker for better contrast
      }`}>
        {t('news.subtitle')}
      </p>
    </div>
  </div>
</div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Tab.Group selectedIndex={activeTab} onChange={setActiveTab}>
          <Tab.List className={`flex space-x-1 rounded-xl p-1 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            {tabCategories.map((category) => (
              <Tab
                key={category}
                className={({ selected }) => 
                  `w-full py-2.5 text-sm font-medium rounded-lg transition-all ${
                    selected
                      ? theme === 'dark'
                        ? 'bg-blue-600 text-white shadow'
                        : 'bg-white text-blue-600 shadow'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-gray-600 hover:text-white'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
        </Tab.Group>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {(activeTab === 0 || activeTab === 1) && (
          <NewsSection 
            articles={filmNews}
            title={sectionTranslations.film.title}
            subtitle={sectionTranslations.film.subtitle}
            theme={theme}
            showViewAll={activeTab !== 1}
          />
        )}

        {(activeTab === 0 || activeTab === 2) && (
          <NewsSection 
            articles={tvNews}
            title={sectionTranslations.tv.title}
            subtitle={sectionTranslations.tv.subtitle}
            theme={theme}
            showViewAll={activeTab !== 2}
          />
        )}

        {(activeTab === 0 || activeTab === 3) && (
          <NewsSection 
            articles={entertainmentNews}
            title={sectionTranslations.entertainment.title}
            subtitle={sectionTranslations.entertainment.subtitle}
            theme={theme}
            showViewAll={activeTab !== 3}
          />
        )}
      </div>

      {/* Newsletter Signup */}
      <div className={`mt-12 py-12 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl font-extrabold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t('news.newsletter.title')}
            </h2>
            <p className={`mt-4 text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {t('news.newsletter.subtitle')}
            </p>
            <div className="mt-8 max-w-md mx-auto flex">
              <input
                type="email"
                placeholder={t('news.newsletter.placeholder')}
                className={`flex-1 min-w-0 rounded-l-md border ${
                  theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                } px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              <button
                type="button"
                className={`inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-r-md ${
                  theme === 'dark' 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                {t('news.newsletter.button')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}