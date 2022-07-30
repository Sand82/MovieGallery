import { useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';

import Header from './component/Header/Header.js';
import * as movieService from './services/MoviesService.js'

import NewMovies from './component/TopMovies/NewMovies.js';
import Movies from './component/Movies/Movies.js';
import ContactUs from './component/ContactUs/ContactUs.js'
import Scroll from './component/Scroll.js';
import Footer from './component/Footer/Footer.js';
import Login from './component/Login/Login.js';
import Register from './component/Register/Register.js';
import Details from './component/Details/Details.js';


function App() {

  const [movies, setMovies] = useState([])

    useEffect(() => {
      movieService.getAll()
       .then(result => {
        setMovies(result)
       })
    }, []) 

    const firstFiveMovies = movies.sort((a, b) => b.id - a.id).slice(0, 4);

  return (
    <div className="App"> 
      <Header/>
      <Routes>
        <Route path='/' element={<NewMovies movies={firstFiveMovies} />}></Route>        
        <Route path='/login' element={<Login />}></Route>        
        <Route path='/register' element={<Register />}></Route>        
        <Route path='/movies' element={<Movies movies={movies}/>}></Route>        
        <Route path='/contactus' element={<ContactUs/>}></Route>        
        {/* <Route path='/details' element={<Details/>}></Route>         */}
      </Routes> 
      
      <Scroll/>   
      <Footer/> 
    </div>
  );
}
export default App;
