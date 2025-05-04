import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { TVShowDetails } from "../types/tv";
import { fetchTVShowDetails, fetchSeasonDetails } from '../api/tmdb';
import ActorCard from '../components/ActorCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { StarIcon, ClockIcon, CalendarIcon, ChartBarIcon, FilmIcon, PlayIcon } from '../components/Icons';
import { getApiLanguageCode } from '../utils/languageUtils';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from "../context/ThemeContext";

export default function TVShowDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tvShow, setTVShow] = useState<TVShowDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [seasonDetails, setSeasonDetails] = useState<any>(null);
  const { language } = useLanguage();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchTVShow = async () => {
      try {
        setLoading(true);
        const apiLanguage = getApiLanguageCode(language);
        const data = await fetchTVShowDetails(Number(id), apiLanguage);
        console.log(data)
        if (data) {
          setTVShow(data);
          // Auto-select first season if available
          if (data.seasons?.length > 0) {
            setSelectedSeason(data.seasons[0].season_number);
          }
        } else {
          setError("TV Show not found");
        }
      } catch (err) {
        setError("Failed to fetch TV show details");
      } finally {
        setLoading(false);
      }
    };
    fetchTVShow();
  }, [id, language]);

  useEffect(() => {
    if (selectedSeason !== null) {
      const fetchSeason = async () => {
        try {
          const apiLanguage = getApiLanguageCode(language);
          const data = await fetchSeasonDetails(Number(id), selectedSeason, apiLanguage);
          setSeasonDetails(data);
        } catch (err) {
          console.error("Failed to fetch season details:", err);
        }
      };
      fetchSeason();
    }
  }, [id, selectedSeason, language]);

  if (loading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorMessage message={error} />;
  if (!tvShow) return <div className="text-center py-20">No TV show data available</div>;

  const creator = tvShow.created_by?.[0]?.name || "N/A";
  const mainCast = tvShow.credits.cast.slice(0, 8);
  const runtimeHours = Math.floor((tvShow.episode_run_time?.[0] || 0) / 60);
  const runtimeMinutes = (tvShow.episode_run_time?.[0] || 0) % 60;

  const themeClasses = {
    bg: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
    cardBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    text: theme === 'dark' ? 'text-gray-100' : 'text-gray-900',
    secondaryText: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg}`}>
      {/* Hero Section */}
      <div className="relative">
        {tvShow.backdrop_path ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent z-10" />
            <img
              src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`}
              alt={tvShow.name}
              className="w-full aspect-[2/1] md:aspect-[3/1] object-cover"
              loading="lazy"
            />
          </>
        ) : (
          <div className="w-full aspect-[2/1] md:aspect-[3/1] bg-gray-800" />
        )}

        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          aria-label="Go back"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-20 -mt-16 md:-mt-24">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* TV Show Poster */}
          <div className="w-full md:w-1/3 lg:w-1/4 order-2 md:order-1">
            <div className="relative group">
              <img
                src={tvShow.poster_path
                  ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
                  : "https://via.placeholder.com/500x750?text=No+Poster"}
                alt={tvShow.name}
                className={`w-full h-auto rounded-xl shadow-lg border-4 ${themeClasses.border} transform group-hover:scale-105 transition-transform duration-300`}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x750?text=No+Poster';
                }}
                loading="lazy"
              />
              {tvShow.videos?.results?.length > 0 && (
                <button
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-xl"
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${tvShow.videos.results[0].key}`, '_blank')}
                  aria-label="Play trailer"
                >
                  <div className="bg-red-600 p-4 rounded-full">
                    <PlayIcon className="w-8 h-8 text-white" />
                  </div>
                </button>
              )}
            </div>
          </div>

          {/* TV Show Info */}
          <div className={`order-1 md:order-2 flex-1 ${themeClasses.cardBg} p-6 rounded-xl shadow-lg`}>
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ${themeClasses.text}`}>
              {tvShow.name}
              <span className="block md:inline md:ml-2 text-gray-600 dark:text-gray-300">
                ({tvShow.first_air_date.split('-')[0]})
              </span>
            </h1>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 my-4">
              {tvShow.genres.map(genre => (
                <span 
                  key={genre.id} 
                  className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Rating and Runtime */}
            <div className="flex items-center gap-6 mb-6">
              <div className={`flex items-center gap-2 ${themeClasses.text}`}>
                <StarIcon className="w-5 h-5 text-yellow-500" />
                <span className="font-bold">{tvShow.vote_average.toFixed(1)}</span>
                <span className={themeClasses.secondaryText}>/10</span>
              </div>
              <div className={`flex items-center gap-2 ${themeClasses.text}`}>
                <ClockIcon className="w-5 h-5" />
                <span>
                  {runtimeHours > 0 && `${runtimeHours}h `}
                  {runtimeMinutes}m (per episode)
                </span>
              </div>
              <div className={`flex items-center gap-2 ${themeClasses.text}`}>
                  <PlayIcon className="w-5 h-5" />
                  <span>
                  {tvShow.watch_providers?.results?.US?.flatrate?.length ? (
                    <div className="flex items-center gap-2">
                    {tvShow.watch_providers.results.US.flatrate.map(provider => (
                      <div key={provider.provider_id} className="flex items-center gap-1">
                      <img
                        src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                        alt={provider.provider_name || "Provider Logo"}
                        className="w-6 h-6 rounded"
                        loading="lazy"
                      />
                      <span>{provider.provider_name || "Unknown Provider"}</span>
                      </div>
                    ))}
                    </div>
                  ) : (
                    "No streaming providers available"
                  )}
                  </span>
                </div>
            </div>

            {/* Tagline */}
            {tvShow.tagline && (
              <p className={`italic ${themeClasses.secondaryText}`}>"{tvShow.tagline}"</p>
            )}

            {/* Overview */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
              <p className={themeClasses.text}>
                {tvShow.overview || "No overview available."}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <CalendarIcon className={`w-5 h-5 ${themeClasses.secondaryText}`} />
                <div>
                  <p className={`text-sm ${themeClasses.secondaryText}`}>First Air Date</p>
                  <p className={themeClasses.text}>
                    {new Date(tvShow.first_air_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FilmIcon className={`w-5 h-5 ${themeClasses.secondaryText}`} />
                <div>
                  <p className={`text-sm ${themeClasses.secondaryText}`}>Creator</p>
                  <p className={themeClasses.text}>{creator}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ChartBarIcon className={`w-5 h-5 ${themeClasses.secondaryText}`} />
                <div>
                  <p className={`text-sm ${themeClasses.secondaryText}`}>Seasons</p>
                  <p className={themeClasses.text}>{tvShow.number_of_seasons}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ChartBarIcon className={`w-5 h-5 ${themeClasses.secondaryText}`} />
                <div>
                  <p className={`text-sm ${themeClasses.secondaryText}`}>Episodes</p>
                  <p className={themeClasses.text}>{tvShow.number_of_episodes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 pb-12">
        {/* Main Cast */}
        <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-6 mb-8`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${themeClasses.text}`}>
              Main Cast
            </h2>
            {tvShow.credits.cast.length > 8 && (
              <Link
                to={`/tv/${id}/cast`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Full Cast
              </Link>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mainCast.map(actor => (
              <ActorCard key={actor.id} actor={actor} theme={theme} />
            ))}
          </div>
        </div>

        {/* Videos */}
        {tvShow.videos?.results?.length > 0 && (
          <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-6 mb-8`}>
            <h2 className={`text-2xl font-bold ${themeClasses.text} mb-6`}>
              Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tvShow.videos.results.slice(0, 2).map(video => (
                <div key={video.id} className="relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                    alt={video.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${video.key}`, '_blank')}
                    aria-label={`Play ${video.name}`}
                  >
                    <div className="bg-red-600 p-3 rounded-full">
                      <PlayIcon className="w-6 h-6 text-white" />
                    </div>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
                    <p className="text-white font-medium">{video.name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Seasons Section */}
        <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-6 mb-8`}>
          <h2 className={`text-2xl font-bold ${themeClasses.text} mb-6`}>
            Seasons
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {tvShow.seasons.map((season: any) => (
              <div
                key={season.season_number}
                onClick={() => setSelectedSeason(season.season_number)}
                className={`cursor-pointer rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105 ${
                  selectedSeason === season.season_number 
                    ? 'ring-2 ring-blue-500 dark:ring-blue-400' 
                    : ''
                }`}
              >
                <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700">
                  {season.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                      alt={season.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-500 dark:text-gray-400">No Poster</span>
                    </div>
                  )}
                </div>
                <div className={`p-3 ${theme === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
                  <h3 className={`font-semibold ${themeClasses.text}`}>{season.name}</h3>
                  <p className={`text-sm ${themeClasses.secondaryText}`}>
                    {season.episode_count} Episodes
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Episodes Section */}
        {selectedSeason !== null && seasonDetails && (
          <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-6 mb-8`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl font-bold ${themeClasses.text}`}>
                Episodes - {seasonDetails.name}
              </h2>
              <button 
                onClick={() => setSelectedSeason(null)}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Hide Episodes
              </button>
            </div>
            <div className="space-y-4">
              {seasonDetails.episodes.map((episode: any) => (
                <div 
                  key={episode.episode_number} 
                  className={`flex flex-col md:flex-row gap-4 p-4 rounded-lg ${
                    theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                  } transition-colors`}
                >
                  <div className="w-full md:w-1/3 lg:w-1/4">
                    <img
                      src={
                        episode.still_path
                          ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                          : "https://via.placeholder.com/300x169?text=No+Thumbnail"
                      }
                      alt={episode.name}
                      className="w-full rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                      <span className={`font-bold ${themeClasses.text}`}>
                        Episode {episode.episode_number}
                      </span>
                      {episode.vote_average > 0 && (
                        <span className={`flex items-center text-sm ${themeClasses.secondaryText}`}>
                          <StarIcon className="w-4 h-4 text-yellow-500 mr-1" />
                          {episode.vote_average.toFixed(1)}
                        </span>
                      )}
                    </div>
                    <h3 className={`text-lg font-semibold ${themeClasses.text} mb-2`}>
                      {episode.name}
                    </h3>
                    <p className={`${themeClasses.secondaryText} mb-2`}>
                      {episode.overview || "No description available."}
                    </p>
                    <p className={`text-sm ${themeClasses.secondaryText}`}>
                      Air Date: {episode.air_date || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar Shows */}
        {tvShow.similar?.results?.length > 0 && (
          <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-6`}>
            <h2 className={`text-2xl font-bold ${themeClasses.text} mb-6`}>
              Similar Shows
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {tvShow.similar.results.slice(0, 5).map(show => (
                <Link
                  to={`/tv/${show.id}`}
                  key={show.id}
                  className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700">
                    {show.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        alt={show.name}
                        className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                        loading="lazy"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450?text=No+Poster';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600">
                        <span className="text-gray-500 dark:text-gray-400">No Poster</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                    <h3 className="text-white font-semibold line-clamp-2">{show.name}</h3>
                    <p className="text-gray-300 text-sm">
                      {show.first_air_date ? show.first_air_date.split('-')[0] : 'N/A'}
                      <span className="flex items-center ml-2">
                        <StarIcon className="w-3 h-3 text-yellow-400 mr-1" />
                        {show.vote_average.toFixed(1)}
                      </span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}