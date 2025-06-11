import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../api/tmdb';
import MovieList from '../components/MovieList';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (err) {
        setError('Film araması sırasında hata oluştu.', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.elements.query.value.trim();
    if (searchQuery) {
      setSearchParams({ query: searchQuery });
    } else {
      setSearchParams({});
      setMovies([]);
    }
  };

  return (
    <div className='moviespage-container'>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
  <input 
    className="search-input"
    name="query" 
    type="text" 
    defaultValue={query} 
    placeholder="Search movies..." 
  />
  <button className='movies-page-button' type="submit">Search</button>
</form>


      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
