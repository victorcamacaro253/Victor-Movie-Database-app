// src/pages/TopMoviesPage.tsx
import { useState, useEffect } from 'react';
import { fetchTopMovies, fetchTrendingMovies } from '../api/tmdb';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useTheme } from '../context/ThemeContext';
import DropdownFilter from '../components/DropdownFilter';

const timeFilters = [
  { value: 'day', label: 'Today' },
  { value: 'week', label: 'This Week' },
  { value: 'all', label: 'All Time' }
];

const sortOptions = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'vote_average.desc', label: 'Highest Rated' },
  { value: 'revenue.desc', label: 'Top Grossing' }
];

export default function TopMoviesPage() {
  const { theme } = useTheme();
  const [timeRange, setTimeRange] = useState<'day' | 'week' | 'all'>('week');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let data;
        
        if (timeRange === 'all') {
          // For "All Time" we use discover with sorting
          console.log('Fetching all time movies with sort:', sortBy);
        data = await fetchTopMovies(sortBy);
        console.log('All time data received:', data);
        } else {
          // For day/week we use trending
          data = await fetchTrendingMovies(timeRange);
        }
        
        setMovies(data.results || []);
      } catch (err) {
        setError('Failed to fetch top movies');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [timeRange, sortBy]);

  if (loading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-12 px-4 text-white">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Top Movies</h1>
          <p className="text-lg">Most popular movies right now</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className={`flex flex-col md:flex-row gap-4 mb-8 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } p-4 rounded-lg shadow`}>
          <DropdownFilter
            label="Time Range"
            options={timeFilters}
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as 'day' | 'week' | 'all')}
          />
          
          {timeRange === 'all' && (
            <DropdownFilter
              label="Sort By"
              options={sortOptions}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            />
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.map((movie, index) => (
            console.log('Rendering movie:', movie),
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
                          popularity: movie.popularity,
                          revenue: movie.revenue
                      }}
                      showRating={true}
                      showPopularity={true}
                      onClick={() => navigate(`/movie/${movie.id}`)}
                               
                               />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}