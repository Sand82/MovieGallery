import { useContext, useState } from "react";

import * as helperService from "../../services/HelperService.js";
import Search from "../Search/Search.jsx";
import Select from "../UI/Select/Select.jsx"
import MovieCard from "./MovieCard/MovieCard.jsx";
import Pagination from "../UI/Pagination/Pagination.jsx";
import { MovieContext } from "../../contexts/MovieContext.js";

const Movies = () => {
  const { movies, moviesCount, paginationHandler } = useContext(MovieContext);   
  const [paginationUtils, setPaginationUtils] = useState({ itemsPerPage: 5, currentPage: 1})

  const itemsPerPageHandler = (itemsPerPage) => { 
    
    setPaginationUtils((state) => ({
      ...state,
      itemsPerPage: itemsPerPage
    }))
    paginationHandler(paginationUtils);
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
              currentPageHandler={currentPageHandler}
            />
          </div>          
          <div>         
            <Select itemsPerPageHandler={itemsPerPageHandler}/>
          </div>
        </div>        
      </div>
    </section>
  );
};

export default Movies;
