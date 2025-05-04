import { Link, NavLinkProps, useLocation } from 'react-router-dom';
import { FilmIcon, MoonIcon, SunIcon, SearchIcon, HomeIcon, BookmarkIcon, TvIcon, MenuIcon, XCloseIcon,NewsIcon } from '../components/Icons';
import { getFlagEmoji } from '../utils/languageUtils';
import { JSX, useState } from 'react'; // Add this import
import  {useTheme} from '../context/ThemeContext';

type Language = 'en' | 'es';
import LoadingSpinner from './LoadingSpinner';
import { useLanguage } from '../context/LanguageContext';



export default function Navbar() {
  const { language, setLanguage, isDetectingLocation,t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu
  const { theme, toggleTheme } = useTheme();
  
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-md ${theme === 'dark' ? 'bg-gray-900/80 border-gray-700' : 'bg-white/80 border-gray-200'} border-b`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md mr-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <XCloseIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
              ) : (
                <MenuIcon className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`} />
              )}
            </button>
            
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
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink 
              to="/" 
              active={isActive('/')}
              theme={theme}
              icon={<HomeIcon className="w-5 h-5" />}
              label={t('home')}
            />
            <NavLink 
              to="/movies" 
              active={isActive('/movies')}
              theme={theme}
              icon={<FilmIcon className="w-5 h-5" />}
              label={t('movies')}
            />
            <NavLink 
              to="/tv" 
              active={isActive('/tv')}
              theme={theme}
              icon={<TvIcon className="w-5 h-5" />}
              label={t('tv.shows')}
            />
            <NavLink 
              to="/news" 
              active={isActive('/news')}
              theme={theme}
              icon={<NewsIcon className="w-5 h-5" />}
              label={t('News')}
            />
            <NavLink 
              to="/favorites" 
              active={isActive('/favorites')}
              theme={theme}
              icon={<BookmarkIcon className="w-5 h-5" />}
              label={t('favorites')}
            />
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher - Hidden on mobile to save space */}
            <div className="hidden sm:block relative">
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
                  <option value="en" className={`${theme === 'dark' ? 'text-black': 'text-black'}`}>{getFlagEmoji('en')} English</option>
                  <option value="es" className={`${theme === 'dark' ? 'text-black': 'text-black'}`}>{getFlagEmoji('es')} Español</option>
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
            
            {/* User Avatar */}
            <div className={`p-1 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                U
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Shows on small screens */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-3">
            <div className="flex flex-col space-y-1 mt-2">
              <MobileNavLink 
                to="/" 
                active={isActive('/')}
                theme={theme}
                icon={<HomeIcon className="w-5 h-5" />}
                label={t('home')}
                onClick={() => setMobileMenuOpen(false)}
              />
              <MobileNavLink 
                to="/movies" 
                active={isActive('/movies')}
                theme={theme}
                icon={<FilmIcon className="w-5 h-5" />}
                label={t('movies')}
                onClick={() => setMobileMenuOpen(false)}
              />
              <MobileNavLink 
                to="/tv" 
                active={isActive('/tv')}
                theme={theme}
                icon={<TvIcon className="w-5 h-5" />}
                label={t('tv.shows')}
                onClick={() => setMobileMenuOpen(false)}
              />
              <MobileNavLink 
                to="/news" 
                active={isActive('/news')}
                theme={theme}
                icon={<NewsIcon className="w-5 h-5" />}
                label={t('News')}
                onClick={() => setMobileMenuOpen(false)}
              />
               <MobileNavLink 
                to="/favorites" 
                active={isActive('/favorites')}
                theme={theme}
                icon={<BookmarkIcon className="w-5 h-5" />}
                label={t('favorites')}
                onClick={() => setMobileMenuOpen(false)}
              />
            </div>
            
            {/* Mobile Language Selector */}
            <div className="mt-3">
              {isDetectingLocation ? (
                <div className="px-3 py-2">
                  <LoadingSpinner size="sm" />
                </div>
              ) : (
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value as Language)}
                  className={`w-full appearance-none bg-transparent border ${
                    theme === 'dark' ? 'border-gray-600 text-white' : 'border-gray-300 text-gray-800'
                  } rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="en">{getFlagEmoji('en')} English</option>
                  <option value="es">{getFlagEmoji('es')} Español</option>
                </select>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Reusable NavLink Component (Desktop)
interface CustomNavLinkProps {
  to: string;
  active: boolean;
  theme: 'light' | 'dark';
  icon: JSX.Element;
  label: string;
}

function NavLink({ to, active, theme, icon, label }: CustomNavLinkProps) {
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

// Mobile NavLink Component
interface MobileNavLinkProps extends NavLinkProps {
  to: string;
  onClick: () => void;
  active: boolean; // Add the active property\
  theme: 'light' | 'dark'; // Add the theme property
  icon : JSX.Element; // Add the icon property
  label: string; // Add the label 
}

function MobileNavLink({ to, active, theme, icon, label, onClick }: MobileNavLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${
        active
          ? theme === 'dark'
            ? 'bg-blue-600 text-white'
            : 'bg-blue-100 text-blue-700'
          : theme === 'dark'
          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <span className="mr-3">{icon}</span>
      {label}
    </Link>
  );
}