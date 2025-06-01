import { Link } from "react-router-dom";

import { cropText } from "../../../services/HelperService.js";
import { arrayToString } from "../../../services/HelperService.js";
import { adjustMovieImageURL } from "../../../services/HelperService.js"

const MovieCard = ({ movie }) => {

  return (    
    <article className="movie-line-entity p-3">
      <div className="entity-poster" data-role="hover-wrap">
        <div className="embed-responsive embed-responsive-poster ">
          <Link
            to={`/movies/details/${movie.id}`}            
          >
            <img
              className="embed-responsive-item movie-img"
              src={adjustMovieImageURL(movie.mainImage)}
              alt=""
            ></img>
          </Link>
        </div>
        <div
          className="d-over bg-theme-lighted collapse animated faster"
          data-show-classname="fadeIn show"          
        >
          <div className="entity-play">
            <Link
              className="action-icon-theme action-icon-bordered rounded-circle"
              to={`/movies/details/${movie.id}`}
            >
              <span className="icon-content">
                <i className="fas fa-play"></i>
              </span>
            </Link>
          </div>
        </div>
      </div>
      <div className="entity-content">
        <h4 className="entity-title">
          <Link
            className="content-link"
            to={`/movies/details/${movie.id}`}            
          >
            {movie.title} ({movie.year})
          </Link>
        </h4>
        <div className="entity-category">
          <Link
            className="content-link"
            to={`/movies/details/${movie.id}`}            
          >
            {arrayToString(movie.categories)}
          </Link>
        </div>
        <div className="entity-info">
          <div className="info-lines">
            <div className="info info-short">
              <span className="text-theme info-icon">
                <i className="fas fa-star"></i>
              </span>
              <span className="info-text">{movie.averageRating ? movie.averageRating : "0"}</span>
              <span className="info-rest">/10</span>
            </div>
            <div className="info info-short">
              <span className="text-theme info-icon">
                <i className="fas fa-clock"></i>
              </span>
              <span className="info-text">{movie.duration}</span>
              <span className="info-rest">&nbsp;min</span>
            </div>
          </div>
        </div>
        <p className="text-short entity-text">{cropText(movie.description)}</p>
      </div>
    </article>
  );
};

export default MovieCard;