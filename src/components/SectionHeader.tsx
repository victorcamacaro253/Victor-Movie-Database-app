// src/components/SectionHeader.tsx
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  title: string;
  count?: number;
  viewAllLink?: string;
}

export default function SectionHeader({ title, count, viewAllLink }: SectionHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">
        {title}
        {count !== undefined && (
          <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
            ({count})
          </span>
        )}
      </h2>
      {viewAllLink && (
        <Link 
          to={viewAllLink}
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          View All
        </Link>
      )}
    </div>
  );
}