// src/components/MovieCard.tsx
import { Movie } from "../types/movie";
import { useTheme } from "../context/ThemeContext";
import { StarIcon } from "./Icons"; // Assuming you have a StarIcon component

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
  onRemove?: () => void;
  showRating?: boolean; // Optional rating display
}

export default function MovieCard({ movie, onClick, onRemove, showRating = false }: MovieCardProps) {
  const { theme } = useTheme();

  // Theme-based classes
  const cardClasses = {
    bg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    text: theme === 'dark' ? 'text-gray-100' : 'text-gray-900',
    secondaryText: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    hover: theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-50',
    shadow: theme === 'dark' ? 'shadow-gray-900' : 'shadow-gray-200'
  };

  return (
    <div
      onClick={onClick}
      className={`relative ${cardClasses.bg} ${cardClasses.text} p-4 rounded-lg shadow-md ${cardClasses.hover} hover:shadow-lg transition-all duration-300 cursor-pointer group`}
    >
      {/* Remove button (if onRemove provided) */}
      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={`absolute top-2 right-2 z-10 p-1 rounded-full ${
            theme === 'dark' ? 'bg-gray-900 text-red-400' : 'bg-white text-red-500'
          } opacity-0 group-hover:opacity-100 transition-opacity shadow-sm`}
          aria-label="Remove movie"
        >
          ×
        </button>
      )}

      {/* Movie Poster */}
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden mb-3">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"}
          alt={movie.Title}
          className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x450?text=No+Poster";
          }}
        />
        
        {/* Rating badge (if showRating is true and rating exists) */}
        {showRating && typeof movie.vote_average === "number" && (
          <div className={`absolute bottom-2 left-2 flex items-center px-2 py-1 rounded-md text-xs font-semibold ${
            theme === 'dark' ? 'bg-gray-900/90 text-yellow-300' : 'bg-white/90 text-yellow-600'
          }`}>
            <StarIcon className="w-3 h-3 mr-1" />
            {movie.vote_average}
          </div>
        )}
      </div>

      {/* Movie Info */}
      <div className="space-y-1">
        <h3 className={`font-bold line-clamp-2 ${cardClasses.text}`}>{movie.Title}</h3>
        <div className="flex justify-between items-center">
          <p className={`text-sm ${cardClasses.secondaryText}`}>{movie.Year}</p>
         
        </div>
      </div>
    </div>
  );
}