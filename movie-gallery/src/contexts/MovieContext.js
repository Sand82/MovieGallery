import { createContext, useState, useEffect } from "react";

import * as movieService from "../services/MoviesService.js";

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [movieDetails, setMovieDetails] = useState({});
  const [movie, setMovie] = useState({});

  useEffect(() => {
    movieService.getAll().then((result) => {
      const moviesResult = result.sort((a, b) => b.id - a.id);
      setMovies(moviesResult);
    });
  }, []);

  const createHandler = () => {
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

  const selectMovieHeandler = (movie) => {
    setMovie(movie);
  };  

  return (
    <MovieContext.Provider
      value={{
        movies,
        detailsHandler,
        editHandler,
        deleteHandler,
        createHandler,
        movieDetails,
        selectMovieHeandler,
        movie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
