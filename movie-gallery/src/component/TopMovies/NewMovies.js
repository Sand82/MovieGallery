import NewMoviePoster from "./NewMoviePoster/NewMoviePoster.js";
import NewMovieBlog from "./NewMovieBlog/NewMovieBlog.js";
import * as style from "../TopMovies/NewMovies.Module.css";
import { Link } from "react-router-dom";

const NewMovies = ({ movies }) => {
  const firstFiveMovies = movies
    .slice()
    .sort((a, b) => b.avergeRating - a.avergeRating)
    .slice(0, 4);

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
              <div className="slick-slides slick-initialized slick-slider">
                <div className="slick-list draggable">
                  <div className="slick-track">
                    {firstFiveMovies.map((x) => (
                      <NewMoviePoster key={x.id} movie={x} />
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
            {firstFiveMovies.map((x) => (
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
    </>
  );
};

export default NewMovies;
