import React from 'react';
import { GrLinkedin } from "react-icons/gr";
import { BsGithub } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <div className='w-full h-80 '
        style={{
            background: "linear-gradient(90deg, rgba(1,41,73,1) 0%, rgba(1,40,62,1) 35%, rgba(9,59,88,1) 55%, rgba(2,71,103,1) 100%)"
        }}
    >
        <div className='w-full h-20 border-b-2 border-white flex flex-row justify-between items-center'>
        <h1 className='text-white mx-5 text-2xl font-light'>
            Millions of movies, TV shows, and people to discover, Explore now
        </h1>
        <div className='w-80 h-20 mx-5 flex flex-row justify-between items-center'>
            <p className='text-white font-light text-sm'>Connect with me</p>
            <Link to="https://www.linkedin.com/in/shiva-shiva-8a48002a7/">
            <GrLinkedin className='text-white text-2xl cursor-pointer' />
            </Link>
            <BsGithub className='text-white text-2xl cursor-pointer'/>
        </div>
        </div>
    </div>
  )
}

export default Footer