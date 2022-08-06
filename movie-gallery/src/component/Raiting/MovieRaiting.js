const MovieRaiting = () => {
  return (
    <div className="col-12">
      <div className="rating-line">
        <label>Rating:</label>
        <div className="form-rating" name="rating">
          <input type="radio" id="rating-10" name="rating" defaultValue={10} />
          <label htmlFor="rating-10">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-9" name="rating" defaultValue={9} />
          <label htmlFor="rating-9">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-8" name="rating" defaultValue={8} />
          <label htmlFor="rating-8">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-7" name="rating" defaultValue={7} />
          <label htmlFor="rating-7">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-6" name="rating" defaultValue={6} />
          <label htmlFor="rating-6">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-5" name="rating" defaultValue={5} />
          <label htmlFor="rating-5">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-4" name="rating" defaultValue={4} />
          <label htmlFor="rating-4">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-3" name="rating" defaultValue={3} />
          <label htmlFor="rating-3">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-2" name="rating" defaultValue={2} />
          <label htmlFor="rating-2">
            <span className="rating-active-icon">
              <i className="fas fa-star" />
            </span>
            <span className="rating-icon">
              <i className="far fa-star" />
            </span>
          </label>
          <input type="radio" id="rating-1" name="rating" defaultValue={1} />
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

export default MovieRaiting;
