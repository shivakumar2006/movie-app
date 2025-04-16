import React, { useEffect, lazy, Suspense } from 'react'; 
import "./App.css";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { supabase } from './supabase';

// Lazy loaded components
const Navbar = lazy(() => import('./components/Navbar'));
const Content = lazy(() => import('./components/Content'));
const Footer = lazy(() => import('./components/Footer'));
const PopularMovies = lazy(() => import('./pages/PopularMovies'));
const PopularTvShows = lazy(() => import('./pages/PopularTvShows'));
const PopularPeople = lazy(() => import('./pages/PopularPeople'));
const PersonDetail = lazy(() => import('./pages/PersonDetail'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));
const TvShowDetail = lazy(() => import('./pages/TvShowDetail'));
const NowPlaying = lazy(() => import('./pages/NowPlaying'));
const TopRated = lazy(() => import('./pages/TopRated'));
const AiringToday = lazy(() => import('./pages/AiringToday'));
const OnTv = lazy(() => import('./pages/OnTv'));
const TopRatedTvShow = lazy(() => import('./pages/TopRatedTvShow'));
const Search = lazy(() => import('./pages/Search'));
const Authentication = lazy(() => import('./pages/Authentication'));
const Profile = lazy(() => import('./pages/Profile'));
const Upcoming = lazy(() => import('./pages/Upcoming.jsx'));

const App = () => {
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();
  const location = useLocation(); 

  // Check if the user is authenticated and redirect to the movie page if needed
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;
      if (session && location.pathname === "/") {
        navigate("/movie");
      }
    };
    checkSession();
  }, [navigate, location]);

  const hideLayout = location.pathname === "/"; // Authentication page

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path='/' element={<Authentication />} />
        <Route path='/movie' element={<Content />} />
        <Route path='/popular/movies' element={<PopularMovies />} />
        <Route path='/popular/tv' element={<PopularTvShows />} />
        <Route path='/popularpeople' element={<PopularPeople />} />
        <Route path='/person/:personId' element={<PersonDetail />} />
        <Route path='/movie/:movieId' element={<MovieDetail />} />
        <Route path='/tv/:tvShowId' element={<TvShowDetail />} />
        <Route path='/nowplaying' element={<NowPlaying />} />
        <Route path='/upcoming' element={<Upcoming />} />
        <Route path='/toprated' element={<TopRated />} />
        <Route path='/airingtoday' element={<AiringToday />} />
        <Route path='/ontv' element={<OnTv />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='/tv/toprated' element={<TopRatedTvShow />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>

      {!hideLayout && <Footer />}
    </Suspense>
  );
};

export default App;