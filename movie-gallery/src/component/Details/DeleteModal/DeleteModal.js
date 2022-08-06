const DeleteModal = ({deleteMovie, movieId}) => {

    const deleteMovieHandler =() => {
        deleteMovie(movieId)
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
          onClick={deleteMovieHandler}
          data-dismiss="modal"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
