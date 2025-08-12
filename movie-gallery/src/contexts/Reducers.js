import {
  ADD_MOVIE,
  CREATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  SET_FAVORITE_MOVIE,
  SET_PERSONAL_RATING,
  SEARCH_CHANGE,
  SELECT_CHANGE,
  SORT_CHANGE,
  TAG_CHANGE,
  CATEGORY_CHANGE,
  ITEM_PER_PAGE_CHANGE,
  CURRENT_PAGE_CHANGE,
  TOP_RATED_CHANGE,
} from "../constants/ReducerConstants.js";

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

export const filterReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_CHANGE:
      return { ...state, search: action.payload };

    case SELECT_CHANGE:
      return { ...state, select: action.payload };

    case SORT_CHANGE:
      return { ...state, sort: action.payload };

    case CATEGORY_CHANGE:
      return { ...state, category: action.payload };

    case TAG_CHANGE:
      return { ...state, tag: action.payload };

    case ITEM_PER_PAGE_CHANGE:
      return { ...state, itemsPerPage: action.payload };

    case CURRENT_PAGE_CHANGE:
      return { ...state, currentPage: action.payload };

    case TOP_RATED_CHANGE:
      return {
        search: action.payload.search,
        select: action.payload.select,
        sort: action.payload.sort,
        category: action.payload.category,
        tag: action.payload.tag,
        itemsPerPage: action.payload.itemsPerPage,
        currentPage: action.payload.currentPage,
      };

    default:
      return state;
  }
};
