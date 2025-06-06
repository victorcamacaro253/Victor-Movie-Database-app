import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Home';
import MovieDetailsPage from './pages/MovieDetails';
import NewsPage from './pages/NewsPage';
import FavoritesPage from './pages/Favorites';
import ActorDetailsPage from './pages/ActorDetails';
import TVShowDetailsPage from './pages/TVShowDetails';
import Footer from './components/Footer';
import MoviePage from './pages/MoviePage';
import TVPage from './pages/TVShowPage';
import TopMoviesPage from './pages/TopMoviesPage';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {children}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <ThemeProvider>
          <ThemeWrapper>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
                <Route path="/actor/:id" element={<ActorDetailsPage />} />
                <Route path="/favorites" element={<FavoritesPage />} />
                <Route path="/tv" element={<TVPage />} />
                <Route path="/tv/:id" element={<TVShowDetailsPage />} />
                <Route path="/movies" element={<MoviePage />} />
                <Route path="/top-movies" element={<TopMoviesPage />} />
                <Route path="/news" element={<NewsPage />} />
                {/* Add more routes as needed */}
              </Routes>
            </main>
            <Footer />
          </ThemeWrapper>
        </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;