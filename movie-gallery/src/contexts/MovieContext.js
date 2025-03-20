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
} from "../constants/ReducerConstants.js";
import * as movieService from "../services/MoviesService.js";
import * as commentService from "../services/CommentService.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.js";
import { moviesReducer } from "./Reducers.js";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, dispatch] = useReducer(moviesReducer, []); 
  const [favMovies, setFavMovies] = useState([]); 

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
      .then((responce) => {
        if (responce === "Bad response") {
          return navigate("/badrequest");
        }

        dispatch({
          type: CREATE_MOVIE,
          payload: responce,
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
      .then((responce) => {
        if (responce === "Bad response") {
          return navigate("/badrequest");
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
    movieService
      .remove(movieId, user.accessToken)
      .then((result) => {
        if (result === "Bad response") {
          return navigate("/badrequest");
        }

        dispatch({
          type: DELETE_MOVIE,
          payload: movieId,
        });

        navigate("/movies");
      })
      .catch((error) => {
        throw console.error(error);
      });
  };

  const favoritesHandler = (userId) => {
    commentService.getFavoriteMovies(userId)
    .then((result) => {       
        if (result === 'Bad response') {
          return navigate('/notfound');
        }
        console.log(result);
        setFavMovies( result);               
      })
      .catch((error) => {
        throw console.error(error);
      });
  }
  
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
        favoritesHandler,
        favMovies,            
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
