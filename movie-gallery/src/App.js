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
import PageTransitionWrapper from "./component/UI/PageTransitionWrapper/PageTransitionWrapper.jsx";

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
                    <Route
                      path="/"
                      element={
                        <PageTransitionWrapper>
                          <NewMovies />
                        </PageTransitionWrapper>
                      }
                    />
                    <Route
                      path="/login"
                      element={
                        <PageTransitionWrapper>
                          <Login />
                        </PageTransitionWrapper>
                      }
                    />
                    <Route
                      path="/register"
                      element={
                        <PageTransitionWrapper>
                          <Register />
                        </PageTransitionWrapper>
                      }
                    />
                    <Route
                      path="/logout"
                      element={
                        <RouteGuard>
                          <PageTransitionWrapper>
                            <Logout />
                          </PageTransitionWrapper>
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/movies"
                      element={
                        <RouteGuard>
                          <PageTransitionWrapper>
                            <Movies />
                          </PageTransitionWrapper>
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/create"
                      element={
                        <RouteGuard>
                          <PageTransitionWrapper>
                            <ManageMovie isCreated={true} key="create" />
                          </PageTransitionWrapper>
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/favorite"
                      element={
                        <RouteGuard>
                          <PageTransitionWrapper>
                            <Favorite />
                          </PageTransitionWrapper>
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/contactus"
                      element={
                        <RouteGuard>
                          <PageTransitionWrapper>
                            <ContactUs />
                          </PageTransitionWrapper>
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/notfound"
                      element={
                        <PageTransitionWrapper>
                          <NotFound />
                        </PageTransitionWrapper>
                      }
                    />
                    <Route
                      path="/badrequest"
                      element={
                        <PageTransitionWrapper>
                          <BadRequest />
                        </PageTransitionWrapper>
                      }
                    />
                    <Route
                      path="/underconstruction"
                      element={
                        <PageTransitionWrapper>
                          <UnderConstruction />
                        </PageTransitionWrapper>
                      }
                    />
                    <Route
                      path="/movies/details/:movieId"
                      element={
                        <RouteGuard>
                          <PageTransitionWrapper>
                            <Details />
                          </PageTransitionWrapper>
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/details/video/:movieId"
                      element={
                        <RouteGuard>
                          <PageTransitionWrapper>
                            <Video />
                          </PageTransitionWrapper>
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="/movies/details/:movieId/edit"
                      element={
                        <RouteGuard>
                          <PageTransitionWrapper>
                            <ManageMovie isCreated={false} key="edit" />
                          </PageTransitionWrapper>
                        </RouteGuard>
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <PageTransitionWrapper>
                          <NotFound />
                        </PageTransitionWrapper>
                      }
                    />
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
