// src/hooks/useTmdbMovies.ts
import { useState, useEffect,useCallback } from 'react';
import { fetchPopularMovies,fetchNowPlayingMovies,fetchUpcomingMovies,fetchMovieDetails, mapTmdbToMovie } from '../api/tmdb';

export const useTmdbMovies = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        // Fetch both popular and upcoming movies in parallel
        const [popularResponse, upcomingResponse, nowPlayingResponse, movieDetailsResponse] = await Promise.all([
          fetchPopularMovies(),
          fetchUpcomingMovies(),
          fetchNowPlayingMovies(),
        
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

    fetchMovies();
  }, []);

  
  // Function to fetch movie details by ID
  const fetchMovieDetailsById = useCallback(async (movieId: number) => {
    try {
      setLoading(true);
      const response = await fetchMovieDetails(movieId);
      setMovieDetails(mapTmdbToMovie(response));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch movie details');
    } finally {
      setLoading(false);
    }
  }, []);

  return { popularMovies, upcomingMovies, nowPlayingMovies,fetchMovieDetailsById,movieDetails,loading, error };
};