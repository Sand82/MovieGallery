import { Link } from "react-router-dom";

const Search = () => {
    return (
        <div className="section-pannel">
  <div className="grid row">
    <div className="col-md-10">
      <form autoComplete="off">
        <div className="row form-grid">
          <div className="col-sm-6 col-lg-3">
            <div className="input-view-flat input-group">
              <select className="form-control" name="genre">
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
              </select>
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
                id="release-year-field"
                name="releaseYear"
                type="text"
                placeholder="release year"
                data-target="#release-year-field"
                data-date-format="Y"
              />
              <div className="input-group-append">
                <span className="input-group-text">
                  <i className="fas fa-calendar-alt" />
                </span>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3">
            <div className="input-view-flat input-group">
              <select className="form-control" name="sortBy">
                <option selected="true">sort by</option>
                <option>name</option>
                <option>release year</option>
                <option>rating</option>
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
            className="content-link transparent-link"
            to="movies-blocks.html"
          >
            <i className="fas fa-th" />
          </Link>
        </li>
        <li className="list-inline-item">
          <Link
            className="content-link transparent-link active"
            to="movies-list.html"
          >
            <i className="fas fa-th-list" />
          </Link>
        </li>
      </ul>
    </div>
  </div>
</div>

    )
}

export default Search;