import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

interface BoxOfficeItem {
  rank: number;
  title: string;
  url: string;
  gross: string;
  dailyGross?: string;
  daysInRelease?: number;
  date?: string;
}

interface BoxOfficeCardProps {
  title: string;
  data: BoxOfficeItem[];
  lastUpdated: string;
  isDailyData?: boolean;
}

export default function BoxOfficeCard({ 
  title, 
  data, 
  lastUpdated, 
  isDailyData = false 
}: BoxOfficeCardProps) {
  const { theme } = useTheme();
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Get unique dates if this is daily data
  const dates = isDailyData && data[0]?.date
    ? [...new Set(data.map(item => item.date))].sort().reverse()
    : [];

  // Filter data - for daily data show only selected date (or latest if none selected)
  const filteredData = isDailyData && dates.length > 0
    ? selectedDate
      ? data.filter(item => item.date === selectedDate)
      : data.filter(item => item.date === dates[0])
    : data; // For non-daily data, show all

    // Function to properly format dates without timezone shifts
const formatDisplayDate = (dateString: string) => {
    if (!dateString) return '';
    // Parse as local date (ignoring timezone)
    const [year, month, day] = dateString.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day)).toLocaleDateString();
  };

  const themeClasses = {
    bg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    text: theme === 'dark' ? 'text-gray-100' : 'text-gray-900',
    secondaryText: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    border: theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
  };

  const formatMoney = (value: string) => {
    if (!value) return '-';
    if (value.includes('$')) return value;
    
    const num = parseInt(value.replace(/\D/g, ''), 10);
    return isNaN(num) ? value : `$${(num / 1000000).toFixed(1)}M`;
  };

  return (
    <div className={`rounded-xl shadow-lg ${themeClasses.bg} ${themeClasses.border} border`}>
      <div className="p-4 border-b">
        <div className="flex justify-between items-start">
          <div>
            <h2 className={`text-xl font-bold ${themeClasses.text}`}>{title}</h2>
            <p className={`text-sm ${themeClasses.secondaryText}`}>
              Last updated: {new Date(lastUpdated).toLocaleString()}
            </p>
          </div>
          
          {/* Date selector only for daily data with multiple dates */}
          {isDailyData && dates.length > 1 && (
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className={`text-sm rounded ${themeClasses.text} p-1 ${themeClasses.bg} ${themeClasses.border} border`}
            >
              {dates.map(date => (
                <option key={date} value={date} className={`text-sm font-bold ${themeClasses.text}`}>
                 {date ? formatDisplayDate(date) : ''}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      
      <div className="divide-y">
        {filteredData
          .sort((a, b) => a.rank - b.rank)
          .map((item) => (
            <div key={isDailyData ? `${item.date}-${item.rank}` : item.rank} 
                 className="p-4 hover:bg-opacity-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className={`w-6 text-center font-bold ${themeClasses.text}`}>{item.rank}</span>
                  <Link 
                    to={item.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-medium hover:underline ${themeClasses.text}`}
                  >
                    {item.title}
                  </Link>
                </div>
                <div className="text-right">
                  <span className={`font-mono ${themeClasses.text}`}>
                    {formatMoney(item.dailyGross || item.gross)}
                  </span>
                  {isDailyData && item.daysInRelease && (
                    <div className={`text-xs ${themeClasses.secondaryText}`}>
                      Day {item.daysInRelease}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}