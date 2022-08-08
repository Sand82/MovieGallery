import { Link } from "react-router-dom";
import { useContext } from "react";

import { MovieContext } from "../../../contexts/MovieContext.js";

const TopRated = ({ movie}) => {  

  const {detailsHandler} = useContext(MovieContext);

  const detailsMovieHandler = () => { 
    detailsHandler(movie);
  }

  return (
    <article className="movie-line-entity">
      <div className="entity-poster" data-role="hover-wrap">
        <div className="embed-responsive embed-responsive-poster">
          <Link to={`/movies/details/${movie.id}`} onClick={detailsMovieHandler}>
            <img className="embed-responsive-item" src={movie.imageUrl} alt="" />
          </Link>
        </div>
        <div
          className="d-over bg-theme-lighted collapse animated faster"
          data-show-classname="fadeIn show"
          data-hide-classname="fadeOut show"
        >
          <div className="entity-play">
            <Link
              className="action-icon-theme action-icon-bordered rounded-circle"
              // href="https://www.youtube.com/watch?v=nuTU5XcZTLA"
              data-magnific-popup="iframe"
              onClick={detailsMovieHandler}
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
          <Link className="content-link" to={`/movies/details/${movie.id}`} onClick={detailsMovieHandler}>
            {movie.title}
          </Link>
        </h4>
        <div className="entity-category">
          <Link className="content-link" to={`/movies/details/${movie.id}`} onClick={detailsMovieHandler}>
            {movie.category}
          </Link>
        </div>
        <div className="entity-info">
          <div className="info-lines">
            <div className="info info-short">
              <span className="text-theme info-icon">
                <i className="fas fa-star"></i>
              </span>
              <span className="info-text">{movie.avergeRating}</span>
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
        <p className="text-short entity-text">{movie.description}</p>
      </div>
    </article>
  );
};

export default TopRated;
