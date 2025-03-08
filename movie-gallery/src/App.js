import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./component/Header/Header.jsx";
import * as movieService from "./services/MoviesService.js";
import { AuthContext } from "./contexts/AuthContext.js";
import { MovieContext } from "./contexts/MovieContext.js";

import NewMovies from "./component/TopMovies/NewMovies.jsx";
import Movies from "./component/Movies/Movies.jsx";
import ContactUs from "./component/ContactUs/ContactUs.jsx";
import Scroll from "./component/Scroll.js";
import Footer from "./component/Footer/Footer.jsx";
import Login from "./component/Login/Login.jsx";
import Logout from "./component/Logout/Logout.jsx";
import Register from "./component/Register/Register.jsx";
import NotFound from "./component/ErrorPage/NotFound.jsx";
import BadRequest from "./component/ErrorPage/BadRequest.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage.js";
import CreateMovie from "./component/CreateMovie/CreateMovie.jsx";
import EditMovie from "./component/EditMovie/EditMovie.jsx";
import Details from "./component/Details/Details.jsx";
import ScrollToTop from "./services/ScrollToTop.js";
import RouteGuard from "./common/RouteGuard.js";
import Favorite from "./component/Favorite/Favorite.jsx";
import UnderConstruction from "./component/ErrorPage/UnderConstruction.jsx";

function App() {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useLocalStorage("auth", {});
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    movieService.getAll().then((result) => {
      const moviesResult = result.sort((a, b) => b.id - a.id);
      setMovies(moviesResult);
    });
  }, []);

  const loginHandler = (data) => {
    setUser(data);
  };

  const logoutHandler = () => {
    setUser({});
  };

  const createMovieHandler = () => {
    movieService.getAll().then((result) => {
      const moviesResult = result.sort((a, b) => b.id - a.id);
      setMovies(moviesResult);
    });
  };

  const detailsHandler = (movie) => {
    setMovieDetails(movie);
  };

  const editHandler = () => {
    movieService.getAll().then((result) => {
      const moviesResult = result.sort((a, b) => b.id - a.id);
      setMovies(moviesResult);
    });
  };

  const deleteHandler = (movieId) => {
    setMovies((state) => [...state.filter((m) => m.id !== movieId)]);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ user, loginHandler, logoutHandler }}>
        <ScrollToTop />
        <Header />
        <MovieContext.Provider
          value={{
            movies,
            detailsHandler,
            editHandler,
            deleteHandler,
            createMovieHandler,
          }}
        >
          <Routes>
            <Route path="/" element={<NewMovies movies={movies} />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>

            <Route
              path="/logout"
              element={
                <RouteGuard>
                  <Logout />
                </RouteGuard>
              }
            ></Route>
            <Route
              path="/movies"
              element={
                <RouteGuard>
                  <Movies />
                </RouteGuard>
              }
            ></Route>
            <Route
              path="/create"
              element={
                <RouteGuard>
                  <CreateMovie />
                </RouteGuard>
              }
            ></Route>
            <Route
              path="/favorite"
              element={
                <RouteGuard>
                  <Favorite />
                </RouteGuard>
              }
            ></Route>
            <Route
              path="/contactus"
              element={
                <RouteGuard>
                  <ContactUs />
                </RouteGuard>
              }
            ></Route>
            <Route path="/notfound" element={<NotFound />}></Route>
            <Route path="/badrequest" element={<BadRequest />}></Route>
            <Route
              path="/underconstruction"
              element={<UnderConstruction />}
            ></Route>
            <Route
              path="/movies/details/:movieId"
              element={
                <RouteGuard>
                  <Details />
                </RouteGuard>
              }
            ></Route>
            <Route
              path="/movies/details/:movieId/edit"
              element={
                <RouteGuard>
                  <EditMovie movie={movieDetails} />
                </RouteGuard>
              }
            ></Route>
          </Routes>
        </MovieContext.Provider>
        <Scroll />
        <Footer />
      </AuthContext.Provider>
    </div>
  );
}
export default App;
