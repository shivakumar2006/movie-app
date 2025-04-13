import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPersonDetailQuery } from '../app/apiSLice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PersonDetail = () => {

    const { personId } = useParams();
    const numericId = Number(personId);
    const { data, error, isLoading } = useGetPersonDetailQuery(numericId);

    console.log(" person detail single : ", data);
    useEffect(() => {
        console.log("person Detail : ", numericId);

        if(error) {
            console.log('Error details:', error);
        }
    }, [numericId, error])

  return (
    <div className='w-full min-h-screen flex flex-row'>
        <div className='w-80 flex flex-col ml-15'>
            <div className='w-80 h-100 rounded-2xl mt-20 shadow-2xl hover:scale-105 trabsition-all transform duration-300 ease-in-out cursor-pointer'>
                <LazyLoadImage 
                    src={data?.profile_path
                        ? `https://image.tmdb.org/t/p/w500${data.profile_path}`
                        : 'https://via.placeholder.com/300x450?text=No+Image'}
                    alt={data?.name}
                    className="w-80 h-auto rounded-xl shadow-lg"
                />
            </div>
            <div className='w-80 mt-40 mb-10'>
                <div className='w-full flex flex-col'>
                    <h1 className='text-2xl font-medium'>Personal info.</h1>
                    <p className='font-bold mt-5'>Known for</p>
                    <p className='font-light'>{data?.known_for_department}</p>
                    
                    <p className='font-bold mt-5'>Gender</p>
                    <p className='font-light'>{data?.gender}</p>

                    <p className='font-bold mt-5'>BirthDate</p>
                    <p className='font-light'>{data?.birthday}</p>

                    <p className='font-bold mt-5'>Place of Birth</p>
                    <p className='font-light'>{data?.place_of_birth}</p>

                    <p className='font-bold mt-5'>Also known as</p>
                    <p className='font-light'>{data?.also_known_as}</p>
                </div>
            </div>
        </div>

        <div className='w-200 h-220 mx-10 flex flex-col'>
            <div className='w-full h-20 mt-16 flex items-center justify-between'>
                <h1 className='font-bold text-4xl'>{data?.name}</h1>
                <h1 className='font-light text-2xl'>{data?.known_for_department}</h1>
            </div>
            <div className='w-full h-10 flex items-center'>
                <h1 className='text-2xl mt-8 font-medium'>Biography</h1>
            </div>
            <div className='w-full mt-5'>
                <p>{data?.biography}</p>
            </div>
            <div className='w-full h-20 my-10 flex flex-col justfy-center items-center'>
            <p className='font-bold text-2xl text-blue-950'>Popularity</p>
            <p className='font-light'>{data?.popularity}</p>
            </div>
        </div>
    </div>
  )
}

export default PersonDetail