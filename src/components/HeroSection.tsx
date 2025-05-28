import React from 'react';
import SearchBar from './SearchBar';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  query: string;
  onQueryChange: (query: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  query,
  onQueryChange,
  onSearch,
  loading
}) => (
  <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 py-16 px-4 text-white relative overflow-hidden">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'7\' cy=\'7\' r=\'7\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
    </div>
    
    <div className="max-w-6xl mx-auto relative z-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
          {subtitle}
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <SearchBar
          query={query}
          onQueryChange={onQueryChange}
          onSearch={onSearch}
          loading={loading}
        />
      </div>

      
    </div>
  </section>
);
export default HeroSection;
