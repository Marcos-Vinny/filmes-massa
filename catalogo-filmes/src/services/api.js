import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

const api = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY, language: 'pt-BR' },
});

export const getPopularMovies = () => api.get('/movie/popular');
export const getMovieDetails = (id) => api.get(`/movie/${id}`);

// Função pura e isolada: fácil de testar sem precisar chamar a API de verdade.
export const getPosterUrl = (posterPath) => {
  if (!posterPath) return null;
  return `${IMAGE_BASE_URL}${posterPath}`;
};

export default api;
