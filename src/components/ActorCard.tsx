import React from 'react';
import { Link } from 'react-router-dom';
import { ActorCardProps } from '../types/actors';

const ActorCard: React.FC<ActorCardProps> = ({ actor, theme }) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";

  return (
    <Link 
      to={`/actor/${actor.id}`} 
      className={`flex flex-col items-center group rounded-lg p-2 shadow-md hover:shadow-lg transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="relative overflow-hidden rounded-lg w-full aspect-[2/3]">
        <img
          src={actor.profile_path ? `${imageBaseUrl}${actor.profile_path}` : "https://via.placeholder.com/500x750?text=No+Image"}
          alt={actor.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x750?text=No+Image';
          }}
        />
      </div>
      <p className={`mt-2 text-center font-medium ${
        theme === 'dark' ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
      } transition-colors duration-300 truncate w-full px-1`}>
        {actor.name}
      </p>
    </Link>
  );
};

export default ActorCard;