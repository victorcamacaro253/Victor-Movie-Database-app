// src/pages/TVShowDetails.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { TVShowDetails } from "../types/tv"; // Adjust the type based on your API response
import { fetchTVShowDetails, fetchSeasonDetails } from '../api/tmdb'; // Adjust the API function for TV shows
import ActorCard from '../components/ActorCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { StarIcon, ClockIcon, CalendarIcon, ChartBarIcon, FilmIcon, PlayIcon } from '../components/Icons';

export default function TVShowDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tvShow, setTVShow] = useState<TVShowDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [seasonDetails, setSeasonDetails] = useState<any>(null); // Replace `any` with your season type

  useEffect(() => {
    const fetchTVShow = async () => {
      try {
        setLoading(true);
        const data = await fetchTVShowDetails(Number(id)); // Fetch TV show details
        if (data) setTVShow(data);
        else setError("TV Show not found");
      } catch (err) {
        setError("Failed to fetch TV show details");
      } finally {
        setLoading(false);
      }
    };
    fetchTVShow();
  }, [id]);

  useEffect(() => {
    if (selectedSeason !== null) {
      const fetchSeason = async () => {
        try {
          const data = await fetchSeasonDetails(Number(id), selectedSeason);
          setSeasonDetails(data);
        } catch (err) {
          console.error("Failed to fetch season details:", err);
        }
      };
      fetchSeason();
    }
  }, [id, selectedSeason]);

  if (loading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorMessage message={error} />;
  if (!tvShow) return <div className="text-center py-20">No TV show data available</div>;

  const creator = tvShow.created_by?.[0]?.name || "N/A";
  const mainCast = tvShow.credits.cast.slice(0, 8);
  const runtimeHours = Math.floor((tvShow.episode_run_time?.[0] || 0) / 60);
  const runtimeMinutes = (tvShow.episode_run_time?.[0] || 0) % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section with Backdrop */}
      <div className="relative">
        {tvShow.backdrop_path && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
            <img
              src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`}
              alt={tvShow.name}
              className="w-full h-64 md:h-96 object-cover"
            />
          </>
        )}
        <div className="container mx-auto px-4 py-16 relative z-20">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* TV Show Poster */}
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="relative group">
                <img
                  src={tvShow.poster_path
                    ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
                    : "https://via.placeholder.com/500x750?text=No+Poster"}
                  alt={tvShow.name}
                  className="w-full h-auto rounded-xl shadow-2xl border-4 border-white dark:border-gray-800 transform group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x750?text=No+Poster';
                  }}
                />
                {tvShow.videos?.results?.length > 0 && (
                  <button
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 rounded-xl"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${tvShow.videos.results[0].key}`, '_blank')}
                  >
                    <div className="bg-red-600 p-4 rounded-full">
                      <PlayIcon className="w-8 h-8 text-white" />
                    </div>
                  </button>
                )}
              </div>
            </div>
            {/* TV Show Info */}
            <div className="flex-1 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                {tvShow.name}
                <span className="text-gray-300 ml-2">
                  ({tvShow.first_air_date.split('-')[0]})
                </span>
              </h1>
              {/* Genres */}
              <div className="flex flex-wrap gap-2 my-4">
                {tvShow.genres.map(genre => (
                  <span
                    key={genre.id}
                    className="px-3 py-1 bg-blue-600/30 text-blue-100 rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              {/* Rating and Runtime */}
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <StarIcon className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold">{tvShow.vote_average.toFixed(1)}</span>
                  <span className="text-gray-300">/10</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-gray-300" />
                  <span>
                    {runtimeHours > 0 && `${runtimeHours}h `}
                    {runtimeMinutes}m (per episode)
                  </span>
                </div>
              </div>
              {/* Tagline */}
              {tvShow.tagline && (
                <p className="italic text-gray-300 mb-4">"{tvShow.tagline}"</p>
              )}
              {/* Overview */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-200 dark:text-gray-300">
                  {tvShow.overview || "No overview available."}
                </p>
              </div>
              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3">
                  <CalendarIcon className="w-5 h-5 text-gray-300" />
                  <div>
                    <p className="text-sm text-gray-400">First Air Date</p>
                    <p>{new Date(tvShow.first_air_date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FilmIcon className="w-5 h-5 text-gray-300" />
                  <div>
                    <p className="text-sm text-gray-400">Creator</p>
                    <p>{creator}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ChartBarIcon className="w-5 h-5 text-gray-300" />
                  <div>
                    <p className="text-sm text-gray-400">Total Seasons</p>
                    <p>{tvShow.number_of_seasons}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <ChartBarIcon className="w-5 h-5 text-gray-300" />
                  <div>
                    <p className="text-sm text-gray-400">Total Episodes</p>
                    <p>{tvShow.number_of_episodes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Main Cast */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
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
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </div>
        </div>
        {/* Videos */}
        {tvShow.videos?.results?.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tvShow.videos.results.slice(0, 2).map(video => (
                <div key={video.id} className="relative aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                    alt={video.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-colors"
                    onClick={() => window.open(`https://www.youtube.com/watch?v=${video.key}`, '_blank')}
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
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Seasons</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {tvShow.seasons.map((season: any) => (
            <div
              key={season.season_number}
              onClick={() => setSelectedSeason(season.season_number)}
              className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={
                  season.poster_path
                    ? `https://image.tmdb.org/t/p/w500${season.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Poster"
                }
                alt={season.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{season.name}</h3>
                <p className="text-sm text-gray-600">{season.episode_count} Episodes</p>
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* Episodes Section */}
       {selectedSeason !== null && seasonDetails && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">
            Episodes - {seasonDetails.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {seasonDetails.episodes.map((episode: any) => (
              <div key={episode.episode_number} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={
                    episode.still_path
                      ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                      : "https://via.placeholder.com/300x169?text=No+Thumbnail"
                  }
                  alt={episode.name}
                  className="w-full h-32 object-cover rounded-lg mb-2"
                />
                <h3 className="text-lg font-semibold">{episode.name}</h3>
                <p className="text-sm text-gray-600">{episode.overview || "No description available."}</p>
                <p className="text-xs text-gray-500">
                  Air Date: {episode.air_date || "N/A"}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  


        {/* Similar Shows */}
        {tvShow.similar?.results?.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
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
    
  );
}