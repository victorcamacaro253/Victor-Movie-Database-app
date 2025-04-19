// src/pages/Favorites.tsx
import { Link } from "react-router-dom";
import { Movie } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";

export default function Favorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      try {
        const parsedFavorites = JSON.parse(saved);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
      }
    }
    setLoading(false);
  }, []);

  const removeFavorite = (imdbID: string) => {
    const updatedFavorites = favorites.filter(movie => movie.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  if (loading) {
    return <p>Loading your favorites...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Your Favorites</h2>
      {favorites.length === 0 ? (
        <p>
          No favorites yet. <Link to="/" className="text-blue-600">Search movies</Link>
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <MovieCard 
              key={movie.imdbID} 
              movie={movie}
              onClick={() => {/* Navigate to details */}}
              onRemove={() => removeFavorite(movie.imdbID)} // Pass remove function to MovieCard
            />
          ))}
        </div>
      )}
    </div>
  );
}