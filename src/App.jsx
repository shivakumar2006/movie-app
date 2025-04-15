import React, { useEffect } from 'react'; 
import "./App.css";
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import PopularMovies from './pages/PopularMovies';
import PopularTvShows from './pages/PopularTvShows';
import PopularPeople from './pages/PopularPeople';
import PersonDetail from './pages/PersonDetail';
import MovieDetail from './pages/MovieDetail';
import TvShowDetail from './pages/TvShowDetail';
import NowPlaying from './pages/NowPlaying';
import TopRated from './pages/TopRated';
import AiringToday from './pages/AiringToday';
import OnTv from './pages/OnTv';
import TopRatedTvShow from './pages/TopRatedTvShow';
import Search from './pages/Search';
import Authentication from './pages/Authentication';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Profile from './pages/Profile';
import Upcoming from './pages/Upcoming';
import { supabase } from './supabase';

const App = () => {

    const theme = useSelector((state) => state.theme.theme)

    const navigate = useNavigate();
    const location = useLocation(); 
    
    // check if the user is authenticate and redirect to the content page...
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession();
            const session = data?.session; // use optional changing to prevent errors
            if(session && location.pathname === "/") {
                navigate("/movie");
            }
        }
            checkSession();
    }, [navigate, location])

    const hideLayout = location.pathname === "/"; // authentication page

    useEffect(() => {
        document.body.className = theme;
    }, [theme])

  return (
    <>
        { !hideLayout && <Navbar /> }
        <Routes>
            <Route path='/' element={<Authentication />}/>
            <Route path='/movie' element={<Content/>}/>
            <Route path='/popular/movies' element={<PopularMovies />} />
            <Route path="/popular/tv" element={<PopularTvShows />} />
            <Route path='/popularpeople' element={<PopularPeople />}/>
            <Route path='/person/:personId' element={<PersonDetail />}/>
            <Route path='/movie/:movieId' element={<MovieDetail />}/>
            <Route path='/tv/:tvShowId' element={<TvShowDetail />}/>
            <Route path='/nowplaying' element={<NowPlaying />}/>
            <Route path='/upcoming' element={<Upcoming />}/>
            <Route path='/toprated' element={<TopRated />}/>
            <Route path='/airingtoday' element={<AiringToday />}/>
            <Route path='/ontv' element={<OnTv />}/>
            <Route path='/search/:query' element={<Search />}/>
            <Route path='/tv/toprated' element={<TopRatedTvShow />}/>
            <Route path='/profile' element={<Profile />}/>
        </Routes>
        { !hideLayout && <Footer /> }
    </>
  );
}

export default App;
