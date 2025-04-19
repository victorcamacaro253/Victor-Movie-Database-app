import { Movie, SearchResult,MovieFinancials, MovieDetails } from '../types/movie'; // Adjust the import path as necessary
import { ActorDetails, MovieCredit, TvCredit } from '../types/actors';
import { TVShow, TVShowDetails } from '../types/tv';




// src/api/tmdb.ts
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY; // Replace with your actual key
const BASE_URL = "https://api.themoviedb.org/3";


interface TmdbMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  // Add other fields you might need
}

export interface TVShowResponse {
  page: number;
  results: TVShow[];
  total_pages: number;
  total_results: number;
}

export interface TmdbResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}

export const fetchPopularMovies = async (page: number = 1, language: string = 'en-US'): Promise<TmdbResponse> => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch popular movies');
  }
  return await response.json();
};

export const fetchUpcomingMovies = async (page:number = 1, language: string = 'en-US'): Promise<TmdbResponse> => {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch upcoming movies');
  }
  return await response.json();
};


export const fetchTopRatedMovies = async (page: number = 1, language: string = 'en-US'): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
       
      return await response.json();
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw error;
    }
  };

  export const fetchNowPlayingMovies = async (page: number = 1,language: string = 'en-US'): Promise<TmdbResponse> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching now playing movies:', error);
      throw error;
    }
  };

  export const searchMovies = async (query: string, page: number = 1,language: string = 'en-US'): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=${language}&query=${encodeURIComponent(query)}&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
     
      return  await response.json();
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  };

  // src/api/tmdb.ts
export const searchMulti = async (query: string): Promise<SearchResult[]> => {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    
    return data.results.map((item: any) => {
      if (item.media_type === 'movie') {
        return {
          type: 'movie',
          id: item.id,
          title: item.title,
          poster_path: item.poster_path,
          release_date: item.release_date,
          vote_average: item.vote_average,
          overview: item.overview
        };
      } else if (item.media_type === 'tv') {
        return {
          type: 'tv',
          id: item.id,
          title: item.name,
          poster_path: item.poster_path,
          release_date: item.first_air_date,
          vote_average: item.vote_average,
          overview: item.overview
        };
      }
      return null;
    }).filter(Boolean);
  };

  /*
  export const fetchMovieDetails = async (movieId: number,language: string = 'en-US'): Promise<Movie> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=${language}&append_to_response=credits,videos`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
     
      return  await response.json();
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }; */

  // Add or update this function in your tmdb.ts file
export const fetchMovieDetails = async (id: number, language: string = 'en-US'): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=${language}&append_to_response=credits,videos,similar`
    );
    
    if (!response.ok) {
      throw new Error('Movie not found');
    }
    
    const data = await response.json();
    
    // Transform the API response to match your MovieDetails interface
    return {
      ...data,
      Title: data.title,
      Year: data.release_date ? data.release_date.substring(0, 4) : '',
      Type: 'movie',
      Poster: data.poster_path ? `https://image.tmdb.org/t/p/w500${data.poster_path}` : '',
      imdbID: data.imdb_id || '',
      Response: 'True',
      Ratings: data.vote_average ? [{ Source: 'TMDB', Value: `${data.vote_average}/10` }] : [],
      Metascore: '',
      imdbRating: data.vote_average ? (data.vote_average).toString() : '',
      imdbVotes: data.vote_count ? data.vote_count.toString() : '',
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};


  export const fetchSimilarMovies = async (movieId: number, page: number = 1): Promise<Movie[]> => {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.results.map(mapTmdbToMovie);
    } catch (error) {
      console.error('Error fetching similar movies:', error);
      throw error;
    }
  };


  // src/api/tmdb.ts
