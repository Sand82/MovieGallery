import * as style from './NewMovieBlog.Module.css'

const NewMovieBlog = ({movie}) => {
    return (
        <div style={style} className="col-md-6">
              <article className="article-tape-entity contaner-image">
                <a
                  className="entity-preview"
                  href="article-sidebar-right.html"
                  data-role="hover-wrap"
                >
                  <span className="embed-responsive embed-responsive-16by9 image-wrapper">
                    <img 
                      id="image"
                      className="embed-responsive-item image"
                      src={movie.imageUrl}
                      alt=""                      
                    />
                  </span>
                  {/* <span className="entity-date">
                    <span className="tape-block tape-horizontal tape-single bg-theme text-white">
                      <span className="tape-dots"></span>
                      <span className="tape-content m-auto">20 jul 2019</span>
                      <span className="tape-dots"></span>
                    </span>
                  </span> */}
                  <span
                    className="d-over bg-black-80 collapse animated faster"
                    data-show-classname="fadeIn show"
                    data-hide-classname="fadeOut show"
                  >
                    <span className="m-auto">
                      <i className="fas fa-search"></i>
                    </span>
                  </span>
                </a>
                <div className="entity-content">
                  <h4 className="entity-title">
                    <a
                      className="content-link"
                      href="article-sidebar-right.html"
                    >
                      {movie.title}
                    </a>
                  </h4>
                  <div className="entity-category">
                    <a
                      className="content-link"
                      href="news-blocks-sidebar-right.html"
                    >
                      {movie.title}
                    </a>
                    ,
                    <a
                      className="content-link"
                      href="news-blocks-sidebar-right.html"
                    >
                      {movie.category}
                    </a>
                    ,
                    <a
                      className="content-link"
                      href="news-blocks-sidebar-right.html"
                    >
                      sci-fi
                    </a>
                  </div>
                  <p className="text-short entity-text">
                  {movie.description}
                  </p>
                  <div className="entity-actions">
                    <a
                      className="text-uppercase"
                      href="article-sidebar-right.html"
                    >
                      Details
                    </a>
                  </div>
                </div>
              </article>
            </div>
    );
};

export default NewMovieBlog;