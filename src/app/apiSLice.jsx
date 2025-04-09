import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 

const baseUrl = "https://api.themoviedb.org/3/";

export const tmdb = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getPopularMovies: builder.query({
            query: () => `movie/popular?api_key=${import.meta.env.VITE_REACT_API_KEY}`
        })
    })
})

export const { useGetPopularMoviesQuery } = tmdb;

