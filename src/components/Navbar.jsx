import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
import { SiThemoviedatabase } from "react-icons/si";

const Navbar = () => {

    const [ visible, setVisible ] = useState(true);
    const [ isMovieVisible, setIsMovieVisible ] = useState(false);
    const [ isTvVisible, setIsTvVisible ] = useState(false);
    const [ isPopularVisible, setIsPopularVisible ] = useState(false);

    let handleScrollY = useRef(0);

    const handleScroll = () => {
        if(typeof window !== "undefined") {
            if(window.scrollY > handleScrollY) {
                setVisible(false); 
            } else {
                setVisible(true); 
            }
            lastScrollY = window.scrollY;
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    })

    return (
        <motion.div
            className="flex justify-center items-center"
            initial={{ y: 0 }}
            animate={{ y: visible ? 0 : -80 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            <div className='w-full h-18 bg-blue-950 flex flex-row items-center gap-8'
                style={{
                    background: "linear-gradient(90deg, rgba(1,41,73,1) 0%, rgba(1,40,62,1) 35%, rgba(9,59,88,1) 55%, rgba(2,71,103,1) 100%)"
                }}
            >
                <div className='w-50 h-15 mx-10 text-6xl text-white flex justify-center items-center'>
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
                            className='w-40 h-35 mt-0 ml-20 font-light bg-white shadow-sm shadow-gray-400 rounded flex flex-col justify-center items-center overflow-hidden transition-all duration-300 ease-in-out absolute top-full'
                            style={{ opacity: isMovieVisible ? 1 : 0, transform: isMovieVisible ? 'translateY(0)' : 'translateY(20px)' }}
                        >
                            <div className='gap-5 text-black'>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'>Popular</p>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'>Now playing</p>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'>Upcoming</p>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'>Top Rated</p>
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
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'>Popular</p>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'>Airing Today</p>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'>On TV</p>
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'>Top Rated</p>
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
                                <p className='w-40 h-8 text-sm hover:bg-gray-300 flex flex-col justify-center items-center cursor-pointer'>Popular People</p>
                            </div>
                        </div>
                    )}
                </div>

                
            </div>
        </motion.div>
     );
};

export default Navbar;
