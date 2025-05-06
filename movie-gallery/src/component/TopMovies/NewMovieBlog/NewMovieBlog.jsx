import { Link } from "react-router-dom";
import styles from "./NewMovieBlog.module.css";
import { cropText } from "../../../services/HelperService.js";

const NewMovieBlog = ({ movie }) => {

  return (
    <div className="col-6 ">
    <article
      className={`contaner-image ${styles.backgroundWrapper}`}     
    >
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${movie.imageUrl})` }}
      />      
      <div className={`d-flex p-3 flex-column justify-content-around ${styles["movie-content"]}`}>
        <h4 className="entity-title">
          <Link className="content-link" to={`/movies/details/${movie.id}`}>
            {movie.title}
          </Link>
        </h4>
        <div className="entity-category">         
          <Link className="content-link" to={`/movies/details/${movie.id}`}>
            {movie.category}
          </Link>
        </div>
        <p className="text-short entity-text">{cropText(movie.description)}</p>
        <div className="entity-actions">
          <Link className="text-uppercase" to={`/movies/details/${movie.id}`}>
            Details
          </Link>
        </div>
      </div>
    </article>
    </div>
  )
};

export default NewMovieBlog;
