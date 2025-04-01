import { useEffect, useState } from "react";
import { fetchMovies } from "../components/SearchMovies";
import MovieList from "../components/MovieList/MovieList";

export default function HomePage (){
	const [movies, setMovies]=useState([])
	const [isLoading, setIsLoading]=useState(false)
    const [error, setError] = useState(false)

	useEffect(() => {
		const getMovies = async () => {
			try {
				setError(false)
				setIsLoading(true)
				const data = await fetchMovies()
				setMovies(data)
			} catch {
				setError(err.message)
			}finally{
				setIsLoading (false)
			}	
		}
		getMovies()
	},[])

	return(
		<div>
			 <h1 style={{display: "flex", justifyContent:"center"
			 }}>Trending movies today</h1>
      {isLoading && <b>Loading...</b>}
      {error && <b>{error}</b>}
	  {movies.length > 0 && <MovieList movies={movies} />}
		</div>
	)
}