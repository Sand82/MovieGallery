import { createContext, useReducer } from "react";

import {
  SEARCH_CHANGE,
  SELECT_CHANGE,
  SORT_CHANGE,
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
    itemsPerPage: 5,
    currentPage: 1,
  });

  const searchHandler = (search) => {
    dispatch({
      type: SEARCH_CHANGE,
      payload: search,
    });
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

  const itemsPerPageHandler = (itemsPerPage) => {
    dispatch({
      type: ITEM_PER_PAGE_CHANGE,
      payload: itemsPerPage,
    });
  };

  const currentPageHandler = (currentPage) => {
    dispatch({
      type: CURRENT_PAGE_CHANGE,
      payload: currentPage,
    });
  };

  const topRatedMovieHandler = () => {
    dispatch({
      type: TOP_RATED_CHANGE,
      payload: {
        search: "",
        select: SELECT_RATING,
        sort: "desc",
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
        itemsPerPageHandler,
        currentPageHandler,
        topRatedMovieHandler,
      }}
    >
      {children}
    </FilterCotntext.Provider>
  );
};
