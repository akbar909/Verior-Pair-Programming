import React from 'react';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies, loading, title, showActions = true }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <h1 className="text-gray-500 dark:text-gray-400 text-lg">Loading...</h1>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-4 md:gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} showActions={showActions} />
        ))}
    </div>
  );
};

export default MovieGrid;