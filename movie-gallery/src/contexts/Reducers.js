import {
  ADD_MOVIES,
  CREATE_MOVIE,
  EDIT_MOVIE,
  DELETE_MOVIE,
  CREATE_COMMENT,
} from "../constants/ReducerConstants.js";

export const moviesReducer = (state, action) => {
  switch (action.type) {
    case ADD_MOVIES:
      return [...action.payload];

    case CREATE_MOVIE:
      return [action.payload, ...state];

    case EDIT_MOVIE:
      return state.map((movie) =>
        movie.id == action.payload.id ? action.payload : movie
      );

    case DELETE_MOVIE:
      return state.filter((movie) => movie.id != action.payload);
    
    default:
      return state;
  }
};
