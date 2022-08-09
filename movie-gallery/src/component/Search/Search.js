import { useState } from "react";
import { Link } from "react-router-dom";

const Search = ({searchTermsHandler}) => {
  const [search, setSearch] = useState('');
  const [select, setSelect] = useState('All')

  const searchChange = (e) => {         
    e.preventDefault();
   
    searchTermsHandler(search, select);       
  };
 
  const searching = (e) => {    
    setSearch(e.target.value);
  }

  const selecting = (e) => {    
    setSelect(e.target.value);
  }

  const clearSearch = () => {    
    setSearch('');   
  }
  
  return (
    <div className="section-pannel">
      <div className="grid row">
        <div className="col-md-10">
          <form onSubmit={searchChange}>
            <div className="row form-grid">
              <div className="col-sm-6 col-lg-3">
                <div className="input-view-flat input-group">
                  {/* <select className="form-control" name="genre">
                    <option selected="true">genre</option>
                    <option>action</option>
                    <option>adventure</option>
                    <option>comedy</option>
                    <option>crime</option>
                    <option>detective</option>
                    <option>drama</option>
                    <option>fantasy</option>
                    <option>melodrama</option>
                    <option>romance</option>
                    <option>superhero</option>
                    <option>supernatural</option>
                    <option>thriller</option>
                    <option>sport</option>
                    <option>historical</option>
                    <option>horror</option>
                    <option>musical</option>
                    <option>sci-fi</option>
                    <option>war</option>
                    <option>western</option>
                  </select> */}
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
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
                    {search.length > 0 &&
                    <Link className="input-group-text" to="#" onClick={clearSearch}> 
                     <i className="fa-solid fa-calendar-xmark"></i>
                    </Link>
                    }                    
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-3">
                <div className="input-view-flat input-group">
                  <select className="form-control" name="sortBy" onChange={selecting}>                    
                    <option value="all">Select</option>                    
                    <option value="year">Year</option>
                    <option value="avergeRating">Rating</option>                    
                    <option value="duration">Duration</option>                    
                  </select>
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
                className="content-link transparent-link" to="#" onClick={searchChange}
               
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
