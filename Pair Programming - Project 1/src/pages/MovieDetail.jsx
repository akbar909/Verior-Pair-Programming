import {
  ArrowLeft,
  Bookmark,
  Calendar,
  Clock,
  Heart,
  Star,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getImageUrl, tmdbApis } from '../apis/tmdb';
import MovieGrid from '../components/MovieGrid';
import { useFavorites } from '../context/Favorites&Wishlist';
const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [videos, setVideos] = useState([]);
  const [credits, setCredits] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToFavorites, removeFromFavorites, addToWatchlist, removeFromWatchlist, isFavorite, isInWatchlist } = useFavorites();

  useEffect(() => {
    const fetchMovieData = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const movieId = parseInt(id);
        
        const [movieResponse] = await Promise.all([
          tmdbApis.getMovieDetails(movieId),
         
        ]);
        setMovie(movieResponse);
      } catch (err) {
        setError('Failed to load movie details');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleFavoriteClick = () => {
    if (!movie) return;
    
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleWatchlistClick = () => {
    if (!movie) return;
    
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-900">
        <div className="text-center">
          <h1 className="text-gray-600 dark:text-gray-400 text-lg">
            Loading movie details...
          </h1>
        </div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">{error || 'Movie not found'}</p>
          <Link to="/" className="text-blue-600 hover:text-blue-700">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
  const posterUrl = getImageUrl(movie.poster_path, 'w780');

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="mt-4 flex flex-col items-center justify-center text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              {movie.title}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-4 mt-2 text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(movie.release_date).getFullYear()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{formatRuntime(movie.runtime)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Poster Section */}
          <div className="flex justify-center mb-12">
            <div className="relative">
              {posterUrl ? (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-2xl">
                  <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-80 md:w-96 rounded-lg shadow-lg"
                  />
                </div>
              ) : (
                <div className="w-80 md:w-96 aspect-[2/3] bg-gray-200 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No Poster</span>
                </div>
              )}
            </div>
          </div>

          {/* Movie Info */}
          <div className="text-center mb-12">
            {movie.tagline && (
              <p className="text-lg text-gray-600 dark:text-gray-400 italic mb-6">
                "{movie.tagline}"
              </p>
            )}

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm font-medium"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
                {movie.overview}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={handleFavoriteClick}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  isFavorite(movie.id)
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Heart className={`h-4 w-4 ${isFavorite(movie.id) ? 'fill-current' : ''}`} />
                <span>{isFavorite(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}</span>
              </button>
              
              <button
                onClick={handleWatchlistClick}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  isInWatchlist(movie.id)
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${isInWatchlist(movie.id) ? 'fill-current' : ''}`} />
                <span>{isInWatchlist(movie.id) ? 'Remove from Watchlist' : 'Add to Watchlist'}</span>
              </button>

           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;