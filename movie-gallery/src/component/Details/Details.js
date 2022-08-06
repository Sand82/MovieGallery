import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import * as style from "./Details.Module.css";
import * as moviesService from "../../services/MoviesService.js";

import DeleteModal from "./DeleteModal/DeleteModal.js";
import DetailsLi from "../HardCoded/DetailsLi.js";
import DetailsSynopsis from "../HardCoded/DetailsSynopsis.js";
import CreateComment from "../Comments/CommentCreate/CreateComment.js";
import Comment from "../Comments/Comment/Comment.js";

const Details = () => {
    const {movieId} = useParams();     

    const [currMovie, setCurrMovie] = useState({});  

  useEffect(() => {
    moviesService.getOne(movieId).then((result) => {
      setCurrMovie(result);
    });
  }, [movieId]);

  const commentHandler = (comment) => {    
    moviesService.getOne(comment.movieId).then((result) => {
        setCurrMovie(result);
      });
  };  

  return (
    <>
      <div stylr={style} className="container">
        <div className="sidebar-container">
          <div className="content">
            <section className="section-long">
              <div className="section-line">
                <div className="movie-info-entity">
                  <div className="entity-poster" data-role="hover-wrap">
                    <div className="embed-responsive embed-responsive-poster">
                      <img
                        className="embed-responsive-item"
                        src={currMovie.imageUrl}
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
                    <h2 className="entity-title">{currMovie.title}</h2>
                    <div className="entity-category">{currMovie.category}</div>
                    <div className="entity-info">
                      <div className="info-lines">
                        <div className="info info-short">
                          <span className="text-theme info-icon">
                            <i className="fas fa-star" />
                          </span>
                          <span className="info-text">8,7</span>
                          <span className="info-rest">/10</span>
                        </div>
                        <div className="info info-short">
                          <span className="text-theme info-icon">
                            <i className="fas fa-clock" />
                          </span>
                          <span className="info-text">
                            {currMovie.duration}
                          </span>
                          <span className="info-rest">&nbsp;min</span>
                        </div>
                      </div>
                    </div>
                    <ul className="entity-list">
                      <DetailsLi />
                      <li className="button-holder">
                        <Link
                          to={`/movies/details/${currMovie.id}/edit`}
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
                    </ul>
                  </div>
                </div>
              </div>

              <DetailsSynopsis />

              <div className="section-line">
                <div className="section-head">
                  <h2 className="section-title text-uppercase">Comments</h2>
                </div>
                
                { currMovie.comments != undefined 
                    ? currMovie.comments.map(x => <Comment key={x.id} comment={x} />) 
                    : ''
                }
              </div>

              <CreateComment
                movieId={movieId}
                commentHandler={commentHandler}
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
