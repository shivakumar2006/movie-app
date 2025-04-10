import React from 'react'; 
import "./App.css";
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
        <Navbar />
        <Content/>
        <Footer />
    </>
  );
}

export default App;
