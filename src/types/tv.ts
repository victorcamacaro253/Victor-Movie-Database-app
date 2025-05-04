

export interface TVShow {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    first_air_date: string;
    vote_average: number;
    backdrop_path:string;
    vote_count: number;
    popularity: number;
    original_language: string;
    original_name: string;
    genre_ids: number[];
    
    origin_country: string[];
  }
  
  export interface TVShowDetails extends TVShow {
    backdrop_path: any;
    genres: {
      id: number;
      name: string;
    }[];
    episode_run_time: number[];
    number_of_episodes: number;
    number_of_seasons: number;
    seasons: {
      id: number;
      name: string;
      overview: string;
      poster_path: string | null;
      season_number: number;
      air_date: string;
      episode_count: number;
    }[];
    status: string;
    tagline: string;
    credits: {
      cast: {
        id: number;
        name: string;
        character: string;
        profile_path: string | null;
      }[];
      crew: {
        id: number;
        name: string;
        job: string;
        profile_path: string | null;
      }[];
    };
    videos: {
      results: {
        id: string;
        key: string;
        name: string;
        site: string;
        type: string;
      }[];
    };
    similar: {
      results: TVShow[];
    };
    networks: {
      id: number;
      name: string;
      logo_path: string | null;
      origin_country: string;
    }[];
    created_by: {
      id: number;
      name: string;
      profile_path: string | null;
    }[];
    last_air_date: string;
    next_episode_to_air: {
      id: number;
      name: string;
      overview: string;
      air_date: string;
      episode_number: number;
      season_number: number;
    } | null;
    watch_providers?: {
      results: {
        [countryCode: string]: {
          link: string;
          flatrate?: Array<{
            display_priority: number;
            logo_path: string;
            provider_id: number;
            provider_name: string;
          }>;
          free?: Array<{  // Some shows might be on free platforms
            display_priority: number;
            logo_path: string;
            provider_id: number;
            provider_name: string;
          }>;
          buy?: Array<{
            display_priority: number;
            logo_path: string;
            provider_id: number;
            provider_name: string;
          }>;
        };
      };
    };
  }