// src/components/ActorCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ActorCardProps } from '../types/actors';

const ActorCard: React.FC<ActorCardProps> = ({ actor }) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500"; // Adjust as needed

  return (
    <Link to={`/actor/${actor.id}`} className="flex flex-col items-center">
      <img
        src={actor.profile_path ? `${imageBaseUrl}${actor.profile_path}` : "https://via.placeholder.com/150?text=No+Image"}
        alt={actor.name}
        className="w-24 h-36 object-cover rounded-lg"
      />
      <p className="mt-2 text-center">{actor.name}</p>
    </Link>
  );
};

export default ActorCard;