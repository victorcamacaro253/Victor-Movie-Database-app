// src/pages/NewsPage.tsx
import { useState, useEffect } from 'react';
import { Article, newsAPI } from '../api/news';
import { NewsSection } from '../components/newsSection';
import { useTheme } from '../context/ThemeContext';
import LoadingSpinner from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { Tab } from '@headlessui/react';

export default function NewsPage() {
  const { theme } = useTheme();
  const [filmNews, setFilmNews] = useState<Article[]>([]);
  const [tvNews, setTVNews] = useState<Article[]>([]);
  const [entertainmentNews, setEntertainmentNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        setLoading(true);
        const [film, tv, entertainment] = await Promise.all([
          newsAPI.fetchFilmNews(12),
          newsAPI.fetchTVNews(12),
          newsAPI.fetchEntertainmentNews(12)
        ]);
        setFilmNews(film);
        setTVNews(tv);
        setEntertainmentNews(entertainment);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load news');
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" />
        <p className={`mt-4 text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          Loading latest entertainment news...
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
          Try Again
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
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Entertainment News
            </h1>
            <p className={`mt-6 max-w-3xl mx-auto text-xl ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Stay updated with the latest from Hollywood, TV industry, and celebrity world
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
            {['All News', 'Film', 'TV', 'Entertainment'].map((category) => (
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
            title="🎬 Film Industry News"
            subtitle="Latest production updates, box office results, and studio news"
            theme={theme}
            showViewAll={activeTab !== 1}
          />
        )}

        {(activeTab === 0 || activeTab === 2) && (
          <NewsSection 
            articles={tvNews}
            title="📺 TV Industry News"
            subtitle="Streaming wars, ratings, renewals and cancellations"
            theme={theme}
            showViewAll={activeTab !== 2}
          />
        )}

        {(activeTab === 0 || activeTab === 3) && (
          <NewsSection 
            articles={entertainmentNews}
            title="🌟 Entertainment News"
            subtitle="Celebrity updates, events, awards and red carpet moments"
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
              Stay Updated
            </h2>
            <p className={`mt-4 text-lg ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Get the latest entertainment news delivered to your inbox
            </p>
            <div className="mt-8 max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="Your email address"
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
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}