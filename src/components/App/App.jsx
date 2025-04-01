
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import css from "./App.module.css"

import Navigation from "../Navigation/Navigation";


const HomePage = lazy(() => import("../../pages/HomePage"));

const MoviesPage = lazy(() => import("../../pages/MoviesPage"))
const MovieDetailsPage = lazy(() =>
  import("../../pages/MovieDetailsPage")
);
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../MovieReviews/MovieReviews")
);
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));

export default function App() {
return(
	<div className={css.container}>
	 
 <Navigation />
 <Suspense>
 <Routes>
   <Route path="/" element={<HomePage />} />
   <Route path="/movies" element={<MoviesPage />} />
   <Route path="/movie/:movieId" element={<MovieDetailsPage />}>
	 <Route path="cast" element={<MovieCast />} />
	 <Route path="reviews" element={<MovieReviews />} />
   </Route>
   <Route path="*" element={<NotFoundPage />} /> 

 </Routes>
 </Suspense>
</div>
)
}