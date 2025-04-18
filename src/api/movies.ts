// src/api.ts
import { Movie, MovieDetails } from "../types/movie";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (query: string, page: number = 1): Promise<{ movies: Movie[]; totalResults: number }> => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}&page=${page}`);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return { movies: data.Search || [], totalResults: parseInt(data.totalResults) || 0 };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { movies: [], totalResults: 0 };
  }
};

export const getMovieDetails = async (id: string): Promise<MovieDetails | null> => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
    if (!response.ok) throw new Error("Network error");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};