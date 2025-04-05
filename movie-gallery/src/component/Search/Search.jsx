import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { FilterCotntext } from "../../contexts/FiltersContext.js";

const Search = () => {
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("All");
  const [sort, setSort] = useState(true);
  
  const { searchHandler, selectHandler, sortHandler } = useContext(FilterCotntext)
  
  const searchChangeHandler = (e) => {
    e.preventDefault();
    let sortString = sort ? "desc": "asc";
    searchHandler(search);
    selectHandler(select);
    sortHandler(sortString);
  };

  const searchChnageHandler = (e) => {
    setSearch(e.target.value);    
  };

  const selectChangeHandler = (e) => {
    setSelect(e.target.value);    
  };

  const sortDirectionHandler = (e) => {
    setSort(state => state = !state);    
  }  
  
  const clearSearch = () => {
    setSearch("");    
  };

  return (
    <div className="section-pannel">
      <div className="grid row">
        <div className="col-md-10">
          <form onSubmit={searchChangeHandler}>
            <div className="row form-grid">
              <div className="col-sm-7 col-lg-5">
                <div
                  className="input-view-flat date input-group"
                  data-toggle="datetimepicker"
                  data-target="#release-year-field"
                >
                  <input
                    className="datetimepicker-input form-control"
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={searchChnageHandler}
                  />
                  <div className="input-group-append">
                    {search.length > 0 && (
                      <Link
                        className="input-group-text"
                        to="#"
                        onClick={clearSearch}
                      >
                        <i className="fa-solid fa-calendar-xmark"></i>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-sm-7 col-lg-5 d-flex">
                <div className="input-view-flat input-group">
                  <select
                    className="form-control"
                    name="sortBy"
                    placeholder="Sort By"
                    onChange={selectChangeHandler}
                  >
                    <option value="all">All movies</option>
                    <option value="year">Year</option>
                    <option value="averageRating">Rating</option>
                    <option value="duration">Duration</option>
                  </select>
                  <div className="input-group-append">                    
                    <Link
                      className="input-group-text"
                      to="#"
                      onClick={sortDirectionHandler}
                    >
                     {sort ? 
                      <i className="fa-solid fa-arrow-up fa-sm"/> : 
                      <i className="fa-solid fa-arrow-down fa-sm"/>
                      }
                    </Link>                   
                  </div>
                </div>
              </div>              
            </div>
          </form>
        </div>
        <div className="col-md-2 my-md-auto d-flex">
          <span className="info-title d-md-none mr-3">Select view:</span>
          <ul className="ml-md-auto h5 list-inline">
            <li className="list-inline-item">
              <Link
                className="content-link transparent-link"
                to="#"
                onClick={searchChangeHandler}
              >
                <i className="fa-solid fa-magnifying-glass"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Search;
