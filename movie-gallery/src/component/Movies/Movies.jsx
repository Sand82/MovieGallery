import TopRated from "./TopRated/TopRated.jsx";
import { useContext, useEffect, useState } from "react";

import { MovieContext } from "../../contexts/MovieContext.js";
import * as helperService from "../../services/HelperService.js";
import Search from "../Search/Search.jsx";

const Movies = () => {
  const { movies } = useContext(MovieContext);
  const [filterMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies]);  

  const searchTermsHandler = (search, select) => {
    
    let sortedMovies;

    if (select === 'all' && search === '') {

      sortedMovies = movies.sort((a, b) => b.id - a.id);

    } else if (search === '') {

      sortedMovies = movies.sort((a, b) => b[select] - a[select]);

    } else if (select === 'all') {

      sortedMovies = movies
        .filter((x) => x.title.toLowerCase()
        .includes(search.toLowerCase()));

    } else {
      sortedMovies = movies
        .filter((x) => x.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => b[select] - a[select]);
    }
    setFilteredMovies((state) => (state = [...sortedMovies]));
  };

  const date = new Date();

  return (
    <section className="section-long">
      <div className="container">
        <Search searchTermsHandler={searchTermsHandler} />
        <div className="section-head">
          <h2 className="section-title text-uppercase">Colection</h2>
          <p className="section-text">{helperService.formatData(date)}</p>
        </div>

        {filterMovies.map((x) => (
          <TopRated key={x.id} movie={x} />
        ))}
      </div>
    </section>
  );
};

export default Movies;
