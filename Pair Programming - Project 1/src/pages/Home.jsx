import { useState, useEffect } from 'react';
import { tmdbApis } from '../apis/tmdb';
import MovieGrid from '../components/MovieGrid';
import { Debounce } from '../hooks/Debounce';

const Home = ({ searchQuery }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    genre: '',
    year: '',
    sortBy: 'popularity.desc',
    minRating: 0,
  });

  const debouncedSearchQuery = Debounce(searchQuery, 300);

  useEffect(() => {
    const fetchMovieSections = async () => {
      setLoading(true);
      try {
        const [trendingResponse, popularResponse, latestResponse] = await Promise.all([
          tmdbApis.getTrending(),
          tmdbApis.getPopular(),
          tmdbApis.getNowPlaying()
        ]);

        setTrendingMovies(trendingResponse.results.slice(0, 8));
        setPopularMovies(popularResponse.results.slice(0, 8));
        setLatestMovies(latestResponse.results.slice(0, 8));
      } catch (error) {
        console.error('Error fetching movie sections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieSections();
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!debouncedSearchQuery) {
        setSearchResults([]);
        return;
      }

      setSearchLoading(true);
      try {
        const response = await tmdbApis.searchMovies(debouncedSearchQuery, 1);
        setSearchResults(response.results);
        setTotalPages(response.total_pages);
        setPage(1);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setSearchLoading(false);
      }
    };

    fetchSearchResults();
  }, [debouncedSearchQuery]);

  const loadMoreSearchResults = async () => {
    if (page >= totalPages || !debouncedSearchQuery) return;

    setSearchLoading(true);
    try {
      const nextPage = page + 1;
      const response = await tmdbApis.searchMovies(debouncedSearchQuery, nextPage);
      setSearchResults(prev => [...prev, ...response.results]);
      setPage(nextPage);
    } catch (error) {
      console.error('Error loading more search results:', error);
    } finally {
      setSearchLoading(false);
    }
  };

  if (debouncedSearchQuery) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Search Results for "{debouncedSearchQuery}"
          </h1>
        </div>

        <MovieGrid movies={searchResults} loading={searchLoading && searchResults.length === 0} />

        {searchResults.length > 0 && page < totalPages && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMoreSearchResults}
              disabled={searchLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              {searchLoading ? <h1>loading...</h1> : null}
              <span>{searchLoading ? 'Loading...' : 'Load More'}</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Show main sections when not searching
  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-slate-900">


      {/* <FilterBar filters={filters} onFilterChange={handleFilterChange} /> */}

      {loading ? (
        <div className="flex items-center h-screen justify-center py-12">
          <h1 className="text-gray-500 dark:text-gray-400 text-lg">Loading...</h1>
        </div>
      ) : (
        <div className="space-y-12">
          {/* Trending Movies Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Trending Movies
              </h2>
           
            </div>
            <MovieGrid movies={trendingMovies} />
          </section>

          {/* Popular Movies Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Popular Movies
              </h2>
             
            </div>
            <MovieGrid movies={popularMovies} />
          </section>

          {/* Latest Movies Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Latest Movies
              </h2>
            
            </div>
            <MovieGrid movies={latestMovies} />
          </section>
        </div>
      )}
    </div>
  );
};

export default Home;