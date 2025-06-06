// src/pages/HomePage.tsx
import { useEffect, useCallback } from 'react';
import { useTmdbMovies } from '../hooks/useTmdbMovies';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { MediaCard } from '../components/MediaCard';
import SearchBar from '../components/SearchBar';
import SectionHeader from '../components/SectionHeader';
import { fetchDomesticBoxOffice, fetchWorldwideBoxOffice, fetchDailyBoxOffice, fetchWeekendBoxOffice } from '../api/boxOffice';
import LoadingSpinner from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useState, useRef } from 'react';
//import { searchMovies } from '../api/movies';
import { searchMulti } from '../api/tmdb';
import { useLanguage } from '../context/LanguageContext';
import BoxOfficeCard from '../components/BoxOfficeCard';
import { SearchResult } from '../types/movie';
import { useTheme } from '../context/ThemeContext';
import { NewsSection } from '../components/newsSection';
import { Article } from '../api/news';


export default function HomePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const {
    trendingMovies,
    popularMovies,
    upcomingMovies,
    nowPlayingMovies,
    loading: initialLoading,
    error: initialError
  } = useTmdbMovies();

  const [query, setQuery] = useState('');
  // const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [worldwideData, setWorldwideData] = useState<any>(null);
  const [domesticData, setDomesticData] = useState<any>(null);
  const [dailyData, setDailyData] = useState<any>(null);
  const [weekendData, setWeekendData] = useState<any>(null);
  const [, setError] = useState<string | null>(null)
  const [, setLoading] = useState(true);
  const { theme } = useTheme();
  const [filmNews, setFilmNews] = useState<Article[]>([]);
  const [, setNewsLoading] = useState(false);
  const [, setNewsError] = useState<string | null>(null);

  // Add debounce ref for real-time search
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced search function
  const debouncedSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    try {
      setSearchLoading(true);
      setSearchError(null);
      setIsSearching(true);

      const results = await searchMulti(searchQuery);
      console.log(results);
      setSearchResults(results);
    } catch (err) {
      setSearchError('Failed to fetch search results');
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // Handle real-time search with debouncing
  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);

    // Clear previous timeout
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // If query is empty, clear results immediately
    if (!newQuery.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    // Set new timeout for debounced search
    debounceRef.current = setTimeout(() => {
      debouncedSearch(newQuery);
    }, 300); // 300ms delay
  }, [debouncedSearch]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchBoxOffice = async () => {
      try {
        setLoading(true);
        const [worldwide, domestic, daily, weekend] = await Promise.all([
          fetchWorldwideBoxOffice(),
          fetchDomesticBoxOffice(),
          fetchDailyBoxOffice(),
          fetchWeekendBoxOffice()
        ]);
        setWorldwideData(worldwide);
        setDomesticData(domestic);
        setDailyData(daily);
        setWeekendData(weekend);
      } catch (err) {
        setError('Failed to load box office data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBoxOffice();

    const fetchFilmNews = async () => {
      try {
        setNewsLoading(true);
        //    const news = await newsAPI.fetchFilmNews(4); // Get 4 articles
        const response = await fetch('/.netlify/functions/getNews?type=film&limit=4');
        const data = await response.json();
        console.log('news', data)
        setFilmNews(data);
      } catch (err) {
        setNewsError(err instanceof Error ? err.message : 'Failed to fetch film news');
      } finally {
        setNewsLoading(false);
      }
    };

    fetchFilmNews();
  }, []);

  const handleSearch = async () => {
    // This function can now be used for explicit search (like pressing Enter)
    if (!query.trim()) {
      setIsSearching(false);
      return;
    }

    // Clear any pending debounced search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Execute search immediately
    await debouncedSearch(query);
  };

 
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (initialError) {
    return (
      <div className="container mx-auto p-4">
        <ErrorMessage message={initialError} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{t('discover.title')}</h1>
          <p className="text-lg mb-6">{t('discover.subtitle')}</p>

          <SearchBar
            query={query}
            onQueryChange={handleQueryChange} // Updated to use real-time handler
            onSearch={handleSearch}
            loading={searchLoading}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {searchError && (
          <div className="mb-6">
            <ErrorMessage message={searchError} />
          </div>
        )}

        {isSearching ? (
          <>
            <SectionHeader
              title={`${t('search.results')} "${query}"`}
              count={searchResults.length}
            />

            {searchLoading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="md" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">Searching...</span>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {searchResults.map((item) => (
                  <MediaCard
                    key={`${item.type}-${item.id}`}
                    item={item}
                    onClick={() => navigate(`/${item.type}/${item.id}`)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                No movies or series found matching your search
              </div>
            )}
          </>
        ) : (
          <>
            {/* Popular Movies Section */}
            <section className="mb-12">
              <SectionHeader
                title={t('popular.movies')}
                count={popularMovies.length}
                viewAllLink="/top-movies"
              />

              {trendingMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {trendingMovies.slice(0, 10).map((movie, index) => (
                    <div key={movie.id} className="relative">
                      <span className={`absolute -top-2 -left-2 z-10 rounded-full ${index < 3
                          ? 'bg-yellow-500 text-white'
                          : theme === 'dark'
                            ? 'bg-gray-700 text-gray-300'
                            : 'bg-gray-200 text-gray-800'
                        } w-8 h-8 flex items-center justify-center font-bold`}>
                        {index + 1}
                      </span>
                      <MovieCard
                        key={movie.imdbID}
                        movie={movie}
                        showRating={true}
                        showPopularity={true}
                        onClick={() => navigate(`/movie/${movie.imdbID}`)}
                      />
                    </div>


                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                  <p>No popular movies available</p>
                </div>
              )}
            </section>



            <NewsSection
              articles={filmNews}
              title="🎬 Film Industry News"
              subtitle="Production updates, box office results"
              theme={theme} showViewAll={false} />

            <div className="container mx-auto px-4 py-8">
              <h1 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'}`}>{t('boxOffice.title')}</h1>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {dailyData && (
                  <BoxOfficeCard
                    title={t('boxOffice.daily')}
                    data={dailyData.data}
                    lastUpdated={dailyData.lastUpdated}
                    isDailyData={true}
                  />
                )}
                {weekendData && (
                  <BoxOfficeCard
                    title={t('boxOffice.weekend')}
                    data={weekendData.data}
                    lastUpdated={weekendData.lastUpdated}
                  />
                )}
                {domesticData && (
                  <BoxOfficeCard
                     title={t('boxOffice.domestic')}
                    data={domesticData.data}
                    lastUpdated={domesticData.lastUpdated}
                  />
                )}

                {worldwideData && (
                  <BoxOfficeCard
                    title={t('boxOffice.worldwide')}
                    data={worldwideData.data}
                    lastUpdated={worldwideData.lastUpdated}
                  />
                )}
              </div>
            </div>


            {/* Now Playing Movies Section */}
            <section className="mb-12">
              <SectionHeader
                title="Now Playing Movies"
                count={nowPlayingMovies.length}
                viewAllLink="/now-playing"
              />
              {nowPlayingMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {nowPlayingMovies.slice(0, 10).map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}

                      onClick={() => navigate(`/movie/${movie.imdbID}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                  <p>No movies currently playing</p>
                </div>
              )}
            </section>

            {/* Upcoming Movies Section */}
            <section className="mb-12">
              <SectionHeader
                title={t('upcoming.movies')}
                count={upcomingMovies.length}
                viewAllLink="/upcoming"
              />

              {upcomingMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {upcomingMovies.slice(0, 10).map((movie) => (
                    <MovieCard
                      key={movie.imdbID}
                      movie={movie}
                      onClick={() => navigate(`/movie/${movie.imdbID}`)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                  <p>No upcoming movies available</p>
                </div>
              )}
            </section>
          </>
        )}


      </div>
    </div>
  );
}
