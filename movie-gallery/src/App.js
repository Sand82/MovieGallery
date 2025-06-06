import { Routes, Route } from "react-router-dom";

import Header from "./component/Header/Header.jsx";
import { AuthProvider } from "./contexts/AuthContext.js";
import { MovieProvider } from "./contexts/MovieContext.js";
import { DetailProvider } from "./contexts/DetailContext.js";
import { FilterProvider } from "./contexts/FiltersContext.js";
import { StaticDataProvider } from "./contexts/StaticDataContext.js";

import NewMovies from "./component/TopMovies/NewMovies.jsx";
import Movies from "./component/Movies/Movies.jsx";
import ContactUs from "./component/ContactUs/ContactUs.jsx";
import Footer from "./component/Footer/Footer.jsx";
import Login from "./component/Login/Login.jsx";
import Logout from "./component/Logout/Logout.jsx";
import Register from "./component/Register/Register.jsx";
import NotFound from "./component/ErrorsPage/NotFound.jsx";
import BadRequest from "./component/ErrorsPage/BadRequest.jsx";
import ManageMovie from "./component/ManageMovie/ManageMovie.jsx";
import Details from "./component/Details/Details.jsx";
import RouteGuard from "./services/RouteGuard.js";
import Favorite from "./component/Favorite/Favorite.jsx";
import UnderConstruction from "./component/ErrorsPage/UnderConstruction.jsx";
import Video from "./component/UI/Video/Video.jsx";
import AutoScroll from "./component/AutoScroll/AutoScroll.jsx";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <FilterProvider>
          <MovieProvider>
            <DetailProvider>
              <StaticDataProvider>
                <AutoScroll>
                  <Header />
                  <Routes>
                    <Route path="/" element={<NewMovies />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                      path="/logout"
                      element={
                        <RouteGuard>
                          <Logout />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/movies"
                      element={
                        <RouteGuard>
                          <Movies />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/create"
                      element={
                        <RouteGuard>
                          <ManageMovie isCreated={true} key="create" />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/favorite"
                      element={
                        <RouteGuard>
                          <Favorite />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/contactus"
                      element={
                        <RouteGuard>
                          <ContactUs />
                        </RouteGuard>
                      }
                    />
                    <Route path="/notfound" element={<NotFound />} />
                    <Route path="/badrequest" element={<BadRequest />} />
                    <Route
                      path="/underconstruction"
                      element={<UnderConstruction />}
                    />
                    <Route
                      path="/movies/details/:movieId"
                      element={
                        <RouteGuard>
                          <Details />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/details/video/:movieId"
                      element={
                        <RouteGuard>
                          <Video />
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/movies/details/:movieId/edit"
                      element={
                        <RouteGuard>
                          <ManageMovie isCreated={false} key="edit" />
                        </RouteGuard>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </AutoScroll>
              </StaticDataProvider>
            </DetailProvider>
          </MovieProvider>
        </FilterProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
