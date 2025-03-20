import { Link, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";

import * as style from "./Details.Module.css";

import DeleteModal from "./DeleteModal/DeleteModal.jsx";
import DetailsLi from "../HardCoded/DetailsLi.jsx";
import DetailsSynopsis from "../HardCoded/DetailsSynopsis.jsx";
import CreateComment from "../Comments/CommentCreate/CreateComment.jsx";
import Comment from "../Comments/Comment/Comment.jsx";
import { AuthContext } from "../../contexts/AuthContext.js";
import { DetailContext } from "../../contexts/DetailContext.js";

const Details = () => {
  const { movieId } = useParams();  
  const { user } = useContext(AuthContext);  
  const { movie, detailsHandler, favoriteMovieHandler } = useContext(DetailContext);    

  useEffect(() => {    
    detailsHandler(movieId, user.id);    
  }, [movieId]);   
  
  const hartClickHandler = (hart) => {

    let data = {
      isFavorite: Boolean(hart),
      movieId: Number(movieId),
      userId: user.id,
    };

    favoriteMovieHandler(data);    
  };

  let hartClass =
    movie.isFavorite ? "fa-solid fa-heart fa-2xl hart hart-active"
    : "fa-solid fa-heart fa-2xl hart hart-not-active";     

  return (
    <>
      <div style={style} className="container">
        <div className="sidebar-container">
          <div className="content">
            <section className="section-long">
              <div className="section-line">
                <div className="movie-info-entity">
                  <div className="entity-poster" data-role="hover-wrap">
                    <div className="embed-responsive embed-responsive-poster">
                      <img
                        className="embed-responsive-item"
                        src={movie.imageUrl}
                        alt=""
                      />
                    </div>
                    <div
                      className="d-over bg-theme-lighted collapse animated faster"
                      data-show-class="fadeIn show"
                      data-hide-class="fadeOut show"
                    >
                      <div className="entity-play">
                        <Link
                          className="action-icon-theme action-icon-bordered rounded-circle"
                          to="https://www.youtube.com/watch?v=d96cjJhvlMA"
                          data-magnific-popup="iframe"
                        >
                          <span className="icon-content">
                            <i className="fas fa-play" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="entity-content">
                    <h2 className="entity-title">{movie.title}</h2>
                    <div className="entity-category">{movie.category}</div>
                    <div className="entity-info">
                      <div className="info-lines">
                        <div className="info info-short">
                          <span className="text-theme info-icon">
                            <i className="fas fa-star" />
                          </span>
                          <span className="info-text">
                            {movie.avergeRating
                              ? movie.avergeRating
                              : "0"}
                          </span>
                          <span className="info-rest">/10</span>
                        </div>
                        <div className="info info-short">
                          <span className="text-theme info-icon">
                            <i className="fas fa-clock" />
                          </span>
                          <span className="info-text">
                            {movie.duration}
                          </span>
                          <span className="info-rest">&nbsp;min</span>
                        </div>
                      </div>
                    </div>
                    <ul className="entity-list">
                      <DetailsLi />
                      {user.isAdmin ? (
                        <li style={style} className="button-holder">
                          <Link
                            to={`/movies/details/${movie.id}/edit`}
                            className="btn btn-warning editButton"
                          >
                            Edit
                          </Link>
                          <button
                            className="btn btn-danger delButton"
                            data-toggle="modal"
                            data-target="#exampleModal"
                          >
                            Delete
                          </button>
                        </li>
                      ) : (
                        <span>
                          <label className="entity-list-title">
                            Add in favorite:
                            <i className={hartClass}></i>
                            <input
                              className="hart-input"
                              type="radio"
                              name="favorite"
                              value={movie.isFavorite}
                              onClick={() => hartClickHandler(!movie.isFavorite)}
                            />
                          </label>
                        </span>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <DetailsSynopsis />

              <div className="section-line">
                <div className="section-head">
                  <h2 className="section-title text-uppercase">Comments</h2>
                </div>

                {movie.comments
                  ? movie.comments.map((x) => (
                      <Comment
                        key={x.id}
                        comment={x}
                      />
                    ))
                  : ""}
              </div>

              <CreateComment
                movieId={movieId}                
              />
            </section>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <DeleteModal movieId={movieId} />
        </div>
      </div>
    </>
  );
};

export default Details;
