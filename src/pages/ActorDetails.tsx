// src/pages/ActorDetails.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchActorDetails } from '../api/tmdb';
import { ActorDetails } from "../types/actors";
import { StarIcon, CalendarIcon, MapPinIcon, FilmIcon, TvIcon } from "../components/Icons";
import LoadingSpinner from "../components/LoadingSpinner";
import {ErrorMessage} from "../components/ErrorMessage";

export default function ActorDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [actor, setActor] = useState<ActorDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActor = async () => {
      try {
        setLoading(true);
        const data = await fetchActorDetails(id!);
        if (data) setActor(data);
        else setError("Actor not found");
      } catch (err) {
        setError("Failed to fetch actor details");
      } finally {
        setLoading(false);
      }
    };
    fetchActor();
  }, [id]);

  if (loading) return <LoadingSpinner fullPage />;
  if (error) return <ErrorMessage message={error} />;
  if (!actor) return <div className="text-center py-20">No actor data available</div>;

  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative">
        {actor.profile_path && (
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent z-10" />
        )}
        <div className="container mx-auto px-4 py-16 relative z-20">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {actor.profile_path && (
              <div className="w-full md:w-1/3 lg:w-1/4">
                <img
                  src={`${imageBaseUrl}${actor.profile_path}`}
                  alt={actor.name}
                  className="w-full h-auto rounded-xl shadow-2xl border-4 border-white dark:border-gray-800 transform -rotate-2 hover:rotate-0 transition-transform duration-300"
                />
              </div>
            )}
            
            <div className="flex-1 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow-lg">
                {actor.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                {actor.birthday && (
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    <span>{new Date(actor.birthday).toLocaleDateString()}</span>
                  </div>
                )}
                {actor.place_of_birth && (
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="w-5 h-5" />
                    <span>{actor.place_of_birth}</span>
                  </div>
                )}
              </div>
              
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-gray-200 dark:text-gray-300">
                  {actor.biography || "Biography not available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Filmography */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <FilmIcon className="w-8 h-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
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
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <TvIcon className="w-8 h-8 text-purple-500" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
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