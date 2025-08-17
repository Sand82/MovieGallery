import { useNavigate } from "react-router-dom";

import * as movieService from "../services/MoviesService.js";
import {
  createContext,
  useEffect,
  useContext,
  useState,
  useCallback,
} from "react";
import { AuthContext } from "./AuthContext.js";
import { badRequestStatusCode } from "../constants/GlobalConstants.js";
import { FilterCotntext } from "./FiltersContext.js";

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [moviesCount, setMoviesCount] = useState(0);

  const [serverErrors, setServerErrors] = useState(null);
  const { filters } = useContext(FilterCotntext);

  const { user } = useContext(AuthContext);
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
    const getAllMovies = async () => {
      setServerErrors(null);
      try {
        const responce = await movieService.getAll(filters);
        setMovies(responce.movies);
        setMoviesCount(responce.count);
      } catch (error) {
        serverErrorsHandler(error);
      }
    };
    getAllMovies();
  }, [filters]);

  const createHandler = async (movieData, file) => {
    setServerErrors(null);
    try {
      await movieService.create(movieData, user.accessToken, file);
      navigate("/movies");
    } catch (error) {
      serverErrorsHandler(error);
    }
  };

  const editHandler = async (movieData, file) => {
    setServerErrors(null);
    try {
      await movieService.edit(movieData, user.accessToken, file);
      navigate("/movies");
    } catch (error) {
      serverErrorsHandler(error);
    }
  };

  const deleteHandler = async (movieId) => {
    setServerErrors(null);
    try {
      await movieService.remove(movieId, user.accessToken);
      navigate("/movies");
    } catch (error) {
      serverErrorsHandler(error);
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        createHandler,
        editHandler,
        deleteHandler,
        moviesCount,
        serverErrors,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
