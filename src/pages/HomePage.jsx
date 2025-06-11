import { useState, useEffect } from 'react';
import { getTrendingMovies } from '../api/tmdb';
import MovieList from '../components/MovieList';
import Navigation from '../components/Navigation';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const fetchTrending = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const movies = await getTrendingMovies();
        setTrendingMovies(movies);
      } catch (err) {
        setError('An error occurred while loading movies.', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrending();
  }, []);
  

  return (
    <div className="homepage-container">
     
      <h1>Trending Today</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      
      {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
      
    </div>
  );
};

export default HomePage;
