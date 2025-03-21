import { useContext } from "react";

import { DetailContext } from "../../contexts/DetailContext.js";
import Star from "./Star/Star.jsx";

const MovieRating = () => {
  
  const { movie } = useContext(DetailContext);  

  return (
    <div className="col-12">
      <div className="rating-line">
        <label>
          <strong>{movie.personalRating == 0 ? "Rate: " : `You Vote: ${movie.personalRating}`}</strong>
        </label>
        {[...Array(10)].map((x, i) => (
          <Star
            key={i}            
            value={i + 1}
            rating={movie.personalRating}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieRating;
