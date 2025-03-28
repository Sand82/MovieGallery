const TopRatedCard = ({ movie }) => {
  return (
    <div
      className="slick-slide slick-cloned"
      tabIndex={-1}
      style={{ width: 260, margin: "10px 0" }}
      data-slick-index={14}
      aria-hidden="true"
    >
      <article className="poster-entity" data-role="hover-wrap">
        <div className="embed-responsive embed-responsive-poster">
          <img className="embed-responsive-item" src={movie.imageUrl} alt="" />
        </div>
        <div
          className="d-background bg-theme-lighted collapse animated faster"
          data-show-class="fadeIn show"
          data-hide-class="fadeOut show"
        />
        <div className="d-over bg-highlight-bottom">
          <div
            className="collapse animated faster entity-play"
            data-show-class="fadeIn show"
            data-hide-class="fadeOut show"
          >
            <div
              className="action-icon-theme action-icon-bordered rounded-circle"
              href="https://www.youtube.com/watch?v=d96cjJhvlMA"
              data-magnific-popup="iframe"
              tabIndex={-1}
            >
              <span className="icon-content">
                <i className="fas fa-play" />
              </span>
            </div>
          </div>
          <h4 className="entity-title">
            <div
              className="content-link"
              // href="movie-info-sidebar-right.html"
              tabIndex={-1}
            >
              {movie.title}
            </div>
          </h4>
          <div className="entity-category">
            <div
              className="content-link"
              // href="movies-blocks.html"
              tabIndex={-1}
            >
              {movie.category}
            </div>
          </div>
          <div className="entity-info">
            <div className="info-lines">
              <div className="info info-short">
                <span className="text-theme info-icon">
                  <i className="fas fa-star" />
                </span>
                <span className="info-text">
                  {movie.averageRating ? movie.averageRating : "0"}
                </span>
                <span className="info-rest">/10</span>
              </div>
              <div className="info info-short">
                <span className="text-theme info-icon">
                  <i className="fas fa-clock" />
                </span>
                <span className="info-text">{movie.duration}</span>
                <span className="info-rest">&nbsp;min</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default TopRatedCard;
