import { useContext } from "react";

import { MovieContext } from "../../../contexts/MovieContext.js";
import { AuthContext } from "../../../contexts/AuthContext.js";

const DeleteModal = ({ movieId }) => {
  const { deleteHandler } = useContext(MovieContext);
  const { user } = useContext(AuthContext);

  const deleteMovie = () => {
    deleteHandler(movieId);   
  };

  return (
    <div className="modal-content">
      {user.isAdmin ? (
        <>
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
        </>
      ) : (
        <h1 style={{ textAlign: "center" }}>
          You don't have rights to delete movie.
        </h1>
      )}
    </div>
  );
};

export default DeleteModal;
