import { useContext, useEffect, useState } from "react";
import { MovieContext } from "../../contexts/MovieContext.js";

import TopRatedCard from "./TopRatedCard/TopRatedCard.jsx";
import NewMovieBlog from "./NewMovieBlog/NewMovieBlog.jsx";
import ScrollToTop from "../UI/ScrollToTop/ScrollToTop.jsx";
import * as style from "../TopMovies/NewMovies.Module.css";
import { Link } from "react-router-dom";
import { FilterCotntext } from "../../contexts/FiltersContext.js";

const NewMovies = () => {

  const { movies } = useContext(MovieContext);
  const { topRatedMovieHandler } = useContext(FilterCotntext);

  useEffect(() => {
    topRatedMovieHandler()    
  }, []) 
 
  return (
    <>
      <section style={style} className="section-text-white position-relative">
        <div
          className="d-background"
          data-image-src=""
          data-parallax="scroll"
        />
        <div className="d-background bg-theme-blacked" />
        <div className="mt-auto container position-relative">
          <div className="top-block-head text-uppercase">
            <h2 className="display-4">
              Top
              <span className="text-theme"> Rated</span>
            </h2>
          </div>
          <div className="top-block-footer">
            <div
              className="slick-spaced slick-carousel"
              data-slick-view="navigation responsive-4"
            >
            <div>             
              </div>
              <div className="slick-slides slick-initialized slick-slider">
                <div className="slick-list draggable">                
                  <div className="slick-track">
                    {movies.slice(0, 4).map((x) => (
                      <TopRatedCard key={x.id} movie={x} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-long">
        <div className="container">
          <div className="section-head">
            <h2 className="section-title text-uppercase">Latest news</h2>
          </div>
          <div className="grid row">
            {movies.slice(0, 4).map((x) => (
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
      <ScrollToTop route={`/`}/>
    </>    
  );
};

export default NewMovies;
