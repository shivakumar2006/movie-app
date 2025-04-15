import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SiThemoviedatabase } from "react-icons/si";
// import { FaSearch } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { BsMoonStarsFill } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../app/ThemeSlice';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../features/authSlice';
import { supabase } from '../supabase';


const Navbar = () => {

    const [ visible, setVisible ] = useState(true);
    const [ isMovieVisible, setIsMovieVisible ] = useState(false);
    const [ isTvVisible, setIsTvVisible ] = useState(false);
    const [ isPopularVisible, setIsPopularVisible ] = useState(false);
    const theme = useSelector((state) => state.theme.theme);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    let handleScrollY = useRef(0);

    const handleScroll = () => {
        if(typeof window !== "undefined") {
            if(window.scrollY > handleScrollY) {
                setVisible(false); 
            } else {
                setVisible(true); 
            }
            handleScrollY.current = window.scrollY;
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    })

    useEffect(() => {
        document.body.className = theme; // Adds 'light' or 'dark' to body
      }, [theme]);

  
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
  
      const profilePicture = user?.user_metadata?.avatar_url || user?.user_metadata?.picture;
  
      const handleClick = () => {
          Navigate("/profile");
      }

    return (
        <motion.div
            className="flex justify-center items-center"
            initial={{ y: 0 }}
            animate={{ y: visible ? 0 : -80 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div className='w-full h-18 bg-blue-950 flex flex-row items-center z-50 gap-8'
                style={{
                    background: "linear-gradient(90deg, rgba(1,41,73,1) 0%, rgba(1,40,62,1) 35%, rgba(9,59,88,1) 55%, rgba(2,71,103,1) 100%)"
                }}
            >
                <div className='w-50 h-15 mx-10 text-6xl text-white flex justify-center items-center cursor-pointer'
                    onClick={() => Navigate("/movie")}
                >
                {/* M<RiMovie2AiFill />VIES */}
                <SiThemoviedatabase />
                </div>
                <div className='flex flex-col items-center relative'
                    onMouseEnter={() => setIsMovieVisible(true)}
                    onMouseLeave={() => setIsMovieVisible(false)}
                >
                    <p 
                        className='text-white cursor-pointer'>
                        Movies
                    </p> 

                    {isMovieVisible && (
                        <div 
                            className='w-40 h-35 mt-0 ml-20 font-light bg-white shadow-sm shadow-gray-400 rounded flex flex-col justify-center items-center overflow-hidden transition-all duration-300 ease-in-out absolute top-full z-40'
                            style={{ opacity: isMovieVisible ? 1 : 0, transform: isMovieVisible ? 'translateY(0)' : 'translateY(20px)' }}
                        >
                            <div className='gap-5 text-black'>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'
                                    onClick={() => Navigate("/popular/movies")}
                                >
                                    Popular
                                </p>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'
                                    onClick={() => Navigate("/nowplaying")}
                                >
                                    Now playing
                                </p>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'
                                    onClick={() => Navigate("/upcoming")}
                                >
                                    Upcoming
                                </p>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'
                                    onClick={() => Navigate("/toprated")}
                                >
                                    Top Rated
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className='flex flex-col items-center relative'
                    onMouseEnter={() => setIsTvVisible(true)}
                    onMouseLeave={() => setIsTvVisible(false)}
                >
                    <p 
                        className='text-white cursor-pointer'>
                        TV Shows
                    </p> 

                    {isTvVisible && (
                        <div 
                            className='w-40 h-35 mt-0 ml-10 font-light bg-white shadow-sm shadow-gray-400 rounded flex flex-col justify-center items-center overflow-hidden transition-all duration-300 ease-in-out absolute top-full'
                            style={{ opacity: isTvVisible ? 1 : 0, transform: isTvVisible ? 'translateY(0)' : 'translateY(20px)' }}
                        >
                            <div className='gap-5 text-black'>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'
                                    onClick={() => Navigate("/popular/tv")}
                                >
                                    Popular
                                </p>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'
                                    onClick={() => Navigate("/airingtoday")}
                                >Airing Today</p>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'
                                    onClick={() => Navigate("/ontv")}
                                >On TV</p>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'
                                    onClick={() => Navigate("/tv/toprated")}
                                >
                                    Top Rated
                                </p>
                            </div>
                        </div>
                    )}
                </div>
                <div className='flex flex-col items-center relative'
                    onMouseEnter={() => setIsPopularVisible(true)}
                    onMouseLeave={() => setIsPopularVisible(false)}
                >
                    <p 
                        className='text-white cursor-pointer'>
                        People
                    </p> 

                    {isPopularVisible && (
                        <div 
                            className='w-40 h-10 mt-0 ml-10 font-light bg-white shadow-sm shadow-gray-400 rounded flex flex-col justify-center items-center overflow-hidden transition-all duration-300 ease-in-out absolute top-full'
                            style={{ opacity: isPopularVisible ? 1 : 0, transform: isPopularVisible ? 'translateY(0)' : 'translateY(20px)' }}
                        >
                            <div className='gap-5 text-black'>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'
                                    onClick={() => Navigate("/popularPeople")}
                                >Popular People</p>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className='w-80 ml-130 flex flex-row justify-evenly items-center'>
                    <div className={theme === "dark" ? 'text-white' : 'text-black'}>
                        <button 
                        className='text-white bg-none flex items-center text-2xl cursor-pointer'
                            onClick={() => dispatch(toggleTheme())}
                        >
                            {theme === "dark" ? <FiSun /> : <BsMoonStarsFill />}
                        </button>
                    </div>
                    {/* <div className='text-blue-400 text-2xl cursor-pointer'>
                        <FaSearch />
                    </div> */}
                    {/* Profile Picture Section */}
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mx-4 border-2 border-white rounded-full shadow-white hover:shadow-md">
                    {user && profilePicture ? (
                        <img 
                            src={profilePicture} 
                            alt="Profile" 
                            className="w-full h-full rounded-full cursor-pointer"
                            referrerPolicy="no-referrer"
                            onClick={handleClick}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-500 rounded-full flex justify-center items-center">
                            <span className="text-white">No Image</span>
                        </div>
                    )}
                </div>
                </div>
            </div>
        </motion.div>
     );
};

export default Navbar;
