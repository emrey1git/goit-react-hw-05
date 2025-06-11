import axios from 'axios';

const API_KEY = '05d76bf8444f1af0e351c2419ea8045e';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWQ3NmJmODQ0NGYxYWYwZTM1MWMyNDE5ZWE4MDQ1ZSIsIm5iZiI6MTc0MzYyNjA2NS45NTksInN1YiI6IjY3ZWQ5ZjUxY2U2NDc2ZWI2MmZlYjdlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.guoV5z_zPwvt5YK4HqM18_DY89FSf4PBc2MF9votTTQ`,
    accept: 'application/json',
  },
});

// 🔹 Trend olan filmleri getir
export const getTrendingMovies = async () => {
  const response = await tmdb.get('/trending/movie/day');
  return response.data.results;
};

// 🔹 Anahtar kelime ile film ara
export const searchMovies = async (query) => {
  const response = await tmdb.get(`/search/movie`, {
    params: {
      query,
    },
  });
  return response.data.results;
};

// 🔹 Film detaylarını al
export const getMovieDetails = async (movieId) => {
  const response = await tmdb.get(`/movie/${movieId}`);
  return response.data;
};

// 🔹 Film kadrosunu al
export const getMovieCredits = async (movieId) => {
  const response = await tmdb.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

// 🔹 Film yorumlarını al
export const getMovieReviews = async (movieId) => {
  const response = await tmdb.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
