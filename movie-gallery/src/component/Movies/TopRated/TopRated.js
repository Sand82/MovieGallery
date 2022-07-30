const TopRated = ({movie}) => {
  console.log(movie)
    return (
<article className="movie-line-entity">
          <div className="entity-poster" data-role="hover-wrap">
            <div className="embed-responsive embed-responsive-poster">
              <img
                className="embed-responsive-item"
                src={movie.imageUrl}
                alt=""
              />
            </div>
            <div
              className="d-over bg-theme-lighted collapse animated faster"
              data-show-classname="fadeIn show"
              data-hide-classname="fadeOut show"
            >
              <div className="entity-play">
                <a
                  className="action-icon-theme action-icon-bordered rounded-circle"
                  href="https://www.youtube.com/watch?v=nuTU5XcZTLA"
                  data-magnific-popup="iframe"
                >
                  <span className="icon-content">
                    <i className="fas fa-play"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="entity-content">
            <h4 className="entity-title">
              <a className="content-link" href="movie-info-sidebar-right.html">
                {movie.title}
              </a>
            </h4>
            <div className="entity-category">
              <a className="content-link" href="movies-blocks.html">
              {movie.category}              
              </a>
            </div>
            <div className="entity-info">
              <div className="info-lines">
                <div className="info info-short">
                  <span className="text-theme info-icon">
                    <i className="fas fa-star"></i>
                  </span>
                  <span className="info-text">8,1</span>
                  <span className="info-rest">/10</span>
                </div>
                <div className="info info-short">
                  <span className="text-theme info-icon">
                    <i className="fas fa-clock"></i>
                  </span>
                  <span className="info-text">{movie.duration}</span>
                  <span className="info-rest">&nbsp;min</span>
                </div>
              </div>
            </div>
            <p className="text-short entity-text">
             {movie.description}
            </p>
          </div>          
        </article>
    )
};

export default TopRated;
