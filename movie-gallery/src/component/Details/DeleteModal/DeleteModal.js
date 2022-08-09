import { useNavigate } from "react-router-dom";
import { useContext } from "react";

import { MovieContext } from "../../../contexts/MovieContext.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import * as moviesService from "../../../services/MoviesService.js";

const DeleteModal = ({ movieId }) => {
  const { deleteHandler } = useContext(MovieContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const deleteMovie = () => {
    moviesService
      .remove(movieId, user.accessToken)
      .then((res) => {
        if (res === "Bad response") {
          return navigate("/notfound");
        }
        deleteHandler(res);
        navigate("/movies");
      })
      .catch((error) => {
        throw console.error(error);
      });
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
          Delete Movie
        </h5>
        <button
          type="button"
          className="close"
          data-dismiss="modal"
          aria-label="Close"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div className="modal-body">
        Are you sure you want to delete this movie ?
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary closeButton"
          data-dismiss="modal"
        >
          Close
        </button>
        <button
          type="button"
          className="btn btn-primary delButton"
          onClick={deleteMovie}
          data-dismiss="modal"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
