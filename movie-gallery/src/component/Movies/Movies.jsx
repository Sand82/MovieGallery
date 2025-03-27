import { useContext, useEffect, useState } from "react";
import styles from "./Movies.module.css";

import * as helperService from "../../services/HelperService.js";
import Search from "../Search/Search.jsx";
import MovieCard from "./MovieCard/MovieCard.jsx";
import Pagination from "../UI/Pagination/Pagination.jsx";
import { MovieContext } from "../../contexts/MovieContext.js";

const Movies = () => {
  const { movies, moviesCount, paginationHandler } = useContext(MovieContext);   
  const [paginationUtils, setPaginationUtils] = useState({ itemsPerPage: 5, currentPage: 1})

  const itemsPerPageHandler = (e) => { 
    let currentItemPerPage = e.target.value; 
    let currentPage = paginationUtils.currentPage;
    setPaginationUtils((state) => ({
      ...state,
      itemsPerPage: currentItemPerPage
    }))
    paginationHandler({itemsPerPage: currentItemPerPage, currentPage});
  } 

  const currentPageHandler = (page) => {
    
    setPaginationUtils((state) => ({
      ...state, 
      currentPage: page
    }))
    paginationHandler(paginationUtils);
  }

  const date = new Date();

  return (
    <section className="section-long">
      <div className="container">
        <Search />
        <div className="section-head">
          <h2 className="section-title text-uppercase">Colection</h2>
          <p className="section-text">{helperService.formatData(date)}</p>
        </div>

        {movies.map((x) => (
          <MovieCard key={x.id} movie={x} />
        ))}

        <div className="mt-5 d-flex justify-content-between align-items-center">
          <div>      
            <Pagination
              totalItems={moviesCount}
              itemsPerPage={paginationUtils.itemsPerPage}
              currentPage={paginationUtils.currentPage}
              onPageChange={currentPageHandler}
            />
          </div>
          <div className={`${styles["pagination-select"]}`}>            
            <select                    
              name="pagination"
              className={`form-select list-group-item text-dark ${styles["pagination-select"]}`}            
              onChange={itemsPerPageHandler}                                      
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="30">30</option>
            </select>
          </div>
        </div>        
      </div>
    </section>
  );
};

export default Movies;
