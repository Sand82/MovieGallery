import { useNavigate } from "react-router-dom";

import * as movieService from "../services/MoviesService.js";
import * as commentService from "../services/DetailsService.js";
import {
  createContext,
  useEffect,  
  useContext,
  useState,
} from "react";
import { AuthContext } from "./AuthContext.js";
import { badRequestStatusCode } from "../constants/GlobalConstants.js";
import { FilterCotntext } from "./FiltersContext.js";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {  
  const [movies, setMovies] = useState([]);
  const [favMovies, setFavMovies] = useState([]);
  const [serverErrors, setServerErrors] = useState(null);
  const [moviesCount, setMoviesCount] = useState(0);
  const { filters } = useContext(FilterCotntext);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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

  const createHandler = async (movieData) => {
    setServerErrors(null);
    try {
      await movieService.create(movieData, user.accessToken);      
      navigate("/movies");
    } catch (error) {
      serverErrorsHandler(error);
    }
  };

  const editHandler = async (movieData) => {
    setServerErrors(null);
    try {
      await movieService.edit(movieData, user.accessToken);      
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

  const favoritesHandler = async (userId) => {
    setServerErrors(null);
    try {
      let responce = await commentService.getFavoriteMovies(userId);
      setFavMovies(responce);
    } catch (error) {
      serverErrorsHandler(error);
    }
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
        moviesCount,
        serverErrors,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
