import TopRated from "./TopRated/TopRated.js";
import { useContext } from "react";

import { MovieContext } from "../../contexts/MovieContext.js";
import * as helperService from "../../services/HelperService.js";

const Movies = () => {       

const {movies} = useContext(MovieContext);

const date = new Date();

  return (
    <section className="section-long">
      <div className="container">
        <div className="section-head">
          <h2 className="section-title text-uppercase">Colection</h2>
          <p className="section-text">{helperService.formatData(date)}</p>
        </div>        
       {movies.map(x => < TopRated key={x.id} movie={x} />)}
      </div>
    </section>
  );
};

export default Movies;
