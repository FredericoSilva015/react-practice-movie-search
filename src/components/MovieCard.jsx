import React from 'react';

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <li className="bg-black/70 rounded-2xl shadow-inner shadow-light-100/10 mb-2 max-w-3xs p-3 grid grid-rows-4">
      <img
        className="mb-2 min-h row-span-5"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : '/image-not-found.jpg'
        }
        alt={title}
      />
      <p className="text-white min-h-12 mb-2 flex flex-col justify-center ">
        {title}
      </p>
      <div className="flex ">
        <img className="w-6" src="/star-icon.svg" alt="star" />
        <p className="text-white">
          {vote_average ? vote_average.toFixed(1) : 'N/A'}
        </p>
        <p className="text-white">{original_language}</p>
        <p className="text-white">
          {release_date ? release_date.split('-')[0] : 'N/A'}
        </p>
      </div>
    </li>
  );
};

export default MovieCard;
