import {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from "react";

import {
  ADD_MOVIES,
  CREATE_MOVIE,
  EDIT_MOVIE,
  DELETE_MOVIE,
} from "../constants/ReducerConstants.js";
import * as movieService from "../services/MoviesService.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.js";

export const MovieContext = createContext();

const movieReducer = (state, action) => {
  switch (action.type) {
    case ADD_MOVIES:
      return [...action.payload];

    case CREATE_MOVIE:
      return [action.payload, ...state];

    case EDIT_MOVIE:
      return [
        ...state.filter((movie) =>
          movie.id == action.payload.id ? action.payload : movie
        ),
      ];

    case DELETE_MOVIE:
      return [...state.filter((movie) => movie.id != action.payload)];

    default:
      return state;
  }
};

export const MovieProvider = ({ children }) => {
  const [movies, dispatch] = useReducer(movieReducer, []);
  const [movie, setMovie] = useState({});

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    movieService.getAll().then((result) => {
      if (result === "Bad response") {
        return navigate("/notfound");
      }

      const moviesResult = sortMovies(result);

      dispatch({
        type: ADD_MOVIES,
        payload: moviesResult,
      });
    });
  }, []);

  const createHandler = (movieData) => {
    movieService
      .create(movieData, user.accessToken)
      .then((result) => {
        if (result === "Bad response") {
          return navigate("/notfound");
        }

        dispatch({
          type: CREATE_MOVIE,
          payload: result,
        });
        return navigate("/movies");
      })
      .catch((error) => {
        throw console.error(error);
      });
  };

  const editHandler = (movieData) => {
    movieService
      .edit(movieData, user.accessToken)
      .then((result) => {
        if (result === "Bad response") {
          return navigate("/notfound");
        }
        dispatch({
          type: EDIT_MOVIE,
          payload: movieData,
        });

        return navigate("/movies");
      })
      .catch((error) => {
        throw console.error(error);
      });
  };

  const deleteHandler = (movieId) => {
    dispatch({
      type: DELETE_MOVIE,
      payload: movieId,
    });
  };

  const detailsHandler = (movieId) => {
    setMovie(movies.find((movie) => movie.id == movieId));
  };

  const sortMovies = (movies) => {
    return movies.sort((a, b) => b.id - a.id);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        createHandler,
        editHandler,
        deleteHandler,
        detailsHandler,
        movie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
