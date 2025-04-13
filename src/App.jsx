import React from 'react'; 
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
import UpComing from './pages/Upcoming';
import TopRated from './pages/TopRated';
import AiringToday from './pages/AiringToday';
import OnTv from './pages/OnTv';
import TopRatedTvShow from './pages/TopRatedTvShow';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
        <Navbar />
        <Routes>
            <Route path='/' element={<Content/>}/>
            <Route path='/popular/movies' element={<PopularMovies />} />
            <Route path="/popular/tv" element={<PopularTvShows />} />
            <Route path='/popularpeople' element={<PopularPeople />}/>
            <Route path='/person/:personId' element={<PersonDetail />}/>
            <Route path='/movie/:movieId' element={<MovieDetail />}/>
            <Route path='/tv/:tvShowId' element={<TvShowDetail />}/>
            <Route path='/nowplaying' element={<NowPlaying />}/>
            <Route path='/upcoming' element={<UpComing />}/>
            <Route path='/toprated' element={<TopRated />}/>
            <Route path='/airingtoday' element={<AiringToday />}/>
            <Route path='/ontv' element={<OnTv />}/>
            <Route path='/tv/toprated' element={<TopRatedTvShow />}/>
        </Routes>
        <Footer />
    </>
  );
}

export default App;
