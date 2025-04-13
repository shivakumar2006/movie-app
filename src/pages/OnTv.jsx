import React, { useState } from 'react'; 
import { useGetAiringTodayTvShowsQuery, useGetFilteredTvShowQuery, useGetOnTvShowsQuery, useGetPopularMoviesPagesQuery } from '../app/apiSLice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';

const OnTv = () => {

    const [ page, setPage ] = useState(1);
    const [ language, setLanguage ] = useState();
    const [ minRating, setMinRating ] = useState();
    const [ sortBy, setSortBy ] = useState();
    const Navigate = useNavigate();
    const { data, error, isLoading } = useGetPopularMoviesPagesQuery(page);
    const { data: filteredData, isLoading: filteredLoading } = useGetOnTvShowsQuery({
        language,
        minRating,
        sortBy,
        page
})

    const totalPages = data?.total_pages || 1;

    const handleNext = () => {
        if(page < totalPages) {
            setPage((prev) => prev + 1);
        }
    }

    const handlePrevious = () => {
        if(page > 1) {
            setPage((prev) => prev - 1);
        }
    }

    console.log("filtered movie data : ", filteredData);

    return (
        <div className='w-screen min-h-screen flex flex-col'>
            <div className='w-full mt-10'>
                <h1 className='text-2xl mx-15'>On Tv</h1>
            </div>

            <div className='w-full flex flex-row justify-evenly items-start mt-10'>
                <div className='w-80 flex flex-col'>
                <div className='w-80 rounded-2xl flex flex-col gap-5 p-4'>
                <div className='w-80 rounded-2xl shadow-xl h-30 border-gray-200 border-1 flex flex-col gap-5'>
                <label className='font-semibold px-5 py-2'>Select Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className='p-2 border rounded shadow-2xl w-70 mx-5'
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="fr">French</option>
                  <option value="ja">Japanese</option>
                </select>
                </div>

                <div className='w-80 rounded-2xl shadow-2xl h-30 border-gray-200 border-1 flex flex-col gap-5'>
                    <label className='font-semibold px-5 py-2'>Minimum Rating</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={minRating}
                      onChange={(e) => setMinRating(e.target.value)}
                      className='p-2 border rounded shadow-xl w-70 mx-5'
                    />
                </div>

                    <div className='w-80 rounded-2xl shadow-2xl h-30 border-gray-200 border-1 flex flex-col gap-5'>
                    <label className='font-semibold px-5 py-2'>Sort By</label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className='p-2 border rounded shadow-xl w-70 mx-5'
                    >
                      <option value="popularity.desc">Popularity Descending</option>
                      <option value="popularity.asc">Popularity Ascending</option>
                      <option value="vote_average.desc">Rating Descending</option>
                      <option value="vote_average.asc">Rating Ascending</option>
                      <option value="release_date.desc">Latest</option>
                      <option value="release_date.asc">Oldest</option>
                    </select>
                </div>
            </div>

                </div>

                <div className='w-[1040px] flex flex-col justify-center'>
                    <div className='flex flex-wrap justify-evenly gap-5'>
                        {filteredData?.results?.map((movie) => (
                            <div key={movie.id} className='w-50 h-100 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-all transform duration-300 ease-in-out'>
                                <div className='w-full h-3/4 rounded-t-2xl'>
                                    <LazyLoadImage 
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-full object-cover rounded-t-2xl cursor-pointer"
                                        effect="blur"
                                        onClick={() => Navigate(`/tv/${movie.id}`)}
                                    />
                                </div>
                                <div className="text-center mt-3 text-xl font-medium px-1">
                                    <p className='text-xl font-medium'>{movie.name}</p>
                                    <p className='text-sm font-light'>{movie.first_air_date}</p>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                    <div className='w-full h-40 flex items-center justify-center gap-5'>
                    <button 
                        onClick={handlePrevious} 
                        disabled={page === 1} 
                        className='px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer hover:bg-blue-700'
                    >
                        Previous
                    </button>
                    <button 
                        onClick={handleNext} 
                        disabled={page === totalPages} 
                        className='px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer hover:bg-blue-700'
                    >
                        Next
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default OnTv;
