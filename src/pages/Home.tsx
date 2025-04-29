// src/pages/HomePage.tsx
import { useTmdbMovies } from '../hooks/useTmdbMovies';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { MediaCard } from '../components/MediaCard';
import SearchBar from '../components/SearchBar';
import SectionHeader from '../components/SectionHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useState } from 'react';
//import { searchMovies } from '../api/movies';
import { searchMulti } from '../api/tmdb';
import { useLanguage } from '../context/LanguageContext';
import { SearchResult } from '../types/movie';
import { useTheme } from '../context/ThemeContext';

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
  const { theme } = useTheme();

  const handleSearch = async () => {
    if (!query.trim()) {
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      setSearchLoading(true);
      setSearchError(null);
      
    //  const { movies: results } = await searchMovies(query);
    const results = await searchMulti(query);
    console.log(results)
      setSearchResults(results);
    } catch (err) {
      setSearchError('Failed to fetch search results');
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // Combined loading state
  const isLoading = initialLoading || searchLoading;

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
            onQueryChange={setQuery}
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
            
            {searchResults.length > 0 ? (
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
                {isLoading ? 'Searching...' : 'No movies found matching your search'}
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
                  {trendingMovies.slice(0, 10).map((movie,index) => (
                    <div key={movie.id} className="relative">
                       <span className={`absolute -top-2 -left-2 z-10 rounded-full ${
                index < 3 
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