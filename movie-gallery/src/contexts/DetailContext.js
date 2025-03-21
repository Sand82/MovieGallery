import { createContext, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  CREATE_COMMENT,
  ADD_MOVIE,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SET_FAVORITE_MOVIE,
  SET_PERSONAL_RATING,
} from "../constants/ReducerConstants.js";
import * as commentService from "../services/CommentService.js";
import { AuthContext } from "./AuthContext.js";
import { MovieContext } from "./MovieContext.js";
import * as movieService from "../services/MoviesService.js";
import { detailReducer } from "./Reducers.js";

export const DetailContext = createContext();

export const DetailProvider = ({ children }) => {
  const [movie, dispatch] = useReducer(detailReducer, []);
  const { user } = useContext(AuthContext);
  const { avarageRatingHandler } = useContext(MovieContext);

  const navigate = useNavigate();

  const detailsHandler = (movieId, userId) => {
    movieService
      .getOne(movieId, userId, user.AccessToken)
      .then((responce) => {
        if (responce === "Bad response") {
          return navigate("/badrequest");
        }

        dispatch({
          type: ADD_MOVIE,
          payload: responce,
        });
      })
      .catch((error) => {
        throw console.error(error);
      });
  };

  const createCommentHandler = (data) => {
    commentService
      .create(data, user.accessToken)
      .then((responce) => {
        if (responce === "Bad response") {
          return navigate("/notfound");
        }

        dispatch({
          type: CREATE_COMMENT,
          payload: responce,
        });
      })
      .catch((error) => {
        throw console.error(error);
      });
  };

  const editCommentHandler = (editedComment, comment) => {
    comment.comment = editedComment;
    commentService
      .edit(comment, user.accessToken)
      .then((result) => {
        if (result === "Bad response") {
          return navigate("/notfound");
        }

        dispatch({
          type: EDIT_COMMENT,
          payload: comment,
        });
      })
      .catch((error) => {
        throw console.error(error);
      });
  };

  const daleteCommentHandler = (commentId) => {
    commentService
      .remove(commentId, user.accessToken)
      .then((result) => {
        if (result === "Bad response") {
          return navigate("/notfound");
        }

        dispatch({
          type: DELETE_COMMENT,
          payload: commentId,
        });
      })
      .catch((error) => {
        throw console.error(error);
      });
  };

  const favoriteMovieHandler = (data) => {
    commentService
      .addFavorite(data, user.accessToken)
      .then((result) => {
        if (result === "Bad response") {
          return navigate("/notfound");
        }
        dispatch({
          type: SET_FAVORITE_MOVIE,
          payload: data,
        });
      })
      .catch((error) => {
        throw console.error(error);
      });
  };

  const movieRatingHandler = (data) => {
    commentService
      .addRating(data, user.accessToken)
      .then((result) => {
        if (result === "Bad response") {
          return navigate("/notfound");
        }
        avarageRatingHandler(result);
        dispatch({
          type: SET_PERSONAL_RATING,
          payload: result,
        });
      })
      .catch((error) => {
        throw console.error(error);
      });
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
      }}
    >
      {children}
    </DetailContext.Provider>
  );
};
