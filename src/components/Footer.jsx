import React, { useEffect } from 'react';
import { GrLinkedin } from "react-icons/gr";
import { BsGithub } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { SiThemoviedatabase } from "react-icons/si";
import { useDispatch, useSelector } from 'react-redux';

const Footer = () => {

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const userMeta = user?.user_metadata || {};
    const displayName = userMeta.name || userMeta.full_name || userMeta.user_name || "No name found";

    useEffect(() => {
              const fetchUser = async () => {
                  if(!user) {
                      const { data: { user }, error } = await supabase.auth.getUser();
                      if(user) {
                          dispatch(setUser(user));
                      } 
                  }
              }
      
              fetchUser();
          }, [dispatch, user]);

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
        <div className='w-60 h-20 mx-5 flex flex-row justify-between items-center'>
            <p className='text-white font-light text-sm'>Connect with me</p>
            <Link to="https://www.linkedin.com/in/shiva-shiva-8a48002a7/">
                <GrLinkedin className='text-white text-3xl cursor-pointer' />
            </Link>
            <Link to="https://github.com/shivakumar2006/movie-app">
                <BsGithub className='text-white text-3xl cursor-pointer'/>
            </Link>
        </div>
        </div>
        <div className='w-full h-50 flex flex-row justify-between items-center'>
            <div className='w-50 h-15 mx-10 text-8xl text-white flex justify-center items-center cursor-pointer'>
                            {/* M<RiMovie2AiFill />VIES */}
                <SiThemoviedatabase />
            </div>
            <div className='w-80 h-12 bg-white rounded-2xl flex flex-row items-center justify-center cursor-pointer'>
                <p className='text-2xl text-blue-950 font-bold'>Hii {displayName}!</p>
            </div>
            <div className='w-50 h-30 mx-20 flex flex-col justify-center items-center'>
                <p className='text-white font-bold text-2xl'>TMDB API</p>
                <Link to="https://www.themoviedb.org/#play=APF86peawgs">
                <button className='w-50 h-10 bg-white rounded-3xl text-blue-950 hover:bg-gray-200 hover:w-55 transition-all transform duration-300 ease-in-out cursor-pointer'>
                    Get your API
                </button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Footer