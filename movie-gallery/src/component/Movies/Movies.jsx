import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import * as helperService from "../../services/HelperService.js";
import Search from "../Search/Search.jsx";
import TopRated from "./TopRated/TopRated.jsx";
import Pagination from "../UI/Pagination/Pagination.jsx";
import { MovieContext } from "../../contexts/MovieContext.js";

const Movies = () => {
  const { movies } = useContext(MovieContext);
  const [filterMovies, setFilteredMovies] = useState([]);
  const [ itemsPerPage, setItemsPerPage] = useState(5)
  
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = filterMovies.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedItems = filterMovies.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);

  const searchTermsHandler = (search, select) => {
    
    let sortedMovies;

    if (select === 'all' && search === '') {

      sortedMovies = movies.sort((a, b) => b.id - a.id);

    } else if (search === '') {

      sortedMovies = movies.sort((a, b) => b[select] - a[select]);

    } else if (select === 'all') {

      sortedMovies = movies
        .filter((x) => x.title.toLowerCase()
        .includes(search.toLowerCase()));

    } else {
      sortedMovies = movies
        .filter((x) => x.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => b[select] - a[select]);
    }
    setFilteredMovies((state) => (state = [...sortedMovies]));
  };

  const itemsPerPageHandler = (e) => {
    setItemsPerPage(e.target.value);
    setCurrentPage(1);
  } 

  const date = new Date();

  return (
    <section className="section-long">
      <div className="container">
        <Search searchTermsHandler={searchTermsHandler} />
        <div className="section-head">
          <h2 className="section-title text-uppercase">Colection</h2>
          <p className="section-text">{helperService.formatData(date)}</p>
        </div>

        {displayedItems.map((x) => (
          <TopRated key={x.id} movie={x} />
        ))}

        <div className="mt-5 d-flex justify-content-between align-items-center">
          <div>      
            <Pagination
              totalItems={movies.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
          <div >            
            <select                    
              name="pagination"
              className="form-select list-group-item text-dark"               
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
