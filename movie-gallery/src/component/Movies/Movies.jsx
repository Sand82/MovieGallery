import { useContext } from "react";

import Search from "../Search/Search.jsx";
import Select from "../UI/Select/Select.jsx"
import MovieCard from "./MovieCard/MovieCard.jsx";
import Pagination from "../UI/Pagination/Pagination.jsx";
import ScrollToTop from "../UI/ScrollToTop/ScrollToTop.jsx";
import { MoviesContext } from "../../contexts/MoviesContext.js";
import { FilterCotntext } from "../../contexts/FiltersContext.js";
import { formatData } from "../../services/HelperService.js";

const Movies = () => {
  const { movies, moviesCount } = useContext(MoviesContext);   
  const { itemsPerPageHandler,  currentPageHandler, filters} = useContext(FilterCotntext)

  const itemsPerPageChnageHandler = (itemsPerPage) => { 
    itemsPerPageHandler(itemsPerPage)   
  } 

  const currentPageChangeHandler = (page) => {      
    currentPageHandler(page)
  } 

  const date = new Date();

  return (
    <>
    <section className="section-long">
      <div className="container">
        <Search />
        <div className="section-head">
          <h2 className="section-title text-uppercase">Colection</h2>
          <p className="section-text">{formatData(date)}</p>
        </div>

        {movies.map((x) => (
          <MovieCard key={x.id} movie={x} />
        ))}

        <div className="mt-5 d-flex justify-content-between align-items-center">
          <div>      
            <Pagination
              totalItems={moviesCount}
              itemsPerPage={filters.itemsPerPage}
              currentPage={filters.currentPage}
              currentPageHandler={currentPageChangeHandler}
            />
          </div>          
          <div>         
            <Select itemsPerPageHandler={itemsPerPageChnageHandler}/>
          </div>
        </div>        
      </div>
    </section>
    <ScrollToTop route="/movies"/>  
    </>
  );
};

export default Movies;
