import css from "./MovieInfo.module.css";

export default function MovieInfo({ movie }) {
  const moviePosterUrl = "https://image.tmdb.org/t/p/w500";
  const defaultImg =
    "<https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg>";

  return (
    <div className={css.wrap} >
      <img 
        src={
          movie.poster_path
            ? `${moviePosterUrl}${movie.poster_path}`
            : defaultImg
        }
        alt={movie.title}
      />

      <div>
        <h1>{movie.title}</h1>
        <b style={{fontSize: "22px"}}>User score : {`${(movie.vote_average * 10).toFixed(0)}%`}</b>
        <p>Overview : {movie.overview}</p>
        <p>Genres: {movie.genres.map((genre) => genre.name).join(", ")}</p>
      </div>
    </div>
  );
}