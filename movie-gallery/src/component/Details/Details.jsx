import { Link, useParams } from "react-router-dom";
import { useEffect, useContext, useState } from "react";

import styles from "./Details.module.css";
import DeleteModal from "./DeleteModal/DeleteModal.jsx";
import DetailsLi from "./DetailsLi.jsx";
import Description from "./Description.jsx";
import Comment from "../Comments/Comment/Comment.jsx";
import CreateComment from "../Comments/CommentCreate/CreateComment.jsx";
import ScrollToTop from "../UI/ScrollToTop/ScrollToTop.jsx"
import Error from "../UI/Error/Error.jsx";
import { AuthContext } from "../../contexts/AuthContext.js";
import { DetailContext } from "../../contexts/DetailContext.js";

const Details = () => {
  const { movieId } = useParams();

  const { user } = useContext(AuthContext);
  const { movie, detailsHandler, favoriteMovieHandler, serverErrors } = useContext(DetailContext);  
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    detailsHandler(movieId, user.id);
  }, [movieId, user.id]);

  const hartClickHandler = (hart) => {

    let data = {
      isFavorite: Boolean(hart),
      movieId: Number(movieId),
      userId: user.id,
    };

    favoriteMovieHandler(data);
  };

  let animationClass = "d-over bg-black-40 collapse animated slow";

  if (hovered) {    
    animationClass = "d-background bg-theme-lighted collapse delay-4s"
  } 

  let hartClass =
    movie.isFavorite ? `fa-solid fa-heart fa-2xl ${styles["hart"]} ${styles["hart-active"]}`
    : `fa-solid fa-heart fa-2xl ${styles["hart"]} ${styles["hart-not-active"]}`;     

  let starring = movie.starring && movie.starring.map(s => s.name).join(', ');
  
  let directors = movie.directors && movie.directors.map(d => d.name).join(', ');

  let countries = movie.countries && movie.countries.map(c => c.name).join(', ');

  let languages = movie.languages && movie.languages.map(l => l.name).join(', ');

  return (
    <>
      <div className="container">
        <div className="sidebar-container">
          <div className="content">
            <section className="section-long">
              <div className="section-line">
                <div className="movie-info-entity">
                  <div className="entity-poster" 
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}   
                    data-role="hover-wrap">
                    <div className="embed-responsive embed-responsive-poster">
                      <img
                        className="embed-responsive-item"
                        src={movie.imageUrl}
                        alt=""
                      />
                    </div>
                    <div
                      className={`d-flex ${animationClass}`} 
                    >
                      <div className="entity-play">
                        {hovered && <Link
                          className="action-icon-theme action-icon-bordered rounded-circle"
                          to={`/details/video/${movie.id}?details=true`}
                          data-magnific-popup="iframe"
                          
                        >
                          <span className="icon-content">
                            <i className="fas fa-play" />
                          </span>
                        </Link>}
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
                            { movie.averageRating }
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
                      <DetailsLi 
                        starring={starring} 
                        directors={directors} 
                        release={movie.release} 
                        company={movie.company} 
                        countries={countries} 
                        languages={languages}
                      />
                      {user.isAdmin ? (
                        <li className={`mt-3 ${styles["button-holder"]}`}>
                          <Link
                            to={`/movies/details/${movie.id}/edit`}
                            className="btn btn-theme"
                          >
                            Edit
                          </Link>
                          <button
                            className={`btn btn-danger ${styles["button-delete"]}`}
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
                              hidden={true}
                              onClick={() => hartClickHandler(!movie.isFavorite)}
                            />
                          </label>
                        </span>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <Description description={movie.description} />

              <div className="section-line">
                <div className="section-head">
                  <h2 className="section-title text-uppercase">Comments</h2>
                </div>
                <div>
                  <Error error={serverErrors}/>
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
      <ScrollToTop route={`/movies/details/${movieId}`}/>
    </>
  );
};

export default Details;
