import {
  ADD_MOVIES,
  CREATE_MOVIE,
  EDIT_MOVIE,
  DELETE_MOVIE,  
  ADD_MOVIE,
  CREATE_COMMENT,
  EDIT_COMMENT, 
  DELETE_COMMENT,
  SET_FAVORITE_MOVIE
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

export const detailReducer = (state, action) => {
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

    case DELETE_COMMENT:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id != action.payload
        ),
      };

    case SET_FAVORITE_MOVIE:
      return {
        ...state,
        isFavorite: action.payload.isFavorite         
      };

    default:
      return state;
  }
};
