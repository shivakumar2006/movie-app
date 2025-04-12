import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; 

const baseUrl = "https://api.themoviedb.org/3/";

export const tmdb = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getPopularMovies: builder.query({
            query: (filter) => `movie/popular?filter=${filter}&api_key=${import.meta.env.VITE_REACT_API_KEY}`
        }),
        getTrendingMovies: builder.query({
            query: (timeWindow) => `trending/movie/${timeWindow}?api_key=${import.meta.env.VITE_REACT_API_KEY}`
        }),
        getMovieTrailers : builder.query({
            query: (movieId) => `movie/${movieId}/videos?api_key=${import.meta.env.VITE_REACT_API_KEY}`
        }),
        getFreeMovies: builder.query({
            query: (page) => `discover/movie?with_watch_monetization_types=free&api_key=${import.meta.env.VITE_REACT_API_KEY}&page=${page}`
        }),   
        getFreeTVShows: builder.query({
            query: () => `discover/tv?with_watch_monetization_types=free&api_key=${import.meta.env.VITE_REACT_API_KEY}`
        }),
        getPopularMoviesPages: builder.query({
            query: (page = 1) => `movie/popular?&api_key=${import.meta.env.VITE_REACT_API_KEY}&page=${page}`
        }),
        getPopularTvShows: builder.query({
            query: (page = 1) => `tv/popular?api_key=${import.meta.env.VITE_REACT_API_KEY}&page=${page}`
        })
    })
})

export const { useGetPopularMoviesQuery, useGetTrendingMoviesQuery, useGetMovieTrailersQuery, useGetFreeMoviesQuery, useGetFreeTVShowsQuery, useGetPopularMoviesPagesQuery, useGetPopularTvShowsQuery } = tmdb;

