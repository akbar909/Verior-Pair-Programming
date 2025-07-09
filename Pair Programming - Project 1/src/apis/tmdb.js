import axios from "axios";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
console.log("Using TMDB API Key:", API_KEY);
const tmdbApi = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY
    }
});

export const tmdbApis = {
    getTrending: () => {
        return tmdbApi.get('/trending/movie/week').then(res => res.data);
    },
    getNowPlaying: (page = 1) => {
        return tmdbApi.get('/movie/now_playing', { params: { page } }).then(res => res.data);
    },

    getPopular: (page = 1) => {
        return tmdbApi.get('/movie/popular', { params: { page } }).then(res => res.data);
    },
    getTopRated: (page = 1) => {
        return tmdbApi.get('/movie/top_rated', { params: { page } }).then(res => res.data);
    },
    getUpcoming: (page = 1) => {
        return tmdbApi.get('/movie/upcoming', { params: { page } }).then(res => res.data);
    },
    getMovieDetails: (movieId) => {
        return tmdbApi.get(`/movie/${movieId}`).then(res => res.data);
    },
    searchMovies: (query, page = 1) => {
        return tmdbApi.get('/search/movie', { params: { query, page } }).then(res => res.data);
    },
    getMovieDetails: (movieId) => {
        return tmdbApi.get(`/movie/${movieId}`).then(res => res.data);
    },
    getRecommendations: (movieId) => {
        return tmdbApi.get(`/movie/${movieId}/recommendations`).then(res => res.data);
    },
    getGenres: () => {
        return tmdbApi.get('/genre/movie/list').then(res => res.data);
    },
    discoverMovies: (filters) => {
        const params = {
            page: filters.page || 1,
            sort_by: filters.sortBy || 'popularity.desc',
        }
        if (filters.genre) {
            params.with_genres = filters.genre;
        }
        return tmdbApi.get('/discover/movie', { params }).then(res => res.data);
    },
};

export const getImageUrl = (path, size = 'w500') => {
    return `${IMAGE_BASE_URL}/${size}${path}`;
}
