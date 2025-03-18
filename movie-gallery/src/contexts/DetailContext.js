import { createContext, useReducer, useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  CREATE_COMMENT,
  ADD_MOVIE,
  EDIT_COMMENT,
} from "../constants/ReducerConstants.js";
import * as commentService from "../services/CommentService.js";
import { AuthContext } from "./AuthContext.js";
import * as movieService from "../services/MoviesService.js";

export const DetailContext = createContext();

const detailReducer = (state, action) => {
  switch (action.type) {
    case ADD_MOVIE:
      return action.payload;

    case CREATE_COMMENT:
      return { ...state, comments: [...state.comments, action.payload] };

    case EDIT_COMMENT:
      return {
        ...state,
        comments: state.comments.map((comment) =>
          comment.id == action.payload.id ? action.payload : comment
        ),
      };

    default:
      return state;
  }
};

export const DetailProvider = ({ children }) => {
  const [movie, dispatch] = useReducer(detailReducer, []);
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const detailsHandler = (movieId) => {
    movieService
      .getOne(movieId, user.AccessToken)
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

  return (
    <DetailContext.Provider
      value={{
        movie,
        createCommentHandler,
        editCommentHandler,
        detailsHandler,
      }}
    >
      {children}
    </DetailContext.Provider>
  );
};
