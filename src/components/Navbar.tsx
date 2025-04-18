import { Link, useLocation } from 'react-router-dom';
import { FilmIcon, StarIcon, MoonIcon, SunIcon, SearchIcon, HomeIcon, BookmarkIcon, TvIcon } from '../components/Icons';
import { getFlagEmoji, getLanguageName } from '../utils/languageUtils';
import LoadingSpinner from './LoadingSpinner';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export default function Navbar({ theme, toggleTheme }: NavbarProps) {
  const { language, setLanguage, isDetectingLocation } = useLanguage();
  const location = useLocation();
  
  // Check if current route is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md ${theme === 'dark' ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'} border-b`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'} group-hover:bg-blue-400 transition-colors`}>
              <FilmIcon className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              CineVerse
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink 
              to="/" 
              active={isActive('/')}
              theme={theme}
              icon={<HomeIcon className="w-5 h-5" />}
              label="Home"
            />
            <NavLink 
              to="/movies" 
              active={isActive('/movies')}
              theme={theme}
              icon={<FilmIcon className="w-5 h-5" />}
              label="Movies"
            />
            <NavLink 
              to="/tv" 
              active={isActive('/tv')}
              theme={theme}
              icon={<TvIcon className="w-5 h-5" />}
              label="TV Shows"
            />
            <NavLink 
              to="/favorites" 
              active={isActive('/favorites')}
              theme={theme}
              icon={<BookmarkIcon className="w-5 h-5" />}
              label="Favorites"
            />
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
             {/* Language Switcher */}
             <div className="relative">
              {isDetectingLocation ? (
                <div className="px-3 py-1">
                  <LoadingSpinner size="sm" />
                </div>
              ) : (
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className={`appearance-none bg-transparent border ${
                    theme === 'dark' ? 'border-gray-600 text-white' : 'border-gray-300 text-gray-800'
                  } rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="en">{getFlagEmoji('en')} English</option>
                  <option value="es">{getFlagEmoji('es')} Español</option>
                </select>
              )}
            </div>

            <Link 
              to="/search" 
              className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              aria-label="Search"
            >
              <SearchIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`} />
            </Link>
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors`}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <MoonIcon className="w-5 h-5 text-gray-600" />
              ) : (
                <SunIcon className="w-5 h-5 text-yellow-300" />
              )}
            </button>
            
            {/* User Avatar - Replace with your auth component */}
            <div className={`p-1 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                U
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Reusable NavLink Component
interface NavLinkProps {
  to: string;
  active: boolean;
  theme: 'light' | 'dark';
  icon: React.ReactNode;
  label: string;
}

function NavLink({ to, active, theme, icon, label }: NavLinkProps) {
  return (
    <Link
      to={to}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active
          ? theme === 'dark'
            ? 'bg-blue-600 text-white'
            : 'bg-blue-100 text-blue-700'
          : theme === 'dark'
          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </Link>
  );
}