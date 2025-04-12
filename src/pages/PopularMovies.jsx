import React, { useState } from 'react'; 
import { useGetPopularMoviesPagesQuery } from '../app/apiSLice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PopularMovies = () => {

    const [ page, setPage ] = useState(1);
    const { data, error, isLoading } = useGetPopularMoviesPagesQuery(page);

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

    return (
        <div className='w-screen min-h-screen flex flex-col'>
            <div className='w-full mt-10'>
                <h1 className='text-2xl mx-15'>Popular Movies</h1>
            </div>

            <div className='w-full flex flex-row justify-evenly items-start mt-10'>
                <div className='w-80 border-2'>
                    
                </div>

                <div className='w-[1040px] flex flex-col justify-center'>
                    <div className='flex flex-wrap justify-evenly gap-5'>
                        {data?.results?.map((movie) => (
                            <div key={movie.id} className='w-50 h-100 rounded-2xl shadow-xl overflow-hidden hover:scale-105 transition-all transform duration-300 ease-in-out'>
                                <div className='w-full h-3/4 rounded-t-2xl'>
                                    <LazyLoadImage 
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-full object-cover rounded-t-2xl cursor-pointer"
                                        effect="blur"
                                    />
                                </div>
                                <div className="text-center mt-3 text-xl font-medium px-1">
                                    <p className='text-xl font-medium'>{movie.title}</p>
                                    <p className='text-sm font-light'>{movie.release_date}</p>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                    <div className='w-full h-40 flex items-center justify-center gap-5'>
                    <button 
                        onClick={handlePrevious} 
                        disabled={page === 1} 
                        className='px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer'
                    >
                        Previous
                    </button>
                    <button 
                        onClick={handleNext} 
                        disabled={page === totalPages} 
                        className='px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 cursor-pointer'
                    >
                        Next
                    </button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default PopularMovies;
