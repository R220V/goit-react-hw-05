import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();

  if (movies.length === 0) {
    return <p>Movies not found</p>;
  }

  return (
    <ul className={css.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={css.item}>
          <Link to={`/movie/${movie.id}`} state={{ from: location }}>
            <p className={css.title}>{movie.title}</p>
            <img
              src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
              alt={movie.title}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}