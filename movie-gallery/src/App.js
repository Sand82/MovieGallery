import { useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';

import Header from './component/Header.js';
import * as movieService from './services/MoviesService.js'

import NewMovies from './component/TopMovies/NewMovies.js';
import Movies from './component/Movies/Movies.js';
import ComingSoonMovies from './component/ComingSoonMovies.js';
import TopRatedMovies from './component/TopRatedMovies.js';
import ContactUs from './component/ContactUs.js';
import Scroll from './component/Scroll.js';
import Footer from './component/Footer.js';


function App() {

  const [movies, setMovies] = useState([])

    useEffect(() => {
      movieService.getAll()
       .then(result => {
        setMovies(result)
       })
    }, []) 

    const firstFiveMovies = movies.sort((a, b) => b.id - a.id).slice(0, 5);

  return (
    <div className="App"> 
      <Header/>
      <Routes>
        <Route path='/' element={<NewMovies movies={firstFiveMovies} />}></Route>        
        <Route path='/movies' element={<Movies movies={movies}/>}></Route>
        <Route path='/comingsoon' element={<ComingSoonMovies/>}></Route>
        <Route path='/toprated' element={<TopRatedMovies/>}></Route>
        <Route path='/contactus' element={<ContactUs/>}></Route>        
      </Routes> 
      
      <Scroll/>   
      <Footer/> 
    </div>
  );
}
export default App;
