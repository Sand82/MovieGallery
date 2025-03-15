import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext.js";
import * as commentService from "../../services/CommentService.js";
import Star from "./Star/Star.jsx";

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

  const movieRaitingHandler = (value) => {    

    const data = {
      value: value.toString(),
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

  return (
    <div className="col-12">
      <div className="rating-line">
        <label>
          <strong>{rating == 0 ? "Rate: " : `You Vote: ${rating}`}</strong>
        </label>
        {[...Array(10)].map((x, i) => (
          <Star
            key={i}
            movieRaitingHandler={movieRaitingHandler}
            value={i + 1}
            rating={rating}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRating;
