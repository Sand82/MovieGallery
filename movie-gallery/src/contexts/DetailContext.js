import { createContext, useReducer, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as movieService from "../services/MoviesService.js";
import * as detailsService from "../services/DetailsService.js";
import {
  CREATE_COMMENT,
  ADD_MOVIE,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SET_FAVORITE_MOVIE,
  SET_PERSONAL_RATING,
} from "../constants/ReducerConstants.js";
import { badRequestStatusCode } from "../constants/GlobalConstants.js";
import { AuthContext } from "./AuthContext.js";
import { detailReducer } from "./Reducers.js";

export const DetailContext = createContext();

export const DetailProvider = ({ children }) => {
  const [movie, dispatch] = useReducer(detailReducer, []);
  const [serverErrors, setServerErrors] = useState(null);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const detailsHandler = async (movieId, userId) => {
    setServerErrors(null);
    try {
      const responce = await movieService.getOne(
        movieId,
        userId,
        user.AccessToken
      );
      dispatch({
        type: ADD_MOVIE,
        payload: responce,
      });
    } catch (error) {
      serverErrorsHandler(error);
    }
  };

  const createCommentHandler = async (data) => {
    setServerErrors(null);
    try {
      const responce = await detailsService.createComment(
        data,
        user.accessToken
      );
      dispatch({
        type: CREATE_COMMENT,
        payload: responce,
      });
    } catch (error) {
      serverErrorsHandler(error);
    }
  };

  const editCommentHandler = async (editedComment, comment) => {
    setServerErrors(null);
    comment.comment = editedComment;
    try {
      await detailsService.editComment(comment, user.accessToken);
      dispatch({
        type: EDIT_COMMENT,
        payload: comment,
      });
    } catch (error) {
      serverErrorsHandler(error);
    }
  };

  const daleteCommentHandler = async (commentId) => {
    setServerErrors(null);
    try {
      await detailsService.removeComment(commentId, user.accessToken);
      dispatch({
        type: DELETE_COMMENT,
        payload: commentId,
      });
    } catch (error) {
      serverErrorsHandler(error);
    }
  };

  const favoriteMovieHandler = async (data) => {
    setServerErrors(null);
    try {
      await detailsService.addFavorite(data, user.accessToken);
      dispatch({
        type: SET_FAVORITE_MOVIE,
        payload: data,
      });
    } catch (error) {
      serverErrorsHandler(error);
    }
  };

  const movieRatingHandler = async (data) => {
    setServerErrors(null);
    try {
      let responce = await detailsService.addRating(data, user.accessToken);
      dispatch({
        type: SET_PERSONAL_RATING,
        payload: responce,
      });
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
    <DetailContext.Provider
      value={{
        movie,
        createCommentHandler,
        editCommentHandler,
        daleteCommentHandler,
        detailsHandler,
        favoriteMovieHandler,
        movieRatingHandler,
        serverErrors,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
};
