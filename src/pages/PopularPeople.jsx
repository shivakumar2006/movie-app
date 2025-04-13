import React, { useState } from 'react'
import { useGetPopularPeopleQuery } from '../app/apiSLice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';

const PopularPeople = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetPopularPeopleQuery(page);
  const Navigate = useNavigate();

  console.log("popularPeople : ", data);

  if (isLoading) return <p className='text-center mt-10'>Loading...</p>;
  if (error) return <p className='text-center mt-10 text-red-500'>Something went wrong!</p>;

  return (
    <div className='w-screen min-h-screen flex flex-col items-center'>
      <div className='w-full mt-10 text-center'>
        <h1 className='text-3xl font-bold'>Popular People</h1>
      </div>

      <div className='w-full flex flex-wrap justify-center gap-6 mt-10'>
        {data?.results?.map((item) => (
          <div
            key={item.id}
            className='w-52 rounded-xl shadow-xl bg-white hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer'
            onClick={() => Navigate(`/person/${item.id}`)}
          >
            <div className='w-full h-72'>
              <LazyLoadImage
                src={
                  item.profile_path
                    ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                    : 'https://via.placeholder.com/300x450?text=No+Image'
                }
                alt={item.name}
                className='w-full h-full object-cover'
                effect='blur'
              />
            </div>
            <div className='text-center p-3 mt-5'>
              <p className='text-lg font-semibold'>{item.name}</p>
              {item.known_for_department && (
                <p className='text-sm text-gray-500'>{item.known_for_department}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-center gap-4 mt-10 mb-10'>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className='px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50'
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PopularPeople;
