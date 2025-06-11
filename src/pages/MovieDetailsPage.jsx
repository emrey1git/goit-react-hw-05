import { useEffect, useState, useRef } from 'react';
import { useParams, useLocation, Link, NavLink, Outlet } from 'react-router-dom';
import { getMovieDetails } from '../api/tmdb';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/movies');

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError('Movie details could not be obtained.',err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);
  

  if (isLoading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  return (
    <div>
      <Link to={backLinkRef.current}>← Go back</Link>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Release date: {movie.release_date}</p>
      <p>User score: {movie.vote_average}</p>

      <hr />

      <nav className="nav-sub">
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </nav>

      <hr />

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
