import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./component/Header/Header.js";
import * as movieService from "./services/MoviesService.js";
import { AuthContext } from "./context/AuthContext.js";

import NewMovies from "./component/TopMovies/NewMovies.js";
import Movies from "./component/Movies/Movies.js";
import ContactUs from "./component/ContactUs/ContactUs.js";
import Scroll from "./component/Scroll.js";
import Footer from "./component/Footer/Footer.js";
import Login from "./component/Login/Login.js";
import Logout from "./component/Logout/Logout.js";
import Register from "./component/Register/Register.js";
import NotFound from "./component/ErrorPage/NotFound.js";
import BadRequest from "./component/ErrorPage/BadRequest.js";
import {useLocalStorage} from './hooks/useLocalStorage.js'

function App() {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useLocalStorage('auth', {});

  useEffect(() => {
    movieService.getAll().then((result) => {
      setMovies(result);
    });
  }, []);

  const loginHandler = (data) => {
        setUser(data);
  }

  const logoutHandler = () => {
    setUser({});
  }

  const firstFiveMovies = movies.sort((a, b) => b.id - a.id).slice(0, 4);

  return (
    <div className="App">
      <AuthContext.Provider value={{user, loginHandler, logoutHandler}}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<NewMovies movies={firstFiveMovies} />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/Logout" element={<Logout />}></Route>
          <Route path="/movies" element={<Movies movies={movies} />}></Route>
          <Route path="/contactus" element={<ContactUs />}></Route>
          <Route path="/notfound" element={<NotFound />}></Route>
          <Route path="/badrequest" element={<BadRequest />}></Route>
          {/* <Route path='/details' element={<Details/>}></Route>         */}
        </Routes>

        <Scroll />
        <Footer />
      </AuthContext.Provider>
    </div>
  );
}
export default App;
