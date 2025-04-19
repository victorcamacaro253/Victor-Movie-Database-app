// src/components/MovieCard.tsx
import { Movie } from "../types/movie";

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
  onRemove?: () => void; // Add onRemove as an optional property
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition"
    >
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
        alt={movie.Title}
        className="w-full h-64 object-cover rounded-lg mb-2"
      />
      <h3 className="font-bold">{movie.Title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{movie.Year}</p>
    </div>
  );
}