import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { FilterCotntext } from "../../contexts/FiltersContext.js";
import { StaticDataContext } from "../../contexts/StaticDataContext.js";

const Search = () => {
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("All");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState(true);
  const { staticData } = useContext(StaticDataContext);
  
  const { searchHandler, selectHandler, sortHandler, categoryHandler, tagHandler, resetHandler } = useContext(FilterCotntext)
  
  const searchChangeHandler = (e) => {
    e.preventDefault();
    let sortString = sort ? "desc": "asc";
    searchHandler(search);
    selectHandler(select);
    categoryHandler(category);
    sortHandler(sortString);
  };

  const clearSearchHandler = (e) => {
    e.preventDefault(); 
    
    setSearch("");    
    setSelect("All");    
    setCategory("");    
    setSort(true);
    tagHandler("");
    
    resetHandler();
  };

  const searchChnageHandler = (e) => {
    setSearch(e.target.value);    
  };

  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);    
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
        <div className="col-md-11">
          <form onSubmit={searchChangeHandler}>
            <div className="row form-grid">
              <div className="col-sm-12 col-lg-4">
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
              <div className="col-sm-12 col-lg-4 d-flex">
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
              <div className="col-sm-12 col-lg-4">
                <div className="input-view-flat input-group">
                  <select className="form-control" name="genre" value={category} onChange={categoryChangeHandler}>
                     <option value=""></option>
                    {staticData.categories.map(x => <option key={x.id} value={x.id}>{x.name}</option>)
                    }                  
                  </select>
                </div>
              </div>              
            </div>
          </form>
        </div>
        <div className="col-md-1 my-md-auto d-flex">
          <span className="info-title d-md-none ">Select view:</span>
          <ul className="ml-md-auto h5 list-inline">
            <li className="list-inline-item">
              {/* <button className="btn btn-secondary mr-4" onClick={clearSearchHandler}>Clear</button> */}
              
              <Link
                className="content-link transparent-link mr-1"
                to="#"
                onClick={clearSearchHandler}
              >
                <i class="fa-solid fa-eraser"></i>
              </Link>
            </li>
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
