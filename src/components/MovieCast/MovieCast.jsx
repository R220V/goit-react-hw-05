import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../SearchMovies";
import { useEffect, useState } from "react";

import css from "./MovieCast.module.css";

export default function MovieCast() {
  
  const { movieId } = useParams();
  const [castMovie, setCastMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCastMovie = async () => {
      setIsLoading(true);
      try {
        const data = await fetchMovieCast(movieId);
        setCastMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    getCastMovie();
  }, [movieId]);

  return (
    <div className={css.wrap}>
      {isLoading && <b>Loading...</b>}
      {error && <b>{error}</b>}
      <div className={css.block}>
        {castMovie.length > 0 ? (
          castMovie.map((actor) => (
            <div key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
                width={250}
              />
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </div>
          ))
        ) : (
          <p className={css.pka}>"No cast information available..."</p>
        )}
      </div>
    </div>
  );
}