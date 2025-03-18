import { createContext, useReducer, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { CREATE_COMMENT, ADD_MOVIE } from "../constants/ReducerConstants.js";
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

  const createHeandler = (data) => {
    commentService
      .create(data, user.accessToken)
      .then((responce) => {
        if (responce === "Bad response") {
          return navigate("/notfound");
        }
        console.log(responce);
        dispatch({
          type: CREATE_COMMENT,
          payload: responce,
        });
      })
      .catch((error) => {
        throw console.error(error);
      });
  };

  return (
    <DetailContext.Provider value={{ movie, createHeandler, detailsHandler }}>
      {children}
    </DetailContext.Provider>
  );
};
