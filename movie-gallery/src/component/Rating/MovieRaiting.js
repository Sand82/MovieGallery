const MovieRating = ({movieId}) => {

  console.log(movieId);

  const movieRaitingHandler = (e) => {
     console.log(e.target.value);
  }

  return (
    <div className="col-12">
      <div className="rating-line">
        <label>Rating:</label>
        <div className="form-rating" name="rating">
          <input type="radio" id="rating-10" name="rating" value={10} onClick={movieRaitingHandler}/>
          <label htmlFor="rating-10">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-9" name="rating" value={9} onClick={movieRaitingHandler} />
          <label htmlFor="rating-9">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-8" name="rating" value={8} onClick={movieRaitingHandler} />
          <label htmlFor="rating-8">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-7" name="rating" value={7} onClick={movieRaitingHandler} />
          <label htmlFor="rating-7">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-6" name="rating" value={6} onClick={movieRaitingHandler} />
          <label htmlFor="rating-6">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-5" name="rating" value={5} onClick={movieRaitingHandler} />
          <label htmlFor="rating-5">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-4" name="rating" value={4} onClick={movieRaitingHandler} />
          <label htmlFor="rating-4">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-3" name="rating" value={3} onClick={movieRaitingHandler} />
          <label htmlFor="rating-3">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-2" name="rating" value={2} onClick={movieRaitingHandler} />
          <label htmlFor="rating-2">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-1" name="rating" value={1} onClick={movieRaitingHandler} />
          <label htmlFor="rating-1">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MovieRating;
