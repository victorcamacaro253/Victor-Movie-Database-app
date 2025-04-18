interface SearchBarProps {
    query: string;
    onQueryChange: (value: string) => void;
    onSearch: () => void;
    loading: boolean;
  }
  
  export default function SearchBar({ query, onQueryChange, onSearch, loading }: SearchBarProps) {
    return (
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search for a movie or TV show..."
          className="flex-1 p-2 border rounded-lg focus:outline-none text-black focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onSearch}
          disabled={loading || !query}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    );
  }