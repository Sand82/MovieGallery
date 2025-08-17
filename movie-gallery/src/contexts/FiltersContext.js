import { createContext, useReducer } from "react";

import {
  SEARCH_CHANGE,
  SELECT_CHANGE,
  SORT_CHANGE,
  CATEGORY_CHANGE,
  TAG_CHANGE,
  RESET_CHANGE,
  ITEM_PER_PAGE_CHANGE,
  CURRENT_PAGE_CHANGE,
  TOP_RATED_CHANGE,
} from "../constants/ReducerConstants.js";
import { SELECT_RATING } from "../constants/SelectConstants.js";
import { filterReducer } from "./Reducers.js";

export const FilterCotntext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, dispatch] = useReducer(filterReducer, {
    search: "",
    select: "All",
    sort: "desc",
    category: "",
    tag: "",
    itemsPerPage: 5,
    currentPage: 1,
  });

  const searchHandler = (search) => {    
    dispatch({
      type: SEARCH_CHANGE,
      payload: search,
    });
    currentPageHandler(1);
  };

  const selectHandler = (select) => {    
    dispatch({
      type: SELECT_CHANGE,
      payload: select,
    });
  };

  const sortHandler = (sort) => {    
    dispatch({
      type: SORT_CHANGE,
      payload: sort,
    });
  };

  const categoryHandler = (category) => {    
    dispatch({
      type: CATEGORY_CHANGE,
      payload: category,
    });
  };

  const tagHandler = (tag) => {    
    dispatch({
      type: TAG_CHANGE,
      payload: tag,
    });
    currentPageHandler(1);
  };

  const itemsPerPageHandler = (itemsPerPage) => {   
    dispatch({
      type: ITEM_PER_PAGE_CHANGE,
      payload: itemsPerPage,
    });
    currentPageHandler(1);
  };

  const currentPageHandler = (currentPage) => {    
    dispatch({
      type: CURRENT_PAGE_CHANGE,
      payload: currentPage,
    });
  };

  const resetHandler = () => {    
    dispatch({
      type: RESET_CHANGE,
      payload: {
        search: "",
        sort: "desc",
        category: "",
        tag: "",
        itemsPerPage: 5,
        currentPage: 1,
      },
    });
  };

  const topRatedMovieHandler = () => {    
    dispatch({
      type: TOP_RATED_CHANGE,
      payload: {
        search: "",
        select: SELECT_RATING,
        sort: "desc",
        category: "",
        tag: "",
        itemsPerPage: 5,
        currentPage: 1,
      },
    });
  };

  return (
    <FilterCotntext.Provider
      value={{
        filters,
        searchHandler,
        selectHandler,
        sortHandler,
        categoryHandler,
        tagHandler,
        resetHandler,
        itemsPerPageHandler,
        currentPageHandler,
        topRatedMovieHandler,
      }}
    >
      {children}
    </FilterCotntext.Provider>
  );
};
