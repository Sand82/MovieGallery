import { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./component/Header/Header.jsx";
import * as movieService from "./services/MoviesService.js";
import { AuthProvider } from "./contexts/AuthContext.js";
import { MovieProvider, MovieContext } from "./contexts/MovieContext.js";

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
import ManageMovie from "./component/ManageMovie/ManageMovie.jsx";
import Details from "./component/Details/Details.jsx";
import ScrollToTop from "./services/ScrollToTop.js";
import RouteGuard from "./common/RouteGuard.js";
import Favorite from "./component/Favorite/Favorite.jsx";
import UnderConstruction from "./component/ErrorPage/UnderConstruction.jsx";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <MovieProvider>
          <ScrollToTop />
          <Header />
          <Routes>
            <Route path="/" element={<NewMovies />}></Route>
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
                  <ManageMovie isCreated={true}/>
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
                  <ManageMovie />
                </RouteGuard>
              }
            ></Route>
          </Routes>
          <Scroll />
          <Footer />
        </MovieProvider>
      </AuthProvider>
    </div>
  );
}
export default App;
