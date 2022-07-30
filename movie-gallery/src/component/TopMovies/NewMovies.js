import NewMoviePoster from "./NewMoviePoster/NewMoviePoster.js";
import * as style from "../TopMovies/NewMovies.Module.css";

const NewMovies = ({ movies }) => { 

  return (
    <>
      <section style={style} className="section-text-white position-relative">
        <div
          className="d-background"
          data-image-src="http://via.placeholder.com/1920x1080"
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
                  <div
                    className="slick-track"                   
                  >
                    {movies.map((x) => (
                      <NewMoviePoster key={x.id} movie={x} />
                    ))}
                  </div>
                </div>
              </div>
              {/* <div className="slick-arrows">
                <div className="slick-arrow-prev slick-arrow" style={{}}>
                  <span className="th-dots th-arrow-left th-dots-animated">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
                <div className="slick-arrow-next slick-arrow" style={{}}>
                  <span className="th-dots th-arrow-right th-dots-animated">
                    <span />
                    <span />
                    <span />
                  </span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewMovies;
