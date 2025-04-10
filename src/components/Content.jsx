import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { FaSearch } from "react-icons/fa";
import { PuffLoader } from 'react-spinners';
import { FaArrowTrendUp } from "react-icons/fa6";
import { useGetPopularMoviesQuery, useGetTrendingMoviesQuery, useGetMovieTrailersQuery, useGetFreeMoviesQuery, useGetFreeTVShowsQuery } from '../app/apiSLice';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Content = () => {
    const [trendSelectedFilter, setTrendSelectedFilter] = useState('today');
    const [ popularSelectedFilter, setPopularSelectedFilter ] = useState('streaming');
    const [searchTerm, setSearchTerm] = useState('');
    const [freeWatchFilter, setFreeWatchFilter] = useState('tv'); // 'movie' or 'tv'
    const [ page, setPage ] = useState(2);
    const [ isSuggestionVisible, setSuggestionVisible ] = useState(false); 

    const inputRef = useRef(null); // Ref for the input field
    const suggestionBoxRef = useRef(null);

    const { data: trendingData, error: trendingError, isLoading: trendingLoading } = useGetTrendingMoviesQuery(
        trendSelectedFilter === 'today' ? 'day' : 'week'
    );

    const { data, error, isLoading } = useGetPopularMoviesQuery(popularSelectedFilter);
    const { data: freeMoviesData } = useGetFreeMoviesQuery(page);
    const { data: freeTvShowsData } = useGetFreeTVShowsQuery();

    if (trendingLoading || isLoading) {
        return <div className='w-screen h-screen text-5xl flex justify-center items-center'><PuffLoader /></div>;
    }

    if (error || trendingError) {
        return <div>Error fetching data</div>;
    }

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredTrendingMovies = trendingData?.results?.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredPopularMovies = data?.results?.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredFreeMovies = freeMoviesData?.results?.filter((movie) =>
        movie.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredFreeTV = freeTvShowsData?.results?.filter((tv) =>
        tv.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleTrendClick = (title) => {
        setSearchTerm(title)
        setSuggestionVisible(true);
    }

    useEffect(() => {
        if(searchTerm.trim().length > 0) {
            setSuggestionVisible(true);
        } else {
            setSuggestionVisible(false);
        }
    }, [searchTerm])


    console.log("trendingdata : ", trendingData);
    console.log("freemoviedata: ", freeMoviesData);
    console.log("freeTvShowsData: ", freeTvShowsData);


    return (
        <div className="w-screen flex flex-col">
            <div className="w-full h-13 sticky z-20 bg-white top-0 border px-20 flex flex-row items-center">
                <FaSearch className="ml-[-10px]" />
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full h-12 text-gray-500 bg-white placeholder:text-gray-400 px-10 ring-0 border-0 focus:outline-none cursor-text"
                    placeholder="Search for a movies,tvshows,person..."
                />
            </div>

            {/* suggestion box */}
            {isSuggestionVisible && (
            <div className="w-full h-82 z-20 bg-white top-0 border-gray-200 flex flex-col items-center">
                <div className='w-full h-10 bg-gray-100 flex flex-row'>
                    <div className='flex flex-row items-center gap-2 ml-40'>
                        <FaArrowTrendUp className='text-2xl'/>
                        <p className='text-xl font-bold'>Trending</p>
                    </div>
                </div>

                {trendingData?.results.slice(0, 10)?.map((movie) => (
                <div key={movie.id} className='w-full h-8 border-gray-200 border hover:bg-gray-200'>
                    <div className='flex flex-row items-center gap-6 ml-40 cursor-pointer'
                        onClick={() => handleTrendClick(movie.title)}
                    >
                        <FaSearch className="text-xs my-2" />
                        <p className='font-light text-sm'>{movie.title}</p>
                    </div>
                </div>
                ))}
            </div>
            )}

            <div className="w-full h-80 border-2 flex flex-col justify-center items-center gap-10" style={{ background: "linear-gradient(90deg, rgba(1,41,73,1) 0%, rgba(1,40,62,1) 35%, rgba(9,59,88,1) 55%, rgba(2,71,103,1) 100%)" }}>
                <div className="w-[1200px] h-30">
                    <div className="w-[1000px] h-12 mt-8 flex flex-col">
                        <h1 className="text-white font-bold text-5xl">WELCOME</h1>
                        <h1 className="text-white text-3xl mx-2">Millions of movies, TV shows, and people to discover, Explore now</h1>
                    </div>
                </div>
            </div>

            {/* Trending Movies */}
            <div className="w-full h-110 shadow-md border-gray-300">
                <div className="w-50 h-10 my-5 mx-15 text-2xl flex flex-row justify-center items-center gap-5">
                    <div className="mr-10">
                        <h1>Trending</h1>
                    </div>
                    <div className="w-60 h-10 border-1 relative border-gray-300 rounded-3xl mr-[-300px] flex flex-row items-center">
                        <motion.div
                            layout
                            transition={{ type: 'spring', stiffness: 600, damping: 100 }}
                            className={`absolute top-0 left-0 w-32 h-9 rounded-3xl bg-blue-950 z-0  ${trendSelectedFilter === 'week' ? 'w-28 translate-x-[7rem]' : 'w-32 translate-x-0'}`}
                        />
                        <div
                            className={`w-28 h-9 rounded-3xl flex items-center justify-center cursor-pointer z-10 transition-colors duration-300 ${trendSelectedFilter === 'today' ? 'text-white' : ' text-black'}`}
                            onClick={() => setTrendSelectedFilter('today')}
                        >
                            <p className="text-sm text-center">Today</p>
                        </div>
                        <div
                            className={`w-32 h-9 rounded-3xl flex items-center justify-center cursor-pointer z-10 transition-colors duration-300 ${trendSelectedFilter === 'week' ? 'text-white' : ' text-black'}`}
                            onClick={() => setTrendSelectedFilter('week')}
                        >
                            <p className="text-sm">This Week</p>
                        </div>
                    </div>
                </div>

                <div className="w-full h-80 flex flex-col items-center">
                    <div className="w-[1280px] h-80 flex flex-row items-center overflow-x-auto whitespace-nowrap scroll-smooth gap-5">
                        {filteredTrendingMovies?.map((movie) => (
                            <div key={movie.id} className="w-45 h-80 flex flex-col items-center">
                                <div className="w-45 h-90 shadow-gray-400 shadow-xl rounded-2xl overflow-hidden transition-all transform hover:scale-105 duration-300 ease-in-out">
                                    <LazyLoadImage
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-full object-cover cursor-pointer"
                                        effect="blur"
                                    />
                                </div>
                                <div className="w-full h-20 flex flex-col items-center justify-center text-center">
                                    <p className="w-50 truncate font-bold text-md mr-5 break-words">{movie.title}</p>
                                    <p className="font-light mr-5">{movie.release_date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* popular Movies */}
            <div className="w-full h-110 shadow-md border-gray-300">
                <div className="w-80 h-10 my-5 mx-10 text-2xl flex flex-row justify-center items-center gap-10">
                    <div className="mx-10">
                        <h1>What's popular</h1>
                    </div>
                </div>

                <div className="w-full h-80 flex flex-col items-center">
                    <div className="w-[1240px] h-80 flex flex-row items-center overflow-x-auto whitespace-nowrap scroll-smooth gap-5">
                        {filteredPopularMovies?.map((movie) => (
                            <div key={movie.id} className="w-45 h-80 flex flex-col items-center">
                                <div className="w-45 h-90 shadow-gray-400 shadow-xl rounded-2xl overflow-hidden transition-all transform hover:scale-105 duration-300 ease-in-out">
                                    <LazyLoadImage
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-full object-cover"
                                        effect="blur"
                                    />
                                </div>
                                <div className="w-full h-20 flex flex-col items-center justify-center text-center">
                                    <p className="w-50 truncate font-bold text-md mr-5 break-words">{movie.title}</p>
                                    <p className="font-light">{movie.release_date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* free watch */}
            <div className="w-full h-110 shadow-md border-gray-300">
            <div className="w-50 h-10 my-5 ml-60 text-2xl flex flex-row justify-center items-center gap-5">
                <div className="w-80 h-10 my-5 text-2xl flex flex-row justify-center items-center gap-10">
                    <div className="w-40 mx-0">
                        <h1>Free Watch</h1>
                    </div>
                </div>
                <div className="w-60 h-10 border-1 relative border-gray-300 rounded-3xl mr-0 flex flex-row items-center">
                        <motion.div
                            layout
                            transition={{ type: 'spring', stiffness: 600, damping: 100 }}
                            className={`absolute top-0 left-0 w-32 h-9 rounded-3xl bg-blue-950 z-0  ${freeWatchFilter === 'movie' ? 'w-28 translate-x-[7rem]' : 'w-32 translate-x-0'}`}
                        />
                        <div
                            className={`w-28 h-9 rounded-3xl flex items-center justify-center cursor-pointer z-10 transition-colors duration-300 ${freeWatchFilter === 'tv' ? 'text-white' : ' text-black'}`}
                            onClick={() => setFreeWatchFilter('tv')}
                        >
                            <p className="text-sm text-center">TV</p>
                        </div>
                        <div
                            className={`w-32 h-9 rounded-3xl flex items-center justify-center cursor-pointer z-10 transition-colors duration-300 ${freeWatchFilter === 'movie' ? 'text-white' : ' text-black'}`}
                            onClick={() => setFreeWatchFilter('movie')}
                        >
                            <p className="text-sm">Movies</p>
                        </div>
                    </div>
                </div>

                <div className="w-full h-80 flex flex-col items-center">
                    <div className="w-[1240px] h-80 flex flex-row items-center overflow-x-auto whitespace-nowrap scroll-smooth gap-5">
                        {(freeWatchFilter === 'movie' ? filteredFreeMovies : filteredFreeTV)?.map((item) => (
                            <div key={item.id} className="w-45 h-80 flex flex-col items-center">
                                <div className="w-45 h-90 shadow-gray-400 shadow-xl rounded-2xl overflow-hidden transition-all transform hover:scale-105 duration-300 ease-in-out">
                                    <LazyLoadImage
                                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                        alt={item.title || item.name}
                                        className="w-full h-full object-cover"
                                        effect="blur"
                                    />
                                </div>
                                <div className="w-full h-20 flex flex-col items-center justify-center text-center">
                                    <p className="w-40 truncate font-bold text-md  break-words">{item.title || item.name}</p>
                                    <p className="font-light">{item.release_date || item.first_air_date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
