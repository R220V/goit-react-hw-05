import { useEffect, useState } from "react";
// import { fetchMovies } from "../components/SearchMovies";
import MovieList from "../components/MovieList/MovieList";
import { fetchSearchMovies } from "../components/SearchMovies";
import Search from "../components/SearchM/SearchM";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [debouncedQuery] = useDebounce(query, 1000);

  const handleSubmit = (value) => {
    setSearchParams({ query: value });
  };

  useEffect(() => {
    if (query) {
      async function getMovies() {
        try {
          setIsLoading(true);
          setError(false);
          const data = await fetchSearchMovies(query);
          setMovies(data);
        } catch {
          setError(true);
        } finally {
          setIsLoading(false);
        }
      }

      getMovies();
    } else {
      setMovies([]);
    }
  }, [query]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      {error && <b>Whoops, reload your page...</b>}
      <Search onSubmit={handleSubmit} />
      {filteredMovies.length > 0 && <MovieList movies={filteredMovies} />}
      {isLoading && <b>Loading movies...</b>}
      {debouncedQuery && filteredMovies.length === 0 && <p>Movies not found...</p>}
    </div>
  );
}