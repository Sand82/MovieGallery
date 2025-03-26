import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Search.module.css"

const Search = ({ searchTermsHandler }) => {
  const [search, setSearch] = useState("");
  const [select, setSelect] = useState("All");
  const [sortDirection, setSortDirection] = useState(true);

  const searchChange = (e) => {
    e.preventDefault();

    searchTermsHandler(search, select);
  };

  const searching = (e) => {
    setSearch(e.target.value);
  };

  const selecting = (e) => {
    setSelect(e.target.value);
  };

  const sortDirectionHandler = () => {
    setSortDirection(state => state = !state);
  }

  console.log(sortDirection)

  const clearSearch = () => {
    setSearch("");
  };

  return (
    <div className="section-pannel">
      <div className="grid row">
        <div className="col-md-10">
          <form onSubmit={searchChange}>
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
                    onChange={searching}
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
                    onChange={selecting}
                  >
                    <option value="all">All movies</option>
                    <option value="year">Year</option>
                    <option value="averageRating">Rating</option>
                    <option value="duration">Duration</option>
                  </select>
                </div>
                <div className={`col-1 d-flex align-self-center  ${styles["arrows-container"]}`} onClick={sortDirectionHandler}>                
                {sortDirection ? 
                  <i className={`fa-solid fa-arrow-up fa-sm ${styles["icon-arrow"]}`}/> : 
                  <i className={`fa-solid fa-arrow-down fa-sm ${styles["icon-arrow"]}`}/>
                }
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
                onClick={searchChange}
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
