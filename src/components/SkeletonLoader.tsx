import React from 'react';

interface SkeletonLoaderProps {
  type?: 'movies' | 'boxoffice' | 'news' | 'full';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type = 'full' }) => {
  const MovieSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
      {[...Array(12)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-300 dark:bg-gray-700 rounded-lg aspect-[2/3] mb-2"></div>
          <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded mb-1"></div>
          <div className="bg-gray-300 dark:bg-gray-700 h-3 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );

  const BoxOfficeSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-gray-300 dark:bg-gray-700 rounded-lg h-64 animate-pulse"></div>
      ))}
    </div>
  );

  const NewsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-gray-300 dark:bg-gray-700 rounded-lg h-48 mb-4"></div>
          <div className="bg-gray-300 dark:bg-gray-700 h-4 rounded mb-2"></div>
          <div className="bg-gray-300 dark:bg-gray-700 h-3 rounded w-2/3"></div>
        </div>
      ))}
    </div>
  );

  if (type === 'movies') return <MovieSkeleton />;
  if (type === 'boxoffice') return <BoxOfficeSkeleton />;
  if (type === 'news') return <NewsSkeleton />;

  // Full page skeleton
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Skeleton */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-white/20 h-12 rounded mb-4 animate-pulse"></div>
          <div className="bg-white/20 h-6 rounded mb-8 w-2/3 mx-auto animate-pulse"></div>
          <div className="bg-white/20 h-12 rounded-lg w-full max-w-2xl mx-auto animate-pulse"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Section Headers and Content */}
        {[...Array(4)].map((_, sectionIndex) => (
          <div key={sectionIndex}>
            <div className="flex justify-between items-center mb-6">
              <div className="bg-gray-300 dark:bg-gray-700 h-8 w-48 rounded animate-pulse"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-6 w-24 rounded animate-pulse"></div>
            </div>
            <MovieSkeleton />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonLoader;
