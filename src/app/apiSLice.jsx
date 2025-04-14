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
        }),
        getFilteredMovies: builder.query({
            query: ({ language, minRating, sortBy, page }) => {
              let queryParams = `?page=${page}`;
          
              if (language) queryParams += `&with_original_language=${language}`;
              if (minRating) queryParams += `&vote_average.gte=${minRating}`;
              if (sortBy) queryParams += `&sort_by=${sortBy}`;
          
              // Append the API key here
              queryParams += `&api_key=${import.meta.env.VITE_REACT_API_KEY}`;
          
              return `/discover/movie${queryParams}`;
            }
          }),
        getFilteredTvShow: builder.query({
            query: ({ language, minRating, sortBy, page }) => {
                let queryParams = `?page=${page}`;

                if(language) queryParams += `&with_original_language=${language}`;
                if(minRating) queryParams += `&vote_average.gte=${minRating}`;
                if(sortBy) queryParams += `&sort_by=${sortBy}`;

                queryParams += `&api_key=${import.meta.env.VITE_REACT_API_KEY}`;

                return `/discover/tv${queryParams}`;
            }
        }),
        getPopularPeople: builder.query({
            query: (page = 1) => `person/popular?api_key=${import.meta.env.VITE_REACT_API_KEY}&page=${page}`
        }),
        getPersonDetail: builder.query({
            query: (personId) => `person/${personId}?api_key=${import.meta.env.VITE_REACT_API_KEY}`
        }),
        getMovieDetail: builder.query({
            query: (movieId) => `movie/${movieId}?api_key=${import.meta.env.VITE_REACT_API_KEY}`
        }),
        getTvShowDetail: builder.query({
            query: (tvShowId) => `tv/${tvShowId}?api_key=${import.meta.env.VITE_REACT_API_KEY}`
        }),
        getFilteredNowPlayingMovie: builder.query({
            query: ({ 
              page = 1, 
              language = 'en-US', 
              region = 'US', 
              sortBy = 'popularity.desc'  // how to sort the movies
            }) => 
              `/discover/movie?api_key=${import.meta.env.VITE_REACT_API_KEY}&page=${page}&language=${language}&region=${region}&sort_by=${sortBy}&with_release_type=3&with_watch_monetization_types=flatrate`
          }),
          getUpcomingMovies: builder.query({
            query: ({ page = 1, language = 'en-US', sortBy = 'popularity.desc' }) =>
              `/movie/upcoming?api_key=${import.meta.env.VITE_REACT_API_KEY}&page=${page}&language=${language}&sort_by=${sortBy}`,
          }),
          getTopRated: builder.query({
            query: ({ page = 1, language = 'en-US', sortBy = 'popularity.desc' }) =>
              `/movie/top_rated?api_key=${import.meta.env.VITE_REACT_API_KEY}&page=${page}&language=${language}&sort_by=${sortBy}`,
          }),
          getAiringTodayTvShows: builder.query({
            query: ({ page = 1, language = 'en-US', sortBy = 'popularity.desc' }) => 
                `/tv/airing_today?api_key=${import.meta.env.VITE_REACT_API_KEY}&page=${page}&language=${language}&sort_by=${sortBy}`,
          }),
          getOnTvShows: builder.query({
            query: ({ page = 1, language = 'en-US', sortBy = 'popularity.desc' }) => 
                `/tv/on_the_air?api_key=${import.meta.env.VITE_REACT_API_KEY}&page=${page}&language=${language}&sort_by=${sortBy}`,
          }),
          getTopRatedTvShows: builder.query({
            query: ({ page = 1, language = 'en-US', sortBy = 'popularity.desc' }) => 
                `/tv/top_rated?api_key=${import.meta.env.VITE_REACT_API_KEY}&page=${page}&language=${language}&sort_by=${sortBy}`,
          }),
          getSearchedMovies: builder.query({
            query: (searchTerm) =>
              `/search/movie?api_key=${import.meta.env.VITE_REACT_API_KEY}&query=${searchTerm}&include_adult=false&language=en-US&page=1`,
          }),
          getSearchedTVShows: builder.query({
            query: (searchTerm) =>
              `/search/tv?api_key=${import.meta.env.VITE_REACT_API_KEY}&query=${searchTerm}&include_adult=false&language=en-US&page=1`,
          }),
          
    })
})

export const { useGetPopularMoviesQuery, useGetTrendingMoviesQuery, useGetMovieTrailersQuery, useGetFreeMoviesQuery, useGetFreeTVShowsQuery, useGetPopularMoviesPagesQuery, useGetPopularTvShowsQuery, useGetFilteredMoviesQuery, useGetFilteredTvShowQuery, useGetPopularPeopleQuery, useGetPersonDetailQuery, useGetMovieDetailQuery, useGetTvShowDetailQuery, useGetFilteredNowPlayingMovieQuery, useGetUpcomingMoviesQuery, useGetTopRatedQuery, useGetAiringTodayTvShowsQuery, useGetOnTvShowsQuery, useGetTopRatedTvShowsQuery, useGetSearchedMoviesQuery, useGetSearchedTVShowsQuery } = tmdb;

