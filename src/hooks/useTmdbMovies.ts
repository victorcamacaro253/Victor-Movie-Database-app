// src/hooks/useTmdbMovies.ts
import { useState, useEffect,useCallback } from 'react';
import { fetchPopularMovies,fetchNowPlayingMovies,fetchUpcomingMovies,fetchMovieDetails, mapTmdbToMovie } from '../api/tmdb';
import { useLanguage } from '../context/LanguageContext';
import { getApiLanguageCode } from '../utils/languageUtils';
import { Movie } from '../types/movie';

export const useTmdbMovies = () => {
  const { language } = useLanguage();
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  

  useEffect(() => {
    const fetchMovies = async (lang:string) => {
      try {
        setLoading(true);
        const apiLanguage = getApiLanguageCode(lang);
        
        // Fetch both popular and upcoming movies in parallel
        const [popularResponse, upcomingResponse, nowPlayingResponse] = await Promise.all([
          fetchPopularMovies(1, apiLanguage),
          fetchUpcomingMovies(1,apiLanguage),
          fetchNowPlayingMovies(1,apiLanguage),
        
        ]);

        setPopularMovies(popularResponse.results.map(mapTmdbToMovie));
        setUpcomingMovies(upcomingResponse.results.map(mapTmdbToMovie));
        setNowPlayingMovies(nowPlayingResponse.results.map(mapTmdbToMovie));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies(language);
  }, []);

  
  // Function to fetch movie details by ID
  const fetchMovieDetailsById = useCallback(async (movieId: number) => {
    try {
      setLoading(true);
      const response = await fetchMovieDetails(movieId);
      setMovieDetails(response);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  }, []);

  return { popularMovies, upcomingMovies, nowPlayingMovies,fetchMovieDetailsById,movieDetails,loading, error };
};