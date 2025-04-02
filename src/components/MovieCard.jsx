import React from 'react';

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) => {
  return (
    <div className="bg-black/40 rounded-2xl shadow-inner shadow-light-100/10 mb-2 p-1.5">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : '/image-not-found.jpg'
        }
        alt={title}
      />
      <p className="text-white">{title}</p>
      <div>
        <img src="/star-icon.svg" />
        <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
        <p>{original_language}</p>
        <p>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
      </div>
    </div>
  );
};

export default MovieCard;
