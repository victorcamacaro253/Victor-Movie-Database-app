// src/types/actor.ts
export interface ActorCardProps {
    actor: {
      id: number;
      name: string;
      profile_path: string | null; // Make profile_path nullable
      
    };
    theme?: 'light' | 'dark'
  }
  
  export interface MovieCredit {
    id: number;
    title: string;
    poster_path: string | null; // Add poster_path
    release_date: string;
    character: string;
    vote_average: number;
    media_type: 'movie';
  }
  
  export interface TvCredit {
    id: number;
    name: string;
    poster_path: string | null; // Add poster_path
    first_air_date: string;
    character: string;
    vote_average: number;
    media_type: 'tv';
  }
  
  export interface ActorDetails {
    id: number;
    name: string;
    biography: string;
    profile_path: string | null;
    birthday: string | null;
    deathday: string | null;
    place_of_birth: string | null;
    known_for_department: string;
    filmography: MovieCredit[];
    tv_credits?: TvCredit[];
    images?: {
      profiles: {
        file_path: string;
      }[];
    };
  }