import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieCredits } from '../api/tmdb';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch (err) {
        setError('Oyuncular alınamadı.',err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (cast.length === 0) return <p>No player information found.</p>;

  return (
    <ul>
      {cast.map((actor) => (
        <li key={actor.cast_id}>
          <p>{actor.name} as {actor.character}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
