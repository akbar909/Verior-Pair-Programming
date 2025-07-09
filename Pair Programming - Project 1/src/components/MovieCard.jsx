import { Bookmark, Calendar, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '../apis/tmdb';
import { useFavorites } from '../context/Favorites&Wishlist';

const MovieCard = ({ movie, showActions = true }) => {
  const { addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist, isFavorite, isInWatchlist } = useFavorites();

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleWatchlistClick = (e) => {
    e.preventDefault();
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  const posterUrl = getImageUrl(movie.poster_path);

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl  duration-300 h-full">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-slate-700 flex items-center justify-center" style={{ maxHeight: '180px', minHeight: '180px', minWidth: '120px', maxWidth: '120px' }}>
              <span className="text-gray-400 dark:text-gray-500">No Image</span>
            </div>
          )}
      
          <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-white text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
          </div>
          {showActions && (
            <div className="absolute top-2 left-2 flex flex-col space-y-2">
              <button
                onClick={handleFavoriteClick}
                className="p-2 bg-white dark:bg-slate-800 text-black dark:text-white  rounded-full "
              >
                {isFavorite(movie.id) ? (
                  <Heart className="h-4 w-4 text-red-500 fill-current" />
                ) : (
                  <Heart className="h-4 w-4 text-gray-500" />
                )}
              </button>
              <button
                onClick={handleWatchlistClick}
                className="p-2 bg-white dark:bg-slate-800 text-black dark:text-white rounded-full  "
              >
                {isInWatchlist(movie.id) ? (
                  <Bookmark className="h-4 w-4 text-blue-500 fill-current" />
                ) : (
                  <Bookmark className="h-4 w-4 text text-gray-500" />
                )}
              </button>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400  text-sm md:text-base">
            {movie.title}
          </h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
            <Calendar className="h-3 w-3 mr-1" />
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 line-clamp-3 flex-1">
            {movie.overview}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;