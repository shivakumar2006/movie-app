import React from 'react'; 
import "./App.css";
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import PopularMovies from './pages/PopularMovies';
import PopularTvShows from './pages/PopularTvShows';
import PopularPeople from './pages/PopularPeople';
import PersonDetail from './pages/PersonDetail';
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
        </Routes>
        <Footer />
    </>
  );
}

export default App;
