import React from 'react';
// import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { useGetPopularMoviesQuery } from '../app/apiSLice';

const Content = () => {

    const { data, error, isLoading} = useGetPopularMoviesQuery();

    if(isLoading) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if(error) {
        return (
            <div>
                Error fetching data 
            </div>
        )
    }

    console.log(" api response : ", data);

    return (
        <div className='w-screen h-screen flex flex-col'>
            <div className='w-full h-13 border px-20 flex flex-row items-center'>
                <FaSearch className='ml-[-10px]'/>
                <input 
                    type='text'
                    className='w-full h-13 text-gray-500 placeholder:text-gray-400 px-10 ring-0 border-0 focus:outline-none cursor-text'
                    placeholder='Search for a movies,tvshows,person...'
                />
            </div>
            <div className='w-full h-100 my-5 shadow-md border-gray-300'>
                <div className='w-50 h-10 my-5 mx-15 text-2xl flex justify-center items-center'>
                    <h1>Trending</h1>
                </div>
                <div className='w-full h-80 flex flex-col items-center'>
                    <div className='w-310 h-80 border-2 flex flex-row items-center overflow-x-hidden'>
                        <div className='w-45 h-80 border-2 flex flex-col items-center'>
                            <div className='w-45 h-60 border-2 rounded-2xl'>
                                movie poster
                            </div>
                            <p className='font-bold text-md mr-10 mt-5'>Movie name</p>
                            <p className='font-light mr-7'>Date of release</p>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Content;