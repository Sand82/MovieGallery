import { useState, useEffect, createContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import * as movieService from "../services/MoviesService.js";
import * as detailsService from "../services/DetailsService.js";
import { badRequestStatusCode } from "../constants/GlobalConstants.js";

export const TypesMoviesContext = createContext();

export const TypesMoviesProvider = ({ children }) => {
  const [favMovies, setFavMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);
  const [serverErrors, setServerErrors] = useState(null);

  const navigate = useNavigate();

  const serverErrorsHandler = useCallback(
    (error) => {
      if (error.message.includes(badRequestStatusCode)) {
        navigate("/badrequest");
      } else {
        setServerErrors(error.message);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const getLates = async () => {
      setServerErrors(null);
      try {
        const responce = await movieService.getLates();
        setLatestMovies(responce);
      } catch (error) {
        serverErrorsHandler(error);
      }
    };
    getLates();
  }, []);

  useEffect(() => {
    const getTopRated = async () => {
      setServerErrors(null);
      try {
        const responce = await movieService.getTopRated();
        setTopRatedMovies(responce);
      } catch (error) {
        serverErrorsHandler(error);
      }
    };
    getTopRated();
  }, []);

  const favoritesHandler = async (userId) => {
    setServerErrors(null);
    try {
      let responce = await detailsService.getFavoriteMovies(userId);
      setFavMovies(responce);
    } catch (error) {
      serverErrorsHandler(error);
    }
  };

  return (
    <TypesMoviesContext.Provider
      value={{ favMovies, topRatedMovies, latestMovies, favoritesHandler, serverErrors }}
    >
      {children}
    </TypesMoviesContext.Provider>
  );
};
