// src/types.ts
export interface Movie {
    title: string; // Changed from Title to title
    year: string; // Changed from Year to year
    id: number; // Changed from imdbID to id (TMDB uses id)
    type: string; // This may not be necessary if not used
    poster_path: string; // This is correct
    rating?: number; // This may not be necessary if not used
    overview?: string; // This is correct
    imdbID: string;
   
}

export interface MovieDetails extends Movie {
    adult: boolean; // Added based on the API response
    backdrop_path: string; // Added based on the API response
    budget: number; // Added based on the API response
    genres: { id: number; name: string }[]; // Changed Genre to genres
    homepage: string; // Added based on the API response
    original_language: string; // Added based on the API response
    original_title: string; // Added based on the API response
    release_date: string; // Added based on the API response
    revenue: number; // Added based on the API response
    runtime: number; // Added based on the API response
    spoken_languages: { english_name: string; iso_639_1: string; name: string }[]; // Added based on the API response
    status: string; // Added based on the API response
    tagline: string; // Added based on the API response
    vote_average: number; // Changed from imdbRating to vote_average
    vote_count: number; // Added based on the API response
    credits: {
        cast: {
            id: number;
            name: string;
            character: string;
            profile_path: string;
        }[];
        crew: {
            id: number;
            name: string;
            job: string;
            profile_path: string;
        }[];
    }; // Added based on the API response
    // Add any other properties you need based on the API response
    Ratings: {
        Source: string;
        Value: string;
      }[];
      Metascore: string;
      imdbRating: string;
      imdbVotes: string;
      DVD?: string;
      BoxOffice?: string;
      Production?: string;
      Website?: string;
      Response: string;
      imdbID: string;
}


// src/types/search.ts
export type SearchResult = {
    type: 'movie' | 'tv';
    id: number;
    title: string;
    poster_path: string | null;
    release_date: string;
    vote_average: number;
    overview: string;
  };

export type Theme = "light" | "dark";