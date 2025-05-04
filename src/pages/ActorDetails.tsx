import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchActorDetails } from '../api/tmdb';
import { ActorDetails } from "../types/actors";
import { StarIcon, CalendarIcon, MapPinIcon, FilmIcon, TvIcon } from "../components/Icons";
import LoadingSpinner from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { useTheme } from "../context/ThemeContext";
import { getApiLanguageCode } from "../utils/languageUtils";
import { useLanguage } from "../context/LanguageContext";

export default function ActorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  
  const [actor, setActor] = useState<ActorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { theme } = useTheme();
  const { language } = useLanguage();

  useEffect(() => {
    const fetchActor = async () => {
      try {
        setLoading(true);
        const apiLanguage = getApiLanguageCode(language);
        const data = await fetchActorDetails(id!, apiLanguage);
        if (data) setActor(data);
        else setError("Actor not found");
      } catch (err) {
        setError("Failed to fetch actor details");
      } finally {
        setLoading(false);
      }
    };
    fetchActor();
  }, [id, language]);

  const themeClasses = {
    bg: theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
    cardBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    text: theme === 'dark' ? 'text-gray-100' : 'text-gray-900',
    secondaryText: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
  };

  if (loading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorMessage message={error} />;
  if (!actor) return <div className="text-center py-20">No actor data available</div>;

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className={`min-h-screen ${themeClasses.bg}`}>
      {/* Hero Section */}
     

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-8 md:py-12 relative z-20 -mt-16 md:-mt-24">
        <div className="flex mt-20 flex-col md:flex-row gap-8 items-start">
          {/* Actor Photo */}
          {actor.profile_path && (
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="relative group">
                <img
                  src={`${imageBaseUrl}${actor.profile_path}`}
                  alt={actor.name}
                  className={`w-full h-auto rounded-xl shadow-lg border-4 ${themeClasses.border} transform group-hover:scale-105 transition-transform duration-300`}
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x750?text=No+Photo';
                  }}
                />
              </div>
            </div>
          )}
          
          {/* Actor Info */}
          <div className={`flex-1 ${themeClasses.cardBg} p-6 rounded-xl shadow-lg`}>
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-2 ${themeClasses.text}`}>
              {actor.name}
            </h1>
            
            {/* Personal Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {actor.birthday && (
                <div className={`flex items-center gap-2 ${themeClasses.text}`}>
                  <CalendarIcon className="w-5 h-5" />
                  <span>{new Date(actor.birthday).toLocaleDateString()}</span>
                  {actor.deathday && (
                    <span className={themeClasses.secondaryText}>
                      - {new Date(actor.deathday).toLocaleDateString()}
                    </span>
                  )}
                </div>
              )}
              {actor.place_of_birth && (
                <div className={`flex items-center gap-2 ${themeClasses.text}`}>
                  <MapPinIcon className="w-5 h-5" />
                  <span>{actor.place_of_birth}</span>
                </div>
              )}
            </div>
            
            {/* Biography */}
            <div className="prose prose-lg dark:prose-invert max-w-none mb-6">
              <p className={themeClasses.text}>
                {actor.biography || "Biography not available."}
              </p>
            </div>

            {/* Known For */}
            {actor.known_for_department && (
              <div className={`flex items-center gap-3 ${themeClasses.text}`}>
                <span className="font-semibold">Known For:</span>
                <span>{actor.known_for_department}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="container mx-auto px-4 pb-12">
        {/* Filmography */}
        <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-6 mb-8`}>
          <div className="flex items-center gap-3 mb-6">
            <FilmIcon className="w-8 h-8 text-blue-500" />
            <h2 className={`text-2xl font-bold ${themeClasses.text}`}>
              Filmography
            </h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {actor.filmography.map(movie => (
              <Link 
                to={`/movie/${movie.id}`}
                key={movie.id}
                className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700">
                  {movie.poster_path ? (
                    <img
                      src={`${imageBaseUrl}${movie.poster_path}`}
                      alt={movie.title}
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
                  <h3 className="text-white font-semibold line-clamp-2">{movie.title}</h3>
                  <p className="text-gray-300 text-sm">
                    {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
                    {movie.vote_average > 0 && (
                      <span className="flex items-center ml-2">
                        <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                        {movie.vote_average.toFixed(1)}
                      </span>
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* TV Credits */}
        {actor.tv_credits && actor.tv_credits.length > 0 && (
          <div className={`${themeClasses.cardBg} rounded-xl shadow-lg p-6`}>
            <div className="flex items-center gap-3 mb-6">
              <TvIcon className="w-8 h-8 text-purple-500" />
              <h2 className={`text-2xl font-bold ${themeClasses.text}`}>
                TV Appearances
              </h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {actor.tv_credits.map(show => (
                <Link 
                  to={`/tv/${show.id}`}
                  key={show.id}
                  className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[2/3] bg-gray-200 dark:bg-gray-700">
                    {show.poster_path ? (
                      <img
                        src={`${imageBaseUrl}${show.poster_path}`}
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
                      {show.vote_average > 0 && (
                        <span className="flex items-center ml-2">
                          <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                          {show.vote_average.toFixed(1)}
                        </span>
                      )}
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