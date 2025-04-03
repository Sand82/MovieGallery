import { useContext } from "react";

import style from "../Star/Star.module.css"
import { DetailContext } from "../../../contexts/DetailContext.js";
import { AuthContext } from "../../../contexts/AuthContext.js";

const Star = ({ value, rating }) => {

  const { movie, movieRatingHandler } = useContext(DetailContext); 
  const { user } = useContext(AuthContext); 

  const raitingHandler = () => {

    const data = {
      value: value.toString(),
      userId: user.id,
      movieId: movie.id,
    };    
    
    movieRatingHandler(data);          
  };

  let currTypeStarCoefficient = value - rating;
  let starFillStyle = "";
  
  if (currTypeStarCoefficient <= 0) {
    starFillStyle = style.star;
  }

  return (    
  <>    
    <label className={style.raitingLabel}>
        <input type="radio" id="star" name="star" className={style.raitingInput} />
        <i className={"fas fa-star " + starFillStyle} onClick={raitingHandler} />
    </label>
  </>
  )
};

export default Star;