import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext.js";
import * as commentService from "../../services/CommentService.js";
import * as style from "./MovieRating.Module.css";

const MovieRating = ({ movieId }) => {
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(null);
  const navigate = useNavigate();
   
  useEffect(() => {

    const data = {
      userId: user.id,
      movieId: movieId,
    };

    commentService
      .getRating(data, user.accessToken)
      .then((result) => {
        if (result === "Bad response") {
          return navigate("/notfound");
        }       
        setRating(Number(result.value));
      })
      .catch((error) => {
        throw console.error(error);
      });
  }, [movieId, navigate, user.accessToken, user.id]);

  const movieRaitingHandler = (e) => {
    
    const data = {
      value: e.target.value,
      userId: user.id,
      movieId: movieId,
    };

    commentService
      .addRating(data, user.accessToken)
      .then((result) => {
        if (result === "Bad response") {
          return navigate("/notfound");
        } 
        setRating(Number(result.value));
      })
      .catch((error) => {
        throw console.error(error);
      });
  };
console.log(rating);
  return (
    <div className="col-12">
      <div style={style} className="rating-line">
        <label><strong>{rating == 0 ? "Rate: " : `You Vote: ${rating}`}</strong></label>
        <div className="form-rating" name="rating">
          <input
            type="radio"
            id="rating-10"
            name="rating"
            value={10}
            onClick={movieRaitingHandler}
          />
          <label htmlFor="rating-10">
            <span className="rating-active-icon">
              {rating == 10 ? <i className="fas fa-star star" /> : <i className="fas fa-star" />}
            </span>
            <span className="rating-icon">
            {rating < 10 ? <i className="far fa-star" />: <i className="fas fa-star star" />}
            </span>
          </label>
          <input
            type="radio"
            id="rating-9"
            name="rating"
            value={9}
            onClick={movieRaitingHandler}
          />
          <label htmlFor="rating-9">
          <span className="rating-active-icon">
              {rating >= 9 ? <i className="fas fa-star star" /> : <i className="fas fa-star" />}
            </span>
            <span className="rating-icon">
            {rating < 9 ? <i className="far fa-star" />: <i className="fas fa-star star" />}
            </span>
          </label>
          <input
            type="radio"
            id="rating-8"
            name="rating"
            value={8}
            onClick={ movieRaitingHandler}
          />
          <label htmlFor="rating-8">
          <span className="rating-active-icon">
              {rating >= 8 ? <i className="fas fa-star star" /> : <i className="fas fa-star" />}
            </span>
            <span className="rating-icon">
            {rating < 8 ? <i className="far fa-star" />: <i className="fas fa-star star" />}
            </span>
          </label>
          <input
            type="radio"
            id="rating-7"
            name="rating"
            value={7}
            onClick={movieRaitingHandler}
          />
          <label htmlFor="rating-7">
          <span className="rating-active-icon">
              {rating >= 7 ? <i className="fas fa-star star" /> : <i className="fas fa-star" />}
            </span>
            <span className="rating-icon">
            {rating < 7 ? <i className="far fa-star" />: <i className="fas fa-star star" />}
            </span>
          </label>
          <input
            type="radio"
            id="rating-6"
            name="rating"
            value={6}
            onClick={movieRaitingHandler}
          />
          <label htmlFor="rating-6">
          <span className="rating-active-icon">
              {rating >= 6 ? <i className="fas fa-star star" /> : <i className="fas fa-star" />}
            </span>
            <span className="rating-icon">
            {rating < 6 ? <i className="far fa-star " />: <i className="fas fa-star star" />}
            </span>
          </label>
          <input
            type="radio"
            id="rating-5"
            name="rating"
            value={5}
            onClick={ movieRaitingHandler}
          />
          <label htmlFor="rating-5">
          <span className="rating-active-icon">
              {rating >= 5 ? <i className="fas fa-star star" /> : <i className="fas fa-star" />}
            </span>
            <span className="rating-icon">
            {rating < 5 ? <i className="far fa-star " />: <i className="fas fa-star star" />}
            </span>
          </label>
          <input
            type="radio"
            id="rating-4"
            name="rating"
            value={4}
            onClick={ movieRaitingHandler}
          />
          <label htmlFor="rating-4">
          <span className="rating-active-icon">
              {rating >= 4 ? <i className="fas fa-star star" /> : <i className="fas fa-star" />}
            </span>
            <span className="rating-icon">
            {rating < 4 ? <i className="far fa-star " />: <i className="fas fa-star star" />}
            </span>
          </label>
          <input
            type="radio"
            id="rating-3"
            name="rating"
            value={3}
            onClick={ movieRaitingHandler}
          />
          <label htmlFor="rating-3">
          <span className="rating-active-icon">
              {rating >= 3 ? <i className="fas fa-star star" /> : <i className="fas fa-star" />}
            </span>
            <span className="rating-icon">
            {rating < 3 ? <i className="far fa-star " />: <i className="fas fa-star star" />}
            </span>
          </label>
          <input
            type="radio"
            id="rating-2"
            name="rating"
            value={2}
            onClick={ movieRaitingHandler}
          />
          <label htmlFor="rating-2">
          <span className="rating-active-icon">
              {rating >= 2 ? <i className="fas fa-star star" /> : <i className="fas fa-star" />}
            </span>
            <span className="rating-icon">
            {rating < 2 ? <i className="far fa-star " />: <i className="fas fa-star star" />}
            </span>
          </label>
          <input
            type="radio"
            id="rating-1"
            name="rating"
            value={1}
            onClick={ movieRaitingHandler}
          />
          <label htmlFor="rating-1">
          <span className="rating-active-icon">
              {rating >= 1 ? <i className="fas fa-star star" /> : <i className="fas fa-star" />}
            </span>
            <span className="rating-icon">
            {rating < 1 ? <i className="far fa-star " />: <i className="fas fa-star star" />}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default MovieRating;
