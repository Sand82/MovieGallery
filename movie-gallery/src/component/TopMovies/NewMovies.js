import NewMoviePoster from "./NewMoviePoster/NewMoviePoster.js";
import NewMovieBlog from './NewMovieBlog/NewMovieBlog.js'
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
                  <div className="slick-track">
                    {movies.map((x) => (
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
            {movies.map(x => <NewMovieBlog key={x.id} movie={x}/>)}
            
          </div>
          <div className="section-bottom">
            <a className="btn btn-theme" href="news-blocks-sidebar-right.html">
              View All News
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default NewMovies;
