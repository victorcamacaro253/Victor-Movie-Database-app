import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import MovieDetailsPage from './pages/MovieDetails';
import FavoritesPage from './pages/Favorites';
import { Theme } from './types/movie';
import ActorDetailsPage from './pages/ActorDetails';
import TVShowDetailsPage from './pages/TVShowDetails';
import Footer from './components/Footer';
import MoviePage from './pages/MoviePage';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <LanguageProvider>
      
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/actor/:id" element={<ActorDetailsPage />} /> {/* Add the route for ActorDetailsPage */}
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/tv/:id" element={<TVShowDetailsPage />} /> {/* Add the route for TVShowDetailsPage */}
            <Route path="/movies" element={<MoviePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;