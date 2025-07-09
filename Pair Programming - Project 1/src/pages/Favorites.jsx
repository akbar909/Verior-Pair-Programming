import React from 'react';
import { Heart } from 'lucide-react';
import { useFavorites } from '../context/Favorites&Wishlist';
import MovieGrid from '../components/MovieGrid';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">
    
          My Favorites
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Movies you've marked as favorites
        </p>
      </div>

      {favorites.length === 0 ? (
          <h2 className="text-center py-12 text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No favorites yet
          </h2>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  );
};

export default Favorites;