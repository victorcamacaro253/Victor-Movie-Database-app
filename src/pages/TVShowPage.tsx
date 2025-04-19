// src/pages/TVPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MediaCard } from '../components/MediaCard';
import SectionHeader from '../components/SectionHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import {ErrorMessage} from '../components/ErrorMessage';
import DropdownFilter from '../components/DropdownFilter';
import Pagination from '../components/Pagination';
import { 
  fetchPopularTVShows,
  fetchTopRatedTVShows,
  fetchTVShowsAiringToday,
  fetchTVShowsOnTheAir,
 
} from '../api/tmdb';
import { useLanguage } from '../context/LanguageContext';
import { getApiLanguageCode } from '../utils/languageUtils';

const tvCategories = [
  { value: 'popular', label: 'Popular' },
  { value: 'top_rated', label: 'Top Rated' },
  { value: 'airing_today', label: 'Airing Today' },
  { value: 'on_the_air', label: 'Currently Airing' }
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
  { value: 'first_air_date.desc', label: 'Newest Releases' },
  { value: 'first_air_date.asc', label: 'Oldest Releases' }
];

export default function TVPage() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [category, setCategory] = useState('popular');
  const [year, setYear] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [page, setPage] = useState(1);
  const [shows, setShows] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTVShows = async () => {
      try {
        setLoading(true);
        setError('');
        const apiLanguage = getApiLanguageCode(language);
        
        let response;
        switch (category) {
          case 'popular':
            response = await fetchPopularTVShows(page, apiLanguage);
            break;
          case 'top_rated':
            response = await fetchTopRatedTVShows(page, apiLanguage);
            break;
          case 'airing_today':
            response = await fetchTVShowsAiringToday(page, apiLanguage);
            break;
          case 'on_the_air':
            response = await fetchTVShowsOnTheAir(page, apiLanguage);
            break;
          default:
            response = await fetchPopularTVShows(page, apiLanguage);
        }

        if ('results' in response && response.results) {
          setShows(response.results);
          setTotalPages(response.total_pages || 1);
        } else {
          setShows([]);
        }
      } catch (err) {
        setError(t('error.fetch_tv_shows') || 'Failed to fetch TV shows. Please try again later.');
        console.error('Error fetching TV shows:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTVShows();
  }, [category, page, year, sortBy, language, t]);

  const handleShowClick = (showId: number) => {
    navigate(`/tv/${showId}`);
  };

  if (loading && !shows.length) {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t('tv_shows.title')}</h1>
          <p className="text-lg">{t('tv_shows.subtitle')}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <DropdownFilter
            label={t('filters.category')}
            options={tvCategories}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
          />
          <DropdownFilter
            label={t('filters.year')}
            options={yearOptions}
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
              setPage(1);
            }}
          />
          <DropdownFilter
            label={t('filters.sort_by')}
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
          title={tvCategories.find(c => c.value === category)?.label || t('tv_shows.title')}
          count={shows.length}
        />

        {shows.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
              {shows.map((show) => (
                <MediaCard 
                  key={show.id}
                  item={{
                    type: 'tv',
                    id: show.id,
                    title: show.name,
                    poster_path: show.poster_path,
                    release_date: show.first_air_date,
                    vote_average: show.vote_average,
                    overview: show.overview
                  }}
                  onClick={() => handleShowClick(show.id)}
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
              {loading ? t('searching') : t('tv_shows.no_results')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}