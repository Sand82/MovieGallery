import NewMoviePoster from "./NewMoviePoster/NewMoviePoster.js";

const NewMovies = ({movies}) => {
    console.log(movies);
  return (
    <section className="section-text-white position-relative">
      <div
        className="d-background"
        data-image-src="http://via.placeholder.com/1920x1080"
        data-parallax="scroll"
      ></div>
      <div className="d-background bg-theme-blacked"></div>
      <div className="mt-auto container position-relative">
        <div className="top-block-head text-uppercase">
          <h2 className="display-4">
            Now
            <span className="text-theme"> in cinema</span>
          </h2>
        </div>
        <div className="top-block-footer">
          <div
            className="slick-spaced slick-carousel"
            data-slick-view="navigation responsive-4"
          >
            <div className="slick-slides">
              {movies.map(x => <NewMoviePoster key={x.id} movie={x}/>)}
            </div>
            <div className="slick-arrows">
              <div className="slick-arrow-prev">
                <span className="th-dots th-arrow-left th-dots-animated">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
              <div className="slick-arrow-next">
                <span className="th-dots th-arrow-right th-dots-animated">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewMovies;
