import { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import TopRatedCard from "./TopRatedCard/TopRatedCard.jsx";
import NewMovieBlog from "./NewMovieBlog/NewMovieBlog.jsx";
import ScrollToTop from "../UI/ScrollToTop/ScrollToTop.jsx";
import Spinner from "../UI/Spinner/Spiner.jsx";
import { Link } from "react-router-dom";
import { FilterCotntext } from "../../contexts/FiltersContext.js";
import { useAsyncEffect } from "../../hooks/useAsyncEffect.js";
import { TypesMoviesContext } from "../../contexts/TypesMoviesContext.js";
import { sliderSettings } from "../../services/HelperService.js"

const NewMovies = () => {  
  const { latestMovies, topRatedMovies } = useContext(TypesMoviesContext);
  const { topRatedMovieHandler } = useContext(FilterCotntext);  

  const loading = useAsyncEffect(() => topRatedMovieHandler(), []);

  if (loading || !topRatedMovies || Object.keys(topRatedMovies).length === 0) {
    return <Spinner />;
  }

  return (
    <>
      <section className="section-text-white position-relative">
        <div className="d-background" data-parallax="scroll" />
        <div className="d-background bg-theme-blacked" />
        <div className="mt-auto container position-relative">
          <div className="top-block-head text-uppercase">
            <h2 className="display-4">
              Top <span className="text-theme">Rated</span>
            </h2>
          </div>
          <div className="top-block-footer">
            <Slider {...sliderSettings}>
              {topRatedMovies.map((x) => (
                <TopRatedCard key={x.id} movie={x} />
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <section className="section-long">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title text-uppercase">Newest</h2>
          </div>
          <div className="grid row">
            {latestMovies.map((x) => (
              <NewMovieBlog key={x.id} movie={x} />
            ))}
          </div>
          <div className="section-bottom">
            <Link className="btn btn-theme" to="/movies">
              All Movies
            </Link>
          </div>
        </div>
      </section>

      <ScrollToTop route={`/`} />
    </>
  );
};

export default NewMovies;
