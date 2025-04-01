import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../components/SearchMovies";
import css from "./MovieReviews.module.css"

export default function  MovieReviews() {
  const { movieId } = useParams();
  const [reviews, SetReviews] = useState([]);
  useEffect(() => {
    async function getReviews() {
      try {
        const data = await fetchMovieReviews(movieId);
        SetReviews(data);
      } catch (error) {}
    }
    getReviews();
  }, [movieId]);

return (
  <div className={css.wrap}>
        {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p className={css.pka}>"We don't have any reviews for this movie"</p>
      )}
  </div>
);
}
