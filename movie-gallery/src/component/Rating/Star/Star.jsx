import style from "../Star/Star.module.css"

const Star = ({ movieRaitingHandler, value, rating }) => {

    const raitingHandler = () => {
    movieRaitingHandler(value);    
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