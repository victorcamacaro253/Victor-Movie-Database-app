// src/components/NewsSection.tsx
import { Article } from '../api/news';
import { NewsCard } from './newsCard';
//import { useTheme } from '../context/ThemeContext';

interface NewsSectionProps {
  articles: Article[];
  title: string;
  subtitle: string;
  theme: 'light' | 'dark';
  className?: string;
  showViewAll?: boolean; // Added showViewAll property
}

export const NewsSection = ({ 
  articles, 
  title, 
  subtitle, 
  theme,
  className = ''
}: NewsSectionProps) => {
  return (
    <section className={`mb-12 ${className}`}>
      <h2 className={`text-3xl font-extrabold mb-6 ${
        theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
      }`}>
        {title}
      </h2>
      <p className={`text-xl mb-8 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {subtitle}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article, index) => (
          <NewsCard key={index} article={article} theme={theme} />
        ))}
      </div>
    </section>
  );
};