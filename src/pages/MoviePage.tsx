// src/pages/MoviesPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import SectionHeader from '../components/SectionHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import {ErrorMessage} from '../components/ErrorMessage';
import DropdownFilter from '../components/DropdownFilter';
import Pagination from '../components/Pagination';
import { 
  fetchPopularMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,

} from '../api/tmdb';

const movieCategories = [
  { value: 'popular', label: 'Popular' },
  { value: 'now_playing', label: 'Now Playing' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'top_rated', label: 'Top Rated' }
];

const yearOptions = [
  { value: '', label: 'All Years' },
  ...Array.from({ length: 30 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { value: year.toString(), label: year.toString() };
  })
];

const sortOptions = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'popularity.asc', label: 'Least Popular' },
  { value: 'vote_average.desc', label: 'Highest Rated' },
  { value: 'vote_average.asc', label: 'Lowest Rated' },
  { value: 'release_date.desc', label: 'Newest Releases' },
  { value: 'release_date.asc', label: 'Oldest Releases' }
];

export default function MoviesPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState('popular');
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError('');
        
        let response;
        switch (category) {
          case 'popular':
            response = await fetchPopularMovies(page);
            break;
          case 'now_playing':
            response = await fetchNowPlayingMovies(page);
            break;
          case 'upcoming':
            response = await fetchUpcomingMovies(page);
            break;
          case 'top_rated':
            response = await fetchTopRatedMovies(page);
            console.log('response:', response);
            break;
          default:
            response = await fetchPopularMovies(page);
        }

        if ('results' in response && response.results) {
          setMovies(response.results);
          setTotalPages(response.total_pages || 1);
        } else {
          setMovies([]);
        }
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, page, year, sortBy]);

  const handleMovieClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  if (loading && !movies.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Movies</h1>
          <p className="text-lg">Browse thousands of movies from all genres</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <DropdownFilter
            label="Category"
            options={movieCategories}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          />
          <DropdownFilter
            label="Year"
            options={yearOptions}
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setPage(1);
            }}
          />
          <DropdownFilter
            label="Sort By"
            options={sortOptions}
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Results */}
        <SectionHeader 
          title={movieCategories.find(c => c.value === category)?.label || 'Movies'}
          count={movies.length}
        />

        {movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
              {movies.map((movie) => (
                <MovieCard 
                  key={movie.id}
                  movie={{
                    id: movie.id,
                    Title: movie.title,
                    Year: movie.release_date?.split('-')[0] || 'N/A',
                    imdbID: movie.id.toString(),
                    Type: 'movie',
                    Poster: movie.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : 'https://via.placeholder.com/300x450?text=No+Poster',
                    vote_average: movie.vote_average,
                    overview: movie.overview
                  }}
                  onClick={() => handleMovieClick(movie.id)}
                />
              ))}
            </div>

            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {loading ? 'Loading movies...' : 'No movies found matching your criteria'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}