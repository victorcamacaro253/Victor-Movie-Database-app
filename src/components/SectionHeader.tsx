// src/components/SectionHeader.tsx
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface SectionHeaderProps {
  title: string;
  count?: number;
  viewAllLink?: string;
}

export default function SectionHeader({ title, count, viewAllLink }: SectionHeaderProps) {
  const { theme } = useTheme();
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        {title}
        {count !== undefined && (
          <span className={`ml-2 text-sm font-normal ${theme === 'dark' ? 'text-white' : 'text-gray-900'} `}>
            ({count})
          </span>
        )}
      </h2>
      {viewAllLink && (
        <Link 
          to={viewAllLink}
          className={`text-sm ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'}`}
        >
          View All
        </Link>
      )}
    </div>
  );
}