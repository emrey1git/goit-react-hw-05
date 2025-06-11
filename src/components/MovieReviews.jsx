import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMovieReviews } from '../api/tmdb';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError('Comments could not be received.',err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (reviews.length === 0) return <p>Comments not found.</p>;

  return (
    <ul>
      {reviews.map((review) => (
        <li key={review.id}>
          <p><strong>{review.author}:</strong> {review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
