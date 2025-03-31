import axios from "axios";

const url = 'https://api.themoviedb.org/3';

const ApiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NjdiMGFhZGNkNGQ0ZTQ2MzdjNGQwZThjNWQ5OGNlOSIsIm5iZiI6MTc0MjgyMDI1Ni40MjcsInN1YiI6IjY3ZTE1M2EwMWIzMzVkNTcxYzRkN2I4YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MmLGuiOb2aPJiurF16Dkn7oHyULB59zPiEbklu6D13E';

// --Movies-----------------------------------------------------------

export const fetchMovies = async ()=>{
	const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/day`, {
		params: {
			language: "en-US",
		  },
		  headers: {
			Authorization: `Bearer ${ApiKey}`,
		  },
	})
	return response.data.results;
}
//--Search---------------------------------------------------------------

  export const fetchSearchMovies = async (query) => {
	const response = await axios.get(`${url}/search/movie`, {
	  params: {
		language: "en-US",
		include_adult: false,
		query: query,
	  },
	  headers: {
		Authorization: `Bearer ${ApiKey}`,
	  },
	});
	return response.data.results;
  };
// --MovieById-----------------------------------------------------------

export const fetchMovieById = async (movieId) => {
	try {
	  const response = await axios.get(`${url}/movie/${movieId}`, {
		params: {
		  language: "en-US",
		},
		headers: {
		  Authorization: `Bearer ${ApiKey}`,
		},
	  });
	  return response.data;
	} catch (error) {
		console.error("Error in fetchMovieById:", error);
		throw error;
	  }
  };

  //--Reviews-------------------------------------------------------------

  export const fetchMovieReviews = async (movieId) => {
	const response = await axios.get(`${url}/movie/${movieId}/reviews`, {
	  params: {
		language: "en-US",
	  },
	  headers: {
		Authorization: `Bearer ${ApiKey}`,
	  },
	});
	return response.data.results;
  };
  
  //--Cast-------------------------------------------------------------

  export const fetchMovieCast = async (movieId) => {
	const response = await axios.get(`${url}/movie/${movieId}/credits`, {
	  params: {
		language: "en-US",
	  },
	  headers: {
		Authorization: `Bearer ${ApiKey}`,
	  },
	});
  
	return response.data.cast;
  };


// key api 67b0aadcd4d4e4637c4d0e8c5d98ce9