import React from 'react'; 
import "./App.css";
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import PopularMovies from './pages/PopularMovies';
import PopularTvShows from './pages/PopularTvShows';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <>
        <Navbar />
        <Routes>
            <Route path='/' element={<Content/>}/>
            <Route path='/popular/movies' element={<PopularMovies />} />
            <Route path="/popular/tv" element={<PopularTvShows />} />
        </Routes>
        <Footer />
    </>
  );
}

export default App;
