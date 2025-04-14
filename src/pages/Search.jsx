import React from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetSearchedMoviesQuery,
  useGetSearchedTVShowsQuery,
} from '../app/apiSLice';

const Search = () => {
  const { query } = useParams();
  const {
    data: movieData,
    isLoading: movieLoading,
    error: movieError,
  } = useGetSearchedMoviesQuery(query);
  const {
    data: tvData,
    isLoading: tvLoading,
    error: tvError,
  } = useGetSearchedTVShowsQuery(query);

  if (movieLoading || tvLoading) return <p>Loading...</p>;
  if (movieError || tvError) return <p>Something went wrong...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Search results for: "{query}"</h2>

      <h3 className="text-xl font-semibold mb-2">🎬 Movies</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {movieData?.results?.length > 0 ? (
          movieData.results.map((movie) => (
            <div key={movie.id} className="bg-gray-800 p-2 rounded">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded"
              />
              <p className="mt-2">{movie.title}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full">No movies found.</p>
        )}
      </div>

      <h3 className="text-xl font-semibold mb-2">📺 TV Shows</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tvData?.results?.length > 0 ? (
          tvData.results.map((tv) => (
            <div key={tv.id} className="bg-gray-800 p-2 rounded">
              <img
                src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                alt={tv.name}
                className="rounded"
              />
              <p className="mt-2">{tv.name}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full">No TV shows found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
