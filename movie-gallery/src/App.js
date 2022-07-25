import {Routes, Route} from 'react-router-dom';

import Header from './component/Header.js';

import NewMovies from './component/NewMovies.js';
import Movies from './component/Movies/Movies.js';
import ComingSoonMovies from './component/ComingSoonMovies.js';
import TopRatedMovies from './component/TopRatedMovies.js';
import ContactUs from './component/ContactUs.js';
import Scroll from './component/Scroll.js';
import Footer from './component/Footer.js';

function App() {
  return (
    <div className="App"> 
      <Header/>
      <Routes>
        <Route path='/' element={<NewMovies />}></Route>        
        <Route path='/movies' element={<Movies/>}></Route>
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
