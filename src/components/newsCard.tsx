// src/components/NewsCard.tsx
import { Article } from '../api/news';

interface NewsCardProps {
  article: Article;
  theme?: 'light' | 'dark';
}

export const NewsCard = ({ article, theme = 'light' }: NewsCardProps) => {
  return (
    <div className={`flex flex-col rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white'
    }`}>
      <div className="flex-shrink-0 relative h-48">
        <img
          className="w-full h-full object-cover"
          src={article.urlToImage || 'https://via.placeholder.com/400x200?text=No+Image'}
          alt={article.title}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/400x200?text=No+Image';
          }}
        />
        <span className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {article.source.name}
        </span>
      </div>
      <div className="flex-1 p-2 flex flex-col justify-between">
        <div className="flex-1">
          <h3 className={`text-xl font-semibold ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {article.title}
          </h3>
          <p className={`mt-1 text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
            {new Date(article.publishedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
          <p className={`mt-3 text-base ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-500'
          }`}>
            {article.description?.substring(0, 120)}...
          </p>
        </div>
        <div className="mt-6">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold text-red-600 hover:text-red-500"
          >
            Read full story →
          </a>
        </div>
      </div>
    </div>
  );
};