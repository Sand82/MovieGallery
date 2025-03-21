import {
  ADD_MOVIES,
  CREATE_MOVIE,
  EDIT_MOVIE,
  DELETE_MOVIE,
  ADD_MOVIE,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SET_FAVORITE_MOVIE,
  SET_PERSONAL_RATING,
  SET_AVARAGE_RATING,
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

    case SET_AVARAGE_RATING:
      let selectedMovie = state.find(
        (movie) => movie.id == action.payload.movieId
      );
      selectedMovie.averageRating = action.payload.averageRating;

      return state.map((movie) =>
        movie.id == action.payload.movieId ? selectedMovie : movie
      );

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
        isFavorite: action.payload.isFavorite,
      };

    case SET_PERSONAL_RATING:
      return {
        ...state,
        personalRating: action.payload.value,
        averageRating: action.payload.averageRating,
      };

    default:
      return state;
  }
};
