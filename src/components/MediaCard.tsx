// src/components/MediaCard.tsx
import { SearchResult } from '../types/movie';
import { StarIcon } from './Icons';

interface MediaCardProps {
  item: SearchResult;
  onClick: () => void;
}

export function MediaCard({ item, onClick }: MediaCardProps) {
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer transition-transform hover:scale-105"
    >
      <div className="relative aspect-[2/3] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
        {item.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={item.title}
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
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
          {item.type === 'movie' ? 'Movie' : 'TV Show'}
        </div>
      </div>
      <div className="mt-2">
        <h3 className="font-bold line-clamp-2">{item.title}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-gray-600 dark:text-gray-400 text-sm">
            {item.release_date?.split('-')[0] || 'N/A'}
          </span>
          {item.vote_average > 0 && (
            <span className="flex items-center text-sm">
              <StarIcon className="w-3 h-3 text-yellow-400 mr-1" />
              {item.vote_average.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}