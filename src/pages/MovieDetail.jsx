import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieDetailQuery } from '../app/apiSLice'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const MovieDetail = () => {

    const { movieId } = useParams();
    const numericId = Number(movieId);
    const { data, error, isLoading } = useGetMovieDetailQuery(numericId);

    console.log("data", data);

     useEffect(() => {
            console.log("person Detail : ", numericId);
    
            if(error) {
                console.log('Error details:', error);
            }
        }, [numericId, error])

  return (
    <div className='w-screen min-h-screen'>
        <div className='relative w-screen h-135 flex flex-col'>

        {/* Background image with opacity only */}
        <div
          className='absolute w-full h-125 mt-10 bg-cover bg-center'
          style={{
            backgroundImage: data?.backdrop_path
              ? `url(https://image.tmdb.org/t/p/w500${data.backdrop_path})`
              : 'url(https://via.placeholder.com/300x450?text=No+Image)',
            opacity: 0.5,
          }}
        />
    
        {/* Foreground content - untouched */}
        <div className='absolute w-full h-125 mt-10 z-10 bg-black/80 bg-cover bg-center flex flex-row items-center'>
          <div className='relative w-80 h-100 rounded-2xl ml-18 flex items-center z-10 hover:scale-105 transition-all transform duration-300 ease-in-out'>
            <LazyLoadImage
              src={
                data?.poster_path
                  ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                  : 'https://via.placeholder.com/300x450?text=No+Image'
              }
              alt={data?.title}
              effect='blur'
              className='w-80 h-115 rounded-2xl cursor-pointer'
            />
          </div>

          <div className='w-230 h-100 ml-10 flex flex-col'>
              <h1 className='text-5xl text-white font-bold'>{data?.original_title}</h1>

              <div className='flex flex-row text-md font-light text-white'>
                <p className='ml-5'>{data?.release_date}</p>
                <p className='mx-3 text-xl'>•</p>
                {data?.genres?.map((item) => (
                <p className='mr-1'>{item.name}, </p>
                ))}
                <p className='mx-3 text-xl'>•</p>
                <p className=''>{data?.runtime}m</p>
              </div>

              <div className='w-full h-8 mt-20 italic'>
                <p className='text-gray-400'>{data?.tagline}</p>
              </div>

              <div className='w-full h-30 text-white flex flex-col mt-5 gap-3'>
                <p className='text-2xl mt-5'>Overview</p>
                <p className='font-light'>{data?.overview}</p>
              </div>

              <div className='w-190 h-20 mt-5 flex flex-row justify-between items-center'>
                <div className='w-30 h-20 flex flex-col items-center justify-center'>
                    <p className='text-white'>Popularity</p>
                    <p className='text-white text-sm font-light'>{data?.popularity}</p>
                </div>
                <div className='w-30 h-20 flex flex-col justify-center items-center'>
                    <p className='text-white'>Vote</p>
                    <p className='text-white text-sm font-light'>{data?.vote_count}</p>
                </div>
                <div className='w-30 h-20 flex flex-col justify-center items-center'>
                    <p className='text-white'>Vote Average</p>
                    <p className='text-white text-sm font-light'>{data?.vote_average}</p>
                </div>
              </div>
          </div>
        </div>
        </div>
    
        <div className='w-full flex flex-row items-start justify-center mt-2 gap-6'>
  {/* Scrollable production companies */}
  <div className='flex flex-col w-[80%]'>
    <div className='overflow-x-auto whitespace-nowrap scroll-smooth scrollbar-hide flex gap-4'>
      {data?.production_companies?.map((movie) => (
        <div key={movie.id} className='w-80 h-80 ml-3 flex flex-row items-center justify-center'>
          <div className='w-40 h-50 shadow-xl border-gray-300 border-1 flex flex-col'>
            <div className='w-40 h-30 flex items-center'>
              <LazyLoadImage 
                src={movie.logo_path 
                  ? `https://image.tmdb.org/t/p/w500${movie.logo_path}` 
                  : 'https://via.placeholder.com/300x450?text=No+Image'}
                alt={movie.name}
                effect='blur'
                className='w-full h-full rounded-t-2xl'
              />
            </div>
            <div className='w-40 h-20 flex flex-col items-center justify-center text-center'>
              <p>{movie.name}</p>
              <p>{movie.origin_country}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Second div */}
  <div className='w-150 h-30 mr-8 flex flex-col mt-5'>
    <p className='font-bold'>Status</p>
    <p className='font-light'>{data?.status}</p>

    <p className='font-bold mt-5'>Original Language</p>
    <p className='font-light'>{data?.original_language}</p>

    <p className='font-bold mt-5'>Budget</p>
    <p className='font-light'>${data?.budget}</p>

    <p className='font-bold mt-5'>Revenue</p>
    <p className='font-light'>${data?.revenue}</p>
  </div>
</div>

    </div>
  
  )
}

export default MovieDetail