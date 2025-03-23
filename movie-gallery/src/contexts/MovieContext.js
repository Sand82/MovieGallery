import { useNavigate } from "react-router-dom";

import * as movieService from "../services/MoviesService.js";
import * as commentService from "../services/DetailsService.js";
import {
  createContext,
  useEffect,
  useReducer,
  useContext,
  useState,
} from "react";

import {
  ADD_MOVIES,
  CREATE_MOVIE,
  EDIT_MOVIE,
  DELETE_MOVIE,
  SET_AVARAGE_RATING,
} from "../constants/ReducerConstants.js";
import { AuthContext } from "./AuthContext.js";
import { moviesReducer } from "./Reducers.js";
import { badRequestStatusCode } from "../constants/GlobalConstants.js";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, dispatch] = useReducer(moviesReducer, []);
  const [favMovies, setFavMovies] = useState([]);
  const [serverErrors, setServerErrors] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getAllMovies = async () => {
      setServerErrors(null);
      try {
        const responce = await movieService.getAll();
        const sortedMovies = sortMovies(responce);
        dispatch({
          type: ADD_MOVIES,
          payload: sortedMovies,
        });
      } catch (error) {
        serverErrorsHandler(error);
      }
    };
    getAllMovies();
  }, []);

  const createHandler = async (movieData) => {
    setServerErrors(null);
    try {
      const responce = await movieService.create(movieData, user.accessToken);
      dispatch({
        type: CREATE_MOVIE,
        payload: responce,
      });
      navigate("/movies");
    } catch (error) {
      serverErrorsHandler(error);
    }
  };

  const editHandler = async (movieData) => {
    setServerErrors(null);
    try {
      await movieService.edit(movieData, user.accessToken);
      dispatch({
        type: EDIT_MOVIE,
        payload: movieData,
      });
      navigate("/movies");
    } catch (error) {
      serverErrorsHandler(error);
    }
  };

  const deleteHandler = async (movieId) => {
    setServerErrors(null);
    try {
      await movieService.remove(movieId, user.accessToken);
      dispatch({
        type: DELETE_MOVIE,
        payload: movieId,
      });
      navigate("/movies");
    } catch (error) {
      serverErrorsHandler(error);
    }
  };

  const favoritesHandler = async (userId) => {
    setServerErrors(null);
    try {
      let responce = await commentService.getFavoriteMovies(userId);
      setFavMovies(responce);
    } catch (error) {
      serverErrorsHandler(error);
    }
  };

  const avarageRatingHandler = (data) => {
    dispatch({
      type: SET_AVARAGE_RATING,
      payload: data,
    });
  };

  const sortMovies = (movies) => {
    return movies.sort((a, b) => b.id - a.id);
  };

  const serverErrorsHandler = (error) => {
    if (error.message.includes(badRequestStatusCode)) {
      navigate("/badrequest");
    } else {
      setServerErrors(error.message);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        favMovies,
        createHandler,
        editHandler,
        deleteHandler,
        favoritesHandler,
        avarageRatingHandler,
        serverErrors,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
