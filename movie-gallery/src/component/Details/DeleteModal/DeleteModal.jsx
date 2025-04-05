import { useContext } from "react";

import { MovieContext } from "../../../contexts/MovieContext.js";
import { AuthContext } from "../../../contexts/AuthContext.js";
import styels from "./DeleteModal.module.css"

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
          <div className={`modal-header ${styels["modal-title"]}`}>
            <h5 id="exampleModalLabel">              
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
          <div className={`modal-body ${styels["modal-title"]}`}>
            Are you sure you want to delete this movie ?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-danger delButton"
              onClick={deleteMovie}
              data-dismiss="modal"
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <h2 className={styels["modal-title"]}>
          You don't have rights to delete movie.
        </h2>
      )}
    </div>
  );
};

export default DeleteModal;
