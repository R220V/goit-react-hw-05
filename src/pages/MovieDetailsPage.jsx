import {fetchMovieById, fetchMovieReviews, fetchMovieCast} from '.././components/SearchMovies.js'
import { Link, NavLink, Outlet, useParams, useLocation, useNavigate } from "react-router-dom"
import {useEffect, useState, useRef,Suspense, lazy} from 'react';
import css from "./MovieDetailsPage.module.css";

import MovieInfo from "../components/MovieInfo.jsx";

const MovieCast = lazy(() => import("../components/MovieCast/MovieCast.jsx"));
const MovieReviews = lazy(() => import("../components/MovieReviews/MovieReviews.jsx")
);

export default function MovieDetailsPage() {
	const { movieId } = useParams();
	const [movie, setMovie] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const backLinkRef = useRef(location.state?.from || "/movie");
	const [cast, setCast] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [showCast, setShowCast] = useState(false);
	const [showReviews, setShowReviews] = useState(false);
  
	useEffect(() => {
	  async function getMovie() {
		try {
		  setIsLoading(true);
		  setError(false);
		  const data = await fetchMovieById(movieId);
		  setMovie(data);
		} catch (error) {
		  setError(true);
		} finally {
		  setIsLoading(false);
		}
	  }
  
	  getMovie();
	  if (movieId) {
		getMovie();
	  }
	}, [movieId]);
  
	const handleCastClick = async () => {
	  if (!showCast) {
		try {
		  const castData = await fetchMovieCast(movieId);
		  setCast(castData);
		} catch (error) {
		  console.error("Error fetching cast:", error);
		}
	  }
	  setShowCast(!showCast);
	};
  
	const handleReviewsClick = async () => {
	  if (!showReviews) {
		try {
		  const reviewsData = await fetchMovieReviews(movieId);
		  setReviews(reviewsData);
		} catch (error) {
		  console.error("Error fetching reviews:", error);
		}
	  }
	  setShowReviews(!showReviews);
	};
  
	if (!movie) return <b>Movie not found...</b>;
  
	return (
	  <div>
		   {/* <Link to={backLinkRef.current}>Go Back</Link> */}
		<button
		  className={css.back}
		  onClick={() => navigate(location.state?.from ?? "/")}
		>
		  ← Go Back
		</button>
  
		{isLoading && <b>Loading...</b>}
		{error && <b>Error...</b>}
  
		{movie && <MovieInfo movie={movie} />}
  
		<div className={css.info}>
		  <p>Additional information</p>
		  <ul>
			<li>
			  <Link to="cast">Cast</Link>
			</li>
			<li>
			  <Link to="reviews">Reviews</Link>
			</li>
		  </ul>
  
		  <Suspense fallback={<p>Loading...</p>}>
			<div>
			  <Outlet />
			</div>
		  </Suspense>
		</div>
	  </div>
	);
  }