// src/api/tmdb.ts
export const fetchActorDetails = async (actorId: string): Promise<ActorDetails> => {
    try {
      const response = await fetch(
        `${BASE_URL}/person/${actorId}?api_key=${TMDB_API_KEY}&append_to_response=movie_credits,tv_credits,images`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch actor details: ${response.status}`);
      }
  
      const data = await response.json();
      
      // Process movie credits
      const filmography: MovieCredit[] = data.movie_credits?.cast?.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        release_date: movie.release_date || '',
        character: movie.character || '',
        vote_average: movie.vote_average || 0,
        media_type: 'movie'
      })) || [];
  
      // Process TV credits
      const tvCredits: TvCredit[] = data.tv_credits?.cast?.map((show: any) => ({
        id: show.id,
        name: show.name,
        poster_path: show.poster_path,
        first_air_date: show.first_air_date || '',
        character: show.character || '',
        vote_average: show.vote_average || 0,
        media_type: 'tv'
      })) || [];
  
      return {
        id: data.id,
        name: data.name,
        biography: data.biography || 'No biography available',
        profile_path: data.profile_path,
        birthday: data.birthday || null,
        deathday: data.deathday || null,
        place_of_birth: data.place_of_birth || null,
        known_for_department: data.known_for_department || 'Acting',
        filmography,
        tv_credits: tvCredits,
        images: data.images
      };
    } catch (error) {
      console.error('Error fetching actor details:', error);
      throw error;
    }
  };

  // src/api/tmdb.ts
  /*
export const fetchPopularTVShows = async (page = 1, apiLanguage: string): Promise<TVShow[]> => {
    const response = await fetch(
      `${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&page=${page}`
    );
    const data = await response.json();
    return data.results.map(mapTmdbToTVShow);
  }; */
  
  export const fetchTVShowDetails = async (id: number): Promise<TVShowDetails> => {
    const response = await fetch(
      `${BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,similar`
    );
    return await response.json();
  };


// New Function: Fetch Season Details
export const fetchSeasonDetails = async (
    tvId: number,
    seasonNumber: number
  ): Promise<any> => {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${TMDB_API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch season details");
    return await response.json();
  };

  // Optional: Fetch Episode Details
export const fetchEpisodeDetails = async (
    tvId: number,
    seasonNumber: number,
    episodeNumber: number
  ): Promise<any> => {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${TMDB_API_KEY}`
    );
    if (!response.ok) throw new Error("Failed to fetch episode details");
    return await response.json();
  };

  
export const fetchPopularTVShows = async (page: number = 1, language: string = 'en-US'): Promise<TVShowResponse> => {
  const response = await fetch(
    `${BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to fetch popular TV shows');
  return await response.json();
}; 

export const fetchTopRatedTVShows = async (page: number = 1, language: string = 'en-US'): Promise<TVShowResponse> => {
  const response = await fetch(
    `${BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to fetch top rated TV shows');
  return await response.json();
};

export const fetchTVShowsAiringToday = async (page: number = 1, language: string = 'en-US'): Promise<TVShowResponse> => {
  const response = await fetch(
    `${BASE_URL}/tv/airing_today?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to fetch TV shows airing today');
  return await response.json();
};

export const fetchTVShowsOnTheAir = async (page: number = 1, language: string = 'en-US'): Promise<TVShowResponse> => {
  const response = await fetch(
    `${BASE_URL}/tv/on_the_air?api_key=${TMDB_API_KEY}&language=${language}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to fetch TV shows on the air');
  return await response.json();
};


// Helper function to convert TMDb movie to your existing Movie type
export const mapTmdbToMovie = (tmdbMovie: TmdbMovie): Movie => ({
  id: tmdbMovie.id,
  Title: tmdbMovie.title,
  Year: tmdbMovie.release_date?.split('-')[0] || 'N/A',
  imdbID: tmdbMovie.id.toString(),
  Type: 'movie',
  Poster: tmdbMovie.poster_path
    ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Poster',
 
  vote_average: 0,
  release_date: tmdbMovie.release_date,
});

/*
const mapTmdbToTVShow = (tvShow: any): TVShow => ({
    id: tvShow.id,
    name: tvShow.name,
    overview: tvShow.overview,
    poster_path: tvShow.poster_path,
    backdrop_path: tvShow.backdrop_path,
    first_air_date: tvShow.first_air_date,
    vote_average: tvShow.vote_average,
    vote_count: tvShow.vote_count,
    popularity: tvShow.popularity,
    genre_ids: tvShow.genre_ids || [],
    origin_country: tvShow.origin_country || [],
    original_language: tvShow.original_language,
    original_name: tvShow.original_name,
  });
  */

// src/api/tmdb.ts
export const getMovieFinancials = async (movieId: number): Promise<MovieFinancials> => {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=release_dates`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch movie financials');
    }
    const data = await response.json();
    
    return {
      budget: data.budget,
      revenue: data.revenue,
      currency: 'USD', // TMDb reports in USD
      releaseDate: data.release_date,
      // Other financial data you might want
    };
  };