import React from 'react';
import { Clock } from 'lucide-react';
import { useFavorites } from '../context/Favorites&Wishlist';
import MovieGrid from '../components/MovieGrid';

const Watchlist = () => {
  const { watchlist } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 flex items-center">

          My Watchlist
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Movies you want to watch later
        </p>
      </div>

      {watchlist.length === 0 ? (
          <h2 className=" text-center py-12 text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Your watchlist is empty
          </h2>
      ) : (
        <MovieGrid movies={watchlist} />
      )}
    </div>
  );
};

export default Watchlist;