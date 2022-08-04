import { Link } from "react-router-dom";

import * as style from "./NewMovieBlog.Module.css";

const NewMovieBlog = ({ movie }) => {
  return (
    <div style={style} className="col-md-6">
      <article className="article-tape-entity contaner-image">
        <Link
          className="entity-preview"
          to={`/movies/details/${movie.id}`}
          data-role="hover-wrap"
        >
          <span className="embed-responsive embed-responsive-16by9 image-wrapper">
            <img
              id="image"
              className="embed-responsive-item image"
              src={movie.imageUrl}
              alt=""
            />
          </span>
          {/* <span className="entity-date">
                    <span className="tape-block tape-horizontal tape-single bg-theme text-white">
                      <span className="tape-dots"></span>
                      <span className="tape-content m-auto">20 jul 2019</span>
                      <span className="tape-dots"></span>
                    </span>
                  </span> */}
          <span
            className="d-over bg-black-80 collapse animated faster"
            data-show-classname="fadeIn show"
            data-hide-classname="fadeOut show"
          >
            <span className="m-auto">
              <i className="fas fa-search"></i>
            </span>
          </span>
        </Link>
        <div className="entity-content">
          <h4 className="entity-title">
            <Link className="content-link" to={`/movies/details/${movie.id}`}>
              {movie.title}
            </Link>
          </h4>
          <div className="entity-category">
            <Link className="content-link" to={`/movies/details/${movie.id}`}>
              {movie.title}
            </Link>
            ,{" "}
            <Link className="content-link" to={`/movies/details/${movie.id}`}>
              {movie.category}
            </Link>
          </div>
          <p className="text-short entity-text">{movie.description}</p>
          <div className="entity-actions">
            <Link className="text-uppercase" to={`/movies/details/${movie.id}`}>
              Details
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewMovieBlog;
